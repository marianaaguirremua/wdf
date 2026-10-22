// Plain Vite configuration (no Lovable tooling): TanStack Start SSR app built by Nitro
// for Cloudflare Workers, the same deployment target as the WDF Manufacturing site.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: { port: 5173 },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    // src/server.ts wraps the bundled server entry with SSR error handling.
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      preset: "cloudflare-module",
      cloudflare: { nodeCompat: true, deployConfig: true },
    }),
    viteReact(),
  ],
});
