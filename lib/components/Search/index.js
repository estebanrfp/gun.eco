import './styles.css'
import getParents from '../GetParents'

function Search () {
  let searchItems = []
  function changeUpdate (selector, fnc, time) {
    let typingTimer
    const doneTypingInterval = time || 1500
    const el = document.querySelector(selector)

    el.onkeyup = () => {
      clearTimeout(typingTimer)
      typingTimer = setTimeout(fnc, doneTypingInterval)
    }
  }

  const input = document.getElementById('searchinput')

  changeUpdate('#searchinput', async () => {
    const filter = input.value.toUpperCase()

    document.querySelectorAll('#menu ul').forEach(link => link.classList.remove('open'))
    document.querySelectorAll('#menu ul ul li>a').forEach(el => {
      const item = el.parentNode
      const name = el.textContent
      if (input.value !== '' && name.toUpperCase().includes(filter)) {
        searchItems.push(el)
        setTimeout(() => {
          item.classList.add('active')
          if (item.querySelector('ul')) {
            item.querySelector('ul').classList.add('open')
          }
        }, 100)

        getParents(item, '#menu ul').forEach(link => {
          link.classList.add('open')
        })
      }
    })

    if (searchItems.length > 0) {
      searchItems[0].click()
      searchItems[0].scrollIntoView({
        behavior: 'smooth'
      })
    }

    searchItems = []
    input.value = ''
  }, 800)
}

export default Search
