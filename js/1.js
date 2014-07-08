/**
 * Created with JetBrains WebStorm.
 * User: EX-LUOYONG002 （Rodey -- www.senuu.com）
 * Date: 14-3-20
 * Time: 下午4:14
 * To change this template use File | Settings | File Templates.
 */

define(['zepto', 'underscore', 'datefield'], function($, _, DateField){



    var startDate = $('#startDate');

    require(['underscore.date'], function() {
        var dates = new Date();
        var startDateCom = new DateField(startDate, _(dates).date(), false, function() {
            var date 	= this.date, //
                year 		= date.getFullYear(), //
                month 		= date.getMonth() + 1,
                day         = date.getDate();
            var str = showDateTxt(this, year, month, day);

        });
    });

    function showDateTxt(dateCom, year, month, day){
        if(year && month) {
            month = ~~month;
            month = (month < 10) ? '0' + month : month;
            day = (day < 10) ? '0' + day : day;
            var str = year + '/' + month + '/' + day;
            dateCom.changeShow(str);
            return str;
        } else {
            dateCom.changeShow('请选择');
            return null;
        }
    }




});
