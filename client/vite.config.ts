import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about pure annotations in ox library
        if (warning.code === 'INVALID_ANNOTATION' && warning.message.includes('ox/_esm')) {
          return;
        }
        warn(warning);
      }
    }
  }
}) 