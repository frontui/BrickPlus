(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["alert"] = factory(require("jquery"));
	else
		root["alert"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 判断是否支持css transition
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 *
	 * Reference bootstrap.transition.js
	 * http://getbootstrap.com/javascript/#transitions
	 *
	 * API:
	 * ------
	 * $.support.transition
	 * $(element).one('uiTransitionEnd', fn).emulateTransitionEnd(duration)
	 */
	
	var $ = __webpack_require__(2);
	
	// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	// --------------------------------------------
	
	function transitionEnd() {
	    var el = document.createElement('ui');
	
	    var transEndEventNames = {
	        WebkitTransition: 'webkitTransitionEnd',
	        MozTransition: 'transitionend',
	        OTransition: 'oTransitionEnd otransitionend',
	        transition: 'transitionend'
	    };
	
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return { end: transEndEventNames[name] };
	        }
	    }
	
	    return false; // explicit for ie8 (  ._.)
	}
	
	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
	    var called = false;
	    var $el = this;
	    $(this).one('uiTransitionEnd', function () {
	        called = true;
	    });
	    var callback = function callback() {
	        if (!called) $($el).trigger($.support.transition.end);
	    };
	    setTimeout(callback, duration);
	    return this;
	};
	
	$(function () {
	    $.support.transition = transitionEnd();
	
	    if (!$.support.transition) return;
	
	    $.event.special.uiTransitionEnd = {
	        bindType: $.support.transition.end,
	        delegateType: $.support.transition.end,
	        handle: function handle(e) {
	            if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
	        }
	    };
	});
	
	module.exports = transitionEnd;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 警告框 v2.0
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 *
	 * Reference bootstrap.alert.js
	 * API:
	 *   $(element).on('closed.ui.alert', function(e, obj){});
	 */
	
	// 导入 jQuery
	var $ = __webpack_require__(2);
	var TRANSITION = __webpack_require__(3);
	var Scroller = __webpack_require__(6);
	
	var dismiss = '[data-dismiss="alert"]';
	var closeBtn = 'em';
	
	// 构造函数
	// ------
	var Alert = function Alert(el, option) {
	    if (!this) return;
	    // var that = this;
	    this.$el = $(el);
	    this.iScroller = null;
	
	    // this.$el.on('click', closeBtn, $.proxy(this.close, this));
	    // 检测是否为多条滚动
	    this.$el.is('.alert') && this.scroller();
	};
	
	Alert.VERSION = '{{VERSION}}';
	
	// 动画过渡时间
	Alert.TRANSITION_DURATION = 300;
	
	// 关闭
	// -----
	Alert.prototype.close = function (e, force) {
	
	    if (e) e.preventDefault();
	
	    //var $this = $(this);
	    //var $parent = Alert.prototype._getParent($this);
	    var $parent = this.$el;
	
	    !!!force && $parent.trigger(e = $.Event('close.bp.alert'));
	
	    if (e.isDefaultPrevented() && !force) return;
	
	    $parent.addClass('out');
	
	    function removeElement() {
	        var data = $parent.data('bp.alert');
	        var ev = $.Event('closed.bp.alert', { relatedTarget: $parent });
	
	        // 干掉滚动
	        if (data && data.iScroller) data.iScroller.destroy();
	
	        $parent.trigger(ev).detach().remove();
	    }
	
	    if ($.support.transition) {
	        // css3
	        $parent.one('uiTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION);
	    } else {
	        $parent.fadeOut(Alert.TRANSITION_DURATION, removeElement);
	    }
	};
	
	// --- 获取父级
	Alert.prototype._getParent = function (el) {
	    var $this = $(el);
	    var selector = $this.attr('data-target');
	
	    if (!selector) {
	        // a[href=#test]关闭 id为test的alert
	        selector = $this.attr('href');
	        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
	    }
	
	    var $parent = $(selector);
	
	    if (!$parent.length) {
	        $parent = $this.closest('.alert');
	    }
	
	    return $parent;
	};
	
	// --- 多条消息滚动
	Alert.prototype.scroller = function () {
	    var $ul = this.$el.find('ul');
	    !!$ul.length && (this.iScroller = new Scroller($ul));
	};
	
	// 插件定义
	// -------
	function Plugin(option) {
	    var args = [].slice.call(arguments, 1);
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.alert');
	
	        if (!data) $this.data('bp.alert', data = new Alert($this, option));
	        if (typeof option === 'string') {
	            data[option].apply(data, args);
	        }
	    });
	}
	
	// jQuery 插件扩展
	// --------------
	$.fn.alert = Plugin;
	$.fn.alert.Constructor = Alert;
	
	// 元素插件绑定
	// -----------
	$(function () {
	    // 绑定 alert 插件
	    $('.alert').alert();
	
	    $(document).on('click.bp.alert', dismiss, function (e) {
	        //Alert.prototype.close.call(e.target, e);
	        var el = Alert.prototype._getParent(e.target);
	        $(el).length && $(el).alert('close', e);
	    });
	});
	
	module.exports = Alert;

/***/ },
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
//# sourceMappingURL=alert.js.map