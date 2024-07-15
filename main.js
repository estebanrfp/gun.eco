import { registerSW } from 'virtual:pwa-register'
import './lib/index.ts'

const updateSW = registerSW({
  onNeedRefresh () {
    // show a prompt to user
    console.log('New content available, click on reload button to update.')
    window.location.reload()
  },
  onOfflineReady () {
    console.log('show a ready to work offline to user')
    // show a ready to work offline to user
  }
})

updateSW()
