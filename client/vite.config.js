// vite.config.js

// this file configures Vite , the build tool for our React frontend

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with /api will be forwarded to backend
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
  },
});
