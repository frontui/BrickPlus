/*! 
*  BrickPlus v1.0.4
*  by fronui team
*  updated on 2016-09-28
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.checkAll=t(require("jquery")):e.checkAll=t(e.jQuery)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}({0:function(e,t,r){e.exports=r(10)},2:function(t,r){t.exports=e},10:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(2),o='[data-toggle="checkAll"]',l=function(){function e(t){n(this,e),this.$el=c(t),this.$target=c(this.$el.data("target")),this.isReverse=Boolean(this.$el.data("reverse")),this.VERSION="1.0.4",this.initEvents()}return i(e,[{key:"initEvents",value:function(){this.$el.on("click",c.proxy(this.toggle,this))}},{key:"toggle",value:function(){this.isReverse?this.reverse():this.activate()}},{key:"activate",value:function(e){var t=e||this.$el.is(":checked"),r=c.Event("checked.bp.checkAll",{relatedTarget:this.$el});this.$target.prop("checked",t),this.$el.trigger(r)}},{key:"reverse",value:function(){var e=c.Event("reversed.bp.checkAll",{relatedTarget:this.$el});this.$target.map(function(){return c(this).prop("checked",function(){return!c(this).prop("checked")})}),this.$el.trigger(e)}}]),e}(),s=function(e){for(var t=this,r=arguments.length,n=Array(r>1?r-1:0),i=1;r>i;i++)n[i-1]=arguments[i];return c(this).each(function(){var r,i=c(t),o=c(t).data("bp.checkAll");o||(i.data("bp.checkAll",o=new l(t)),"toggle"===e&&o.toggle()),"string"==typeof e&&"toggle"!==e&&(r=o)[e].apply(r,n)})};c.fn.checkAll=s,c.fn.checkAll.Constructor=l,c(function(){c(document).on("click.checkAll",o,function(){c(this).checkAll("toggle")})}),e.exports=l}})});