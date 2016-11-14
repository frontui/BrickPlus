/*! 
*  BrickPlus v1.1.3
*  by fronui team
*  updated on 2016-11-14
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.timerPicker=e(require("jquery")):t.timerPicker=e(t.jQuery)}(this,function(t){return function(t){function e(o){if(i[o])return i[o].exports;var r=i[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}({0:function(t,e,i){t.exports=i(25)},2:function(e,i){e.exports=t},25:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t){return(0,p["default"])(this).each(function(){var e=(0,p["default"])(this),i=e.data("bp.tab");t=p["default"].extend({},t,e.data()),i||e.data("bp.tab",i=new v(this,t)),"string"==typeof t&&i[t]&&i[t]()})}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),u=function y(t,e,i){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,e);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:y(r,e,i)}if("value"in o)return o.value;var n=o.get;if(void 0!==n)return n.call(i)},h=i(2),p=o(h),c=i(26),d=o(c),f='[data-toggle="timer-picker"]',v=function(t){function e(t,i){r(this,e);var o=n(this,Object.getPrototypeOf(e).call(this,t,f,i));return o.props=p["default"].extend({},e.DEFAULTS,o.props),o.timer=["00","00","00"],o.props.hours||o.timer.shift(),o.props.second||o.timer.pop(),o.__init(),o.render(),o}return s(e,t),a(e,[{key:"__renderHH",value:function(){var t=24,e=[],i=this.timer[0],o="";12==this.props.h&&(t=12);for(var r=1;t>=r;r++)o=parseInt(i)===r?' class="active"':"",e.push('<li data-value="'+r+'"'+o+">"+r+"</li>");return e.join("")}},{key:"__renderMS",value:function(t){for(var e=60,i=[],o=this.props.unit,r=this.timer[t],n="",s=0;e>s;s++)n=parseInt(r)===s?' class="active"':"",o?s%o===0&&i.push('<li data-value="'+s+'"'+n+">"+s+"</li>"):i.push('<li data-value="'+s+'"'+n+">"+s+"</li>");return i.join("")}},{key:"__init",value:function(){var t=this.el.val(),e=[];t&&(e=t.split(this.props["char"]),e.length>0&&(this.timer=e))}},{key:"render",value:function(){var t="bp-drop",e='\n            <ul class="'+t+'-nav"></ul>\n            <div class="'+t+'-bd">\n            </div>\n        ';this.dropEl.append(e),this.navEl=this.dropEl.find("."+t+"-nav"),this.bodyEl=this.dropEl.find("."+t+"-bd"),this.$HH=(0,p["default"])('<ul class="'+t+'-list"></ul>'),this.$mm=this.$HH.clone(!0),this.$ss=this.$HH.clone(!0),this.props.hours&&(this.$HH.html(this.__renderHH()),this.navEl.append('<li class="active">'+this.props.in18[0]+"</li>"),this.bodyEl.append(this.$HH.addClass("active"))),this.props.minutes&&(this.$mm.html(this.__renderMS(1)),this.navEl.append("<li>"+this.props.in18[1]+"</li>"),this.bodyEl.append(this.$mm)),this.props.second&&(this.$ss.html(this.__renderMS(2)),this.navEl.append("<li>"+this.props.in18[2]+"</li>"),this.bodyEl.append(this.$ss)),this.__handlerPicker()}},{key:"__handlerPicker",value:function(){var t=this;this.$HH.on("click","li",function(e){return t.picker(0,e)}),this.$mm&&this.$mm.on("click","li",function(e){return t.picker(t.props.hours?1:0,e)}),this.$ss&&this.$ss.on("click","li",function(e){return t.picker(t.props.hours?2:1,e)}),this.navEl.on("click","li",p["default"].proxy(this.__tab,this))}},{key:"__tab",value:function(t){var e=this.navEl.children("li"),i=this.bodyEl.children("ul"),o=e.index(t.target);e.eq(o).addClass("active").siblings().removeClass("active"),i.eq(o).addClass("active").siblings().removeClass("active")}},{key:"picker",value:function(t,e){var i=(0,p["default"])(e.target),o=i.html(),r=this.navEl.children("li");this.timer.splice(t,1,10>o&&this.props.zero?"0"+o:o),i.addClass("active").siblings().removeClass("active"),this.el.val(this.timer.join(this.props["char"])),r.eq(t+1).length?r.eq(t+1).trigger("click"):this.hide()}},{key:"show",value:function(){var t=this.navEl.children("li");u(Object.getPrototypeOf(e.prototype),"show",this).call(this),t.eq(0).trigger("click")}}]),e}(d["default"]);e["default"]=v,v.DEFAULTS={"char":":",hours:!0,minutes:!0,second:!0,in18:["时","分","秒"],zero:!0},p["default"].fn.timerPicker=l,p["default"].fn.timerPicker.Constructor=v,(0,p["default"])(function(){(0,p["default"])(document).on("focus.timerpicker",f,function(){(0,p["default"])(this).timerPicker()})})},26:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),s=i(2),l=o(s),a=function(){function t(e,i,o){r(this,t),this.el=(0,l["default"])(e),this.toggleEl=i,this.props=l["default"].extend({event:"focus"},o),this.isShow=!1,this.dropEl=null,this.__createEl(),this.__initEvent(),this.__showTime=null}return n(t,[{key:"__initEvent",value:function(){var t=this;if(this.el&&"undefined"!=typeof this.el){this.props.toggle;"click"===this.props.event?(0,l["default"])(this.el).on("click.drop",l["default"].proxy(this.handlerToggle,this)):"hover"===this.props.event?(0,l["default"])(this.el).on("mouseenter.drop",l["default"].proxy(this.delayShow,this)).on("mouseleave.drop",l["default"].proxy(this.delayHide,this)):(0,l["default"])(this.el).on("focus.drop",l["default"].proxy(this.show,this)).on("blur.drop",l["default"].proxy(this.delayHide,this)),(0,l["default"])(document).on("click.hide.drop",function(e){return(0,l["default"])(e.target).is(t.toggleEl)?(e.stopPropagation(),!1):void t.hide()}),this.dropEl&&(this.dropEl.on("click.drop",function(e){clearTimeout(t.__showTime),e.stopPropagation()}),"hover"===this.props.event&&(this.dropEl.on("mouseenter",function(e){clearTimeout(t.__showTime)}),this.dropEl.on("mouseleave",l["default"].proxy(this.delayHide,this))))}}},{key:"__createEl",value:function(){this.dropEl||(this.dropEl=this.props.dropEl?(0,l["default"])(this.props.dropEl):(0,l["default"])('<div class="bp-drop" />'),this.props.parents?this.dropEl.appendTo((0,l["default"])(this.props.parents)):this.dropEl.appendTo((0,l["default"])(document.body)))}},{key:"__setPosition",value:function(){var t=this.el.offset(),e=this.el.outerHeight(!0);this.dropEl.css({top:t.top+e+"px",left:t.left+"px"})}},{key:"render",value:function(t){this.dropEl&&this.dropEl.empty().append(t)}},{key:"show",value:function(){this.isShow=!0,this.toggle()}},{key:"hide",value:function(){this.isShow=!1,this.toggle()}},{key:"handlerToggle",value:function(){this.isShow=!this.isShow,this.toggle()}},{key:"toggle",value:function(){this.dropEl&&(this.__setPosition(),this.dropEl.toggleClass("show",this.isShow))}},{key:"delayShow",value:function(){clearTimeout(this.__showTime),this.show()}},{key:"delayHide",value:function(){var t=this;clearTimeout(this.__showTime),this.__showTime=setTimeout(function(){return t.hide()},200)}}]),t}();e["default"]=a}})});