import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import node from 'vite-plugin-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

export const events = {
  optimizeDeps: {
    exclude: ['events'],
  },
};
