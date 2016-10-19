/*! 
*  BrickPlus v1.0.16
*  by fronui team
*  updated on 2016-10-19
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.validator=t(require("jquery")):e.validator=t(e.jQuery)}(this,function(e){return function(e){function t(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return e[s].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}({0:function(e,t,i){e.exports=i(28)},2:function(t,i){t.exports=e},28:function(e,t,i){"use strict";i(2);!function(e){function t(i,s){function n(){a._init(a.$el[0],s)}var a=this;return a instanceof t?(a.$el=e(i),void(a.$el.length?t.loading?e(window).on("validatorready",n):n():Q(i)&&(Y[i]=s))):new t(i,s)}function i(e,t){if(W(e)){var s,a=t?t===!0?this:t:i.prototype;for(s in e)f(s)&&(a[s]=n(e[s]))}}function s(e,t){if(W(e)){var i,n=t?t===!0?this:t:s.prototype;for(i in e)n[i]=e[i]}}function n(t){switch(e.type(t)){case"function":return t;case"array":var i=function(e){return t.msg=t[1],t[0].test(G(e))||t[1]||!1};return i.msg=t[1],i;case"regexp":return function(e){return t.test(G(e))}}}function a(t){var i,s,n;if(t&&t.tagName){switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":case"BUTTON":case"FIELDSET":i=t.form||e(t).closest("."+b);break;case"FORM":i=t;break;default:i=e(t).closest("."+b)}for(s in Y)if(e(i).is(s)){n=Y[s];break}return e(i).data(h)||e(i)[h](n).data(h)}}function r(e,t){var i=U(J(e,M+"-"+t));if(i)return i=new Function("return "+i)(),i?n(i):void 0}function l(e,t,i){var s=t.msg,n=t._r;return W(s)&&(s=s[n]),Q(s)||(s=J(e,C+"-"+n)||J(e,C)||(i?Q(i)?i:i[n]:"")),s}function o(e){var t;return e&&(t=I.exec(e)),t&&t[0]}function u(e){if(Q(e)||W(e)&&("error"in e||"ok"in e))return e}function d(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}function c(e){return Date.parse(e.replace(/\.|\-/g,"/"))}function f(e){return/^\w+$/.test(e)}function g(e){return"#"===e.charAt(0)?e.replace(/(:|\.|\[|\])/g,"\\$1"):'[name="'+e+'"]:input'}var p,m,h="validator",v="."+h,y=".rule",_=".field",w=".form",b="nice-"+h,k="msg-box",x="aria-required",$="aria-invalid",M="data-rule",C="data-msg",O="data-tip",V="data-ok",j="data-timely",A="data-target",F="data-display",q="data-must",E="novalidate",T=":verifiable",R=/(&)?(!)?\b(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\|)?/g,S=/(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,N=/(?:([^:;\(\[]*):)?(.*)/,D=/[^\x00-\xff]/g,I=/top|right|bottom|left/,B=/(?:(cors|jsonp):)?(?:(post|get):)?(.+)/i,L=/[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gim,z=e.noop,H=e.proxy,U=e.trim,P=e.isFunction,Q=function(e){return"string"==typeof e},W=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},X=document.documentMode||+(navigator.userAgent.match(/MSIE (\d+)/)&&RegExp.$1),J=function(e,t,i){return e&&e.tagName?void 0===i?e.getAttribute(t):void(null===i?e.removeAttribute(t):e.setAttribute(t,""+i)):null},G=function(t){return e(t).val()},K=window.console||{log:z,info:z},Y={},Z={debug:0,timely:1,theme:"default",ignore:"",focusInvalid:!0,beforeSubmit:z,msgWrapper:"span",msgMaker:function(t){var i;return i='<span role="alert" class="msg-wrap n-'+t.type+'">'+t.arrow,t.result?e.each(t.result,function(e,s){i+='<span class="n-'+s.type+'">'+t.icon+'<span class="n-msg">'+s.msg+"</span></span>"}):i+=t.icon+'<span class="n-msg">'+t.msg+"</span>",i+="</span>"},msgArrow:"",msgIcon:'<span class="n-icon"></span>',msgClass:"",validClass:"n-valid",invalidClass:"n-invalid"},ee={"default":{formClass:"n-default",msgClass:"n-right"}};e.fn[h]=function(i){var s=this,n=arguments;return s.is(":input")?s:(!s.is("form")&&(s=this.find("form")),!s.length&&(s=this),s.each(function(){var s=e(this).data(h);if(s)if(Q(i)){if("_"===i.charAt(0))return;s[i].apply(s,Array.prototype.slice.call(n,1))}else i&&(s._reset(!0),s._init(this,i));else new t(this,i)}),this)},e.fn.isValid=function(e,t){var i,s,n=a(this[0]),r=P(e);return!n||(n.checkOnly=!!t,s=n.options,i=n._multiValidate(this.is(":input")?this:this.find(T),function(t){t||!s.focusInvalid||n.checkOnly||n.$el.find("["+$+"]:first").focus(),r&&(e.length?e(t):t&&e()),n.checkOnly=!1}),r?this:i)},e.expr[":"].verifiable=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&!{submit:1,button:1,reset:1,image:1}[e.type]||"select"===t||"textarea"===t)&&e.disabled===!1},e.expr[":"].filled=function(e){return!!U(G(e))},t.prototype={_init:function(t,n){var a,r,l,u=this;P(n)&&(n={valid:n}),n=n||{},l=J(t,"data-"+h+"-option"),l=l&&"{"===l.charAt(0)?new Function("return "+l)():{},r=ee[n.theme||l.theme||Z.theme],a=u.options=e.extend({},Z,r,u.options,n,l),u.rules=new i(a.rules,(!0)),u.messages=new s(a.messages,(!0)),u.elements=u.elements||{},u.deferred={},u.errors={},u.fields={},u._initFields(a.fields),u.msgOpt={type:"error",pos:o(a.msgClass),wrapper:a.msgWrapper,cls:a.msgClass,style:a.msgStyle,arrow:a.msgArrow,icon:a.msgIcon,show:a.msgShow,hide:a.msgHide},Q(a.target)&&u.$el.find(a.target).addClass("msg-container"),u.$el.data(h)||(u.$el.data(h,u).addClass(b+" "+a.formClass).on("submit"+v+" validate"+v,H(u,"_submit")).on("reset"+v,H(u,"_reset")).on("showmsg"+v,H(u,"_showmsg")).on("hidemsg"+v,H(u,"_hidemsg")).on("focusin"+v+" click"+v,T,H(u,"_focusin")).on("focusout"+v+" validate"+v,T,H(u,"_focusout")),a.timely&&u.$el.on("keyup"+v+" input"+v+" compositionstart compositionend",T,H(u,"_focusout")).on("click"+v,":radio,:checkbox","click",H(u,"_focusout")).on("change"+v,'select,input[type="file"]',"change",H(u,"_focusout")),u._novalidate=J(t,E),J(t,E,E))},_guessAjax:function(t){var i=this;if(!(i.isAjaxSubmit=!!i.options.valid)){var s=(e._data||e.data)(t,"events");s&&s.valid&&e.map(s.valid,function(e){return~e.namespace.indexOf("form")?1:null}).length&&(i.isAjaxSubmit=!0)}},_initFields:function(t){var i=this,s=null===t;s&&(t=i.fields),W(t)&&e.each(t,function(e,t){if(null===t||s){var n=i.elements[e];n&&i._resetElement(n,!0),delete i.fields[e]}else i.fields[e]=Q(t)?{rule:t}:t}),i.$el.find(T).each(function(){i._parse(this)})},_parse:function(e){var t,i,s=this,n=s.options,a=e.name,r=J(e,M);if(r&&J(e,M,null),(e.id&&"#"+e.id in s.fields||!a||null!==r&&(t=s.fields[a])&&r!==t.rule&&t.key!==e.id)&&(a="#"+e.id),a)return t=s.fields[a]||{},t.key=a,t.rule=r||t.rule||"",t.display||!(t.display=J(e,F))&&n.display&&(t.display=n.display),t.rule&&((null!==J(e,q)||/match\(|checked/.test(t.rule))&&(t.must=!0),~t.rule.indexOf("required")&&(t.required=!0,J(e,x,!0)),"showOk"in t||(t.showOk=n.showOk),i=J(e,j),i?t.timely=+i:"timely"in t&&J(e,j,+t.timely),t=s._parseRule(t),t.old={}),Q(t.target)&&J(e,A,t.target),Q(t.tip)&&J(e,O,t.tip),s.fields[a]=t},_parseRule:function(t){var i=N.exec(t.rule);if(i)return t._i=0,i[1]&&(t.display=i[1]),i[2]&&(t.rules=[],i[2].replace(R,function(){var i=arguments;i[4]=i[4]||i[5],t.rules.push({and:"&"===i[1],not:"!"===i[2],or:"|"===i[6],method:i[3],params:i[4]?e.map(i[4].split(", "),function(e){return U(e)}):void 0})})),t},_multiValidate:function(t,i){var s=this,n=s.options;return s.hasError=!1,n.ignore&&(t=t.not(n.ignore)),t.each(function(){if(s._validate(this),s.hasError&&n.stopOnError)return!1}),i&&(s.validating=!0,e.when.apply(null,e.map(s.deferred,function(e){return e})).done(function(){i.call(s,!s.hasError),s.validating=!1})),e.isEmptyObject(s.deferred)?!s.hasError:void 0},_submit:function(t){function i(){var e,t;m=!0,p&&(e=p.name)?(p.name="",t=a.submit,s.$el.append('<input type="hidden" name="'+e+'" value="'+p.value+'">'),t.call(a)):a.submit()}var s=this,n=s.options,a=t.target,r="submit"===t.type&&!t.isDefaultPrevented();t.preventDefault(),m&&~(m=!1)||s.submiting||"validate"===t.type&&s.$el[0]!==a||n.beforeSubmit.call(s,a)===!1||(void 0===s.isAjaxSubmit&&s._guessAjax(a),n.debug&&K.log("\n<<< event: "+t.type),s._reset(),s.submiting=!0,s._multiValidate(s.$el.find(T),function(t){var l,o=t||2===n.debug?"valid":"invalid";t||(n.focusInvalid&&s.$el.find("["+$+"]:first").focus(),l=e.map(s.errors,function(e){return e})),s.submiting=!1,s.isValid=t,P(n[o])&&n[o].call(s,a,l),s.$el.trigger(o+w,[a,l]),n.debug&&K.log(">>> "+o),t&&r&&!s.isAjaxSubmit&&i()}))},_reset:function(e){var t=this;t.errors={},e&&(t.reseting=!0,t.$el.find(T).each(function(e,i){t._resetElement(i)}),delete t.reseting)},_resetElement:function(e,t){this._setClass(e,null),this.hideMsg(e),t&&J(e,x,null)},_getTimely:function(e,t){var i=J(e,j);return null!==i?+i:+t.timely},_focusin:function(e){var t,i,s=this,n=s.options,a=e.target;s.validating||"click"===e.type&&document.activeElement===a||(n.focusCleanup&&"true"===J(a,$)&&(s._setClass(a,null),s.hideMsg(a)),i=J(a,O),i?s.showMsg(a,{type:"tip",msg:i}):(J(a,M)&&s._parse(a),t=s._getTimely(a,n),8!==t&&9!==t||s._focusout(e)))},_focusout:function(t,i){var s,n,a,r,l,o,u,c=this,f=c.options,g=t.target,p=t.type,m="focusin"===p,h="validate"===p,v=0;if("compositionstart"===p&&(c.pauseValidate=!0),"compositionend"===p&&(c.pauseValidate=!1),!c.pauseValidate&&(s=c.getField(g))){if(s._e=p,n=s.old,a=G(g),!i&&d(g)&&(i=c.$el.find('input[name="'+g.name+'"]').get(0)),u=c._getTimely(i||g,f),!h){if(!u)return;if(f.ignoreBlank&&!a&&!m)return void c.hideMsg(g);if("focusout"===p){if(2===u||8===u){if(!a)return;s.isValid&&!n.showOk?c.hideMsg(g):c._makeMsg(g,s,n)}}else{if(u<2&&!t.data)return;if(r=+new Date,r-(g._ts||0)<100||"keyup"===p&&"input"===g._et)return;if(g._ts=r,g._et=p,"keyup"===p){if(l=t.keyCode,o={8:1,9:1,16:1,32:1,46:1},9===l&&!a)return;if(l<48&&!o[l])return}m||(v=u>=100?u:400)}}f.ignore&&e(g).is(f.ignore)||(clearTimeout(s._t),s.value=a,void 0!==u&&(s.timely=u),v?s._t=setTimeout(function(){c._validate(g,s)},v):(h&&(s.old={}),c._validate(g,s)))}},_setClass:function(t,i){var s=e(t),n=this.options;n.bindClassTo&&(s=s.closest(n.bindClassTo)),s.removeClass(n.invalidClass+" "+n.validClass),null!==i&&s.addClass(i?n.validClass:n.invalidClass)},_showmsg:function(t,i,s){var n=this,a=t.target;e(a).is(":input")?n.showMsg(a,{type:i,msg:s}):"tip"===i&&n.$el.find(T+"["+O+"]",a).each(function(){n.showMsg(this,{type:i,msg:s})})},_hidemsg:function(t){var i=e(t.target);i.is(":input")&&this.hideMsg(i)},_validatedField:function(t,i,s){var n=this,a=n.options,r=i.isValid=s.isValid=!!s.isValid,l=r?"valid":"invalid";s.key=i.key,s.ruleName=i._r,s.id=t.id,s.value=G(t),r?s.type="ok":(n.submiting&&(n.errors[i.key]=s.msg),n.isValid=!1,n.hasError=!0),n.elements[i.key]=s.element=t,n.$el[0].isValid=r?n.isFormValid():r,i.old=s,P(i[l])&&i[l].call(n,t,s),P(a.validation)&&a.validation.call(n,t,s),e(t).attr($,!r||null).trigger(l+_,[s,n]),n.$el.triggerHandler("validation",[s,n]),n.checkOnly||(n._setClass(t,s.skip||"tip"===s.type?null:r),n._makeMsg.apply(n,arguments))},_makeMsg:function(t,i,s){(i.msgMaker||this.options.msgMaker)&&(s=e.extend({},s),"focusin"===i._e&&(s.type="tip"),this[s.showOk||s.msg||"tip"===s.type?"showMsg":"hideMsg"](t,s,i))},_validatedRule:function(t,i,s,n){i=i||d.getField(t),n=n||{};var a,r,o,u,d=this,c=d.options,f=i._r,g=i.timely||c.timely,p=9===g||8===g,m=!1;if(null===s)return void d._validatedField(t,i,{isValid:!0,skip:!0});if(void 0===s?o=!0:s===!0||""===s?m=!0:Q(s)?a=s:W(s)&&(s.error?a=s.error:(a=s.ok,m=!0)),r=i.rules[i._i],r.not&&(a=void 0,m="required"===f||!m),r.or)if(m)for(;i._i<i.rules.length&&i.rules[i._i].or;)i._i++;else o=!0;else r.and&&(i.isValid||(o=!0));o?m=!0:(m&&i.showOk!==!1&&(u=J(t,V),a=null===u?Q(i.ok)?i.ok:a:u,!Q(a)&&Q(i.showOk)&&(a=i.showOk),Q(a)&&(n.showOk=m)),m&&!p||(a=(l(t,i,a||r.msg||d.messages[f])||d.messages.fallback).replace(/\{0\|?([^\}]*)\}/,function(){return d._getDisplay(t,i.display)||arguments[1]||d.messages[0]})),m||(i.isValid=m),n.msg=a,e(t).trigger((m?"valid":"invalid")+y,[f,a])),!p||o&&!r.and||(m||i._m||(i._m=a),i._v=i._v||[],i._v.push({type:m?o?"tip":"ok":"error",msg:a||r.msg})),c.debug&&K.log("   "+i._i+": "+f+" => "+(m||a)),(m||p)&&i._i<i.rules.length-1?(i._i++,d._checkRule(t,i)):(i._i=0,p?(n.isValid=i.isValid,n.result=i._v,n.msg=i._m||"",i.value||"focusin"!==i._e||(n.type="tip")):n.isValid=m,d._validatedField(t,i,n),delete i._m,delete i._v)},_checkRule:function(t,i){var s,n,a,l=this,o=i.key,d=i.rules[i._i],c=d.method,f=G(t),g=d.params;l.submiting&&l.deferred[o]||(a=i.old,i._r=c,a&&!i.must&&!d.must&&void 0!==d.result&&a.ruleName===c&&a.id===t.id&&f&&a.value===f?s=d.result:(n=r(t,c)||l.rules[c]||z,s=n.call(l,t,g,i),n.msg&&(d.msg=n.msg)),W(s)&&P(s.then)?(l.deferred[o]=s,i.isValid=void 0,!l.checkOnly&&l.showMsg(t,{type:"loading",msg:l.messages.loading},i),s.then(function(s,n,a){var r,o=a.responseText,c=i.dataFilter||l.options.dataFilter||u;/jsonp?/.test(this.dataType)?o=s:"{"===U(o).charAt(0)&&(o=e.parseJSON(o)),r=c.call(this,o,i),void 0===r&&(r=c.call(this,o.data,i)),d.data=this.data,d.result=i.old?r:void 0,l._validatedRule(t,i,r)},function(e,s){l._validatedRule(t,i,l.messages[s]||s)}).always(function(){delete l.deferred[o]})):l._validatedRule(t,i,s))},_validate:function(e,t){var i=this;if(!e.disabled&&null===J(e,E)&&(t=t||i.getField(e),t&&(t.rules||i._parse(e),t.rules)))return i.options.debug&&K.info(t.key),t.isValid=!0,t.required||t.must||G(e)||d(e)?(i._checkRule(e,t),t.isValid):(i._validatedField(e,t,{isValid:!0}),!0)},test:function(e,t){var i,s,n,a=this,r=S.exec(t);return r&&(s=r[1],s in a.rules&&(n=r[2]||r[3],n=n?n.split(", "):void 0,i=a.rules[s].call(a,e,n))),i===!0||void 0===i||null===i},getRangeMsg:function(e,t,i,s){function n(e,t){return d?e>t:e>=t}if(t){var a,r=this,l=i.rules[i._i],o=r.messages[l.method]||"",u=t[0].split("~"),d="false"===t[1],c=u[0],f=u[1],g="rg",p=[""],m=U(e)&&+e===+e;return 2===u.length?c&&f?(m&&n(e,+c)&&n(+f,e)&&(a=!0),p=p.concat(u),g=d?"gtlt":"rg"):c&&!f?(m&&n(e,+c)&&(a=!0),p.push(c),g=d?"gt":"gte"):!c&&f&&(m&&n(+f,e)&&(a=!0),p.push(f),g=d?"lt":"lte"):(e===+c&&(a=!0),p.push(c),g="eq"),o&&(s&&o[g+s]&&(g+=s),p[0]=o[g]),a||(l.msg=r.renderMsg.apply(null,p))}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getDisplay:function(e,t){return Q(t)?t:P(t)?t.call(this,e):""},_getMsgOpt:function(t){return e.extend({},this.msgOpt,Q(t)?{msg:t}:t)},_getMsgDOM:function(t,i){var s,n,a,r,l=e(t);if(l.is(":input")?(a=i.target||J(t,A),a&&(a=P(a)?a.call(this,t):this.$el.find(a),a.length&&(a.is(":input")?t=a.get(0):a.hasClass(k)?s=a:r=a)),s||(n=d(t)&&t.name||!t.id?t.name:t.id,s=this.$el.find(i.wrapper+"."+k+'[for="'+n+'"]'))):s=l,!s.length)if(l=this.$el.find(a||t),s=e("<"+i.wrapper+">").attr({"class":k+(i.cls?" "+i.cls:""),style:i.style||"","for":n}),d(t)){var o=l.parent();s.appendTo(o.is("label")?o.parent():o)}else r?s.appendTo(r):s[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](l);return s},showMsg:function(t,i,s){if(t){var n,a,r,l=this,o=l.options;if(W(t)&&!t.jquery&&!i)return void e.each(t,function(e,t){var i=l.elements[e]||l.$el.find(g(e))[0];l.showMsg(i,t)});i=l._getMsgOpt(i),t=e(t).get(0),i.msg||"error"===i.type||(a=J(t,"data-"+i.type),null!==a&&(i.msg=a)),Q(i.msg)&&(e(t).is(T)&&(s=s||l.getField(t),s&&(i.style=s.msgStyle||i.style,i.cls=s.msgClass||i.cls,i.wrapper=s.msgWrapper||i.wrapper,i.target=s.target||o.target)),(n=(s||{}).msgMaker||o.msgMaker)&&(r=l._getMsgDOM(t,i),!I.test(r[0].className)&&r.addClass(i.cls),6===X&&"bottom"===i.pos&&(r[0].style.marginTop=e(t).outerHeight()+"px"),r.html(n.call(l,i))[0].style.display="",P(i.show)&&i.show.call(l,r,i.type)))}},hideMsg:function(t,i,s){var n,a=this,r=a.options;t=e(t).get(0),i=a._getMsgOpt(i),e(t).is(T)&&(s=s||a.getField(t),s&&((s.isValid||a.reseting)&&J(t,$,null),i.wrapper=s.msgWrapper||i.wrapper,i.target=s.target||r.target)),n=a._getMsgDOM(t,i),n.length&&(P(i.hide)?i.hide.call(a,n,i.type):(n[0].style.display="none",n[0].innerHTML=null))},getField:function(e){var t,i=this;if(Q(e))t=e;else{if(J(e,M))return i._parse(e);t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name}return i.fields[t]},setField:function(e,t){var i={};e&&(Q(e)?i[e]=t:i=e,this._initFields(i))},isFormValid:function(){var e,t,i=this.fields;for(e in i)if(t=i[e],t.rules&&(t.required||t.must||G(g(e)))&&!t.isValid)return t.isValid;return!0},holdSubmit:function(e){this.submiting=void 0===e||e},cleanUp:function(){this._reset(1)},destroy:function(){this._reset(1),this.$el.off(v).removeData(h),J(this.$el[0],E,this._novalidate)}},e(window).on("beforeunload",function(){this.focus()}),e(document).on("click",":submit",function(){var e,t=this;t.form&&(p=t,e=t.getAttributeNode("formnovalidate"),(e&&null!==e.nodeValue||null!==J(t,E))&&(m=!0))}).on("focusin submit validate","form,."+b,function(t){if(null===J(this,E)){var i,s=e(this);s.data(h)||(i=a(this),e.isEmptyObject(i.fields)?(J(this,E,E),s.off(v).removeData(h)):"focusin"===t.type?i._focusin(t):i._submit(t))}}),new s({fallback:"不能为空",loading:"正在加载..."}),new i({required:function(t,i,s){var n=this,a=U(G(t)),r=!0;if(i)if(1===i.length){if(f(i[0])){if(n.rules[i[0]]){if(!a&&!n.test(t,i[0]))return J(t,x,null),null;J(t,x,!0)}}else if(!a&&!e(i[0],n.$el).length)return null}else if("not"===i[0])e.each(i.slice(1),function(){return r=a!==U(this)});else if("from"===i[0]){var o,u=n.$el.find(i[1]),d="_validated_";return r=u.filter(function(){return!!U(G(this))}).length>=(i[2]||1),r?a||(o=null):o=l(u[0],s)||!1,e(t).data(d)||u.data(d,1).each(function(){t!==this&&n._checkRule(this,n.getField(this))}).removeData(d),o}return r&&!!a},integer:function(e,t){var i,s="0|",n="[1-9]\\d*",a=t?t[0]:"*";switch(a){case"+":i=n;break;case"-":i="-"+n;break;case"+0":i=s+n;break;case"-0":i=s+"-"+n;break;default:i=s+"-?"+n}return i="^(?:"+i+")$",new RegExp(i).test(G(e))||this.messages.integer[a]},match:function(t,i,s){if(i){var n,a,r,l,o,u,d,f,p=this,m="eq";if(1===i.length?r=i[0]:(m=i[0],r=i[1]),u=g(r),d=p.$el.find(u)[0]){if(f=p.getField(d),n=G(t),a=G(d),s._match||(p.$el.on("valid"+_+v,u,function(){e(t).trigger("validate")}),s._match=f._match=1),!s.required&&""===n&&""===a)return null;if(o=i[2],o&&(/^date(time)?$/i.test(o)?(n=c(n),a=c(a)):"time"===o&&(n=+n.replace(/:/g,""),a=+a.replace(/:/g,""))),"eq"!==m&&!isNaN(+n)&&isNaN(+a))return!0;switch(l=p.messages.match[m].replace("{1}",p._getDisplay(t,f.display||r)),m){case"lt":return+n<+a||l;case"lte":return+n<=+a||l;case"gte":return+n>=+a||l;case"gt":return+n>+a||l;case"neq":return n!==a||l;default:return n===a||l}}}},range:function(e,t,i){return this.getRangeMsg(G(e),t,i)},checked:function(e,t,i){if(d(e)){var s,n,a=this;return e.name?n=a.$el.find('input[name="'+e.name+'"]').filter(function(){var e=this;return!s&&d(e)&&(s=e),!e.disabled&&e.checked}).length:(s=e,n=s.checked),t?a.getRangeMsg(n,t,i):!!n||l(s,i,"")||a.messages.required}},length:function(e,t,i){var s=G(e),n=("true"===t[1]?s.replace(D,"xx"):s).length;return this.getRangeMsg(n,t,i,t[1]?"_2":"")},remote:function(t,i,s){if(i){var n,a=this,r=B.exec(i[0]),l=s.rules[s._i],o={},u="",d=r[3],c=r[2]||"POST",f=(r[1]||"").toLowerCase();return l.must=!0,o[t.name]=G(t),i[1]&&e.map(i.slice(1),function(e){var t,i;~e.indexOf("=")?u+="&"+e:(t=e.split(":"),e=U(t[0]),i=U(t[1])||e,o[e]=a.$el.find(g(i)).val())}),o=e.param(o)+u,!s.must&&l.data&&l.data===o?l.result:("cors"!==f&&/^https?:/.test(d)&&!~d.indexOf(location.host)&&(n="jsonp"),e.ajax({url:d,type:c,data:o,dataType:n}))}},validate:function(t,i){var s="_validated_";i&&!e(t).data(s)&&this.$el.find(e.map(i,function(e){return g(e)}).join(",")).data(s,1).trigger("validate").removeData(s)},filter:function(e,t){var i,s=G(e);i=s.replace(t?new RegExp("["+t[0]+"]","gm"):L,""),i!==s&&(e.value=i)}}),t.config=function(t){e.each(t,function(e,t){"rules"===e?new i(t):"messages"===e?new s(t):Z[e]=t})},t.setTheme=function(t,i){W(t)?e.extend(!0,ee,t):Q(t)&&W(i)&&(ee[t]=e.extend(ee[t],i))},e[h]=t,function(i){var s,n,a,r,l,o,u=document,d=u.getElementsByTagName("script");if(i)n=d[0],s=i.match(/(.*(?:\/|\?))local(?:\/|=)([\w\-]{2,5})(?=\.js)?/);else for(a=d.length,r=/(.*validator(?:\.min)?.js)\?.*local=([\w\-]*)/;a--&&!s;)n=d[a],s=(n.hasAttribute?n.src:n.getAttribute("src",4)||"").match(r);s&&(l=s[1].split("/").slice(0,-1).join("/")+"/",o=u.createElement("link"),o.rel="stylesheet",o.href=l+"jquery.validator.css",n.parentNode.insertBefore(o,n),i||(t.loading=1,o=u.createElement("script"),o.src=l+"local/"+(s[2]||u.documentElement.lang||"en").replace("_","-")+".js",a="onload"in o?"onload":"onreadystatechange",o[a]=function(){o.readyState&&!/loaded|complete/.test(o.readyState)||(e(window).trigger("validatorready"),delete t.loading,o=o[a]=null)},n.parentNode.insertBefore(o,n)))}(e._VALIDATOR_URI),e.validator.config({rules:{digits:[/^\d+$/,"请填写数字"],letters:[/^[a-z]+$/i,"请填写字母"],date:[/^\d{4}-\d{2}-\d{2}$/,"请填写有效的日期，格式:yyyy-mm-dd"],time:[/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/,"请填写有效的时间，00:00到23:59之间"],email:[/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i,"请填写有效的邮箱"],url:[/^(https?|s?ftp):\/\/\S+$/i,"请填写有效的网址"],qq:[/^[1-9]\d{4,}$/,"请填写有效的QQ号"],IDcard:[/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/,"请填写正确的身份证号码"],tel:[/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/,"请填写有效的电话号码"],mobile:[/^1[3-9]\d{9}$/,"请填写有效的手机号"],zipcode:[/^\d{6}$/,"请检查邮政编码格式"],chinese:[/^[\u0391-\uFFE5]+$/,"请填写中文字符"],username:[/^\w{3,12}$/,"请填写3-12位数字、字母、下划线"],password:[/^[\S]{6,16}$/,"请填写6-16位字符，不能包含空格"],accept:function(t,i){if(!i)return!0;var s=i[0],n=e(t).val();return"*"===s||new RegExp(".(?:"+s+")$","i").test(n)||this.renderMsg("只接受{1}后缀的文件",s.replace(/\|/g,","))}},messages:{0:"此处",fallback:"{0}格式不正确",loading:"正在验证...",error:"网络异常",timeout:"请求超时",required:"{0}不能为空",remote:"{0}已被使用",integer:{"*":"请填写整数","+":"请填写正整数","+0":"请填写正整数或0","-":"请填写负整数","-0":"请填写负整数或0"},match:{eq:"{0}与{1}不一致",neq:"{0}与{1}不能相同",lt:"{0}必须小于{1}",gt:"{0}必须大于{1}",lte:"{0}不能大于{1}",gte:"{0}不能小于{1}"},range:{rg:"请填写{1}到{2}的数",gte:"请填写不小于{1}的数",lte:"请填写最大{1}的数",gtlt:"请填写{1}到{2}之间的数",gt:"请填写大于{1}的数",lt:"请填写小于{1}的数"},checked:{eq:"请选择{1}项",rg:"请选择{1}到{2}项",gte:"请至少选择{1}项",lte:"请最多选择{1}项"},length:{eq:"请填写{1}个字符",rg:"请填写{1}到{2}个字符",gte:"请至少填写{1}个字符",lte:"请最多填写{1}个字符",eq_2:"",rg_2:"",gte_2:"",lte_2:""}}});var te='<span class="n-arrow"><b>◆</b><i>◆</i></span>';e.validator.setTheme({simple_right:{formClass:"n-simple",msgClass:"n-right"},simple_bottom:{formClass:"n-simple",msgClass:"n-bottom"},yellow_top:{formClass:"n-yellow",msgClass:"n-top",msgArrow:te},yellow_right:{formClass:"n-yellow",msgClass:"n-right",msgArrow:te},yellow_right_effect:{formClass:"n-yellow",msgClass:"n-right",msgArrow:te,msgShow:function(e,t){var i=e.children();i.is(":animated")||("error"===t?i.css({left:"20px",opacity:0}).delay(100).show().stop().animate({left:"-4px",opacity:1},150).animate({left:"3px"},80).animate({left:0},80):i.css({left:0,opacity:1}).fadeIn(200))},msgHide:function(e,t){var i=e.children();i.stop().delay(100).show().animate({left:"20px",opacity:0},300,function(){e.hide()})}}})}(jQuery)}})});