/*! 
*  BrickPlus v1.0.9
*  by fronui team
*  updated on 2016-10-11
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.systemPage=e(require("jquery")):t.systemPage=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return t[i].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){t.exports=n(41)},2:function(e,n){e.exports=t},3:function(t,e,n){"use strict";function i(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}var a=n(2);a.fn.emulateTransitionEnd=function(t){var e=!1,n=this;a(this).one("uiTransitionEnd",function(){e=!0});var i=function(){e||a(n).trigger(a.support.transition.end)};return setTimeout(i,t),this},a(function(){a.support.transition=i(),a.support.transition&&(a.event.special.uiTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(t){if(a(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})}),t.exports=i},38:function(t,e){"use strict";function n(t,e,n){n=n||{};var i=r(t)+"="+r(e);null==e&&(n.maxage=-1),n.maxage&&(n.expires=new Date(+new Date+n.maxage)),n.path&&(i+="; path="+n.path),n.domain&&(i+="; domain="+n.domain),n.expires&&(i+="; expires="+n.expires.toUTCString()),n.secure&&(i+="; secure"),document.cookie=i}function i(){var t;try{t=document.cookie}catch(e){return"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e.stack||e),{}}return o(t)}function a(t){return i()[t]}function o(t){var e,n={},i=t.split(/ *; */);if(""==i[0])return n;for(var a=0;a<i.length;++a)e=i[a].split("="),n[u(e[0])]=u(e[1]);return n}function r(t){try{return encodeURIComponent(t)}catch(e){}}function u(t){try{return decodeURIComponent(t)}catch(e){}}t.exports=function(t,e,o){switch(arguments.length){case 3:case 2:return n(t,e,o);case 1:return a(t);default:return i()}}},39:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(2),u=i(r),s=function(){function t(e,n){a(this,t),this.el=(0,u["default"])(e),this.props=u["default"].extend({},t.DEFAULTS,n),this.originalText=this.el.html(),this.expand=this.props.expand,this._initEvent()}return o(t,[{key:"_initEvent",value:function(){var t=this;this.el.on("click",function(e){e.preventDefault();var n=(0,u["default"])(e.target),i=n.attr("data-text"),a=n.attr("data-active"),o=n.attr("data-target-active"),r=(0,u["default"])(n.attr("data-target"));t.expand=!t.expand,t.expand?(n.addClass(a).html(i),r.length&&r.addClass(o)):(n.removeClass(a).html(t.originalText),r.length&&r.removeClass(o)),t.props.callback()})}}]),t}();e["default"]=s,s.DEFAULTS={target:"",expand:!1,callback:u["default"].noop}},40:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(2),u=i(r);n(3);var s=function(){function t(e,n,i){a(this,t),this.el=(0,u["default"])(e),this.container=(0,u["default"])(n),this.props=u["default"].extend({},t.DEFAULTS,i),this.opened=this.props.opened,this.toggleCls=this.el.attr("data-active"),this.containerCls=this.el.attr("data-container-active"),this.props.autoHide&&this.autoBindEvent(),this.props.btn&&this.btnBindEvent()}return o(t,[{key:"autoBindEvent",value:function(){this.el.on("click",function(t){return t.stopPropagation()}),(0,u["default"])(document).on("click.close.rightPanel",u["default"].proxy(this.hide,this))}},{key:"btnBindEvent",value:function(){var t=this;(0,u["default"])(this.props.btn).on("click",function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})}},{key:"show",value:function(){this.toggle(!0)}},{key:"hide",value:function(){this.toggle(!1)}},{key:"toggle",value:function(e){var n=this;this.opened=void 0===e?!this.opened:e;var i=function(){n.el.toggleClass(n.toggleCls,n.opened),n.container.toggleClass(n.containerCls,n.opened),n.props.callback(n.opened)};u["default"].support.transition?(this.container[0].offsetWidth,this.container.one("uiTransitionEnd",i).emulateTransitionEnd(t.TRANSITION_DURATION)):"function"==typeof this.props.polyfill?this.props.polyfill(this.el,this.container,i):i()}}]),t}();e["default"]=s,s.DEFAULTS={autoHide:!1,opened:!1,btn:"",callback:u["default"].noop,polyfill:null},s.TRANSITION_DURATION=150},41:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),o=i(a),r=n(38),u=i(r),s=n(40),l=i(s),c=n(39),f=i(c),d={init:function(){this._leftAction(),this._rightAction(),this._initMenu(),this._expandMenu(),this._navigator(),this._changeSkin()},_leftAction:function(){this.leftPanel=new l["default"]('[data-toggle="leftPanel"]','[data-toggle="container"]',{btn:'[data-toggle="aside-switch"]',callback:function(t){var e=t?1:0;(0,u["default"])("bp.expendMenu",e,{maxage:31104e6})},polyfill:function(t,e,n,i){var a=n?"70px":"250px";e.animate({"margin-left":a},300,i)}})},_rightAction:function(){this.rightPanel=new l["default"]('[data-toggle="rightPanel"]','[data-toggle="container"]',{autoHide:!0,btn:'[data-toggle="assist-switch"]',polyfill:function(t,e,n,i){var a=n?"-220px":"0";e.find("> div").animate({"margin-left":a},300,i)}})},_initMenu:function(){var t=(0,u["default"])("bp.expendMenu");if(void 0===t){var e=(0,o["default"])(window).width();e<=1280&&this.leftPanel.show()}else this.leftPanel[1==t?"show":"hide"]()},_expandMenu:function(){(0,o["default"])('[data-toggle="expand"]').each(function(){var t=(0,o["default"])(this),e=t.data("bp.expand");e||t.data("bp.expand",e=new f["default"](t))})},_navigator:function(){var t=this;(0,o["default"])('[data-toggle="navigator"] li').on("click",function(e){e.stopPropagation();var n=(0,o["default"])(this);t.leftPanel.hide(),n.hasClass("current")?n.toggleClass("current").find(".current").removeClass("current"):(0,o["default"])(this).addClass("current").siblings().removeClass("current")})},_changeSkin:function(){var t=(0,o["default"])('[data-toggle="skin"]'),e=(0,o["default"])(t.attr("data-target"));t.on("click","li",function(t){t.preventDefault();var n=(0,o["default"])(this).attr("data-theme");e.attr("href",function(){return this.href.replace(/\/(.*)\.css/,"/$1-"+n+".css")})})}};(0,o["default"])(o["default"].proxy(d.init,d)),e["default"]=d}})});