(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["brickPlus.Util"] = factory(require("jquery"));
	else
		root["brickPlus.Util"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(30);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

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

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports) {

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

/***/ },
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 31 */
/***/ function(module, exports) {

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
	};
	
	/**
	 * 获取正则对象
	 * @param  {Object} el 输入框
	 * @return RegExp 正则表达式
	 */
	function getPattern(el) {
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

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
	var ARR_CHINESE_NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	//["元", "拾", "佰", "仟", "万", "拾", "佰","仟", "亿", "拾", "佰", "仟", "万", "拾", "佰", "仟"];
	var ARR_CHINESE_UNIT = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万', '拾', '佰', '仟'];
	//["角", "分", "厘" ,"毫","丝","忽"];
	var ARR_CHINESE_DEC = ['角', '分', '厘', '毫', '丝', '忽'];
	
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
	      chineseDecimal.push(decimals[i] == 0 ? '零' : ARR_CHINESE_NUMBER[decimals[i]] + ARR_CHINESE_DEC[i]);
	    }
	    return chineseDecimal.join('').replace(/\u96F6{2,}/g, '零').replace(/\u96F6{1,}$/, '');
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
	  prefix: '人民币',
	  // 小数点位数
	  dec: 2,
	  // 后缀文字整
	  unit: '整'
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
	    str = str ? str : '零元';
	    //var thisVal = parseFloat(this.$el.val());
	    // 1 === 1.00
	    //str = (thisVal === parseInt(thisVal)) ? this.option.prefix+str+this.option.unit : this.option.prefix+str;
	    var dec = str.substr(-1, 1);
	    //console.log(dec === '元')
	    str = dec === '元' ? this.option.prefix + str + this.option.unit : this.option.prefix + str;
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

/***/ },
/* 33 */
/***/ function(module, exports) {

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

/***/ },
/* 34 */
/***/ function(module, exports) {

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

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 36 */
/***/ function(module, exports) {

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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 39 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=brickPlus.Util.js.map