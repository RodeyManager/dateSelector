define(["box"], function (DateBox) {
    var DateField = function(element, date, noday, render) {
        this.element = element;
        this.showtarget = element.find('.com_date_txt');
        this.date = date;
        this.noday = noday ? 2 : 1;
        
        if(render) {
            this.render = render;
        }
        this.init();
    }
    DateField.hasInitDate = false;
    DateField.hideDataCom = function(){
    	if(DateField.hasInitDate){
    		DateBox.hide();
    		$('.com_date_active').removeClass('com_date_active');
    	} 
    }

    DateField.prototype.init = function() {
        var self = this;
        this.element.bind('tap', function(index) {
            self._init();//点击日历控件触发一个事件，用来重写
            if(DateField._loading || !DateField._loaded) {
                DateField._loading = true;
                // 创建城市外层标签
                var wrap = $(document.createElement('div'));
                $(document.body).append(wrap);
                wrap.load('template/date.html', _.bind(function() {
                    this._load(function() {
                        //App.focusElement.style.display = 'block';
                        DateBox.show(self.date, _.bind(self.setDate, self), self.noday);
                        DateField.hasInitDate = true;
                        self.showtarget.addClass('com_date_active')
                    });
                }, self));
            } else {
                DateBox.show(self.date, _.bind(self.setDate, self), self.noday);
                $('.com_date_active').removeClass('com_date_active');//先移除其他的组件激活效果
                self.showtarget.addClass('com_date_active')
            }
        });

        this.render();
    }

    DateField.prototype._load = function(callback) {
        
        // 加载完毕
        DateField._loading = false;
        DateField._loaded = true;
        callback();
    }
    /**
     * 渲染日期, 允许重构
     */
    DateField.prototype.render = function(onlyget) {
        //日历控件完成触发一个事件，用来重写
        this._render();
        var date = this.date;
        if(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            month = (month < 10 ? '0' + month : month);
            day = (day < 10 ? '0' + day : day);

            // var format = year + '-' + month + '-' + day;
            var format = year + '年    ' + month + '月' + day + '日';
            if(!onlyget) {
                this.showtarget.text(format);
                this.showtarget.val(format);
            }
            return format;
        }
    }
    DateField.prototype.getTimes = function(format){
        var date = this.date;
        if(date){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            hours = (hours < 10) ? '0' + hours : hours;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
        }
        format = format ? format : ':';
        return hours + format + minutes + format + seconds;
    }
    //日历控件完成触发一个事件，用来重写
    DateField.prototype._render=function(){
        //日历控件出现穿透的情况，此处修正
           
    }
    //点击日历控件触发一个事件，用来重写
    DateField.prototype._init=function(){
    }

    DateField.prototype.setElement = function(element) {
        this.element = element;
    }

    DateField.prototype.setDate = function(date, hide) {
        this.date = date;
        if(this.validate(date)) {
            this.render();
            if(hide) {
                DateBox.hide();
                this.showtarget.removeClass('com_date_active');
            }
        }
    }

    DateField.prototype.getDate = function() {
        return this.date;
    }

    DateField.prototype.validate = function() {
        return true;
    }
    DateField.prototype.changeShow = function(txt, str, flag){
    	this.showtarget.text(txt);
    }
    
    return DateField;
});
