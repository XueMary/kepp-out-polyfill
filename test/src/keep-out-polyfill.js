
import 'key-board-hook'
(function(){
  class KeepOut {
    constructor() {
      this.winHeight = window.innerHeight;
      this.navHeight = screen.availHeight - this.winHeight
      this.isKeepOut = null
      this.isbodyHide = null
      this.dispatchResize = false
      
      this.keyHeight = 0
      this.clientY = 0
      this.fnQuery = []
      this.status = false
      this.init()
    }
  
    init() {
      this.initOrientation()
      this.initFocus()
      this.initBlur()
      this.initMove()
    }

    initOrientation() {
      window.addEventListener("orientationchange", () => {
        this.winHeight = window.innerHeight;
        this.navHeight = screen.availHeight - this.winHeight
        this.dispatchResize = false
      });
    }

    initMove() {
      window.addEventListener('touchstart', this.touchFn)
    }

    touchFn(){
      let transform = window.getComputedStyle(document.body, null).getPropertyValue('transform')
      let transformMatrix = transform.slice(7, transform.length - 1).split(', ')
      let translateY = transformMatrix[transformMatrix.length -1]
      if(translateY && translateY < 0){
        window.addEventListener('touchmove',this.touchmoveFn)
        window.addEventListener('touchend',this.touchendFn)
      }
    }
    touchmoveFn(){
      
    }
    touchendFn(){
      window.removeEventListener('touchmove',this.mouseMove)
      window.removeEventListener('touchend',this.mouseUp)
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
      else{
        this.keyHeight = window.innerHeight / 2
      }
    }
  
    onceComput () {
      if(this.dispatchResize) return;
      this.dispatchResize = true
      if(this.isKeepOut === null){
        this.isKeepOut = this.isResize()
        this.getKeiHeight()
      }
    }
  
    focusFn() {
      if(this.clientY > this.keyHeight) {
        if(this.isKeepOut === false || this.isbodyHide){
          let polyfill = this.clientY - this.keyHeight
          document.body.style.transition = '0.2s'
          document.body.style.transform = `translateY(-${polyfill}px)`
        }
      }
    }
  
    blurFn() {
      document.body.style.transform = `translateY(0px)`
    }
  
    initFocus() {
      window.addEventListener('click', (e) => {
        let event = e || window.event
        this.clientY = event.clientY
        let _this = this
        
        this.status = true
        if(this.fnQuery.length){
          this.fnQuery.forEach(fn=>{
            fn.call(_this)
          })
          this.fnQuery.length = 0
        }
      })
      window.addEventListener('keyboardFocus', () => {
        this.isbodyHide = window.getComputedStyle(document.body, null).getPropertyValue("overflow") === 'hidden'
        this.onceComput()
        if(this.status){
          this.focusFn()
          this.status = false
        }
        else{
          this.fnQuery.push(this.focusFn)
        }
      })
    }
  
    initBlur() {
      window.addEventListener('keyboardBlur', () => {
        this.blurFn()
        this.touchendFn()
      })
    }
  }
  new KeepOut()
})()

