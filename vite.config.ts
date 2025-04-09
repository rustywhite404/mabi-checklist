import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mabi-checklist/', // repo name
  plugins: [react()],
});