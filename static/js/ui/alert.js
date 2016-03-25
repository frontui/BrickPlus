//     警告框
//     tommyshao <jinhong.shao@frontpay.cn>
//     Reference bootstrap.alert.js
//     API:
//     $(element).on('closed.ui.alert', function(e, obj){});

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/alert', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory('ui/alert', require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    var dismiss = '[data-dismiss="alert"]';
    var closeBtn = 'em';

    // 构造函数
    // ------
    var Alert = function(el, callback) {
        var that = this;
        if(typeof callback === 'function') {
            $(el).on('click', closeBtn, function(){
                var $close = $(this);
                callback(function(){
                    that.close.call($close)
                });
            });
        } else {
            $(el).on('click', closeBtn, this.close);
        }
    };

    Alert.VERSION = '1.0.0';

    // 动画过渡时间
    Alert.TRANSITION_DURATION = 150;

    // 关闭
    // -----
    Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $(this).attr('data-target');

        if (!selector) { // a[href=#test]关闭 id为test的alert
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        var $parent = $(selector);

        if(e) e.preventDefault();

        if(!$parent.length) {
            $parent = $this.closest('.alert');
        }

        $parent.trigger(e = $.Event('close.ui.alert'));

        if(e.isDefaultPrevented()) return;

        $parent.removeClass('in');

        function removeElement() {
            var ev = $.Event('closed.ui.alert',{relatedTarget: $parent});
            $parent.detach().remove();
            $this.trigger(ev);
        }

        if($.support.transition && $parent.hasClass('fade')) { // css3
            $parent.one('uiTransitionEnd', removeElement)
                .emulateTransitionEnd(Alert.TRANSITION_DURATION)
        } else {
            $parent.fadeOut(Alert.TRANSITION_DURATION, removeElement)
        }
    };


    // 插件定义
    // -------
    function Plugin(option) {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.alert');

            if(!data) $this.data('ui.alert', (data = new Alert(this, option)));
            if(typeof option == 'string') data[option].call($(this));
        })
    }


    // jQuery 插件扩展
    // --------------
    $.fn.alert = Plugin;
    $.fn.alert.Constructor = Alert;

    // 元素插件绑定
    // -----------
    $(function(){
        $(document).on('click.ui.alert', function(e){
            var that = e.target;
            $(that).is(dismiss) && Alert.prototype.close.call(that, e);
        })
    })


    return $;

}));
