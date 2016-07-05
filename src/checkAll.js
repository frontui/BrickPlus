'use strict';

const $ = require('jquery')

const toggle = '[data-toggle="checkAll"]'


class CheckAll{
  // 构造函数
  // -------
  // * `element` dom元素对象
  constructor(element) {
    this.state = {};
    this.$el = $(element)
    this.$target = $(this.$el.data('target'))
    this.isReverse = this.$el.data('reverse')

    this.VERSION = '{{VERSION}}';

    this.initEvents()
  }

  // 事件监听
  initEvents() {
    // 监听 `click` 点击事件
    this.$el.on('click', $.proxy(this.isReverse ? this.reverse : this.activate, this))
  }

  // 全选功能
  // --------
  // Function activate
  activate() {
    let [
      isCheck,
      e
    ] = [
      this.$el.is(':checked'), // 当前dom元素是否勾选
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
        return $(this).prop('checked', !this.checked)
    });
    // 触发反选事件api
    this.$el.trigger(e);
  }
}

// 插件定义
// -------
let Plugin = function(option) {
  return $(this).each(()=> {
    let [$this, data] = [
      $(this),
      $(this).data('ui.checkAll')
    ];

    if (!data) $this.data('ui.checkAll', (data = new CheckAll(this)));
    if (typeof option == 'string') data[option]();
  })
}


// jQuery 插件扩展
// -------------
$.fn.checkAll = Plugin;
$.fn.checkAll.Constructor = CheckAll;

// 全局绑定插件
// -------------
$(function () {
    $(toggle).checkAll()
});
