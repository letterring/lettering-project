import { defineConfig } from 'vite';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});
