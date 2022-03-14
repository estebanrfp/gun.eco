async function EventHandler () {
  const items = document.querySelectorAll('#menu li')

  items.forEach(item => {
    item.onclick = async e => {
      e.preventDefault()
      e.stopPropagation()

      item.classList.toggle('open')

      items.forEach(link => link.classList.remove('active'))
      item.classList.add('active')
      let url

      if (item.getElementsByTagName('ul').length >= 1) {
        item.querySelector('ul').classList.toggle('open')
        url = item.querySelector('ul a').getAttribute('href')
        document.querySelector('.Layout').scrollTop = 0
      } else {
        item.classList.toggle('open')
        url = item.querySelector('a').getAttribute('href')
      }

      document.querySelectorAll(`#menu a[href="${ url }"]`)
      window.history.pushState('', '', url)
      window.getData()
    }
  })
}

export default EventHandler
