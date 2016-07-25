/**
 * 平滑滚动
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-25
 *
 * Reference uikit.smoothscroll.js
 *
 * API
 * --------
 * $(element).smoothScroll();
 */

var $ = require('jquery')


if (!$.easing.easeOutExpo) $.easing.easeOutExpo = function (x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};

// 构造函数
// ---------
var SmoothScroll = function (element, options) {
  this.$el = $(element);
  this.options = options;

  this.$targetElement = $("body");
  if(!!$(this.$el[0].hash).length) this.$targetElement = $(this.$el[0].hash);
  if(!!$(this.$el.attr('data-target')).length) this.$targetElement = $(this.$el.attr('data-target'));

  this.init();
};

SmoothScroll.VERSION = '{{VERSION}}';

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
SmoothScroll.prototype.init = function () {
    this.$el.on('click.ui.smoothScroll', this.scroll(this.$el, this.$targetElement, this.options));
};


/**
 * 滚条
 * @param options
 * @returns {Function}
 */
SmoothScroll.prototype.scroll = function (elem, targetElement, options) {
  return function (e) {
    e.preventDefault();
    scrollToElement(elem, targetElement, options);
  }
};

/**
 * 完成触发
 */
function emit(elem) {
    return function () {
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

    if ((target + winH) > docH) {
        target = docH - winH;
    }

    $('html,body')
        .stop()
        .animate({scrollTop: target}, options.duration, options.transition)
        .promise()
        .done([options.complete, emit(elem)]);
}

/**
 * 外部调用接口
 * @param  {[type]} targetElement [description]
 * @param  {[type]} options       [description]
 * @return {[type]}               [description]
 */
SmoothScroll.prototype.scrollTo = function(options) {
  scrollToElement(this.$el, this.$targetElement, options || {})
}


// 插件定义
// ---------
function Plugin(options, otherOptions) {
    return $(this).each(function () {
        var $this = $(this);
        var data = $this.data('ui.smoothScroll');
        if (!data) {
            $this.data('ui.smoothScroll', (new SmoothScroll(this, $.extend({}, $this.data(), options))));
        } else if( options === 'scrollTo'){
            data.scrollTo(otherOptions)
        } else {
            $this.trigger('click.ui.smoothScroll');
        }
    })
}


// jQuery 插件扩展
$.fn.smoothScroll = Plugin;
$.fn.smoothScroll.Constructor = SmoothScroll;

$(function () {
    $('[data-toggle="smooth-scroll"]').smoothScroll()
})

module.exports = SmoothScroll
