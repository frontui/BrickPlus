/*! generator-frontman v0.1.2
*  by fronui team
*  (c) 2014-2016 www.frontpay.cn
* updated on 2016-07-25
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.BrickPlus=t(require("jquery")):e.BrickPlus=t(e.jQuery)}(this,function(e){return function(e){function t(r){if(o[r])return o[r].exports;var l=o[r]={exports:{},id:r,loaded:!1};return e[r].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function r(){return l(this).each(function(){var e=l(this),t=e.data("ui.placeholder");t||e.data("ui.placeholder",t=new n(this))})}var l=o(1),i=document.createElement("input"),c="placeholder"in i,n=function(e){var t=this;t.$el=l(e),this.init()};n.VERSION="{{VERSION}}",n.prototype.init=function(){if(!c){var e=this;if(this.$placeholder=e.$el.data("placeholder"),!c&&!this.$placeholder){var t=e.$el.attr("placeholder");e.$placeholder=l('<label class="form-control-placeholder" />').html(t),e.$el.data("placeholder",e.$placeholder).before(e.$placeholder)}e.$el.on("focus",l.proxy(this.focus,this)),e.$el.on("blur",l.proxy(this.blur,this)),e.$placeholder.on("click",l.proxy(this.focus,this)),this.blur()}},n.prototype.focus=function(){this.$placeholder.hide()},n.prototype.blur=function(){this.$placeholder[""===this.$el.val()?"show":"hide"]()},l.fn.placeholder=r,l.fn.placeholder.Constructor=n,l(function(){l("input[placeholder]").placeholder()}),e.exports=n},function(t,o){t.exports=e}])});