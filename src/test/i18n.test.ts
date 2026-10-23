import { describe, expect, it } from "vitest";
import en from "@/i18n/messages/en";
import es from "@/i18n/messages/es";
import { internalPath, localizedPath, publicPath, splitLocalePath } from "@/i18n/config";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

describe("localization", () => {
  it("keeps Spanish messages in the same shape as English", () => {
    expect(shape(es)).toEqual(shape(en));
  });

  it("builds unprefixed default-locale paths and prefixed secondary-locale paths", () => {
    expect(localizedPath("en", "/")).toBe("/");
    expect(localizedPath("en", "/about")).toBe("/about");
    expect(localizedPath("es", "/")).toBe("/es");
    expect(localizedPath("es", "/3pl")).toBe("/es/trespl");
  });

  it("serves Spanish pages under translated slugs", () => {
    const slugs = {
      "/about": "/es/nosotros",
      "/services": "/es/servicios",
      "/energy": "/es/energia",
      "/technology": "/es/tecnologia",
      "/3pl": "/es/trespl",
      "/contact": "/es/contacto",
    };
    for (const [page, url] of Object.entries(slugs)) {
      expect(localizedPath("es", page)).toBe(url);
      expect(publicPath(`/es${page}`)).toBe(url);
      expect(internalPath(url)).toBe(`/es${page}`);
    }
  });

  it("resolves accented, capitalized and English Spanish slugs to the same page", () => {
    expect(internalPath("/es/Energ%C3%ADa")).toBe("/es/energy");
    expect(internalPath("/es/tresPL")).toBe("/es/3pl");
    expect(internalPath("/es/about")).toBe("/es/about");
  });

  it("leaves English and unknown paths untouched", () => {
    for (const path of ["/", "/about", "/services", "/es", "/es/unknown", "/es/%E0%A4%A"]) {
      expect(internalPath(path)).toBe(path);
      expect(publicPath(path)).toBe(path);
    }
  });

  it("splits a pathname into locale and page path", () => {
    expect(splitLocalePath("/")).toEqual({ locale: "en", path: "/" });
    expect(splitLocalePath("/about")).toEqual({ locale: "en", path: "/about" });
    expect(splitLocalePath("/es")).toEqual({ locale: "es", path: "/" });
    expect(splitLocalePath("/es/contact")).toEqual({ locale: "es", path: "/contact" });
  });

  it("never publishes unverified contact details or certifications", () => {
    const text = JSON.stringify([en, es]);
    expect(text).not.toMatch(/@|ISO\s?9001|\+1\s?\d|\+52/);
  });
});
