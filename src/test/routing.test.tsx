import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { NAV_ITEMS } from "@/lib/site";
import en from "@/i18n/messages/en";

// Match routes without rendering: jsdom never loads the stylesheets React waits on.
const router = createRouter({ routeTree });
const leaf = (path: string) => router.matchRoutes(path).at(-1)?.routeId;

describe("routing", () => {
  it("keeps the approved navigation order and labels", () => {
    expect(NAV_ITEMS.map((i) => en.nav[i.key])).toEqual([
      "About",
      "Services",
      "Integration",
      "3PL",
      "Contact",
    ]);
  });

  it.each(["/", "/about", "/services", "/integration", "/3pl", "/contact"])(
    "matches a page for %s in both languages",
    (path) => {
      for (const url of [path, path === "/" ? "/es" : `/es${path}`]) {
        expect(leaf(url)).not.toBe(rootRouteId);
        expect(leaf(url)).not.toBe("/{-$locale}");
      }
    },
  );
});
