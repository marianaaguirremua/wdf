import { createServerFn } from "@tanstack/react-start";

// Project inquiries from /contact, sent by email through Resend. Same recipients and sender
// as the RFQ form on manufacturing.wdfgroup.us. Needs the RESEND_API_KEY secret on the Worker.
const RECIPIENTS = ["sales@wdfservices.com", "mariana.aguirre@wdfservices.com"];
const FROM = "WDF <notifications@wdfgroup.us>";

export const DIVISIONS = ["manufacturing", "energy", "technology", "threepl"] as const;
export type Division = (typeof DIVISIONS)[number];

const DIVISION_NAMES: Record<Division, string> = {
  manufacturing: "Manufacturing",
  energy: "Energy",
  technology: "Technology",
  threepl: "3PL",
};

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  divisions: Division[];
  description: string;
  quantity: string;
  date: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number, required: boolean): string {
  const s = typeof value === "string" ? value.trim() : "";
  if ((required && !s) || s.length > max) throw new Error("Invalid form data.");
  return s;
}

function parse(data: unknown): ContactInput {
  const d = (data ?? {}) as Record<string, unknown>;
  const divisions = Array.isArray(d["divisions"])
    ? [...new Set(d["divisions"])].filter((v): v is Division =>
        (DIVISIONS as readonly unknown[]).includes(v),
      )
    : [];
  const email = text(d["email"], 255, true);
  if (!EMAIL.test(email) || divisions.length === 0) throw new Error("Invalid form data.");
  return {
    name: text(d["name"], 200, true),
    company: text(d["company"], 200, true),
    email,
    phone: text(d["phone"], 50, false),
    divisions,
    description: text(d["description"], 5000, true),
    quantity: text(d["quantity"], 200, false),
    date: text(d["date"], 50, false),
  };
}

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export const submitContact = createServerFn({ method: "POST" })
  .validator(parse)
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return { ok: false as const };
    }
    const divisions = data.divisions.map((key) => DIVISION_NAMES[key]).join(", ");
    const rows: [string, string][] = [
      ["Name", data.name],
      ["Company", data.company],
      ["Email", data.email],
      ["Phone", data.phone || "—"],
      ["Divisions", divisions],
      ["Project / Part Description", data.description],
      ["Estimated Quantity", data.quantity || "—"],
      ["Target Date", data.date || "—"],
    ];
    const html = `<div style="font-family:Arial,sans-serif;color:#111"><h2 style="color:#017067">New project inquiry</h2><table cellpadding="8" style="border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #eee">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("")}</table></div>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: RECIPIENTS,
          reply_to: data.email,
          subject: `New inquiry from ${data.name} (${data.company}) — ${divisions}`,
          html,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        }),
      });
      if (!res.ok) {
        console.error(`Resend failed [${res.status}]: ${await res.text()}`);
        return { ok: false as const };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("Resend request error", e);
      return { ok: false as const };
    }
  });
