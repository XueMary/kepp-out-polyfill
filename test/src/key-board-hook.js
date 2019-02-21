(function () {
  class keyboardHook {
    constructor() {
      this.winHeight = window.innerHeight;
      this.navHeight = screen.availHeight - this.winHeight
      this.tagNames = ["input", "textarea"];
      this.types = ["text", "password", "number"];
      this.keyboardFocus = new Event("keyboardFocus");
      this.keyboardBlur = new Event("keyboardBlur");

      this.isShowKeyBoard = false;
      this.isResize = false;
      this.isOrienta = false
      this.num = 0
      this.init();
    }

    init() {
      this.initClick();
      this.initResize();
      this.initOrientation();
    }

    initOrientation() {
      let _this = this;
      window.addEventListener("orientationchange", function () {
        _this.winHeight = window.innerHeight;
        _this.navHeight = screen.availHeight - _this.winHeight
        _this.isOrienta = true
      });
    }

    initResize() {
      this.resizeF = this.resizeF(this, this.resiFn);
      window.addEventListener("resize", this.resizeF);
    }

    initClick() {
      let _this = this;
      let clickFn = function (e) {
        if (_this.num < 1) {
          let isInput = _this.isInput(e);
          if (!isInput) return;
          _this.num++
          _this.clickTimes = setTimeout(() => {
            _this.clickFocus();
          }, 500);
        }
        else {
          window.removeEventListener("click", clickFn);
          if (!_this.isResize) {
            clickFn = function (e) {
              let isInput = _this.isInput(e);
              if (isInput) {
                _this.clickFocus();
              } else {
                _this.clickBlur();
              }
            };
            clickFn(e);
            window.addEventListener("click", clickFn);
            window.removeEventListener("resize", _this.resizeF);
          }
        }
      };
      window.addEventListener("click", clickFn);
    }

    resizeF(_this, fn) {
      return function () {
        if (_this.isOrienta) {
          _this.isOrienta = false
          return;
        }

        if (!_this.isResize) {
          let curHeight = window.innerHeight;
          if (Math.abs(curHeight - _this.winHeight) > _this.navHeight) {
            clearTimeout(_this.clickTimes)
            _this.isResize = true;
            fn.call(_this);
          }
          return;
        }

        fn.call(_this);
      }
    }

    isInput(e) {
      function isThunks(arrs) {
        return function (arr) {
          arr = arr.toLowerCase();
          if (arrs.indexOf(arr) !== -1) {
            return true;
          }
          return false;
        };
      }

      const isTag = isThunks(this.tagNames);
      const isType = isThunks(this.types);

      const event = e || window.event;
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      const type = target.type;

      if (!isTag(tagName)) {
        return false;
      } else if (tagName === "input" && !isType(type)) {
        return false;
      }
      return true;
    }

    clickFocus() {
      if (this.isShowKeyBoard) return;
      this.isShowKeyBoard = true;
      window.dispatchEvent(this.keyboardFocus)
    }
    clickBlur() {
      if (!this.isShowKeyBoard) return;
      this.isShowKeyBoard = false;
      window.dispatchEvent(this.keyboardBlur)
    }

    resiFn() {
      if (this.isShowKeyBoard) {
        this.resizeBlur()
      }
      else {
        this.resizeFocus()
      }
    }

    resizeFocus() {
      let curHeight = window.innerHeight;
      if (Math.abs(curHeight - this.winHeight) > this.navHeight) {
        this.isShowKeyBoard = true;
        window.dispatchEvent(this.keyboardFocus);
      }
    }
    resizeBlur() {
      let curHeight = window.innerHeight;
      if (Math.abs(curHeight - this.winHeight) < this.navHeight) {
        this.isShowKeyBoard = false;
        window.dispatchEvent(this.keyboardBlur);
      }
    }
  }

  function isMobile() {
    return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
  }

  if (isMobile()) {
    new keyboardHook()
  }
})()