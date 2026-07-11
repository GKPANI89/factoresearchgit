import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api/market': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json,text/plain,*/*',
          Referer: 'https://finance.yahoo.com/',
        },
        rewrite: (path) => path.replace(/^\/api\/market/, '/v7/finance/quote'),
      },
      '/api/market-alt': {
        target: 'https://query2.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json,text/plain,*/*',
          Referer: 'https://finance.yahoo.com/',
        },
        rewrite: (path) => path.replace(/^\/api\/market-alt/, '/v7/finance/quote'),
      },
      '/api/market-quotes': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json,text/plain,*/*',
          Referer: 'https://finance.yahoo.com/',
        },
        rewrite: (path) => path.replace(/^\/api\/market-quotes/, '/v7/finance/quote'),
      },
      '/api/market-chart': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json,text/plain,*/*',
          Referer: 'https://finance.yahoo.com/',
        },
        rewrite: (path) => path.replace(/^\/api\/market-chart/, '/v8/finance/chart'),
      },
    },
  },
})