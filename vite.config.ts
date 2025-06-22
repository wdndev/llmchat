// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import path from "path";

export default defineConfig({
  root: "src/renderer",
  plugins: [
    vue(),
    electron([
      {
        entry: "../main/index.ts",
        vite: {
          build: {
            outDir: "../../dist/main",
          },
          resolve: {
            alias: {
              "@/main": path.resolve(__dirname, "./src/main"),
            },
          },
        },
      },
      {
        entry: "../preload/index.ts",
        vite: {
          build: {
            outDir: "../../dist/preload",
          },
        },
      },
    ]),
    renderer(),
  ],
  build: {
    outDir: "../../dist/renderer",
  },
  resolve: {
    alias: {
      "@/renderer": path.resolve(__dirname, "./src/renderer"),
    },
  },
});
