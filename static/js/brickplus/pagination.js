(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["pagination"] = factory(require("jquery"));
	else
		root["pagination"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(17);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 17:
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

/***/ })

/******/ })
});
;
//# sourceMappingURL=pagination.js.map