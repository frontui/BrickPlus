(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["panel"] = factory(require("jquery"));
	else
		root["panel"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(42);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 面板
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tomieric <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-27
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// 面板展开
	var Panel = function () {
	    function Panel(el, container, props) {
	        _classCallCheck(this, Panel);
	
	        this.el = (0, _jquery2.default)(el);
	        this.container = (0, _jquery2.default)(container);
	        this.props = _jquery2.default.extend({}, Panel.DEFAULTS, props);
	        this.opened = this.props.opened;
	
	        // 右侧打开激活类
	        this.toggleCls = this.el.attr('data-active');
	        // 主体内容激活类
	        this.containerCls = this.el.attr('data-container-active');
	
	        if (this.props.autoHide) this.autoBindEvent();
	
	        if (!!this.props.btn) this.btnBindEvent();
	    }
	
	    _createClass(Panel, [{
	        key: 'autoBindEvent',
	        value: function autoBindEvent() {
	            // 事件监听
	            // 元素本身，阻止事件冒泡
	            this.el.on('click', function (e) {
	                return e.stopPropagation();
	            });
	
	            // 除元素本身任何地方点击则收起
	            (0, _jquery2.default)(document).on('click.close.rightPanel', _jquery2.default.proxy(this.hide, this));
	        }
	    }, {
	        key: 'btnBindEvent',
	        value: function btnBindEvent() {
	            var _this = this;
	
	            (0, _jquery2.default)(this.props.btn).on('click', function (e) {
	                e.preventDefault();
	                // 阻止冒泡
	                e.stopPropagation();
	                _this.toggle();
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.toggle(true);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.toggle(false);
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle(b) {
	            var _this2 = this;
	
	            this.opened = b === undefined ? !this.opened : b;
	
	            var callback = function callback() {
	                _this2.el.toggleClass(_this2.toggleCls, _this2.opened);
	                _this2.container.toggleClass(_this2.containerCls, _this2.opened);
	
	                _this2.props.callback(_this2.opened);
	            };
	
	            if (_jquery2.default.support.transition) {
	                this.container[0].offsetWidth;
	                this.container.one('uiTransitionEnd', callback).emulateTransitionEnd(Panel.TRANSITION_DURATION);
	            } else {
	                typeof this.props.polyfill === 'function' ? this.props.polyfill(this.el, this.container, callback) : callback();
	            }
	        }
	    }]);
	
	    return Panel;
	}();
	
	exports.default = Panel;
	
	
	Panel.DEFAULTS = {
	    autoHide: false,
	    opened: false,
	    btn: '',
	    callback: _jquery2.default.noop,
	    polyfill: null
	
	    // 动画时间
	};Panel.TRANSITION_DURATION = 150;

/***/ })

/******/ })
});
;
//# sourceMappingURL=panel.js.map