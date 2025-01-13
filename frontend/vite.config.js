import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

// Fix for `__dirname`
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure this matches tsconfig paths
    },
  },
  build: {
    outDir: "dist", // Explicitly set the output directory for production builds
    assetsDir: "assets", // Optional: Customize where static assets are stored
  },
});
