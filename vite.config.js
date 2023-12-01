import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },

  plugins: [react()],
  resolve: {
    alias: {
      // Vue 프로젝트 파일에 있었는데, 아직 사용법 파악 X
      '@': '/src',
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
})
