/*!
 * smooth-scroll 平滑滚动
 * tommyshao <jinhong.shao@frontpay.cn>
 * Reference uikit.smoothscroll.js
 * API:
 *      $(element).placeholder();
 */

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/smoothScroll', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    if(!$.easing.easeOutExpo) $.easing.easeOutExpo = function(x, t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b; };

    // 构造函数
    // ---------
    var SmoothScroll = function(element, options) {
        this.$el = $(element);
        this.options = options;
        this.init();
    };

    SmoothScroll.VERSION = '1.0.0';

    /**
     * 默认配置参数
     * @param duration 动画时间
     * @param transition 动画类型
     * @param offset 距离目标位置
     * @param complete 到达位置时完成执行
     * @type {{duration: number, transition: string, offset: number, complete: (*|number|noop|Function)}}
     */
    SmoothScroll.DEFAULTS = {
        duration: 500,
        transition: 'easeOutExpo',
        offset: 0,
        complete: $.noop
    };

    /**
     * init 初始化
     */
    SmoothScroll.prototype.init = function(){
        this.$el.on('click.ui.smoothScroll', this.scroll(this.$el, this.options));
    };



    /**
     * 滚条
     * @param options
     * @returns {Function}
     */
    SmoothScroll.prototype.scroll = function(elem, options) {
        return function(e) {
            e.preventDefault();
            scrollToElement(elem, $(this.hash).length ? $(this.hash) : $("body"), options);
        }
    };

    /**
     * 完成触发
     */
    function emit(elem){
        return function(){
            var e = $.Event('done.ui.smoothscroll', {relatedTarget: elem});
            elem.trigger(e);
        }
    };

    /**
     * 滚动条跳转到某元素
     * @param elem 目的元素
     * @param options 配置参数
     */
    function scrollToElement(elem, targetElement, options) {
        options = $.extend({}, SmoothScroll.DEFAULTS, options);

        var target = targetElement.offset().top - options.offset,
            docH = $(document).height(),
            winH = $(window).height();

        if((target + winH) > docH) {
            target = docH - winH;
        }

        $('html,body')
            .stop()
            .animate({ scrollTop: target}, options.duration, options.transition)
            .promise()
            .done([options.complete, emit(elem)]);
    }



    // 插件定义
    // ---------
    function Plugin(options) {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.smoothScroll');
            if(!data){
                $this.data('ui.smoothScroll', (new SmoothScroll(this, $.extend({}, $this.data(), options))));
            } else {
                $this.trigger('click.ui.smoothScroll');
            }
        })
    }


    // jQuery 插件扩展
    $.fn.smoothScroll = Plugin;
    $.fn.smoothScroll.Constructor = SmoothScroll;

    $(function(){ $('[data-toggle="smooth-scroll"]').smoothScroll() })

    return SmoothScroll;

}));


