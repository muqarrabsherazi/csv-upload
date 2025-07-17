import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'csv-upload': resolve(__dirname, '../../packages/csv-upload/src'),
    },
  },
}); 