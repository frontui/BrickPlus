/*! 
*  BrickPlus v1.0.7
*  by fronui team
*  updated on 2016-10-12
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.tab=e(require("jquery")):t.tab=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return t[i].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){t.exports=n(23)},2:function(e,n){e.exports=t},3:function(t,e,n){"use strict";function i(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}var a=n(2);a.fn.emulateTransitionEnd=function(t){var e=!1,n=this;a(this).one("uiTransitionEnd",function(){e=!0});var i=function(){e||a(n).trigger(a.support.transition.end)};return setTimeout(i,t),this},a(function(){a.support.transition=i(),a.support.transition&&(a.event.special.uiTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(t){if(a(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})}),t.exports=i},23:function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){return o(this).each(function(){var e=o(this),n=e.data("bp.tab");n||e.data("bp.tab",n=new u(this)),"string"==typeof t&&n[t]&&n[t]()})}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(2);n(3);var s='[data-toggle="tab"],.tabs-btn',u=function(){function t(e){i(this,t),this.$el=o(e),this.VERSION="{{VERSION}}",this.TRANSITION_DURATION=150}return r(t,[{key:"show",value:function(){var t=this.$el,e=t.closest('.tabs,[data-tab="item"]'),n=t.data("target");n||(n=t.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,""));var i=e.find(".active a"),a=o.Event("hide.bp.tab",{relatedTarget:t[0]}),r=o.Event("show.bp.tab",{relatedTarget:i[0]}),s=o(n);i.trigger(a),t.trigger(r),r.isDefaultPrevented()||a.isDefaultPrevented()||(this.activate(t.closest('li,[data-tab="nav"]'),e),this.activate(s,s.parent(),function(){i.trigger({type:"hidden.bp.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bp.tab",relatedTarget:i[0]})}))}},{key:"activate",value:function(e,n,i){var a=n.find("> .active"),r=i&&o.support.transition&&(a.length&&a.hasClass("fade")||!!n.find("> .fade").length),u=function(){a.removeClass("active").find(s).attr("aria-expanded",!1),e.addClass("active").find(s).attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),i&&i()};a.length&&r?a.one("uiTransitionEnd",u).emulateTransitionEnd(t.TRANSITION_DURATION):u(),a.removeClass("in")}}]),t}();o.fn.tab=a,o.fn.tab.Constructor=u;var d=function(t){o(t.target).hasClass("tab-disabled")||(t.preventDefault(),a.call(o(this),"show"))};o(function(){o(document).on("click.bp.tab",s,d)}),t.exports=u}})});