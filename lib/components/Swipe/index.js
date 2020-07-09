function Swipe (el, callback) {
  const touchsurface = el
  let dir
  let swipeType
  let startX
  let startY
  // let dist
  let distX
  let distY
  const threshold = 150
  const restraint = 100
  const allowedTime = 500
  let elapsedTime
  let startTime
  const handletouch = callback

  touchsurface.addEventListener('touchstart', e => {
    const touchobj = e.changedTouches[0]
    dir = 'none'
    swipeType = 'none'
    // dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime()
    handletouch(e, 'none', 'start', swipeType, 0)
  }, { passive: true })

  touchsurface.addEventListener('touchmove', e => {
    const touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX
    distY = touchobj.pageY - startY
    if (Math.abs(distX) > Math.abs(distY)) {
      dir = (distX < 0) ? 'left' : 'right'
      handletouch(e, dir, 'move', swipeType, distX)
    } else {
      dir = (distY < 0) ? 'up' : 'down'
      handletouch(e, dir, 'move', swipeType, distY)
    }
  }, { passive: true })

  touchsurface.addEventListener('touchend', e => {
    elapsedTime = new Date().getTime() - startTime
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        swipeType = dir
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        swipeType = dir
      }
    }

    handletouch(e, dir, 'end', swipeType, (dir === 'left' || dir === 'right') ? distX : distY)
  }, { passive: true })
}

export default Swipe
