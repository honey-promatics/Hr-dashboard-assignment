import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stunning-space-telegram-4jwvqvvrwj45hj977-5000.app.github.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
