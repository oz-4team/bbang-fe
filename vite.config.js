import react from '@vitejs/plugin-react';
import AWS from "aws-sdk";
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  define: {
    'global': {},
  },
  // build: {
  //   rollupOptions: {
  //     external: [AWS],
  //   },
  // },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
})
