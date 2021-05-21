import { VitePWA } from 'vite-plugin-pwa'

export default {
  build: {
    chunkSizeWarningLimit: 5000
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate'
    })
  ]
}
