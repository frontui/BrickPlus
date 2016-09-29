/*! 
*  BrickPlus v1.0.4
*  by fronui team
*  updated on 2016-09-29
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.cookie=t():e.cookie=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(37)},37:function(e,t){"use strict";function n(e,t,n){n=n||{};var o=i(e)+"="+i(t);null==t&&(n.maxage=-1),n.maxage&&(n.expires=new Date(+new Date+n.maxage)),n.path&&(o+="; path="+n.path),n.domain&&(o+="; domain="+n.domain),n.expires&&(o+="; expires="+n.expires.toUTCString()),n.secure&&(o+="; secure"),document.cookie=o}function o(){var e;try{e=document.cookie}catch(t){return"undefined"!=typeof console&&"function"==typeof console.error&&console.error(t.stack||t),{}}return c(e)}function r(e){return o()[e]}function c(e){var t,n={},o=e.split(/ *; */);if(""==o[0])return n;for(var r=0;r<o.length;++r)t=o[r].split("="),n[u(t[0])]=u(t[1]);return n}function i(e){try{return encodeURIComponent(e)}catch(t){}}function u(e){try{return decodeURIComponent(e)}catch(t){}}e.exports=function(e,t,c){switch(arguments.length){case 3:case 2:return n(e,t,c);case 1:return r(e);default:return o()}}}})});