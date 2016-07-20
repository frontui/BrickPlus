/**
 * 上下无缝滚动
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-19
 */

var $ = require('jquery')

//-------
// 构造函数
var Scroller = function(el, option) {
  this.$el = $(el);
  this.options = $.extend({}, Scroller.DEFUALTS, option);

  this.init();
}

// 原型
Scroller.prototype = {
  constructor: Scroller,
  // 初始化
  init: function() {
    this.$items = this.$el.find(this.options.item);
    this.max = this.$items.length;

    // 单条消息不滚动
    if(this.max <= 1) return;

    this.$el.addClass('scroller'+ (!this.options.dir ? ' reverse' : ''));
    this.$items.slice(1, this.max).addClass('ready');
    this.controller = null;
    this.current = 0;
    this.run();

  },
  // 滚动
  run: function() {
    // this.interval();
    this.start();
    this.$el.on('mouseenter', $.proxy(this.stop, this))
    this.$el.on('mouseleave', $.proxy(this.start, this))
  },
  start: function() {
    this.controller = setInterval($.proxy(this.interval, this), this.options.interval);
  },
  stop: function() {
    clearInterval(this.controller);
  },
  interval: function() {
    this.current = this.current >= this.max - 1 ? 0 : ++this.current;

    var indexs = this.getActiveIndexs();

    this.$items.eq(indexs[0])
              .removeClass('enter')
              .addClass('leave')
              .one('uiTransitionEnd', function() {
                $(this).removeClass('leave').addClass('ready');
              })
              .emulateTransitionEnd(this.options.timer)

    this.$items.eq(indexs[1]).addClass('enter');
  },
  getActiveIndexs: function() {
    return [
              this.current - 1 < 0 ? this.max - 1 : this.current - 1,
              this.current
            ];
    // return !!this.options.dir ?
    //         [
    //           this.current - 1 < 0 ? this.max - 1 : this.current - 1,
    //           this.current
    //         ] :
    //         [
    //           this.current + 1 > this.max - 1 ? 0 : this.current + 1,
    //           this.current
    //         ]
  },
  destroy: function() {
    this.stop();
    this.$el.detach().remove();
    return null;
  }
}

Scroller.DEFUALTS = {
  timer: 300, // 动画时间，须跟 css transition 定义时间一直
  item: 'li', // 每一条信息的 dom 元素，默认是ul布局
  interval: 3000, // 自动滚动时间间隔
  dir: 1          // 滚动的方向 1 - 为向上滚动，0 - 为向下滚动
}



// ----------
// jquery API

function Plugin(option) {
  return $(this).each(function() {
    var that = $(this),
        data = that.data('ui.scroller');
    if(!data) that.data('ui.scroller', (data = new Scroller(that, option)))
    if(typeof option === 'string') data[option]()
  })
}

$.fn.Scroller = Plugin;
$.fn.Scroller.constructor = Scroller;

module.exports = Scroller;
