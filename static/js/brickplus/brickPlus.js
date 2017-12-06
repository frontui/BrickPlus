(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["brickPlus"] = factory(require("jquery"));
	else
		root["brickPlus"] = factory(root["jQuery"]);
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 弹层
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Reference bootstrap.modal.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * API:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      // 监听打开
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).on('show.bp.modal', function(e, obj){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).on('shown.bp.modal', function(e, obj){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      // 监听关闭
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).on('hide.bp.modal', function(){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).on('hidden.bp.modal', function(){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             // 绑定一个弹窗
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).modal();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      // 自定义弹窗
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(id).modal({title: '提示', content: 'abc'});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             $(id).modal('setContent', 'cdfg');
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             // loading
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '[data-toggle="modal"]';
	
	var Modal = function () {
	    function Modal(el, props) {
	        _classCallCheck(this, Modal);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = _jquery2.default.extend({}, Modal.DEFAULTS, props);
	        this.$body = (0, _jquery2.default)(document.body);
	
	        this.$dialog = this.el.find('.modal-wrap');
	        this.$backdrop = null;
	        this.isShown = false;
	        this.originalBodyPad = null;
	        this.scrollbarWidth = 0;
	        this.size = this.props.size;
	        this.isHideRemove = this.props.isHideRemove || false;
	
	        this.setSize(this.size, true);
	
	        if (this.props.remote) {
	            this.el.find('.modal-body').load(this.props.remote, _jquery2.default.proxy(function () {
	                this.el.trigger('loaded.bp.modal');
	            }, this));
	        }
	    }
	
	    // 显示-隐藏开关
	
	
	    _createClass(Modal, [{
	        key: 'toggle',
	        value: function toggle(target) {
	            return this.isShown ? this.hide() : this.show(target);
	        }
	
	        // 显示
	
	    }, {
	        key: 'show',
	        value: function show(target) {
	            var _this = this;
	
	            var e = _jquery2.default.Event('show.pb.modal', { reletedTarget: target });
	
	            if (this.isShown || e.isDefaultPrevented()) return;
	
	            this.isShown = true;
	            this.checkScrollbar();
	            this.setScrollbar();
	            this.$body.addClass('modal-open');
	
	            this.escape();
	
	            this.el.on('click.dismiss.pb.modal', '[data-dismiss="modal"], .modal-close', _jquery2.default.proxy(this.hide, this));
	
	            var transition = _jquery2.default.support.transition;
	
	            this.el.addClass('in').scrollTop(0).attr('tabindex', -1);
	            this.$dialog.addClass('bounceInDown');
	
	            this.adjustDialog();
	
	            // 阻塞，保证动画响应
	            // 减少重绘
	            if (transition) this.el[0].offsetWidth;
	
	            this.enforceFocus();
	
	            if (transition) {
	                // css3
	                this.el.attr('aria-hidden', false).one('uiTransitionEnd', function () {
	                    return _this.el.trigger('focus').trigger(e);
	                }).emulateTransitionEnd(Modal.TRANSITION_DURATION);
	            } else {
	                this.el.attr('aria-hidden', true).fadeIn(Modal.TRANSITION_DURATION, function () {
	                    return _this.el.trigger('focus').trigger(e);
	                });
	            }
	        }
	
	        // 隐藏弹层
	
	    }, {
	        key: 'hide',
	        value: function hide(e) {
	            var _this2 = this;
	
	            if (e) e.preventDefault();
	
	            if (!this.el.is(':visible') && !this.isShown) return;
	
	            this.isShown = false;
	
	            this.escape();
	
	            (0, _jquery2.default)(document).off('focusin.pb.modal').off('keydown.bp.modal');
	
	            this.el.attr('aria-hidden', true).off('click.dismiss.pb.modal').off('mouseup.dismiss.pb.modal');
	
	            this.$dialog.off('mousedown.dismiss.bp.modal');
	
	            _jquery2.default.support.transition ? this.el.one('uiTransitionEnd', _jquery2.default.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.el.fadeOut(Modal.TRANSITION_DURATION, function () {
	                return _this2.hideModal();
	            });
	        }
	
	        // esc关闭
	
	    }, {
	        key: 'escape',
	        value: function escape() {
	            var _this3 = this;
	
	            if (this.isShown && this.props.keyboard) {
	                this.el.on('keydown.dismiss.bp.modal', function (e) {
	                    e.which === 27 && _this3.hide();
	                });
	            } else if (!this.isShown) {
	                this.el.off('keydown.dismiss.bp.modal');
	            }
	        }
	
	        // 隐藏弹层
	
	    }, {
	        key: 'hideModal',
	        value: function hideModal() {
	            var e = _jquery2.default.Event('hide.bp.modal', { reletedTarget: this.el });
	            this.$body.removeClass('modal-open');
	            this.resetAdjustments();
	            this.resetScrollbar();
	            this.$dialog.removeClass('bounceInDown');
	            this.el.removeClass('in').trigger(e);
	            this.isHideRemove && this.el.remove();
	        }
	
	        // 调整弹层位置
	
	    }, {
	        key: 'handleUpdate',
	        value: function handleUpdate() {
	            this.ajustDialog();
	        }
	    }, {
	        key: 'adjustDialog',
	        value: function adjustDialog() {
	            var modalIsOverflowing = this.el[0].scrollHeight > document.documentElement.clientHeight;
	            this.el.css({
	                paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	                paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	            });
	        }
	    }, {
	        key: 'resetAdjustments',
	        value: function resetAdjustments() {
	            this.el.css({
	                paddingLeft: '',
	                paddingRight: ''
	            });
	        }
	
	        // 弹层获取焦点
	
	    }, {
	        key: 'enforceFocus',
	        value: function enforceFocus() {
	            var _this4 = this;
	
	            (0, _jquery2.default)(document).off('focusin.bp.modal').on('focusin.bp.modal', function (e) {
	                if (_this4.el[0] !== e.target && !_this4.el.has(e.target).length) _this4.$dialog.trigger('focus');
	            });
	        }
	
	        // 滚动条
	
	    }, {
	        key: 'checkScrollbar',
	        value: function checkScrollbar() {
	            var fullWindowWidth = window.innerWidth;
	
	            if (!fullWindowWidth) {
	                var documentElementRect = document.documentElement.getBoundingClientRect();
	                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	            }
	
	            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
	
	            this.scrollbarWidth = this.measureScrollbar();
	        }
	
	        // 设置滚动条
	
	    }, {
	        key: 'setScrollbar',
	        value: function setScrollbar() {
	            var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
	            this.originalBodyPad = document.body.style.paddingRight || '';
	            if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
	        }
	    }, {
	        key: 'resetScrollbar',
	        value: function resetScrollbar() {
	            this.$body.css('padding-right', this.originalBodyPad);
	        }
	    }, {
	        key: 'measureScrollbar',
	        value: function measureScrollbar() {
	            var scrollDiv = document.createElement('div');
	            scrollDiv.className = 'modal-scrollbar-measure';
	            this.$body[0].appendChild(scrollDiv);
	            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	            this.$body[0].removeChild(scrollDiv);
	            return scrollbarWidth;
	        }
	
	        // ------
	        // 扩展方法
	
	    }, {
	        key: 'setContent',
	        value: function setContent(content) {
	            var $content = this.el.find('.modal-body');
	            $content.length && $content.html(content || '');
	        }
	    }, {
	        key: 'setTitle',
	        value: function setTitle(title) {
	            var $title = this.el.find('.modal-title');
	            $title.length && $title.html(title || '');
	        }
	
	        // 调整大小
	
	    }, {
	        key: 'setSize',
	        value: function setSize(size, inited) {
	            if (this.size === size && !inited) return;
	            var cls = this.el.attr('class').split(' '),
	                i = 0,
	                sizes = [];
	            for (; i < cls.length; i++) {
	                if (cls[i].indexOf('-modal') === -1) sizes.push(cls[i]);
	            }
	            size && sizes.push(size + '-modal');
	            this.el.attr('class', sizes.join(' '));
	        }
	    }]);
	
	    return Modal;
	}();
	
	// 动画时长
	
	
	exports.default = Modal;
	Modal.TRANSITION_DURATION = 150;
	
	// 默认配置
	Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true,
	    size: false
	
	    // 弹层 HTML 结构
	};Modal.TEMPLATE = '\n    <div class="modal-background fade" id="{{mid}}">\n        <div class="modal-layer">\n            <div class="modal-position">\n            <div class="modal-wrap animated bounceInDown">\n                <div class="modal-head">\n                    <span class="modal-title">{{title}}</span>\n                    <i class="modal-close"></i>\n                </div>\n                <div class="modal-body">\n                {{content}}\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n';
	
	// 渲染
	Modal.render = function (option) {
	    var $body = (0, _jquery2.default)(document.body),
	        element = void 0;
	
	    // 按配置参数类搭建骨架
	    if (_jquery2.default.isPlainObject(option)) {
	        element = Modal.TEMPLATE.replace(/{{(\w*)}}/gi, function (match, key) {
	            var value = option[key];
	            // 字符串字段
	            if (value && typeof value === 'string') return (/^(\.|#)\w*/gi.test(value) ? (0, _jquery2.default)(value).html() : value
	            );
	            // 如果 value 为 jquery 元素
	            if (value && value instanceof _jquery2.default && value.length > 0) return value.html();
	        });
	
	        element = (0, _jquery2.default)(element).appendTo($body);
	    }
	
	    return element;
	};
	
	// 插件定义
	//======================
	function Plugin(option) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    if (!(0, _jquery2.default)(this).length && option && /^#(\w*)/gi.test((0, _jquery2.default)(this).selector)) {
	        // js创建
	        var data = void 0,
	            fn = void 0;
	
	        if (typeof option === 'string') {
	            fn = option;
	            option = { title: '\u6807\u9898', content: '' };
	        }
	
	        option.mid = (0, _jquery2.default)(this).selector.replace(/^#/g, '');
	        var el = Modal.render(option);
	
	        el.data('bp.modal', data = new Modal(el, option));
	
	        if (typeof fn === 'string' && typeof data[fn] === 'function') {
	            data[fn].apply(data, args);
	        }
	
	        if (typeof option['callback'] === 'function') option['callback'].call(el);
	
	        // 首次直接显示
	        data.show();
	
	        return el;
	    } else {
	        return (0, _jquery2.default)(this).each(function () {
	            var that = (0, _jquery2.default)(this),
	                data = that.data('bp.modal'),
	                opt = _jquery2.default.extend({}, Modal.DEFAULTS, that.data(), _jquery2.default.isPlainObject(option) ? option : {});
	            if (!data) that.data('bp.modal', data = new Modal(that, opt));
	
	            if (typeof option === 'string') {
	                typeof data[option] === 'function' && data[option].apply(data, args);
	            } else if (_jquery2.default.isPlainObject(option)) {
	                if (option.title) data.setTitle(option.title);
	                if (option.content) data.setContent(option.content);
	                data.show(args);
	            }
	        });
	    }
	}
	
	// jQuery 插件扩展
	_jquery2.default.fn.modal = Plugin;
	_jquery2.default.fn.modal.Constructor = Modal;
	_jquery2.default.closeModal = function (id) {
	    (0, _jquery2.default)(id).modal('hide');
	};
	
	var Handler = function Handler(e) {
	    var that = (0, _jquery2.default)(this),
	        href = that.attr('href'),
	        $target = (0, _jquery2.default)(that.attr('data-target')) || href && href.replace(/.*(?=#[^\s]+$)/, '');
	
	    Plugin.call($target, 'show', this);
	};
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('click.bp.modal', toggle, function (e) {
	        Handler.call(e.target, e);
	    });
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 平滑滚动
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-25
	 *
	 * Reference uikit.notify.js
	 *
	 * API:
	 *      $.notify({
	 *          message: '',
	 *          status:['success', 'warning', 'danger'],
	 *          group: false,
	 *          pos: 'top-center',
	 *          opacity: .85,
	 *          timeout: 5000,
	 *          icon: '',['info', 'success', 'warning', 'error'],
	 *          onClose: function(){}
	 *      });
	 */
	
	var $ = __webpack_require__(2);
	
	// 存放方位集合
	var containers = {};
	//  通知集合
	var messages = {};
	// 接口，扩展$.notify
	var notify = function notify(options) {
	    if (typeof options === 'string') {
	        options = { message: options };
	    }
	
	    if (arguments[1]) {
	        options = $.extend(options, typeof arguments[1] === 'string' ? { status: arguments[1] } : arguments[1]);
	    }
	
	    return new Notify(options).show();
	};
	// 关闭所有接口
	var closeAll = function closeAll(group, instantly) {
	    var id;
	
	    if (group) {
	        for (id in messages) {
	            if (group === messages[id].group) messages[id].close(instantly);
	        }
	    } else {
	        for (id in messages) {
	            messages[id].close(instantly);
	        }
	    }
	};
	
	// 构造函数
	// ===============
	var Notify = function Notify(options) {
	
	    this.timeout = false;
	    this.currentStatus = "";
	    this.group = false;
	    this.options = $.extend({}, Notify.DEFAULTS, options);
	
	    // uuid 设置唯一id
	    this.uuid = 'Notify_' + Math.random().toString(36).substr(2);
	
	    // 创建元素
	    this.$el = $(['<div class="notify-message">', '<a class="notify-close">&times;</a>', '<div></div>', '</div>'].join('')).data('bp.notify', this);
	
	    // 设置内容
	    this.content(this.options.message);
	
	    // 设置状态
	    if (this.options.status) {
	        this.$el.addClass('notify-message-' + this.options.status);
	        this.currentStatus = this.options.status;
	    }
	
	    // 分组
	    this.group = this.options.group;
	
	    // 消息按uuid存放
	    messages[this.uuid] = this;
	
	    // 方位存放
	    if (!containers[this.options.pos]) {
	        containers[this.options.pos] = $('<div class="notify notify-' + this.options.pos + '"></div>').appendTo($('body')).on('click', '.notify-message', function () {
	            var message = $(this).data('bp.notify');
	            message.$el.trigger('manualclose.bp.notify', [message]);
	            message.close();
	        });
	    }
	};
	
	Notify.VERSION = '1.0.0';
	
	Notify.DEFAULTS = {
	    message: "", // 提示内容
	    status: "", // 状态，样式颜色
	    opacity: .95, // 层透明度
	    timeout: 5000, // 定时延迟消失
	    group: null, // 是否分组
	    pos: "vcenter", // 定位
	    onClose: $.noop, // 关闭触发事件
	    compelete: $.noop, // 消失后函数
	    icon: '' //['info', 'success', 'warning', 'error'],
	};
	
	Notify.ICONS = {
	    'info': 'icon-info-outline',
	    'success': 'icon-done',
	    'warning': 'icon-error_outline',
	    'error': 'icon-highlight_remove'
	};
	
	// Public Method
	// ===============
	/* 显示 */
	Notify.prototype.show = function () {
	    if (this.$el.is(':visible')) return;
	
	    var $this = this;
	
	    // 方位添加元素
	    containers[this.options.pos].show().prepend(this.$el);
	
	    var marginbottom = parseInt(this.$el.css('margin-bottom'), 10);
	
	    // 动画显示
	    this.$el.css({ opacity: 0, "margin-top": -1 * this.$el.outerHeight(), "margin-bottom": 0 }).animate({ opacity: this.options.opacity, "margin-top": 0, "margin-bottom": marginbottom }, function () {
	        if ($this.options.timeout) {
	            // 延时关闭
	            var closefn = function closefn() {
	                $this.close();
	            };
	            $this.timeout = setTimeout(closefn, $this.options.timeout);
	
	            $this.$el.hover(function () {
	                clearTimeout($this.timeout);
	            }, function () {
	                $this.timeout = setTimeout(closefn, $this.options.timeout);
	            });
	        }
	    });
	
	    return this;
	};
	
	/* 关闭 */
	Notify.prototype.close = function (instanly) {
	    var $this = this,
	        finalize = function finalize() {
	        $this.$el.remove();
	
	        if (!containers[$this.options.pos].children().length) {
	            containers[$this.options.pos].hide();
	        }
	
	        $this.options.onClose.apply($this, []);
	        $this.$el.trigger('close.bp.notify', [$this]);
	
	        delete messages[$this.uuid];
	
	        typeof $this.options.compelete === 'function' && $this.options.compelete($this.$el);
	    };
	
	    if (this.timeout) clearTimeout(this.timeout);
	
	    if (instanly) {
	        finalize();
	    } else {
	        this.$el.animate({ opacity: 0, "margin-top": -1 * this.$el.outerHeight(), "margin-bottom": 0 }, function () {
	            finalize();
	        });
	    }
	};
	
	/* 设置内容或获取 */
	Notify.prototype.content = function (html) {
	    var container = this.$el.find('>div');
	
	    if (!html) {
	        return container.html();
	    }
	
	    // 带图标
	    if (!!this.options.icon) {
	        html = '<div class="notify-bfc"><i class="' + Notify.ICONS[this.options.icon] + '"></i> <div>' + html + '</div></div>';
	    }
	    container.html(html);
	
	    return this;
	};
	
	/* 设置状态及样式 */
	Notify.prototype.status = function (status) {
	    if (!status) {
	        return this.currentStatus;
	    }
	
	    this.$el.removeClass('nofity-message-' + this.currentStatus).addClass('notify-message-' + status);
	
	    this.currentStatus = status;
	
	    return this;
	};
	
	// 插件定义
	//======================
	function Plugin(option) {
	    return $(this).on('click', function () {
	        option = typeof option === 'string' ? { message: option } : option;
	        var data = new Notify(option);
	        data.show();
	    });
	}
	
	// jQuery 插件扩展
	$.notify = notify;
	$.notify.closeAll = closeAll;
	$.fn.notify = Plugin;
	$.fn.notify.Constructor = Notify;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	
	  // ----------
	  // jquery API
	
	};function Plugin(option) {
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * brickPlus主文件
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-04
	 */
	
	'use strict';
	
	__webpack_require__(3);
	
	__webpack_require__(8);
	
	__webpack_require__(5);
	
	__webpack_require__(9);
	
	__webpack_require__(10);
	
	__webpack_require__(11);
	
	__webpack_require__(13);
	
	__webpack_require__(1);
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	__webpack_require__(4);
	
	__webpack_require__(17);
	
	__webpack_require__(18);
	
	__webpack_require__(19);
	
	__webpack_require__(6);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(22);
	
	__webpack_require__(24);
	
	__webpack_require__(25);
	
	__webpack_require__(27);
	
	__webpack_require__(28);
	
	__webpack_require__(29);
	
	var $ = __webpack_require__(2);
	
	var BrickPlus = {};
	
	// 全选组件
	//require('./checkAll')
	// tab组件
	//require('./tab')
	
	
	//数据表格
	
	
	// ------- 工具函数库 ----------
	BrickPlus.Util = __webpack_require__(30);
	
	// ----初始化
	$(function () {
	  // 1. 密码禁止复制黏贴
	  // 2. 文本不能输入空格
	  // 3. 表格禁止自动提示属性
	  $('form').attr('autocomplete', 'off');
	});
	
	// jQuery bridge API
	$.brickPlus = BrickPlus;
	
	// API
	module.exports = BrickPlus;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	
	    // 插件定义
	    //======================
	};function Plugin(o, s) {
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @component   : checkAll全选
	 * @version     : {{VERSION}}
	 * @author      : tommyshao <jinhong.shao@frontpay.cn>
	 * @created     : 2016-07-05
	 * @description :
	 * @useage      :
	 ## 用法
	 ```
	  <input type="checkbox" data-toggle="checkAll" data-target="selector" />
	  $(element).on('checked.ui.checkAll', function(e){ e.relatedTarget; });
	  $(element).on('reversed.ui.checkAll', function(e){ e.relatedTarget; });
	 ```
	 */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $ = __webpack_require__(2);
	
	var toggle = '[data-toggle="checkAll"]';
	
	var CheckAll = function () {
	  // 构造函数
	  // -------
	  // * `element` dom元素对象
	  function CheckAll(element) {
	    _classCallCheck(this, CheckAll);
	
	    // dom元素
	    this.$el = $(element);
	    // 响应元素集合
	    this.$target = $(this.$el.data('target'));
	    // 是否反选模式
	    this.isReverse = Boolean(this.$el.data('reverse'));
	
	    //  是否全选不会影响响应元素
	    this.isNoCheckAll = Boolean(this.$el.data('nocheckall'));
	
	    // 版本号
	    this.VERSION = '{{VERSION}}';
	
	    // 初始化事件
	    this.initEvents();
	  }
	
	  // 事件监听
	
	
	  _createClass(CheckAll, [{
	    key: 'initEvents',
	    value: function initEvents() {
	      // 监听 `click` 点击事件，如果全选不影响单选状态则不监听
	      this.$el.on('click', $.proxy(this.toggle, this));
	      // 对全选监听change.toggle事件用于触发单选状态改变全选状态,反选则不触发
	      !this.isReverse && this.$target.on('change.status', $.proxy(this.targetToggle, this));
	    }
	
	    // 切换中枢
	    // -------
	
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.isReverse ? this.reverse() : this.activate();
	    }
	
	    // 单选状态改变全选状态 by Limit
	
	  }, {
	    key: 'targetToggle',
	    value: function targetToggle() {
	      //  反选按钮则退出
	      if (this.isReverse) {
	        return false;
	      }
	      var isCheckAlled = true;
	      if (!this.isNoCheckAll) {
	        //  全部选上才触发对象勾选激活
	        this.$target.map(function () {
	          if (!$(this).prop('checked')) {
	            isCheckAlled = false;
	            return false;
	          }
	        });
	      } else {
	        //  非全选状态下，只要勾选一个就认为对象勾选激活
	        isCheckAlled = false;
	        this.$target.map(function () {
	          if ($(this).prop('checked')) {
	            isCheckAlled = true;
	            return false;
	          }
	        });
	      }
	      this.$el.prop('checked', isCheckAlled).trigger('change.status');
	    }
	
	    // 全选功能
	    // --------
	    // Function activate
	
	  }, {
	    key: 'activate',
	    value: function activate(isChecked) {
	      var _ref = [
	      // button触发全选传值可能为false
	      !isChecked && isChecked !== false ? this.$el.is(':checked') : isChecked, // 当前dom元素是否勾选
	      $.Event('checked.bp.checkAll', {
	        relatedTarget: this.$el
	      }) // 创建选中事件
	      ],
	          isCheck = _ref[0],
	          e = _ref[1];
	      // button触发全选时，设置全选为选中 by limit
	
	      this.$el.prop('checked', isCheck);
	      // 设置所有目标元素属性
	      if (this.isNoCheckAll) {
	        !isCheck && this.$target.prop('checked', isCheck);
	      } else {
	        this.$target.prop('checked', isCheck);
	      }
	      // 触发反选事件api
	      this.$el.trigger(e);
	    }
	
	    // 反选功能
	    // -------
	
	  }, {
	    key: 'reverse',
	    value: function reverse() {
	      // 定义反选事件类型
	      var e = $.Event('reversed.bp.checkAll', {
	        relatedTarget: this.$el
	      });
	      // 遍历所有目标元素，将他们选中属性反转
	      this.$target.map(function () {
	        return $(this).prop('checked', function () {
	          return !$(this).prop('checked');
	        }).trigger('change.status');
	      });
	      // 触发反选事件api
	      this.$el.trigger(e);
	    }
	  }]);
	
	  return CheckAll;
	}();
	
	// 插件定义
	// -------
	
	
	var Plugin = function Plugin(option) {
	  var _this = this;
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return $(this).each(function () {
	    var _data;
	
	    var _ref2 = [$(_this), $(_this).data('bp.checkAll')],
	        $this = _ref2[0],
	        data = _ref2[1];
	
	
	    if (!data) {
	      $this.data('bp.checkAll', data = new CheckAll(_this));
	      if (option === 'toggle') data.toggle();
	    }
	
	    if (typeof option === 'string' && option !== 'toggle') (_data = data)[option].apply(_data, args);
	  });
	};
	
	// jQuery 插件扩展
	// -------------
	$.fn.checkAll = Plugin;
	$.fn.checkAll.Constructor = CheckAll;
	
	// 全局绑定插件
	// -------------
	// $(function() {
	//   $(toggle).checkAll()
	// });
	$(function () {
	
	  // 全局绑定插件 单选和全选交互 by limit
	  $(document).on('click.checkAll', ':checkbox', function (e) {
	    $(toggle).map(function () {
	      if (!$(this).data('isCheckAllInited')) {
	        //  如果为当前点击的checkBox则调用toggle
	        e.target == this ? $(this).checkAll('toggle') : $(this).checkAll();
	        $(this).data('isCheckAllInited', true);
	      }
	    });
	    // $(this).checkAll('toggle')
	  });
	
	  // 全局绑定插件 单选和全选交互 by limit 这样会导致新渲染的checkAll控件组无法激活插件
	  // $(toggle).map(function() {
	  //   $(this).checkAll();
	  // });
	});
	
	module.exports = CheckAll;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * 日期选择插件
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * fork daterange
	 * 2016-07-11
	 */
	
	var $ = __webpack_require__(2);
	
	var zeroPad = __webpack_require__(12);
	
	var toggle = '[data-toggle="datetimepicker"]';
	
	var __prefix = 'datetimepicker';
	
	/**
	 * 隐藏所有的日历元素
	 * @return
	 */
	function hideAllCalendars() {
	  $('.' + __prefix).hide().parent().removeClass('active');
	}
	
	/**
	* @description 整个日期选择器对象的构造函数入口，支持丰富的接口参数传递，大多数提供默认配置，可传入覆盖
	* @param {String} element 日期选择器
	* @param {object} options 配置数组
	*/
	function DateTimePikcer(element, options) {
	  // 主元素
	  this.$el = $(element);
	  this.options = $.extend({}, DateTimePikcer.DEAFULTS, options);
	  this.endDate = '';
	  this.uuid = 'C' + Math.random().toString(36).slice(-8) + '_';
	
	  // 初始化
	  this.init();
	};
	
	/**
	 * @description 日期选择器的初始化方法，对象原型扩展
	 * @param
	 */
	DateTimePikcer.prototype.init = function () {
	
	  //昨天,今天,最近7天,最近14天,最近30天
	  this.periodObj = {};
	  this.periodObj['today'] = 0;
	  this.periodObj['yesterday'] = 1;
	  this.periodObj['aRecent7Days'] = 6;
	  this.periodObj['aRecent14Days'] = 13;
	  this.periodObj['aRecent30Days'] = 29;
	
	  //--- 渲染模板
	  this.render();
	
	  //--- 状态初始化
	  var position = this.$el.position(),
	      elHeight = this.$el.outerHeight();
	  // 设置浮层位置
	  this.$calendar.css({
	    top: elHeight + 'px',
	    left: position.left + 'px'
	  });
	
	  // 存放子元素对象
	  // 头部，7天，14天，30天特殊快捷按钮
	  this.$header = this.$calendar.find('.datetimepicker-header');
	  this.periodBtns = this.$header.find('.datetimepicker-btn');
	  // 日历表格容器
	  this.$body = this.$calendar.find('.datetimepicker-body');
	  // 底部元素
	  this.$footer = this.$calendar.find('.datetimepicker-footer');
	  // 开始日期
	  this.$start = this.$footer.find('[data-action="start"]');
	  // 结束日期
	  this.$end = this.$footer.find('[data-action="end"]');
	  // 确定按钮
	  this.$confirmBtn = this.$footer.find('[data-action="ok"]');
	  // 取消按钮
	  this.$cancelBtn = this.$footer.find('[data-action="cancel"]');
	
	  // 配置是否显示
	  // 无比较时隐藏头部，底部
	  if (!this.options.period) this.$header.hide() && this.$footer.hide();
	
	  //--- 赋值初始化
	  this.__setDefaultValue();
	
	  // --- 开始&结束日期的name属性
	  var k = 0,
	      names = this.options.names,
	      nameLen = names.length > 2 ? 2 : names.length;
	  for (; k < 2; k++) {
	    this[k === 0 ? '$start' : '$end'].prop('name', names[k]);
	  }
	
	  //--- 一个日历的区间选择
	  if (this.options.calendars === 1 && this.options.period) {
	    this.$cancelBtn.hide();
	    this.periodBtns.eq(1).hide();
	  }
	
	  // 渲染日历
	  // show的时候才渲染
	  //this.renderCalendar();
	
	  //--- 事件统一管理
	  this.__listenEvent();
	};
	
	/**
	 * 设置默认值
	 * @return {[type]} [description]
	 */
	DateTimePikcer.prototype.__setDefaultValue = function () {
	  var __self = this;
	  var inputValue = $.trim(__self.$el.val());
	  var __selfValue,
	      dates = [],
	      __endValue = '';
	
	  // 为空的时候默认选上今天日期
	  if (inputValue === '') {
	
	    __selfValue = __endValue = __self.date2ymd(new Date());
	  } else if (inputValue.indexOf(__self.options.defaultText) > -1) {
	    // 对比
	    // 按 defaultText 拆分开始和结束日期
	    dates = inputValue.split(__self.options.defaultText);
	
	    if (dates.length === 2) {
	      // 为 xxxx-xx-xx 至 oooo-oo-oo格式
	      if (__self.compareStrDate(dates[0], dates[1]) < 0) {
	        // 比较开始和结束时间
	        __selfValue = __self.formatDate(dates[0]);
	        __endValue = __self.formatDate(dates[1]);
	      } else {
	        // 交换开始结束时间位置
	        __selfValue = __self.formatDate(dates[1]);
	        __endValue = __self.formatDate(dates[0]);
	      }
	    } else {
	      // 开始结束日期相同
	      __selfValue = __endValue = __self.formatDate(dates[0]);
	    }
	  } else {
	    // 单选
	
	    __selfValue = __endValue = __self.formatDate($.trim(__self.$el.val()));
	  }
	
	  // 重新设定默认值
	  __self.setValue(__selfValue, __endValue);
	};
	
	DateTimePikcer.prototype.setValue = function (ymd, end, newDate) {
	
	  // 区间日期
	  if (this.options.period) {
	    if (!!newDate) {
	      // 选择日期非快捷日期
	      // 之前已选了范围
	      // 再选择则为重新开始选择日期
	      if (ymd !== end) {
	        ymd = end = newDate;
	      }
	
	      // if else if 减少比较操作
	      // 新选的日期比之前开始日期小，则开始时间为最新选中时间
	      if (this.compareStrDate(newDate, ymd) < 0) {
	        ymd = newDate;
	      } else if (this.compareStrDate(end, newDate) < 0) {
	        // 新选的日期比之前结束时间大，则结束时间应为最新选中时间
	        end = newDate;
	      }
	    }
	
	    this.$el.val([ymd, this.options.defaultText, end].join(''));
	    this.endDate = end;
	
	    this.$end.val(end);
	  } else {
	    // 单选日期
	    this.$el.val(ymd);
	    this.$end.val(ymd);
	    this.endDate = ymd;
	  }
	
	  // 开始&结束文本框的日期
	  this.$start.val(ymd);
	};
	
	/**
	 * @description 渲染框架
	 * @return {[type]} [description]
	 */
	DateTimePikcer.prototype.render = function () {
	  // 获取骨架 dom 结构
	  var template = this.options.template ? this.options.template : DateTimePikcer.TEMPLATE.join('');
	  // 保存日历骨架元素
	  // 插入在输入框后面，多日历
	  // 不受弹层影响
	  this.$calendar = $(template);
	  this.$el.after(this.$calendar);
	};
	
	/**
	 * 渲染日历表格
	 * @return {[type]} [description]
	 */
	DateTimePikcer.prototype.renderCalendar = function () {
	  var i = 0,
	      len = this.options.calendars,
	      td,
	      endDate = this.str2date(this.endDate);
	
	  // 先清空原先内容
	  this.$body.empty();
	
	  // 计算并显示以 endDate 为结尾的最近几个月的日期列表
	  for (; i < len; i++) {
	    td = this.fillDate(endDate.getFullYear(), endDate.getMonth(), i);
	    i === 0 ? this.$body.append(td) : this.$body.prepend(td);
	    endDate.setMonth(endDate.getMonth() - 1, 1);
	  }
	
	  // 添加选中样式
	  this.__addCss();
	
	  // 位置设置
	  this.__setPosition();
	};
	
	/**
	 * 已选日期添加样式
	 */
	DateTimePikcer.prototype.__addCss = function () {
	  var start = this.$start.val(),
	      end = this.$end.val(),
	      startDate = this.str2date(start),
	      endDate = this.str2date(end),
	      date2ymd = this.date2ymd,
	      uuid = this.uuid,
	      cls = this.options.period ? 'selected' : 'active';
	
	  // 重置所有样式
	  this.$body.find('td').removeClass('selected first last active');
	  // console.log(start, end)
	  for (var d = startDate; d.getTime() <= endDate.getTime(); d.setDate(d.getDate() + 1)) {
	    // console.log(date2ymd(d))
	    $('#' + uuid + date2ymd(d)).addClass(cls);
	  }
	
	  // 区间日期
	  if (this.options.period) {
	    $('#' + uuid + start).addClass('first');
	    $('#' + uuid + end).addClass('last');
	  }
	};
	
	DateTimePikcer.prototype.__setPosition = function () {
	  var offset = this.$el.offset(),
	      scrollTop = $(window).scrollTop(),
	      winHeight = $(window).height(),
	      elHeight = this.$el.outerHeight(),
	      caHeight = this.$calendar[0].offsetHeight;
	
	  if (offset.top - scrollTop - caHeight < 0) {
	    this.$calendar.css('top', elHeight + 'px');
	  } else if (offset.top - scrollTop + caHeight >= winHeight) {
	    // 在上方
	    this.$calendar.css('top', -caHeight + 'px');
	  } else {
	    // 默认下方
	    this.$calendar.css('top', elHeight + 'px');
	  }
	};
	
	DateTimePikcer.prototype.__listenEvent = function () {
	  var __self = this;
	
	  this.$el.on('focus', $.proxy(this.show, this));
	
	  // 取消
	  this.$cancelBtn.on('click', $.proxy(this.close, this));
	
	  // 确定
	  this.$confirmBtn.on('click', $.proxy(this.confirmSelect, this));
	
	  // 阻止冒泡，不关闭日历
	  this.$calendar.on('click', function (e) {
	    e.stopPropagation();return false;
	  });
	  // 文本框只显示不关闭
	  this.$el.on('click', function (e) {
	    __self.show();
	    e.stopPropagation();
	    return false;
	  });
	
	  // 选择日期
	  this.$calendar.on('click', '[data-date]', function () {
	    __self.activeDate(this);
	    __self.selectDate($(this).attr('data-date'));
	  });
	
	  // 选择特殊日期7,14,30
	  this.$calendar.on('click', '[data-day]', function () {
	    __self.selectPeriod($(this));
	    __self.selectDate();
	    __self.__togglePeriodBtn($(this));
	  });
	
	  // 上一个
	  this.$calendar.on('click', '[data-action="prevMonth"]', function () {
	    __self.tab(-1);
	  });
	  // 下一个
	  this.$calendar.on('click', '[data-action="nextMonth"]', function () {
	    __self.tab(1);
	  });
	
	  // 选择年，月
	  var hideDropdown = function hideDropdown() {
	    __self.$calendar.find('.datetimepicker-dropdown').removeClass('active');
	  };
	  this.$calendar.on('click', '.datetimepicker-dropdown', function (e) {
	    var type = $(this).attr('data-type'),
	        index = $(this).attr('data-index');
	    hideDropdown();
	    __self.dropDown(this, type, index);
	    e.stopPropagation();
	  });
	
	  this.$calendar.on('click.hideDropdown', hideDropdown);
	
	  this.$calendar.on('click.setDate', '.datetimepicker-dropdown li', function () {
	    __self.selectYMD(this);
	  });
	
	  // 点击任何地方关闭日历
	  $(document).on('click.hide.datetimepicker', $.proxy(this.close, this));
	};
	
	/**
	 * 选择特殊日期期间，快捷键
	 * @param  {[type]} el [description]
	 * @return {[type]}    [description]
	 */
	DateTimePikcer.prototype.selectPeriod = function (el) {
	  var elPeriod = $(el),
	      days = elPeriod.attr('data-day'),
	      date;
	
	  days = this.periodObj[days], date = this.getSpecialPeriod(days);
	
	  // 给文本框赋值
	  this.$end.val(date.today);
	  this.$start.val(date.otherday);
	  this.endDate = date.today;
	};
	
	/**
	 * 按钮点击后加上激活样式
	 * @param  {element} el 当前点击按钮，为空时取出所有高亮
	 * @return {[type]}    [description]
	 */
	DateTimePikcer.prototype.__togglePeriodBtn = function (el) {
	  this.periodBtns.removeClass('active');
	  el && $(el).addClass('active');
	};
	
	/**
	 * @description 计算今天，昨天，最近7天，最近30天返回的时间范围
	 * @param {Num} period 快捷选择的时间段，今天、昨天、最近7天、最近30天
	 */
	DateTimePikcer.prototype.getSpecialPeriod = function (period) {
	  var __method = this;
	  var date = new Date();
	  //如果今天不可用，则从昨天向前推 added by johnnyzheng 12-07
	  true == __method.options.isTodayValid && '' != __method.options.isTodayValid || 2 > period ? '' : date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	  var timeStamp = date.getTime() - period * 24 * 60 * 60 * 1000 < __method.options.minValidDate * 1000 ? __method.options.minValidDate * 1000 : date.getTime() - period * 24 * 60 * 60 * 1000;
	  var todayStr = date.getFullYear() + '-' + zeroPad(date.getMonth() + 1) + '-' + zeroPad(date.getDate());
	  date.setTime(timeStamp);
	  var otherdayStr = date.getFullYear() + '-' + zeroPad(date.getMonth() + 1) + '-' + zeroPad(date.getDate());
	  if (period == __method.periodObj.aYesterday) {
	    todayStr = otherdayStr;
	  }
	  return { today: todayStr, otherday: otherdayStr };
	};
	
	/**
	 * @description 判断开始、结束日期是否处在允许的范围内
	 * @param {String} startYmd 开始时间字符串
	 * @param {String} endYmd 结束时间字符串
	 */
	DateTimePikcer.prototype.checkDateRange = function (startYmd, endYmd) {
	  var sDate = this.str2date(startYmd);
	  var eDate = this.str2date(endYmd);
	  var sTime = sDate.getTime();
	  var eTime = eDate.getTime();
	  var minEDate, maxEDate;
	
	  var day;
	
	  if (eTime >= sTime) {
	    day = (eTime - sTime) / 1000 / 60 / 60 / 24;
	  } else {
	    day = (sTime - eTime) / 1000 / 60 / 60 / 24;
	  }
	
	  if (day > this.options.dayRangeMax) {
	    alert('最大时间跨度不能大于：' + this.options.dayRangeMax);
	    return false;
	  }
	  return true;
	};
	
	/**
	 *  @description 选择日期
	 *  @param {String} ymd 时间字符串
	 */
	DateTimePikcer.prototype.selectDate = function (ymd) {
	
	  var Evt = $.Event('choose.bp.datetimepicker');
	  var start = this.$start.val(),
	      end = this.$end.val();
	
	  // 区间日期
	  if (this.options.period && ymd) {
	    this.setValue(start, end, ymd);
	    this.__addCss();
	    // 去除快捷按钮高亮
	    this.__togglePeriodBtn();
	  } else {
	
	    if (!ymd) {
	      // 特殊日期
	      ymd = start;
	    }
	
	    this.setValue(ymd, end);
	    this.$el.trigger(Evt, [ymd, end]);
	    // 配置函数回调
	    typeof this.options.success === 'function' && this.options.success(ymd, end);
	    this.close();
	  }
	};
	
	/**
	 * 确定按钮
	 * @return {[type]} [description]
	 */
	DateTimePikcer.prototype.confirmSelect = function () {
	  var __self = this,
	      start = this.$start.val(),
	      end = this.$end.val();
	  // @todo: 检测选择日期是否在限制范围内
	  if (!__self.checkDateRange(start, end)) {
	    start = end = __self.date2ymd(new Date());
	    this.$start.val(start);
	    this.$end.val(end);
	  }
	
	  __self.selectDate();
	};
	
	/**
	 * 高亮样式
	 * @param  {[type]} el [description]
	 * @return {[type]}    [description]
	 */
	DateTimePikcer.prototype.activeDate = function (el) {
	  this.$calendar.find('td.active').removeClass('active');
	  $(el).addClass('active');
	};
	
	/**
	 * 切换月份
	 * @param  {Number} n  [1,-1] 后一个月+1，前一个月-1
	 * @return {}   重新渲染日历表格
	 */
	DateTimePikcer.prototype.tab = function (n) {
	  // 转换成时间
	  var endDate = this.str2date(this.endDate);
	  // 变化月份
	  endDate.setMonth(endDate.getMonth() + n, 1);
	  this.endDate = this.date2ymd(endDate);
	
	  //this.$start.val(this.endDate);
	  //this.$end.val(this.endDate);
	
	  // 重新渲染日历表格
	  this.renderCalendar();
	};
	
	/**
	 * @description显示日期选择框
	 * @param
	 */
	DateTimePikcer.prototype.show = function () {
	  var Evt = $.Event('show.bp.datetimepicker');
	  // 隐藏所有的日历
	  hideAllCalendars();
	  // 显示日历层
	  this.renderCalendar();
	  this.$calendar.show().addClass('active');
	
	  // 位置设置
	  this.__setPosition();
	
	  // 触发show.bp.datetimepicker事件，父级高亮
	  this.$el.trigger(Evt).parent().addClass('active');
	};
	
	/**
	 * @description 关闭日期选择框
	 * @param
	 */
	DateTimePikcer.prototype.close = function () {
	  var Evt = $.Event('close.bp.datetimepicker');
	  // 隐藏层
	  this.$calendar.hide().removeClass('active');
	
	  // 关闭后，结束日期重置为选择结束日期
	  this.endDate = this.$end.val();
	
	  // 触发close.bp.datetimpiker事件，父级去掉高亮
	  this.$el.trigger(Evt).parent().removeClass('active');
	};
	
	/**
	 * 设置最大可选日期
	 * @param {[type]} d [description]
	 */
	DateTimePikcer.prototype.setMaxDate = function (d) {
	  this.options.max = this.formatDate(d) || this.options.max;
	};
	
	/**
	 * 设置最小可选日期
	 * @param {[type]} d [description]
	 */
	DateTimePikcer.prototype.setMinDate = function (d) {
	  this.options.min = this.formatDate(d) || this.options.min;
	};
	
	/**
	 * 设置配置
	 * @param {object}  o      新合并配置项
	 * @param {Boolean} isShow 是否立即重新显示
	 */
	DateTimePikcer.prototype.setOption = function (o, isShow) {
	  this.options = $.extend({}, this.options, o);
	  // 立即显示
	  isShow && this.renderCalendar();
	};
	
	/**
	 * 年月下拉
	 * @param  {[type]} el   [description]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	DateTimePikcer.prototype.dropDown = function (el, type, index) {
	  var $list = $(el).find('ul'),
	      ul = ['<ul>', '</ul>'],
	      endDate = this.str2date(this.endDate),
	      maxYear = this.options.max.slice(0, 4) || new Date().getFullYear() + 3,
	      minYear = this.str2date(this.options.min).getFullYear(),
	      defaultValue = $(el).attr('data-value'),
	      i = 1;
	
	  if (!$list.length) {
	    if (type === 'month') {
	      for (; i <= 12; i++) {
	        ul.splice(-1, -1, '<li data-type="m" data-index="' + index + '"' + (i == defaultValue ? ' class="active"' : '') + '>' + i + '</li>');
	      }
	    } else {
	      for (i = maxYear; i >= minYear; i--) {
	        ul.splice(-1, -1, '<li data-type="y" data-index="' + index + '"' + (i == defaultValue ? ' class="active"' : '') + '>' + i + '</li>');
	      }
	    }
	
	    $list = $(ul.join(''));
	    $(el).append($list);
	  }
	
	  $(el).addClass('active');
	};
	
	/**
	 * 选择年或月时切换
	 * @param  {[type]} el [description]
	 * @return {[type]}    [description]
	 */
	DateTimePikcer.prototype.selectYMD = function (el) {
	  var that = $(el),
	      type = that.attr('data-type'),
	      index = that.attr('data-index'),
	      endDate = this.endDate,
	      value = that.text();
	
	  value = value > 9 ? value : '0' + value;
	
	  endDate = type === 'y' ? endDate.replace(/(\d{1,4})-(\d{1,2})-(\d{1,2})/g, value + '-$2-01') : endDate.replace(/(\d{1,4})-(\d{1,2})-(\d{1,2})/g, '$1-' + value + '-$2-01');
	
	  // 设置后一个月
	  endDate = this.str2date(endDate);
	  if (type === 'y') {
	    // 切换年，月不变
	    endDate.setDate(endDate.getMonth());
	  } else {
	    // 切换最后一个日期月份不变，第一个需要加一
	    endDate.setMonth(index == 0 ? endDate.getMonth() : endDate.getMonth() + this.options.calendars - 1, 1);
	  }
	
	  // 重新渲染日历
	  this.endDate = this.date2ymd(endDate);
	  this.renderCalendar();
	};
	
	/**
	 * @description 日期填充函数
	 * @param {Num}
	 *            year 年
	 * @param {Num}
	 *            month 月
	 */
	DateTimePikcer.prototype.fillDate = function (year, month, index) {
	  var __method = this;
	
	  // 当月第一天
	  var firstDayOfMonth = new Date(year, month, 1);
	  var dateBegin = new Date(year, month, 1);
	  var w = dateBegin.getDay();
	  // 计算应该开始的日期
	  dateBegin.setDate(1 - w);
	
	  // 当月最后一天
	  var lastDayOfMonth = new Date(year, month + 1, 0);
	  var dateEnd = new Date(year, month + 1, 0);
	  w = dateEnd.getDay();
	  // 计算应该结束的日期
	  dateEnd.setDate(dateEnd.getDate() + 6 - w);
	
	  var today = new Date();
	  var dToday = today.getDate();
	  var mToday = today.getMonth();
	  var yToday = today.getFullYear();
	
	  var table = document.createElement('table');
	
	  //table.className = this.mOpts.dateTable;
	
	  var cap = document.createElement('caption');
	  $(cap).append('<div class="datetimepicker-dropdown" data-type="year" data-index="' + index + '" data-value="' + year + '">' + year + '<i class="icon-chevron-thin-down"></i></div>年<div class="datetimepicker-dropdown" data-type="month" data-index="' + index + '" data-value="' + (month + 1) + '">' + (month + 1) + '<i class="icon-chevron-thin-down"></i></div>月');
	  $(table).append(cap);
	
	  var thead = document.createElement('thead');
	  var tr = document.createElement('tr');
	  var days = ['日', '一', '二', '三', '四', '五', '六'];
	  for (var i = 0, th = ''; i < 7; i++) {
	    // th = document.createElement('th');
	    // $(th).append(days[i]);
	    // $(tr).append(th);
	    th += '<th>' + days[i] + '</th>';
	  }
	  $(tr).html(th);
	  $(thead).append(tr);
	  $(table).append(thead);
	
	  tr = document.createElement('tr');
	  var td = document.createElement('td');
	  // 如果是最后一个月的日期，则加上下一个月的链接
	  if (0 == index) {
	    $(td).append('<a href="javascript:void(0);" class="datetimepicker-next-month" data-action="nextMonth"><i class="icon-chevron-thin-right"></i></a>');
	  }
	  // 如果是第一个月的日期，则加上上一个月的链接
	  if (index + 1 == this.options.calendars) {
	    $(td).append('<a href="javascript:void(0);" class="datetimepicker-prev-month" data-action="prevMonth"><i class="icon-chevron-thin-left"></i></a>');
	  }
	
	  $(td).attr('colSpan', 7).css({ 'text-align': 'center', 'height': '0px' });
	
	  $(tr).append(td);
	  $(table).append(tr);
	
	  // 当前月的所有日期(包括空白位置填充的日期)
	  var tdClass = '',
	      deviation = 0,
	      ymd = '';
	  for (var d = dateBegin; d.getTime() <= dateEnd.getTime(); d.setDate(d.getDate() + 1)) {
	    if (d.getTime() < firstDayOfMonth.getTime()) {
	      // 当前月之前的日期
	      tdClass = 'disabled';
	      deviation = '-1';
	    } else if (d.getTime() > lastDayOfMonth.getTime()) {
	      // 当前月之后的日期
	      tdClass = 'disabled';
	      deviation = '1';
	    } else if (this.options.stopToday == true && d.getTime() > today.getTime() || d.getTime() < __method.str2date(__method.options.min) || '' !== __method.str2date(__method.options.max) && d.getTime() > __method.str2date(__method.options.max)) {
	      // 当前时间之后的日期，或者开启统计之前的日期
	      tdClass = 'disabled';
	      deviation = '2';
	    } else {
	      // 当前月日期
	      deviation = '0';
	      if (d.getDate() == dToday && d.getMonth() == mToday && d.getFullYear() == yToday) {
	        if (true == this.options.isTodayValid) {
	          tdClass = 'today';
	        } else {
	          tdClass = 'disabled';
	          deviation = '2';
	        }
	      } else {
	        tdClass = '';
	      }
	      // 让周末不可选不可选
	      if (this.options.weekendDis && (d.getDay() == 6 || d.getDay() == 0)) {
	        tdClass = 'disabled';
	        deviation = '3';
	      }
	      // 让周几不可选
	      if (this.options.disCertainDay && this.options.disCertainDay.length > 0) {
	        for (var p in this.options.disCertainDay) {
	          if (!isNaN(this.options.disCertainDay[p]) && d.getDay() === this.options.disCertainDay[p]) {
	            tdClass = 'disabled';
	            deviation = '4';
	          }
	        }
	      }
	      // 让几号不可选
	      if (this.options.disCertainDate && this.options.disCertainDate.length > 0) {
	        var isDisabled = false;
	
	        for (var p in this.options.disCertainDate) {
	          if (!isNaN(this.options.disCertainDate[p]) || isNaN(parseInt(this.options.disCertainDate[p]))) {
	            if (this.options.disCertainDate[0] === true) {
	              isDisabled = !!(d.getDate() !== this.options.disCertainDate[p]);
	              if (!isDisabled) {
	                break;
	              }
	            } else {
	              isDisabled = !!(d.getDate() === this.options.disCertainDate[p]);
	              if (isDisabled) {
	                break;
	              }
	            }
	          }
	        }
	
	        if (isDisabled) {
	          tdClass = 'disabled';
	          deviation = '4';
	        }
	      }
	    }
	
	    // 如果是周日
	    if (0 == d.getDay()) {
	      tr = document.createElement('tr');
	    }
	
	    td = document.createElement('td');
	    td.innerHTML = d.getDate();
	    if ('' != tdClass) {
	      $(td).attr('class', tdClass);
	    }
	
	    // 只有当前月可以点击
	    if (0 == deviation) {
	      ymd = __method.date2ymd(d);
	      $(td).attr({ 'data-date': ymd, 'id': this.uuid + ymd }).css('cursor', 'pointer');
	    }
	
	    $(tr).append(td);
	
	    // 如果是周六
	    if (6 == d.getDay()) {
	      $(table).append(tr);
	    }
	  }
	
	  return table;
	};
	
	/**
	 * @description 把时间字串转成时间格式
	 * @param {String} str 时间字符串
	 */
	DateTimePikcer.prototype.str2date = function (str) {
	  var ar = str.split('-');
	  // 返回日期格式
	  return new Date(ar[0], ar[1] - 1, ar[2]);
	};
	
	/**
	 * @description 比较两个时间字串的大小:1 大于; 0 等于; -1 小于
	 * @param {String} b 待比较时间串1
	 * @param {String} e 待比较时间串2
	 */
	DateTimePikcer.prototype.compareStrDate = function (b, e) {
	  var bDate = this.str2date(b);
	  var eDate = this.str2date(e);
	
	  // 1 大于; 0 等于; -1 小于
	  if (bDate.getTime() > eDate.getTime()) {
	    return 1;
	  } else if (bDate.getTime() == eDate.getTime()) {
	    return 0;
	  } else {
	    return -1;
	  }
	};
	
	/**
	 * @description 把时间格式转成对象
	 * @param {Date} d 时间
	 */
	DateTimePikcer.prototype.date2ymd = function (d) {
	  return [d.getFullYear(), zeroPad(d.getMonth() + 1), zeroPad(d.getDate())].join('-');
	};
	
	/**
	 * @description 日期格式化，加前导零
	 */
	DateTimePikcer.prototype.formatDate = function (ymd) {
	  return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function (ymdFormatDate, y, m, d) {
	    if (m < 10) {
	      m = '0' + parseInt(m, 10);
	    }
	    if (d < 10) {
	      d = '0' + parseInt(d, 10);
	    }
	    return y + '-' + m + '-' + d;
	  });
	};
	
	DateTimePikcer.DEAFULTS = {
	  period: false, // 是否设置为区间日期
	  defaultText: ' 至 ', // 时间区间拼接字符
	  calendars: 2, // 默认显示两个月
	  dayRangeMax: 366, // 区间最大选择366天
	  isTodayValid: true, // 今天是否可選
	  min: '1970-01-01', // 最小可用时间
	  max: '', // 最大可用时间
	  names: [], // 区间日期必须设置，开始时间和结束时间的name属性
	  stopToday: false, // 今天是否不可选
	  weekendDis: false, // 灰掉周末不可选。
	  disCertainDay: [], // 不可用的周日期设置数组，如：[1,3]是要周一， 周三 两天不可选，每个周的周一，周三都不可选择。
	  disCertainDate: [], // 不可用的日期设置数组，如:[1,3]是要1号，3号
	  // 两天不可选，特别的，[true,1,3]则反之，只有1，3可选，其余不可选。
	  success: $.noop // 完成回调
	};
	
	DateTimePikcer.TEMPLATE = ['<div class="' + __prefix + ' clearfix">', '<div class="' + __prefix + '-header">', '<button type="button" class="' + __prefix + '-btn" data-day="today">今天</button>', '<button type="button" class="' + __prefix + '-btn" data-day="yesterday">2天</button>', '<button type="button" class="' + __prefix + '-btn" data-day="aRecent7Days">7天</button>', '<button type="button" class="' + __prefix + '-btn" data-day="aRecent14Days">14天</button>', '<button type="button" class="' + __prefix + '-btn" data-day="aRecent30Days">30天</button>', '</div>', '<div class="' + __prefix + '-body clearfix">', '</div>', '<div class="' + __prefix + '-footer clearfix">', '<div class="' + __prefix + '-msg">', '<div class="form-smaller">', '<input type="text" class="form-control" data-action="start" readonly />', '<span class="' + __prefix + '-msg-line"> - </span>', '<input type="text" class="form-control" data-action="end" readonly /><br />', '</div>', '</div>', '<div class="' + __prefix + '-btns">', '<button type="button" class="btn primary small-btn" data-action="ok" type="button">确定</button>', '<button type="button" class="btn default small-btn" data-action="cancel" type="button">取消</button>', '</div>', '</div>', '</div>'];
	
	// 获取data-option的配置
	function assign(str) {
	  str = str ? str : '{}';
	  return new Function('return ' + str)();
	}
	
	// 插件代理函数
	function Plugin(option) {
	  // 参数
	  var args = [].slice.call(arguments, 1);
	  return $(this).each(function () {
	    var that = $(this),
	        data = that.data('datetimepicker'),
	        userOption = assign(that.data('option')),
	        config = {};
	    // 尚未初始化
	    if (!data) {
	      config = $.extend({}, userOption, (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option : {});
	      that.data('datetimepicker', data = new DateTimePikcer(that, config));
	    }
	
	    // 调用方法
	    if (typeof option === 'string') data[option].apply(data, args);
	  });
	}
	
	// click 事件代理函数
	function clickHandler(e) {
	  // 调用插件
	  Plugin.call(this, 'show');
	  // 阻止点击 document 隐藏
	  e.stopPropagation();
	}
	
	// jQuery 插件绑定 ----
	$.fn.datetimepicker = Plugin;
	$.fn.datetimepicker.constructor = DateTimePikcer;
	
	// ---- Global USER EVENT HANDLER
	$(function () {
	  // data-toggle="datetimepicker"
	  $(document).on('click.datetimepicker', toggle, clickHandler);
	  // 日历文本 icon
	  $(document).on('click.datetimepicker', '.form-control-date-btn', function (e) {
	    var inputController = $(this).siblings(toggle);
	    if (inputController.length) clickHandler.call(inputController, e);
	  });
	});
	
	module.exports = DateTimePikcer;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 单位数补零
	 * by tommyshao
	 * 2016-07-06
	 */
	
	function zeroPad(number) {
	  return number > 9 ? number : '0' + number;
	}
	
	module.exports = zeroPad;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * 模拟下拉框
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 *
	 * Reference bootstrap.dropdown.js
	 *
	 * API
	 * --------
	 * $(element).on('selected.bp.dropdown', function(e, obj){});
	 */
	
	/**
	* @TODO:
	*  1- 分组模式
	*  2- ajax 请求列表，可过滤
	* 
	*/
	
	var $ = __webpack_require__(2);
	var Util = __webpack_require__(14);
	
	var toggle = '.form-control-dropdown';
	var toggleValue = '[data-toggle="dropdown"]';
	
	// $.ajaxSetup({
	//   //crossDomain: true,
	//   headers: {
	//     "X-Requested-With": "XMLHttpRequest"
	//   }
	// })
	
	/**
	 * 占位符
	 * @param {[type]} el [description]
	 */
	var PlaceHolder = function PlaceHolder(el, label) {
	  this.$el = $(el);
	  var placeholder = this.$el.attr('placeholder');
	  this.$label = $('<label class="form-control-placeholder">' + (placeholder || '请选择') + '</label>');
	  this.$el.before(this.$label);
	};
	
	PlaceHolder.prototype = {
	  toggle: function toggle() {
	    if (!this.$el.length || !this.$label.length) return;
	
	    var isEmpty = $.trim(this.$el.val()) === '';
	
	    isEmpty ? this.show() : this.hide();
	  },
	  show: function show() {
	    this.$label.show();
	  },
	  hide: function hide() {
	    this.$label.hide();
	  }
	
	  /**
	   * 模拟 select
	   * @param {[type]} el     [description]
	   * @param {[type]} option [description]
	   */
	};var Dropdown = function Dropdown(el, option) {
	
	  this.$el = $(el);
	  this.options = $.extend({}, Dropdown.DEFAULTS, option);
	
	  this.$target = this.$el.find(this.options.text);
	  this.$list = this.$el.find(this.options.list);
	  this.$item = this.$list.find(this.options.item);
	  this.$input = this.$el.find(this.options.input);
	
	  // 占位符
	  this.Placeholder = new PlaceHolder(this.$input);
	
	  this.isInput = /input/i.test(this.$target[0].tagName);
	
	  // 多选
	  !!this.options.multiple && this.$el.addClass('multiple');
	
	  // 初始化
	  this.init();
	
	  // 区分是否异步请求列表
	  // if(!!this.options.ajax && typeof this.options.ajax === 'string') {
	  //   this._initAjax()
	  // } else {
	  // 设置默认选中
	  this._setDefaultValue();
	  // }
	};
	
	// 版本
	Dropdown.VERSION = '{{VERSION}}';
	
	// 默认配置
	Dropdown.DEFAULTS = {
	  // 显示框
	  text: '.form-control-dropdown-value,.form-control,.form-control-modal-value',
	  // 表单元素
	  input: '.form-control-dropdown-input',
	  // 占位符
	  placeholder: 'label',
	  // 下拉列表
	  list: '> ul',
	  // 列表项
	  item: 'li',
	  // 多选选项
	  multiSelected: '.form-control-modal-ops',
	  // 是否可以多选
	  multiple: false,
	  // 多选分隔符
	  separator: ',',
	  // 成功回调
	  callback: $.noop,
	  // 是否异步返回列表
	  ajax: false
	
	  /**
	   * 初始化事件
	   * @return
	   */
	};Dropdown.prototype.init = function () {
	
	  // toggle 显示或隐藏
	  this.$el.on('click.bp.dropdown, focus.bp.dropdown', $.proxy(this.toggle, this));
	
	  // 输入框则
	  if (this.isInput) {
	    this.$target.on('keyup.bp.dropdown', Util.throttle(this.filter(this), 150));
	  }
	
	  // 选择项
	  this.$el.on('click.select.bp.dropdown', this.options.item, this.selected(this));
	
	  // 已选多选选项删除
	  this.$el.on('click.remove.bp.dropdown', this.options.multiSelected, this.removeMultiItem(this));
	
	  // 输入框过滤
	  this.$target.on('keydown.bp.dropdown', this.keydown(this));
	};
	
	/**
	 * 初始化 ajax 方式列表
	 * @return 
	 */
	/*Dropdown.prototype._initAjax = function() {
	  this.$ajaxInput = this._renderAjaxTxt()
	  // 输入框则
	  //if(this.isInput) {
	  this.$ajaxInput.on('keyup.bp.dropdown', Util.throttle(this._ajaxfilter(this), 200))
	  //}
	  // 输入框 上下选择
	  this.$ajaxInput.on('keydown.bp.dropdown', this.keydown(this))
	
	  // 首次加载
	  this._ajaxfilter.call(this.$ajaxInput, this)()
	}
	
	Dropdown.prototype._renderAjaxTxt = function() {
	  var $li = $('<li class="disabled"></li>'),
	      $input = $('<input placeholder="请输入..." />')
	
	  $li.append($input).appendTo(this.$list.empty())    
	  return $input;
	}
	
	Dropdown.prototype._ajaxfilter = function(that) {
	  return function(e) {
	      var q = $.trim($(this).val())
	      console.log('q:'+ q)
	      $.get(that.options.ajax, { q: q}).done(that._renderList(that))
	  }
	}
	
	Dropdown.prototype._renderList = function(that) {
	  return function(res) {
	    if(res.status !== 1) return;
	    var template = ''
	    $.each(res.data, function(i, item ) {
	      template += '<li rel="'+ item.value +'">'+ item.text +'</li>'
	    })
	
	    that.$list.splice(1, that.$list.length).remove();
	    that.$list.append(template)
	  }
	}*/
	
	Dropdown.prototype._setDefaultValue = function () {
	  var option = this.$input.val() || this.$target.val();
	  var $items = this.$item;
	
	  // 不为空
	  if (option && $.trim(option) !== '') {
	    option = option.split(this.options.separator);
	
	    // 循环
	    option.forEach(function (value, index) {
	      $items.filter('[title="' + value + '"]').trigger('click');
	    });
	  }
	
	  // placeholder检测
	  this.Placeholder.toggle();
	};
	
	/**
	 * 切换
	 * @return
	 */
	Dropdown.prototype.toggle = function (sw) {
	  var isActived = this.$el.hasClass('active');
	  // 清除所有下拉
	  hideAllDropdown();
	
	  // 内置点击触发
	  if (sw && typeof sw['type'] !== 'undefined') {
	    this.$el.toggleClass('active', !isActived).trigger(!isActived ? 'show.bp.dropdown' : 'hide.bp.dropdown');
	  } else {
	    // 外部调用设置
	    this.$el.toggleClass('active', sw).trigger(sw ? 'show.bp.dropdown' : 'hide.bp.dropdown');
	  }
	
	  this._setPosition();
	  return this;
	};
	
	/**
	 * 过滤
	 * @return
	 */
	Dropdown.prototype.filter = function (that) {
	  return function (e) {
	    var thisValue = $.trim($(this).val());
	
	    // 查找输入内容
	    that.$item.map(function () {
	      var option = $(this).text();
	      if (option.indexOf(thisValue) > -1) {
	        $(this).show();
	      } else {
	        $(this).hide();
	      }
	    });
	  };
	};
	
	/**
	 * 上下左右选择控制
	 * @param  {Object} that 实例对象
	 * @return
	 */
	Dropdown.prototype.keydown = function (that) {
	  return function (e) {
	    e.stopPropagation();
	
	    if (e.which === 27) {
	      // esc
	      hideAllDropdown();
	      return;
	    }
	    if (!/(38|40|27|32|13|46|8)/.test(e.which)) return;
	
	    var $this = $(this),
	        $target = that.$target;
	
	    var currentItem = that.$el.data('currentItem') === undefined ? -1 : that.$el.data('currentItem');
	
	    that.show();
	
	    var $items = that.$item.filter(':visible');
	
	    if (!$items.length) return;
	
	    if (e.which == 13 && $items.filter('.hover').length) {
	      // enter
	      $items.filter('.hover').trigger('click');
	      return;
	    }
	
	    var index = $items.index(e.target) > -1 ? $items.index(e.target) : currentItem;
	
	    if ($this.is('.disabled, :disabled') || $this.is('.optgroup')) {
	      if (e.which == 38 && index >= 0) index = index - 2; // up
	      if (e.which == 40 && index < $items.length) index = index + 2; // down
	      console.log(index);
	    } else {
	      if (e.which == 38 && index >= 0) index--; // up
	      if (e.which == 40 && index < $items.length) index++; // down
	    }
	
	    if (index < 0) index = $items.length - 1;
	    if (index >= $items.length) index = 0;
	
	    scrollTop($items, index);
	
	    that.$el.data('currentItem', index);
	
	    $items.removeClass('hover').eq(index).addClass('hover'); //.trigger('focus')
	  };
	};
	
	/**
	 * 选择
	 * @return
	 */
	Dropdown.prototype.selected = function (that) {
	  return function (e) {
	    e.stopPropagation();
	
	    var $this = $(this);
	
	    // 禁止不可选
	    if ($this.is('.disabled')) {
	      e.preventDefault();
	      return false;
	    }
	
	    // 选中高亮
	    that._highlight($this);
	
	    var title = $.trim($this.attr('title'));
	    var selectVal = $this.html();
	    var selected = $this.hasClass('hover');
	
	    that.setValue(title, selectVal, selected);
	
	    // 多选默认不关闭
	    !that.options.multiple && that.hide();
	
	    var Event = $.Event('selected.bp.dropdown');
	    that.$el.trigger(Event, [$this, title]);
	  };
	};
	
	/**
	 * 选中高亮处理
	 * @param  {Object} el 当前项
	 * @return
	 */
	Dropdown.prototype._highlight = function (el) {
	  if (!this.options.multiple) {
	    // 单选
	    $(el).addClass('hover').siblings().removeClass('hover');
	  } else {
	    $(el).toggleClass('hover');
	  }
	
	  return this;
	};
	
	/**
	 * 选中赋值处理
	 * @param {String} title    当前项的实际值
	 * @param {String} value    当前项的 html内容
	 * @param {Boolean} selected 选中或取消
	 */
	Dropdown.prototype.setValue = function (title, value, selected) {
	  // @todo: selected - false 取消选择
	  if (this.options.multiple) {
	    this.setMultiValue(title, value, selected);
	    return;
	  }
	
	  if (!!this.$input.length) {
	    // 隐藏域存放正确值
	    this.$input.val(title ? title : value);
	  }
	
	  // 过滤制表符
	  value = value ? value.replace(/^(\t|\b|\n)$/, '') : '';
	
	  this.isInput ? this.$target.val(title) : this.$target.html(value);
	
	  this.Placeholder.toggle();
	
	  return this;
	};
	
	/**
	 * 多选设置值
	 * @param {String} title    当前项的实际值
	 * @param {String} value    当前想的 html内容
	 * @param {Boolean} selected 选中或取消
	 */
	Dropdown.prototype.setMultiValue = function (title, value, selected) {
	  if (!this.$input.length) {
	    console.warn('必须添加<input type="hidden" name class="form-control-dropdown-input" />');
	  }
	  // 如果为true,则添加多选项
	  var $item = this.$target.find('div[rel="' + title + '"]');
	  var selectedValue = this.$input.val();
	  var separator = this.options.separator;
	  var arrSelectValue = $.trim(selectedValue) === '' ? [] : selectedValue.split(separator);
	  var index = -1;
	
	  if (selected) {
	    // 选择
	
	    $item = $('<div class="form-control-modal-ops" rel="' + title + '">' + value + '</div>');
	
	    if (arrSelectValue.length > 0) {
	      this.$target.append($item);
	    } else {
	      // 第一个值需清空
	      this.$target.empty().append($item);
	    }
	
	    arrSelectValue.push(title);
	  } else {
	    // 取消
	
	    // 查找是否存在当前项
	    index = $.inArray(title, arrSelectValue);
	
	    // 删除取消的当前项
	    if (index > -1) arrSelectValue.splice(index, 1);
	
	    // 重新赋值
	    //this.$input.val(arrSelectValue.join(separator))
	
	    // 移除已选 dom
	    $item.detach().remove();
	  }
	
	  // 拼接赋值
	  this.$input.val(arrSelectValue.join(separator));
	  this.Placeholder.toggle();
	};
	
	/**
	 * 已选多选项取消
	 * @param  {Object} that 实例对象
	 * @return
	 */
	Dropdown.prototype.removeMultiItem = function (that) {
	  return function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	
	    var option = $(this).attr('rel');
	    var selectedItem = that.$item.filter('[title="' + option + '"]');
	
	    // 去除高亮
	    !!selectedItem.length && that._highlight(selectedItem);
	    // 取消选择
	    that.setValue(option, option, false);
	  };
	};
	
	/**
	 * 收起下拉框
	 * @return
	 */
	Dropdown.prototype.hide = function () {
	  this.toggle(false);
	  return this;
	};
	
	/**
	 * 显示
	 * @return
	 */
	Dropdown.prototype.show = function () {
	  this.toggle(true);
	  return this;
	};
	
	/**
	 * 设置下拉框的位置，
	 * 如果距离页面底部则向上
	 */
	Dropdown.prototype._setPosition = function () {
	  var offset = this.$el.offset(),
	      scrollTop = $(window).scrollTop(),
	      viewHeight = $(window).height(),
	      elHeight = this.$el.outerHeight(),
	      listHeight = this.$list.outerHeight(),
	      style = { top: '0' },
	      placement = false; // 方向，向上为 true
	
	  // 朝上    
	  if (offset.top - scrollTop + elHeight + listHeight > viewHeight) {
	    style.top = -listHeight + 'px';
	    placement = true;
	  } else {
	    style.top = elHeight + 'px';
	    placement = false;
	  }
	
	  this.$list.css(style);
	  this.$el.toggleClass('up', placement);
	
	  return this;
	};
	
	/**
	 * 隐藏所有页面的下拉框
	 * @return
	 */
	function hideAllDropdown() {
	  $(toggle).filter('.active').removeClass('active').data('currentItem', -1).trigger('hide.bp.dropdown');
	}
	
	// 滚动条自动跳到某位置
	// -----------------
	function scrollTop(el, i) {
	  var $parent = el.parent();
	  var top = el.eq(i).position().top;
	  $parent.scrollTop(top);
	}
	
	/**
	 * jQuery Plugin import
	 * @param {Object} option 参数配置
	 */
	function Plugin(option) {
	  var args = [].slice.call(arguments, 1);
	  return $(this).each(function () {
	    var that = $(this),
	        data = that.data('bp.dropdown'),
	        config = {};
	
	    if (!data) {
	      config = $.extend({}, (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option : {}, that.data());
	      that.data('bp.dropdown', data = new Dropdown(that, config));
	      //data.toggle();
	    }
	
	    if (typeof option === 'string' && option !== 'toggle') data[option].apply(data, args);
	  });
	}
	
	// -------
	// jquery API
	$.fn.dropdown = Plugin;
	$.fn.dropdown.constructor = Dropdown;
	
	// -----------
	// Global Bind
	$(function () {
	
	  // 绑定初始化
	  $(toggle).dropdown();
	
	  // Click Event
	  $(document).on('click.bp.dropdown', toggle, function (e) {
	    Plugin.call($(this), 'toggle', true);
	    e.stopPropagation();
	  });
	
	  // Focus Event
	  $(document).on('focus.bp.dropdown', toggleValue, function (e) {
	    var $parent = $(this).parents(toggle);
	    //console.log($(this))
	    !!$parent.length && e.stopPropagation() && Plugin.call($parent, 'toggle', true);
	  });
	
	  // Click Others
	  $(document).on('click.hide.bp.dropdown', hideAllDropdown);
	});

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	
	var Util = {
	  now: function now() {
	    var d = new Date();
	    return d.now ? d.now() : d.getTime();
	  },
	  throttle: function throttle(fn, wait, options) {
	    var context, args, result;
	    var timeout = null;
	
	    var previous = 0;
	    if (!options) options = {};
	
	    var later = function later() {
	      previous = options.leading === false ? 0 : Util.now();
	      timeout = null;
	      result = fn.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	
	    return function () {
	      var now = Util.now();
	      if (!previous && options.leading === false) previous = now;
	
	      var remaining = wait - (now - previous);
	
	      context = this;
	      args = arguments;
	
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = fn.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailling !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	
	      return result;
	    };
	  },
	  debounce: function debounce(fn, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function later() {
	      var last = Util.now() - timestamp;
	
	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	
	        if (!immediate) {
	          result = fn.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = Util.now();
	
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = fn.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  }
	};
	
	module.exports = {
	  throttle: Util.throttle,
	  debounce: Util.debounce
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _Modal2 = __webpack_require__(1);
	
	var _Modal3 = _interopRequireDefault(_Modal2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 模态窗口
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2016-09-22
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ModalLayer = function (_Modal) {
	    _inherits(ModalLayer, _Modal);
	
	    function ModalLayer(el, props) {
	        _classCallCheck(this, ModalLayer);
	
	        return _possibleConstructorReturn(this, (ModalLayer.__proto__ || Object.getPrototypeOf(ModalLayer)).call(this, el, props));
	    }
	
	    return ModalLayer;
	}(_Modal3.default);
	
	exports.default = ModalLayer;
	
	
	ModalLayer.DEFAULTS = {
	    icon: 'info',
	    title: '提示',
	    contentTitle: '',
	    content: '',
	    close: true,
	    size: false,
	    buttons: [{
	        text: '确定',
	        href: false,
	        style: 'btn primary',
	        target: false,
	        callback: _jquery2.default.noop
	    }]
	};
	
	ModalLayer.TEMPLATE = '\n    <div class="result-wrap result-s result-vertical {{status}}">\n      <div class="result-box">\n        <div class="result-icon"></div>\n        <div class="result-content">\n          <div class="result-inner">\n            <h1>\n              {{contentTitle}}\n            </h1>\n            <p class="bp-modallayer-content text-align-center fn-pt-5">\n              {{content}}\n            </p>\n            <div class="bp-modallayer-btns text-align-center fn-pb-40 fn-pt-20">\n              {{buttons}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n';
	
	// 渲染
	ModalLayer.render = function (option) {
	    var element = void 0;
	    element = ModalLayer.TEMPLATE.replace(/{{(\w*)}}/gi, function (match, key) {
	        var value = option[key];
	        return value;
	    });
	
	    return element;
	};
	
	// --------
	// jqurey api
	function Plugin(option) {
	    var that = void 0,
	        opt = void 0,
	        btnHtml = [],
	        btns = option.buttons;
	
	    opt = _jquery2.default.extend({}, ModalLayer.DEFAULTS, option);
	
	    for (var i = 0; i < btns.length; i++) {
	        if (btns[i].href) {
	            btnHtml.push('<a href="' + btns[i].href + '" ' + (btns[i].target ? 'target="' + btns[i].target + '"' : '') + ' class="' + (btns[i].style || 'btn primary') + '" data-index="' + i + '">' + btns[i].text + '</a>');
	        } else {
	            btnHtml.push('<button type="button" class="' + (btns[i].style || 'btn primary w-150') + '" data-index="' + i + '">' + btns[i].text + '</button>');
	        }
	    }
	
	    function callback() {
	        var el = (0, _jquery2.default)(this);
	        (0, _jquery2.default)(this).on('click.btnEvents', '.bp-modallayer-btns .btn', function () {
	            var index = (0, _jquery2.default)(this).data('index'),
	                e = true;
	            // console.log(btns[index]['callbackPointer']);
	            if (btns.length && btns[index] && btns[index]['callback'] && typeof btns[index]['callback'] === 'function') {
	                e = btns[index]['callback'].call(btns[index]['callbackPointer'], (0, _jquery2.default)(this), index) === false ? false : true;
	            }
	
	            e && el.modal('hide');
	        });
	    };
	
	    opt.content = ModalLayer.render({ status: opt.icon ? 'result-' + opt.icon : '', title: opt.title, contentTitle: option.contentTitle || '', content: option.content || '', buttons: btnHtml.join('') });
	    opt.callback = callback;
	
	    that = (0, _jquery2.default)(this).modal({ title: opt.title, content: opt.content, callback: opt.callback, size: opt.size, isHideRemove: opt.isHideRemove });
	}
	
	_jquery2.default.fn.modalLayer = Plugin;
	_jquery2.default.fn.modalLayer.constructor = ModalLayer;
	
	_jquery2.default.successModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-successModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'success',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'], //2017-12-6 new custom contentTitle
	        content: config['content'],
	        buttons: [{
	            style: 'btn secondary w-150 ' + config['buttonClassName'], //2017-12-6 custom style
	            text: config['okText'], //2017-12-6 custom lable
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.confirmModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-confirmModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'info',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'] || '',
	        buttons: [{
	            text: '确定',
	            callback: config['callback']
	            // ,
	            // {
	            //   href: 'javascript:void(0);',
	            //   text: '取消',
	            //   style: 'btn links block-btn w-100'
	            // }
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.alertModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-alertModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'info',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'],
	        buttons: [{
	            text: '确定',
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.errorModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-infoModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'fail',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'],
	        buttons: [{
	            text: '确定',
	            style: 'btn thirdly w-150',
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * iframe模态窗口
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-23
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _Modal = __webpack_require__(1);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IframeModal = function () {
	    function IframeModal(el, props, next) {
	        _classCallCheck(this, IframeModal);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = props;
	        this.next = next;
	        this.dialog = this.get(el);
	
	        this.showModal(props);
	    }
	
	    _createClass(IframeModal, [{
	        key: 'showModal',
	        value: function showModal(opt) {
	            var that = this;
	            opt.show = false;
	            opt.content = '';
	
	            opt.callback = function () {
	                that.dialog = (0, _jquery2.default)(this);
	                that.$dom = (0, _jquery2.default)(this);
	
	                if (opt && opt['url']) {
	                    that.originalUrl = opt.url;
	                    that.init();
	
	                    typeof that.next === 'function' && that.next.call(that, that.$dom);
	                }
	            };
	
	            that.dialog.modal(opt);
	        }
	    }, {
	        key: 'init',
	        value: function init(url) {
	            var $body = this.$dom.find('.modal-body');
	            this.$title = this.$dom.find('.modal-title');
	            this.$iframe = (0, _jquery2.default)('<iframe />');
	
	            // cache
	            url = this.getUrl(url);
	
	            this.$iframe.attr({
	                src: url || this.originalUrl,
	                width: this.props.width || '100%',
	                height: this.props.height || '100%',
	                allowtransparency: 'yes',
	                frameborder: 'no',
	                scrolling: 'no'
	            }).on('load', _jquery2.default.proxy(this.adjustHeight, this));
	
	            $body.empty().append(this.$iframe);
	        }
	    }, {
	        key: 'setProp',
	        value: function setProp(config) {
	            if (config['title']) this.$title.html(config['title']);
	            if (config['url']) this.$iframe[0].src = config['url'];
	        }
	    }, {
	        key: 'getUrl',
	        value: function getUrl(url) {
	            // cache
	            if (!this.props.cache) {
	                url = url ? url : this.originalUrl;
	                url = url.indexOf('?') > -1 ? url + '&t=' + new Date() * 1 : url + '?t=' + new Date() * 1;
	            }
	
	            return url;
	        }
	    }, {
	        key: 'setUrl',
	        value: function setUrl(url) {
	            url = this.getUrl(url);
	            this.$iframe.attr({ src: url });
	        }
	    }, {
	        key: 'adjustHeight',
	        value: function adjustHeight() {
	            var test, h;
	
	            this.$iframe.css({ height: '0px' });
	
	            try {
	                test = this.$iframe[0].contentWindow.frameElement;
	            } catch (e) {}
	
	            if (test) {
	                h = this.$iframe.contents().height();
	                this.$iframe.css({ height: h + 'px' });
	            }
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            if (!this.props.cache) this.setUrl();
	            this.dialog.modal('show');
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.dialog.modal('hide');
	        }
	    }, {
	        key: 'get',
	        value: function get(id) {
	            if (id && id.frameElement) {
	                var iframe = id.frameElement;
	                var api;
	                var modalList = (0, _jquery2.default)('.modal-background', id.parent.document);
	
	                modalList.each(function (i, item) {
	                    var ifr = (0, _jquery2.default)(item).find('iframe');
	                    if (ifr[0] === iframe) api = (0, _jquery2.default)(item);
	                });
	
	                return api;
	            } else {
	                return (0, _jquery2.default)(id);
	            }
	        }
	    }]);
	
	    return IframeModal;
	}();
	
	exports.default = IframeModal;
	
	
	IframeModal.get = IframeModal.prototype.get;
	
	IframeModal.close = function (id) {
	    var dialog = IframeModal.get(id);
	    (0, _jquery2.default)(dialog).find('.modal-close').trigger('click');
	    (0, _jquery2.default)(dialog).remove();
	};
	
	IframeModal.adjustHeight = function (id) {
	    var dialog = IframeModal.get(id);
	    var $iframe = (0, _jquery2.default)(dialog).find('iframe');
	    var test, h;
	
	    try {
	        // 跨域测试
	        test = $iframe[0].contentWindow.frameElement;
	    } catch (e) {}
	
	    if (test) {
	        h = $iframe.contents().height();
	        $iframe.css({ height: h + 'px' });
	    }
	};
	
	IframeModal.DEFAULTS = {
	    width: '100%',
	    height: '100%',
	    url: '',
	    cache: true
	};
	
	_jquery2.default.fn.iframeModal = function (opt) {
	    var that = (0, _jquery2.default)(this);
	    var selector = (0, _jquery2.default)(this).selector;
	    opt = _jquery2.default.extend({}, IframeModal.DEFAULTS, opt);
	
	    if ((this[0] === window || this[0] === parent) && opt == 'hide') {
	        IframeModal.close(window);
	        return;
	    }
	
	    if (this[0] === window && opt == 'adjustHeight') {
	        IframeModal.adjustHeight(window);
	        return;
	    }
	
	    var data = that.data('bp.iframeModal');
	
	    if (!data) {
	        data = new IframeModal(selector, opt, function (obj) {
	            (0, _jquery2.default)(obj).data('bp.iframeModal', this);
	        });
	    } else {
	        if (opt && opt['url'] && opt['reset']) {
	            data && data.setUrl(opt.url) && data.show();
	        } else {
	            if (_jquery2.default.isPlainObject(opt)) {
	                data.setProp(opt);
	            }
	            data && data.show();
	        }
	    }
	
	    // 调用关闭方法
	    if (typeof opt === 'string') {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        data[opt] && data[opt](args);
	    }
	};
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('click', '[data-toggle="iframeModal"]', function (e) {
	        e.preventDefault();
	        var title = (0, _jquery2.default)(this).attr('data-title') || '提示';
	        var url = (0, _jquery2.default)(this).attr('data-url');
	
	        url && title && (0, _jquery2.default)('#iframe-modal').iframeModal({
	            title: title,
	            url: url
	        });
	    });
	});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 分页组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <jinhong.shao@frontpay.cn>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-19
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Reference uikit.pagination.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * API:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).pagination({ onSelectPage: function(index, instance){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      $(element).on('bp.select.pagination', function(e, index, instance){
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 console.log(index)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              })
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             $(element).pagination({ onSelectPage: function(index, instance){});
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             $(element).pagination('selectPage', 2, 100);
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '.paginations,[data-toggle="pagination"]';
	var pageStr = '<p class="p-add-ons fn-mr-15">{$items}&nbsp;条记录，共&nbsp;{$totalPages}&nbsp;页</p>';
	
	var Pagination = function () {
	    function Pagination(el, props) {
	        _classCallCheck(this, Pagination);
	
	        this.el = (0, _jquery2.default)(el);
	        this.__init(props);
	    }
	
	    // 初始化
	
	
	    _createClass(Pagination, [{
	        key: '__init',
	        value: function __init(props, inited) {
	            this.__setProps(props);
	            var _props = this.props,
	                itemsOnPage = _props.itemsOnPage,
	                items = _props.items,
	                currentPage = _props.currentPage,
	                totalPages = _props.totalPages,
	                visiblePages = _props.visiblePages;
	
	            // 总页数读取配置参数
	            // 若未配置则 totalPages = items / itemsOnPage
	
	            this.totalPages = !!totalPages && !items ? totalPages : Math.ceil(items / itemsOnPage) ? Math.ceil(items / itemsOnPage) : 1;
	
	            this.items = !!items ? items : this.totalPages * itemsOnPage;
	
	            this.currentPage = currentPage - 1;
	
	            this.halfVisible = visiblePages / 2;
	
	            this.__render();
	            !inited && this.__initEvent();
	
	            // 初始化时触发
	            this.go(currentPage);
	        }
	
	        // 设置配置参数
	
	    }, {
	        key: '__setProps',
	        value: function __setProps(props) {
	            this.props = _jquery2.default.extend({}, Pagination.DEFAULTS, props);
	        }
	
	        // 初始化事件
	
	    }, {
	        key: '__initEvent',
	        value: function __initEvent() {
	            var _this = this;
	
	            this.el.on('click.bp.pagination', 'a[data-page]', function (e) {
	                e.preventDefault();
	                _this.selectPage((0, _jquery2.default)(e.target).data('page'));
	            });
	        }
	
	        // 获取显示页面区间
	
	    }, {
	        key: '__getInterval',
	        value: function __getInterval() {
	            return {
	                start: Math.ceil(this.currentPage > this.halfVisible ? Math.max(Math.min(this.currentPage - this.halfVisible, this.totalPages - this.props.visiblePages), 0) : 0),
	                end: Math.ceil(this.currentPage > this.halfVisible ? Math.min(this.currentPage + this.halfVisible, this.totalPages) : Math.min(this.props.visiblePages, this.totalPages))
	            };
	        }
	
	        // 增加页面函数
	        // pageIndex 页码
	        // opt 页面文本配置
	        // islb 是否功能键，不需加 active
	
	    }, {
	        key: '__append',
	        value: function __append(pageIndex, opts, islb) {
	            var item = void 0,
	                options = void 0,
	                cls = void 0;
	
	            // 判断首页，末页，常规页
	            pageIndex = pageIndex < 0 ? 0 : pageIndex < this.totalPages ? pageIndex : this.totalPages - 1;
	            options = _jquery2.default.extend({ text: pageIndex + 1 }, opts);
	
	            // 判断当前页
	            cls = islb ? '' : 'class="active"';
	            item = pageIndex === this.currentPage ? '<li ' + cls + '><span>' + options.text + '</span></li>' : _jquery2.default.inArray(pageIndex + 1, this.props.disabledPages) > -1 ? '<li class="disabled"><span>' + options.text + '</span></li>' : '<li><a href="#page-' + (pageIndex + 1) + '" data-page="' + (pageIndex + 1) + '">' + options.text + '</a></li>';
	
	            this.el.append(item);
	        }
	
	        // 渲染
	
	    }, {
	        key: '__render',
	        value: function __render() {
	            var props = this.props;
	            var interval = this.__getInterval();
	            var i = 0;
	
	            this.el.empty();
	            //if(this.totalPages <= 1) return;
	
	            // 首页
	            if (props.first) this.__append(0, { text: props.first }, true);
	
	            // 上一页
	            if (props.prev && this.currentPage - 1 >= 0) this.__append(this.currentPage - 1, { text: props.prev }, true);
	
	            // 左边边缘页码
	            if (interval.start >= 0 && props.edges > 0) {
	                var end = Math.min(props.edges, interval.start);
	
	                for (var _i = 0; _i < end; _i++) {
	                    this.__append(_i);
	                } // 显示左边边缘页码
	                if (props.edges < interval.start && interval.start - props.edges != 1) {
	                    this.el.append('<li><span>...</span><li>');
	                } else if (interval.start - props.edges === 1) {
	                    this.__append(props.edges);
	                }
	            }
	
	            for (i = interval.start; i < interval.end; i++) {
	                this.__append(i);
	            }if (interval.end < this.totalPages && props.edges > 0) {
	                if (this.totalPages - props.edges > interval.end && this.totalPages - props.edges - interval.end !== 1) {
	                    this.el.append('<li><span>...</span></li>');
	                } else if (this.totalPages - props.edges - interval.end === 1) {
	                    this.__append(interval.end++);
	                }
	                // 从右边边缘页码
	                var begin = Math.max(this.totalPages - props.edges, interval.end);
	                for (i = begin; i < this.totalPages; i++) {
	                    this.__append(i);
	                }
	            }
	
	            // 下一页
	            if (props.next && this.currentPage < this.totalPages - 1) this.__append(this.currentPage + 1, { text: props.next }, true);
	            // 末页
	            if (props.last) this.__append(this.totalPages, { text: props.last }, true);
	
	            // 显示页面字符
	            this.__renderPageStr();
	        }
	
	        // 选择切换页码
	
	    }, {
	        key: 'selectPage',
	        value: function selectPage(pageIndex, pages) {
	            this.currentPage = pageIndex - 1;
	
	            // 重新渲染
	            this.render(pages);
	
	            // 触发回调
	            this.props.onSelectPage(pageIndex, this);
	
	            // 触发data-API
	            this.el.trigger('select.bp.pagination', [pageIndex, this]);
	        }
	
	        // 渲染接口
	
	    }, {
	        key: 'render',
	        value: function render(pages) {
	            this.totalPages = pages ? pages : this.totalPages;
	            this.__render();
	        }
	
	        // 页面跳转
	
	    }, {
	        key: 'go',
	        value: function go(page) {
	            this.selectPage(page);
	        }
	
	        // 显示总页码信息
	
	    }, {
	        key: '__renderPageStr',
	        value: function __renderPageStr() {
	            var _this2 = this;
	
	            if (this.props.pageStr && this.props.pageStr.show) {
	                var pageStrEl = this.el.prevAll();
	                var template = this.props.pageStr.template || pageStr;
	
	                template = template.replace(/{\$(\w*)}/gi, function (matches, key, index) {
	                    return _this2[key] ? _this2[key] : 0;
	                });
	
	                pageStrEl.length && pageStrEl.empty().remove();
	
	                this.el.before((0, _jquery2.default)(template));
	            }
	        }
	
	        // 销毁
	
	    }, {
	        key: 'destory',
	        value: function destory(force) {
	            this.el.empty();
	            this.el.removeData('bp.pagination');
	            return this;
	        }
	
	        // 重新设置
	
	    }, {
	        key: 'reset',
	        value: function reset(option) {
	            option = _jquery2.default.extend({}, this.props, option);
	            this.destory().__init(option, true);
	
	            if (!this.el.data('bp.pagination')) this.el.data('bp.pagination', this);
	        }
	    }]);
	
	    return Pagination;
	}();
	
	// --------
	// 默认配置
	
	
	exports.default = Pagination;
	var DEFAULTS = {
	    // 总记录数
	    items: 0,
	    // 每页记录数
	    itemsOnPage: 5,
	    // 总页数
	    totalPages: 0,
	    // 显示区间长度
	    visiblePages: 5,
	    // 末尾页码长度
	    edges: 1,
	    // 当前页码
	    currentPage: 1,
	    // 分页总码数字符
	    //    show - 是否显示
	    //    template 字符模板
	    pageStr: {
	        show: false,
	        template: ''
	    },
	    // 不可用页码
	    disabledPages: [],
	    prev: '&lsaquo;',
	    next: '&rsaquo;',
	    first: '&laquo;',
	    last: '&raquo;',
	    onSelectPage: _jquery2.default.noop
	};
	Pagination.DEFAULTS = DEFAULTS;
	
	// 插件定义
	//======================
	function Plugin(options) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    // jquery 链式
	    return (0, _jquery2.default)(this).each(function () {
	        var $this = (0, _jquery2.default)(this);
	        if ($this.hasClass('no-js')) return;
	        var data = $this.data('bp.pagination');
	        // 创建一个新实例
	        if (!data) $this.data('bp.pagination', data = new Pagination($this, _jquery2.default.extend({}, $this.data(), options)));
	        if (typeof options == 'string') {
	            // 调用接口方法,第二个参数为方法传入参数
	            data[options].apply(data, args);
	        }
	    });
	}
	
	// jQuery 插件扩展
	_jquery2.default.fn.pagination = Plugin;
	_jquery2.default.fn.pagination.Constructor = Pagination;
	
	// 元素插件绑定
	// ====================
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(toggle).pagination();
	});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * placeholder 占位符兼容性处理
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-20
	 *
	 * API:
	 * ------
	 * $(element).placeholder();
	 */
	
	var $ = __webpack_require__(2);
	
	var input = document.createElement('input');
	var isSupport = 'placeholder' in input;
	
	// 构造函数
	// ===============
	var Placeholder = function Placeholder(element) {
	    var $this = this;
	    $this.$el = $(element);
	    this.init();
	};
	
	Placeholder.VERSION = '{{VERSION}}';
	
	Placeholder.prototype.init = function () {
	    if (isSupport) return;
	    var $this = this;
	    this.$placeholder = $this.$el.data('placeholder');
	    if (!isSupport && !this.$placeholder) {
	        var text = $this.$el.attr('placeholder');
	        $this.$placeholder = $('<label class="form-control-placeholder" />').html(text);
	        $this.$el.data('placeholder', $this.$placeholder).before($this.$placeholder);
	    }
	
	    $this.$el.on('focus', $.proxy(this.focus, this));
	    $this.$el.on('blur', $.proxy(this.blur, this));
	    $this.$placeholder.on('click', $.proxy(this.focus, this));
	
	    // 默认隐藏placeholder
	    this.blur();
	};
	
	Placeholder.prototype.focus = function () {
	    this.$placeholder.hide();
	};
	
	Placeholder.prototype.blur = function () {
	    this.$placeholder[this.$el.val() === '' ? 'show' : 'hide']();
	};
	
	// 插件定义
	//======================
	function Plugin() {
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.placeholder');
	        if (!data) $this.data('bp.placeholder', data = new Placeholder(this));
	    });
	}
	
	// jQuery 插件扩展
	$.fn.placeholder = Plugin;
	$.fn.placeholder.Constructor = Placeholder;
	
	// 元素插件绑定
	// ====================
	$(function () {
	    $('input[placeholder]').placeholder();
	});
	
	module.exports = Placeholder;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	    // ----------
	    // jQuery api
	};function Plugin(option) {
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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 平滑滚动
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-25
	 *
	 * Reference uikit.smoothscroll.js
	 *
	 * API
	 * --------
	 * $(element).smoothScroll();
	 */
	
	var $ = __webpack_require__(2);
	
	if (!$.easing.easeOutExpo) $.easing.easeOutExpo = function (x, t, b, c, d) {
	    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	};
	
	// 构造函数
	// ---------
	var SmoothScroll = function SmoothScroll(element, options) {
	    this.$el = $(element);
	    this.options = options;
	
	    this.$targetElement = $("body");
	    if (!!$(this.$el[0].hash).length) this.$targetElement = $(this.$el[0].hash);
	    if (!!$(this.$el.attr('data-target')).length) this.$targetElement = $(this.$el.attr('data-target'));
	
	    this.init();
	};
	
	SmoothScroll.VERSION = '{{VERSION}}';
	
	/**
	 * 默认配置参数
	 * @param duration 动画时间
	 * @param transition 动画类型
	 * @param offset 距离目标位置
	 * @param complete 到达位置时完成执行
	 * @type {{duration: number, transition: string, offset: number, complete: (*|number|noop|Function)}}
	 */
	SmoothScroll.DEFAULTS = {
	    duration: 500,
	    transition: 'easeOutExpo',
	    offset: 0,
	    complete: $.noop
	};
	
	/**
	 * init 初始化
	 */
	SmoothScroll.prototype.init = function () {
	    this.$el.on('click.ui.smoothScroll', this.scroll(this.$el, this.$targetElement, this.options));
	};
	
	/**
	 * 滚条
	 * @param options
	 * @returns {Function}
	 */
	SmoothScroll.prototype.scroll = function (elem, targetElement, options) {
	    return function (e) {
	        e.preventDefault();
	        scrollToElement(elem, targetElement, options);
	    };
	};
	
	/**
	 * 完成触发
	 */
	function emit(elem) {
	    return function () {
	        var e = $.Event('done.ui.smoothscroll', { relatedTarget: elem });
	        elem.trigger(e);
	    };
	};
	
	/**
	 * 滚动条跳转到某元素
	 * @param elem 目的元素
	 * @param options 配置参数
	 */
	function scrollToElement(elem, targetElement, options) {
	    options = $.extend({}, SmoothScroll.DEFAULTS, options);
	
	    var target = targetElement.offset().top - options.offset,
	        docH = $(document).height(),
	        winH = $(window).height();
	
	    if (target + winH > docH) {
	        target = docH - winH;
	    }
	
	    $('html,body').stop().animate({ scrollTop: target }, options.duration, options.transition).promise().done([options.complete, emit(elem)]);
	}
	
	/**
	 * 外部调用接口
	 * @param  {[type]} targetElement [description]
	 * @param  {[type]} options       [description]
	 * @return {[type]}               [description]
	 */
	SmoothScroll.prototype.scrollTo = function (options) {
	    scrollToElement(this.$el, this.$targetElement, options || {});
	};
	
	// 插件定义
	// ---------
	function Plugin(options, otherOptions) {
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.smoothScroll');
	        if (!data) {
	            $this.data('bp.smoothScroll', new SmoothScroll(this, $.extend({}, $this.data(), options)));
	        } else if (options === 'scrollTo') {
	            data.scrollTo(otherOptions);
	        } else {
	            $this.trigger('click.bp.smoothScroll');
	        }
	    });
	}
	
	// jQuery 插件扩展
	$.fn.smoothScroll = Plugin;
	$.fn.smoothScroll.Constructor = SmoothScroll;
	
	$(function () {
	    $('[data-toggle="smooth-scroll"]').smoothScroll();
	});
	
	module.exports = SmoothScroll;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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
	                this.parentEl.append('<button class="btn default">\u67E5\u770B\u66F4\u591A<button>');
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
	
	    // ----------
	    // jQuery API
	};function Plugin(option) {
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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Switch 开关
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2016-09-21
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _ModalLayer = __webpack_require__(23);
	
	var _ModalLayer2 = _interopRequireDefault(_ModalLayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toggle = '.switch,[data-toggle="switch"]';
	
	var Switch = function () {
	    function Switch(el, props) {
	        _classCallCheck(this, Switch);
	
	        this.el = (0, _jquery2.default)(el);
	        this.props = props;
	
	        // 配置props
	        // {
	        //   type : 'toggle',
	        //   docClick : true,
	        //   isSecondCheck : true,
	        //   secondCheckOption : {   //  isSecondCheck为true时必传
	        //     title : '传参提示',   //  弹窗标题
	        //     getContent : function(isChecked){   //  弹窗提示语，需要return一个字符串，isChecked为当前是否激活状态(布尔值)
	        //       var content = '当前状态为' + (isChecked ? '激活' : '未激活');
	        //       return content;
	        //     },
	        //     secondCheckCallBack : function(el,isChecked){ 
	        //       // 回调，点击确定后跑逻辑
	        //       console.log(el,isChecked);  // 随便打印
	        //     }
	        //   }
	        // }
	
	        this.isChecked = this.el.hasClass('checked');
	
	        if (!props.docClick) this.el.on('click', _jquery2.default.proxy(this.toggle, this));
	    }
	
	    _createClass(Switch, [{
	        key: 'toggle',
	        value: function toggle(e) {
	            e && e.preventDefault() && e.stopPropagation();
	            // 禁止状态
	            if (this.el.hasClass('disabled')) return;
	
	            if (this.props.isSecondCheck) {
	                //  弹窗二次确认
	                _jquery2.default.confirmModalLayer({
	                    title: this.props.secondCheckOption.title || '提示',
	                    content: _jquery2.default.proxy(this._getConfirmContent, this)(),
	                    callback: _jquery2.default.proxy(this._confirmModalLayerCallBack, this),
	                    isHideRemove: true
	                });
	            } else {
	                this._toggleClass();
	            }
	        }
	    }, {
	        key: '_getConfirmContent',
	        value: function _getConfirmContent() {
	            var content = this.props.secondCheckOption.getContent(this.isChecked);
	
	            return content;
	        }
	    }, {
	        key: '_confirmModalLayerCallBack',
	        value: function _confirmModalLayerCallBack() {
	            this.props.secondCheckOption.secondCheckCallBack(this.el, this.isChecked);
	            this._toggleClass();
	        }
	    }, {
	        key: '_toggleClass',
	        value: function _toggleClass() {
	            this.el.toggleClass('checked', !this.isChecked).trigger('checked.bp.switch', !this.isChecked);
	            //  控件状态同步
	            this.isChecked = !this.isChecked;
	        }
	    }]);
	
	    return Switch;
	}();
	
	// ----------
	// jQuery api
	
	
	function Plugin(option) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }
	
	    return (0, _jquery2.default)(this).each(function () {
	        var _data;
	
	        var that = (0, _jquery2.default)(this),
	            data = that.data('bp.switch');
	
	        if (!data) that.data('bp.switch', data = new Switch(that, option));
	        if (option.type && typeof option.type === 'string') typeof data[option.type] === 'function' && (_data = data)[option.type].apply(_data, args);
	    });
	}
	
	_jquery2.default.fn.switch = Plugin;
	_jquery2.default.fn.switch.constructor = Switch;
	
	//  开放参数供外部调用，不用自动激活
	// $(function() {
	//     $(document).on('click.switch', toggle, function() {
	//         $(this).switch('toggle')
	//     })
	// })

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _Modal2 = __webpack_require__(1);
	
	var _Modal3 = _interopRequireDefault(_Modal2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 模态窗口
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * by tommyshao <tomieric@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2016-09-22
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ModalLayer = function (_Modal) {
	    _inherits(ModalLayer, _Modal);
	
	    function ModalLayer(el, props) {
	        _classCallCheck(this, ModalLayer);
	
	        return _possibleConstructorReturn(this, (ModalLayer.__proto__ || Object.getPrototypeOf(ModalLayer)).call(this, el, props));
	    }
	
	    return ModalLayer;
	}(_Modal3.default);
	
	exports.default = ModalLayer;
	
	
	ModalLayer.DEFAULTS = {
	    icon: 'info',
	    title: '提示',
	    contentTitle: '',
	    content: '',
	    close: true,
	    size: false,
	    buttons: [{
	        text: '确定',
	        href: false,
	        style: 'btn primary',
	        target: false,
	        callback: _jquery2.default.noop
	    }]
	};
	
	ModalLayer.TEMPLATE = '\n    <div class="result-wrap result-s result-vertical {{status}}">\n      <div class="result-box">\n        <div class="result-icon"></div>\n        <div class="result-content">\n          <div class="result-inner">\n            <h1>\n              {{contentTitle}}\n            </h1>\n            <p class="bp-modallayer-content text-align-center fn-pt-5">\n              {{content}}\n            </p>\n            <div class="bp-modallayer-btns text-align-center fn-pb-40 fn-pt-20">\n              {{buttons}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n';
	
	// 渲染
	ModalLayer.render = function (option) {
	    var element = void 0;
	    element = ModalLayer.TEMPLATE.replace(/{{(\w*)}}/gi, function (match, key) {
	        var value = option[key];
	        return value;
	    });
	
	    return element;
	};
	
	// --------
	// jqurey api
	function Plugin(option) {
	    var that = void 0,
	        opt = void 0,
	        btnHtml = [],
	        btns = option.buttons;
	
	    opt = _jquery2.default.extend({}, ModalLayer.DEFAULTS, option);
	
	    for (var i = 0; i < btns.length; i++) {
	        if (btns[i].href) {
	            btnHtml.push('<a href="' + btns[i].href + '" ' + (btns[i].target ? 'target="' + btns[i].target + '"' : '') + ' class="' + (btns[i].style || 'btn primary') + '" data-index="' + i + '">' + btns[i].text + '</a>');
	        } else {
	            btnHtml.push('<button type="button" class="' + (btns[i].style || 'btn primary w-150') + '" data-index="' + i + '">' + btns[i].text + '</button>');
	        }
	    }
	
	    function callback() {
	        var el = (0, _jquery2.default)(this);
	        (0, _jquery2.default)(this).on('click.btnEvents', '.bp-modallayer-btns .btn', function () {
	            var index = (0, _jquery2.default)(this).data('index'),
	                e = true;
	            // console.log(btns[index]['callbackPointer']);
	            if (btns.length && btns[index] && btns[index]['callback'] && typeof btns[index]['callback'] === 'function') {
	                e = btns[index]['callback'].call(btns[index]['callbackPointer'], (0, _jquery2.default)(this), index) === false ? false : true;
	            }
	
	            e && el.modal('hide');
	        });
	    };
	
	    opt.content = ModalLayer.render({ status: opt.icon ? 'result-' + opt.icon : '', title: opt.title, contentTitle: option.contentTitle || '', content: option.content || '', buttons: btnHtml.join('') });
	    opt.callback = callback;
	
	    that = (0, _jquery2.default)(this).modal({ title: opt.title, content: opt.content, callback: opt.callback, size: opt.size, isHideRemove: opt.isHideRemove });
	}
	
	_jquery2.default.fn.modalLayer = Plugin;
	_jquery2.default.fn.modalLayer.constructor = ModalLayer;
	
	_jquery2.default.successModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-successModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'success',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'], //2017-12-6 new custom contentTitle
	        content: config['content'],
	        buttons: [{
	            style: 'btn secondary w-150 ' + config['buttonClassName'], //2017-12-6 custom style
	            text: config['okText'], //2017-12-6 custom lable
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.confirmModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-confirmModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'info',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'] || '',
	        buttons: [{
	            text: '确定',
	            callback: config['callback']
	            // ,
	            // {
	            //   href: 'javascript:void(0);',
	            //   text: '取消',
	            //   style: 'btn links block-btn w-100'
	            // }
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.alertModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-alertModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'info',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'],
	        buttons: [{
	            text: '确定',
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.errorModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-infoModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'fail',
	        size: config['size'],
	        title: config['title'],
	        contentTitle: config['contentTitle'],
	        content: config['content'],
	        buttons: [{
	            text: '确定',
	            style: 'btn thirdly w-150',
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 25 */
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
/* 26 */
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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * tooltips提示
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-19
	 *
	 * Reference uikit.tooltips.js
	 *
	 * API:
	 * ------
	 * $(element).tooltips(option);
	 */
	
	var $ = __webpack_require__(2);
	
	var toggle = '[data-toggle="tooltips"]';
	
	// 构造函数
	// ---------
	var Tooltips = function Tooltips(el, option) {
	    this.$el = $(el);
	    this.options = $.extend({}, Tooltips.DEFAULTS, this.$el.data(), option);
	    this.$tooltip = null;
	    this.content = '';
	    this.tooltipdelay = null;
	    this.checkdelay = null;
	    this.init();
	};
	
	Tooltips.VERSION = '{{VERSION}}';
	
	// 动画过渡时间
	Tooltips.TRANSITION_DURATION = 150;
	
	Tooltips.DEFAULTS = {
	    "offset": 9,
	    "pos": "top",
	    "animation": true,
	    "delay": 0,
	    "cls": "",
	    "active": "active",
	    "url": "",
	    "content": function content(elem, title) {
	        title = elem.attr('title');
	        if (title) {
	            elem.data('cached-title', title).removeAttr('title');
	        }
	        return elem.data('cached-title');
	    }
	};
	
	// Public Method
	// --------------
	Tooltips.prototype.init = function () {
	    var $this = this;
	
	    if (!$this.$tooltip) {
	        $this.$tooltip = $('<div class="tooltips"><div class="tooltips-inner"></div><span class="tips-arrow-border"></span><span class="tips-arrow"></span></div>').appendTo('body');
	    }
	
	    $this.$el.on({
	        focus: function focus() {
	            $this.show();
	        },
	        blur: function blur() {
	            $this.hide();
	        },
	        mouseenter: function mouseenter() {
	            $this.show();
	        },
	        mouseleave: function mouseleave() {
	            $this.hide();
	        }
	    });
	};
	
	Tooltips.prototype.__getPosition = function () {
	    var $this = this,
	        pos = $.extend({}, this.$el.offset(), { width: this.$el[0].offsetWidth, height: this.$el[0].offsetHeight }),
	        width = this.$tooltip[0].offsetWidth,
	        height = this.$tooltip[0].offsetHeight,
	        offset = typeof this.options.offset === "function" ? this.options.offset.call(this.$el) : this.options.offset,
	        position = typeof this.options.pos === "function" ? this.options.pos.call(this.$el) : this.options.pos,
	        tmppos = position.split('-'),
	        tcss = {
	        "display": "none",
	        "visibility": "visible",
	        "top": pos.top + pos.height + height,
	        "left": pos.left
	    };
	
	    var variants = {
	        "bottom": { top: pos.top + pos.height + offset, left: pos.left + pos.width / 2 - width / 2 },
	        "top": { top: pos.top - height - offset, left: pos.left + pos.width / 2 - width / 2 },
	        "left": { top: pos.top + pos.height / 2 - height / 2, left: pos.left - width - offset },
	        "right": { top: pos.top + pos.height / 2 - height / 2, left: pos.left + pos.width + offset }
	    };
	
	    $.extend(tcss, variants[tmppos[0]]);
	
	    if (tmppos.length == 2) tcss.left = tmppos[1] == "left" ? pos.left : pos.left + pos.width - width;
	
	    var boundary = this.checkBoundary(tcss.left, tcss.top, width, height);
	
	    if (boundary) {
	        switch (boundary) {
	            case "x":
	
	                if (tmppos.length == 2) {
	                    position = tmppos[0] + '-' + (tcss.left < 0 ? 'left' : 'right');
	                } else {
	                    position = tcss.left < 0 ? 'right' : 'left';
	                }
	
	                break;
	            case "y":
	
	                if (tmppos.length == 2) {
	                    position = (tcss.top < 0 ? "bottom" : "top") + "-" + tmppos[1];
	                } else {
	                    position = tcss.top < 0 ? "bottom" : "top";
	                }
	
	                break;
	
	            case "xy":
	
	                if (tmppos.length == 2) {
	                    position = (tcss.top < 0 ? "bottom" : "top") + "-" + (tcss.left < 0 ? "left" : "right");
	                } else {
	                    position = tcss.left < 0 ? "right" : "left";
	                }
	
	                break;
	        }
	
	        tmppos = position.split('-');
	
	        $.extend(tcss, variants[tmppos[0]]);
	
	        if (tmppos.length == 2) tcss.left = tmppos[1] == "left" ? pos.left : pos.left + pos.width - width;
	    }
	
	    tcss.left -= $("body").position().left;
	
	    return [tcss, position];
	};
	
	Tooltips.prototype.__setPosition = function () {
	    var myPosition = this.__getPosition();
	    this.$tooltip.css(myPosition[0]).attr("class", ['tooltips', 'tooltips-' + myPosition[1], this.options.cls].join(' '));
	
	    if (this.options.animation) {
	        this.$tooltip.css({
	            opacity: 0,
	            display: "block"
	        }).addClass(this.options.active).animate({ opacity: 1 }, parseInt(this.options.animation, 10) || 400);
	    } else {
	        this.$tooltip.show().addClass(this.options.active);
	    }
	};
	
	Tooltips.prototype.show = function () {
	    var $this = this;
	    this.content = typeof this.options.content === "function" ? this.options.content(this.$el) : this.options.content;
	
	    if (this.tooltipdelay) clearTimeout(this.tooltipdelay);
	    if (this.checkdelay) clearTimeout(this.checkdelay);
	
	    if (!this.content.length) return;
	
	    this.$tooltip.stop().css({ "top": -2000, "visibility": "hidden" }).removeClass(this.options.active).show();
	    this.$tooltip.find(".tooltips-inner").html(this.content);
	
	    // 异步
	    if (this.options.url !== '') {
	        this.$tooltip.find(".tooltips-inner").load(this.options.url, function () {
	            // 设置位置
	            $this.__setPosition();
	        });
	    }
	
	    this.tooltipdelay = setTimeout(function () {
	
	        // 设置位置
	        $this.__setPosition();
	
	        $this.tooltipdelay = false;
	
	        $this.checkdelay = setInterval(function () {
	            if (!$this.$el.is(':visible')) $this.hide();
	        }, 150);
	    }, parseInt(this.options.delay, 10) || 0);
	};
	
	Tooltips.prototype.hide = function () {
	    if (this.$el.is('input') && this.$el[0] === document.activeElement) return;
	
	    if (this.tooltipdelay) clearTimeout(this.tooltipdelay);
	    if (this.checkdelay) clearTimeout(this.checkdelay);
	
	    this.$tooltip.stop();
	
	    if (this.options.animation) {
	        var $this = this;
	
	        this.$tooltip.fadeOut(parseInt(this.options.animation, 10) || 400, function () {
	            $this.$tooltip.removeClass($this.options.active);
	        });
	    } else {
	        this.$tooltip.hide().removeClass(this.options.active);
	    }
	};
	
	Tooltips.prototype.checkBoundary = function (left, top, width, height) {
	    var axis = "";
	
	    if (left < 0 || left - $(document).scrollLeft() + width > $(window).width()) {
	        axis += "x";
	    }
	
	    if (top < 0 || top - $(document).scrollTop() + height > $(window).height()) {
	        axis += "y";
	    }
	
	    return axis;
	};
	
	// 插件定义
	// ----------
	function Plugin(option) {
	    return $(this).each(function () {
	        var $this = $(this);
	        var data = $this.data('bp.tooltips');
	        if (!data) $this.data('bp.tooltips', data = new Tooltips(this, option));
	        if (typeof option == 'string') data[option]();
	    });
	}
	
	// jQuery 插件扩展
	// -------------
	$.fn.tooltips = Plugin;
	$.fn.tooltips.Constructor = Tooltips;
	
	// 元素插件绑定
	// ----------
	var handler = function handler() {
	    $(this).tooltips('show');
	};
	
	$(function () {
	    $(document).on('mouseenter.bp.tooltips focus.bp.tooltips', toggle, handler);
	});
	
	module.exports = Tooltips;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/*! nice-validator 0.10.11
	 * (c) 2012-2016 Jony Zhang <niceue@live.com>, MIT Licensed
	 * https://github.com/niceue/nice-validator
	 */
	/*jshint evil:true*/
	
	"use strict";
	
	var $ = __webpack_require__(2);
	(function ($) {
	
	    /*基本信息*/
	    var NS = 'validator',
	        CLS_NS = '.' + NS,
	        CLS_NS_RULE = '.rule',
	        CLS_NS_FIELD = '.field',
	        CLS_NS_FORM = '.form',
	        CLS_WRAPPER = 'nice-' + NS,
	        CLS_MSG_BOX = 'msg-box',
	        ARIA_REQUIRED = 'aria-required',
	        ARIA_INVALID = 'aria-invalid',
	        DATA_RULE = 'data-rule',
	        DATA_MSG = 'data-msg',
	        DATA_TIP = 'data-tip',
	        DATA_OK = 'data-ok',
	        DATA_TIMELY = 'data-timely',
	        DATA_TARGET = 'data-target',
	        DATA_DISPLAY = 'data-display',
	        DATA_MUST = 'data-must',
	        NOVALIDATE = 'novalidate',
	        INPUT_SELECTOR = ':verifiable',
	        rRules = /(&)?(!)?\b(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\|)?/g,
	        rRule = /(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,
	        rDisplay = /(?:([^:;\(\[]*):)?(.*)/,
	        rDoubleBytes = /[^\x00-\xff]/g,
	        rPos = /top|right|bottom|left/,
	        rAjaxType = /(?:(cors|jsonp):)?(?:(post|get):)?(.+)/i,
	        rUnsafe = /[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gmi,
	        noop = $.noop,
	        proxy = $.proxy,
	        trim = $.trim,
	        isFunction = $.isFunction,
	        isString = function isString(s) {
	        return typeof s === 'string';
	    },
	        isObject = function isObject(o) {
	        return o && Object.prototype.toString.call(o) === '[object Object]';
	    },
	        isIE = document.documentMode || +(navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1),
	        attr = function attr(el, key, value) {
	        if (!el || !el.tagName) return null;
	        if (value !== undefined) {
	            if (value === null) el.removeAttribute(key);else el.setAttribute(key, '' + value);
	        } else {
	            return el.getAttribute(key);
	        }
	    },
	        elementValue = function elementValue(element) {
	        return $(element).val();
	    },
	        debug = window.console || {
	        log: noop,
	        info: noop
	    },
	        submitButton,
	        novalidateonce,
	        preinitialized = {},
	        defaults = {
	        debug: 0,
	        timely: 1,
	        theme: 'default',
	        ignore: '',
	        focusInvalid: true,
	        //stopOnError: false,
	        //focusCleanup: false,
	        //ignoreBlank: false,
	        //showOk: true,
	
	        //dataFilter: null,
	        //valid: null,
	        //invalid: null,
	        //display: null,
	        //target: null,
	        beforeSubmit: noop,
	
	        msgWrapper: 'span',
	        msgMaker: function msgMaker(opt) {
	            var html;
	            html = '<span role="alert" class="msg-wrap n-' + opt.type + '">' + opt.arrow;
	            if (opt.result) {
	                $.each(opt.result, function (i, obj) {
	                    html += '<span class="n-' + obj.type + '">' + opt.icon + '<span class="n-msg">' + obj.msg + '</span></span>';
	                });
	            } else {
	                html += opt.icon + '<span class="n-msg">' + opt.msg + '</span>';
	            }
	            html += '</span>';
	            return html;
	        },
	        msgArrow: '',
	        msgIcon: '<span class="n-icon"></span>',
	        msgClass: '',
	        //msgStyle: null,
	        //msgShow: null,
	        //msgHide: null,
	        //bindClassTo: ':input',
	        validClass: 'n-valid',
	        invalidClass: 'n-invalid'
	    },
	        themes = {
	        'default': {
	            formClass: 'n-default',
	            msgClass: 'n-right'
	        }
	    };
	
	    /* jQuery Plugin
	       @param {Object} options
	        debug         {Boolean}     0               Whether to enable debug mode
	        timely        {Number}      1               Whether to enable timely validation
	        theme         {String}     'default'        Theme name
	        stopOnError   {Boolean}     false           Whether to stop validate when found an error input
	        focusCleanup  {Boolean}     false           Whether to clean up the field message when focus the field
	        focusInvalid  {Boolean}     true            Whether to focus the field that is invalid
	        ignoreBlank   {Boolean}     false           When the field has no value, whether to ignore validation
	        ignore        {jqSelector}    ''            Ignored fields (Using jQuery selector)
	         beforeSubmit  {Function}                    Do something before submit form
	        dataFilter    {Function}                    Convert ajax results
	        valid         {Function}                    Triggered when the form is valid
	        invalid       {Function}                    Triggered when the form is invalid
	        validClass    {String}      'n-valid'       Add this class name to a valid field
	        invalidClass  {String}      'n-invalid'     Add this class name to a invalid field
	        bindClassTo   {jqSelector}  ':input'        Which element should the className binding to
	         display       {Function}                    Callback function to get dynamic display
	        target        {Function}                    Callback function to get dynamic target
	        msgShow       {Function}                    Trigger this callback when show message
	        msgHide       {Function}                    Trigger this callback when hide message
	        msgWrapper    {String}      'span'          Message wrapper tag name
	        msgMaker      {Function}                    Callback function to make message HTML
	        msgArrow      {String}                      Message arrow template
	        msgIcon       {String}                      Message icon template
	        msgStyle      {String}                      Custom message css style
	        msgClass      {String}                      Additional added to the message class names
	        formClass     {String}                      Additional added to the form class names
	         messages      {Object}                      Custom messages for the current instance
	        rules         {Object}                      Custom rules for the current instance
	        fields        {Object}                      Field set to be verified
	        {String}        key    name|#id
	        {String|Object} value                       Rule string, or an object is passed more arguments
	         fields[key][rule]       {String}            Rule string
	        fields[key][display]    {String|Function}
	        fields[key][tip]        {String}            Custom friendly message when focus the input
	        fields[key][ok]         {String}            Custom success message
	        fields[key][msg]        {Object}            Custom error message
	        fields[key][msgStyle]   {String}            Custom message style
	        fields[key][msgClass]   {String}            Additional added to the message class names
	        fields[key][msgWrapper] {String}            Message wrapper tag name
	        fields[key][msgMaker]   {Function}          Custom message HTML maker
	        fields[key][dataFilter] {Function}          Conversion ajax results
	        fields[key][valid]      {Function}          Triggered when this field is valid
	        fields[key][invalid]    {Function}          Triggered when this field is invalid
	        fields[key][must]       {Boolean}           If set true, we always check the field even has remote checking
	        fields[key][timely]     {Boolean}           Whether to enable timely validation
	        fields[key][target]     {jqSelector}        Verify the current field, but the message can be displayed on target element
	     */
	    $.fn[NS] = function (options) {
	        var that = this,
	            args = arguments;
	
	        if (that.is(':input')) return that;
	        !that.is('form') && (that = this.find('form'));
	        !that.length && (that = this);
	
	        that.each(function () {
	            var cache = $(this).data(NS);
	
	            if (cache) {
	                if (isString(options)) {
	                    if (options.charAt(0) === '_') return;
	                    cache[options].apply(cache, Array.prototype.slice.call(args, 1));
	                } else if (options) {
	                    cache._reset(true);
	                    cache._init(this, options);
	                }
	            } else {
	                new Validator(this, options);
	            }
	        });
	
	        return this;
	    };
	
	    // Validate a field, or an area
	    $.fn.isValid = function (callback, hideMsg) {
	        var me = _getInstance(this[0]),
	            hasCallback = isFunction(callback),
	            ret,
	            opt;
	
	        if (!me) return true;
	        me.checkOnly = !!hideMsg;
	        opt = me.options;
	
	        ret = me._multiValidate(this.is(':input') ? this : this.find(INPUT_SELECTOR), function (isValid) {
	            if (!isValid && opt.focusInvalid && !me.checkOnly) {
	                // navigate to the error element
	                me.$el.find('[' + ARIA_INVALID + ']:first').focus();
	            }
	            if (hasCallback) {
	                if (callback.length) {
	                    callback(isValid);
	                } else if (isValid) {
	                    callback();
	                }
	            }
	            me.checkOnly = false;
	        });
	
	        // If you pass a callback, we maintain the jQuery object chain
	        return hasCallback ? this : ret;
	    };
	
	    // A faster selector than ":input:not(:submit,:button,:reset,:image,:disabled)"
	    $.expr[":"].verifiable = function (elem) {
	        var name = elem.nodeName.toLowerCase();
	
	        return (name === 'input' && !{ submit: 1, button: 1, reset: 1, image: 1 }[elem.type] || name === 'select' || name === 'textarea') && elem.disabled === false;
	    };
	
	    // any value, but not only whitespace
	    $.expr[":"].filled = function (elem) {
	        return !!trim(elementValue(elem));
	    };
	
	    /**
	     * Creates a new Validator
	     *
	     * @class
	     * @param {Element} element - form element
	     * @param {Object}  options - options for validator
	     */
	    function Validator(element, options) {
	        var me = this;
	
	        if (!(me instanceof Validator)) {
	            return new Validator(element, options);
	        }
	
	        me.$el = $(element);
	
	        if (me.$el.length) {
	            if (Validator.loading) {
	                $(window).on('validatorready', init);
	            } else {
	                init();
	            }
	        } else if (isString(element)) {
	            preinitialized[element] = options;
	        }
	
	        function init() {
	            me._init(me.$el[0], options);
	        }
	    }
	
	    Validator.prototype = {
	        _init: function _init(element, options) {
	            var me = this,
	                opt,
	                themeOpt,
	                dataOpt;
	
	            // Initialization options
	            if (isFunction(options)) {
	                options = {
	                    valid: options
	                };
	            }
	            options = options || {};
	            dataOpt = attr(element, 'data-' + NS + '-option');
	            dataOpt = dataOpt && dataOpt.charAt(0) === '{' ? new Function("return " + dataOpt)() : {};
	            themeOpt = themes[options.theme || dataOpt.theme || defaults.theme];
	
	            // themeOpt = {
	            //     formClass:"n-default",
	            //     msgClass:"n-right"
	            // };
	            opt = me.options = $.extend({}, defaults, themeOpt, me.options, options, dataOpt);
	
	            me.rules = new Rules(opt.rules, true);
	            me.messages = new Messages(opt.messages, true);
	            me.elements = me.elements || {};
	            me.deferred = {};
	            me.errors = {};
	            me.fields = {};
	
	            // Initialization fields
	            me._initFields(opt.fields);
	
	            // Initialization message parameters
	            me.msgOpt = {
	                type: 'error',
	                pos: _getPos(opt.msgClass),
	                wrapper: opt.msgWrapper,
	                cls: opt.msgClass,
	                style: opt.msgStyle,
	                arrow: opt.msgArrow,
	                icon: opt.msgIcon,
	                show: opt.msgShow,
	                hide: opt.msgHide
	            };
	            //console.log(me.msgOpt)
	
	            if (isString(opt.target)) {
	                me.$el.find(opt.target).addClass('msg-container');
	            }
	            //console.log(opt.formClass)
	            // Initialization events and make a cache
	            if (!me.$el.data(NS)) {
	                me.$el.data(NS, me).addClass(CLS_WRAPPER + ' ' + opt.formClass).on('submit' + CLS_NS + ' validate' + CLS_NS, proxy(me, '_submit')).on('reset' + CLS_NS, proxy(me, '_reset')).on('showmsg' + CLS_NS, proxy(me, '_showmsg')).on('hidemsg' + CLS_NS, proxy(me, '_hidemsg')).on('focusin' + CLS_NS + ' click' + CLS_NS, INPUT_SELECTOR, proxy(me, '_focusin')).on('focusout' + CLS_NS + ' validate' + CLS_NS, INPUT_SELECTOR, proxy(me, '_focusout'));
	
	                if (opt.timely) {
	                    me.$el.on('keyup' + CLS_NS + ' input' + CLS_NS + ' compositionstart compositionend', INPUT_SELECTOR, proxy(me, '_focusout')).on('click' + CLS_NS, ':radio,:checkbox', 'click', proxy(me, '_focusout')).on('change' + CLS_NS, 'select,input[type="file"]', 'change', proxy(me, '_focusout'));
	                }
	
	                // cache the novalidate attribute value
	                me._novalidate = attr(element, NOVALIDATE);
	                // Initialization is complete, stop off default HTML5 form validation
	                // If use "jQuery.attr('novalidate')" in IE7 will complain: "SCRIPT3: Member not found."
	                attr(element, NOVALIDATE, NOVALIDATE);
	            }
	        },
	
	        // Guess whether the form use ajax submit
	        _guessAjax: function _guessAjax(form) {
	            var me = this;
	
	            if (!(me.isAjaxSubmit = !!me.options.valid)) {
	                // if there is a "valid.form" event
	                var events = ($._data || $.data)(form, "events");
	                if (events && events.valid && $.map(events.valid, function (e) {
	                    return ~e.namespace.indexOf('form') ? 1 : null;
	                }).length) {
	                    me.isAjaxSubmit = true;
	                }
	            }
	        },
	
	        _initFields: function _initFields(fields) {
	            var me = this,
	                clear = fields === null;
	
	            // Processing field information
	            if (clear) fields = me.fields;
	
	            if (isObject(fields)) {
	                $.each(fields, function (k, v) {
	                    // delete a field from settings
	                    if (v === null || clear) {
	                        var el = me.elements[k];
	                        if (el) me._resetElement(el, true);
	                        delete me.fields[k];
	                    } else {
	                        me.fields[k] = isString(v) ? {
	                            rule: v
	                        } : v;
	                    }
	                });
	            }
	
	            // Parsing DOM rules
	            me.$el.find(INPUT_SELECTOR).each(function () {
	                me._parse(this);
	            });
	        },
	
	        // Parsing a field
	        _parse: function _parse(el) {
	            var me = this,
	                opt = me.options,
	                field,
	                key = el.name,
	                timely,
	                dataRule = attr(el, DATA_RULE);
	
	            dataRule && attr(el, DATA_RULE, null);
	
	            // If the field has passed the key as id mode, or it doesn't has a name
	            if (el.id && '#' + el.id in me.fields || !key ||
	            // If dataRule and element are diffrent from old's, we use ID mode.
	            dataRule !== null && (field = me.fields[key]) && dataRule !== field.rule && field.key !== el.id) {
	                key = '#' + el.id;
	            }
	            // doesn't verify a field that has neither id nor name
	            if (!key) return;
	
	            field = me.fields[key] || {};
	            field.key = key;
	            // The priority of passing parameter by DOM is higher than by JS.
	            field.rule = dataRule || field.rule || '';
	
	            if (!field.display) {
	                if (!(field.display = attr(el, DATA_DISPLAY)) && opt.display) {
	                    field.display = opt.display;
	                }
	            }
	            if (field.rule) {
	                if (attr(el, DATA_MUST) !== null || /match\(|checked/.test(field.rule)) {
	                    field.must = true;
	                }
	                if (~field.rule.indexOf('required')) {
	                    field.required = true;
	                    attr(el, ARIA_REQUIRED, true);
	                }
	                if (!('showOk' in field)) {
	                    field.showOk = opt.showOk;
	                }
	
	                timely = attr(el, DATA_TIMELY);
	                if (!timely) {
	                    if ('timely' in field) attr(el, DATA_TIMELY, +field.timely);
	                } else {
	                    field.timely = +timely;
	                }
	                field = me._parseRule(field);
	                field.old = {};
	            }
	            if (isString(field.target)) {
	                attr(el, DATA_TARGET, field.target);
	            }
	            if (isString(field.tip)) {
	                attr(el, DATA_TIP, field.tip);
	            }
	
	            return me.fields[key] = field;
	        },
	
	        // Parsing field rules
	        _parseRule: function _parseRule(field) {
	            var arr = rDisplay.exec(field.rule);
	
	            if (!arr) return;
	            // current rule index
	            field._i = 0;
	            if (arr[1]) {
	                field.display = arr[1];
	            }
	            if (arr[2]) {
	                field.rules = [];
	                arr[2].replace(rRules, function () {
	                    var args = arguments;
	                    args[4] = args[4] || args[5];
	                    field.rules.push({
	                        and: args[1] === "&",
	                        not: args[2] === "!",
	                        or: args[6] === "|",
	                        method: args[3],
	                        params: args[4] ? $.map(args[4].split(', '), function (i) {
	                            return trim(i);
	                        }) : undefined
	                    });
	                });
	            }
	
	            return field;
	        },
	
	        // Verify a zone
	        _multiValidate: function _multiValidate($inputs, doneCallback) {
	            var me = this,
	                opt = me.options;
	
	            me.hasError = false;
	            if (opt.ignore) {
	                $inputs = $inputs.not(opt.ignore);
	            }
	
	            $inputs.each(function () {
	                me._validate(this);
	                if (me.hasError && opt.stopOnError) {
	                    // stop the validation
	                    return false;
	                }
	            });
	
	            // Need to wait for all fields validation complete, especially asynchronous validation
	            if (doneCallback) {
	                me.validating = true;
	                $.when.apply(null, $.map(me.deferred, function (v) {
	                    return v;
	                })).done(function () {
	                    doneCallback.call(me, !me.hasError);
	                    me.validating = false;
	                });
	            }
	
	            // If the form does not contain asynchronous validation, the return value is correct.
	            // Otherwise, you should detect form validation result through "doneCallback".
	            return !$.isEmptyObject(me.deferred) ? undefined : !me.hasError;
	        },
	
	        // Validate the whole form
	        _submit: function _submit(e) {
	            var me = this,
	                opt = me.options,
	                form = e.target,
	                canSubmit = e.type === 'submit' && !e.isDefaultPrevented();
	
	            e.preventDefault();
	
	            if (novalidateonce && ~(novalidateonce = false) ||
	            // Prevent duplicate submission
	            me.submiting ||
	            // Receive the "validate" event only from the form.
	            e.type === 'validate' && me.$el[0] !== form ||
	            // trigger the beforeSubmit callback.
	            opt.beforeSubmit.call(me, form) === false) {
	                return;
	            }
	
	            if (me.isAjaxSubmit === undefined) {
	                me._guessAjax(form);
	            }
	
	            opt.debug && debug.log("\n<<< event: " + e.type);
	
	            me._reset();
	            me.submiting = true;
	
	            me._multiValidate(me.$el.find(INPUT_SELECTOR), function (isValid) {
	                var ret = isValid || opt.debug === 2 ? 'valid' : 'invalid',
	                    errors;
	
	                if (!isValid) {
	                    if (opt.focusInvalid) {
	                        // navigate to the error element
	                        me.$el.find('[' + ARIA_INVALID + ']:first').focus();
	                    }
	                    errors = $.map(me.errors, function (err) {
	                        return err;
	                    });
	                }
	
	                // releasing submit
	                me.submiting = false;
	                me.isValid = isValid;
	
	                // trigger callback and event
	                isFunction(opt[ret]) && opt[ret].call(me, form, errors);
	                me.$el.trigger(ret + CLS_NS_FORM, [form, errors]);
	
	                opt.debug && debug.log('>>> ' + ret);
	
	                if (isValid && canSubmit && !me.isAjaxSubmit) {
	                    submitForm();
	                }
	            });
	
	            function submitForm() {
	                var name, submit;
	
	                novalidateonce = true;
	                if (submitButton && (name = submitButton.name)) {
	                    // If name="submit", we have to set the name empty to get the form.submit method
	                    submitButton.name = "";
	                    submit = form.submit;
	                    // For asp.NET controls
	                    me.$el.append('<input type="hidden" name="' + name + '" value="' + submitButton.value + '">');
	                    // call native submit
	                    submit.call(form);
	                } else {
	                    form.submit();
	                }
	            }
	        },
	
	        _reset: function _reset(e) {
	            var me = this;
	
	            me.errors = {};
	            if (e) {
	                me.reseting = true;
	                me.$el.find(INPUT_SELECTOR).each(function (i, el) {
	                    me._resetElement(el);
	                });
	                delete me.reseting;
	            }
	        },
	
	        _resetElement: function _resetElement(el, all) {
	            this._setClass(el, null);
	            this.hideMsg(el);
	            if (all) {
	                attr(el, ARIA_REQUIRED, null);
	            }
	        },
	
	        _getTimely: function _getTimely(el, opt) {
	            var timely = attr(el, DATA_TIMELY);
	            return timely !== null ? +timely : +opt.timely;
	        },
	
	        // Handle events: "focusin/click"
	        _focusin: function _focusin(e) {
	            var me = this,
	                opt = me.options,
	                el = e.target,
	                timely,
	                msg;
	
	            if (me.validating || e.type === 'click' && document.activeElement === el) {
	                return;
	            }
	
	            if (opt.focusCleanup) {
	                if (attr(el, ARIA_INVALID) === 'true') {
	                    me._setClass(el, null);
	                    me.hideMsg(el);
	                }
	            }
	
	            msg = attr(el, DATA_TIP);
	
	            if (msg) {
	                me.showMsg(el, {
	                    type: 'tip',
	                    msg: msg
	                });
	            } else {
	                if (attr(el, DATA_RULE)) {
	                    me._parse(el);
	                }
	                timely = me._getTimely(el, opt);
	                if (timely === 8 || timely === 9) {
	                    me._focusout(e);
	                }
	            }
	        },
	
	        // Handle events: "focusout/validate/keyup/click/change/input/compositionstart/compositionend"
	        _focusout: function _focusout(e, elem) {
	            var me = this,
	                opt = me.options,
	                el = e.target,
	                etype = e.type,
	                focusin = etype === 'focusin',
	                special = etype === 'validate',
	                field,
	                old,
	                value,
	                timestamp,
	                key,
	                specialKey,
	                timely,
	                timer = 0;
	
	            if (etype === 'compositionstart') {
	                me.pauseValidate = true;
	            }
	            if (etype === 'compositionend') {
	                me.pauseValidate = false;
	            }
	            if (me.pauseValidate || !(field = me.getField(el))) {
	                return;
	            }
	            field._e = etype;
	            old = field.old;
	            value = elementValue(el);
	
	            // Just for checkbox and radio
	            if (!elem && _checkable(el)) {
	                elem = me.$el.find('input[name="' + el.name + '"]').get(0);
	            }
	            timely = me._getTimely(elem || el, opt);
	
	            if (!special) {
	                if (!timely) return;
	
	                // not validate field unless fill a value
	                if (opt.ignoreBlank && !value && !focusin) {
	                    me.hideMsg(el);
	                    return;
	                }
	
	                if (etype === 'focusout') {
	                    if (timely === 2 || timely === 8) {
	                        if (value) {
	                            if (field.isValid && !old.showOk) {
	                                me.hideMsg(el);
	                            } else {
	                                me._makeMsg(el, field, old);
	                            }
	                        } else {
	                            return;
	                        }
	                    }
	                } else {
	                    if (timely < 2 && !e.data) {
	                        return;
	                    }
	
	                    // mark timestamp to reduce the frequency of the received event
	                    timestamp = +new Date();
	                    if (timestamp - (el._ts || 0) < 100 || etype === 'keyup' && el._et === 'input') {
	                        return;
	                    }
	                    el._ts = timestamp;
	                    el._et = etype;
	
	                    // handle keyup
	                    if (etype === 'keyup') {
	                        key = e.keyCode;
	                        specialKey = {
	                            8: 1, // Backspace
	                            9: 1, // Tab
	                            16: 1, // Shift
	                            32: 1, // Space
	                            46: 1 // Delete
	                        };
	
	                        // only gets focus, no validation
	                        if (key === 9 && !value) {
	                            return;
	                        }
	
	                        // do not validate, if triggered by these keys
	                        if (key < 48 && !specialKey[key]) {
	                            return;
	                        }
	                    }
	                    if (!focusin) {
	                        // keyboard events, reducing the frequency of validation
	                        timer = timely >= 100 ? timely : 400;
	                    }
	                }
	            }
	
	            // if the current field is ignored
	            if (opt.ignore && $(el).is(opt.ignore)) {
	                return;
	            }
	
	            clearTimeout(field._t);
	
	            field.value = value;
	            if (timely !== undefined) field.timely = timely;
	            if (timer) {
	                field._t = setTimeout(function () {
	                    me._validate(el, field);
	                }, timer);
	            } else {
	                if (special) field.old = {};
	                me._validate(el, field);
	            }
	        },
	
	        _setClass: function _setClass(el, isValid) {
	            var $el = $(el),
	                opt = this.options;
	            if (opt.bindClassTo) {
	                $el = $el.closest(opt.bindClassTo);
	            }
	            $el.removeClass(opt.invalidClass + ' ' + opt.validClass);
	            if (isValid !== null) {
	                $el.addClass(isValid ? opt.validClass : opt.invalidClass);
	            }
	        },
	
	        _showmsg: function _showmsg(e, type, msg) {
	            var me = this,
	                el = e.target;
	
	            if ($(el).is(':input')) {
	                me.showMsg(el, { type: type, msg: msg });
	            } else if (type === 'tip') {
	                me.$el.find(INPUT_SELECTOR + "[" + DATA_TIP + "]", el).each(function () {
	                    me.showMsg(this, { type: type, msg: msg });
	                });
	            }
	        },
	
	        _hidemsg: function _hidemsg(e) {
	            var $el = $(e.target);
	
	            if ($el.is(':input')) {
	                this.hideMsg($el);
	            }
	        },
	
	        // Validated a field
	        _validatedField: function _validatedField(el, field, ret) {
	            var me = this,
	                opt = me.options,
	                isValid = field.isValid = ret.isValid = !!ret.isValid,
	                callback = isValid ? 'valid' : 'invalid';
	
	            ret.key = field.key;
	            ret.ruleName = field._r;
	            ret.id = el.id;
	            ret.value = elementValue(el);
	
	            if (isValid) {
	                ret.type = 'ok';
	            } else {
	                if (me.submiting) {
	                    me.errors[field.key] = ret.msg;
	                }
	                me.isValid = false;
	                me.hasError = true;
	            }
	            me.elements[field.key] = ret.element = el;
	            me.$el[0].isValid = isValid ? me.isFormValid() : isValid;
	
	            // cache result
	            field.old = ret;
	
	            // trigger callback
	            isFunction(field[callback]) && field[callback].call(me, el, ret);
	            isFunction(opt.validation) && opt.validation.call(me, el, ret);
	
	            // trigger event
	            $(el).attr(ARIA_INVALID, isValid ? null : true).trigger(callback + CLS_NS_FIELD, [ret, me]);
	            me.$el.triggerHandler('validation', [ret, me]);
	
	            if (me.checkOnly) return;
	            // set className
	            me._setClass(el, ret.skip || ret.type === 'tip' ? null : isValid);
	            me._makeMsg.apply(me, arguments);
	        },
	
	        _makeMsg: function _makeMsg(el, field, ret) {
	            // show or hide the message
	            if (field.msgMaker || this.options.msgMaker) {
	                ret = $.extend({}, ret);
	                if (field._e === 'focusin') {
	                    ret.type = 'tip';
	                }
	                this[ret.showOk || ret.msg || ret.type === 'tip' ? 'showMsg' : 'hideMsg'](el, ret, field);
	            }
	        },
	
	        // Validated a rule
	        _validatedRule: function _validatedRule(el, field, ret, msgOpt) {
	            field = field || me.getField(el);
	            msgOpt = msgOpt || {};
	
	            var me = this,
	                opt = me.options,
	                msg,
	                rule,
	                method = field._r,
	                timely = field.timely || opt.timely,
	                special = timely === 9 || timely === 8,
	                transfer,
	                temp,
	                isValid = false;
	
	            // use null to break validation from a field
	            if (ret === null) {
	                me._validatedField(el, field, { isValid: true, skip: true });
	                return;
	            } else if (ret === undefined) {
	                transfer = true;
	            } else if (ret === true || ret === '') {
	                isValid = true;
	            } else if (isString(ret)) {
	                msg = ret;
	            } else if (isObject(ret)) {
	                if (ret.error) {
	                    msg = ret.error;
	                } else {
	                    msg = ret.ok;
	                    isValid = true;
	                }
	            }
	
	            rule = field.rules[field._i];
	            if (rule.not) {
	                msg = undefined;
	                isValid = method === "required" || !isValid;
	            }
	            if (rule.or) {
	                if (isValid) {
	                    while (field._i < field.rules.length && field.rules[field._i].or) {
	                        field._i++;
	                    }
	                } else {
	                    transfer = true;
	                }
	            } else if (rule.and) {
	                if (!field.isValid) transfer = true;
	            }
	
	            if (transfer) {
	                isValid = true;
	            }
	            // message analysis, and throw rule level event
	            else {
	                    if (isValid) {
	                        if (field.showOk !== false) {
	                            temp = attr(el, DATA_OK);
	                            msg = temp === null ? isString(field.ok) ? field.ok : msg : temp;
	                            if (!isString(msg) && isString(field.showOk)) {
	                                msg = field.showOk;
	                            }
	                            if (isString(msg)) {
	                                msgOpt.showOk = isValid;
	                            }
	                        }
	                    }
	                    if (!isValid || special) {
	                        /* rule message priority:
	                            1. custom DOM message
	                            2. custom field message;
	                            3. global defined message;
	                            4. rule returned message;
	                            5. default message;
	                        */
	                        msg = (_getDataMsg(el, field, msg || rule.msg || me.messages[method]) || me.messages.fallback).replace(/\{0\|?([^\}]*)\}/, function () {
	                            return me._getDisplay(el, field.display) || arguments[1] || me.messages[0];
	                        });
	                    }
	                    if (!isValid) field.isValid = isValid;
	                    msgOpt.msg = msg;
	                    $(el).trigger((isValid ? 'valid' : 'invalid') + CLS_NS_RULE, [method, msg]);
	                }
	
	            if (special && (!transfer || rule.and)) {
	                if (!isValid && !field._m) field._m = msg;
	                field._v = field._v || [];
	                field._v.push({
	                    type: isValid ? !transfer ? 'ok' : 'tip' : 'error',
	                    msg: msg || rule.msg
	                });
	            }
	
	            // output the debug message
	            if (opt.debug) {
	                debug.log('   ' + field._i + ': ' + method + ' => ' + (isValid || msg));
	            }
	
	            // the current rule has passed, continue to validate
	            if ((isValid || special) && field._i < field.rules.length - 1) {
	                field._i++;
	                me._checkRule(el, field);
	            }
	            // field was invalid, or all fields was valid
	            else {
	                    field._i = 0;
	
	                    if (special) {
	                        msgOpt.isValid = field.isValid;
	                        msgOpt.result = field._v;
	                        msgOpt.msg = field._m || '';
	                        if (!field.value && field._e === 'focusin') {
	                            msgOpt.type = 'tip';
	                        }
	                    } else {
	                        msgOpt.isValid = isValid;
	                    }
	
	                    me._validatedField(el, field, msgOpt);
	                    delete field._m;
	                    delete field._v;
	                }
	        },
	
	        // Verify a rule form a field
	        _checkRule: function _checkRule(el, field) {
	            var me = this,
	                ret,
	                fn,
	                old,
	                key = field.key,
	                rule = field.rules[field._i],
	                method = rule.method,
	                value = elementValue(el),
	                params = rule.params;
	
	            // request has been sent, wait it
	            if (me.submiting && me.deferred[key]) {
	                return;
	            }
	            old = field.old;
	            field._r = method;
	
	            if (old && !field.must && !rule.must && rule.result !== undefined && old.ruleName === method && old.id === el.id && value && old.value === value) {
	                // get result from cache
	                ret = rule.result;
	            } else {
	                // get result from current rule
	                fn = _getDataRule(el, method) || me.rules[method] || noop;
	                ret = fn.call(me, el, params, field);
	                if (fn.msg) rule.msg = fn.msg;
	            }
	
	            // asynchronous validation
	            if (isObject(ret) && isFunction(ret.then)) {
	                me.deferred[key] = ret;
	
	                // whether the field valid is unknown
	                field.isValid = undefined;
	
	                // show loading message
	                !me.checkOnly && me.showMsg(el, {
	                    type: 'loading',
	                    msg: me.messages.loading
	                }, field);
	
	                // waiting to parse the response data
	                ret.then(function (d, textStatus, jqXHR) {
	                    var data = jqXHR.responseText,
	                        result,
	                        dataFilter = field.dataFilter || me.options.dataFilter || _dataFilter;
	
	                    // detect if data is json or jsonp format
	                    if (/jsonp?/.test(this.dataType)) {
	                        data = d;
	                    } else if (trim(data).charAt(0) === '{') {
	                        data = $.parseJSON(data);
	                    }
	
	                    // filter data
	                    result = dataFilter.call(this, data, field);
	                    if (result === undefined) result = dataFilter.call(this, data.data, field);
	
	                    rule.data = this.data;
	                    rule.result = field.old ? result : undefined;
	                    me._validatedRule(el, field, result);
	                }, function (jqXHR, textStatus) {
	                    me._validatedRule(el, field, me.messages[textStatus] || textStatus);
	                }).always(function () {
	                    delete me.deferred[key];
	                });
	            }
	            // other result
	            else {
	                    me._validatedRule(el, field, ret);
	                }
	        },
	
	        // Processing the validation
	        _validate: function _validate(el, field) {
	            var me = this;
	
	            // doesn't validate the element that has "disabled" or "novalidate" attribute
	            if (el.disabled || attr(el, NOVALIDATE) !== null) {
	                return;
	            }
	
	            field = field || me.getField(el);
	            if (!field) return;
	            if (!field.rules) me._parse(el);
	            if (!field.rules) return;
	
	            if (me.options.debug) debug.info(field.key);
	
	            field.isValid = true;
	
	            // if the field is not required, and that has a blank value
	            if (!field.required && !field.must && !elementValue(el)) {
	                if (!_checkable(el)) {
	                    me._validatedField(el, field, { isValid: true });
	                    return true;
	                }
	            }
	
	            me._checkRule(el, field);
	            return field.isValid;
	        },
	
	        /**
	         * Detecting whether the value of an element that matches a rule
	         *
	         * @method test
	         * @param {Element} el - input element
	         * @param {String} rule - rule name
	         */
	        test: function test(el, rule) {
	            var me = this,
	                ret,
	                parts = rRule.exec(rule),
	                method,
	                params;
	
	            if (parts) {
	                method = parts[1];
	                if (method in me.rules) {
	                    params = parts[2] || parts[3];
	                    params = params ? params.split(', ') : undefined;
	                    ret = me.rules[method].call(me, el, params);
	                }
	            }
	
	            return ret === true || ret === undefined || ret === null;
	        },
	
	        // Get a range of validation messages
	        getRangeMsg: function getRangeMsg(value, params, field, suffix) {
	            if (!params) return;
	
	            var me = this,
	                rule = field.rules[field._i],
	                msg = me.messages[rule.method] || '',
	                result,
	                p = params[0].split('~'),
	                e = params[1] === 'false',
	                a = p[0],
	                b = p[1],
	                c = 'rg',
	                args = [''],
	                isNumber = trim(value) && +value === +value;
	
	            function compare(large, small) {
	                return !e ? large >= small : large > small;
	            }
	
	            if (p.length === 2) {
	                if (a && b) {
	                    if (isNumber && compare(value, +a) && compare(+b, value)) {
	                        result = true;
	                    }
	                    args = args.concat(p);
	                    c = e ? 'gtlt' : 'rg';
	                } else if (a && !b) {
	                    if (isNumber && compare(value, +a)) {
	                        result = true;
	                    }
	                    args.push(a);
	                    c = e ? 'gt' : 'gte';
	                } else if (!a && b) {
	                    if (isNumber && compare(+b, value)) {
	                        result = true;
	                    }
	                    args.push(b);
	                    c = e ? 'lt' : 'lte';
	                }
	            } else {
	                if (value === +a) {
	                    result = true;
	                }
	                args.push(a);
	                c = 'eq';
	            }
	
	            if (msg) {
	                if (suffix && msg[c + suffix]) {
	                    c += suffix;
	                }
	                args[0] = msg[c];
	            }
	
	            return result || (rule.msg = me.renderMsg.apply(null, args));
	        },
	
	        /**
	         * Render message template
	         *
	         * @method renderMsg
	         * @return {String}
	         */
	        renderMsg: function renderMsg() {
	            var args = arguments,
	                tpl = args[0],
	                i = args.length;
	
	            if (!tpl) return;
	
	            while (--i) {
	                tpl = tpl.replace('{' + i + '}', args[i]);
	            }
	
	            return tpl;
	        },
	
	        _getDisplay: function _getDisplay(el, str) {
	            return !isString(str) ? isFunction(str) ? str.call(this, el) : '' : str;
	        },
	
	        _getMsgOpt: function _getMsgOpt(obj) {
	            return $.extend({}, this.msgOpt, isString(obj) ? { msg: obj } : obj);
	        },
	
	        _getMsgDOM: function _getMsgDOM(el, msgOpt) {
	            var $el = $(el),
	                $msgbox,
	                datafor,
	                tgt,
	                container;
	
	            if ($el.is(':input')) {
	                tgt = msgOpt.target || attr(el, DATA_TARGET);
	                if (tgt) {
	                    tgt = isFunction(tgt) ? tgt.call(this, el) : this.$el.find(tgt);
	                    if (tgt.length) {
	                        if (tgt.is(':input')) {
	                            el = tgt.get(0);
	                        } else if (tgt.hasClass(CLS_MSG_BOX)) {
	                            $msgbox = tgt;
	                        } else {
	                            container = tgt;
	                        }
	                    }
	                }
	                if (!$msgbox) {
	                    datafor = (!_checkable(el) || !el.name) && el.id ? el.id : el.name;
	                    $msgbox = this.$el.find(msgOpt.wrapper + '.' + CLS_MSG_BOX + '[for="' + datafor + '"]');
	                }
	            } else {
	                $msgbox = $el;
	            }
	
	            if (!$msgbox.length) {
	                $el = this.$el.find(tgt || el);
	
	                $msgbox = $('<' + msgOpt.wrapper + '>').attr({
	                    'class': CLS_MSG_BOX + (msgOpt.cls ? ' ' + msgOpt.cls : ''),
	                    'style': msgOpt.style || '',
	                    'for': datafor
	                });
	
	                if (_checkable(el)) {
	                    var $parent = $el.parent();
	                    $msgbox.appendTo($parent.is('label') ? $parent.parent() : $parent);
	                } else {
	                    if (container) {
	                        $msgbox.appendTo(container);
	                    } else {
	                        $msgbox[!msgOpt.pos || msgOpt.pos === 'right' ? 'insertAfter' : 'insertBefore']($el);
	                    }
	                }
	            }
	
	            return $msgbox;
	        },
	
	        /**
	         * Show validation message
	         *
	         * @method showMsg
	         * @param {Element} el - input element
	         * @param {Object} msgOpt
	         */
	        showMsg: function showMsg(el, msgOpt, /*INTERNAL*/field) {
	            if (!el) return;
	            var me = this,
	                opt = me.options,
	                msgMaker,
	                temp,
	                $msgbox;
	
	            if (isObject(el) && !el.jquery && !msgOpt) {
	                $.each(el, function (key, msg) {
	                    var el = me.elements[key] || me.$el.find(_key2selector(key))[0];
	                    me.showMsg(el, msg);
	                });
	                return;
	            }
	
	            msgOpt = me._getMsgOpt(msgOpt);
	            el = $(el).get(0);
	
	            // ok or tip
	            if (!msgOpt.msg && msgOpt.type !== 'error') {
	                temp = attr(el, 'data-' + msgOpt.type);
	                if (temp !== null) msgOpt.msg = temp;
	            }
	
	            if (!isString(msgOpt.msg)) {
	                return;
	            }
	
	            if ($(el).is(INPUT_SELECTOR)) {
	                field = field || me.getField(el);
	                if (field) {
	                    msgOpt.style = field.msgStyle || msgOpt.style;
	                    msgOpt.cls = field.msgClass || msgOpt.cls;
	                    msgOpt.wrapper = field.msgWrapper || msgOpt.wrapper;
	                    msgOpt.target = field.target || opt.target;
	                }
	            }
	            if (!(msgMaker = (field || {}).msgMaker || opt.msgMaker)) {
	                return;
	            }
	
	            $msgbox = me._getMsgDOM(el, msgOpt);
	
	            !rPos.test($msgbox[0].className) && $msgbox.addClass(msgOpt.cls);
	            if (isIE === 6 && msgOpt.pos === 'bottom') {
	                $msgbox[0].style.marginTop = $(el).outerHeight() + 'px';
	            }
	            $msgbox.html(msgMaker.call(me, msgOpt))[0].style.display = '';
	
	            isFunction(msgOpt.show) && msgOpt.show.call(me, $msgbox, msgOpt.type);
	        },
	
	        /**
	         * Hide validation message
	         *
	         * @method hideMsg
	         * @param {Element} el - input element
	         * @param {Object} msgOpt optional
	         */
	        hideMsg: function hideMsg(el, msgOpt, /*INTERNAL*/field) {
	            var me = this,
	                opt = me.options,
	                $msgbox;
	
	            el = $(el).get(0);
	            msgOpt = me._getMsgOpt(msgOpt);
	
	            if ($(el).is(INPUT_SELECTOR)) {
	                field = field || me.getField(el);
	                if (field) {
	                    if (field.isValid || me.reseting) attr(el, ARIA_INVALID, null);
	                    msgOpt.wrapper = field.msgWrapper || msgOpt.wrapper;
	                    msgOpt.target = field.target || opt.target;
	                }
	            }
	
	            $msgbox = me._getMsgDOM(el, msgOpt);
	            if (!$msgbox.length) return;
	
	            if (isFunction(msgOpt.hide)) {
	                msgOpt.hide.call(me, $msgbox, msgOpt.type);
	            } else {
	                $msgbox[0].style.display = 'none';
	                $msgbox[0].innerHTML = null;
	            }
	        },
	
	        /**
	         * Get field information
	         *
	         * @method getField
	         * @param {Element} - input element
	         * @return {Object} field
	         */
	        getField: function getField(el) {
	            var me = this,
	                key;
	
	            if (isString(el)) {
	                key = el;
	            } else {
	                if (attr(el, DATA_RULE)) {
	                    return me._parse(el);
	                }
	                if (el.id && '#' + el.id in me.fields || !el.name) {
	                    key = '#' + el.id;
	                } else {
	                    key = el.name;
	                }
	            }
	
	            return me.fields[key];
	        },
	
	        /**
	         * Config a field
	         *
	         * @method: setField
	         * @param {String} key
	         * @param {Object} obj
	         */
	        setField: function setField(key, obj) {
	            var fields = {};
	
	            if (!key) return;
	
	            // update this field
	            if (isString(key)) {
	                fields[key] = obj;
	            }
	            // update fields
	            else {
	                    fields = key;
	                }
	
	            this._initFields(fields);
	        },
	
	        /**
	         * Detecting whether the form is valid
	         *
	         * @method isFormValid
	         * @return {Boolean}
	         */
	        isFormValid: function isFormValid() {
	            var fields = this.fields,
	                k,
	                field;
	            for (k in fields) {
	                field = fields[k];
	                if (!field.rules || !field.required && !field.must && !elementValue(_key2selector(k))) continue;
	                if (!field.isValid) {
	                    return field.isValid;
	                }
	            }
	            return true;
	        },
	
	        /**
	         * Prevent submission form
	         *
	         * @method holdSubmit
	         * @param {Boolean} hold - If set to false, will release the hold
	         */
	        holdSubmit: function holdSubmit(hold) {
	            this.submiting = hold === undefined || hold;
	        },
	
	        /**
	         * Clean validation messages
	         *
	         * @method cleanUp
	         */
	        cleanUp: function cleanUp() {
	            this._reset(1);
	        },
	
	        /**
	         * Destroy the validation
	         *
	         * @method destroy
	         */
	        destroy: function destroy() {
	            this._reset(1);
	            this.$el.off(CLS_NS).removeData(NS);
	            attr(this.$el[0], NOVALIDATE, this._novalidate);
	        }
	    };
	
	    /**
	     * Create Rules
	     *
	     * @class
	     * @param {Object} obj     rules
	     * @param {Object} context context
	     */
	    function Rules(obj, context) {
	        if (!isObject(obj)) return;
	
	        var k,
	            that = context ? context === true ? this : context : Rules.prototype;
	
	        for (k in obj) {
	            if (_checkRuleName(k)) that[k] = _getRule(obj[k]);
	        }
	    }
	
	    /**
	     * Create Messages
	     *
	     * @class
	     * @param {Object} obj     rules
	     * @param {Object} context context
	     */
	    function Messages(obj, context) {
	        if (!isObject(obj)) return;
	
	        var k,
	            that = context ? context === true ? this : context : Messages.prototype;
	
	        for (k in obj) {
	            that[k] = obj[k];
	        }
	    }
	
	    // Rule converted factory
	    function _getRule(fn) {
	        switch ($.type(fn)) {
	            case 'function':
	                return fn;
	            case 'array':
	                var f = function f(el) {
	                    fn.msg = fn[1];
	                    return fn[0].test(elementValue(el)) || fn[1] || false;
	                };
	                f.msg = fn[1];
	                return f;
	            case 'regexp':
	                return function (el) {
	                    return fn.test(elementValue(el));
	                };
	        }
	    }
	
	    // Get instance by an element
	    function _getInstance(el) {
	        var wrap, k, options;
	
	        if (!el || !el.tagName) return;
	
	        switch (el.tagName) {
	            case 'INPUT':
	            case 'SELECT':
	            case 'TEXTAREA':
	            case 'BUTTON':
	            case 'FIELDSET':
	                wrap = el.form || $(el).closest('.' + CLS_WRAPPER);
	                break;
	            case 'FORM':
	                wrap = el;
	                break;
	            default:
	                wrap = $(el).closest('.' + CLS_WRAPPER);
	        }
	
	        for (k in preinitialized) {
	            if ($(wrap).is(k)) {
	                options = preinitialized[k];
	                break;
	            }
	        }
	
	        return $(wrap).data(NS) || $(wrap)[NS](options).data(NS);
	    }
	
	    // Get custom rules on the node
	    function _getDataRule(el, method) {
	        var fn = trim(attr(el, DATA_RULE + '-' + method));
	
	        if (!fn) return;
	        fn = new Function("return " + fn)();
	        if (fn) return _getRule(fn);
	    }
	
	    // Get custom messages on the node
	    function _getDataMsg(el, field, m) {
	        var msg = field.msg,
	            item = field._r;
	
	        if (isObject(msg)) msg = msg[item];
	        if (!isString(msg)) {
	            msg = attr(el, DATA_MSG + '-' + item) || attr(el, DATA_MSG) || (m ? isString(m) ? m : m[item] : '');
	        }
	
	        return msg;
	    }
	
	    // Get message position
	    function _getPos(str) {
	        var pos;
	
	        if (str) pos = rPos.exec(str);
	        return pos && pos[0];
	    }
	
	    // Translate ajax response to validation result
	    function _dataFilter(data) {
	        if (isString(data) || isObject(data) && ('error' in data || 'ok' in data)) {
	            return data;
	        }
	    }
	
	    // Check whether the element is checkbox or radio
	    function _checkable(el) {
	        return el.tagName === 'INPUT' && el.type === 'checkbox' || el.type === 'radio';
	    }
	
	    // Parse date string to timestamp
	    function _parseDate(str) {
	        return Date.parse(str.replace(/\.|\-/g, '/'));
	    }
	
	    // Rule name only allows alphanumeric characters and underscores
	    function _checkRuleName(name) {
	        return (/^\w+$/.test(name)
	        );
	    }
	
	    // Translate field key to jQuery selector.
	    function _key2selector(key) {
	        return key.charAt(0) === "#" ? key.replace(/(:|\.|\[|\])/g, "\\$1") : '[name="' + key + '"]:input';
	    }
	
	    // Fixed a issue cause by refresh page in IE.
	    $(window).on('beforeunload', function () {
	        this.focus();
	    });
	
	    $(document).on('click', ':submit', function () {
	        var input = this,
	            attrNode;
	        if (!input.form) return;
	        // Remember the submit button which is clicked
	        submitButton = input;
	        // Shim for "formnovalidate"
	        attrNode = input.getAttributeNode('formnovalidate');
	        if (attrNode && attrNode.nodeValue !== null || attr(input, NOVALIDATE) !== null) {
	            novalidateonce = true;
	        }
	    })
	    // Automatic initializing form validation
	    .on('focusin submit validate', 'form,.' + CLS_WRAPPER, function (e) {
	        if (attr(this, NOVALIDATE) !== null) return;
	        var $form = $(this),
	            me;
	
	        if (!$form.data(NS)) {
	            me = _getInstance(this);
	            if (!$.isEmptyObject(me.fields)) {
	                // Execute event handler
	                if (e.type === 'focusin') {
	                    me._focusin(e);
	                } else {
	                    me._submit(e);
	                }
	            } else {
	                attr(this, NOVALIDATE, NOVALIDATE);
	                $form.off(CLS_NS).removeData(NS);
	            }
	        }
	    });
	
	    new Messages({
	        fallback: "不能为空",
	        loading: '正在加载...'
	    });
	
	    // Built-in rules (global)
	    new Rules({
	
	        /**
	         * required
	         *
	         * @example:
	            required
	            required(anotherRule)
	            required(not, -1)
	            required(from, .contact)
	         */
	        required: function required(element, params, field) {
	            var me = this,
	                val = trim(elementValue(element)),
	                isValid = true;
	
	            if (params) {
	                if (params.length === 1) {
	                    if (!_checkRuleName(params[0])) {
	                        if (!val && !$(params[0], me.$el).length) {
	                            return null;
	                        }
	                    } else if (me.rules[params[0]]) {
	                        if (!val && !me.test(element, params[0])) {
	                            attr(element, ARIA_REQUIRED, null);
	                            return null;
	                        } else {
	                            attr(element, ARIA_REQUIRED, true);
	                        }
	                    }
	                } else if (params[0] === 'not') {
	                    $.each(params.slice(1), function () {
	                        return isValid = val !== trim(this);
	                    });
	                } else if (params[0] === 'from') {
	                    var $elements = me.$el.find(params[1]),
	                        VALIDATED = '_validated_',
	                        ret;
	
	                    isValid = $elements.filter(function () {
	                        return !!trim(elementValue(this));
	                    }).length >= (params[2] || 1);
	
	                    if (isValid) {
	                        if (!val) ret = null;
	                    } else {
	                        ret = _getDataMsg($elements[0], field) || false;
	                    }
	
	                    if (!$(element).data(VALIDATED)) {
	                        $elements.data(VALIDATED, 1).each(function () {
	                            if (element !== this) {
	                                me._checkRule(this, me.getField(this));
	                            }
	                        }).removeData(VALIDATED);
	                    }
	
	                    return ret;
	                }
	            }
	
	            return isValid && !!val;
	        },
	
	        /**
	         * integer
	         *
	         * @example:
	            integer
	            integer[+]
	            integer[+0]
	            integer[-]
	            integer[-0]
	         */
	        integer: function integer(element, params) {
	            var re,
	                z = '0|',
	                p = '[1-9]\\d*',
	                key = params ? params[0] : '*';
	
	            switch (key) {
	                case '+':
	                    re = p;
	                    break;
	                case '-':
	                    re = '-' + p;
	                    break;
	                case '+0':
	                    re = z + p;
	                    break;
	                case '-0':
	                    re = z + '-' + p;
	                    break;
	                default:
	                    re = z + '-?' + p;
	            }
	            re = '^(?:' + re + ')$';
	
	            return new RegExp(re).test(elementValue(element)) || this.messages.integer[key];
	        },
	
	        /**
	         * match another field
	         *
	         * @example:
	            match[password]    Match the password field (two values ​​must be the same)
	            match[eq, password]  Ditto
	            match[neq, count]  The value must be not equal to the value of the count field
	            match[lt, count]   The value must be less than the value of the count field
	            match[lte, count]  The value must be less than or equal to the value of the count field
	            match[gt, count]   The value must be greater than the value of the count field
	            match[gte, count]  The value must be greater than or equal to the value of the count field
	            match[gte, startDate, date]
	            match[gte, startTime, time]
	         **/
	        match: function match(element, params, field) {
	            if (!params) return;
	
	            var me = this,
	                a,
	                b,
	                key,
	                msg,
	                type = 'eq',
	                parser,
	                selector2,
	                elem2,
	                field2;
	
	            if (params.length === 1) {
	                key = params[0];
	            } else {
	                type = params[0];
	                key = params[1];
	            }
	
	            selector2 = _key2selector(key);
	            elem2 = me.$el.find(selector2)[0];
	            // If the compared field is not exist
	            if (!elem2) return;
	            field2 = me.getField(elem2);
	            a = elementValue(element);
	            b = elementValue(elem2);
	
	            if (!field._match) {
	                me.$el.on('valid' + CLS_NS_FIELD + CLS_NS, selector2, function () {
	                    $(element).trigger('validate');
	                });
	                field._match = field2._match = 1;
	            }
	
	            // If both fields are blank
	            if (!field.required && a === "" && b === "") {
	                return null;
	            }
	
	            parser = params[2];
	            if (parser) {
	                if (/^date(time)?$/i.test(parser)) {
	                    a = _parseDate(a);
	                    b = _parseDate(b);
	                } else if (parser === 'time') {
	                    a = +a.replace(/:/g, '');
	                    b = +b.replace(/:/g, '');
	                }
	            }
	
	            // If the compared field is incorrect, we only ensure that this field is correct.
	            if (type !== "eq" && !isNaN(+a) && isNaN(+b)) {
	                return true;
	            }
	
	            msg = me.messages.match[type].replace('{1}', me._getDisplay(element, field2.display || key));
	
	            switch (type) {
	                case 'lt':
	                    return +a < +b || msg;
	                case 'lte':
	                    return +a <= +b || msg;
	                case 'gte':
	                    return +a >= +b || msg;
	                case 'gt':
	                    return +a > +b || msg;
	                case 'neq':
	                    return a !== b || msg;
	                default:
	                    return a === b || msg;
	            }
	        },
	
	        /**
	         * range numbers
	         *
	         * @example:
	            range[0~99]    Number 0-99
	            range[0~]      Number greater than or equal to 0
	            range[~100]    Number less than or equal to 100
	         **/
	        range: function range(element, params, field) {
	            return this.getRangeMsg(elementValue(element), params, field);
	        },
	
	        /**
	         * how many checkbox or radio inputs that checked
	         *
	         * @example:
	            checked;       no empty, same to required
	            checked[1~3]   1-3 items
	            checked[1~]    greater than 1 item
	            checked[~3]    less than 3 items
	            checked[3]     3 items
	         **/
	        checked: function checked(element, params, field) {
	            if (!_checkable(element)) return;
	
	            var me = this,
	                elem,
	                count;
	
	            if (element.name) {
	                count = me.$el.find('input[name="' + element.name + '"]').filter(function () {
	                    var el = this;
	                    if (!elem && _checkable(el)) elem = el;
	                    return !el.disabled && el.checked;
	                }).length;
	            } else {
	                elem = element;
	                count = elem.checked;
	            }
	
	            if (params) {
	                return me.getRangeMsg(count, params, field);
	            } else {
	                return !!count || _getDataMsg(elem, field, '') || me.messages.required;
	            }
	        },
	
	        /**
	         * length of a characters (You can pass the second parameter "true", will calculate the length in bytes)
	         *
	         * @example:
	            length[6~16]        6-16 characters
	            length[6~]          Greater than 6 characters
	            length[~16]         Less than 16 characters
	            length[~16, true]   Less than 16 characters, non-ASCII characters calculating two-character
	         **/
	        length: function length(element, params, field) {
	            var value = elementValue(element),
	                len = (params[1] === 'true' ? value.replace(rDoubleBytes, 'xx') : value).length;
	
	            return this.getRangeMsg(len, params, field, params[1] ? '_2' : '');
	        },
	
	        /**
	         * remote validation
	         *
	         * @description
	         *  remote([get:]url [, name1, [name2 ...]]);
	         *  Adaptation three kinds of results (Front for the successful, followed by a failure):
	                1. text:
	                    ''  'Error Message'
	                2. json:
	                    {"ok": ""}  {"error": "Error Message"}
	                3. json wrapper:
	                    {"status": 1, "data": {"ok": ""}}  {"status": 1, "data": {"error": "Error Message"}}
	         * @example
	            The simplest:       remote(path/to/server);
	            With parameters:    remote(path/to/server, name1, name2, ...);
	            By GET:             remote(get:path/to/server, name1, name2, ...);
	            Name proxy:         remote(path/to/server, name1, proxyname2:name2, proxyname3:#id3, ...)
	            Query String        remote(path/to/server, foo=1&bar=2, name1, name2, ...)
	         */
	        remote: function remote(element, params, field) {
	            if (!params) return;
	
	            var me = this,
	                arr = rAjaxType.exec(params[0]),
	                rule = field.rules[field._i],
	                data = {},
	                queryString = '',
	                url = arr[3],
	                type = arr[2] || 'POST',
	                // GET / POST
	            rType = (arr[1] || '').toLowerCase(),
	                // CORS / JSONP
	            dataType;
	
	            rule.must = true;
	            data[element.name] = elementValue(element);
	
	            // There are extra fields
	            if (params[1]) {
	                $.map(params.slice(1), function (name) {
	                    var arr, key;
	                    if (~name.indexOf('=')) {
	                        queryString += '&' + name;
	                    } else {
	                        arr = name.split(':');
	                        name = trim(arr[0]);
	                        key = trim(arr[1]) || name;
	                        data[name] = me.$el.find(_key2selector(key)).val();
	                    }
	                });
	            }
	
	            data = $.param(data) + queryString;
	            if (!field.must && rule.data && rule.data === data) {
	                return rule.result;
	            }
	
	            // Cross-domain request, force jsonp dataType
	            if (rType !== 'cors' && /^https?:/.test(url) && !~url.indexOf(location.host)) {
	                dataType = 'jsonp';
	            }
	
	            // Asynchronous validation need return jqXHR objects
	            return $.ajax({
	                url: url,
	                type: type,
	                data: data,
	                dataType: dataType
	            });
	        },
	
	        /**
	         * validate other fields
	         *
	         * @example
	         *  validate(name1, #id2)
	         */
	        validate: function validate(element, params) {
	            var VALIDATED = '_validated_';
	            if (!params || $(element).data(VALIDATED)) return;
	
	            this.$el.find($.map(params, function (key) {
	                return _key2selector(key);
	            }).join(',')).data(VALIDATED, 1).trigger('validate').removeData(VALIDATED);
	        },
	
	        /**
	         * filter characters, direct filtration without prompting error (support custom regular expressions)
	         *
	         * @example
	         *  filter          filtering unsafe characters
	         *  filter(regexp)  filtering the "regexp" matched characters
	         */
	        filter: function filter(element, params) {
	            var value = elementValue(element),
	                temp;
	
	            temp = value.replace(params ? new RegExp("[" + params[0] + "]", "gm") : rUnsafe, '');
	            if (temp !== value) element.value = temp;
	        }
	    });
	
	    /**
	     * Config global options
	     *
	     * @static  config
	     * @param {Object} options
	     */
	    Validator.config = function (options) {
	        $.each(options, function (k, o) {
	            if (k === 'rules') {
	                new Rules(o);
	            } else if (k === 'messages') {
	                new Messages(o);
	            } else {
	                defaults[k] = o;
	            }
	        });
	    };
	
	    /**
	     * Config themes
	     *
	     * @static setTheme
	     * @param {String|Object} name
	     * @param {Object} obj
	     * @example
	        .setTheme( themeName, themeOptions )
	        .setTheme( multiThemes )
	     */
	    Validator.setTheme = function (name, obj) {
	        if (isObject(name)) {
	            $.extend(true, themes, name);
	        } else if (isString(name) && isObject(obj)) {
	            themes[name] = $.extend(themes[name], obj);
	        }
	    };
	
	    $[NS] = Validator;
	
	    // Resource loader
	    (function (URI) {
	        var arr,
	            node,
	            i,
	            re,
	            dir,
	            el,
	            doc = document,
	            scripts = doc.getElementsByTagName('script');
	
	        if (URI) {
	            node = scripts[0];
	            arr = URI.match(/(.*(?:\/|\?))local(?:\/|=)([\w\-]{2,5})(?=\.js)?/);
	        } else {
	            i = scripts.length;
	            re = /(.*validator(?:\.min)?.js)\?.*local=([\w\-]*)/;
	            while (i-- && !arr) {
	                node = scripts[i];
	                arr = (node.hasAttribute ? node.src : node.getAttribute('src', 4) || '').match(re);
	            }
	        }
	
	        if (arr) {
	            dir = arr[1].split('/').slice(0, -1).join('/') + '/';
	            el = doc.createElement('link');
	            el.rel = 'stylesheet';
	            el.href = dir + 'jquery.validator.css';
	            node.parentNode.insertBefore(el, node);
	            if (!URI) {
	                Validator.loading = 1;
	                el = doc.createElement('script');
	                el.src = dir + 'local/' + (arr[2] || doc.documentElement.lang || 'en').replace('_', '-') + '.js';
	                i = 'onload' in el ? 'onload' : 'onreadystatechange';
	                el[i] = function () {
	                    if (!el.readyState || /loaded|complete/.test(el.readyState)) {
	                        $(window).trigger('validatorready');
	                        delete Validator.loading;
	                        el = el[i] = null;
	                    }
	                };
	                node.parentNode.insertBefore(el, node);
	            }
	        }
	    })($._VALIDATOR_URI);
	    /*基本信息 end*/
	
	    /*配置文件*/
	    /* Global configuration
	     */
	    $.validator.config({
	        //stopOnError: true,
	        //focusCleanup: true,
	        //theme: 'yellow_right',
	        //timely: 2,
	
	        // Custom rules
	        rules: {
	            digits: [/^\d+$/, "请填写数字"],
	            letters: [/^[a-z]+$/i, "请填写字母"],
	            date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"],
	            time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"],
	            email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"],
	            url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"],
	            qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"],
	            IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"],
	            tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"],
	            mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"],
	            zipcode: [/^\d{6}$/, "请检查邮政编码格式"],
	            chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"],
	            username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"],
	            password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"],
	            accept: function accept(element, params) {
	                if (!params) return true;
	                var ext = params[0],
	                    value = $(element).val();
	                return ext === '*' || new RegExp(".(?:" + ext + ")$", "i").test(value) || this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
	            }
	
	        },
	
	        // Default error messages
	        messages: {
	            0: "此处",
	            fallback: "{0}格式不正确",
	            loading: "正在验证...",
	            error: "网络异常",
	            timeout: "请求超时",
	            required: "{0}不能为空",
	            remote: "{0}已被使用",
	            integer: {
	                '*': "请填写整数",
	                '+': "请填写正整数",
	                '+0': "请填写正整数或0",
	                '-': "请填写负整数",
	                '-0': "请填写负整数或0"
	            },
	            match: {
	                eq: "{0}与{1}不一致",
	                neq: "{0}与{1}不能相同",
	                lt: "{0}必须小于{1}",
	                gt: "{0}必须大于{1}",
	                lte: "{0}不能大于{1}",
	                gte: "{0}不能小于{1}"
	            },
	            range: {
	                rg: "请填写{1}到{2}的数",
	                gte: "请填写不小于{1}的数",
	                lte: "请填写最大{1}的数",
	                gtlt: "请填写{1}到{2}之间的数",
	                gt: "请填写大于{1}的数",
	                lt: "请填写小于{1}的数"
	            },
	            checked: {
	                eq: "请选择{1}项",
	                rg: "请选择{1}到{2}项",
	                gte: "请至少选择{1}项",
	                lte: "请最多选择{1}项"
	            },
	            length: {
	                eq: "请填写{1}个字符",
	                rg: "请填写{1}到{2}个字符",
	                gte: "请至少填写{1}个字符",
	                lte: "请最多填写{1}个字符",
	                eq_2: "",
	                rg_2: "",
	                gte_2: "",
	                lte_2: ""
	            }
	        }
	    });
	
	    /* Themes
	     */
	    var TPL_ARROW = '<span class="n-arrow"></span>';
	    $.validator.setTheme({
	        // 'simple_right': {
	        //     formClass: 'n-simple',
	        //     msgClass: 'n-right',
	        //     msgArrow: TPL_ARROW
	        // },
	        // 'simple_bottom': {
	        //     formClass: 'n-simple',
	        //     msgClass: 'n-bottom',
	        //     msgArrow: TPL_ARROW
	        // },
	        //统一主题样式调用的用法
	        //没有设置验证提示出现在表单元素左边的用法和主题
	        'yellow_bottom': {
	            formClass: 'n-yellow',
	            msgClass: 'n-bottom',
	            msgArrow: TPL_ARROW
	        },
	        'yellow_top': {
	            formClass: 'n-yellow',
	            msgClass: 'n-top',
	            msgArrow: TPL_ARROW
	        },
	        'yellow_right': {
	            formClass: 'n-yellow',
	            msgClass: 'n-right',
	            msgArrow: TPL_ARROW
	        },
	        'yellow_right_effect': {
	            formClass: 'n-yellow',
	            msgClass: 'n-right',
	            msgArrow: TPL_ARROW,
	            msgShow: function msgShow($msgbox, type) {
	                var $el = $msgbox.children();
	                if ($el.is(':animated')) return;
	                if (type === 'error') {
	                    $el.css({ left: '20px', opacity: 0 }).delay(100).show().stop().animate({ left: '-4px', opacity: 1 }, 150).animate({ left: '3px' }, 80).animate({ left: 0 }, 80);
	                } else {
	                    $el.css({ left: 0, opacity: 1 }).fadeIn(200);
	                }
	            },
	            msgHide: function msgHide($msgbox, type) {
	                var $el = $msgbox.children();
	                $el.stop().delay(100).show().animate({ left: '20px', opacity: 0 }, 300, function () {
	                    $msgbox.hide();
	                });
	            }
	        }
	    });
	    /*配置文件 end*/
	})(jQuery);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 数据表格组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Ethan <17881055@qq.com> on 2016/10/11.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _pagination = __webpack_require__(17);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	__webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataTable = function () {
	    function DataTable($el, option) {
	        _classCallCheck(this, DataTable);
	
	        this.event = {
	            onLoadSuccess: null, //在数据加载成功的时候触发。
	            onBeforeLoad: null, //在载入请求数据数据之前触发，如果返回false可终止载入数据操作。
	            onLoadError: null, //在载入远程数据产生错误的时候触发。
	            onBeforeDraw: null //在载渲染之前触发，如果返回false可终止渲染操作。
	        };
	        this.model = {
	            rows: [],
	            columns: [],
	            fields: [], //定义的所有Title
	            formatters: [], //定义所有的formatter
	            styles: [], //样式
	            url: null,
	            requestData: {
	                page: 1, //页数
	                number: 10
	            }, //数量}, //请求数据
	            method: 'get', //请求方法
	            dataType: 'json', //数据类型
	            toolbars: [],
	            queryParams: null
	        };
	        this.dom = {
	            $tbody: null,
	            $el: $el,
	            $loading: null, //加载
	            $pageNumber: null,
	            pageJumpButtonId: null,
	            pageJSelectId: null,
	            pageInputId: null
	        };
	        this.pagination = null;
	        this.option = option;
	        this._init();
	    }
	
	    _createClass(DataTable, [{
	        key: '_init',
	        value: function _init() {
	            if (this.option.hasOwnProperty('url')) this.url = this.option.url; //是否有url
	            if (this.option.hasOwnProperty('toolbar')) this.model.toolbars = this.option.toolbar; //是否有toolbar
	            if (this.option.hasOwnProperty('queryParams')) this.model.queryParams = this.option.queryParams; //是否有queryParams
	            if (this.option.hasOwnProperty('columns')) this.model.columns = this.option.columns; //columns
	            //event
	            if (this.option.hasOwnProperty('onBeforeLoad')) this.event.onBeforeLoad = this.option.onBeforeLoad;
	            if (this.option.hasOwnProperty('onLoadSuccess')) this.event.onLoadSuccess = this.option.onLoadSuccess;
	            if (this.option.hasOwnProperty('onLoadError')) this.event.onLoadError = this.option.onLoadError;
	            if (this.option.hasOwnProperty('onBeforeDraw')) this.event.onBeforeDraw = this.option.onBeforeDraw;
	            this._setTitleByDom(this.dom.$el);
	            if (this.model.columns.length > 0) {
	                //判断是否需要重写表头
	                this._buildTableHead();
	                this._setTitleByColumns(this.model.columns);
	            }
	            this._buildLoading();
	            this._build();
	        }
	    }, {
	        key: '_getToolbarData',
	        value: function _getToolbarData() {
	            var obj = {};
	            for (var i = 0; i < this.model.toolbars.length; i++) {
	                var id = this.model.toolbars[i];
	                obj[(0, _jquery2.default)(id).attr('name')] = (0, _jquery2.default)(id).val();
	            }
	            return obj;
	        }
	    }, {
	        key: '_getData',
	        value: function _getData() {
	            //获取数据并渲染
	            this.dom.$el.find('.btn-spinner').css({ display: 'block' });
	            this.model.queryParams && _jquery2.default.extend(this.model.requestData, this.model.queryParams());
	            _jquery2.default.extend(this.model.requestData, { t: new Date().getTime().toString() }); //时间戳清除浏览器缓存
	            if (this.event.onBeforeLoad) {
	                var drawAble = this.event.onBeforeLoad();
	                if (!drawAble) {
	                    return null;
	                }
	            }
	
	            _jquery2.default.ajax({
	                type: this.model.method,
	                url: this.model.url,
	                data: this.model.requestData,
	                dataType: this.model.dataType,
	                success: function (json) {
	
	                    this.event.onLoadSuccess && this.event.onLoadSuccess(json);
	                    this.model.rows = json.rows;
	                    this._clear();
	                    this._render(json);
	                    //初始化页脚信息
	                    this._setPagination(json);
	                    this.dom.$el.find('.btn-spinner').css({ display: 'none' });
	                }.bind(this),
	                error: function error(e) {
	                    this.event && this.event.onLoadError && this.event.onLoadError(e);
	                }
	            });
	        }
	    }, {
	        key: '_setPagination',
	        value: function _setPagination(json) {
	            var total = json.total;
	            if (this.getPager) {
	                this.getPager.props.pageStr.show = true;
	                this.getPager.items = total; //记录数
	                this.getPager.totalPages = Math.ceil(total / (0, _jquery2.default)(this.dom.$pageNumber).val()); //共几页
	                this.getPager.render();
	            }
	            //this.getPager.__renderPageStr();
	        }
	
	        //清除表格
	
	    }, {
	        key: '_clear',
	        value: function _clear() {
	            this.dom.$tbody && (0, _jquery2.default)(this.dom.$tbody).remove();
	        }
	
	        //渲染表格
	
	    }, {
	        key: '_render',
	        value: function _render(json) {
	
	            if (this.event.onBeforeDraw) {
	                var drawAble = this.event.onBeforeDraw();
	                if (!drawAble) {
	                    return null;
	                }
	            }
	            var $tbody = (0, _jquery2.default)("<tbody></tbody>");
	            var rows = json.rows;
	            for (var i = 0; i < rows.length; i++) {
	                //生成行
	                var row = rows[i];
	                var $tr = (0, _jquery2.default)("<tr></tr>");
	                $tbody.append($tr);
	                //根据头部data-options 绑定的ID生成格子
	                for (var j = 0; j < this.model.fields.length; j++) {
	                    var title = this.model.fields[j];
	                    var formatter = this.model.formatters[j];
	                    var style = this.model.styles[j];
	                    var $td = (0, _jquery2.default)("<td></td>");
	                    var obj = eval('(' + style + ')');
	                    style && $td.css(obj);
	                    $td.html(this._getContByTitle(title, row, formatter, i));
	                    $tr.append($td);
	                }
	            }
	            this.dom.$tbody = $tbody;
	            this.dom.$el.append($tbody);
	        }
	    }, {
	        key: '_buildLoading',
	        value: function _buildLoading() {
	            this.dom.$loading = (0, _jquery2.default)('<div class=\"btn btn-spinner\" disabled=\"\">Loading...</div>');
	            this.dom.$el.append(this.dom.$loading);
	        }
	    }, {
	        key: '_buildTableHead',
	        value: function _buildTableHead() {
	            this.dom.$el.empty();
	            var $group = (0, _jquery2.default)('<colgroup></colgroup>');
	            var $thead = (0, _jquery2.default)("<thead></thead>");
	            var $tr = (0, _jquery2.default)("<tr></tr>");
	            $thead.append($tr);
	            for (var i = 0; i < this.model.columns.length; i++) {
	                var column = this.model.columns[i];
	                var $col = (0, _jquery2.default)('<col></col>');
	                if (column.hasOwnProperty('width')) $col.width(column.width);
	                $group.append($col);
	                //
	                var $th = (0, _jquery2.default)("<th></th>");
	                if (column.hasOwnProperty('title')) $th.html(column.title);
	                $tr.append($th);
	            }
	            this.dom.$el.append($group);
	            this.dom.$el.append($thead);
	        }
	    }, {
	        key: '_build',
	        value: function _build() {
	            var paginationId = "j_paginations_" + new Date().getTime().toString();
	            this.model.paginationId = paginationId;
	            //建立分页
	            var $nav = (0, _jquery2.default)("<nav class=\"pagination-box text-align-right fn-mt-30\"></nav>");
	            var $ul = (0, _jquery2.default)("<ul class=\"paginations\" id=\"" + paginationId + "\"></ul>");
	            //跳转
	            var jumpId = "j-page-itempage-" + new Date().getTime();
	            var pageInputId = "j-page-input-" + new Date().getTime();
	            this.dom.pageJumpButtonId = jumpId;
	            this.dom.pageInputId = pageInputId;
	            var $jupmDiv = (0, _jquery2.default)("<div class=\"p-add-ons fn-ml-15 \">" + "<div class=\"form-group form-gs form-no-label\">" + "<div class=\"form-gs-box\">" + "<div class=\"form-control-wrap\">" + "<input type=\"text\" class=\"form-control\" placeholder=\"跳转\" id=\"" + pageInputId + "\">" + "</div>" + "<div class=\"form-addon child-right\">页</div>" + "<div class=\"form-addon-com\"> " + "<button type=\"button\" class=\"btn default\" id=\"" + jumpId + "\">GO</button>" + "</div>" + "</div>" + "</div>");
	            //每页显示条数
	            var selectId = "s-page-itempage-" + new Date().getTime();
	            this.dom.pageJSelectId = selectId;
	            var $pageNumber = (0, _jquery2.default)("<div class=\"p-add-ons fn-ml-15\">" + "<div class=\"form-group form-gs form-no-label\">" + "<div class=\"form-gs-box\">" + "<div class=\"form-addon\">每页</div>" + "<div class=\"form-control-wrap\">" + "<select class=\"form-control\" id=\"" + selectId + "\">" + "<option>10</option>" + "<option>20</option>" + "<option>60</option>" + "<option>100</option>" + "</select> " + "</div>" + "<div class=\"form-addon\">条</div>" + "</div>" + "</div>" + "</div>");
	            $nav.append($ul);
	            $nav.append($jupmDiv);
	            $nav.append($pageNumber);
	            this.dom.$el.after($nav);
	            this.dom.$pageNumber = $pageNumber.find('select');
	            this.pagination = $ul;
	
	            this._addPageListener();
	        }
	    }, {
	        key: '_addPageListener',
	        value: function _addPageListener() {
	            var that = this;
	            if (!this.getPager) {
	                (0, _jquery2.default)(this.pagination).pagination();
	            }
	            //切换事件
	            (0, _jquery2.default)('#' + this.model.paginationId).on('select.bp.pagination', function (e, page) {
	                console.log("this.model.url", that.model.url);
	                that.model.requestData = {
	                    page: page, //页数
	                    number: (0, _jquery2.default)(that.dom.$pageNumber).val() //数量
	                };
	                if (that.model.toolbars.length > 0) {
	                    _jquery2.default.extend(that.model.requestData, that._getToolbarData());
	                }
	                that._getData();
	            });
	
	            // 控制跳转
	            (0, _jquery2.default)('#' + this.dom.pageJumpButtonId).on('click', function () {
	                var page = _jquery2.default.trim((0, _jquery2.default)('#' + that.dom.pageInputId).val());
	                if (page !== '' && page > 0 && page <= that.getPager.totalPages) {
	                    //判断是否超出 或者为空
	                    that.model.requestData = {
	                        page: page, //页数
	                        number: (0, _jquery2.default)(that.dom.$pageNumber).val() //数量
	                    };
	                    (0, _jquery2.default)('#' + that.model.paginationId).pagination('go', parseInt(page));
	                    (0, _jquery2.default)('#' + that.dom.pageInputId).val(" ");
	                }
	            });
	
	            // 每页记录数
	            (0, _jquery2.default)('#' + this.dom.pageJSelectId).on('change', function () {
	
	                that.model.requestData = {
	                    // page: that.model.requestData.page, //页数
	                    page: 1,
	                    number: (0, _jquery2.default)(that.dom.$pageNumber).val() //数量
	                };
	                (0, _jquery2.default)('#' + that.model.paginationId).pagination('go', 1); //跳回第1页
	            });
	
	            //获取数据
	
	            that._getData();
	        }
	
	        //记录 title 和 formatter
	
	    }, {
	        key: '_setTitleByDom',
	        value: function _setTitleByDom($dom) {
	            var ths = $dom.find('th');
	            for (var i = 0; i < ths.length; i++) {
	                var obj = ths[i];
	                this.model.fields.push((0, _jquery2.default)(obj).data("options"));
	                this.model.formatters.push((0, _jquery2.default)(obj).data("formatter"));
	                this.model.styles.push((0, _jquery2.default)(obj).data("style"));
	            }
	        }
	    }, {
	        key: '_setTitleByColumns',
	        value: function _setTitleByColumns(columns) {
	            for (var i = 0; i < columns.length; i++) {
	                var obj = columns[i];
	                this.model.fields.push(obj.field || null);
	                this.model.formatters.push(obj.formatter || null);
	                this.model.styles.push(obj.style || null);
	            }
	        }
	
	        //根据表头ID返回内容
	
	    }, {
	        key: '_getContByTitle',
	        value: function _getContByTitle(str, row, formatter, index) {
	            for (var obj in row) {
	                if (obj === str) {
	                    if (formatter) {
	                        var a = this._getFormatter(formatter, row[obj], row, index);
	                        return a;
	                    }
	                    return row[obj];
	                }
	            }
	            if (formatter) {
	                var b = this._getFormatter(formatter, row[obj], row, index);
	                return b;
	            }
	            return '';
	        }
	    }, {
	        key: '_getFormatter',
	        value: function _getFormatter(formatter, value, row, index) {
	            if (typeof formatter == 'function') {
	                var f = formatter(value, row, index);
	                return f;
	            }
	            if (typeof formatter == "string") {
	                var f = window[formatter](value, row, index);
	                return f;
	            }
	            return null;
	        }
	
	        /**
	         * 重新渲染
	         */
	
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var resetPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	            if (resetPage) this.model.requestData.page = 1; //重新渲染时回到第1页
	            this._getData();
	        }
	
	        /**
	         *设置参数值
	         */
	
	    }, {
	        key: 'setting',
	        value: function setting(obj) {
	            for (var key in obj) {
	                this.model[key] = obj[key];
	            }
	        }
	
	        /**
	         *获取页脚
	         * page
	         * number
	         */
	
	    }, {
	        key: 'getPagination',
	        value: function getPagination() {
	            return {
	                page: this.model.requestData.page,
	                number: this.model.requestData.number
	            };
	        }
	
	        /**
	         *请求类型
	         */
	
	    }, {
	        key: 'method',
	        set: function set(type) {
	            this.model.method = type;
	        }
	
	        /**
	         *设置uri资源
	         */
	
	    }, {
	        key: 'url',
	        set: function set(u) {
	            this.model.url = u;
	        }
	
	        /**
	         *获取所有表头信息
	         *retrun Array
	         */
	
	    }, {
	        key: 'fields',
	        get: function get() {
	            return this.model.fields;
	        }
	
	        /**
	         *设置数据
	         *目前暂只支持JSON格式
	         */
	
	    }, {
	        key: 'data',
	        set: function set(d) {}
	    }, {
	        key: 'getPager',
	        get: function get() {
	            return (0, _jquery2.default)(this.pagination).data('bp.pagination');
	        }
	    }]);
	
	    return DataTable;
	}();
	// 插件定义
	//======================
	
	
	function Plugin(options, args) {
	    if (typeof options == 'undefined') {
	        var data = (0, _jquery2.default)(this).data('bp.dataTable');
	        if (!data) (0, _jquery2.default)(this).data('bp.dataTable', data = new DataTable((0, _jquery2.default)(this), _jquery2.default.extend({}, (0, _jquery2.default)(this).data(), options)));
	        return data;
	    }
	
	    if (typeof options == 'string' && typeof args == 'undefined') {
	        var data = (0, _jquery2.default)(this).data('bp.dataTable');
	        if (!data) (0, _jquery2.default)(this).data('bp.dataTable', data = new DataTable((0, _jquery2.default)(this), _jquery2.default.extend({}, (0, _jquery2.default)(this).data(), options)));
	        if (typeof options == 'string') {
	            return data[options].call(data, args);
	        }
	    }
	    // jquery 链式
	    return (0, _jquery2.default)(this).each(function () {
	
	        var $this = (0, _jquery2.default)(this);
	        if ($this.hasClass('no-js')) return;
	
	        var data = $this.data('bp.dataTable');
	
	        // 创建一个新实例
	        if (!data) $this.data('bp.dataTable', data = new DataTable($this, _jquery2.default.extend({}, $this.data(), options)));
	
	        if (typeof options == 'string') {
	            // 调用接口方法,第二个参数为方法传入参数
	            data[options].call(data, args);
	        }
	    });
	}
	// jQuery 插件扩展
	_jquery2.default.fn.dataTable = Plugin;
	_jquery2.default.fn.dataTable.Constructor = DataTable;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * brickPlus主文件
	 * by tommyshao <jinhong.shao@frontpay.cn>
	 * 2016-07-04
	 */
	
	'use strict';
	
	var $ = __webpack_require__(2);
	
	var fn = __webpack_require__(14);
	
	//var BrickPlus = require('brickPlus')
	if (typeof BrickPlus === 'undefined') {
	  var BrickPlus = {};
	  window.BrickPlus = BrickPlus;
	}
	
	// ------- 工具函数库 ----------
	
	var Util = {
	  // 1. 输入框输入过滤
	  inputFilter: __webpack_require__(31),
	  // 2. 金额简体转繁体
	  cnMoney: __webpack_require__(32),
	  // 3. 浏览器版本检测
	  browser: __webpack_require__(33),
	  // 4. 倒计时
	  clockTick: __webpack_require__(34),
	  //-- 5. 银行卡格式化
	  //-- 6. 银行卡开户行补齐
	  //-- 7. 进度条
	  // 8. 全角半角转换
	  dbcToSbc: __webpack_require__(35),
	  // 9. 文本框插入文字
	  insertTextAtCaret: __webpack_require__(36),
	  //-- 10. 隐私查看器
	  // 11. 日期间隔计算
	  dayDiff: __webpack_require__(37),
	  // 12. 时间计算
	  dateDiff: __webpack_require__(38),
	  // 13. 金额格式化
	  currency: __webpack_require__(39),
	  zeroPad: __webpack_require__(12),
	  debounce: fn.debounce,
	  throttle: fn.throttle
	};
	
	BrickPlus.Util = Util;
	
	// API
	module.exports = Util;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 输入控制
	 * by tommyshao
	 * 2016-07-06
	 *
	 * fork: https://github.com/maxkoshel/input-char-filter
	 */
	
	// 全局绑定标识
	var toggle = '[data-toggle="filter"]';
	
	/**
	 * 输入过滤处理函数
	 * @param  {RegExp}   regexp   正则
	 * @param  {Function} callback 回调处理
	 * @return {Boolean}  验证结果
	 */
	function inputFilter(regexp, callback) {
	  return function (event) {
	    var chr;
	    var e = event || window.event;
	
	    if (e.ctrlKey || e.altKey || e.metaKey) return;
	
	    chr = getChar(e);
	
	    if (chr === null) return;
	
	    if (!regexp.test(chr)) return false;
	
	    typeof callback === 'function' && callback.call(chr);
	  };
	
	  function getChar(event) {
	    if (event.which === null) {
	      if (event.keyCode < 32) {
	        return null;
	      }
	
	      return String.fromCharCode(event.keyCode);
	    }
	
	    if (event.which !== 0 && event.charCode !== 0) {
	      if (event.which < 32) return null;
	
	      return String.fromCharCode(event.which);
	    }
	
	    return null;
	  }
	}
	
	/**
	 * 正则对象集合
	 * @type {Object}
	 */
	var patterns = {
	  number: /^[0-9]+$/, // 纯数字
	  integer: /^\-?[0-9]+$/, //整数
	  decimal: /^\-?[0-9]*\.?[0-9]+$/, //数字
	  natural: /^[1-9][0-9]*$/i, // 自然数，不能0开头
	  letter: /[a-zA-z]/, // 纯英文
	  email: /[a-z0-9_\.\-@]/i, // 邮箱
	  hex: /[0-9a-f]/i, // 十六进制
	  alpha: /^[a-z]+$/i, // 字母下划线
	  alphaNum: /[a-z0-9_]/i, // 字母数字下划线
	  name: /[a-zA-Z0-9_\-]/, // 用户名
	  phone: /\d{3,4}-\d{5,}/, // 电话 020(0668)-5201314
	  mobile: /^1[3-9]\d{9}/, // 手机号码 1[3-9]xxxxxxxxx
	  ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i, // ip地址
	  base64: /[^a-zA-Z0-9\/\+=]/i,
	  url: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
	  date: /\d{4}-\d{1,2}-\d{1,2}/, // 日期
	  chinese: /^[\u4e00-\u9fa5]+$/, // 纯中文
	  nickName: /^[\u4e00-\u9fa50-9a-zA-Z_\-]+$/ // 中文昵称
	
	
	  /**
	   * 获取正则对象
	   * @param  {Object} el 输入框
	   * @return RegExp 正则表达式
	   */
	};function getPattern(el) {
	  var pattern = el.getAttribute('pattern');
	
	  if (!pattern) return null;
	  var p = patterns[pattern];
	
	  if (!p) {
	    // pattern 优先级最高
	    p = new RegExp(pattern);
	  }
	
	  return p;
	}
	
	/**
	 * 按键按下处理函数
	 * @param  {Event} event keypress事件对象
	 * @return {Boolean}  true - 通过, false
	 */
	function handleKeyPressEvent(event) {
	  var pattern = getPattern(event.target);
	
	  return pattern && inputFilter(pattern)(event);
	}
	
	/**
	 * keyup 事件处理
	 * @param  {Event} event keypress事件对象
	 * @return {Boolean}  true - 通过, false
	 */
	function handleKeyAfterEvent(event) {
	  var pattern = getPattern(event.target);
	
	  if (pattern === null) return;
	  var $this = $(this),
	      defaultVal = $this.val(),
	      matched = false;
	  setTimeout(function () {
	    $this.val(function () {
	      var res = defaultVal.replace(pattern, function (match, index, str) {
	        matched = true;
	        return match;
	      });
	      return matched ? res : '';
	    });
	  }, 1);
	}
	
	// ----------
	// jQuery 全局绑定
	$(function () {
	  $(document).on('keypress', toggle, handleKeyPressEvent);
	  $(document).on('paste change propertychange', toggle, handleKeyAfterEvent);
	});
	
	module.exports = {
	  filter: inputFilter,
	  keyPress: handleKeyPressEvent,
	  keyAfter: handleKeyAfterEvent
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 金额转中文繁体
	 * by tommyshao
	 * 2016-07-06
	 *
	 * @fork    : https://github.com/sirzxj/cn-money/blob/master/1.0/index.js
	 */
	
	var $ = __webpack_require__(2);
	
	// kissyui cn-money
	// https://github.com/sirzxj/cn-money/blob/master/1.0/index.js
	
	var RE = {};
	
	// ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
	var ARR_CHINESE_NUMBER = ['\u96F6', '\u58F9', '\u8D30', '\u53C1', '\u8086', '\u4F0D', '\u9646', '\u67D2', '\u634C', '\u7396'];
	//["元", "拾", "佰", "仟", "万", "拾", "佰","仟", "亿", "拾", "佰", "仟", "万", "拾", "佰", "仟"];
	var ARR_CHINESE_UNIT = ['\u5143', '\u62FE', '\u4F70', '\u4EDF', '\u4E07', '\u62FE', '\u4F70', '\u4EDF', '\u4EBF', '\u62FE', '\u4F70', '\u4EDF', '\u4E07', '\u62FE', '\u4F70', '\u4EDF'];
	//["角", "分", "厘" ,"毫","丝","忽"];
	var ARR_CHINESE_DEC = ['\u89D2', '\u5206', '\u5398', '\u6BEB', '\u4E1D', '\u5FFD'];
	
	// 最大的处理位数，级别:千万亿
	var NUM_MAX_INTEGERS = 16;
	// 默认两位小数
	var NUM_DEFAULT_DEC = 2;
	// 最多处理5位小数
	var NUM_MAX_DEC = 6;
	// 用于检测传入的number
	var REG_NUMBER = /^\d+(.\d+)?$/;
	
	RE = {
	  isNumber: function isNumber(value) {
	    return typeof value === 'number' && !isNaN(value) && isFinite(value);
	  },
	  isString: function isString(str) {
	    return typeof str === 'string';
	  },
	  /**
	   * 转换成大写的数字金额
	   * @param  {Number || String} number 需要转换的数字，可以是number和string
	   * @param  {Number} decimalsSize 保留几位小数，默认为2
	   * @return {String || Boolean}        正确返回处理的字符串，错误返回false
	   */
	  convert: function convert(number, decimalsSize) {
	    if (!(this.isNumber(number) || this.isString(number)) || !REG_NUMBER.test(number)) {
	      window['console'] && console.log('Error type !');
	      return false;
	    }
	    //this.decimalsSize = decimalsSize !== undefined ? decimalsSize : (parseInt(decimalsSize) || 2);
	    this.decimalsSize = parseInt(decimalsSize) || 2;
	    var oParsedParam = this.parseParam(number + '');
	    if (oParsedParam.i.length > NUM_MAX_INTEGERS) {
	      window['console'] && console.log("Too large !");
	      return false;
	    }
	    return this.trimValue(oParsedParam);
	  },
	  /**
	   * 整数和小数部分分别转换完成之后，再做相关的处理，去除0之类的
	   * @param  {Object} oParsedParam
	   * @return {String} 最终处理结果
	   */
	  trimValue: function trimValue(oParsedParam) {
	
	    var isNeedWan = this.isNeedTenThousand(oParsedParam.i);
	    var strParsedInt = this._convertInteger(oParsedParam.i, isNeedWan);
	    var strPasedDecimal = this._convertDecimal(oParsedParam.d);
	
	    if (oParsedParam.i === '0') {
	      if (oParsedParam.d === '') {
	        return '零元';
	      }
	      return strPasedDecimal.replace(/^\u96F6{1,}/, '');
	    }
	
	    // 壹拾 -》拾
	    //strParsedInt = strParsedInt.replace(/\u58F9\u62FE/g, '\u62FE');
	    //console.log(strParsedInt);
	
	    return strParsedInt + strPasedDecimal;
	  },
	  /**
	   * 将数字分割成整数和小数
	   * @param  {String} strNumber 数字
	   * @return {Object}           {i:,d:}
	   */
	  parseParam: function parseParam(strNumber) {
	    var strInt;
	    var strDec;
	    var numIndexKey = strNumber.indexOf(".");
	    if (numIndexKey > 0) {
	      strInt = strNumber.substring(0, numIndexKey);
	      strDec = strNumber.substring(numIndexKey + 1);
	    } else if (numIndexKey == 0) {
	      strInt = "";
	      strDec = strNumber.substring(1);
	    } else {
	      strInt = strNumber;
	      strDec = "";
	    }
	    // strInt去掉首0，不必去掉strDec的尾0(超出部分舍去)
	    //if (!strInt ==="" ) {
	    if (strInt !== "") {
	      strInt = '' + parseInt(strInt, 10);
	      if (strInt === "0") {
	        strInt = "";
	      }
	    }
	    return {
	      i: strInt,
	      d: strDec
	    };
	  },
	  /**
	   * 小数点前的转换
	   * @param  {String}  integers  数字
	   * @param  {Boolean} isNeedWan 是否需要万
	   * @return {[type]}
	   */
	  _convertInteger: function _convertInteger(integers, isNeedWan) {
	    var arrInteger = [];
	    var length = integers.length;
	    // 兼容ie7
	    integers = integers.split('');
	
	    for (var i = 0; i < length; i++) {
	      // 0出现在关键位置：
	      // 1234(万)1234(亿)1234(万)1234(元)
	      var key = '';
	      var swithVal = length - i;
	      if (integers[i] == 0) {
	        if (swithVal == 13) {
	          // 万(亿) *
	          key = ARR_CHINESE_UNIT[4];
	        } else if (swithVal == 9) {
	          // 亿 *
	          key = ARR_CHINESE_UNIT[8];
	        } else if (swithVal == 5 && isNeedWan) {
	          // 万
	          key = ARR_CHINESE_UNIT[4];
	        } else if (swithVal == 1) {
	          // 元 *
	          key = ARR_CHINESE_UNIT[0];
	        }
	        // 0遇非0时补零，不包含最后一位
	        if (swithVal > 1 && integers[i + 1] != 0) {
	          key += ARR_CHINESE_NUMBER[0];
	        }
	      }
	      arrInteger.push(integers[i] == 0 ? key : ARR_CHINESE_NUMBER[integers[i]] + ARR_CHINESE_UNIT[swithVal - 1]);
	    }
	
	    return arrInteger.join('');
	  },
	  /**
	   * 转换小数点后面的数字
	   * @param  {String} decimals
	   * @return {String}
	   */
	  _convertDecimal: function _convertDecimal(decimals) {
	    var chineseDecimal = [];
	    // 兼容ie7
	    decimals = decimals.split('');
	
	    for (var i = 0, len = decimals.length; i < len; i++) {
	      // 最多能够处理的小数位
	      if (i === NUM_MAX_DEC || i === this.decimalsSize) {
	        break;
	      }
	      chineseDecimal.push(decimals[i] == 0 ? '\u96F6' : ARR_CHINESE_NUMBER[decimals[i]] + ARR_CHINESE_DEC[i]);
	    }
	    return chineseDecimal.join('').replace(/\u96F6{2,}/g, '\u96F6').replace(/\u96F6{1,}$/, '');
	  },
	  /**
	   * 5-8位没有数字，就不需要万了
	   * @param  {String}  strInt 小数点前的数字
	   * @return {Boolean}
	   */
	  isNeedTenThousand: function isNeedTenThousand(strInt) {
	    var length = strInt.length;
	    var subInteger = '';
	    if (length > 4) {
	      if (length > 8) {
	        subInteger = strInt.substring(length - 8, length - 4);
	      } else {
	        subInteger = strInt.substring(0, length - 4);
	      }
	      return parseInt(subInteger, 10) > 0;
	    }
	    return false;
	  }
	};
	
	/**
	 * 金额转换构造函数
	 * @param el
	 * @param option
	 * @constructor
	 */
	var ConvertTradition = function ConvertTradition(el, option) {
	  this.$el = $(el);
	  this.option = $.extend({}, ConvertTradition.DEFAULTS, option);
	  this.$target = $(option.target || this.$el.attr('data-target'));
	  this.initEvent();
	  this.convert();
	};
	
	/**
	 * 默认配置参数
	 * @type {{prefix: string, dec: number, unit: string}}
	 */
	ConvertTradition.DEFAULTS = {
	  target: null,
	  // 前缀文字人民币
	  prefix: '\u4EBA\u6C11\u5E01',
	  // 小数点位数
	  dec: 2,
	  // 后缀文字整
	  unit: '\u6574'
	};
	
	ConvertTradition.prototype = {
	  initEvent: function initEvent() {
	    this.$el.on('keyup', $.proxy(this.convert, this));
	  },
	  convert: function convert() {
	    var thisVal = $.trim(this.$el.val());
	    if ($.trim(thisVal) !== '') {
	      var str = RE.convert(parseFloat(thisVal), this.option.dec);
	      this.update(str);
	    }
	  },
	  update: function update(str) {
	    // 零元
	    str = str ? str : '\u96F6\u5143';
	    //var thisVal = parseFloat(this.$el.val());
	    // 1 === 1.00
	    //str = (thisVal === parseInt(thisVal)) ? this.option.prefix+str+this.option.unit : this.option.prefix+str;
	    var dec = str.substr(-1, 1);
	    //console.log(dec === '元')
	    str = dec === '\u5143' ? this.option.prefix + str + this.option.unit : this.option.prefix + str;
	    this.$target.html(str);
	  }
	};
	
	// jquery api
	$.fn.convertTransitional = function (option) {
	  var args = [].slice.call(arguments, 1);
	  return $(this).each(function () {
	    var that = $(this),
	        data = that.data('tradition');
	    if (!data) that.data('tradition', data = new ConvertTradition(that, option));
	    if (typeof option === 'string') data[option].apply(data, args);
	  });
	};
	
	$(function () {
	  //$('[data-toggle="tradition"]').convertTransitional();
	  $(document).on('keyup.util.tradition', '[data-toggle="cnMoney"]', function () {
	    $(this).convertTransitional('convert');
	  });
	});
	
	module.exports = ConvertTradition;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 浏览器版本检测
	 * by tommyshao
	 * 2016-07-06
	 */
	
	var detectBrowser = function () {
	  var win = window;
	  var nav = win.navigator;
	  var ua = nav.userAgent;
	  var doc = win.document;
	  var ieAX = win.ActiveXObject;
	  var ieMode = doc.documentMode;
	  var REG_APPLE = /^Apple/;
	  var ieVer = _getIeVersion() || ieMode || 0;
	  var isIe = ieAX || ieMode;
	  var chromiumType = _getChromiumType();
	
	  var exports = {
	    /**
	     * 判断是否为 IE 浏览器
	     *
	     * @example
	     * shell.isIE;
	     * // true or false
	     */
	    isIE: function () {
	      return !!ieVer;
	    }(),
	    /**
	     * IE 版本
	     *
	     * @example
	     * shell.ieVersion;
	     * // 6/7/8/9/10/11/12...
	     */
	    ieVersion: function () {
	      return ieVer;
	    }(),
	    /**
	     * 是否为谷歌 chrome 浏览器
	     *
	     * @example
	     * shell.isChrome;
	     * // true or false
	     */
	    isChrome: function () {
	      return chromiumType === 'chrome';
	    }(),
	    /**
	     * 是否为360安全浏览器
	     *
	     * @example
	     * shell.is360se;
	     * // true or false
	     */
	    is360se: function () {
	      return chromiumType === '360se';
	    }(),
	    /**
	     * 是否为360极速浏览器
	     *
	     * @example
	     * shell.is360ee;
	     * // true or false
	     */
	    is360ee: function () {
	      return chromiumType === '360ee' || Browser360EE();
	    }(),
	    /**
	     * 是否为猎豹安全浏览器
	     *
	     * @example
	     * shell.isLiebao;
	     * // true or false
	     */
	    isLiebao: function () {
	      return chromiumType === 'liebao' || ua.indexOf('LBBROWSER') > -1;
	    }(),
	    /**
	     * 是否搜狗高速浏览器
	     *
	     * @example
	     * shell.isSogou;
	     * // true or false
	     */
	    isSogou: function () {
	      return chromiumType === 'sogou';
	    }(),
	    /**
	     * 是否为 QQ 浏览器
	     *
	     * @example
	     * shell.isQQ;
	     * // true or false
	     */
	    isQQ: function () {
	      return chromiumType === 'qq';
	    }()
	  };
	
	  //    /**
	  //     * 测试 MIME
	  //     * @param where
	  //     * @param value
	  //     * @param [name]
	  //     * @param [nameReg]
	  //     * @returns {boolean}
	  //     * @private
	  //     */
	  //    function _mime(where, value, name, nameReg) {
	  //        var mimeTypes = navigator.mimeTypes;
	  //        var i;
	  //
	  //        for (i in mimeTypes) {
	  //            if (mimeTypes[i][where] == value) {
	  //                if (name !== undefined && nameReg.test(mimeTypes[i][name])) {
	  //                    return true;
	  //                }
	  //                else if (name === undefined) {
	  //                    return true;
	  //                }
	  //            }
	  //        }
	  //
	  //        return false;
	  //    }
	
	
	  /**
	   * 检测 external 是否包含该字段
	   * @param reg 正则
	   * @param type 检测类型，0为键，1为值
	   * @returns {boolean}
	   * @private
	   */
	  function _testExternal(reg, type) {
	    var external = win.external || {};
	
	    for (var i in external) {
	      if (reg.test(type ? external[i] : i)) {
	        return true;
	      }
	    }
	
	    return false;
	  }
	
	  /**
	   * 获取 Chromium 内核浏览器类型
	   * @link http://www.adtchrome.com/js/help.js
	   * @link https://ext.chrome.360.cn/webstore
	   * @link https://ext.se.360.cn
	   * @return {String}
	   *         360ee 360极速浏览器
	   *         360se 360安全浏览器
	   *         sougou 搜狗浏览器
	   *         liebao 猎豹浏览器
	   *         chrome 谷歌浏览器
	   *         ''    无法判断
	   * @version 1.0
	   * 2014年3月12日20:39:55
	   */
	
	  function _getChromiumType() {
	    if (isIe || typeof win.scrollMaxX !== 'undefined' || REG_APPLE.test(nav.vendor || '')) {
	      return '';
	    }
	
	    var _track = 'track' in document.createElement('track');
	    var webstoreKeysLength = win.chrome && win.chrome.webstore ? Object.keys(win.chrome.webstore).length : 0;
	
	    // 搜狗浏览器
	    if (_testExternal(/^sogou/i, 0)) {
	      return 'sogou';
	    }
	
	    // 猎豹浏览器
	    if (_testExternal(/^liebao/i, 0)) {
	      return 'liebao';
	    }
	
	    // chrome
	    if (win.clientInformation && win.clientInformation.permissions) {
	      return 'chrome';
	    }
	
	    if (_track) {
	      // 360极速浏览器
	      // 360安全浏览器
	      return webstoreKeysLength > 1 ? '360ee' : '360se';
	    }
	
	    return '';
	  }
	
	  // 获得ie浏览器版本
	
	  function _getIeVersion() {
	    var v = 3,
	        p = document.createElement('p'),
	        all = p.getElementsByTagName('i');
	
	    while (p.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]) {}
	
	    return v > 4 ? v : 0;
	  }
	
	  function Browser360EE() {
	    var _ = {
	      GetRunPath: function GetRunPath() {
	        try {
	          var path = external.GetRunPath(external.GetSID(window));
	          return path.toLowerCase();
	        } catch (e) {
	          return '';
	        }
	      },
	      Is360Chrome: function Is360Chrome() {
	        return this.GetRunPath().indexOf('360chrome.exe') > -1;
	      },
	      is360chrome: function is360chrome() {
	        var _is360chrome = false;
	        try {
	          if (typeof chrome != "undefined" && typeof chrome.webstorePrivate != 'undefined' && typeof chrome.webstorePrivate.beginInstallWithManifest3 != 'undefined') {
	            _is360chrome = true;
	          } else {
	            _is360chrome = navigator.userAgent.toLowerCase().indexOf('360ee') != -1;
	          }
	        } catch (e) {};
	        return _is360chrome || this.Is360Chrome();
	      }
	    };
	
	    return _.is360chrome();
	  }
	
	  return exports;
	}();
	
	module.exports = detectBrowser;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 倒计时
	 * by tommyshao
	 * 2016-07-06
	 */
	
	/**
	 * 倒计时
	 * @param {object} 小时dom元素
	 * @param {object} 分钟dom元素
	 * @param {object} 秒钟dom元素
	 * @param {Number} 开始时间时间戳
	 * @return {Object}
	 */
	function clockTick(target, callback) {
	  if (!target) return void 0;
	  var args = [].slice.call(arguments);
	  var Handler = {
	    init: function init(ss) {
	      //this.hours = h;
	      //this.minutes = m;
	      //this.seconds = s;
	      this.target = ss;
	      this.start = new Date();
	      this.timer = null;
	
	      this.tick();
	      return this;
	    },
	    tick: function tick() {
	      var self = this,
	
	      //now = new Date(),
	      endTime = self.target,
	          diff = endTime - self.start;
	
	      function loop() {
	
	        //console.log(diff)
	
	        // function minus(n1, n2) {
	        //   n1 = n1 - n2;
	        //   return n1;
	        // }
	
	        // function minus2(n1, n2) {
	        //   n1 -= n2;
	        //   return n1;
	        // }
	
	        // console.log(minus(120000, 1000))
	        // console.log(minus2(120000, 1000))
	
	
	        if (diff <= 0) {
	          typeof callback === 'function' && callback(-1);
	          clearInterval(self.timer);
	        } else {
	          var days = Math.floor(diff / (24 * 60 * 60 * 1000)),
	              h = Math.floor(diff / (60 * 60 * 1000)) - days * 24,
	              m = Math.floor(diff / (60 * 1000)) - h * 60 - days * 24 * 60,
	              s = Math.ceil(diff / 1000) - m * 60 - h * 60 * 60 - days * 24 * 60 * 60;
	
	          // 更新时分秒
	          typeof callback === 'function' && callback(days, h, m, s);
	        }
	
	        // 秒倒计时
	        diff = diff - 1000;
	      }
	      // 立即执行
	      loop();
	
	      this.timer = setInterval(loop, 1000);
	    },
	    stop: function stop() {
	      clearInterval(this.timer);
	    }
	  };
	
	  return Handler.init.apply(Handler, args);
	}
	
	module.exports = clockTick;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 全角字符转半角字符
	 * by tommyshao
	 * 2016-07-06
	 */
	
	var $ = __webpack_require__(2);
	var toggle = '[data-toggle="dbc2sbc"]';
	
	var hash = { '12288': ' ' };
	
	//。．，；：？！……—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％
	//.,;:?!…-~()[]{}<>''""123456789/\!@#$%
	var chars = {
	    dbc: '。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％',
	    sbc: '..,;:?!-~()[]{}<>\'\'""1234567890/\@#$%'
	};
	
	// 全角转半角
	function dbc2sbc(str) {
	    var ret = [],
	        i = 0,
	        len = str.length,
	        code,
	        chr;
	    for (; i < len; ++i) {
	        code = str.charCodeAt(i);
	        chr = hash[code];
	        if (!chr && code > 65280 && code < 65375) {
	            chr = hash[code] = String.fromCharCode(code - 65248);
	        }
	        ret[i] = chr ? chr : str.charAt(i);
	    }
	    return ret.join('').replace(/[。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％]/g, sbc).replace('……', '…');
	}
	
	function sbc(match) {
	    if (match) {
	        var i = chars.dbc.indexOf(match);
	        return chars.sbc.charAt(i) ? chars.sbc.charAt(i) : match;
	    }
	}
	
	// 全局绑定插件
	$(function () {
	    $(document).on('keyup.util.dbc2sbc', toggle, function () {
	        var thisVal = $.trim($(this).val());
	        var filterVal = dbc2sbc(thisVal);
	        $(this).val(filterVal);
	    });
	});
	
	module.exports = dbc2sbc;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 文本框当前光标插入文字
	 * by tommyshao
	 * 2016-07-06
	 */
	
	function insertTextAtCaret(elem, text) {
	  var sel, startPos, endPos, scrollTop;
	
	  if (!!elem) {
	    if (document.selection) {
	      elem.focus();
	      sel = document.selection.createRange();
	      sel.text = text;
	      elem.focus();
	    } else if (typeof elem.selectionStart === 'number') {
	      startPos = elem.selectionStart;
	      endPos = elem.selectionEnd;
	      scrollTop = elem.scrollTop;
	
	      elem.value = elem.value.substring(0, startPos) + text + elem.value.substring(endPos, elem.value.length);
	      elem.focus();
	      elem.selectionStart = startPos + text.length;
	      elem.selectionEnd = startPos + text.length;
	      elem.scrollTop = scrollTop;
	    } else {
	      elem.value += text;
	      elem.focus();
	    }
	  }
	}
	
	module.exports = insertTextAtCaret;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 计算两个日期相隔多少天
	 * by tommyshao
	 * 2016-07-06
	 */
	
	var zeroPad = __webpack_require__(12);
	
	var dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	
	var dayDiff = function dayDiff(start, end) {
	  var sArr = [],
	      eArr = [],
	      sTime = 0,
	      eTime = 0,
	      diff = 0;
	  if (dateReg.test(start) && dateReg.test(end)) {
	    sArr = start.split('-');
	    eArr = end.split('-');
	
	    sTime = new Date(sArr[0], parseInt(sArr[1], 10) - 1, sArr[2], 0, 0, 0);
	    eTime = new Date(eArr[0], parseInt(eArr[1], 10) - 1, eArr[2], 0, 0, 0);
	
	    diff = Math.floor((eTime - sTime) / (24 * 60 * 60 * 1000));
	
	    return diff;
	  } else {
	    throw new Error('start or end param is legal date formatter');
	  }
	
	  return null;
	};
	
	module.exports = dayDiff;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 计算某时间多少天后的日期
	 * by tommyshao
	 * 2016-07-06
	 */
	
	var zeroPad = __webpack_require__(12);
	
	/**
	 * 时间间隔计算
	 * @param  {string} d      时间字符串，一般都是xxxx-xx-xx格式
	 * @param  {int} diff   间隔天数
	 * @param  {String} prefix 连接字符串，默认是“-”
	 * @return {String}     计算后的时间 xxxx-xx-xx
	 */
	var dateDiff = function dateDiff(d, diff, prefix) {
	  var date = new Date(d),
	      diffDay = date.getTime() + 24 * 60 * 60 * 1000 * diff,
	      dd = new Date(diffDay);
	
	  prefix = prefix || '-';
	
	  return [dd.getFullYear(), zeroPad(dd.getMonth() + 1), zeroPad(dd.getDate())].join(prefix);
	};
	
	module.exports = dateDiff;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * 金额按千分位格式化
	 * @param  {number|string} num     格式化数字或字符
	 * @param  {int} decimal 小数点的位数，默认为2位
	 * @return {string}       格式化后的字符串
	 * @author : tommyshao
	 * @created: 2016-07-06
	 */
	var currency = function currency(num, decimal) {
	  decimal = decimal || 2;
	  var n = Number(num),
	      parts;
	
	  if (!isNaN(n)) {
	    n = Number(num).toFixed(decimal);
	
	    parts = n.split('.');
	
	    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + (parts[1] || '');
	  }
	
	  return num;
	};
	
	/*
	function currency(num, prefix) {
	  var options = { style: 'currency', currency: 'CNY'}
	  return prefix ? num.toLocaleString('zh-CN', options) : num.toLocaleString('zh-CN', options).replace('￥', '')
	}
	*/
	
	module.exports = currency;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=brickPlus.js.map