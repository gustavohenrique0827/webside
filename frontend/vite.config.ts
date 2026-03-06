/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Proxy para o backend Node.js (GraphQL)
    // Uses localhost as fallback for Docker builds
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true,
      },
      '/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
