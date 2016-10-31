/*! 
*  BrickPlus v1.1.2
*  by fronui team
*  updated on 2016-10-31
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?exports.Notify=o(require("jquery")):t.Notify=o(t.jQuery)}(this,function(t){return function(t){function o(e){if(i[e])return i[e].exports;var s=i[e]={exports:{},id:e,loaded:!1};return t[e].call(s.exports,s,s.exports,o),s.loaded=!0,s.exports}var i={};return o.m=t,o.c=i,o.p="",o(0)}([function(t,o,i){t.exports=i(4)},,function(o,i){o.exports=t},,function(t,o,i){"use strict";function e(t){return s(this).on("click",function(){t="string"==typeof t?{message:t}:t;var o=new c(t);o.show()})}var s=i(2),n={},r={},u=function(t){return"string"==typeof t&&(t={message:t}),arguments[1]&&(t=s.extend(t,"string"==typeof arguments[1]?{status:arguments[1]}:arguments[1])),new c(t).show()},p=function(t,o){var i;if(t)for(i in r)t===r[i].group&&r[i].close(o);else for(i in r)r[i].close(o)},c=function a(t){this.timeout=!1,this.currentStatus="",this.group=!1,this.options=s.extend({},a.DEFAULTS,t),this.uuid="Notify_"+Math.random().toString(36).substr(2),this.$el=s(['<div class="notify-message">','<a class="notify-close">&times;</a>',"<div></div>","</div>"].join("")).data("bp.notify",this),this.content(this.options.message),this.options.status&&(this.$el.addClass("notify-message-"+this.options.status),this.currentStatus=this.options.status),this.group=this.options.group,r[this.uuid]=this,n[this.options.pos]||(n[this.options.pos]=s('<div class="notify notify-'+this.options.pos+'"></div>').appendTo(s("body")).on("click",".notify-message",function(){var t=s(this).data("bp.notify");t.$el.trigger("manualclose.bp.notify",[t]),t.close()}))};c.VERSION="1.0.0",c.DEFAULTS={message:"",status:"",opacity:.95,timeout:5e3,group:null,pos:"vcenter",onClose:s.noop,compelete:s.noop,icon:""},c.ICONS={info:"icon-info-outline",success:"icon-done",warning:"icon-error_outline",error:"icon-highlight_remove"},c.prototype.show=function(){if(!this.$el.is(":visible")){var t=this;n[this.options.pos].show().prepend(this.$el);var o=parseInt(this.$el.css("margin-bottom"),10);return this.$el.css({opacity:0,"margin-top":-1*this.$el.outerHeight(),"margin-bottom":0}).animate({opacity:this.options.opacity,"margin-top":0,"margin-bottom":o},function(){if(t.options.timeout){var o=function(){t.close()};t.timeout=setTimeout(o,t.options.timeout),t.$el.hover(function(){clearTimeout(t.timeout)},function(){t.timeout=setTimeout(o,t.options.timeout)})}}),this}},c.prototype.close=function(t){var o=this,i=function(){o.$el.remove(),n[o.options.pos].children().length||n[o.options.pos].hide(),o.options.onClose.apply(o,[]),o.$el.trigger("close.bp.notify",[o]),delete r[o.uuid],"function"==typeof o.options.compelete&&o.options.compelete(o.$el)};this.timeout&&clearTimeout(this.timeout),t?i():this.$el.animate({opacity:0,"margin-top":-1*this.$el.outerHeight(),"margin-bottom":0},function(){i()})},c.prototype.content=function(t){var o=this.$el.find(">div");return t?(this.options.icon&&(t='<div class="notify-bfc"><i class="'+c.ICONS[this.options.icon]+'"></i> <div>'+t+"</div></div>"),o.html(t),this):o.html()},c.prototype.status=function(t){return t?(this.$el.removeClass("nofity-message-"+this.currentStatus).addClass("notify-message-"+t),this.currentStatus=t,this):this.currentStatus},s.notify=u,s.notify.closeAll=p,s.fn.notify=e,s.fn.notify.Constructor=c}])});