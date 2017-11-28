(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["dataTable"] = factory(require("jquery"));
	else
		root["dataTable"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(29);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 10:
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

/***/ }),

/***/ 29:
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

/***/ })

/******/ })
});
;
//# sourceMappingURL=dataTable.js.map