import ace from 'brace'
import 'brace/mode/html'
import 'brace/theme/monokai'
import sources from './Sources'
import Slider from './Slider'
import parse from './Parser'
import scrollLine from './ScrollLine'

import DOM from '../Dom'
import spinner from '../Spinner'
import search from '../Search'
import menu from '../Menu'
// import Swipe from '../Swipe'
import CPaste from '../CPaste'

export default () => {
  const UI = {}
  const html = document.querySelector('body')
  const appContainer = document.querySelector('.app-container')
  const sidebarButton = document.querySelector('#show-menu-button')
  const theme = JSON.parse(window.localStorage.getItem('theme')) || null
  const nocache = Math.random()

  DOM(html, UI) // virtual dom

  menu(UI) // menu module

  search() // search module

  window.addEventListener('hashchange', event => {
    event.preventDefault()
    window.getData()
  })
  window.addEventListener('popstate', event => {
    event.preventDefault()
    window.getData()
  })
  // if (window.location.pathname === '/' || window.location.pathname === '/docs/') {
  //   window.history.pushState({ tpl: '/docs/Introduction' }, 'Home', '/docs/Introduction')
  // }

  function shownavleft (x) {
    if (x.matches) { // If media query matches
      appContainer.classList.add('show-nav-left')
    } else {
      appContainer.classList.remove('show-nav-left')
    }
  }

  const x = window.matchMedia('(min-width: 640px)')

  shownavleft(x) // Call listener function at run time
  x.addListener(shownavleft) // Attach listener function on state changes

  window.getData = async e => { // Get data function
    let topic = window.location.pathname.replace('/docs/', '') || 'Introduction'
    const hash = window.location.hash

    // if (topic === '/') {
    //   setTimeout(async function () {
    //     const page = await import('../HomePage').then(module => module.default)
    //     UI.layout.innerHTML = page
    //   }, 100)
    // }
    if (topic === '/') {
      appContainer.classList.remove('show-nav-left')
      document.querySelector('.Layout').style.padding = '0'
      const page = await import('../HomePage').then(module => module.default)
      UI.layout.innerHTML = page
    } else {
      if (topic === '/') {
        topic = 'Introduction'
        appContainer.classList.remove('show-nav-left')
        document.querySelector('.Layout').style.padding = '0'
      } else {
        appContainer.classList.add('show-nav-left')
        document.querySelector('.Layout').style.padding = '0 1rem'
      }

      spinner('show')

      const response = await fetch(`${ sources() + topic }.md?nc=${ nocache }`)
      const result = await response.text()

      if (response.ok) {
        if (parse(result).length > 1) {
          UI.layout.innerHTML = `
          <div class="slider">
            <ul class="stepwizard"></ul>
            <div class="slides"></div>
            <div class="controls">
              <button class="goToPrev"><</button>
              <button class="goToNext">></button>
            </div>
          </div> 
        `
          parse(result).forEach(slide => {
            document.querySelector('.slides').innerHTML += `<div class="slide"><h2 id="${ slide.name.replace(/\s/g, '') }">${ slide.name }</h2>${ slide.content }</div>`
            document.querySelector('.stepwizard').innerHTML += '<li class="stepwizard-step">'
          })

          Slider()
        } else {
          UI.layout.innerHTML = `<h2 id="${ parse(result)[0].name.replace(/\s/g, '') }">${ parse(result)[0].name }</h2>${ parse(result)[0].content }`
        }

        document.querySelectorAll('.Layout .interactive-module-wrapper').forEach(el => {
          const editor = ace.edit(el.querySelector('.contentEditor'))
          const iframe = el.querySelector('.preview')

          function update () {
            iframe.contentWindow.document.open('text/htmlreplace')
            iframe.contentWindow.document.write(`<style>
          body {color: #fff}
          * { border: 0; outline: none;}
          button, input[type=button], input[type=submit]  { cursor: pointer; }
          button:hover, input[type=button]:hover, input[type=submit]:hover { opacity: 0.9; } 
          input, button { border-left: 8px solid #afafaf87; margin: 4px; line-height: 24px; padding-left: .5rem; }
          </style>${ editor.getValue() }`)
            iframe.contentWindow.document.close()
          }

          editor.getSession().setMode('ace/mode/html')
          editor.$blockScrolling = Infinity
          editor.on('input', () => update())

          update()
        })

        if (hash) {
          if (document.querySelector('.Layout').querySelector(hash)) {
            document
              .querySelector('.Layout')
              .querySelector(hash)
              .classList.add('blink_me')
            setTimeout(() => {
              document.querySelector('.Layout').querySelector(hash).scrollIntoView({
                behavior: 'smooth'
              })
            }, 10)
          }
        } else {
          setTimeout(() => {
            document.querySelector('.Layout').scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }, 10)
        }

        const titles = document.querySelectorAll(`#menu a[href="${ document.location.pathname }"]`)
        if (titles.length > 0) {
          document.querySelector('.title').innerHTML = titles[0].innerText
        } else {
          document.querySelector('.title').innerHTML = document.location.pathname
        }

        // await import('../CPaste' /* webpackPreload: true */).then(module => module.default())
        CPaste()
      } else {
        UI.layout.innerHTML = 'the translation will be available soon ...' // result
      }
    }
    document.querySelector('.gunlogo').addEventListener('click', e => {
      window.history.pushState({ tpl: '/' }, '', '/')
      window.getData()
      document.querySelector('.title').innerHTML = ''
    })
    document.querySelectorAll('.Layout a').forEach(el =>
      el.addEventListener('click', e => {
        e.preventDefault()
        const url = e.target.getAttribute('href') || e.target.parentNode.getAttribute('href') || ''

        if (url !== '') {
          if (url.indexOf('http') !== -1) {
            window.open(url, '_blank')
          } else {
            window.history.pushState({ tpl: url }, '', url)
            window.getData()
          }
        }
      })
    )

    spinner('hide')
  }

  scrollLine()
  // Open / Close / Swipe Menu

  // Swipe(document, (evt, dir, phase, swipetype, distance) => {
  //   if (phase === 'move' && dir === 'left') {
  //     sidebarButton.checked = false
  //     appContainer.classList.remove('show-nav-left')
  //   }
  //   if (dir === 'right') {
  //     sidebarButton.checked = true
  //     appContainer.classList.add('show-nav-left')
  //   }
  // })

  document.querySelector('#show-menu-button').addEventListener('change', () => {
    appContainer.classList.toggle('show-nav-left')
  })

  // Color theme

  document.querySelector('#col').addEventListener('click', async () => {
    await import('./Themes' /* webpackChunkName:"themes" */).then(module => module.default())
  })

  if (theme) {
    document.documentElement.style.setProperty('--background-color', theme.background)
    document.documentElement.style.setProperty('--highlight-color', theme.highlight)
    document.documentElement.style.setProperty('--text-color', theme.text)
    document.documentElement.style.setProperty('--menu-width', theme.menuWidth)
  }
}
