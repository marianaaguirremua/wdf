import { createRouter } from "@tanstack/react-router";
import { internalPath, publicPath } from "@/i18n/config";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Translated slugs: "/es/nosotros" in the address bar is the "/es/about" route inside.
    rewrite: {
      input: ({ url }) => {
        url.pathname = internalPath(url.pathname);
        return url;
      },
      output: ({ url }) => {
        url.pathname = publicPath(url.pathname);
        return url;
      },
    },
  });

  return router;
};
