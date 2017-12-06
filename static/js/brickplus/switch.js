(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["switch"] = factory(require("jquery"));
	else
		root["switch"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(22);


/***/ }),

/***/ 1:
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

/***/ 22:
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

/***/ 23:
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
	
	ModalLayer.TEMPLATE = '\n    <div class="result-wrap result-s result-vertical {{status}}">\n        <div class="result-box">\n            <div class="result-icon"></div>\n            <div class="result-content">\n                <div class="result-inner">\n                    <h1>\n                        {{contentTitle}}\n                    </h1>\n                    <div class="bp-modallayer-content fn-pt-15">\n                        {{content}}\n                    </div>\n                    <div class="bp-modallayer-btns plural-btns fn-pt-15 small-btn-gb">\n                        {{buttons}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';
	
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
	            btnHtml.push('<button type="button" class="' + (btns[i].style || 'btn primary') + '" data-index="' + i + '">' + btns[i].text + '</button>');
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
	        size: 'small',
	        title: config['title'],
	        contentTitle: config['contentTitle'], //2017-12-6 new custom contentTitle
	        content: config['content'],
	        buttons: [{
	            style: 'btn secondary ' + config['buttonClassName'], //2017-12-6 custom style
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
	        size: 'small',
	        title: config['title'],
	        content: config['content'] || '',
	        buttons: [{
	            text: '确定',
	            callback: config['callback']
	        }, {
	            href: 'javascript:void(0);',
	            text: '取消',
	            style: 'btn links'
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};
	
	_jquery2.default.alertModalLayer = function (config) {
	    if (!_jquery2.default.isPlainObject(config)) return;
	    var id = config['id'] ? config['id'] : '#bp-alertModalLayer';
	    return (0, _jquery2.default)(id).modalLayer({
	        icon: 'info',
	        size: 'small',
	        title: config['title'],
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
	        size: 'small',
	        title: config['title'],
	        content: config['content'],
	        buttons: [{
	            text: '确定',
	            style: 'btn thirdly',
	            callback: config['callback']
	        }],
	        isHideRemove: config['isHideRemove'] || false
	    });
	};

/***/ })

/******/ })
});
;
//# sourceMappingURL=switch.js.map