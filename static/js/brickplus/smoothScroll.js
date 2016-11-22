(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["smoothScroll"] = factory(require("jquery"));
	else
		root["smoothScroll"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(20);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 平滑滚动
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-25
	 *
	 * Reference uikit.smoothscroll.js
	 *
	 * API
	 * --------
	 * $(element).smoothScroll();
	 */
	
	var $ = __webpack_require__(2);
	
	if (!$.easing.easeOutExpo) $.easing.easeOutExpo = function (x, t, b, c, d) {
	    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	};
	
	// 构造函数
	// ---------
	var SmoothScroll = function SmoothScroll(element, options) {
	    this.$el = $(element);
	    this.options = options;
	
	    this.$targetElement = $("body");
	    if (!!$(this.$el[0].hash).length) this.$targetElement = $(this.$el[0].hash);
	    if (!!$(this.$el.attr('data-target')).length) this.$targetElement = $(this.$el.attr('data-target'));
	
	    this.init();
	};
	
	SmoothScroll.VERSION = '{{VERSION}}';
	
	/**
	 * 默认配置参数
	 * @param duration 动画时间
	 * @param transition 动画类型
	 * @param offset 距离目标位置
	 * @param complete 到达位置时完成执行
	 * @type {{duration: number, transition: string, offset: number, complete: (*|number|noop|Function)}}
	 */
	SmoothScroll.DEFAULTS = {
	    duration: 500,
	    transition: 'easeOutExpo',
	    offset: 0,
	    complete: $.noop
	};
	
	/**
	 * init 初始化
	 */
	SmoothScroll.prototype.init = function () {
	    this.$el.on('click.ui.smoothScroll', this.scroll(this.$el, this.$targetElement, this.options));
	};
	
	/**
	 * 滚条
	 * @param options
	 * @returns {Function}
	 */
	SmoothScroll.prototype.scroll = function (elem, targetElement, options) {
	    return function (e) {
	        e.preventDefault();
	        scrollToElement(elem, targetElement, options);
	    };
	};
	
	/**
	 * 完成触发
	 */
	function emit(elem) {
	    return function () {
	        var e = $.Event('done.ui.smoothscroll', { relatedTarget: elem });
	        elem.trigger(e);
	    };
	};
	
	/**
	 * 滚动条跳转到某元素
	 * @param elem 目的元素
	 * @param options 配置参数
	 */
	function scrollToElement(elem, targetElement, options) {
	    options = $.extend({}, SmoothScroll.DEFAULTS, options);
	
	    var target = targetElement.offset().top - options.offset,
	        docH = $(document).height(),
	        winH = $(window).height();
	
	    if (target + winH > docH) {
	        target = docH - winH;
	    }
	
	    $('html,body').stop().animate({ scrollTop: target }, options.duration, options.transition).promise().done([options.complete, emit(elem)]);
	}
	
	/**
	 * 外部调用接口
	 * @param  {[type]} targetElement [description]
	 * @param  {[type]} options       [description]
	 * @return {[type]}               [description]
	 */
	SmoothScroll.prototype.scrollTo = function (options) {
	    scrollToElement(this.$el, this.$targetElement, options || {});
	};
	
	// 插件定义
	// ---------
	function Plugin(options, otherOptions) {
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.smoothScroll');
	        if (!data) {
	            $this.data('bp.smoothScroll', new SmoothScroll(this, $.extend({}, $this.data(), options)));
	        } else if (options === 'scrollTo') {
	            data.scrollTo(otherOptions);
	        } else {
	            $this.trigger('click.bp.smoothScroll');
	        }
	    });
	}
	
	// jQuery 插件扩展
	$.fn.smoothScroll = Plugin;
	$.fn.smoothScroll.Constructor = SmoothScroll;
	
	$(function () {
	    $('[data-toggle="smooth-scroll"]').smoothScroll();
	});
	
	module.exports = SmoothScroll;

/***/ }

/******/ })
});
;
//# sourceMappingURL=smoothScroll.js.map