(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["spin"] = factory(require("jquery"));
	else
		root["spin"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(21);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Spin 加载
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-21
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '.bp-spin,[data-toggle="spin"]';
	
	var Spin = function () {
	    function Spin(el, props) {
	        _classCallCheck(this, Spin);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = _jquery2.default.extend({}, Spin.DEFAULTS, props ? props : el);
	
	        // 父级元素
	        this.parentEl = !this.props.parent ? (0, _jquery2.default)(document.body) : (0, _jquery2.default)(this.props.parent);
	
	        if (this.props.btn) {
	            this._bindBtn();
	        } else {
	            this._render();
	        }
	    }
	
	    // 一般 loading 层
	
	
	    _createClass(Spin, [{
	        key: '_render',
	        value: function _render() {
	            var template = '\n            <div class="page-spinner">\n                <div class="spinner-layer">\n                    <div class="spinner">\n                    <span class="one"></span>\n                    <span class="two"></span>\n                    <span class="three"></span>\n                    <span class="four"></span>\n                    <span class="five"></span>\n                    <span class="six"></span>\n                    </div>\n                </div>\n            </div>\n        ';
	            this.el = (0, _jquery2.default)(template);
	            this.parentEl.append(this.el);
	        }
	
	        // btn 模式
	
	    }, {
	        key: '_bindBtn',
	        value: function _bindBtn() {
	            if (this.el.length < 0) {
	                this.parentEl.append('<button class="btn default">查看更多<button>');
	            }
	            this.el.data('originText', this.el.html());
	            this.el.on('click', _jquery2.default.proxy(this.spinning, this));
	        }
	
	        // 按钮加载中
	
	    }, {
	        key: 'spinning',
	        value: function spinning() {
	            var Ev = _jquery2.default.Event('spinning.bp');
	            if (this.props.btn) {
	                this.el.prop('disabled', true).addClass('btn-spinner').html(this.props.text);
	            } else {
	                this.el.addClass('active');
	                this.parentEl.addClass('page-spinner-open');
	            }
	
	            this.el.trigger(Ev);
	            return this.el;
	        }
	
	        // 隐藏
	
	    }, {
	        key: 'end',
	        value: function end() {
	            if (this.props.btn) {
	                this.el.prop('disabled', false).removeClass('btn-spinner').html(function () {
	                    return (0, _jquery2.default)(this).data('originText');
	                });
	            } else {
	                this.parentEl.removeClass('page-spinner-open');
	                this.el.removeClass('active');
	            }
	        }
	
	        // 销毁
	
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.el.removeData('bp.spin').remove();
	        }
	    }]);
	
	    return Spin;
	}();
	
	exports.default = Spin;
	
	
	Spin.DEFAULTS = {
	    btn: false,
	    text: 'Loading...',
	    parent: null
	};
	
	// ----------
	// jQuery API
	function Plugin(option) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    return (0, _jquery2.default)(this).each(function () {
	        var that = (0, _jquery2.default)(this),
	            data = that.data('bp.spin'),
	            opt = typeof option === 'string' ? {} : opt;
	
	        opt = _jquery2.default.extend({}, opt, that.data());
	
	        if (!data) that.data('bp.spin', data = new Spin(that, opt));
	        if (typeof option === 'string') typeof data[option] === 'function' && data[option].apply(data, args);
	    });
	}
	
	_jquery2.default.fn.spin = Plugin;
	_jquery2.default.fn.spin.constructor = Spin;
	
	_jquery2.default.Spin = Spin;
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('click.bp.spin', toggle, function () {
	        (0, _jquery2.default)(this).spin('spinning');
	    });
	});

/***/ }

/******/ })
});
;
//# sourceMappingURL=spin.js.map