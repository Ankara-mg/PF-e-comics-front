import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint2';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [
      react(),
      eslint(),
    ],
    server: {
      port: env.VITE_PORT || 5173,
      proxy: {
        "/api": "http://localhost:3000"
      }
    }
  })
};