import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "384542da-2556-4872-b07b-f58fbb025b9f-00-1zhqbnngp186e.sisko.replit.dev"
    ]
  }
})
