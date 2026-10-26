import { useState, type FormEvent, type ReactNode } from "react";
import { useI18n } from "@/i18n";
import { DIVISIONS, submitContact, type Division } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

// Each division keeps the dot colour it has elsewhere on the site.
const DIVISION_DOTS: Record<Division, string> = {
  manufacturing: "var(--teal)",
  energy: "var(--mustard)",
  technology: "var(--teal)",
  threepl: "#d2642a",
};

const field =
  "w-full rounded-sm border border-ink-border bg-ink-2 px-4 py-3.5 text-ink-foreground outline-none transition-colors placeholder:text-ink-muted/60 focus:border-primary";

function Field({ label, full, children }: { label: string; full?: boolean; children: ReactNode }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="label-mono mb-2 block text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

/** Project inquiry form: the manufacturing.wdfgroup.us RFQ form plus a multi-select of divisions. */
export function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingDivision, setMissingDivision] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const divisions = fd.getAll("divisions").map(String) as Division[];
    setError(null);
    if (divisions.length === 0) {
      setMissingDivision(true);
      e.currentTarget.querySelector<HTMLInputElement>('input[name="divisions"]')?.focus();
      return;
    }
    setSending(true);
    const value = (key: string) => String(fd.get(key) ?? "");
    try {
      const res = await submitContact({
        data: {
          name: value("name"),
          company: value("company"),
          email: value("email"),
          phone: value("phone"),
          divisions,
          description: value("description"),
          quantity: value("quantity"),
          date: value("date"),
        },
      });
      if (res.ok) setSent(true);
      else setError(f.error);
    } catch {
      setError(f.error);
    } finally {
      setSending(false);
    }
  };

  if (sent)
    return (
      <div role="status" className="rounded-sm border border-primary bg-ink-2 p-10">
        <p className="label-mono text-primary">{f.received}</p>
        <p className="display mt-3 text-3xl">{f.thanks}</p>
        <p className="mt-2 text-ink-muted">{f.follow}</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label={f.name}>
        <input required name="name" maxLength={200} autoComplete="name" className={field} />
      </Field>
      <Field label={f.company}>
        <input
          required
          name="company"
          maxLength={200}
          autoComplete="organization"
          className={field}
        />
      </Field>
      <Field label={f.email}>
        <input
          required
          type="email"
          name="email"
          maxLength={255}
          autoComplete="email"
          className={field}
        />
      </Field>
      <Field label={f.phone}>
        <input type="tel" name="phone" maxLength={50} autoComplete="tel" className={field} />
      </Field>

      <fieldset
        className="sm:col-span-2"
        aria-describedby="contact-divisions-hint"
        aria-invalid={missingDivision || undefined}
      >
        <legend className="label-mono mb-2 block text-ink-muted">{f.divisions}</legend>
        <p
          id="contact-divisions-hint"
          className={cn("mb-3 text-sm", missingDivision ? "text-[#ff8a7a]" : "text-ink-muted")}
        >
          {missingDivision ? f.divisionsRequired : f.divisionsHint}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {DIVISIONS.map((key) => (
            <label key={key} className="relative block cursor-pointer">
              <input
                type="checkbox"
                name="divisions"
                value={key}
                onChange={() => setMissingDivision(false)}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center gap-3 rounded-sm border border-ink-border bg-ink-2 py-3 pl-4 pr-10 text-[0.95rem] font-semibold transition-colors hover:border-ink-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: DIVISION_DOTS[key] }}
                />
                {t.nav[key]}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary opacity-0 transition-opacity peer-checked:opacity-100"
              >
                <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={f.description} full>
        <textarea
          required
          name="description"
          rows={4}
          maxLength={5000}
          placeholder={f.placeholder}
          className={field}
        />
      </Field>
      <Field label={f.quantity}>
        <input name="quantity" maxLength={200} className={field} />
      </Field>
      <Field label={f.date}>
        <input type="date" name="date" className={cn(field, "[color-scheme:dark]")} />
      </Field>

      {error && (
        <p role="alert" className="text-[#ff8a7a] sm:col-span-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="group mt-2 inline-flex min-h-14 items-center justify-center gap-3 rounded-sm bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-ink-foreground disabled:opacity-60 sm:col-span-2"
      >
        {sending ? f.sending : f.submit}
        {!sending && (
          <span aria-hidden className="arrow-nudge">
            →
          </span>
        )}
      </button>
    </form>
  );
}
