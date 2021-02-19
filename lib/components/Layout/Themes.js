let i = -1

function Themes () {
  const items = [
    { background: '#a24259', highlight: '#f63663', text: '#ffffffb0', menuWidth: '220px' },
    { background: '#364856', highlight: '#03A9F4', text: '#ffffff82', menuWidth: '220px' },
    { background: '#272525', highlight: '#ff9800c2', text: '#838383', menuWidth: '260px' },
    { background: '#0979af', highlight: '#ffc107d6', text: 'rgb(158, 141, 115)', menuWidth: '200px' },
    { background: '#673AB7', highlight: '#61b4f7', text: 'rgb(156, 164, 214)', menuWidth: '280px' },
    { background: '#325a73', highlight: '#86bfbe', text: '#0d8cbd', menuWidth: '280px' },
    { background: '#292929', highlight: '#03A9F4', text: '#ffffff82', menuWidth: '280px' },
    { background: '#3F51B5', highlight: '#6ab5a2', text: '#ffffff82', menuWidth: '200px' }
  ]

  function setProperty (item) {
    document.documentElement.style.setProperty('--background-color', item.background)
    document.documentElement.style.setProperty('--highlight-color', item.highlight)
    document.documentElement.style.setProperty('--text-color', item.text)
    document.documentElement.style.setProperty('--menu-width', item.menuWidth)
    window.localStorage.setItem('theme', JSON.stringify(item))
  }

  i = (i + 1) % items.length
  setProperty(items[i])
}

export default Themes
