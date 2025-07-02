import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'musicLibrary',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/App.jsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
    modulePreload: false,
    assetsInlineLimit: 0
  },
  preview: {
    port: 5001,
    strictPort: true
  }
})