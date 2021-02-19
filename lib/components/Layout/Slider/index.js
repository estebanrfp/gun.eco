import './styles.css'
import './slider.css'

function Slider () {
  const slides = document.querySelectorAll('.slides .slide')
  const stepwizard = document.querySelectorAll('.stepwizard .stepwizard-step')
  const prevButton = document.querySelector('.goToPrev')
  const nextButton = document.querySelector('.goToNext')

  let currentSlide = 0

  function move (direction) {
    slides[currentSlide].className = 'slide prev'

    if (direction === slides.length - 1) {
      nextButton.classList.add('opacity')
      nextButton.disabled = true
    } else {
      nextButton.classList.remove('opacity')
      nextButton.disabled = false
    }

    if (direction === 0) {
      prevButton.classList.add('opacity')
      prevButton.disabled = true
    } else {
      prevButton.classList.remove('opacity')
      prevButton.disabled = false
    }

    currentSlide = direction

    stepwizard[currentSlide].classList.add('active')
    slides[currentSlide].className = 'slide current'
  }

  prevButton.addEventListener('click', () => move(currentSlide - 1))
  nextButton.addEventListener('click', () => move(currentSlide + 1))

  move(0)

  // let slideInterval = setInterval(move, 2000)
}

export default Slider
