/**
 * Created with JetBrains WebStorm.
 * User: EX-LUOYONG002 （Rodey -- www.senuu.com）
 * Date: 14-3-20
 * Time: 下午3:53
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: EX-LUOYONG002
 * Date: 13-12-25
 * Time: 下午6:16
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl : '',
    shim : {
        'zepto' : {
            exports : '$'
        },
        'zepto.touch' : {
            deps : ['zepto']
        },
        'underscore' : {
            exports : '_'
        },
        scroll : {
            deps : ['touch'],
            exports : 'scroll'
        },
        datefield : {
            deps : ['touch','scroll','box'],
            exports : 'datefield'
        }

    },
    paths : {
        text                : 'js/require/text',
        zepto               : 'js/zepto/zepto.min',
        underscore          : 'js/underscore/underscore',
        'underscore.date'   : 'js/underscore/plugins/underscore.date',
        'underscore.string' : 'js/underscore/plugins/underscore.string',
        touch               : 'js/datefield/touch',
        scroll              : 'js/datefield/scroll',
        box                 : 'js/datefield/box',
        datefield           : 'js/datefield/datefield',
        "zepto.touch"       : "js/zepto/zepto.touch"
    }
});
//引入公共js模块
define(['zepto', 'underscore', 'datefield', 'zepto.touch', 'scroll'], function($, _, DateField){
    require([$('script[data-app]').attr('data-app')]);
});

