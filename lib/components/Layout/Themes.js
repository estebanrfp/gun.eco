let i = -1

function Themes () {
  const items = [
    { background: '#ff003d', highlight: '#f63663', text: '#ffffffb0', menuWidth: '220px' },
    { background: '#364856', highlight: '#03A9F4', text: '#ffffff82', menuWidth: '220px' },
    { background: '#464646', highlight: '#ffc107', text: 'rgb(158, 141, 115)', menuWidth: '260px' },
    { background: '#0979af', highlight: '#ffc107', text: 'rgb(158, 141, 115)', menuWidth: '200px' },
    { background: '#2196F3', highlight: '#ecd693', text: 'rgb(207, 190, 164)', menuWidth: '200px' },
    { background: '#673AB7', highlight: '#61b4f7', text: 'rgb(156, 164, 214)', menuWidth: '280px' },
    { background: '#009688', highlight: '#a5b54d', text: '#a9d8ea82', menuWidth: '280px' },
    { background: '#292929', highlight: '#03A9F4', text: '#ffffff82', menuWidth: '280px' }
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
