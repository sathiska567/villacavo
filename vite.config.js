import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // the website runs on 5173; the admin panel (admin/ folder, its own git repo) runs on 5174
  server: { port: 5173, strictPort: true },
})
