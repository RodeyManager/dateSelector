/**
 * 为underscore扩展date对象操作
 */
(function() {

    // 语言包
    var lang = {
        F : ['January', 'February', 'March', 'April', 'May', 'June', 'Aguest', 'September', 'October', 'November', 'December'],
        M : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        D : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        l : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        a : ['am', 'pm'],
        A : ['AM', 'PM']
    }

    // 负责将特定字符转换为对应日期的函数集
    var convert = {
        // 月份中的第几天，有前导零的2位数字：01 到 31
        d : function() {
            var day = this.getDate();
            return day < 10 ? '0' + day : day;
        },
        // 星期中的第几天，文本表示，3个字母：Mon 到 Sun
        D : function() {
            return lang.D[this.getDay()];
        },
        // 月份中的第几天，没有前导零：1 到 31
        j : function() {
            return this.getDate();
        },
        // 星期几，完整的文本格式：Sunday 到 Saturday
        l : function() {
            return lang.l[this.getDay()];
        },
        // ISO-8601 格式数字表示的星期中的第几天：1（表示星期一）到 7（表示星期天）
        N : function() {
            var week = this.getDay();
            return (0 == week ? 7 : week);
        },
        // 星期中的第几天，数字表示：0（表示星期天）到 6（表示星期六）
        w : function() {
            return this.getDay();
        },
        // 年份中的第几天：0 到 366
        z : function() {
            return Math.ceil((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
        },
        // ISO-8601 格式年份中的第几周，每周从星期一开始，例如：42（当年的第 42 周）
        W : function() {
            return Math.ceil((this - new Date(this.getFullYear(), 0, 1)) / 604800000);
        },
        // 月份，完整的文本格式，例如 January 或者 March：January 到 December
        F : function() {
            return lang.F[this.getMonth()];
        },
        // 数字表示的月份，有前导零：01 到 12
        m : function() {
            var month = this.getMonth();
            month += 1;
            return (month < 10 ? '0' + month : month);
        },
        // 三个字母缩写表示的月份：Jan 到 Dec
        M : function() {
            return lang.M[this.getMonth()];
        },
        // 数字表示的月份，没有前导零：1 到 12
        n : function() {
            return this.getMonth() + 1;
        },
        // 给定月份所应有的天数：28 到 31
        t : function() {
            var month = this.getMonth();
            month += 1;
            if(month < 7) {
                if(2 == month) {
                    return (1 == convert.L.call(this) ? 29 : 28);
                } else {
                    return (0 == month % 2 ? 30 : 31);
                }
            } else {
                return (0 == month % 2 ? 31 : 30);
            }
        },
        // 是否为闰年，如果是闰年为 1，否则为 0
        L : function() {
            var year = this.getFullYear();
            return ((0 == year % 400) || (0 == year % 4 && 0 != year % 100) ? 1 : 0);
        },
        // 4 位数字完整表示的年份，例如：1999 或 2003
        Y : function() {
            return this.getFullYear();
        },
        // 2 位数字表示的年份，例如：99 或 03
        y : function() {
            return this.getFullYear().toString().substring(2, 4);
        },
        // 小写的上午和下午值：am 或 pm
        a : function() {
            return (this.getHours() < 12 ? lang.a[0] : lang[1]);
        },
        // 大写的上午和下午值：AM 或 PM
        A : function() {
            return (this.getHours() < 12 ? lang.A[0] : lang.A[1]);
        },
        // Swatch Internet 标准时：000 到 999
        B : function() {
            var time, hours = this.getHours(), minutes = this.getMinutes(), seconds = this.getSeconds();
            hours = hours * 60 * 60 * 1000;
            minutes = minutes * 60 * 1000;
            seconds = seconds * 1000;
            time = hours + minutes + seconds + this.getMilliseconds();
            time = ~~(time / 86400);

            return time;
        },
        // 小时，12 小时格式，没有前导零：1 到 12
        g : function() {
            var time, hours = this.getHours();
            time = hours < 13 ? hours : hours - 12;
            if(0 == time) {
                time = 12;
            }

            return time;
        },
        // 小时，24 小时格式，没有前导零：0 到 23
        G : function() {
            return this.getHours();
        },
        // 小时，12 小时格式，有前导零：01 到 12
        h : function() {
            var time, hours = this.getHours();
            hours = hours;
            time = hours < 13 ? hours : hours - 12;
            if(0 == time) {
                time = 12;
            }
            time = time < 10 ? '0' + time : time;

            return time;
        },
        // 小时，24 小时格式，有前导零：00 到 23
        H : function() {
            var hours = this.getHours();
            return hours < 10 ? '0' + hours : hours;
        },
        // 有前导零的分钟数：00 到 59>
        i : function() {
            var minutes = this.getMinutes();
            return minutes < 10 ? '0' + minutes : minutes;
        },
        // 秒数，有前导零：00 到 59>
        s : function() {
            var seconds = this.getSeconds();
            return seconds < 10 ? '0' + seconds : seconds;
        }
    }

    // 根据日期字符串获取一个Date对象, 如果没有指定日期字符串则返回当前Date
    // @param {Mixed} obj
    var create = function(obj) {
        if(!obj) {
            return new Date();
        }
        if( typeof obj == 'date') {
            return obj;
        }
        if(/^\d+$/.test(obj)) {
            return new Date(parseInt(obj));
        }

        var date = new Date(Date.parse(obj));
        if(isNaN(date)) {
            obj = obj.replace(/:/g, '-');
            obj = obj.replace(' ', '-');
            obj = obj.replace('.', '-');
            var arys = obj.split('-');
            switch (arys.length) {
                case 7:
                    date = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5], arys[6]);
                    break;
                case 6:
                    date = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5]);
                    break;
                default:
                    date = new Date(arys[0], --arys[1], arys[2]);
            }
        }
        return date;
    }
    // 将Date对象格式化为字符串
    // @param {Date} obj 需要进行格式化的Date对象
    // @param {String} exp 格式表达式, 例如: 'Y-m-d H:i:s'
    var format = function(obj, exp) {
        if(!exp) {
            return format(obj, 'Y-m-d H:i:s');
        }
        exp = exp.toString().split('');

        var c, str = '';

        for(var i = 0, len = exp.length; i < len; i++) {
            c = exp[i];
            str += (convert[c] ? convert[c].call(obj) : c);
        }
        return str;
    }

    _.mixin({
        /**
         * 根据日期字符串获取一个Date对象, 如果没有指定日期字符串则返回当前Date
         */
        date : create,
        /**
         * 返回Date对象的时间戳
         */
        timestamp : function(obj) {
            return create(obj).getTime();
        },
        /**
         * 将Date对象格式化为字符串
         */
        format : format,
        /**
         * 时间计算器
         * @param {Date} obj
         * @param {Number} value, default: 1
         * @param {String} unit, default: d
         * unit format: y|m|d|h|i|s|ms
         */
        addtime : function(obj, value, unit) {
            var result = null, year = obj.getFullYear(), month = obj.getMonth();
            value = ~~value;

            switch (unit) {
                case 'm':
                    obj.setMonth(month + value);
                    result = format(obj, 'Y-m-d H:i:s');
                    obj.setMonth(obj.getMonth() - value);
                    break;
                case 'y':
                    obj.setYear(year + value);
                    result = format(obj, 'Y-m-d H:i:s');
                    obj.setYear(year);
                    break;
                default:
                    var multiple = {
                        ms : 1,
                        s : 1000,
                        i : 60000,
                        h : 3600000,
                        d : 86400000
                    }
                    result = obj.getTime() + value * multiple[unit || 'd'];
                    break;
            }

            return create(result);
        }
    });
})();
