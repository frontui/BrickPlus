/*! 
*  BrickPlus v1.0.3
*  by fronui team
*  updated on 2016-09-28
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.pagination=e(require("jquery")):t.pagination=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(a[i])return a[i].exports;var s=a[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}({0:function(t,e,a){t.exports=a(17)},2:function(e,a){e.exports=t},17:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){for(var e=arguments.length,a=Array(e>1?e-1:0),i=1;e>i;i++)a[i-1]=arguments[i];return(0,l["default"])(this).each(function(){var e=(0,l["default"])(this);if(!e.hasClass("no-js")){var i=e.data("bp.pagination");i||e.data("bp.pagination",i=new u(e,l["default"].extend({},e.data(),t))),"string"==typeof t&&i[t].apply(i,a)}})}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),o=a(2),l=i(o),p='.paginations,[data-toggle="pagination"]',h='<p class="p-add-ons fn-mr-15">查找到&nbsp;{$items}&nbsp;条记录，共&nbsp;{$totalPages}&nbsp;页</p>',u=function(){function t(e,a){s(this,t),this.el=(0,l["default"])(e),this.__init(a)}return r(t,[{key:"__init",value:function(t,e){this.__setProps(t);var a=this.props,i=a.itemsOnPage,s=a.items,n=a.currentPage,r=a.totalPages,o=a.visiblePages;this.totalPages=r&&!s?r:Math.ceil(s/i)?Math.ceil(s/i):1,this.items=s?s:this.totalPages*i,this.currentPage=n-1,this.halfVisible=o/2,this.__render(),!e&&this.__initEvent(),this.go(n)}},{key:"__setProps",value:function(e){this.props=l["default"].extend({},t.DEFAULTS,e)}},{key:"__initEvent",value:function(){var t=this;this.el.on("click.bp.pagination","a[data-page]",function(e){e.preventDefault(),t.selectPage((0,l["default"])(e.target).data("page"))})}},{key:"__getInterval",value:function(){return{start:Math.ceil(this.currentPage>this.halfVisible?Math.max(Math.min(this.currentPage-this.halfVisible,this.totalPages-this.props.visiblePages),0):0),end:Math.ceil(this.currentPage>this.halfVisible?Math.min(this.currentPage+this.halfVisible,this.totalPages):Math.min(this.props.visiblePages,this.totalPages))}}},{key:"__append",value:function(t,e,a){var i=void 0,s=void 0,n=void 0;t=0>t?0:t<this.totalPages?t:this.totalPages-1,s=l["default"].extend({text:t+1},e),n=a?"":'class="active"',i=t===this.currentPage?"<li "+n+"><span>"+s.text+"</span></li>":l["default"].inArray(t+1,this.props.disabledPages)>-1?'<li class="disabled"><span>'+s.text+"</span></li>":'<li><a href="#page-'+(t+1)+'" data-page="'+(t+1)+'">'+s.text+"</a></li>",this.el.append(i)}},{key:"__render",value:function(){var t=this.props,e=this.__getInterval(),a=0;if(this.el.empty(),t.first&&this.__append(0,{text:t.first},!0),t.prev&&this.currentPage-1>=0&&this.__append(this.currentPage-1,{text:t.prev},!0),e.start>=0&&t.edges>0){for(var i=Math.min(t.edges,e.start),s=0;i>s;s++)this.__append(s);t.edges<e.start&&e.start-t.edges!=1?this.el.append("<li><span>...</span><li>"):e.start-t.edges===1&&this.__append(t.edges)}for(a=e.start;a<e.end;a++)this.__append(a);if(e.end<this.totalPages&&t.edges>0){this.totalPages-t.edges>e.end&&this.totalPages-t.edges-e.end!==1?this.el.append("<li><span>...</span></li>"):this.totalPages-t.edges-e.end===1&&this.__append(e.end++);var n=Math.max(this.totalPages-t.edges,e.end);for(a=n;a<this.totalPages;a++)this.__append(a)}t.next&&this.currentPage<this.totalPages-1&&this.__append(this.currentPage+1,{text:t.next},!0),t.last&&this.__append(this.totalPages,{text:t.last},!0),this.__renderPageStr()}},{key:"selectPage",value:function(t,e){this.currentPage=t-1,this.render(e),this.props.onSelectPage(t,this),this.el.trigger("select.bp.pagination",[t,this])}},{key:"render",value:function(t){this.totalPages=t?t:this.totalPages,this.__render()}},{key:"go",value:function(t){this.selectPage(t)}},{key:"__renderPageStr",value:function(){var t=this;if(this.props.pageStr&&this.props.pageStr.show){var e=this.el.prevAll(),a=this.props.pageStr.template||h;a=a.replace(/{\$(\w*)}/gi,function(e,a,i){return t[a]?t[a]:0}),e.length&&e.empty().remove(),this.el.before((0,l["default"])(a))}}},{key:"destory",value:function(t){return this.el.empty(),this.el.removeData("bp.pagination"),this}},{key:"reset",value:function(t){t=l["default"].extend({},this.props,t),this.destory().__init(t,!0),this.el.data("bp.pagination")||this.el.data("bp.pagination",this)}}]),t}();e["default"]=u;var d={items:0,itemsOnPage:5,totalPages:0,visiblePages:5,edges:1,currentPage:1,pageStr:{show:!1,template:""},disabledPages:[],prev:"&lsaquo;",next:"&rsaquo;",first:"&laquo;",last:"&raquo;",onSelectPage:l["default"].noop};u.DEFAULTS=d,l["default"].fn.pagination=n,l["default"].fn.pagination.Constructor=u,(0,l["default"])(function(){(0,l["default"])(p).pagination()})}})});