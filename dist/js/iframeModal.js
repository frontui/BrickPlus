/*! 
*  BrickPlus v1.0.1
*  by fronui team
*  updated on 2016-09-27
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.iframeModal=e(require("jquery")):t.iframeModal=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}({0:function(t,e,i){t.exports=i(16)},1:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;e>n;n++)i[n-1]=arguments[n];if(!(0,r["default"])(this).length&&t&&/^#(\w*)/gi.test((0,r["default"])(this).selector)){var a=void 0,o=void 0;"string"==typeof t&&(o=t,t={title:"标题",content:""}),t.mid=(0,r["default"])(this).selector.replace(/^#/g,"");var s=u.render(t);return s.data("bp.modal",a=new u(s,t)),"string"==typeof o&&"function"==typeof a[o]&&a[o].apply(a,i),"function"==typeof t.callback&&t.callback.call(s),a.show(),s}return(0,r["default"])(this).each(function(){var e=(0,r["default"])(this),n=e.data("bp.modal"),a=r["default"].extend({},u.DEFAULTS,e.data(),r["default"].isPlainObject(t)?t:{});n||e.data("bp.modal",n=new u(e,a)),"string"==typeof t?"function"==typeof n[t]&&n[t].apply(n,i):r["default"].isPlainObject(t)&&(t.title&&n.setTitle(t.title),t.content&&n.setContent(t.content),n.show(i))})}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),l=i(2),r=n(l);i(3);var d='[data-toggle="modal"]',u=function(){function t(e,i){a(this,t),this.el=(0,r["default"])(e),this.props=r["default"].extend({},t.DEFAULTS,i),this.$body=(0,r["default"])(document.body),this.$dialog=this.el.find(".modal-wrap"),this.$backdrop=null,this.isShown=!1,this.originalBodyPad=null,this.scrollbarWidth=0,this.size=this.props.size,this.setSize(this.size,!0),this.props.remote&&this.el.find(".modal-body").load(this.props.remote,r["default"].proxy(function(){this.el.trigger("loaded.bp.modal")},this))}return s(t,[{key:"toggle",value:function(t){return this.isShown?this.hide():this.show(t)}},{key:"show",value:function(e){var i=this,n=r["default"].Event("show.pb.modal",{reletedTarget:e});if(!this.isShown&&!n.isDefaultPrevented()){this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.el.on("click.dismiss.pb.modal",'[data-dismiss="modal"], .modal-close',r["default"].proxy(this.hide,this));var a=r["default"].support.transition;this.el.addClass("in").scrollTop(0).attr("tabindex",-1),this.$dialog.addClass("bounceInDown"),this.adjustDialog(),a&&this.el[0].offsetWidth,this.enforceFocus(),a?this.el.attr("aria-hidden",!1).one("uiTransitionEnd",function(){return i.el.trigger("focus").trigger(n)}).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.attr("aria-hidden",!0).fadeIn(t.TRANSITION_DURATION,function(){return i.el.trigger("focus").trigger(n)})}}},{key:"hide",value:function(e){var i=this;e&&e.preventDefault(),(this.el.is(":visible")||this.isShown)&&(this.isShown=!1,this.escape(),(0,r["default"])(document).off("focusin.pb.modal").off("keydown.bp.modal"),this.el.attr("aria-hidden",!0).off("click.dismiss.pb.modal").off("mouseup.dismiss.pb.modal"),this.$dialog.off("mousedown.dismiss.bp.modal"),r["default"].support.transition?this.el.one("uiTransitionEnd",r["default"].proxy(this.hideModal,this)).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.fadeOut(t.TRANSITION_DURATION,function(){return i.hideModal()}))}},{key:"escape",value:function(){var t=this;this.isShown&&this.props.keyboard?this.el.on("keydown.dismiss.bp.modal",function(e){27===e.which&&t.hide()}):this.isShown||this.el.off("keydown.dismiss.bp.modal")}},{key:"hideModal",value:function(){var t=r["default"].Event("hide.bp.modal",{reletedTarget:this.el});this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$dialog.removeClass("bounceInDown"),this.el.removeClass("in").trigger(t)}},{key:"handleUpdate",value:function(){this.ajustDialog()}},{key:"adjustDialog",value:function(){var t=this.el[0].scrollHeight>document.documentElement.clientHeight;this.el.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})}},{key:"resetAdjustments",value:function(){this.el.css({paddingLeft:"",paddingRight:""})}},{key:"enforceFocus",value:function(){var t=this;(0,r["default"])(document).off("focusin.bp.modal").on("focusin.bp.modal",function(e){t.el[0]===e.target||t.el.has(e.target).length||t.$dialog.trigger("focus")})}},{key:"checkScrollbar",value:function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()}},{key:"setScrollbar",value:function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)}},{key:"resetScrollbar",value:function(){this.$body.css("padding-right",this.originalBodyPad)}},{key:"measureScrollbar",value:function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body[0].appendChild(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e}},{key:"setContent",value:function(t){var e=this.el.find(".modal-body");e.length&&e.html(t||"")}},{key:"setTitle",value:function(t){var e=this.el.find(".modal-title");e.length&&e.html(t||"")}},{key:"setSize",value:function(t,e){if(this.size!==t||e){for(var i=this.el.attr("class").split(" "),n=0,a=[];n<i.length;n++)-1===i[n].indexOf("-modal")&&a.push(i[n]);t&&a.push(t+"-modal"),this.el.attr("class",a.join(" "))}}}]),t}();e["default"]=u,u.TRANSITION_DURATION=150,u.DEFAULTS={backdrop:!0,keyboard:!0,show:!0,size:!1},u.TEMPLATE='\n    <div class="modal-background fade" id="{{mid}}">\n        <div class="modal-layer">\n            <div class="modal-position">\n            <div class="modal-wrap animated bounceInDown">\n                <div class="modal-head">\n                    <span class="modal-title">{{title}}</span>\n                    <i class="modal-close"></i>\n                </div>\n                <div class="modal-body">\n                {{content}}\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n',u.render=function(t){var e=(0,r["default"])(document.body),i=void 0;return r["default"].isPlainObject(t)&&(i=u.TEMPLATE.replace(/{{(\w*)}}/gi,function(e,i){var n=t[i];return n&&"string"==typeof n?/^(\.|#)\w*/gi.test(n)?(0,r["default"])(n).html():n:n&&n instanceof r["default"]&&n.length>0?n.html():void 0}),i=(0,r["default"])(i).appendTo(e)),i},r["default"].fn.modal=o,r["default"].fn.modal.Constructor=u,r["default"].closeModal=function(t){(0,r["default"])(t).modal("hide")};var f=function(t){var e=(0,r["default"])(this),i=e.attr("href"),n=(0,r["default"])(e.attr("data-target"))||i&&i.replace(/.*(?=#[^\s]+$)/,"");o.call(n,"show",this)};(0,r["default"])(function(){(0,r["default"])(document).on("click.bp.modal",d,function(t){f.call(t.target,t)})})},2:function(e,i){e.exports=t},3:function(t,e,i){"use strict";function n(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}var a=i(2);a.fn.emulateTransitionEnd=function(t){var e=!1,i=this;a(this).one("uiTransitionEnd",function(){e=!0});var n=function(){e||a(i).trigger(a.support.transition.end)};return setTimeout(n,t),this},a(function(){a.support.transition=n(),a.support.transition&&(a.event.special.uiTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(t){return a(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})}),t.exports=n},16:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(2),l=n(s),r=i(1),d=(n(r),function(){function t(e,i,n){a(this,t),this.el=(0,l["default"])(e),this.props=i,this.next=n,this.dialog=this.get(e),this.showModal(i)}return o(t,[{key:"showModal",value:function(t){var e=this;t.show=!1,t.content="",t.callback=function(){e.dialog=(0,l["default"])(this),e.$dom=(0,l["default"])(this),t&&t.url&&(e.originalUrl=t.url,e.init(),"function"==typeof e.next&&e.next.call(e,e.$dom))},e.dialog.modal(t)}},{key:"init",value:function(t){var e=this.$dom.find(".modal-body");this.$title=this.$dom.find(".modal-title"),this.$iframe=(0,l["default"])("<iframe />"),t=this.getUrl(t),this.$iframe.attr({src:t||this.originalUrl,width:this.props.width||"100%",height:this.props.height||"100%",allowtransparency:"yes",frameborder:"no",scrolling:"no"}).on("load",l["default"].proxy(this.adjustHeight,this)),e.empty().append(this.$iframe)}},{key:"setProp",value:function(t){t.title&&this.$title.html(t.title),t.url&&(this.$iframe[0].src=t.url)}},{key:"getUrl",value:function(t){return this.props.cache||(t=t?t:this.originalUrl,t=t.indexOf("?")>-1?t+"&t="+1*new Date:t+"?t="+1*new Date),t}},{key:"setUrl",value:function(t){t=this.getUrl(t),this.$iframe.attr({src:t})}},{key:"adjustHeight",value:function(){var t,e;this.$iframe.css({height:"0px"});try{t=this.$iframe[0].contentWindow.frameElement}catch(i){}t&&(e=this.$iframe.contents().height(),this.$iframe.css({height:e+"px"}))}},{key:"show",value:function(){this.props.cache||this.setUrl(),this.dialog.modal("show")}},{key:"hide",value:function(){this.dialog.modal("hide")}},{key:"get",value:function(t){if(t&&t.frameElement){var e,i=t.frameElement,n=(0,l["default"])(".modal-background",t.parent.document);return n.each(function(t,n){var a=(0,l["default"])(n).find("iframe");a[0]===i&&(e=(0,l["default"])(n))}),e}return(0,l["default"])(t)}}]),t}());e["default"]=d,d.get=d.prototype.get,d.close=function(t){var e=d.get(t);(0,l["default"])(e).find(".modal-close").trigger("click"),(0,l["default"])(e).remove()},d.adjustHeight=function(t){var e,i,n=d.get(t),a=(0,l["default"])(n).find("iframe");try{e=a[0].contentWindow.frameElement}catch(o){}e&&(i=a.contents().height(),a.css({height:i+"px"}))},d.DEFAULTS={width:"100%",height:"100%",url:"",cache:!0},l["default"].fn.iframeModal=function(t){var e=(0,l["default"])(this),i=(0,l["default"])(this).selector;if(t=l["default"].extend({},d.DEFAULTS,t),(this[0]===window||this[0]===parent)&&"hide"==t)return void d.close(window);if(this[0]===window&&"adjustHeight"==t)return void d.adjustHeight(window);var n=e.data("bp.iframeModal");if(n?t&&t.url&&t.reset?n&&n.setUrl(t.url)&&n.show():(l["default"].isPlainObject(t)&&n.setProp(t),n&&n.show()):n=new d(i,t,function(t){(0,l["default"])(t).data("bp.iframeModal",this)}),"string"==typeof t){for(var a=arguments.length,o=Array(a>1?a-1:0),s=1;a>s;s++)o[s-1]=arguments[s];n[t]&&n[t](o)}},(0,l["default"])(function(){(0,l["default"])(document).on("click",'[data-toggle="iframeModal"]',function(t){t.preventDefault();var e=(0,l["default"])(this).attr("data-title")||"提示",i=(0,l["default"])(this).attr("data-url");i&&e&&(0,l["default"])("#iframe-modal").iframeModal({title:e,url:i})})})}})});