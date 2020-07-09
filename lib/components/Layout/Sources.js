function Sources () {
  const ln = window.localStorage.getItem('ln') || 'en'

  let url = 'https://raw.githubusercontent.com/wiki/amark/gun/'

  switch (ln) {
    case 'en': {
      url = 'https://raw.githubusercontent.com/wiki/amark/gun/'
      break
    }
    case 'es': {
      url = 'https://raw.githubusercontent.com/wiki/estebanrfp/gun.eco/'
      break
    }
    default: {
      url = 'https://raw.githubusercontent.com/wiki/amark/gun/'
      break
    }
  }
  return url
}

export default Sources
