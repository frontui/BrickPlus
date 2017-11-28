(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["placeholder"] = factory(require("jquery"));
	else
		root["placeholder"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(18);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * placeholder 占位符兼容性处理
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-20
	 *
	 * API:
	 * ------
	 * $(element).placeholder();
	 */
	
	var $ = __webpack_require__(2);
	
	var input = document.createElement('input');
	var isSupport = 'placeholder' in input;
	
	// 构造函数
	// ===============
	var Placeholder = function Placeholder(element) {
	    var $this = this;
	    $this.$el = $(element);
	    this.init();
	};
	
	Placeholder.VERSION = '{{VERSION}}';
	
	Placeholder.prototype.init = function () {
	    if (isSupport) return;
	    var $this = this;
	    this.$placeholder = $this.$el.data('placeholder');
	    if (!isSupport && !this.$placeholder) {
	        var text = $this.$el.attr('placeholder');
	        $this.$placeholder = $('<label class="form-control-placeholder" />').html(text);
	        $this.$el.data('placeholder', $this.$placeholder).before($this.$placeholder);
	    }
	
	    $this.$el.on('focus', $.proxy(this.focus, this));
	    $this.$el.on('blur', $.proxy(this.blur, this));
	    $this.$placeholder.on('click', $.proxy(this.focus, this));
	
	    // 默认隐藏placeholder
	    this.blur();
	};
	
	Placeholder.prototype.focus = function () {
	    this.$placeholder.hide();
	};
	
	Placeholder.prototype.blur = function () {
	    this.$placeholder[this.$el.val() === '' ? 'show' : 'hide']();
	};
	
	// 插件定义
	//======================
	function Plugin() {
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.placeholder');
	        if (!data) $this.data('bp.placeholder', data = new Placeholder(this));
	    });
	}
	
	// jQuery 插件扩展
	$.fn.placeholder = Plugin;
	$.fn.placeholder.Constructor = Placeholder;
	
	// 元素插件绑定
	// ====================
	$(function () {
	    $('input[placeholder]').placeholder();
	});
	
	module.exports = Placeholder;

/***/ })

/******/ })
});
;
//# sourceMappingURL=placeholder.js.map