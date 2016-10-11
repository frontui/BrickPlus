/*! 
*  BrickPlus v1.0.7
*  by fronui team
*  updated on 2016-10-11
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.dropdown=e(require("jquery")):t.dropdown=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}({0:function(t,e,o){t.exports=o(13)},2:function(e,o){e.exports=t},13:function(t,e,o){"use strict";function i(){s(h).filter(".active").removeClass("active").data("currentItem",-1).trigger("hide.bp.dropdown")}function n(t,e){var o=t.parent(),i=t.eq(e).position().top;o.scrollTop(i)}function r(t){var e=[].slice.call(arguments,1);return s(this).each(function(){var o=s(this),i=o.data("bp.dropdown"),n={};i||(n=s.extend({},"object"===("undefined"==typeof t?"undefined":l(t))?t:{},o.data()),o.data("bp.dropdown",i=new d(o,n))),"string"==typeof t&&"toggle"!==t&&i[t].apply(i,e)})}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},s=o(2),p=o(14),h=".form-control-dropdown",a='[data-toggle="dropdown"]',u=function(t,e){this.$el=s(t);var o=this.$el.attr("placeholder");this.$label=s('<label class="form-control-placeholder">'+(o||"请选择")+"</label>"),this.$el.before(this.$label)};u.prototype={toggle:function(){if(this.$el.length&&this.$label.length){var t=""===s.trim(this.$el.val());t?this.show():this.hide()}},show:function(){this.$label.show()},hide:function(){this.$label.hide()}};var d=function c(t,e){this.$el=s(t),this.options=s.extend({},c.DEFAULTS,e),this.$target=this.$el.find(this.options.text),this.$list=this.$el.find(this.options.list),this.$item=this.$list.find(this.options.item),this.$input=this.$el.find(this.options.input),this.Placeholder=new u(this.$input),this.isInput=/input/i.test(this.$target[0].tagName),!!this.options.multiple&&this.$el.addClass("multiple"),this.init(),this._setDefaultValue()};d.VERSION="{{VERSION}}",d.DEFAULTS={text:".form-control-dropdown-value,.form-control,.form-control-modal-value",input:".form-control-dropdown-input",placeholder:"label",list:"> ul",item:"li",multiSelected:".form-control-modal-ops",multiple:!1,separator:",",callback:s.noop,ajax:!1},d.prototype.init=function(){this.$el.on("click.bp.dropdown, focus.bp.dropdown",s.proxy(this.toggle,this)),this.isInput&&this.$target.on("keyup.bp.dropdown",p.throttle(this.filter(this),150)),this.$el.on("click.select.bp.dropdown",this.options.item,this.selected(this)),this.$el.on("click.remove.bp.dropdown",this.options.multiSelected,this.removeMultiItem(this)),this.$target.on("keydown.bp.dropdown",this.keydown(this))},d.prototype._setDefaultValue=function(){var t=this.$input.val()||this.$target.val(),e=this.$item;t&&""!==s.trim(t)&&(t=t.split(this.options.separator),t.forEach(function(t,o){e.filter('[title="'+t+'"]').trigger("click")})),this.Placeholder.toggle()},d.prototype.toggle=function(t){var e=this.$el.hasClass("active");return i(),t&&"undefined"!=typeof t.type?this.$el.toggleClass("active",!e).trigger(e?"hide.bp.dropdown":"show.bp.dropdown"):this.$el.toggleClass("active",t).trigger(t?"show.bp.dropdown":"hide.bp.dropdown"),this._setPosition(),this},d.prototype.filter=function(t){return function(e){var o=s.trim(s(this).val());t.$item.map(function(){var t=s(this).text();t.indexOf(o)>-1?s(this).show():s(this).hide()})}},d.prototype.keydown=function(t){return function(e){if(e.stopPropagation(),27===e.which)return void i();if(/(38|40|27|32|13|46|8)/.test(e.which)){var o=s(this),r=(t.$target,void 0===t.$el.data("currentItem")?-1:t.$el.data("currentItem"));t.show();var l=t.$item.filter(":visible");if(l.length){if(13==e.which&&l.filter(".hover").length)return void l.filter(".hover").trigger("click");var p=l.index(e.target)>-1?l.index(e.target):r;o.is(".disabled, :disabled")||o.is(".optgroup")?(38==e.which&&p>=0&&(p-=2),40==e.which&&p<l.length&&(p+=2),console.log(p)):(38==e.which&&p>=0&&p--,40==e.which&&p<l.length&&p++),p<0&&(p=l.length-1),p>=l.length&&(p=0),n(l,p),t.$el.data("currentItem",p),l.removeClass("hover").eq(p).addClass("hover")}}}},d.prototype.selected=function(t){return function(e){e.stopPropagation();var o=s(this);if(o.is(".disabled"))return e.preventDefault(),!1;t._highlight(o);var i=s.trim(o.attr("title")),n=o.html(),r=o.hasClass("hover");t.setValue(i,n,r),!t.options.multiple&&t.hide();var l=s.Event("selected.bp.dropdown");t.$el.trigger(l,[o,i])}},d.prototype._highlight=function(t){return this.options.multiple?s(t).toggleClass("hover"):s(t).addClass("hover").siblings().removeClass("hover"),this},d.prototype.setValue=function(t,e,o){return this.options.multiple?void this.setMultiValue(t,e,o):(this.$input.length&&this.$input.val(t?t:e),e=e?e.replace(/^(\t|\b|\n)$/,""):"",this.isInput?this.$target.val(t):this.$target.html(e),this.Placeholder.toggle(),this)},d.prototype.setMultiValue=function(t,e,o){this.$input.length||console.warn('必须添加<input type="hidden" name class="form-control-dropdown-input" />');var i=this.$target.find('div[rel="'+t+'"]'),n=this.$input.val(),r=this.options.separator,l=""===s.trim(n)?[]:n.split(r),p=-1;o?(i=s('<div class="form-control-modal-ops" rel="'+t+'">'+e+"</div>"),l.length>0?this.$target.append(i):this.$target.empty().append(i),l.push(t)):(p=s.inArray(t,l),p>-1&&l.splice(p,1),i.detach().remove()),this.$input.val(l.join(r)),this.Placeholder.toggle()},d.prototype.removeMultiItem=function(t){return function(e){e.preventDefault(),e.stopPropagation();var o=s(this).attr("rel"),i=t.$item.filter('[title="'+o+'"]');!!i.length&&t._highlight(i),t.setValue(o,o,!1)}},d.prototype.hide=function(){return this.toggle(!1),this},d.prototype.show=function(){return this.toggle(!0),this},d.prototype._setPosition=function(){var t=this.$el.offset(),e=s(window).scrollTop(),o=s(window).height(),i=this.$el.outerHeight(),n=this.$list.outerHeight(),r={top:"0"},l=!1;return t.top-e+i+n>o?(r.top=-n+"px",l=!0):(r.top=i+"px",l=!1),this.$list.css(r),this.$el.toggleClass("up",l),this},s.fn.dropdown=r,s.fn.dropdown.constructor=d,s(function(){s(h).dropdown(),s(document).on("click.bp.dropdown",h,function(t){r.call(s(this),"toggle",!0),t.stopPropagation()}),s(document).on("focus.bp.dropdown",a,function(t){var e=s(this).parents(h);!!e.length&&t.stopPropagation()&&r.call(e,"toggle",!0)}),s(document).on("click.hide.bp.dropdown",i)})},14:function(t,e){"use strict";var o={now:function(){var t=new Date;return t.now?t.now():t.getTime()},throttle:function(t,e,i){var n,r,l,s=null,p=0;i||(i={});var h=function(){p=i.leading===!1?0:o.now(),s=null,l=t.apply(n,r),s||(n=r=null)};return function(){var a=o.now();p||i.leading!==!1||(p=a);var u=e-(a-p);return n=this,r=arguments,u<=0||u>e?(clearTimeout(s),s=null,p=a,l=t.apply(n,r),s||(n=r=null)):s||i.trailling===!1||(s=setTimeout(h,u)),l}},debounce:function(t,e,i){var n,r,l,s,p,h=function a(){var h=o.now()-s;h<e&&h>0?n=setTimeout(a,e-h):(n=null,i||(p=t.apply(l,r),n||(l=r=null)))};return function(){l=this,r=arguments,s=o.now();var a=i&&!n;return n||(n=setTimeout(h,e)),a&&(p=t.apply(l,r),l=r=null),p}}};t.exports={throttle:o.throttle,debounce:o.debounce}}})});