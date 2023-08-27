import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src/") },
    },
    build: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === "production" },
      },
      // sourcemap: process.env.NODE_ENV !== "production",
      minify: "terser",
    },
  };
});
