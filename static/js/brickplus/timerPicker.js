(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["timerPicker"] = factory(require("jquery"));
	else
		root["timerPicker"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(25);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _drop = __webpack_require__(26);
	
	var _drop2 = _interopRequireDefault(_drop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 时间选择器
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * by tommyshao <jinhong.shao@frontpay.cn>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2016-09-18
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var toggle = '[data-toggle="timer-picker"]';
	
	var TimerPicker = function (_Drop) {
	    _inherits(TimerPicker, _Drop);
	
	    function TimerPicker(el, props) {
	        _classCallCheck(this, TimerPicker);
	
	        var _this = _possibleConstructorReturn(this, (TimerPicker.__proto__ || Object.getPrototypeOf(TimerPicker)).call(this, el, toggle, props));
	
	        _this.props = _jquery2.default.extend({}, TimerPicker.DEFAULTS, _this.props);
	
	        _this.timer = ['00', '00', '00'];
	
	        // 不包括小时
	        if (!_this.props.hours) {
	            _this.timer.shift();
	        }
	
	        // 不包括秒
	        if (!_this.props.second) {
	            _this.timer.pop();
	        }
	
	        _this.__init();
	        _this.render();
	        return _this;
	    }
	
	    // 渲染小时
	    // 根据配置参数h来决定24或者12
	
	
	    _createClass(TimerPicker, [{
	        key: '__renderHH',
	        value: function __renderHH() {
	            var hours = 23,
	                _html = [],
	                h = this.timer[0],
	                cls = '',
	                i = 0;
	            if (this.props.h == 12) {
	                hours = 12;i = 1;
	            };
	            for (; i <= hours; i++) {
	                cls = parseInt(h) === i ? ' class="active"' : '';
	                _html.push('<li data-value="' + i + '"' + cls + '>' + i + '</li>');
	            }
	            return _html.join('');
	        }
	
	        // 时分都是60单位
	        // 可根据参数 unit 输出不同的进度
	
	    }, {
	        key: '__renderMS',
	        value: function __renderMS(pos) {
	            var ms = 60,
	                _html = [],
	                u = this.props.unit,
	                mm = this.timer[pos],
	                cls = '';
	
	            for (var i = 0; i < ms; i++) {
	                cls = parseInt(mm) === i ? ' class="active"' : '';
	
	                if (u) {
	                    if (i % u === 0) _html.push('<li data-value="' + i + '"' + cls + '>' + i + '</li>');
	                } else {
	                    _html.push('<li data-value="' + i + '"' + cls + '>' + i + '</li>');
	                }
	            }
	
	            return _html.join('');
	        }
	
	        // 初始化值
	
	    }, {
	        key: '__init',
	        value: function __init() {
	            var value = this.el.val(),
	                arrVal = [];
	            if (value) {
	                arrVal = value.split(this.props.char);
	
	                if (arrVal.length > 0) this.timer = arrVal;
	            }
	        }
	
	        // 渲染架构
	
	    }, {
	        key: 'render',
	        value: function render() {
	            var NAMESPACE = 'bp-drop';
	            var template = '\n            <ul class="' + NAMESPACE + '-nav"></ul>\n            <div class="' + NAMESPACE + '-bd">\n            </div>\n        ';
	
	            this.dropEl.append(template);
	            this.navEl = this.dropEl.find('.' + NAMESPACE + '-nav');
	            this.bodyEl = this.dropEl.find('.' + NAMESPACE + '-bd');
	
	            this.$HH = (0, _jquery2.default)('<ul class="' + NAMESPACE + '-list"></ul>');
	            this.$mm = this.$HH.clone(true);
	            this.$ss = this.$HH.clone(true);
	
	            if (this.props.hours) {
	                this.$HH.html(this.__renderHH());
	                this.navEl.append('<li class="active">' + this.props.in18[0] + '</li>');
	                this.bodyEl.append(this.$HH.addClass('active'));
	            }
	
	            if (this.props.minutes) {
	                this.$mm.html(this.__renderMS(1));
	                this.navEl.append('<li>' + this.props.in18[1] + '</li>');
	                this.bodyEl.append(this.$mm);
	            }
	
	            if (this.props.second) {
	                this.$ss.html(this.__renderMS(2));
	                this.navEl.append('<li>' + this.props.in18[2] + '</li>');
	                this.bodyEl.append(this.$ss);
	            }
	
	            this.__handlerPicker();
	        }
	
	        // 绑定选择事件
	
	    }, {
	        key: '__handlerPicker',
	        value: function __handlerPicker() {
	            var _this2 = this;
	
	            this.$HH.on('click', 'li', function (e) {
	                return _this2.picker(0, e);
	            });
	            this.$mm && this.$mm.on('click', 'li', function (e) {
	                return _this2.picker(_this2.props.hours ? 1 : 0, e);
	            });
	            this.$ss && this.$ss.on('click', 'li', function (e) {
	                return _this2.picker(_this2.props.hours ? 2 : 1, e);
	            });
	            this.navEl.on('click', 'li', _jquery2.default.proxy(this.__tab, this));
	        }
	
	        // 导航切换
	
	    }, {
	        key: '__tab',
	        value: function __tab(e) {
	            var liEl = this.navEl.children('li');
	            var itemEl = this.bodyEl.children('ul');
	            var idx = liEl.index(e.target);
	            liEl.eq(idx).addClass('active').siblings().removeClass('active');
	            itemEl.eq(idx).addClass('active').siblings().removeClass('active');
	        }
	
	        // 选择时分秒
	
	    }, {
	        key: 'picker',
	        value: function picker(idx, event) {
	            var $current = (0, _jquery2.default)(event.target);
	            var value = $current.html();
	            var liEl = this.navEl.children('li');
	            this.timer.splice(idx, 1, value < 10 && this.props.zero ? '0' + value : value);
	
	            $current.addClass('active').siblings().removeClass('active');
	            this.el.val(this.timer.join(this.props.char));
	
	            // tab 切换
	            if (!!liEl.eq(idx + 1).length) {
	                liEl.eq(idx + 1).trigger('click');
	            } else {
	                this.hide();
	            }
	        }
	
	        // 继承重载 show
	
	    }, {
	        key: 'show',
	        value: function show() {
	            var liEl = this.navEl.children('li');
	            _get(TimerPicker.prototype.__proto__ || Object.getPrototypeOf(TimerPicker.prototype), 'show', this).call(this);
	            liEl.eq(0).trigger('click');
	        }
	    }]);
	
	    return TimerPicker;
	}(_drop2.default);
	
	/**
	 * 默认配置
	 */
	
	
	exports.default = TimerPicker;
	TimerPicker.DEFAULTS = {
	    char: ':', // 格式化字符
	    hours: true, // 是否显示小时
	    minutes: true, // 是否显示分钟，一般不设置
	    second: true, // 是否显示秒
	    in18: ['时', '分', '秒'], // 语言配置
	    zero: true // 是否格式化补零
	
	
	    // 插件定义
	    // ----------
	};function Plugin(option) {
	    return (0, _jquery2.default)(this).each(function () {
	        var $this = (0, _jquery2.default)(this);
	        var data = $this.data('bp.tab');
	        option = _jquery2.default.extend({}, option, $this.data());
	        if (!data) $this.data('bp.tab', data = new TimerPicker(this, option));
	        if (typeof option == 'string') data[option] && data[option]();
	    });
	}
	
	// jQuery 插件扩展
	_jquery2.default.fn.timerPicker = Plugin;
	_jquery2.default.fn.timerPicker.Constructor = TimerPicker;
	
	// ----
	// Global
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('focus.timerpicker', toggle, function () {
	        (0, _jquery2.default)(this).timerPicker();
	    });
	
	    // .on('blur.timerpicker', toggle, function(){
	    //     $(this).timerPicker('hide')
	    // })
	});

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

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
	            var _ref = [this.el.offset(), this.el.outerHeight(true)],
	                offset = _ref[0],
	                elHeight = _ref[1];
	
	
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

/***/ })

/******/ })
});
;
//# sourceMappingURL=timerPicker.js.map