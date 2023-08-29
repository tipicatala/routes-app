import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    plugins: [react(), svgr(), splitVendorChunkPlugin()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src/") },
    },
    build: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === "production" },
      },
      rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    },
      // sourcemap: process.env.NODE_ENV !== "production",
      minify: "terser",
    },
  };
});
