import eventHandler from './EventHandler'
import getParents from '../GetParents'
import './styles.css'

function createNode (items, parent) {
  const ul = document.createElement('ul')
  for (var item of items) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.textContent = Object.entries(item)[0][0]
    a.href = Object.entries(item)[0][1]
    li.appendChild(a)
    if (item.pages) {
      li.classList.add('sublist')
      createNode(Object.entries(item)[1][1], li)
    }
    ul.appendChild(li)
  }
  parent.appendChild(ul)
}

async function Menu (UI) {
  const ln = window.localStorage.getItem('ln') || 'en'
  var menu = document.querySelector('#menu')

  const res = await fetch(`https://raw.githubusercontent.com/gundb/gun-site/master/langs/menu-json-${ ln }.json?nc=${ Math.random() }`)
  const menulng = await res.json()

  UI.ln.innerHTML = ln
  UI.menu.innerHTML = ''

  await createNode(menulng.navigation, menu)

  document.querySelector('#ln').addEventListener('click', async e => {
    e.target.innerHTML = e.target.innerHTML === 'en' ? 'es' : 'en'
    window.localStorage.setItem('ln', e.target.innerHTML)

    UI.ln.innerHTML = e.target.innerHTML

    const res = await fetch(`https://raw.githubusercontent.com/gundb/gun-site/master/langs/menu-json-${ e.target.innerHTML }.json?nc=${ Math.random() }`)
    const menulng = await res.json()

    UI.menu.innerHTML = ''
    await createNode(menulng.navigation, menu)

    eventHandler()
    window.getData()
  })

  // Font sizes switch function
  const fz = [16, 16.8, 16.4] // font sizes

  document.querySelector('#fz').addEventListener('click', e => {
    fz.unshift(fz.pop())
    document.documentElement.style.setProperty('--font-size', `${ fz[0] }px`)
  })

  eventHandler()

  window.getData()

  const hash = `${ document.location.pathname + document.location.hash }`

  const url = document.querySelector(`#menu a[href="${ hash }"]`)

  if (url) {
    // expand found items
    getParents(url, '#menu').forEach(link => link.classList.add('open'))

    // highlight first item
    url.classList.add('active')

    // expand first item
    if (url.parentNode.querySelector('ul')) {
      url.parentNode.querySelector('ul').classList.add('open')
    }
  }
}

export default Menu
