(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["drop"] = factory(require("jquery"));
	else
		root["drop"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(26);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 模拟下拉框基本类
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <jinhong.shao@frontpay.cn>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-18
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Drop = function () {
	    /**
	     * @param {object} el 触发元素
	     * @param {string} toggleEl 匹配标识
	     * @param {object} props 配置参数 必须包含{ toggle: ''} 参数 
	     */
	
	    function Drop(el, toggleEl, props) {
	        _classCallCheck(this, Drop);
	
	        // 触发元素
	        this.el = (0, _jquery2.default)(el);
	        // 匹配选择符
	        this.toggleEl = toggleEl;
	        // 属性配置
	        this.props = _jquery2.default.extend({
	            event: 'focus'
	        }, props);
	        // 显示控制标识
	        this.isShow = false;
	        // 下拉框元素
	        this.dropEl = null;
	        // 创建下拉框元素
	        this.__createEl();
	        // 初始化事件
	        this.__initEvent();
	        // 鼠标滑过隐藏时间点
	        this.__showTime = null;
	    }
	
	    // 初始化事件
	
	
	    _createClass(Drop, [{
	        key: '__initEvent',
	        value: function __initEvent() {
	            var _this = this;
	
	            if (!this.el || typeof this.el === 'undefined') return;
	            var toggle = this.props.toggle;
	
	            // 点击
	            if (this.props.event === 'click') {
	                (0, _jquery2.default)(this.el).on('click.drop', _jquery2.default.proxy(this.handlerToggle, this));
	            } else if (this.props.event === 'hover') {
	                // 鼠标滑过
	                (0, _jquery2.default)(this.el).on('mouseenter.drop', _jquery2.default.proxy(this.delayShow, this)).on('mouseleave.drop', _jquery2.default.proxy(this.delayHide, this));
	            } else {
	                // 默认 input 获取焦点
	                (0, _jquery2.default)(this.el).on('focus.drop', _jquery2.default.proxy(this.show, this)).on('blur.drop', _jquery2.default.proxy(this.delayHide, this));
	            }
	
	            // 点击其他地方收起隐藏
	            (0, _jquery2.default)(document).on('click.hide.drop', function (e) {
	                if ((0, _jquery2.default)(e.target).is(_this.toggleEl)) {
	                    e.stopPropagation();
	                    return false;
	                } else {
	                    _this.hide();
	                }
	            });
	
	            // 点击阻止默认收起隐藏行为
	            if (this.dropEl) {
	                this.dropEl.on('click.drop', function (e) {
	                    clearTimeout(_this.__showTime);
	                    e.stopPropagation();
	                });
	
	                if (this.props.event === 'hover') {
	                    this.dropEl.on('mouseenter', function (e) {
	                        clearTimeout(_this.__showTime);
	                    });
	                    this.dropEl.on('mouseleave', _jquery2.default.proxy(this.delayHide, this));
	                }
	            }
	        }
	
	        // 创建下拉框
	
	    }, {
	        key: '__createEl',
	        value: function __createEl() {
	            if (this.dropEl) return;
	            // bp-drop = brickplus-dropdown
	            this.dropEl = this.props.dropEl ? (0, _jquery2.default)(this.props.dropEl) : (0, _jquery2.default)('<div class="bp-drop" />');
	
	            if (this.props.parents) {
	                //  相对固定的区域元素
	                this.dropEl.appendTo((0, _jquery2.default)(this.props.parents));
	            } else {
	                // 相对 body
	                this.dropEl.appendTo((0, _jquery2.default)(document.body));
	            }
	        }
	
	        // 设置位置
	
	    }, {
	        key: '__setPosition',
	        value: function __setPosition() {
	            var offset = this.el.offset();
	            var elHeight = this.el.outerHeight(true);
	
	
	            this.dropEl.css({ top: offset.top + elHeight + 'px', left: offset.left + 'px' });
	        }
	
	        // 渲染
	
	    }, {
	        key: 'render',
	        value: function render(el) {
	            if (!this.dropEl) return;
	            this.dropEl.empty().append(el);
	        }
	
	        // 下拉显示
	
	    }, {
	        key: 'show',
	        value: function show() {
	            this.isShow = true;
	            this.toggle();
	        }
	
	        // 下拉隐藏
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.isShow = false;
	            this.toggle();
	        }
	
	        // 开关
	
	    }, {
	        key: 'handlerToggle',
	        value: function handlerToggle() {
	            this.isShow = !this.isShow;
	            this.toggle();
	        }
	
	        // 操作开关
	
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            if (!this.dropEl) return;
	            this.__setPosition();
	            this.dropEl.toggleClass('show', this.isShow);
	        }
	
	        // ----
	        // 鼠标滑过
	
	    }, {
	        key: 'delayShow',
	        value: function delayShow() {
	            clearTimeout(this.__showTime);
	            this.show();
	        }
	    }, {
	        key: 'delayHide',
	        value: function delayHide() {
	            var that = this;
	            clearTimeout(this.__showTime);
	            this.__showTime = setTimeout(function () {
	                return that.hide();
	            }, 200);
	        }
	    }]);
	
	    return Drop;
	}();
	
	exports.default = Drop;

/***/ }

/******/ })
});
;
//# sourceMappingURL=drop.js.map