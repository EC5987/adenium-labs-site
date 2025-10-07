import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const env =
  (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> }
  }).process?.env ?? {}

const base = env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,        // expose on LAN (0.0.0.0)
    port: 5173,
    strictPort: true,  // fail if 5173 is taken (helps with QR/links)
  },
})
