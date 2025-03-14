import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SolSniperBot-new/', // <- Hier muss der Name deines GitHub Repos stehen!
  server: {
    port: 3000
  }
});