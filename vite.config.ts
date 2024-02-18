import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://stanimir93.github.io/planning-tool/',
  // base: 'planning-tool',
  plugins: [react()],
})
