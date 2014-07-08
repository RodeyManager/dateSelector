define(function () {
    /**
     * 日期选择组件
     */
    var DateBox = {
        // 是否已被初始化
        isInit : false,
        // 当前日期
        date : null,
        minYear : 1950,
        maxYear : 2050,
        // DOM元素
        el : null,
        elYear : null,
        elMonth : null,
        elDay : null,
        elYearList : null,
        elMonthList : null,
        elDayList : null,
        elMaxDay29 : null,
        elMaxDay30 : null,
        elMaxDay31 : null,
        // 滚动对象
        scrollYear : null,
        scrollMonth : null,
        scrollDay : null,
        // 回调
        callback : null,
        // 初始化
        init : function() {
            // 获取元素
            var el = $('#comDateBox');
            this.elYear = el.find('#comDateBoxYear');
            this.elMonth = el.find('#comDateBoxMonth');
            this.elDay = el.find('#comDateBoxDay');
            this.elYearList = el.find('#comDateBoxYearList');
            this.elMonthList = el.find('#comDateBoxMonthList');
            this.elDayList = el.find('#comDateBoxDayList');
            this.el = el;

            // 创建列表
            this.createYearList(this.minYear, this.maxYear);
            this.createMonthList();
            this.createDayList();

            this.elMaxDay29 = el.find('#box_day_29');
            this.elMaxDay30 = el.find('#box_day_30');
            this.elMaxDay31 = el.find('#box_day_31');

            // 创建滚动组件
            this.createScroll();

            // 初始化完成按钮
            //el.find('#comDateComplete').click(_.bind(function() {
            el.find('#comDateComplete').bind('tap', _.bind(function() {
                this.callback(this.date, true);
            }, this));
            // 初始化完毕
            this.isInit = true;
        },
        // 创建年份列表
        createYearList : function(min, max) {
            var html = [];
            for(var y = min; y <= max; y++) {
                html.push('<li>' + y + '年</li>');
            }
            this.elYearList.html(html.join(''));
        },
        // 创建月份列表
        createMonthList : function() {
            var html = [];
            for(var m = 1; m <= 12; m++) {
                html.push('<li>' + m + '月</li>');
            }
            this.elMonthList.html(html.join(''));
        },
        // 创建日期列表
        createDayList : function() {
            var html = [];
            for(var d = 1; d <= 31; d++) {
                if(d > 28) {
                    html.push('<li id="box_day_' + d + '">' + d + '日</li>');
                } else {
                    html.push('<li>' + d + '日</li>');
                }
            }
            this.elDayList.html(html.join(''));
        },
        // 创建滚动组件
        createScroll : function() {
            var self = this;
            var scrollYear = new h5.Scroll(this.elYear[0], true, true);
            var scrollMonth = new h5.Scroll(this.elMonth[0], true, true);
            var scrollDay = new h5.Scroll(this.elDay[0], true, true);

            scrollYear.onscrollchange = function(top) {
                var year = self.minYear + parseInt((top += 146) / 84);
                self.setYear(year, true);
            }
            scrollMonth.onscrollchange = function(top) {
                var month = 1 + parseInt((top += 146) / 84);
                self.setMonth(month, true);
            }
            scrollDay.onscrollchange = function(top) {
                var day = 1 + parseInt((top += 146) / 84);
                self.setDay(day);
            }

            scrollYear._setup();
            scrollMonth._setup();
            scrollDay._setup();

            this.scrollYear = scrollYear;
            this.scrollMonth = scrollMonth;
            this.scrollDay = scrollDay;
        },
        getMaxDay : function(year, month) {
            if(month < 8) {
                if(2 == month) {
                    return (1 == ((0 == year % 400) || (0 == year % 4 && 0 != year % 100) ? 1 : 0) ? 29 : 28);
                } else {
                    return (0 == month % 2 ? 30 : 31);
                }
            } else {
                return (0 == month % 2 ? 31 : 30);
            }
        },
        setMaxDay : function(max) {
            var visibility = '';

            for(var i = 29; i <= 31; i++) {
                if(i > max) {
                    visibility = 'hidden';
                } else {
                    visibility = '';
                }

                this['elMaxDay' + i].css('visibility', visibility);
            }
        },
        setYear : function(year, noscroll) {
            if(!noscroll) {
                var index = year - this.minYear, //
                scrollYear = this.scrollYear, //
                top = scrollYear.setCurrentTop(index * 84 - 146);

                scrollYear.scrollTo(top);
            }

            var date = this.date, day = date.getDate();
            var maxDay = this.getMaxDay(year, date.getMonth() + 1);
            if(day > maxDay) {
                this.setDay(maxDay);
            }
            this.setMaxDay(maxDay);
            date.setFullYear(year);
        },
        setMonth : function(month, noscroll) {
            if(!noscroll) {
                var index = month - 1, //
                scrollMonth = this.scrollMonth, //
                top = scrollMonth.setCurrentTop(index * 84 - 146);

                scrollMonth.scrollTo(top);
            }

            var date = this.date, day = date.getDate();
            var maxDay = this.getMaxDay(date.getFullYear(), month);
            if(day > maxDay) {
                this.setDay(maxDay);
            }
            this.setMaxDay(maxDay);
            this.date.setMonth(month - 1);
        },
        setDay : function(day, noscroll) {
            var date = this.date;
            var maxDay = this.getMaxDay(date.getFullYear(), date.getMonth() + 1);
            if(day > maxDay) {
                day = maxDay;
            }

            if(!noscroll) {
                var index = day - 1, //
                scrollDay = this.scrollDay, //
                top = scrollDay.setCurrentTop(index * 84 - 146);
                scrollDay.scrollTo(top);
            }

            this.date.setDate(day);
        },
        getDate : function() {
            return this.date;
        },
        // 显示
        show : function(date, callback, type) {
            this.callback = callback;

            if(!this.isInit) {
                this.init();
            }

            if(type == 2) {
                this.el.addClass('com_box_onlyyd');
            } else {
                this.el.removeClass('com_box_onlyyd');
            }
            date = date || new Date();
            this.date = date;
            this.el.show();

            this.setYear(date.getFullYear());
            this.setMonth(date.getMonth() + 1);
            this.setDay(date.getDate());

        },
        // 隐藏
        hide : function() {
            this.el.hide();
            return this.getDate();
        }
    }

    return DateBox;

});
