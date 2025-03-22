import react from '@vitejs/plugin-react';
// import AWS from "aws-sdk";
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://seonhm.kr/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      }


    },
    define: {
      'global': {},
    },
  }
})

