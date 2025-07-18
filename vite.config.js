import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      // point at your TSX entry
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react({
      // ensure it handles .tsx
      include: ['resources/js/**/*.tsx', 'resources/js/**/*.jsx'],
    }),
  ],
});
