/*! generator-frontman v0.1.2
*  by fronui team
*  (c) 2014-2016 www.frontpay.cn
* updated on 2016-07-18
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.BrickPlus=e(require("jquery")):t.BrickPlus=e(t.jQuery)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";n(1);if("undefined"==typeof r)var r={};var i={inputFilter:n(2),cnMoney:n(3),browser:n(4),clockTick:n(5),dbcToSbc:n(6),insertTextAtCaret:n(7),dayDiff:n(8),dateDiff:n(10),currency:n(11)};r.Util=i,t.exports=r},function(e,n){e.exports=t},function(t,e){"use strict";function n(t,e){var n,i,o,s,u=t.keyCode,c=[],a=[];if(e&&e.disabled){for(s=e.disabled,n=0,i=s.length;n<i;n++)r[s[n]]&&(a=a.concat(s[n]));if(a.indexOf(u)>-1)return t.preventDefault(),!1}if(e&&e.only){for(o=e.only,n=0,i=o.length;n<i;n++)r[o[n]]&&(c=c.concat(o[n]));if(c.indexOf(u)==-1)return t.preventDefault(),!1}}var r={space:[32],number:[],word:[],controls:[]};t.exports=n},function(t,e,n){"use strict";var r=n(1),i={},o=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],s=["元","拾","佰","仟","万","拾","佰","仟","亿","拾","佰","仟","万","拾","佰","仟"],u=["角","分","厘","毫","丝","忽"],c=16,a=6,f=/^\d+(.\d+)?$/;i={isNumber:function(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)},isString:function(t){return"string"==typeof t},convert:function(t,e){if(!this.isNumber(t)&&!this.isString(t)||!f.test(t))return window.console&&console.log("Error type !"),!1;this.decimalsSize=parseInt(e)||2;var n=this.parseParam(t+"");return n.i.length>c?(window.console&&console.log("Too large !"),!1):this.trimValue(n)},trimValue:function(t){var e=this.isNeedTenThousand(t.i),n=this._convertInteger(t.i,e),r=this._convertDecimal(t.d);return"0"===t.i?""===t.d?"零元":r.replace(/^\u96F6{1,}/,""):n+r},parseParam:function(t){var e,n,r=t.indexOf(".");return r>0?(e=t.substring(0,r),n=t.substring(r+1)):0==r?(e="",n=t.substring(1)):(e=t,n=""),""!==e&&(e=""+parseInt(e,10),"0"===e&&(e="")),{i:e,d:n}},_convertInteger:function(t,e){var n=[],r=t.length;t=t.split("");for(var i=0;i<r;i++){var u="",c=r-i;0==t[i]&&(13==c?u=s[4]:9==c?u=s[8]:5==c&&e?u=s[4]:1==c&&(u=s[0]),c>1&&0!=t[i+1]&&(u+=o[0])),n.push(0==t[i]?u:o[t[i]]+s[c-1])}return n.join("")},_convertDecimal:function(t){var e=[];t=t.split("");for(var n=0,r=t.length;n<r&&(n!==a&&n!==this.decimalsSize);n++)e.push(0==t[n]?"零":o[t[n]]+u[n]);return e.join("").replace(/\u96F6{2,}/g,"零").replace(/\u96F6{1,}$/,"")},isNeedTenThousand:function(t){var e=t.length,n="";return e>4&&(n=e>8?t.substring(e-8,e-4):t.substring(0,e-4),parseInt(n,10)>0)}};var l=function d(t,e){this.$el=r(t),this.option=r.extend({},d.DEFAULTS,e),this.$target=r(e.target||this.$el.attr("data-target")),this.initEvent(),this.convert()};l.DEFAULTS={target:null,prefix:"人民币",dec:2,unit:"整"},l.prototype={initEvent:function(){this.$el.on("keyup",r.proxy(this.convert,this))},convert:function(){var t=r.trim(this.$el.val());if(""!==r.trim(t)){var e=i.convert(parseFloat(t),this.option.dec);this.update(e)}},update:function(t){t=t?t:"零元";var e=t.substr(-1,1);t="元"===e?this.option.prefix+t+this.option.unit:this.option.prefix+t,this.$target.html(t)}},r.fn.convertTransitional=function(t){var e=[].slice.call(arguments,1);return r(this).each(function(){var n=r(this),i=n.data("tradition");i||n.data("tradition",i=new l(n,t)),"string"==typeof t&&i[t].apply(i,e)})},r(function(){r(document).on("keyup.util.tradition",'[data-toggle="cnMoney"]',function(){r(this).convertTransitional("convert")})}),t.exports=l},function(t,e){"use strict";var n=function(){function t(t,e){var n=i.external||{};for(var r in n)if(t.test(e?n[r]:r))return!0;return!1}function e(){if(d||"undefined"!=typeof i.scrollMaxX||f.test(o.vendor||""))return"";var e="track"in document.createElement("track"),n=i.chrome&&i.chrome.webstore?Object.keys(i.chrome.webstore).length:0;return t(/^sogou/i,0)?"sogou":t(/^liebao/i,0)?"liebao":i.clientInformation&&i.clientInformation.permissions?"chrome":e?n>1?"360ee":"360se":""}function n(){for(var t=3,e=document.createElement("p"),n=e.getElementsByTagName("i");e.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",n[0];);return t>4?t:0}function r(){var t={GetRunPath:function(){try{var t=external.GetRunPath(external.GetSID(window));return t.toLowerCase()}catch(e){return""}},Is360Chrome:function(){return this.GetRunPath().indexOf("360chrome.exe")>-1},is360chrome:function(){var t=!1;try{t="undefined"!=typeof chrome&&"undefined"!=typeof chrome.webstorePrivate&&"undefined"!=typeof chrome.webstorePrivate.beginInstallWithManifest3||navigator.userAgent.toLowerCase().indexOf("360ee")!=-1}catch(e){}return t||this.Is360Chrome()}};return t.is360chrome()}var i=window,o=i.navigator,s=o.userAgent,u=i.document,c=i.ActiveXObject,a=u.documentMode,f=/^Apple/,l=n()||a||0,d=c||a,h=e(),p={isIE:function(){return!!l}(),ieVersion:function(){return l}(),isChrome:function(){return"chrome"===h}(),is360se:function(){return"360se"===h}(),is360ee:function(){return"360ee"===h||r()}(),isLiebao:function(){return"liebao"===h||s.indexOf("LBBROWSER")>-1}(),isSogou:function(){return"sogou"===h}(),isQQ:function(){return"qq"===h}()};return p}();t.exports=n},function(t,e){"use strict";function n(t,e){if(t){var n=[].slice.call(arguments),r={init:function(t){return this.target=t,this.start=new Date,this.timer=null,this.tick(),this},tick:function(){function t(){if(i<=0)"function"==typeof e&&e(-1),clearInterval(n.timer);else{var t=Math.floor(i/864e5),r=Math.floor(i/36e5)-24*t,o=Math.floor(i/6e4)-60*r-24*t*60,s=Math.ceil(i/1e3)-60*o-60*r*60-24*t*60*60;"function"==typeof e&&e(t,r,o,s)}i-=1e3}var n=this,r=n.target,i=r-n.start;t(),this.timer=setInterval(t,1e3)},stop:function(){clearInterval(this.timer)}};return r.init.apply(r,n)}}t.exports=n},function(t,e,n){"use strict";function r(t){for(var e,n,r=[],o=0,s=t.length;o<s;++o)e=t.charCodeAt(o),n=u[e],!n&&e>65280&&e<65375&&(n=u[e]=String.fromCharCode(e-65248)),r[o]=n?n:t.charAt(o);return r.join("").replace(/[。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％]/g,i).replace("……","…")}function i(t){if(t){var e=c.dbc.indexOf(t);return c.sbc.charAt(e)?c.sbc.charAt(e):t}}var o=n(1),s='[data-toggle="dbc2sbc"]',u={12288:" "},c={dbc:"。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％",sbc:"..,;:?!-~()[]{}<>''\"\"1234567890/@#$%"};o(function(){o(document).on("keyup.util.dbc2sbc",s,function(){var t=o.trim(o(this).val()),e=r(t);o(this).val(e)})}),t.exports=r},function(t,e){"use strict";function n(t,e){var n,r,i,o;t&&(document.selection?(t.focus(),n=document.selection.createRange(),n.text=e,t.focus()):"number"==typeof t.selectionStart?(r=t.selectionStart,i=t.selectionEnd,o=t.scrollTop,t.value=t.value.substring(0,r)+e+t.value.substring(i,t.value.length),t.focus(),t.selectionStart=r+e.length,t.selectionEnd=r+e.length,t.scrollTop=o):(t.value+=e,t.focus()))}t.exports=n},function(t,e,n){"use strict";var r=(n(9),/^\d{4}-\d{1,2}-\d{1,2}$/g),i=function(t,e){var n=[],i=[],o=0,s=0,u=0;if(r.test(t)&&r.test(e))return n=t.split("-"),i=e.split("-"),o=new Date(n[0],parseInt(n[1],10)-1,n[2],0,0,0),s=new Date(i[0],parseInt(i[1],10)-1,i[2],0,0,0),u=Math.floor((s-o)/864e5);throw new Error("start or end param is legal date formatter")};t.exports=i},function(t,e){"use strict";t.exports=function(t){return t>9?t:"0"+t}},function(t,e,n){"use strict";var r=n(9),i=function(t,e){var n=arguments.length<=2||void 0===arguments[2]?"-":arguments[2],i=new Date(t),o=i.getTime()+864e5*e,s=new Date(o);return[s.getFullYear(),r(s.getMonth()+1),r(s.getDate())].join(n)};t.exports=i},function(t,e){"use strict";var n=function(t,e){e=e||2;var n=Number(t),r=void 0;return isNaN(n)?t:(n=Number(t).toFixed(e),r=n.split("."),r[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"."+(r[1]||""))};t.exports=n}])});