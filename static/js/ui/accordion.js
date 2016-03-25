//     accordion 手风琴
//     依赖于 ui/switcher.js
//     tommyshao <jinhong.shao@frontpay.cn>

// API:
// -----

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/according', ['jquery', 'ui/switcher'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    $.fn.accordion = function(option){
        var defaults = {
            item: 'li',
            target: '>div',
            active: 'active',
            except: false
        };

        option = $.extend({}, defaults, option);

        // 直接调用
        $(this).switcher(option);

        // 事件监听
        return $(this).each(function(){
            var $items = $(this).find(option.item);
            $(this).on('select.ui.switcher', function(e){
                var $this = $(e.relatedTarget), has = $this.hasClass(option.active), $actived = $items.find(option.target), $target = $this.find(option.target);
                !!!(option.except) && $actived.slideUp();
                $target.stop()[!has ? 'slideUp': 'slideDown']();

                e.stopPropagation();
                e.preventDefault();
            });
        });
    };

    return $;

}));
