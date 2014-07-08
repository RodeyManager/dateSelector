/**
 * 手势事件管理
 * @param {Object} options
 * @param {Boolean} preventDefault
 * @param {Boolean} stopPropagation
 *
 * @events:
 *     ontouchstart
 *     ontouchmove
 *     ontouchend
 *     ontap
 *     onswipeleft
 *     onswiperight
 *     onswipeup
 *     onswipedown
 *
 * @example
 * <div id="element"></div>
 *
 * var touch = new h5.Touch(element);
 * touch.ontap = function() {
 *
 * }
 *
 */
var h5 = {}
h5.Touch = function(element, preventDefault, stopPropagation) {
    this._element = element;
    this._preventDefault = preventDefault;
    this._stopPropagation = stopPropagation;

    this._startX = 0;
    this._startY = 0;
    this._istouch = false;

    if(h5.Touch.support) {
        element.addEventListener('touchstart', this, false);
        element.addEventListener('touchmove', this, false);
        element.addEventListener('touchend', this, false);
    } else {
        element.addEventListener('mousedown', this, false);
        element.addEventListener('mousemove', this, false);
        element.addEventListener('mouseup', this, false);
    }
}

h5.Touch.tapDistance = 20;
h5.Touch.swipeDistance = 100;

h5.Touch.support = typeof window.TouchEvent != 'undefined'; //( typeof window.TouchEvent != 'undefined') && (window.navigator.userAgent.indexOf('Mobile') > -1);
//mf by stz 14-2-13 ISS日期控件在三星note2上不能滑动的bug
/*
 * 初始化并注册事件,多次绑定会有多次事件监听器响应
 */
h5.Touch.tap = function(element, fn, preventDefault, stopPropagation) {
    if( typeof element == 'string') {
        element = document.getElementById(element);
    }
    // var ele = new h5.Touch(element);
    // ele.ontap = null;
    // ele.ontap = fn;
    new h5.Touch(element, preventDefault, stopPropagation).ontap = fn;
}

h5.Touch.prototype = {
    handleEvent : function(e) {
        switch (e.type) {
            case 'touchstart':
                this._touchstart(e.targetTouches[0]);
                break;
            case 'touchmove':
                this._touchmove(e.changedTouches[0]);
                break;
            case 'touchend':
                this._touchend(e.changedTouches[0]);
                break;
            case 'mousedown':
                this._touchstart(e);
                break;
            case 'mousemove':
                this._touchmove(e);
                break;
            case 'mouseup':
                this._touchend(e);
                break;
        }

        if(/SELECT|TEXTAREA|INPUT/.test(e.target.tagName.toUpperCase())) {
            e.stopPropagation();
        } else {
            if(this._preventDefault) {
                e.preventDefault();
            }
            if(this._stopPropagation) {
                e.stopPropagation();
            }
        }
    },
    _touchstart : function(e) {
        this._istouch = true;
        this._startX = e.pageX;
        this._startY = e.pageY;

        this.ontouchstart(e);
    },
    _touchmove : function(e) {
        if(this._istouch) {
            this.ontouchmove(e);
        }
    },
    _touchend : function(e) {
        var pageX = e.pageX, pageY = e.pageY, deltaX = pageX - this._startX, deltaY = pageY - this._startY, tapDistance = h5.Touch.tapDistance, swipeDistance = h5.Touch.swipeDistance;
        this._istouch = false;
        this.ontouchend(e);
        if(Math.abs(deltaX) < tapDistance && Math.abs(deltaY) < tapDistance) {
            this.ontap(e);
        } else {
            if(deltaX >= swipeDistance) {
                this.onswiperight(e);
            } else if(deltaX <= -swipeDistance) {
                this.onswipeleft(e);
            }

            if(deltaY >= swipeDistance) {
                this.onswipedown(e);
            } else if(deltaY <= -swipeDistance) {
                this.onswipeup(e);
            }
        }
    },
    /**
     * events
     */
    ontouchstart : function(pageX, pageY) {

    },
    ontouchmove : function(pageX, pageY) {

    },
    ontouchend : function(pageX, pageY) {

    },
    ontap : function() {

    },
    onswipeleft : function() {

    },
    onswiperight : function() {

    },
    onswipeup : function() {

    },
    onswipedown : function() {

    },
    /*
     *
     */
    getElement : function() {
        return this._element;
    }
}

h5.Touch.prototype.constructor = h5.Touch;
