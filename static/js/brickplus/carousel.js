(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["carousel"] = factory(require("jquery"));
	else
		root["carousel"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(9);


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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var add = _jquery2.default.event.add,
	    remove = _jquery2.default.event.remove,
	    trigger = function trigger(node, type, data) {
	    _jquery2.default.event.trigger(type, data, node);
	},
	    settings = {
	    threshold: 0.4,
	    sensitivity: 6
	}; /**
	    * jQuery.event.swipe
	    * 
	    * fork https://github.com/stephband/jquery.event.swipe
	    */
	
	function moveend(e) {
	    var w = void 0,
	        h = void 0,
	        event = void 0;
	
	    w = e.currentTarget.offsetWidth;
	    h = e.currentTarget.offsetHeight;
	
	    event = {
	        distX: e.distX,
	        distY: e.distY,
	        velocitX: e.velocitX,
	        velocitY: e.velocitY,
	        finger: e.finger
	    };
	
	    if (e.distX > e.distY) {
	        if (e.distX > -e.distY) {
	            if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
	                event.type = 'swiperight';
	                trigger(e.currentTarget, event);
	            }
	        } else {
	            if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
	                event.type = 'swipeup';
	                trigger(e.currentTarget, event);
	            }
	        }
	    } else {
	        if (e.distX > -e.distY) {
	            if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
	                event.type = 'swipedown';
	                trigger(e.currentTarget, event);
	            }
	        } else {
	            if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
	                event.type = 'swipeleft';
	                trigger(e.currentTarget, event);
	            }
	        }
	    }
	}
	
	function getData(node) {
	    var data = _jquery2.default.data(node, 'event_swipe');
	
	    if (!data) {
	        data = { count: 0 };
	        _jquery2.default.data(node, 'event_swipe', data);
	    }
	
	    return data;
	}
	
	_jquery2.default.event.special.swipe = _jquery2.default.event.special.swipeleft = _jquery2.default.event.special.swiperight = _jquery2.default.event.special.swipeup = _jquery2.default.event.special.swipedown = {
	    setup: function setup(data, namespaces, eventHandle) {
	        data = getData(this);
	
	        if (data.count++ > 0) return;
	
	        add(this, 'moveend', moveend);
	        return true;
	    },
	    teardown: function teardown() {
	        var data = getData(this);
	
	        if (--data.count > 0) return;
	
	        remove(this, 'moveend', moveend);
	
	        return true;
	    },
	    settings: settings
	};
	
	exports.default = _jquery2.default;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * carousel 轮播
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * fork http://unslider.com 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * API:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  $(selector).carousel()
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '[data-toggle="carousel"]';
	
	var Carousel = function () {
	    function Carousel() {
	        _classCallCheck(this, Carousel);
	
	        this.el = null;
	        this.items = null;
	
	        this.sizes = [];
	        this.max = [0, 0];
	
	        this.current = 0;
	
	        this.interval = null;
	    }
	
	    // 初始化
	
	
	    _createClass(Carousel, [{
	        key: 'init',
	        value: function init(el, props) {
	            this.el = (0, _jquery2.default)(el);
	            this.ulEl = el.children('ul');
	            this.max = [el.outerWidth() || el.parent().outerWidth(), el.outerHeight() || el.parent().outerHeight()];
	            // 计算宽度
	            this.items = this.ulEl.children('li').each(this.calculate(this));
	
	            // 配置参数
	            this.props = _jquery2.default.extend({}, Carousel.DEFAULTS, props);
	
	            // 挂载
	            this.setup();
	
	            return this;
	        }
	
	        // 计算宽高属性
	
	    }, {
	        key: 'calculate',
	        value: function calculate(instance) {
	            return function (index) {
	                var el = (0, _jquery2.default)(this),
	                    width = el.outerWidth(),
	                    height = el.outerHeight();
	
	                // 添加到 size 列表
	                instance.sizes[index] = [width, height];
	
	                // 计算最大宽度，高度
	                if (width > instance.max[0]) instance.max[0] = width;
	                if (height > instance.max[1]) instance.max[1] = height;
	            };
	        }
	
	        // 挂载
	
	    }, {
	        key: 'setup',
	        value: function setup() {
	            var _this = this;
	
	            var initEvent = _jquery2.default.Event('init.bp.carousel', { relatedTarget: this.el });
	
	            // 设置容器样式
	            this.el.css({
	                overflow: 'hidden',
	                width: this.max[0],
	                height: this.max[1]
	            }).toggleClass('csstransition', this.props.css3);
	
	            // 设置ul宽度
	            this.ulEl.css({ width: this.items.length * 100 + '%', position: 'relative' });
	            this.items.css({ width: 100 / this.items.length + '%' });
	
	            // 是否自动切换
	            if (this.props.delay) {
	                this.start();
	                this.el.hover(_jquery2.default.proxy(this.stop, this), _jquery2.default.proxy(this.start, this));
	            }
	
	            // 是否键盘控制
	            this.props.keys && (0, _jquery2.default)(document).keydown(_jquery2.default.proxy(this.keys, this));
	
	            // 是否显示索引
	            this.props.dots && this.dots();
	
	            // 是否相适应宽度
	            if (this.props.fluid) {
	                var resize = function resize() {
	                    _this.el.css({ width: Math.min(Math.round(_this.el.width() / _this.el.parent().width() * 100), 100) + '%' });
	                };
	                resize();
	                (0, _jquery2.default)(window).off('resize.bp.carousel').on('resize.bp.carousel', resize);
	            }
	
	            // 是否显示箭头按钮
	            if (this.props.arrows) {
	                this.el.append('<p class="arrows"><span class="prev" title="' + this.props.prevText + '">' + this.props.prevText + '</span><span class="next" title="' + this.props.nextText + '">' + this.props.nextText + '</span></p>').find('span.prev').on('click', _jquery2.default.proxy(this.prev, this)).end().find('span.next').on('click', _jquery2.default.proxy(this.next, this));
	            }
	
	            // 上下张按钮
	            if (this.props.prev) (0, _jquery2.default)(this.props.prev).off('click').on('click', _jquery2.default.proxy(this.prev, this));
	            if (this.props.next) (0, _jquery2.default)(this.props.next).off('click').on('click', _jquery2.default.proxy(this.next, this));
	
	            // 是否支持滑动
	            if (_jquery2.default.event.swipe) {
	                this.el.off('swipeleft.bp.carousel').on('swipeleft.bp.carousel', _jquery2.default.proxy(this.prev, this)).off('swiperight.bp.carousel').on('swiperight.bp.carousel', _jquery2.default.proxy(this.next, this));
	            }
	
	            this.el.trigger(initEvent);
	        }
	
	        // 切换跳转
	
	    }, {
	        key: 'move',
	        value: function move(idx, next) {
	            var _this2 = this;
	
	            if (!this.items.eq(idx).length) idx = 0;
	            if (idx < 0) idx = this.items.length - 1;
	
	            var target = this.items.eq(idx);
	            var obj = { height: target.outerHeight() };
	            var speed = next ? 5 : this.props.speed;
	
	            var moveEvent = _jquery2.default.Event('move.bp.carousel', { curIndex: idx });
	            var complete = function complete() {
	                _this2.current = idx;
	                _this2.props.complete(idx, _this2.el);
	                _jquery2.default.isFunction(next) && next(idx, _this2.el);
	            };
	
	            // 索引高亮
	            this.el.find('.dot:eq(' + idx + ')').addClass('active').siblings().removeClass('active');
	
	            // 动画处理
	            if (_jquery2.default.support.transition && this.props.css3) {
	                // css3
	                this.ulEl.css(_jquery2.default.extend({ left: '-' + idx + '00%' }, obj)).one('uiTransitionEnd', complete).emulateTransitionEnd(speed);
	            } else if (!this.ulEl.is(':animated')) {
	                this.ulEl.animate(obj, speed).trigger(moveEvent) && this.ulEl.animate(_jquery2.default.extend({ left: '-' + idx + '00%' }, obj), speed, complete);
	            }
	        }
	
	        // 自动切换-开始
	
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this3 = this;
	
	            this.interval = setInterval(function () {
	                return _this3.move(_this3.current + 1);
	            }, this.props.delay);
	        }
	
	        // 自动切换-结束
	
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.interval = clearInterval(this.interval);
	            return this;
	        }
	
	        // 上一页
	
	    }, {
	        key: 'prev',
	        value: function prev(e) {
	            e && e.preventDefault();
	            return this.stop().move(this.current - 1);
	        }
	
	        // 下一页
	
	    }, {
	        key: 'next',
	        value: function next(e) {
	            e && e.preventDefault();
	            return this.stop().move(this.current + 1);
	        }
	
	        // 索引按钮
	
	    }, {
	        key: 'dots',
	        value: function dots() {
	            var html = '<ol class="dots">';
	            var that = this;
	            _jquery2.default.each(this.items, function (index) {
	                html += '<li class="dot' + (index < 1 ? ' active' : '') + '">' + (index + 1) + '</li>';
	            });
	            html += '</ol>';
	
	            this.el.addClass('has-dots').append(html).find('.dot').off('click').on('click', function () {
	                that.move((0, _jquery2.default)(this).index());
	            });
	        }
	
	        // 键盘控制
	
	    }, {
	        key: 'keys',
	        value: function keys(e) {
	            var key = e.which;
	            var map = {
	                37: this.prev,
	                39: this.nex,
	                27: this.stop
	            };
	
	            if (typeof map[key] === 'function') map[key]();
	        }
	    }]);
	
	    return Carousel;
	}();
	
	// ---------
	// 默认配置
	
	
	exports.default = Carousel;
	Carousel.DEFAULTS = {
	    css3: true,
	    speed: 300, // 切换动画速度
	    delay: null, // 自动播放时间
	    complete: _jquery2.default.noop, // 切换完成回调
	    keys: null, // 键盘控制按键
	    dots: null, // 是否显示索引
	    fluid: true, // 是否响应式
	    prev: null, // 上一张按钮
	    next: null, // 下一张按钮
	    arrows: true, // 是否显示箭头图标
	    prevText: '&lt;', // 上一张按钮文字
	    nextText: '&gt;' // 下一张按钮文字
	};
	
	// 插件定义
	//======================
	function Plugin(o, s) {
	    var len = this.length;
	
	    //  Enable multiple-slider support
	    return this.each(function (index) {
	        //  Cache a copy of $(this), so it
	        var me = (0, _jquery2.default)(this);
	        var config = me.data();
	        var instance = me.data('bp.carousel');
	
	        if (!instance) {
	            o = _jquery2.default.extend({}, o, config);
	            instance = new Carousel().init(me, o);
	            //  Invoke an Unslider instance
	            me.data('bp.carousel', instance);
	        }
	        s = _jquery2.default.extend({}, s, config);
	        if (typeof o === 'string') instance[o] && instance[o](me, s);
	    });
	}
	
	// jQuery 插件扩展
	_jquery2.default.fn.carousel = Plugin;
	_jquery2.default.fn.carousel.Constructor = Carousel;
	
	// 元素插件绑定
	// ====================
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(toggle).carousel();
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=carousel.js.map