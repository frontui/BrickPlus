/*! 
*  BrickPlus v1.0.7
*  by fronui team
*  updated on 2016-10-11
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports["switch"]=e(require("jquery")):t["switch"]=e(t.jQuery)}(this,function(t){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){t.exports=n(22)},2:function(e,n){e.exports=t},22:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){for(var e=arguments.length,n=Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return(0,s["default"])(this).each(function(){var e,o=(0,s["default"])(this),r=o.data("bp.switch");r||o.data("bp.switch",r=new f(o,"string"==typeof t?{docClick:!0}:t)),"string"==typeof t&&"function"==typeof r[t]&&(e=r)[t].apply(e,n)})}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),u=n(2),s=o(u),a='.switch,[data-toggle="switch"]',f=function(){function t(e,n){r(this,t),this.el=(0,s["default"])(e),this.props=n,n.docClick||this.el.on("click",s["default"].proxy(this.toggle,this))}return c(t,[{key:"toggle",value:function(t){if(t&&t.preventDefault()&&t.stopPropagation(),!this.el.hasClass("disabled")){var e=this.el.hasClass("checked");this.el.toggleClass("checked",!e).trigger("checked.bp.switch",!e)}}}]),t}();e["default"]=f,s["default"].fn["switch"]=i,s["default"].fn["switch"].constructor=f,(0,s["default"])(function(){(0,s["default"])(document).on("click",a,function(){(0,s["default"])(this)["switch"]("toggle")})})}})});