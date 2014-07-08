
/**
 * 滚动条
 * @param {DOM Object} element
 * @param {Boolean} preventDefault
 * @param {Boolean} stopPropagation
 *
 * @require h5.Touch
 *
 * @example
 * <div id="element" class="h5-scroll">
 *     <div>
 *         content
 *     </div>
 * </div>
 *
 * new h5.Scroll(element);
 */

h5.Scroll = function(element, preventDefault, stopPropagation) {
    this._element = element;
    this._content = element.children[0];

    this._elementHeight = 0;
    this._contentHeight = 0;
    this._maxTop = 0;

    this._touchStartTop = 0;
    this._touchStartTime = null;

    this._currentTop = 0;

    this._preventDefault = preventDefault;
    this._stopPropagation = stopPropagation;

    this._init();
}

h5.Scroll.prototype = {
    _init : function() {
        var touch = new h5.Touch(this._element, this._preventDefault, this._stopPropagation), self = this;

        touch.ontouchstart = function(e) {
            self._setup();
            self._touchstart(e.pageY);
        }
        touch.ontouchmove = function(e) {
            self._touchmove(e.pageY);
        }
        touch.ontouchend = function(e) {
            self._touchend(e.pageY);
        }
    },
    _setup : function() {
        this._elementHeight = this._element.clientHeight;
        this._contentHeight = this._content.clientHeight;

        this._maxTop = this._contentHeight - this._elementHeight + 146;
    },
    _touchstart : function(y) {
        this._touchStartTop = y;
        this._touchStartTime = new Date().getTime();
        this._content.className = this._content.className.replace(' h5-scroll-content-transition', '');
    },
    _touchmove : function(y) {
        this.scrollTo(this._currentTop + (this._touchStartTop - y));
    },
    _touchend : function(y) {
        var offset = this._touchStartTop - y, currentTop = this._currentTop + offset, speed = offset / (new Date().getTime() - this._touchStartTime), transition = false;

        if(Math.abs(speed) > 0.5) {
            currentTop += speed * 500;
        }

        // auto
        currentTop += 146;
        currentTop = parseInt(currentTop / 84) * 84;
        currentTop -= 146;

        this._content.className += ' h5-scroll-content-transition';
        var pretop = this._currentTop, //
        top = this.setCurrentTop(currentTop);
        this.scrollTo(top);

        if(pretop != top && this.onscrollchange) {
            this.onscrollchange(top);
        }
    },
    setCurrentTop : function(y) {
        if(y < -146) {
            y = -146;
        }

        if(this._maxTop != 146 && y > this._maxTop) {
            y = this._maxTop;
        }

        this._currentTop = y;
        return y;
    },
    scrollTo : function(y) {
        this._content.style.webkitTransform = 'translate3d(0, ' + -y + 'px, 0)';
    }
}

h5.Scroll.prototype.constructor = h5.Scroll;
