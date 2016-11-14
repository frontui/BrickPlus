/*! 
*  BrickPlus v1.1.3
*  by fronui team
*  updated on 2016-11-14
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.carousel=e(require("jquery")):t.carousel=e(t.jQuery)}(this,function(t){return function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(9)},,function(e,i){e.exports=t},function(t,e,i){"use strict";function s(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}var n=i(2);n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("uiTransitionEnd",function(){e=!0});var s=function(){e||n(i).trigger(n.support.transition.end)};return setTimeout(s,t),this},n(function(){n.support.transition=s(),n.support.transition&&(n.event.special.uiTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){return n(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})}),t.exports=s},,,,,function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function n(t){var e=void 0,i=void 0,s=void 0;e=t.currentTarget.offsetWidth,i=t.currentTarget.offsetHeight,s={distX:t.distX,distY:t.distY,velocitX:t.velocitX,velocitY:t.velocitY,finger:t.finger},t.distX>t.distY?t.distX>-t.distY?(t.distX/e>p.threshold||t.velocityX*t.distX/e*p.sensitivity>1)&&(s.type="swiperight",d(t.currentTarget,s)):(-t.distY/i>p.threshold||t.velocityY*t.distY/e*p.sensitivity>1)&&(s.type="swipeup",d(t.currentTarget,s)):t.distX>-t.distY?(t.distY/i>p.threshold||t.velocityY*t.distY/e*p.sensitivity>1)&&(s.type="swipedown",d(t.currentTarget,s)):(-t.distX/e>p.threshold||t.velocityX*t.distX/e*p.sensitivity>1)&&(s.type="swipeleft",d(t.currentTarget,s))}function r(t){var e=a["default"].data(t,"event_swipe");return e||(e={count:0},a["default"].data(t,"event_swipe",e)),e}Object.defineProperty(e,"__esModule",{value:!0});var o=i(2),a=s(o),u=a["default"].event.add,l=a["default"].event.remove,d=function(t,e,i){a["default"].event.trigger(e,i,t)},p={threshold:.4,sensitivity:6};a["default"].event.special.swipe=a["default"].event.special.swipeleft=a["default"].event.special.swiperight=a["default"].event.special.swipeup=a["default"].event.special.swipedown={setup:function(t,e,i){return t=r(this),t.count++>0?void 0:(u(this,"moveend",n),!0)},teardown:function(){var t=r(this);if(!(--t.count>0))return l(this,"moveend",n),!0},settings:p},e["default"]=a["default"]},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){this.length;return this.each(function(i){var s=(0,u["default"])(this),n=s.data(),r=s.data("bp.carousel");r||(t=u["default"].extend({},t,n),r=(new d).init(s,t),s.data("bp.carousel",r)),e=u["default"].extend({},e,n),"string"==typeof t&&r[t]&&r[t](s,e)})}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),a=i(2),u=s(a);i(3),i(8);var l='[data-toggle="carousel"]',d=function(){function t(){n(this,t),this.el=null,this.items=null,this.sizes=[],this.max=[0,0],this.current=0,this.interval=null}return o(t,[{key:"init",value:function(e,i){return this.el=(0,u["default"])(e),this.ulEl=e.children("ul"),this.max=[e.outerWidth()||e.parent().outerWidth(),e.outerHeight()||e.parent().outerHeight()],this.items=this.ulEl.children("li").each(this.calculate(this)),this.props=u["default"].extend({},t.DEFAULTS,i),this.setup(),this}},{key:"calculate",value:function(t){return function(e){var i=(0,u["default"])(this),s=i.outerWidth(),n=i.outerHeight();t.sizes[e]=[s,n],s>t.max[0]&&(t.max[0]=s),n>t.max[1]&&(t.max[1]=n)}}},{key:"setup",value:function(){var t=this,e=u["default"].Event("init.bp.carousel",{relatedTarget:this.el});if(this.el.css({overflow:"hidden",width:this.max[0],height:this.max[1]}).toggleClass("csstransition",this.props.css3),this.ulEl.css({width:100*this.items.length+"%",position:"relative"}),this.items.css({width:100/this.items.length+"%"}),this.props.delay&&(this.start(),this.el.hover(u["default"].proxy(this.stop,this),u["default"].proxy(this.start,this))),this.props.keys&&(0,u["default"])(document).keydown(u["default"].proxy(this.keys,this)),this.props.dots&&this.dots(),this.props.fluid){var i=function(){t.el.css({width:Math.min(Math.round(t.el.width()/t.el.parent().width()*100),100)+"%"})};i(),(0,u["default"])(window).off("resize.bp.carousel").on("resize.bp.carousel",i)}this.props.arrows&&this.el.append('<p class="arrows"><span class="prev" title="'+this.props.prevText+'">'+this.props.prevText+'</span><span class="next" title="'+this.props.nextText+'">'+this.props.nextText+"</span></p>").find("span.prev").on("click",u["default"].proxy(this.prev,this)).end().find("span.next").on("click",u["default"].proxy(this.next,this)),this.props.prev&&(0,u["default"])(this.props.prev).off("click").on("click",u["default"].proxy(this.prev,this)),this.props.next&&(0,u["default"])(this.props.next).off("click").on("click",u["default"].proxy(this.next,this)),u["default"].event.swipe&&this.el.off("swipeleft.bp.carousel").on("swipeleft.bp.carousel",u["default"].proxy(this.prev,this)).off("swiperight.bp.carousel").on("swiperight.bp.carousel",u["default"].proxy(this.next,this)),this.el.trigger(e)}},{key:"move",value:function(t,e){var i=this;this.items.eq(t).length||(t=0),0>t&&(t=this.items.length-1);var s=this.items.eq(t),n={height:s.outerHeight()},r=e?5:this.props.speed,o=u["default"].Event("move.bp.carousel",{curIndex:t}),a=function(){i.current=t,i.props.complete(t,i.el),u["default"].isFunction(e)&&e(t,i.el)};this.el.find(".dot:eq("+t+")").addClass("active").siblings().removeClass("active"),u["default"].support.transition&&this.props.css3?this.ulEl.css(u["default"].extend({left:"-"+t+"00%"},n)).one("uiTransitionEnd",a).emulateTransitionEnd(r):this.ulEl.is(":animated")||this.ulEl.animate(n,r).trigger(o)&&this.ulEl.animate(u["default"].extend({left:"-"+t+"00%"},n),r,a)}},{key:"start",value:function(){var t=this;this.interval=setInterval(function(){return t.move(t.current+1)},this.props.delay)}},{key:"stop",value:function(){return this.interval=clearInterval(this.interval),this}},{key:"prev",value:function(t){return t&&t.preventDefault(),this.stop().move(this.current-1)}},{key:"next",value:function(t){return t&&t.preventDefault(),this.stop().move(this.current+1)}},{key:"dots",value:function(){var t='<ol class="dots">',e=this;u["default"].each(this.items,function(e){t+='<li class="dot'+(1>e?" active":"")+'">'+(e+1)+"</li>"}),t+="</ol>",this.el.addClass("has-dots").append(t).find(".dot").off("click").on("click",function(){e.move((0,u["default"])(this).index())})}},{key:"keys",value:function(t){var e=t.which,i={37:this.prev,39:this.nex,27:this.stop};"function"==typeof i[e]&&i[e]()}}]),t}();e["default"]=d,d.DEFAULTS={css3:!0,speed:300,delay:null,complete:u["default"].noop,keys:null,dots:null,fluid:!0,prev:null,next:null,arrows:!0,prevText:"&lt;",nextText:"&gt;"},u["default"].fn.carousel=r,u["default"].fn.carousel.Constructor=d,(0,u["default"])(function(){(0,u["default"])(l).carousel()})}])});