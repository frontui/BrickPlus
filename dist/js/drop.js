/*! 
*  BrickPlus v1.0.4
*  by fronui team
*  updated on 2016-09-28
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.drop=t(require("jquery")):e.drop=t(e.jQuery)}(this,function(e){return function(e){function t(i){if(o[i])return o[i].exports;var s=o[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){e.exports=o(25)},2:function(t,o){t.exports=e},25:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),n=o(2),l=i(n),u=function(){function e(t,o,i){s(this,e),this.el=(0,l["default"])(t),this.toggleEl=o,this.props=l["default"].extend({event:"focus"},i),this.isShow=!1,this.dropEl=null,this.__createEl(),this.__initEvent(),this.__showTime=null}return r(e,[{key:"__initEvent",value:function(){var e=this;if(this.el&&"undefined"!=typeof this.el){this.props.toggle;"click"===this.props.event?(0,l["default"])(this.el).on("click.drop",l["default"].proxy(this.handlerToggle,this)):"hover"===this.props.event?(0,l["default"])(this.el).on("mouseenter.drop",l["default"].proxy(this.delayShow,this)).on("mouseleave.drop",l["default"].proxy(this.delayHide,this)):(0,l["default"])(this.el).on("focus.drop",l["default"].proxy(this.show,this)).on("blur.drop",l["default"].proxy(this.delayHide,this)),(0,l["default"])(document).on("click.hide.drop",function(t){return(0,l["default"])(t.target).is(e.toggleEl)?(t.stopPropagation(),!1):void e.hide()}),this.dropEl&&(this.dropEl.on("click.drop",function(t){clearTimeout(e.__showTime),t.stopPropagation()}),"hover"===this.props.event&&(this.dropEl.on("mouseenter",function(t){clearTimeout(e.__showTime)}),this.dropEl.on("mouseleave",l["default"].proxy(this.delayHide,this))))}}},{key:"__createEl",value:function(){this.dropEl||(this.dropEl=this.props.dropEl?(0,l["default"])(this.props.dropEl):(0,l["default"])('<div class="bp-drop" />'),this.props.parents?this.dropEl.appendTo((0,l["default"])(this.props.parents)):this.dropEl.appendTo((0,l["default"])(document.body)))}},{key:"__setPosition",value:function(){var e=this.el.offset(),t=this.el.outerHeight(!0);this.dropEl.css({top:e.top+t+"px",left:e.left+"px"})}},{key:"render",value:function(e){this.dropEl&&this.dropEl.empty().append(e)}},{key:"show",value:function(){this.isShow=!0,this.toggle()}},{key:"hide",value:function(){this.isShow=!1,this.toggle()}},{key:"handlerToggle",value:function(){this.isShow=!this.isShow,this.toggle()}},{key:"toggle",value:function(){this.dropEl&&(this.__setPosition(),this.dropEl.toggleClass("show",this.isShow))}},{key:"delayShow",value:function(){clearTimeout(this.__showTime),this.show()}},{key:"delayHide",value:function(){var e=this;clearTimeout(this.__showTime),this.__showTime=setTimeout(function(){return e.hide()},200)}}]),e}();t["default"]=u}})});