(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["expand"] = factory(require("jquery"));
	else
		root["expand"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(41);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 元素展开
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tomieric <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-27
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Expand = function () {
	    function Expand(el, props) {
	        _classCallCheck(this, Expand);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = _jquery2.default.extend({}, Expand.DEFAULTS, props);
	
	        //this.targetEl = $(this.props.target)
	        this.originalText = this.el.html();
	        this.expand = this.props.expand;
	
	        this._initEvent();
	    }
	
	    _createClass(Expand, [{
	        key: '_initEvent',
	        value: function _initEvent() {
	            var _this = this;
	
	            this.el.on('click', function (e) {
	                e.preventDefault();
	
	                var el = (0, _jquery2.default)(e.target);
	
	                var text = el.attr('data-text');
	                var active = el.attr('data-active');
	                var targetActive = el.attr('data-target-active');
	                var targetEl = (0, _jquery2.default)(el.attr('data-target'));
	
	                // switch
	                _this.expand = !_this.expand;
	
	                if (_this.expand) {
	                    el.addClass(active).html(text);
	                    targetEl.length && targetEl.addClass(targetActive);
	                } else {
	                    el.removeClass(active).html(_this.originalText);
	                    targetEl.length && targetEl.removeClass(targetActive);
	                }
	
	                _this.props.callback();
	            });
	        }
	    }]);
	
	    return Expand;
	}();
	
	exports.default = Expand;
	
	
	Expand.DEFAULTS = {
	    target: '',
	    expand: false,
	    callback: _jquery2.default.noop
	};

/***/ })

/******/ })
});
;
//# sourceMappingURL=expand.js.map