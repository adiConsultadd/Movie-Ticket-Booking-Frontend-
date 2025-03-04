import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ["./src/tests/setup.ts"],
    include : ['src/**/*.{test,spec}.{ts,tsx}'],
    css: true
  }
})
