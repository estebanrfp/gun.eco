import './styles.css'

function Spinner (mode) {
  const _spinner = document.querySelector('.spinner')
  if (mode === 'load') {
    _spinner.classList.add('fadeout')
  } else if (mode === 'show') {
    _spinner.classList.remove('fadeout')
  } else if (mode === 'hide') {
    _spinner.classList.add('fadeout')
  }
}

export default Spinner
