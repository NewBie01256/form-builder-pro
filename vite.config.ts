import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// CTNA Questionnaire Builder - Vite Configuration
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
