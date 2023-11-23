import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
});
