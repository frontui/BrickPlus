/*! 
*  BrickPlus v1.0.1
*  by fronui team
*  updated on 2016-09-27
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports["brickPlus.Util"]=e(require("jquery")):t["brickPlus.Util"]=e(t.jQuery)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(27)},,function(e,n){e.exports=t},,,,,,,,,,function(t,e){"use strict";function n(t){return t>9?t:"0"+t}t.exports=n},,function(t,e){"use strict";var n={now:function(){var t=new Date;return t.now?t.now():t.getTime()},throttle:function(t,e,r){var i,o,u,a=null,c=0;r||(r={});var s=function(){c=r.leading===!1?0:n.now(),a=null,u=t.apply(i,o),a||(i=o=null)};return function(){var l=n.now();c||r.leading!==!1||(c=l);var f=e-(l-c);return i=this,o=arguments,0>=f||f>e?(clearTimeout(a),a=null,c=l,u=t.apply(i,o),a||(i=o=null)):a||r.trailling===!1||(a=setTimeout(s,f)),u}},debounce:function(t,e,r){var i,o,u,a,c,s=function l(){var s=n.now()-a;e>s&&s>0?i=setTimeout(l,e-s):(i=null,r||(c=t.apply(u,o),i||(u=o=null)))};return function(){u=this,o=arguments,a=n.now();var l=r&&!i;return i||(i=setTimeout(s,e)),l&&(c=t.apply(u,o),u=o=null),c}}};t.exports={throttle:n.throttle,debounce:n.debounce}},,,,,,,,,,,,,function(t,e,n){"use strict";var r=(n(2),n(14));if("undefined"==typeof i){var i={};window.BrickPlus=i}var o={inputFilter:n(28),cnMoney:n(29),browser:n(30),clockTick:n(31),dbcToSbc:n(32),insertTextAtCaret:n(33),dayDiff:n(34),dateDiff:n(35),currency:n(36),zeroPad:n(12),debounce:r.debounce,throttle:r.throttle};i.Util=o,t.exports=o},function(t,e){"use strict";function n(t,e){function n(t){return null===t.which?t.keyCode<32?null:String.fromCharCode(t.keyCode):0!==t.which&&0!==t.charCode?t.which<32?null:String.fromCharCode(t.which):null}return function(r){var i,o=r||window.event;return o.ctrlKey||o.altKey||o.metaKey||(i=n(o),null===i)?void 0:t.test(i)?void("function"==typeof e&&e.call(i)):!1}}function r(t){var e=t.getAttribute("pattern");if(!e)return null;var n=a[e];return n||(n=new RegExp(e)),n}function i(t){var e=r(t.target);return e&&n(e)(t)}function o(t){var e=r(t.target);if(null!==e){var n=$(this),i=n.val(),o=!1;setTimeout(function(){n.val(function(){var t=i.replace(e,function(t,e,n){return o=!0,t});return o?t:""})},1)}}var u='[data-toggle="filter"]',a={number:/^[0-9]+$/,integer:/^\-?[0-9]+$/,decimal:/^\-?[0-9]*\.?[0-9]+$/,natural:/^[1-9][0-9]*$/i,letter:/[a-zA-z]/,email:/[a-z0-9_\.\-@]/i,hex:/[0-9a-f]/i,alpha:/^[a-z]+$/i,alphaNum:/[a-z0-9_]/i,name:/[a-zA-Z0-9_\-]/,phone:/\d{3,4}-\d{5,}/,mobile:/^1[3-9]\d{9}/,ip:/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,base64:/[^a-zA-Z0-9\/\+=]/i,url:/^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,date:/\d{4}-\d{1,2}-\d{1,2}/,chinese:/^[\u4e00-\u9fa5]+$/,nickName:/^[\u4e00-\u9fa50-9a-zA-Z_\-]+$/};$(function(){$(document).on("keypress",u,i),$(document).on("paste change propertychange",u,o)}),t.exports={filter:n,keyPress:i,keyAfter:o}},function(t,e,n){"use strict";var r=n(2),i={},o=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],u=["元","拾","佰","仟","万","拾","佰","仟","亿","拾","佰","仟","万","拾","佰","仟"],a=["角","分","厘","毫","丝","忽"],c=16,s=6,l=/^\d+(.\d+)?$/;i={isNumber:function(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)},isString:function(t){return"string"==typeof t},convert:function(t,e){if(!this.isNumber(t)&&!this.isString(t)||!l.test(t))return window.console&&console.log("Error type !"),!1;this.decimalsSize=parseInt(e)||2;var n=this.parseParam(t+"");return n.i.length>c?(window.console&&console.log("Too large !"),!1):this.trimValue(n)},trimValue:function(t){var e=this.isNeedTenThousand(t.i),n=this._convertInteger(t.i,e),r=this._convertDecimal(t.d);return"0"===t.i?""===t.d?"零元":r.replace(/^\u96F6{1,}/,""):n+r},parseParam:function(t){var e,n,r=t.indexOf(".");return r>0?(e=t.substring(0,r),n=t.substring(r+1)):0==r?(e="",n=t.substring(1)):(e=t,n=""),""!==e&&(e=""+parseInt(e,10),"0"===e&&(e="")),{i:e,d:n}},_convertInteger:function(t,e){var n=[],r=t.length;t=t.split("");for(var i=0;r>i;i++){var a="",c=r-i;0==t[i]&&(13==c?a=u[4]:9==c?a=u[8]:5==c&&e?a=u[4]:1==c&&(a=u[0]),c>1&&0!=t[i+1]&&(a+=o[0])),n.push(0==t[i]?a:o[t[i]]+u[c-1])}return n.join("")},_convertDecimal:function(t){var e=[];t=t.split("");for(var n=0,r=t.length;r>n&&(n!==s&&n!==this.decimalsSize);n++)e.push(0==t[n]?"零":o[t[n]]+a[n]);return e.join("").replace(/\u96F6{2,}/g,"零").replace(/\u96F6{1,}$/,"")},isNeedTenThousand:function(t){var e=t.length,n="";return e>4?(n=e>8?t.substring(e-8,e-4):t.substring(0,e-4),parseInt(n,10)>0):!1}};var f=function h(t,e){this.$el=r(t),this.option=r.extend({},h.DEFAULTS,e),this.$target=r(e.target||this.$el.attr("data-target")),this.initEvent(),this.convert()};f.DEFAULTS={target:null,prefix:"人民币",dec:2,unit:"整"},f.prototype={initEvent:function(){this.$el.on("keyup",r.proxy(this.convert,this))},convert:function(){var t=r.trim(this.$el.val());if(""!==r.trim(t)){var e=i.convert(parseFloat(t),this.option.dec);this.update(e)}},update:function(t){t=t?t:"零元";var e=t.substr(-1,1);t="元"===e?this.option.prefix+t+this.option.unit:this.option.prefix+t,this.$target.html(t)}},r.fn.convertTransitional=function(t){var e=[].slice.call(arguments,1);return r(this).each(function(){var n=r(this),i=n.data("tradition");i||n.data("tradition",i=new f(n,t)),"string"==typeof t&&i[t].apply(i,e)})},r(function(){r(document).on("keyup.util.tradition",'[data-toggle="cnMoney"]',function(){r(this).convertTransitional("convert")})}),t.exports=f},function(t,e){"use strict";var n=function(){function t(t,e){var n=i.external||{};for(var r in n)if(t.test(e?n[r]:r))return!0;return!1}function e(){if(h||"undefined"!=typeof i.scrollMaxX||l.test(o.vendor||""))return"";var e="track"in document.createElement("track"),n=i.chrome&&i.chrome.webstore?Object.keys(i.chrome.webstore).length:0;return t(/^sogou/i,0)?"sogou":t(/^liebao/i,0)?"liebao":i.clientInformation&&i.clientInformation.permissions?"chrome":e?n>1?"360ee":"360se":""}function n(){for(var t=3,e=document.createElement("p"),n=e.getElementsByTagName("i");e.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",n[0];);return t>4?t:0}function r(){var t={GetRunPath:function(){try{var t=external.GetRunPath(external.GetSID(window));return t.toLowerCase()}catch(e){return""}},Is360Chrome:function(){return this.GetRunPath().indexOf("360chrome.exe")>-1},is360chrome:function(){var t=!1;try{t="undefined"!=typeof chrome&&"undefined"!=typeof chrome.webstorePrivate&&"undefined"!=typeof chrome.webstorePrivate.beginInstallWithManifest3?!0:-1!=navigator.userAgent.toLowerCase().indexOf("360ee")}catch(e){}return t||this.Is360Chrome()}};return t.is360chrome()}var i=window,o=i.navigator,u=o.userAgent,a=i.document,c=i.ActiveXObject,s=a.documentMode,l=/^Apple/,f=n()||s||0,h=c||s,d=e(),p={isIE:function(){return!!f}(),ieVersion:function(){return f}(),isChrome:function(){return"chrome"===d}(),is360se:function(){return"360se"===d}(),is360ee:function(){return"360ee"===d||r()}(),isLiebao:function(){return"liebao"===d||u.indexOf("LBBROWSER")>-1}(),isSogou:function(){return"sogou"===d}(),isQQ:function(){return"qq"===d}()};return p}();t.exports=n},function(t,e){"use strict";function n(t,e){if(t){var n=[].slice.call(arguments),r={init:function(t){return this.target=t,this.start=new Date,this.timer=null,this.tick(),this},tick:function(){function t(){if(0>=i)"function"==typeof e&&e(-1),clearInterval(n.timer);else{var t=Math.floor(i/864e5),r=Math.floor(i/36e5)-24*t,o=Math.floor(i/6e4)-60*r-24*t*60,u=Math.ceil(i/1e3)-60*o-60*r*60-24*t*60*60;"function"==typeof e&&e(t,r,o,u)}i-=1e3}var n=this,r=n.target,i=r-n.start;t(),this.timer=setInterval(t,1e3)},stop:function(){clearInterval(this.timer)}};return r.init.apply(r,n)}}t.exports=n},function(t,e,n){"use strict";function r(t){for(var e,n,r=[],o=0,u=t.length;u>o;++o)e=t.charCodeAt(o),n=a[e],!n&&e>65280&&65375>e&&(n=a[e]=String.fromCharCode(e-65248)),r[o]=n?n:t.charAt(o);return r.join("").replace(/[。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％]/g,i).replace("……","…")}function i(t){if(t){var e=c.dbc.indexOf(t);return c.sbc.charAt(e)?c.sbc.charAt(e):t}}var o=n(2),u='[data-toggle="dbc2sbc"]',a={12288:" "},c={dbc:"。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％",sbc:"..,;:?!-~()[]{}<>''\"\"1234567890/@#$%"};o(function(){o(document).on("keyup.util.dbc2sbc",u,function(){var t=o.trim(o(this).val()),e=r(t);o(this).val(e)})}),t.exports=r},function(t,e){"use strict";function n(t,e){var n,r,i,o;t&&(document.selection?(t.focus(),n=document.selection.createRange(),n.text=e,t.focus()):"number"==typeof t.selectionStart?(r=t.selectionStart,i=t.selectionEnd,o=t.scrollTop,t.value=t.value.substring(0,r)+e+t.value.substring(i,t.value.length),t.focus(),t.selectionStart=r+e.length,t.selectionEnd=r+e.length,t.scrollTop=o):(t.value+=e,t.focus()))}t.exports=n},function(t,e,n){"use strict";var r=(n(12),/^\d{4}-\d{1,2}-\d{1,2}$/),i=function(t,e){var n=[],i=[],o=0,u=0,a=0;if(r.test(t)&&r.test(e))return n=t.split("-"),i=e.split("-"),o=new Date(n[0],parseInt(n[1],10)-1,n[2],0,0,0),u=new Date(i[0],parseInt(i[1],10)-1,i[2],0,0,0),a=Math.floor((u-o)/864e5);throw new Error("start or end param is legal date formatter")};t.exports=i},function(t,e,n){"use strict";var r=n(12),i=function(t,e,n){var i=new Date(t),o=i.getTime()+864e5*e,u=new Date(o);return n=n||"-",[u.getFullYear(),r(u.getMonth()+1),r(u.getDate())].join(n)};t.exports=i},function(t,e){"use strict";var n=function(t,e){e=e||2;var n,r=Number(t);return isNaN(r)?t:(r=Number(t).toFixed(e),n=r.split("."),n[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"."+(n[1]||""))};t.exports=n}])});