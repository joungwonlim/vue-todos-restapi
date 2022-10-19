import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'https://localhost:1019/api/v1',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //   },
    // },
  },
});
