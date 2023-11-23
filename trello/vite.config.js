import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      ssr: {
        noExternal: ["react-icons"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
