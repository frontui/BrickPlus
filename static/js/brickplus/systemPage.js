(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["systemPage"] = factory(require("jquery"));
	else
		root["systemPage"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(43);


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

/***/ 40:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * component cookie
	 * 
	 * https://github.com/component/cookie
	 */
	
	/**
	 * Module dependencies.
	 */
	
	//var debug = require('debug')('cookie');
	
	/**
	 * Set or get cookie `name` with `value` and `options` object.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Mixed}
	 * @api public
	 */
	
	module.exports = function (name, value, options) {
	  switch (arguments.length) {
	    case 3:
	    case 2:
	      return set(name, value, options);
	    case 1:
	      return get(name);
	    default:
	      return all();
	  }
	};
	
	/**
	 * Set cookie `name` to `value`.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @api private
	 */
	
	function set(name, value, options) {
	  options = options || {};
	  var str = encode(name) + '=' + encode(value);
	
	  if (null == value) options.maxage = -1;
	
	  if (options.maxage) {
	    options.expires = new Date(+new Date() + options.maxage);
	  }
	
	  if (options.path) str += '; path=' + options.path;
	  if (options.domain) str += '; domain=' + options.domain;
	  if (options.expires) str += '; expires=' + options.expires.toUTCString();
	  if (options.secure) str += '; secure';
	
	  document.cookie = str;
	}
	
	/**
	 * Return all cookies.
	 *
	 * @return {Object}
	 * @api private
	 */
	
	function all() {
	  var str;
	  try {
	    str = document.cookie;
	  } catch (err) {
	    if (typeof console !== 'undefined' && typeof console.error === 'function') {
	      console.error(err.stack || err);
	    }
	    return {};
	  }
	  return parse(str);
	}
	
	/**
	 * Get cookie `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api private
	 */
	
	function get(name) {
	  return all()[name];
	}
	
	/**
	 * Parse cookie `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parse(str) {
	  var obj = {};
	  var pairs = str.split(/ *; */);
	  var pair;
	  if ('' == pairs[0]) return obj;
	  for (var i = 0; i < pairs.length; ++i) {
	    pair = pairs[i].split('=');
	    obj[decode(pair[0])] = decode(pair[1]);
	  }
	  return obj;
	}
	
	/**
	 * Encode.
	 */
	
	function encode(value) {
	  try {
	    return encodeURIComponent(value);
	  } catch (e) {
	    // debug('error `encode(%o)` - %o', value, e)
	  }
	}
	
	/**
	 * Decode.
	 */
	
	function decode(value) {
	  try {
	    return decodeURIComponent(value);
	  } catch (e) {
	    // debug('error `decode(%o)` - %o', value, e)
	  }
	}

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

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

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

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
	};
	
	// 动画时间
	Panel.TRANSITION_DURATION = 150;

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _cookie = __webpack_require__(40);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _panel = __webpack_require__(42);
	
	var _panel2 = _interopRequireDefault(_panel);
	
	var _expand = __webpack_require__(41);
	
	var _expand2 = _interopRequireDefault(_expand);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 页面框架
	
	
	// 面板
	/**
	 * 后台系统框架页
	 * 
	 * by tommyshao <tomieric@gmail.com>
	 * 
	 * 2016-09-26 
	 * 
	 * 建议 jquery 和systemPage.js 在页面head引入
	 */
	
	var systemPage = {
	    init: function init() {
	        // 左右导航展开收起切换
	        this._leftAction();
	        this._rightAction();
	
	        // 初始化左侧菜单
	        this._initMenu();
	
	        // 展开菜单项
	        this._expandMenu();
	
	        // 导航菜单展开
	        this._navigator();
	
	        // 换肤
	        this._changeSkin();
	    },
	    _leftAction: function _leftAction() {
	        // 左侧菜单动作相反
	        // show - 收起 hide - 展开
	        this.leftPanel = new _panel2.default('[data-toggle="leftPanel"]', '[data-toggle="container"]', {
	            btn: '[data-toggle="aside-switch"]',
	            callback: function callback(expand) {
	                var val = expand ? 1 : 0;
	                // 默认一年过期
	                (0, _cookie2.default)('bp.expendMenu', val, { maxage: 60 * 60 * 24 * 360 * 1000 });
	            },
	            // ie9- jq animate
	            polyfill: function polyfill(el, container, expand, callback) {
	                var ml = expand ? '70px' : '250px';
	                container.animate({ 'margin-left': ml }, 300, callback);
	            }
	        });
	    },
	    _rightAction: function _rightAction() {
	        this.rightPanel = new _panel2.default('[data-toggle="rightPanel"]', '[data-toggle="container"]', {
	            autoHide: true,
	            btn: '[data-toggle="assist-switch"]',
	            // ie9- jq animate
	            polyfill: function polyfill(el, container, expand, callback) {
	                var ml = expand ? '-220px' : '0';
	                container.find('> div').animate({ 'margin-left': ml }, 300, callback);
	            }
	        });
	    },
	    _initMenu: function _initMenu() {
	        var expendMenu = (0, _cookie2.default)('bp.expendMenu');
	        // 首次尚无 cookie 记录用户操作
	        // cookie 过期
	        if (expendMenu === undefined) {
	            // 分辨率1280以下默认收起左侧菜单
	            var viewW = (0, _jquery2.default)(window).width();
	            if (viewW <= 1280) this.leftPanel.show();
	        } else {
	            this.leftPanel[expendMenu == 1 ? 'show' : 'hide']();
	        }
	    },
	    _expandMenu: function _expandMenu() {
	        // 绑定
	        (0, _jquery2.default)('[data-toggle="expand"]').each(function () {
	            var that = (0, _jquery2.default)(this),
	                data = that.data('bp.expand');
	
	            if (!data) that.data('bp.expand', data = new _expand2.default(that));
	        });
	    },
	    _navigator: function _navigator() {
	        var that = this;
	        (0, _jquery2.default)('[data-toggle="navigator"] li').on('click', function (e) {
	            // 阻止冒泡，搞定二三级菜单不影响一级
	            e.stopPropagation();
	
	            var self = (0, _jquery2.default)(this);
	
	            // 展开导航
	            that.leftPanel.hide();
	
	            // 是否展开，再点击收起
	            if (self.hasClass('current')) {
	                self.toggleClass('current').find('.current').removeClass('current');
	            } else {
	                // 展开收起同级
	                (0, _jquery2.default)(this).addClass('current').siblings().removeClass('current');
	            }
	        });
	    },
	    _changeSkin: function _changeSkin() {
	        var skinEl = (0, _jquery2.default)('[data-toggle="skin"]');
	        var targetEl = (0, _jquery2.default)(skinEl.attr('data-target'));
	        skinEl.on('click', 'li', function (e) {
	            e.preventDefault();
	            var theme = (0, _jquery2.default)(this).attr('data-theme');
	            targetEl.attr('href', function () {
	                return this.href.replace(/\/(.*)\.css/, '/$1-' + theme + '.css');
	            });
	        });
	    }
	};
	
	// jquery global bind - domready
	
	// 展开
	(0, _jquery2.default)(_jquery2.default.proxy(systemPage.init, systemPage));
	
	// export api
	exports.default = systemPage;

/***/ }

/******/ })
});
;
//# sourceMappingURL=systemPage.js.map