(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["progress"] = factory(require("jquery"));
	else
		root["progress"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(19);


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

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 进度条
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-21
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _transition = __webpack_require__(3);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '.progress,[data-toggle="progress"]';
	
	var Progress = function () {
	    function Progress(el, props) {
	        _classCallCheck(this, Progress);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = _jquery2.default.extend({}, Progress.DEFAULTS, props);
	        this.striped = this.props.striped;
	
	        this.barEl = this.props.bar ? this.el.find(this.props.bar) : this.el.find('.progress-bar');
	
	        if (this.props.percent > 0) this.go(this.props.percent);
	    }
	
	    _createClass(Progress, [{
	        key: 'go',
	        value: function go(percent) {
	            var _this = this;
	
	            // 是否被禁用
	            if (this.barEl.hasClass('bar-disabled')) return;
	
	            // 进度判断
	            if (isNaN(percent)) {
	                percent = 0;
	            } else if (percent > 100) {
	                percent = 100;
	            }
	
	            this.barEl.css({ width: percent + '%' });
	            if (this.props.txt) this.barEl.html(percent + '%');
	
	            var complete = function complete() {
	                _this.el.trigger('completed.bp.progress');
	            };
	            if (percent == 100) {
	                _jquery2.default.support.transition ? this.barEl.one('uiTransitionEnd', complete).emulateTransitionEnd(this.props.speed) : complete;
	            }
	        }
	    }, {
	        key: 'setStriped',
	        value: function setStriped(toggle) {
	            this.striped = toggle;
	            this.barEl.toggleClass('bar-striped', toggle);
	        }
	    }, {
	        key: 'change',
	        value: function change(status) {
	            status = status === '' ? 'default' : 'bar-' + status;
	            var striped = this.striped ? 'bar-striped' : '';
	
	            this.barEl.attr('class', function () {
	                return 'progress-bar ' + striped + ' ' + status;
	            });
	        }
	    }]);
	
	    return Progress;
	}();
	
	exports.default = Progress;
	
	
	Progress.DEFAULTS = {
	    speed: 2000,
	    percent: 0,
	    bar: '',
	    striped: true,
	    txt: false
	};
	
	// ----------
	// jQuery api
	function Plugin(option) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    return (0, _jquery2.default)(this).each(function () {
	        var _data;
	
	        var that = (0, _jquery2.default)(this),
	            data = that.data('bp.progress');
	
	        if (!data) that.data('bp.progress', data = new Progress(that, _jquery2.default.extend(typeof option === 'string' ? {} : option, that.data())));
	        if (typeof option === 'string') typeof data[option] === 'function' && (_data = data)[option].apply(_data, args);
	    });
	}
	
	_jquery2.default.fn.progress = Plugin;
	_jquery2.default.fn.progress.constructor = Progress;
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(toggle).progress();
	});

/***/ }

/******/ })
});
;
//# sourceMappingURL=progress.js.map