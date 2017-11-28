(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["tooltips"] = factory(require("jquery"));
	else
		root["tooltips"] = factory(root["jQuery"]);
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

	module.exports = __webpack_require__(27);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 27:
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

/***/ })

/******/ })
});
;
//# sourceMappingURL=tooltips.js.map