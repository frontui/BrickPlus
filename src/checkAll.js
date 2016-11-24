/**
 * @component   : checkAll全选
 * @version     : {{VERSION}}
 * @author      : tommyshao <jinhong.shao@frontpay.cn>
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


class CheckAll {
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

    //  是否全选不会影响响应元素
    this.isNoCheckAll = Boolean(this.$el.data('nocheckall'))

    // 版本号
    this.VERSION = '{{VERSION}}';

    // 初始化事件
    this.initEvents()
  }

  // 事件监听
  initEvents() {
    // 监听 `click` 点击事件，如果全选不影响单选状态则不监听
    this.$el.on('click', $.proxy(this.toggle, this));
    // 对全选监听change.toggle事件用于触发单选状态改变全选状态,反选则不触发
    !this.isReverse && this.$target.on('change.status', $.proxy(this.targetToggle, this));
  }

  // 切换中枢
  // -------
  toggle() {
    this.isReverse ? this.reverse() : this.activate()
  }

  // 单选状态改变全选状态 by Limit
  targetToggle() {
    //  反选按钮则退出
    if (this.isReverse) {
      return false;
    }
    let isCheckAlled = true;
    if (!this.isNoCheckAll) {
      //  全部选上才触发对象勾选激活
      this.$target.map(function() {
        if (!$(this).prop('checked')) {
          isCheckAlled = false;
          return false;
        }
      });
    } else {
      //  非全选状态下，只要勾选一个就认为对象勾选激活
      isCheckAlled = false;
      this.$target.map(function() {
        if ($(this).prop('checked')) {
          isCheckAlled = true;
          return false;
        }
      });
    }
    this.$el.prop('checked', isCheckAlled).trigger('change.status');
  }

  // 全选功能
  // --------
  // Function activate
  activate(isChecked) {
    let [
      isCheck,
      e
    ] = [
      // button触发全选传值可能为false
      (!isChecked && isChecked !== false) ? this.$el.is(':checked') : isChecked, // 当前dom元素是否勾选
      $.Event('checked.bp.checkAll', {
        relatedTarget: this.$el
      }) // 创建选中事件
    ]
    // button触发全选时，设置全选为选中 by limit
    this.$el.prop('checked', isCheck)
      // 设置所有目标元素属性
    if (this.isNoCheckAll) {
      !isCheck && this.$target.prop('checked', isCheck)
    } else {
      this.$target.prop('checked', isCheck)
    }
    // 触发反选事件api
    this.$el.trigger(e)
  }

  // 反选功能
  // -------
  reverse() {
    // 定义反选事件类型
    let e = $.Event('reversed.bp.checkAll', {
        relatedTarget: this.$el
      })
      // 遍历所有目标元素，将他们选中属性反转
    this.$target.map(function() {
      return $(this).prop('checked', function() {
        return !$(this).prop('checked')
      }).trigger('change.status');
    });
    // 触发反选事件api
    this.$el.trigger(e);
  }
}

// 插件定义
// -------
let Plugin = function(option, ...args) {
  return $(this).each(() => {
    let [$this, data] = [
      $(this),
      $(this).data('bp.checkAll')
    ];

    if (!data) {
      $this.data('bp.checkAll', (data = new CheckAll(this)));
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
// $(function() {
//   $(toggle).checkAll()
// });
$(function() {

  // 全局绑定插件 单选和全选交互 by limit
  $(document).on('click.checkAll', ':checkbox',function(e) {
    $(toggle).map(function() {
        if (!$(this).data('isCheckAllInited')) {
          //  如果为当前点击的checkBox则调用toggle
          e.target == this ? $(this).checkAll('toggle') : $(this).checkAll();
          $(this).data('isCheckAllInited', true);
        }
      })
      // $(this).checkAll('toggle')
  })

    // 全局绑定插件 单选和全选交互 by limit 这样会导致新渲染的checkAll控件组无法激活插件
    // $(toggle).map(function() {
    //   $(this).checkAll();
    // });
  })

module.exports = CheckAll