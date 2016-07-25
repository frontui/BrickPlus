/*! generator-frontman v0.1.2
*  by fronui team
*  (c) 2014-2016 www.frontpay.cn
* updated on 2016-07-25
*  Licensed under MIT
*/
 !function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?exports.Notify=o(require("jquery")):t.Notify=o(t.jQuery)}(this,function(t){return function(t){function o(s){if(i[s])return i[s].exports;var e=i[s]={exports:{},id:s,loaded:!1};return t[s].call(e.exports,e,e.exports,o),e.loaded=!0,e.exports}var i={};return o.m=t,o.c=i,o.p="",o(0)}([function(t,o,i){"use strict";function s(t){return e(this).on("click",function(){t="string"==typeof t?{message:t}:t;var o=new p(t);o.show()})}var e=i(1),n={},r={},u=function(t){return"string"==typeof t&&(t={message:t}),arguments[1]&&(t=e.extend(t,"string"==typeof arguments[1]?{status:arguments[1]}:arguments[1])),new p(t).show()},a=function(t,o){var i;if(t)for(i in r)t===r[i].group&&r[i].close(o);else for(i in r)r[i].close(o)},p=function c(t){this.timeout=!1,this.currentStatus="",this.group=!1,this.options=e.extend({},c.DEFAULTS,t),this.uuid="Notify_"+Math.random().toString(36).substr(2),this.$el=e(['<div class="notify-message">','<a class="notify-close">&times;</a>',"<div></div>","</div>"].join("")).data("ui.notify",this),this.content(this.options.message),this.options.status&&(this.$el.addClass("notify-message-"+this.options.status),this.currentStatus=this.options.status),this.group=this.options.group,r[this.uuid]=this,n[this.options.pos]||(n[this.options.pos]=e('<div class="notify notify-'+this.options.pos+'"></div>').appendTo(e("body")).on("click",".notify-message",function(){var t=e(this).data("ui.notify");t.$el.trigger("manualclose.ui.notify",[t]),t.close()}))};p.VERSION="1.0.0",p.DEFAULTS={message:"",status:"",opacity:.85,timeout:5e3,group:null,pos:"vcenter",onClose:function(){}},p.prototype.show=function(){if(!this.$el.is(":visible")){var t=this;n[this.options.pos].show().prepend(this.$el);var o=parseInt(this.$el.css("margin-bottom"),10);return this.$el.css({opacity:0,"margin-top":-1*this.$el.outerHeight(),"margin-bottom":0}).animate({opacity:this.options.opacity,"margin-top":0,"margin-bottom":o},function(){if(t.options.timeout){var o=function(){t.close()};t.timeout=setTimeout(o,t.options.timeout),t.$el.hover(function(){clearTimeout(t.timeout)},function(){t.timeout=setTimeout(o,t.options.timeout)})}}),this}},p.prototype.close=function(t){var o=this,i=function(){o.$el.remove(),n[o.options.pos].children().length||n[o.options.pos].hide(),o.options.onClose.apply(o,[]),o.$el.trigger("close.ui.notify",[o]),delete r[o.uuid]};this.timeout&&clearTimeout(this.timeout),t?i():this.$el.animate({opacity:0,"margin-top":-1*this.$el.outerHeight(),"margin-bottom":0},function(){i()})},p.prototype.content=function(t){var o=this.$el.find(">div");return t?(o.html(t),this):o.html()},p.prototype.status=function(t){return t?(this.$el.removeClass("nofity-message-"+this.currentStatus).addClass("notify-message-"+t),this.currentStatus=t,this):this.currentStatus},e.notify=u,e.notify.closeAll=a,e.fn.notify=s,e.fn.notify.Constructor=p},function(o,i){o.exports=t}])});