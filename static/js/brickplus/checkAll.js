/*! generator-frontman v0.1.2
*  by fronui team
*  (c) 2014-2016 www.frontpay.cn
* updated on 2016-07-18
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.BrickPlus=t(require("jquery")):e.BrickPlus=t(e.jQuery)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(1),c='[data-toggle="checkAll"]',l=function(){function e(t){n(this,e),this.$el=o(t),this.$target=o(this.$el.data("target")),this.isReverse=Boolean(this.$el.data("reverse")),this.VERSION="{{VERSION}}",this.initEvents()}return i(e,[{key:"initEvents",value:function(){this.$el.on("click",o.proxy(this.toggle,this))}},{key:"toggle",value:function(){this.isReverse?this.reverse():this.activate()}},{key:"activate",value:function(e){var t=e||this.$el.is(":checked"),r=o.Event("checked.ui.checkAll",{relatedTarget:this.$el});this.$target.prop("checked",t),this.$el.trigger(r)}},{key:"reverse",value:function(){var e=o.Event("reversed.ui.checkAll",{relatedTarget:this.$el});this.$target.map(function(){return o(this).prop("checked",function(){return!o(this).prop("checked")})}),this.$el.trigger(e)}}]),e}(),s=function(e){for(var t=this,r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return o(this).each(function(){var r,i=o(t),c=o(t).data("ui.checkAll");c||(i.data("ui.checkAll",c=new l(t)),"toggle"===e&&c.toggle()),"string"==typeof e&&"toggle"!==e&&(r=c)[e].apply(r,n)})};o.fn.checkAll=s,o.fn.checkAll.Constructor=l,o(function(){o(document).on("click.checkAll",c,function(){o(this).checkAll("toggle")})}),e.exports=l},function(t,r){t.exports=e}])});