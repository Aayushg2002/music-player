import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mainApp',
      remotes: {
        // For development:
        musicLibrary: 'http://localhost:5001/dist/assets/remoteEntry.js',
        // For production (you'll update this later):
        // musicLibrary: 'https://your-music-library-url/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false
  },
  preview: {
    port: 5000,
    strictPort: true
  }
})