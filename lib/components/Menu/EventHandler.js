async function EventHandler () {
  const links = document.querySelectorAll('#menu li>a')

  links.forEach(link => {
    link.onclick = async e => {
      e.preventDefault()

      link.parentNode.classList.toggle('open')

      links.forEach(link => link.classList.remove('active'))
      link.classList.add('active')

      const item = e.target.parentNode
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
