/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 55289
  },
  // GitHub Pages 配置
  base: process.env.NODE_ENV === 'production' ? '/KellyCriterion/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // 将React相关库分离到vendor chunk
          'react-vendor': ['react', 'react-dom'],
          // 将UI库分离到ui chunk
          'ui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          // 将图表库分离到charts chunk
          'charts-vendor': ['recharts'],
          // 将工具库分离到utils chunk
          'utils-vendor': ['framer-motion', 'lucide-react', 'seedrandom', 'zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // 增加警告限制到1MB
  }
})
