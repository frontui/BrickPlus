/*! 
*  BrickPlus v1.0.13
*  by fronui team
*  updated on 2016-10-13
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.checkAll=t(require("jquery")):e.checkAll=t(e.jQuery)}(this,function(e){return function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}({0:function(e,t,r){e.exports=r(10)},2:function(t,r){t.exports=e},10:function(e,t,r){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),c=r(2),o='[data-toggle="checkAll"]',s=function(){function e(t){i(this,e),this.$el=c(t),this.$target=c(this.$el.data("target")),this.isReverse=Boolean(this.$el.data("reverse")),this.isNoCheckAll=Boolean(this.$el.data("nocheckall")),this.VERSION="1.0.13",this.initEvents()}return n(e,[{key:"initEvents",value:function(){this.$el.on("click",c.proxy(this.toggle,this)),!this.isReverse&&this.$target.on("change.status",c.proxy(this.targetToggle,this))}},{key:"toggle",value:function(){this.isReverse?this.reverse():this.activate()}},{key:"targetToggle",value:function(){if(this.isReverse)return!1;var e=!0;this.isNoCheckAll?(e=!1,this.$target.map(function(){if(c(this).prop("checked"))return e=!0,!1})):this.$target.map(function(){if(!c(this).prop("checked"))return e=!1,!1}),this.$el.prop("checked",e).trigger("change.status")}},{key:"activate",value:function(e){var t=[e||e===!1?e:this.$el.is(":checked"),c.Event("checked.bp.checkAll",{relatedTarget:this.$el})],r=t[0],i=t[1];this.$el.prop("checked",r),this.isNoCheckAll?!r&&this.$target.prop("checked",r):this.$target.prop("checked",r),this.$el.trigger(i)}},{key:"reverse",value:function(){var e=c.Event("reversed.bp.checkAll",{relatedTarget:this.$el});this.$target.map(function(){return c(this).prop("checked",function(){return!c(this).prop("checked")}).trigger("change.status")}),this.$el.trigger(e)}}]),e}(),l=function(e){for(var t=this,r=arguments.length,i=Array(r>1?r-1:0),n=1;n<r;n++)i[n-1]=arguments[n];return c(this).each(function(){var r,n=[c(t),c(t).data("bp.checkAll")],o=n[0],l=n[1];l||(o.data("bp.checkAll",l=new s(t)),"toggle"===e&&l.toggle()),"string"==typeof e&&"toggle"!==e&&(r=l)[e].apply(r,i)})};c.fn.checkAll=l,c.fn.checkAll.Constructor=s,c(function(){c(document).on("click.checkAll",":checkbox",function(e){c(o).map(function(){c(this).data("isCheckAllInited")||(e.target==this?c(this).checkAll("toggle"):c(this).checkAll(),c(this).data("isCheckAllInited",!0))})})}),e.exports=s}})});