import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    'import.meta.env.VITE_EVENT_API_URL': JSON.stringify(process.env.VITE_EVENTURL)
  },
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/search/search.html"),
        
      },
    },
  },
});
