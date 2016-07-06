/**
 * @component   : checkAll全选
 * @version     : {{VERSION}}
 * @author      : tommyshao
 * @created     : 2016-07-05
 * @description :
 * @useage      :
 ## 用法
 ```
  <input type="checkbox" data-toggle="checkAll" data-target="selector" />
  $(element).on('checked.ui.checkAll', function(e){ e.relatedTarget; });
  $(element).on('reversed.ui.checkAll', function(e){ e.relatedTarget; });
 ```
 */

'use strict';

const $ = require('jquery')

const toggle = '[data-toggle="checkAll"]'


class CheckAll{
  // 构造函数
  // -------
  // * `element` dom元素对象
  constructor(element) {
    // dom元素
    this.$el = $(element)
    // 响应元素集合
    this.$target = $(this.$el.data('target'))
    // 是否反选模式
    this.isReverse = Boolean(this.$el.data('reverse'))

    // 版本号
    this.VERSION = '{{VERSION}}';

    // 初始化事件
    this.initEvents()
  }

  // 事件监听
  initEvents() {
    // 监听 `click` 点击事件
    this.$el.on('click', $.proxy(this.toggle, this))
  }

  // 切换中枢
  // -------
  toggle () {
    this.isReverse ? this.reverse() : this.activate()
  }

  // 全选功能
  // --------
  // Function activate
  activate(isChecked) {
    let [
      isCheck,
      e
    ] = [
      isChecked || this.$el.is(':checked'), // 当前dom元素是否勾选
      $.Event('checked.ui.checkAll', { relatedTarget: this.$el }) // 创建选中事件
    ]

    // 设置所有目标元素属性为选中
    this.$target.prop('checked', isCheck)
    // 触发反选事件api
    this.$el.trigger(e)
  }

  // 反选功能
  // -------
  reverse() {
    // 定义反选事件类型
    let e = $.Event('reversed.ui.checkAll', {relatedTarget: this.$el})
    // 遍历所有目标元素，将他们选中属性反转
    this.$target.map(function () {
        return $(this).prop('checked', function() {
          return !$(this).prop('checked')
        })
    });
    // 触发反选事件api
    this.$el.trigger(e);
  }
}

// 插件定义
// -------
let Plugin = function(option, ...args) {
  return $(this).each(()=> {
    let [$this, data] = [
      $(this),
      $(this).data('ui.checkAll')
    ];

    if (!data) {
      $this.data('ui.checkAll', (data = new CheckAll(this)));
      if (option === 'toggle') data.toggle();
    }

    if (typeof option === 'string' && option !== 'toggle') data[option](...args);
  })
}


// jQuery 插件扩展
// -------------
$.fn.checkAll = Plugin;
$.fn.checkAll.Constructor = CheckAll;

// 全局绑定插件
// -------------
// $(function () {
//     $(toggle).checkAll()

// });
$(function() {
  $(document).on('click.checkAll', toggle, function() {
    $(this).checkAll('toggle')
  })
})

module.exports = CheckAll
