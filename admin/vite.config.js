import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: 'localhost', // restricts to localhost only
    port: 5174,         // sets specific port
    strictPort: true,   // throw error if 5174 is in use
  }
})
