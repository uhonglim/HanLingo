import { staticPages } from "./scripts/static-pages";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react(), staticPages()],
  server: {
    proxy: {
      "/api/translation": "http://127.0.0.1:8788",
      "/api/translate": "http://127.0.0.1:8788",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "atlas-geography": ["./src/data/east-asia-50m.json"],
        },
      },
    },
  },
});
