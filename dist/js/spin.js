/*! 
*  BrickPlus v1.1.4.1
*  by fronui team
*  updated on 2016-11-22
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.spin=e(require("jquery")):n.spin=e(n.jQuery)}(this,function(n){return function(n){function e(s){if(t[s])return t[s].exports;var i=t[s]={exports:{},id:s,loaded:!1};return n[s].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var t={};return e.m=n,e.c=t,e.p="",e(0)}({0:function(n,e,t){n.exports=t(21)},2:function(e,t){e.exports=n},21:function(n,e,t){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function a(n){for(var e=arguments.length,t=Array(e>1?e-1:0),s=1;e>s;s++)t[s-1]=arguments[s];return(0,o["default"])(this).each(function(){var e=(0,o["default"])(this),s=e.data("bp.spin"),i="string"==typeof n?{}:i;i=o["default"].extend({},i,e.data()),s||e.data("bp.spin",s=new u(e,i)),"string"==typeof n&&"function"==typeof s[n]&&s[n].apply(s,t)})}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function n(n,e){for(var t=0;t<e.length;t++){var s=e[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(e,t,s){return t&&n(e.prototype,t),s&&n(e,s),e}}(),p=t(2),o=s(p),l='.bp-spin,[data-toggle="spin"]',u=function(){function n(e,t){i(this,n),this.el=(0,o["default"])(e),this.props=o["default"].extend({},n.DEFAULTS,t?t:e),this.parentEl=this.props.parent?(0,o["default"])(this.props.parent):(0,o["default"])(document.body),this.props.btn?this._bindBtn():this._render()}return r(n,[{key:"_render",value:function(){var n='\n            <div class="page-spinner">\n                <div class="spinner-layer">\n                    <div class="spinner">\n                    <span class="one"></span>\n                    <span class="two"></span>\n                    <span class="three"></span>\n                    <span class="four"></span>\n                    <span class="five"></span>\n                    <span class="six"></span>\n                    </div>\n                </div>\n            </div>\n        ';this.el=(0,o["default"])(n),this.parentEl.append(this.el)}},{key:"_bindBtn",value:function(){this.el.length<0&&this.parentEl.append('<button class="btn default">查看更多<button>'),this.el.data("originText",this.el.html()),this.el.on("click",o["default"].proxy(this.spinning,this))}},{key:"spinning",value:function(){var n=o["default"].Event("spinning.bp");return this.props.btn?this.el.prop("disabled",!0).addClass("btn-spinner").html(this.props.text):(this.el.addClass("active"),this.parentEl.addClass("page-spinner-open")),this.el.trigger(n),this.el}},{key:"end",value:function(){this.props.btn?this.el.prop("disabled",!1).removeClass("btn-spinner").html(function(){return(0,o["default"])(this).data("originText")}):(this.parentEl.removeClass("page-spinner-open"),this.el.removeClass("active"))}},{key:"destroy",value:function(){this.el.removeData("bp.spin").remove()}}]),n}();e["default"]=u,u.DEFAULTS={btn:!1,text:"Loading...",parent:null},o["default"].fn.spin=a,o["default"].fn.spin.constructor=u,o["default"].Spin=u,(0,o["default"])(function(){(0,o["default"])(document).on("click.bp.spin",l,function(){(0,o["default"])(this).spin("spinning")})})}})});