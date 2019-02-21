class KeepOut {
  constructor() {
    this.winHeight = window.innerHeight;
    this.navHeight = screen.availHeight - this.winHeight
    this.isKeepOut = null
    this.isbodyHide = document.body.style.overflow === 'hidden'
    this.keyHeight = 0
    this.init()
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
    // 配合keyboard事件使用
    let curHeight = window.innerHeight;
    if (Math.abs(curHeight - this.winHeight) > this.navHeight) {
      return true
    }
    return false
  }

  onceComput () {
    if(this.isKeepOut === null){
      this.isKeepOut = this.isResize()
      if(this.isKeepOut){
        this.keyHeight = screen.availHeight - window.innerHeight
      }
    }
    this.onceComput = function(){}
  }

  polyfill() {
    document.body.style.transform = `translateY(-${this.keyHeight}px)`
  }

  hidePolyfill () {
    document.body.style.transform = `translateY(0px)`
  }

  focusFn() {
    if(this.isKeepOut === false || this.isbodyHide){
      this.polyfill()
      return;
    }
  }

  blurFn() {
    if(this.isKeepOut === false || this.isbodyHide){
      this.hidePolyfill()
      return;
    }
  }

  initFocus() {
    window.addEventListener('keyboardFocus', () => {
      this.onceComput()
      this.focusFn()
    })
  }

  initBlur() {
    window.addEventListener('keyboardBlur', () => {
      this.blurFn()
    })
  }
}
new KeepOut()