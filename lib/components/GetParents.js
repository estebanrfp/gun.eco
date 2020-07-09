function getParents (el, untilElementSelector) {
  var parents = []
  var stopElementSelector = untilElementSelector || 'html'
  var stopElement = document.querySelector(stopElementSelector)

  while ((untilElementSelector && el.parentNode !== stopElement) || (!untilElementSelector && el !== stopElement)) {
    el = el.parentNode
    parents.push(el)
  }

  return parents
}

export default getParents
