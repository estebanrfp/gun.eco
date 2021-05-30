import { VitePWA } from 'vite-plugin-pwa'
import copy from 'rollup-plugin-copy'

export default {
  build: {
    chunkSizeWarningLimit: 5000
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate'
    }),
    copy({
      targets: [{ src: './static/*', dest: './dist' }],
      verbose: true,
      hook: 'writeBundle',
      copyOnce: true
    })
  ]
}
