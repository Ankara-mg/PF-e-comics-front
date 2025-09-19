import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'url';

import path from 'path';
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    },
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@redux': path.resolve(__dirname, 'src/redux'),
      },
    },
  })
};