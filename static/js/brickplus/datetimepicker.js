(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["datetimepicker"] = factory(require("jquery"));
	else
		root["datetimepicker"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(11);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
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

/***/ })
/******/ ])
});
;
//# sourceMappingURL=datetimepicker.js.map