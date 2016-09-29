/*! 
*  BrickPlus v1.0.4
*  by fronui team
*  updated on 2016-09-29
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.transition=t(require("jquery")):n.transition=t(n.jQuery)}(this,function(n){return function(n){function t(e){if(i[e])return i[e].exports;var r=i[e]={exports:{},id:e,loaded:!1};return n[e].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=n,t.c=i,t.p="",t(0)}([function(n,t,i){n.exports=i(3)},,function(t,i){t.exports=n},function(n,t,i){"use strict";function e(){var n=document.createElement("ui"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==n.style[i])return{end:t[i]};return!1}var r=i(2);r.fn.emulateTransitionEnd=function(n){var t=!1,i=this;r(this).one("uiTransitionEnd",function(){t=!0});var e=function(){t||r(i).trigger(r.support.transition.end)};return setTimeout(e,n),this},r(function(){r.support.transition=e(),r.support.transition&&(r.event.special.uiTransitionEnd={bindType:r.support.transition.end,delegateType:r.support.transition.end,handle:function(n){return r(n.target).is(this)?n.handleObj.handler.apply(this,arguments):void 0}})}),n.exports=e}])});