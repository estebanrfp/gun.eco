import './styles.styl'

function CPaste () {
  document.querySelectorAll('.cp').forEach(el => el.addEventListener('click', e => {
    const pre = e.target.parentNode
    const code = pre.querySelector('code').innerText
    const container = pre.querySelector('code').parentNode

    navigator.clipboard.writeText(code).then(() => {
      container.classList.add('blink_copy')
      setTimeout(() => container.classList.remove('blink_copy'), 600)
    }, () => console.log('Copy permissions denied.'))

    return false
  })
  )
}

export default CPaste
