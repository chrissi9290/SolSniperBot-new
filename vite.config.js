import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SolSniperBot-new/', // Name des Repos hier eintragen!
  server: {
    port: 3000
  }
});