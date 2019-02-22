class KeepOut {
  constructor() {
    this.winHeight = window.innerHeight;
    this.navHeight = screen.availHeight - this.winHeight
    this.isKeepOut = null
    this.isbodyHide = null
    
    this.keyHeight = 0
    this.clientY = 0
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
      this.getKeiHeight()
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

  getKeiHeight () {
    if(this.isKeepOut){
      this.keyHeight = screen.availHeight - window.innerHeight - 50
    }
  }

  onceComput () {
    if(this.isKeepOut === null){
      this.isKeepOut = this.isResize()
      this.getKeiHeight()
    }
    this.onceComput = function(){}
  }

  focusFn() {
    if(this.isKeepOut === false || this.isbodyHide){
      if(this.clientY > this.keyHeight) {
        let polyfill = this.clientY - this.keyHeight
        document.body.style.transition = '0.2s'
        document.body.style.transform = `translateY(-${polyfill}px)`
      }
    }
  }

  blurFn() {
    if(this.isKeepOut === false || this.isbodyHide){
      document.body.style.transform = `translateY(0px)`
    }
  }

  initFocus() {
    window.addEventListener('click', (e) => {
      let event = e || window.event
      this.clientY = event.clientY
    })
    window.addEventListener('keyboardFocus', () => {
      this.isbodyHide = window.getComputedStyle(document.body, null).getPropertyValue("overflow") === 'hidden'
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