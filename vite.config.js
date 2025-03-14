import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SolSniperBot-new/', // WICHTIG: Das muss mit deinem Repo-Namen übereinstimmen!
});