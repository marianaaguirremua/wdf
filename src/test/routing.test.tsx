import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { NAV_ITEMS, SERVICE_ITEMS } from "@/lib/site";
import { internalPath, localizedPath } from "@/i18n/config";
import en from "@/i18n/messages/en";

// Match routes without rendering: jsdom never loads the stylesheets React waits on.
const router = createRouter({ routeTree });
const leaf = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

describe("routing", () => {
  it("keeps the approved navigation order and labels", () => {
    expect(NAV_ITEMS.map((i) => en.nav[i.key])).toEqual(["About", "Services", "Contact"]);
    expect(SERVICE_ITEMS.map((i) => en.nav[i.key])).toEqual([
      "Manufacturing",
      "Energy",
      "Technology",
      "3PL",
    ]);
  });

  it.each([
    "/",
    "/about",
    "/about/team",
    "/services",
    "/services/manufacturing",
    "/services/energy",
    "/services/technology",
    "/services/3pl",
    "/contact",
  ])("matches a page for %s in both languages", (path) => {
    for (const url of [localizedPath("en", path), localizedPath("es", path)]) {
      expect(leaf(internalPath(url))).not.toBe(rootRouteId);
      expect(leaf(internalPath(url))).not.toBe("/{-$locale}");
    }
  });
});
