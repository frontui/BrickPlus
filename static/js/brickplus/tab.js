(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["tab"] = factory(require("jquery"));
	else
		root["tab"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(24);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
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

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @component   : tab 选项卡切换
	 * @version     : {{VERSION}}
	 * @author      : tommyshao <jinhong.shao@frontpay.cn>
	 * @created     : 2016-07-06
	 * @description : 基于 frontui
	 * @Reference   : bootstrap.tab.js
	 * @useage      :
	 ## 用法
	 ```
	  $(element).on('closed.bp.alert', function(e, obj){});
	 ```
	 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $ = __webpack_require__(2);
	__webpack_require__(3);
	
	var toggle = '[data-toggle="tab"],.tabs-btn';
	
	var Tab = function () {
	  function Tab(element) {
	    _classCallCheck(this, Tab);
	
	    this.$el = $(element);
	
	    this.VERSION = '{{VERSION}}';
	
	    // 动画过渡时间
	    this.TRANSITION_DURATION = 150;
	  }
	
	  // 切换显示
	  // ---------
	
	
	  _createClass(Tab, [{
	    key: 'show',
	    value: function show() {
	      var $this = this.$el;
	
	      // $ul 导航项元素
	      // selector 对应项元素选择器
	      var _ref = [$this.closest('.tabs,[data-tab="item"]'), $this.data('target')],
	          $ul = _ref[0],
	          selector = _ref[1];
	
	      // 当对应项选择器不存在时，如果为a标签则获取href对应的 hash(锚点)值
	
	      if (!selector) {
	        selector = $this.attr('href');
	        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
	      }
	
	      // $previous 上一个高亮激活导航项
	      // hideEvent 隐藏事件,发生在切换之前，由当前高亮激活导航项元素触发
	      // showEvent 显示事件，发生在切换之前，由下一个高亮激活导航项元素触发
	      // $target 对应项dom 元素
	      //
	      var $previous = $ul.find('.active a'),
	          _ref2 = [$.Event('hide.bp.tab', { relatedTarget: $this[0] }), $.Event('show.bp.tab', { relatedTarget: $previous[0] }), $(selector)],
	          hideEvent = _ref2[0],
	          showEvent = _ref2[1],
	          $target = _ref2[2];
	
	      // 上一个显示tab 项触发隐藏事件
	      $previous.trigger(hideEvent);
	      // 当前tab项触发显示事件
	      $this.trigger(showEvent);
	
	      // 阻止默认，则不切换
	      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
	
	      // tab 导航切换
	      this.activate($this.closest('li,[data-tab="nav"]'), $ul);
	      // tab 内容切换
	      this.activate($target, $target.parent(), function () {
	        // 切换后上一个选项导航触发`已隐藏`事件
	        $previous.trigger({ type: 'hidden.bp.tab', relatedTarget: $this[0] });
	        // 整个 tab导航项触发已显示事件
	        $this.trigger({ type: 'shown.bp.tab', relatedTarget: $previous[0] });
	      });
	    }
	
	    // 切换内容
	    // -------
	
	  }, {
	    key: 'activate',
	    value: function activate(element, container, callback) {
	      var $active = container.find('> .active'),
	          transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length),
	          next = function next() {
	        $active.removeClass('active').find(toggle).attr('aria-expanded', false);
	
	        element.addClass('active').find(toggle).attr('aria-expanded', true);
	
	        if (transition) {
	          // ie hack
	          element[0].offsetWidth;
	          element.addClass('in');
	        } else {
	          element.removeClass('fade');
	        }
	
	        callback && callback();
	      };
	
	      $active.length && transition ? $active.one('uiTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
	      $active.removeClass('in');
	    }
	  }]);
	
	  return Tab;
	}();
	
	// 插件定义
	// ----------
	
	
	function Plugin(option) {
	  return $(this).each(function () {
	    var $this = $(this);
	    var data = $this.data('bp.tab');
	    if (!data) $this.data('bp.tab', data = new Tab(this));
	    if (typeof option == 'string') data[option] && data[option]();
	  });
	}
	
	// jQuery 插件扩展
	$.fn.tab = Plugin;
	$.fn.tab.Constructor = Tab;
	
	// 元素插件绑定
	// -------------
	var clickHandler = function clickHandler(e) {
	  if (!$(e.target).hasClass('tab-disabled')) {
	    e.preventDefault();
	    Plugin.call($(this), 'show');
	  }
	};
	
	$(function () {
	  $(document).on('click.bp.tab', toggle, clickHandler);
	});
	
	module.exports = Tab;

/***/ }

/******/ })
});
;
//# sourceMappingURL=tab.js.map