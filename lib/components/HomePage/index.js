import './styles.css'
import template from './template.html?raw'

(function rando (i) {
  setTimeout(rando, Math.random() * 100)
  i = 10; while (--i) {
    const r = Math.round((Math.random() - Math.random()) * 100)
    document.documentElement.style.setProperty(`--px${ i }`, `${ r }px`)
  }
}());
(function rando (i) {
  setTimeout(rando, Math.random() * 500)
  i = 10; while (--i) {
    const r = Math.round((Math.random() - Math.random()) * 100)
    document.documentElement.style.setProperty(`--per${ i }`, `${ r }%`)
  }
}())

export default template
