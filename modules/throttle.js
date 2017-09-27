export default function throttle (callback, ms) {
  let wait = false

  return function () {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, ms)
    }
  }
}
