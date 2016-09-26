/**
 * 警告框 v2.0
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-19
 *
 * Reference bootstrap.alert.js
 * API:
 *   $(element).on('closed.ui.alert', function(e, obj){});
 */

// 导入 jQuery
var $ = require('jquery')
var TRANSITION = require('./transition')
var Scroller = require('./scroller')

var dismiss = '[data-dismiss="alert"]';
var closeBtn = 'em';

// 构造函数
// ------
var Alert = function (el, option) {
    if(!this) return;
    // var that = this;
    this.$el = $(el);
    this.iScroller = null;

    // this.$el.on('click', closeBtn, $.proxy(this.close, this));
    // 检测是否为多条滚动
    this.$el.is('.alert') && this.scroller();
};

Alert.VERSION = '{{VERSION}}';

// 动画过渡时间
Alert.TRANSITION_DURATION = 300;

// 关闭
// -----
Alert.prototype.close = function (e, force) {

    if (e) e.preventDefault();

    //var $this = $(this);
    //var $parent = Alert.prototype._getParent($this);
    var $parent = this.$el

    !!!force && $parent.trigger(e = $.Event('close.bp.alert'));

    

    if (e.isDefaultPrevented() && !force) return;

    $parent.addClass('out');

    function removeElement() {
        var data = $parent.data('bp.alert');
        var ev = $.Event('closed.bp.alert', {relatedTarget: $parent});

        // 干掉滚动
        if(data && data.iScroller) data.iScroller.destroy();

        $parent.trigger(ev).detach().remove();
    }

    if ($.support.transition) { // css3
        $parent.one('uiTransitionEnd', removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION)
    } else {
        $parent.fadeOut(Alert.TRANSITION_DURATION, removeElement)
    }
};

// --- 获取父级
Alert.prototype._getParent = function(el) {
  var $this = $(el);
  var selector = $this.attr('data-target');

  if (!selector) { // a[href=#test]关闭 id为test的alert
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
  }

  var $parent = $(selector);

  if (!$parent.length) {
      $parent = $this.closest('.alert');
  }

  return $parent;
}

// --- 多条消息滚动
Alert.prototype.scroller = function() {
  var $ul = this.$el.find('ul');
  !!$ul.length && (this.iScroller = new Scroller($ul));
}


// 插件定义
// -------
function Plugin(option) {
    var args = [].slice.call(arguments, 1);
    return $(this).each(function () {
        var $this = $(this);
        var data = $this.data('bp.alert');


        if (!data) $this.data('bp.alert', (data = new Alert($this, option)));
        if (typeof option === 'string'){
            data[option].apply(data, args)
        } 
    })
}


// jQuery 插件扩展
// --------------
$.fn.alert = Plugin;
$.fn.alert.Constructor = Alert;

// 元素插件绑定
// -----------
$(function () {
    // 绑定 alert 插件
    $('.alert').alert();

    $(document).on('click.bp.alert', dismiss, function (e) {
        //Alert.prototype.close.call(e.target, e);
        var el = Alert.prototype._getParent(e.target);
        $(el).length && $(el).alert('close', e)
    })
})

module.exports = Alert
