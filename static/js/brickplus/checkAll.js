(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["checkAll"] = factory(require("jquery"));
	else
		root["checkAll"] = factory(root["jQuery"]);
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $ = __webpack_require__(2);
	
	var toggle = '[data-toggle="checkAll"]';
	
	var CheckAll = function () {
	  // 构造函数
	  // -------
	  // * `element` dom元素对象
	  function CheckAll(element) {
	    _classCallCheck(this, CheckAll);
	
	    // dom元素
	    this.$el = $(element);
	    // 响应元素集合
	    this.$target = $(this.$el.data('target'));
	    // 是否反选模式
	    this.isReverse = Boolean(this.$el.data('reverse'));
	
	    //  是否全选不会影响响应元素
	    this.isNoCheckAll = Boolean(this.$el.data('nocheckall'));
	
	    // 版本号
	    this.VERSION = '{{VERSION}}';
	
	    // 初始化事件
	    this.initEvents();
	  }
	
	  // 事件监听
	
	
	  _createClass(CheckAll, [{
	    key: 'initEvents',
	    value: function initEvents() {
	      // 监听 `click` 点击事件，如果全选不影响单选状态则不监听
	      this.$el.on('click', $.proxy(this.toggle, this));
	      // 对全选监听change.toggle事件用于触发单选状态改变全选状态,反选则不触发
	      !this.isReverse && this.$target.on('change.status', $.proxy(this.targetToggle, this));
	    }
	
	    // 切换中枢
	    // -------
	
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.isReverse ? this.reverse() : this.activate();
	    }
	
	    // 单选状态改变全选状态 by Limit
	
	  }, {
	    key: 'targetToggle',
	    value: function targetToggle() {
	      //  反选按钮则退出
	      if (this.isReverse) {
	        return false;
	      }
	      var isCheckAlled = true;
	      if (!this.isNoCheckAll) {
	        //  全部选上才触发对象勾选激活
	        this.$target.map(function () {
	          if (!$(this).prop('checked')) {
	            isCheckAlled = false;
	            return false;
	          }
	        });
	      } else {
	        //  非全选状态下，只要勾选一个就认为对象勾选激活
	        isCheckAlled = false;
	        this.$target.map(function () {
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
	
	  }, {
	    key: 'activate',
	    value: function activate(isChecked) {
	      var _ref = [
	      // button触发全选传值可能为false
	      !isChecked && isChecked !== false ? this.$el.is(':checked') : isChecked, // 当前dom元素是否勾选
	      $.Event('checked.bp.checkAll', {
	        relatedTarget: this.$el
	      }) // 创建选中事件
	      ],
	          isCheck = _ref[0],
	          e = _ref[1];
	      // button触发全选时，设置全选为选中 by limit
	
	      this.$el.prop('checked', isCheck);
	      // 设置所有目标元素属性
	      if (this.isNoCheckAll) {
	        !isCheck && this.$target.prop('checked', isCheck);
	      } else {
	        this.$target.prop('checked', isCheck);
	      }
	      // 触发反选事件api
	      this.$el.trigger(e);
	    }
	
	    // 反选功能
	    // -------
	
	  }, {
	    key: 'reverse',
	    value: function reverse() {
	      // 定义反选事件类型
	      var e = $.Event('reversed.bp.checkAll', {
	        relatedTarget: this.$el
	      });
	      // 遍历所有目标元素，将他们选中属性反转
	      this.$target.map(function () {
	        return $(this).prop('checked', function () {
	          return !$(this).prop('checked');
	        }).trigger('change.status');
	      });
	      // 触发反选事件api
	      this.$el.trigger(e);
	    }
	  }]);
	
	  return CheckAll;
	}();
	
	// 插件定义
	// -------
	
	
	var Plugin = function Plugin(option) {
	  var _this = this;
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return $(this).each(function () {
	    var _data;
	
	    var _ref2 = [$(_this), $(_this).data('bp.checkAll')],
	        $this = _ref2[0],
	        data = _ref2[1];
	
	
	    if (!data) {
	      $this.data('bp.checkAll', data = new CheckAll(_this));
	      if (option === 'toggle') data.toggle();
	    }
	
	    if (typeof option === 'string' && option !== 'toggle') (_data = data)[option].apply(_data, args);
	  });
	};
	
	// jQuery 插件扩展
	// -------------
	$.fn.checkAll = Plugin;
	$.fn.checkAll.Constructor = CheckAll;
	
	// 全局绑定插件
	// -------------
	// $(function() {
	//   $(toggle).checkAll()
	// });
	$(function () {
	
	  // 全局绑定插件 单选和全选交互 by limit
	  $(document).on('click.checkAll', ':checkbox', function (e) {
	    $(toggle).map(function () {
	      if (!$(this).data('isCheckAllInited')) {
	        //  如果为当前点击的checkBox则调用toggle
	        e.target == this ? $(this).checkAll('toggle') : $(this).checkAll();
	        $(this).data('isCheckAllInited', true);
	      }
	    });
	    // $(this).checkAll('toggle')
	  });
	
	  // 全局绑定插件 单选和全选交互 by limit 这样会导致新渲染的checkAll控件组无法激活插件
	  // $(toggle).map(function() {
	  //   $(this).checkAll();
	  // });
	});
	
	module.exports = CheckAll;

/***/ })

/******/ })
});
;
//# sourceMappingURL=checkAll.js.map