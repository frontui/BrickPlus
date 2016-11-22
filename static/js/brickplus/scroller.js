(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["scroller"] = factory(require("jquery"));
	else
		root["scroller"] = factory(root["jQuery"]);
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 上下无缝滚动
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 */
	
	var $ = __webpack_require__(2);
	
	//-------
	// 构造函数
	var Scroller = function Scroller(el, option) {
	  this.$el = $(el);
	  this.options = $.extend({}, Scroller.DEFUALTS, option);
	
	  this.init();
	};
	
	// 原型
	Scroller.prototype = {
	  constructor: Scroller,
	  // 初始化
	  init: function init() {
	    this.$items = this.$el.find(this.options.item);
	    this.max = this.$items.length;
	
	    // 单条消息不滚动
	    if (this.max <= 1) return;
	
	    this.$el.addClass('scroller' + (!this.options.dir ? ' reverse' : ''));
	    this.$items.slice(1, this.max).addClass('ready');
	    this.controller = null;
	    this.current = 0;
	    this.run();
	  },
	  // 滚动
	  run: function run() {
	    // this.interval();
	    this.start();
	    this.$el.on('mouseenter', $.proxy(this.stop, this));
	    this.$el.on('mouseleave', $.proxy(this.start, this));
	  },
	  start: function start() {
	    this.controller = setInterval($.proxy(this.interval, this), this.options.interval);
	  },
	  stop: function stop() {
	    clearInterval(this.controller);
	  },
	  interval: function interval() {
	    this.current = this.current >= this.max - 1 ? 0 : ++this.current;
	
	    var indexs = this.getActiveIndexs();
	
	    this.$items.eq(indexs[0]).removeClass('enter').addClass('leave').one('uiTransitionEnd', function () {
	      $(this).removeClass('leave').addClass('ready');
	    }).emulateTransitionEnd(this.options.timer);
	
	    this.$items.eq(indexs[1]).addClass('enter');
	  },
	  getActiveIndexs: function getActiveIndexs() {
	    return [this.current - 1 < 0 ? this.max - 1 : this.current - 1, this.current];
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
	  destroy: function destroy() {
	    this.stop();
	    this.$el.detach().remove();
	    return null;
	  }
	};
	
	Scroller.DEFUALTS = {
	  timer: 300, // 动画时间，须跟 css transition 定义时间一直
	  item: 'li', // 每一条信息的 dom 元素，默认是ul布局
	  interval: 3000, // 自动滚动时间间隔
	  dir: 1 // 滚动的方向 1 - 为向上滚动，0 - 为向下滚动
	};
	
	// ----------
	// jquery API
	
	function Plugin(option) {
	  return $(this).each(function () {
	    var that = $(this),
	        data = that.data('bp.scroller');
	    if (!data) that.data('bp.scroller', data = new Scroller(that, option));
	    if (typeof option === 'string') data[option]();
	  });
	}
	
	$.fn.Scroller = Plugin;
	$.fn.Scroller.constructor = Scroller;
	
	module.exports = Scroller;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=scroller.js.map