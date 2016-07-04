(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["BrickPlus"] = factory(require("jquery"));
	else
		root["BrickPlus"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1)

	var toggle = '[data-toggle="checkAll"]'

	 // 构造函数
	  // -------
	  // * `element` dom元素对象

	  var CheckAll = function (element) {
	      var $this = this;
	      $this.$el = $(element);
	      $this.$target = $($this.$el.data('target'));
	      $this.isReverse = $this.$el.data('reverse');

	      // 监听 `click` 点击事件
	      // 直接执行实例方法
	      // * `reverse` 反选功能
	      // * `activate` 全选
	      $this.$el.on('click', $.proxy($this.isReverse ? this.reverse : this.activate, this));
	  };

	  // 插件版本号
	  // --------
	  // v{{VERSION}}
	  CheckAll.VERSION = '{{VERSION}}';

	  // 全选功能
	  // --------
	  // Function activate
	  CheckAll.prototype.activate = function () {
	      // 当前dom元素是否勾选
	      var isCheck = this.$el.is(':checked');
	      // 创建选中事件
	      // `relatedTarget` 绑定为当前dom元素
	      var e = $.Event('checked.ui.checkAll', {relatedTarget: this.$el});
	      // 设置所有目标元素属性为选中
	      this.$target.prop('checked', isCheck);
	      // 触发用户自定义选中事件
	      this.$el.trigger(e);
	  };

	  // 反选功能
	  // -------
	  CheckAll.prototype.reverse = function () {
	      // 定义反选事件类型
	      var e = $.Event('reversed.ui.checkAll', {relatedTarget: this.$el});
	      // 遍历所有目标元素，将他们选中属性反转
	      this.$target.map(function () {
	          return $(this).prop('checked', !this.checked)
	      });
	      // 触发反选事件api
	      this.$el.trigger(e);
	  };


	  // 插件定义
	  // -------
	  function Plugin(option) {
	      return $(this).each(function () {
	          var $this = $(this);
	          var data = $this.data('ui.checkAll');

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;