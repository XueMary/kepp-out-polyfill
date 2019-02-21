class KeepOut {
  constructor() {
    this.winHeight = window.innerHeight;
    this.navHeight = screen.availHeight - this.winHeight
    this.isKeepOut = null
    this.isbodyHide = document.body.style.overflow === 'hidden'
  }

  init() {
    this.initOrientation()
    this.initFocus()
    this.initBlur()
  }
  initOrientation() {
    window.addEventListener("orientationchange", () => {
      this.winHeight = window.innerHeight;
      this.navHeight = screen.availHeight - this.winHeight
    });
  }

  isResize() {
    let curHeight = window.innerHeight;
    if (Math.abs(curHeight - this.winHeight) > this.navHeight) {
      return true
    }
    return false
  }

  polyfill() {

  }

  focusFn() {
    switch (this.isKeepOut) {
      case null:
        this.isKeepOut = this.isResize()
        break;
      case false:
        this.polyfill()
        break;
    }
  }

  initFocus() {
    window.addEventListener('keyboardFocus', () => {
      this.focusFn()
    })
  }

  initBlur() {
    window.addEventListener('keyboardBlur', () => {
      
    })
  }
}

new KeepOut()