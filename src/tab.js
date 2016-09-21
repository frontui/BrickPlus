/**
 * @component   : tab 选项卡切换
 * @version     : {{VERSION}}
 * @author      : tommyshao <jinhong.shao@frontpay.cn>
 * @created     : 2016-07-06
 * @description : 基于 frontui
 * @Reference   : bootstrap.tab.js
 * @useage      :
 ## 用法
 ```
  $(element).on('closed.ui.alert', function(e, obj){});
 ```
 */

'use strict'

var $ = require('jquery')
require('./transition')

const toggle = '[data-toggle="tab"],.tabs-btn'

class Tab {
  constructor(element) {
    this.$el = $(element)

    this.VERSION = '{{VERSION}}'

    // 动画过渡时间
    this.TRANSITION_DURATION = 150
  }

  // 切换显示
  // ---------
  show() {
    let $this = this.$el

    // $ul 导航项元素
    // selector 对应项元素选择器
    let [$ul, selector] = [
      $this.closest('.tabs,[data-tab="item"]'),
      $this.data('target')
    ]

    // 当对应项选择器不存在时，如果为a标签则获取href对应的 hash(锚点)值
    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    // $previous 上一个高亮激活导航项
    // hideEvent 隐藏事件,发生在切换之前，由当前高亮激活导航项元素触发
    // showEvent 显示事件，发生在切换之前，由下一个高亮激活导航项元素触发
    // $target 对应项dom 元素
    //
    var $previous =  $ul.find('.active a'),
      [hideEvent, showEvent, $target] = [
        $.Event('hide.ui.tab', { relatedTarget: $this[0] }),
        $.Event('show.ui.tab', { relatedTarget: $previous[0] }),
        $(selector)
      ]

    // 上一个显示tab 项触发隐藏事件
    $previous.trigger(hideEvent)
    // 当前tab项触发显示事件
    $this.trigger(showEvent)

    // 阻止默认，则不切换
    if(showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

    // tab 导航切换
    this.activate($this.closest('li,[data-tab="nav"]'), $ul)
    // tab 内容切换
    this.activate($target, $target.parent(), function() {
      // 切换后上一个选项导航触发`已隐藏`事件
      $previous.trigger({ type: 'hidden.ui.tab', relatedTarget: $this[0]})
      // 整个 tab导航项触发已显示事件
      $this.trigger({ type: 'shown.ui.tab', relatedTarget: $previous[0]})
    })
  }

  // 切换内容
  // -------
  activate(element, container, callback) {
    let $active = container.find('> .active'),
        transition = callback && $.support.transition
                              && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length),
        next = () =>{
          $active.removeClass('active').find(toggle).attr('aria-expanded', false);

            element.addClass('active').find(toggle).attr('aria-expanded', true);

            if (transition) {
                // ie hack
                element[0].offsetWidth;
                element.addClass('in');
            } else {
                element.removeClass('fade');
            }

            callback && callback();
        }


        $active.length && transition ?
            $active.one('uiTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION)
            :
            next();
        $active.removeClass('in');
  }
}

// 插件定义
// ----------
function Plugin(option) {
    return $(this).each(function () {
        var $this = $(this);
        var data = $this.data('ui.tab');
        if (!data) $this.data('ui.tab', (data = new Tab(this)));
        if (typeof option == 'string') data[option] && data[option]();
    })
}

// jQuery 插件扩展
$.fn.tab = Plugin;
$.fn.tab.Constructor = Tab;

// 元素插件绑定
// -------------
var clickHandler = function(e) {
    if (!$(e.target).hasClass('tab-disabled')) {
        e.preventDefault();
        Plugin.call($(this), 'show')
    }
}

$(() => {
  $(document).on('click.ui.tab', toggle, clickHandler)
})

module.exports = Tab
