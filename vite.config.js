import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vercel tells every build its production domain (e.g. ofu.vercel.app). index.html uses it
// as %VITE_SITE_URL% for the link preview tags, which need a full address. Locally it falls
// back to the preview server.
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
process.env.VITE_SITE_URL = productionDomain ? `https://${productionDomain}` : 'http://localhost:4173'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
