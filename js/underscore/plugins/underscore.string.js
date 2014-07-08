/**
 * 为underscore扩展字符串对象操作
 */
_.mixin({
    /**
     * 获取字符串的字节数长度
     */
    getByte : function(obj) {
        var charCode = 0, count = 0;
        for(var i = 0, len = obj.length; i < len; i++) {
            charCode = obj[i].charCodeAt(0);
            count += (charCode > 0 && charCode < 127) ? 1 : 2;
        }
        return count;
    },
    /**
     * 去除字符串左边空白字符
     */
    ltrim : function(obj) {
        return obj.replace(/(^\s*)/g, '');
    },
    /**
     * 去除字符串右边空白字符
     */
    rtrim : function(obj) {
        return obj.replace(/(\s*$)/g, '');
    },
    /**
     * 去除字符串左右两边空白字符
     */
    trim : function(obj) {
        return obj.replace(/(^\s*)|(\s*$)/g, '');
    },
    /**
     * 把一些预定义的字符转换为HTML实体
     */
    filter : function(obj) {
        var result = [], c = '';
        for(var i = 0, len = obj.length; i < len; i++) {
            c = obj.charAt(i);
            switch (c) {
                case '<':
                    result[i] = '&lt;';
                    break;
                case '>':
                    result[i] = '&gt;';
                    break;
                case '"':
                    result[i] = '&quot;';
                    break;
                case '\'':
                    result[i] = '&#39;';
                    break;
                case '%':
                    result[i] = '&#37;';
                    break;
                case ';':
                    result[i] = '&#59;';
                    break;
                case '(':
                    result[i] = '&#40;';
                    break;
                case ')':
                    result[i] = '&#41;';
                    break;
                case '&':
                    result[i] = '&amp;';
                    break;
                case '+':
                    result[i] = '&#43;';
                    break;
                case ' ':
                    result[i] = '&nbsp;';
                    break;
                default:
                    result[i] = c;
                    break;
            }
        }
        return result.join('');
    },
    /**
     * 在字符串中的每个新行\n之前插入HTML换行符<br />
     */
    nl2br : function(obj) {
        return obj.replace(/\n/g, '<br />');
    }
});
