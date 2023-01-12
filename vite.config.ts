import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
  },
  base: "/vite-react-trainer-people-memory/",
  plugins: [react()],
});
