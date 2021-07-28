import Layout from './components/Layout'
import './styles/fonts.css'
import './styles/icons.css'
import './styles/initial.css'
import './styles/global.css'
import './styles/queries.css'
import './styles/lp.css'

if (navigator.serviceWorker) {
  navigator.serviceWorker.ready.then(registration => registration.update())
} else if (window.applicationCache) {
  window.applicationCache.update()
}

Layout()
