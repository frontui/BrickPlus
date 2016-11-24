(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["dropdown"] = factory(require("jquery"));
	else
		root["dropdown"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * 模拟下拉框
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 *
	 * Reference bootstrap.dropdown.js
	 *
	 * API
	 * --------
	 * $(element).on('selected.bp.dropdown', function(e, obj){});
	 */
	
	/**
	* @TODO:
	*  1- 分组模式
	*  2- ajax 请求列表，可过滤
	* 
	*/
	
	var $ = __webpack_require__(2);
	var Util = __webpack_require__(14);
	
	var toggle = '.form-control-dropdown';
	var toggleValue = '[data-toggle="dropdown"]';
	
	// $.ajaxSetup({
	//   //crossDomain: true,
	//   headers: {
	//     "X-Requested-With": "XMLHttpRequest"
	//   }
	// })
	
	/**
	 * 占位符
	 * @param {[type]} el [description]
	 */
	var PlaceHolder = function PlaceHolder(el, label) {
	  this.$el = $(el);
	  var placeholder = this.$el.attr('placeholder');
	  this.$label = $('<label class="form-control-placeholder">' + (placeholder || '请选择') + '</label>');
	  this.$el.before(this.$label);
	};
	
	PlaceHolder.prototype = {
	  toggle: function toggle() {
	    if (!this.$el.length || !this.$label.length) return;
	
	    var isEmpty = $.trim(this.$el.val()) === '';
	
	    isEmpty ? this.show() : this.hide();
	  },
	  show: function show() {
	    this.$label.show();
	  },
	  hide: function hide() {
	    this.$label.hide();
	  }
	};
	
	/**
	 * 模拟 select
	 * @param {[type]} el     [description]
	 * @param {[type]} option [description]
	 */
	var Dropdown = function Dropdown(el, option) {
	
	  this.$el = $(el);
	  this.options = $.extend({}, Dropdown.DEFAULTS, option);
	
	  this.$target = this.$el.find(this.options.text);
	  this.$list = this.$el.find(this.options.list);
	  this.$item = this.$list.find(this.options.item);
	  this.$input = this.$el.find(this.options.input);
	
	  // 占位符
	  this.Placeholder = new PlaceHolder(this.$input);
	
	  this.isInput = /input/i.test(this.$target[0].tagName);
	
	  // 多选
	  !!this.options.multiple && this.$el.addClass('multiple');
	
	  // 初始化
	  this.init();
	
	  // 区分是否异步请求列表
	  // if(!!this.options.ajax && typeof this.options.ajax === 'string') {
	  //   this._initAjax()
	  // } else {
	  // 设置默认选中
	  this._setDefaultValue();
	  // }
	};
	
	// 版本
	Dropdown.VERSION = '{{VERSION}}';
	
	// 默认配置
	Dropdown.DEFAULTS = {
	  // 显示框
	  text: '.form-control-dropdown-value,.form-control,.form-control-modal-value',
	  // 表单元素
	  input: '.form-control-dropdown-input',
	  // 占位符
	  placeholder: 'label',
	  // 下拉列表
	  list: '> ul',
	  // 列表项
	  item: 'li',
	  // 多选选项
	  multiSelected: '.form-control-modal-ops',
	  // 是否可以多选
	  multiple: false,
	  // 多选分隔符
	  separator: ',',
	  // 成功回调
	  callback: $.noop,
	  // 是否异步返回列表
	  ajax: false
	};
	
	/**
	 * 初始化事件
	 * @return
	 */
	Dropdown.prototype.init = function () {
	
	  // toggle 显示或隐藏
	  this.$el.on('click.bp.dropdown, focus.bp.dropdown', $.proxy(this.toggle, this));
	
	  // 输入框则
	  if (this.isInput) {
	    this.$target.on('keyup.bp.dropdown', Util.throttle(this.filter(this), 150));
	  }
	
	  // 选择项
	  this.$el.on('click.select.bp.dropdown', this.options.item, this.selected(this));
	
	  // 已选多选选项删除
	  this.$el.on('click.remove.bp.dropdown', this.options.multiSelected, this.removeMultiItem(this));
	
	  // 输入框过滤
	  this.$target.on('keydown.bp.dropdown', this.keydown(this));
	};
	
	/**
	 * 初始化 ajax 方式列表
	 * @return 
	 */
	/*Dropdown.prototype._initAjax = function() {
	  this.$ajaxInput = this._renderAjaxTxt()
	  // 输入框则
	  //if(this.isInput) {
	  this.$ajaxInput.on('keyup.bp.dropdown', Util.throttle(this._ajaxfilter(this), 200))
	  //}
	  // 输入框 上下选择
	  this.$ajaxInput.on('keydown.bp.dropdown', this.keydown(this))
	
	  // 首次加载
	  this._ajaxfilter.call(this.$ajaxInput, this)()
	}
	
	Dropdown.prototype._renderAjaxTxt = function() {
	  var $li = $('<li class="disabled"></li>'),
	      $input = $('<input placeholder="请输入..." />')
	
	  $li.append($input).appendTo(this.$list.empty())    
	  return $input;
	}
	
	Dropdown.prototype._ajaxfilter = function(that) {
	  return function(e) {
	      var q = $.trim($(this).val())
	      console.log('q:'+ q)
	      $.get(that.options.ajax, { q: q}).done(that._renderList(that))
	  }
	}
	
	Dropdown.prototype._renderList = function(that) {
	  return function(res) {
	    if(res.status !== 1) return;
	    var template = ''
	    $.each(res.data, function(i, item ) {
	      template += '<li rel="'+ item.value +'">'+ item.text +'</li>'
	    })
	
	    that.$list.splice(1, that.$list.length).remove();
	    that.$list.append(template)
	  }
	}*/
	
	Dropdown.prototype._setDefaultValue = function () {
	  var option = this.$input.val() || this.$target.val();
	  var $items = this.$item;
	
	  // 不为空
	  if (option && $.trim(option) !== '') {
	    option = option.split(this.options.separator);
	
	    // 循环
	    option.forEach(function (value, index) {
	      $items.filter('[title="' + value + '"]').trigger('click');
	    });
	  }
	
	  // placeholder检测
	  this.Placeholder.toggle();
	};
	
	/**
	 * 切换
	 * @return
	 */
	Dropdown.prototype.toggle = function (sw) {
	  var isActived = this.$el.hasClass('active');
	  // 清除所有下拉
	  hideAllDropdown();
	
	  // 内置点击触发
	  if (sw && typeof sw['type'] !== 'undefined') {
	    this.$el.toggleClass('active', !isActived).trigger(!isActived ? 'show.bp.dropdown' : 'hide.bp.dropdown');
	  } else {
	    // 外部调用设置
	    this.$el.toggleClass('active', sw).trigger(sw ? 'show.bp.dropdown' : 'hide.bp.dropdown');
	  }
	
	  this._setPosition();
	  return this;
	};
	
	/**
	 * 过滤
	 * @return
	 */
	Dropdown.prototype.filter = function (that) {
	  return function (e) {
	    var thisValue = $.trim($(this).val());
	
	    // 查找输入内容
	    that.$item.map(function () {
	      var option = $(this).text();
	      if (option.indexOf(thisValue) > -1) {
	        $(this).show();
	      } else {
	        $(this).hide();
	      }
	    });
	  };
	};
	
	/**
	 * 上下左右选择控制
	 * @param  {Object} that 实例对象
	 * @return
	 */
	Dropdown.prototype.keydown = function (that) {
	  return function (e) {
	    e.stopPropagation();
	
	    if (e.which === 27) {
	      // esc
	      hideAllDropdown();
	      return;
	    }
	    if (!/(38|40|27|32|13|46|8)/.test(e.which)) return;
	
	    var $this = $(this),
	        $target = that.$target;
	
	    var currentItem = that.$el.data('currentItem') === undefined ? -1 : that.$el.data('currentItem');
	
	    that.show();
	
	    var $items = that.$item.filter(':visible');
	
	    if (!$items.length) return;
	
	    if (e.which == 13 && $items.filter('.hover').length) {
	      // enter
	      $items.filter('.hover').trigger('click');
	      return;
	    }
	
	    var index = $items.index(e.target) > -1 ? $items.index(e.target) : currentItem;
	
	    if ($this.is('.disabled, :disabled') || $this.is('.optgroup')) {
	      if (e.which == 38 && index >= 0) index = index - 2; // up
	      if (e.which == 40 && index < $items.length) index = index + 2; // down
	      console.log(index);
	    } else {
	      if (e.which == 38 && index >= 0) index--; // up
	      if (e.which == 40 && index < $items.length) index++; // down
	    }
	
	    if (index < 0) index = $items.length - 1;
	    if (index >= $items.length) index = 0;
	
	    scrollTop($items, index);
	
	    that.$el.data('currentItem', index);
	
	    $items.removeClass('hover').eq(index).addClass('hover'); //.trigger('focus')
	  };
	};
	
	/**
	 * 选择
	 * @return
	 */
	Dropdown.prototype.selected = function (that) {
	  return function (e) {
	    e.stopPropagation();
	
	    var $this = $(this);
	
	    // 禁止不可选
	    if ($this.is('.disabled')) {
	      e.preventDefault();
	      return false;
	    }
	
	    // 选中高亮
	    that._highlight($this);
	
	    var title = $.trim($this.attr('title'));
	    var selectVal = $this.html();
	    var selected = $this.hasClass('hover');
	
	    that.setValue(title, selectVal, selected);
	
	    // 多选默认不关闭
	    !that.options.multiple && that.hide();
	
	    var Event = $.Event('selected.bp.dropdown');
	    that.$el.trigger(Event, [$this, title]);
	  };
	};
	
	/**
	 * 选中高亮处理
	 * @param  {Object} el 当前项
	 * @return
	 */
	Dropdown.prototype._highlight = function (el) {
	  if (!this.options.multiple) {
	    // 单选
	    $(el).addClass('hover').siblings().removeClass('hover');
	  } else {
	    $(el).toggleClass('hover');
	  }
	
	  return this;
	};
	
	/**
	 * 选中赋值处理
	 * @param {String} title    当前项的实际值
	 * @param {String} value    当前项的 html内容
	 * @param {Boolean} selected 选中或取消
	 */
	Dropdown.prototype.setValue = function (title, value, selected) {
	  // @todo: selected - false 取消选择
	  if (this.options.multiple) {
	    this.setMultiValue(title, value, selected);
	    return;
	  }
	
	  if (!!this.$input.length) {
	    // 隐藏域存放正确值
	    this.$input.val(title ? title : value);
	  }
	
	  // 过滤制表符
	  value = value ? value.replace(/^(\t|\b|\n)$/, '') : '';
	
	  this.isInput ? this.$target.val(title) : this.$target.html(value);
	
	  this.Placeholder.toggle();
	
	  return this;
	};
	
	/**
	 * 多选设置值
	 * @param {String} title    当前项的实际值
	 * @param {String} value    当前想的 html内容
	 * @param {Boolean} selected 选中或取消
	 */
	Dropdown.prototype.setMultiValue = function (title, value, selected) {
	  if (!this.$input.length) {
	    console.warn('必须添加<input type="hidden" name class="form-control-dropdown-input" />');
	  }
	  // 如果为true,则添加多选项
	  var $item = this.$target.find('div[rel="' + title + '"]');
	  var selectedValue = this.$input.val();
	  var separator = this.options.separator;
	  var arrSelectValue = $.trim(selectedValue) === '' ? [] : selectedValue.split(separator);
	  var index = -1;
	
	  if (selected) {
	    // 选择
	
	    $item = $('<div class="form-control-modal-ops" rel="' + title + '">' + value + '</div>');
	
	    if (arrSelectValue.length > 0) {
	      this.$target.append($item);
	    } else {
	      // 第一个值需清空
	      this.$target.empty().append($item);
	    }
	
	    arrSelectValue.push(title);
	  } else {
	    // 取消
	
	    // 查找是否存在当前项
	    index = $.inArray(title, arrSelectValue);
	
	    // 删除取消的当前项
	    if (index > -1) arrSelectValue.splice(index, 1);
	
	    // 重新赋值
	    //this.$input.val(arrSelectValue.join(separator))
	
	    // 移除已选 dom
	    $item.detach().remove();
	  }
	
	  // 拼接赋值
	  this.$input.val(arrSelectValue.join(separator));
	  this.Placeholder.toggle();
	};
	
	/**
	 * 已选多选项取消
	 * @param  {Object} that 实例对象
	 * @return
	 */
	Dropdown.prototype.removeMultiItem = function (that) {
	  return function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	
	    var option = $(this).attr('rel');
	    var selectedItem = that.$item.filter('[title="' + option + '"]');
	
	    // 去除高亮
	    !!selectedItem.length && that._highlight(selectedItem);
	    // 取消选择
	    that.setValue(option, option, false);
	  };
	};
	
	/**
	 * 收起下拉框
	 * @return
	 */
	Dropdown.prototype.hide = function () {
	  this.toggle(false);
	  return this;
	};
	
	/**
	 * 显示
	 * @return
	 */
	Dropdown.prototype.show = function () {
	  this.toggle(true);
	  return this;
	};
	
	/**
	 * 设置下拉框的位置，
	 * 如果距离页面底部则向上
	 */
	Dropdown.prototype._setPosition = function () {
	  var offset = this.$el.offset(),
	      scrollTop = $(window).scrollTop(),
	      viewHeight = $(window).height(),
	      elHeight = this.$el.outerHeight(),
	      listHeight = this.$list.outerHeight(),
	      style = { top: '0' },
	      placement = false; // 方向，向上为 true
	
	  // 朝上    
	  if (offset.top - scrollTop + elHeight + listHeight > viewHeight) {
	    style.top = -listHeight + 'px';
	    placement = true;
	  } else {
	    style.top = elHeight + 'px';
	    placement = false;
	  }
	
	  this.$list.css(style);
	  this.$el.toggleClass('up', placement);
	
	  return this;
	};
	
	/**
	 * 隐藏所有页面的下拉框
	 * @return
	 */
	function hideAllDropdown() {
	  $(toggle).filter('.active').removeClass('active').data('currentItem', -1).trigger('hide.bp.dropdown');
	}
	
	// 滚动条自动跳到某位置
	// -----------------
	function scrollTop(el, i) {
	  var $parent = el.parent();
	  var top = el.eq(i).position().top;
	  $parent.scrollTop(top);
	}
	
	/**
	 * jQuery Plugin import
	 * @param {Object} option 参数配置
	 */
	function Plugin(option) {
	  var args = [].slice.call(arguments, 1);
	  return $(this).each(function () {
	    var that = $(this),
	        data = that.data('bp.dropdown'),
	        config = {};
	
	    if (!data) {
	      config = $.extend({}, (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option : {}, that.data());
	      that.data('bp.dropdown', data = new Dropdown(that, config));
	      //data.toggle();
	    }
	
	    if (typeof option === 'string' && option !== 'toggle') data[option].apply(data, args);
	  });
	}
	
	// -------
	// jquery API
	$.fn.dropdown = Plugin;
	$.fn.dropdown.constructor = Dropdown;
	
	// -----------
	// Global Bind
	$(function () {
	
	  // 绑定初始化
	  $(toggle).dropdown();
	
	  // Click Event
	  $(document).on('click.bp.dropdown', toggle, function (e) {
	    Plugin.call($(this), 'toggle', true);
	    e.stopPropagation();
	  });
	
	  // Focus Event
	  $(document).on('focus.bp.dropdown', toggleValue, function (e) {
	    var $parent = $(this).parents(toggle);
	    //console.log($(this))
	    !!$parent.length && e.stopPropagation() && Plugin.call($parent, 'toggle', true);
	  });
	
	  // Click Others
	  $(document).on('click.hide.bp.dropdown', hideAllDropdown);
	});

/***/ },

/***/ 14:
/***/ function(module, exports) {

	"use strict";
	
	var Util = {
	  now: function now() {
	    var d = new Date();
	    return d.now ? d.now() : d.getTime();
	  },
	  throttle: function throttle(fn, wait, options) {
	    var context, args, result;
	    var timeout = null;
	
	    var previous = 0;
	    if (!options) options = {};
	
	    var later = function later() {
	      previous = options.leading === false ? 0 : Util.now();
	      timeout = null;
	      result = fn.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	
	    return function () {
	      var now = Util.now();
	      if (!previous && options.leading === false) previous = now;
	
	      var remaining = wait - (now - previous);
	
	      context = this;
	      args = arguments;
	
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = fn.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailling !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	
	      return result;
	    };
	  },
	  debounce: function debounce(fn, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function later() {
	      var last = Util.now() - timestamp;
	
	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	
	        if (!immediate) {
	          result = fn.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = Util.now();
	
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = fn.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  }
	};
	
	module.exports = {
	  throttle: Util.throttle,
	  debounce: Util.debounce
	};

/***/ }

/******/ })
});
;
//# sourceMappingURL=dropdown.js.map