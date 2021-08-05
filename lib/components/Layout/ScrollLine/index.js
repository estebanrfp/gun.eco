import './styles.css'

function ScrollLine () {
  const scrollLine = document.querySelector('.scroll-line')
  const el = document.getElementsByClassName('Layout')[0]

  el.addEventListener('scroll', e => {
    const winTop = el.scrollTop
    const docHeight = el.scrollHeight
    const winHeight = el.clientHeight
    const scrolled = (winTop / (docHeight - winHeight)) * 100
    scrollLine.style.width = `${ scrolled }%`
  })

  const scrollButton = document.querySelector('.scroll-button')
  scrollButton.addEventListener('click', () => el.scrollTo({ top: 0, behavior: 'smooth' }))

  // document.querySelector('.Layout').querySelector(hash).scrollIntoView({
  //   behavior: 'smooth'
  // })
}

export default ScrollLine
