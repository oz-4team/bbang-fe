import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  define: {
    'global': {},
  },
  build: {
    rollupOptions: {
      external: ['aws-sdk', '/src/assets/images/instagram-logo.svg'],
    },
  },
})
