/*! 
*  BrickPlus v1.0.5
*  by fronui team
*  updated on 2016-10-09
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.datetimepicker=e(require("jquery")):t.datetimepicker=e(t.jQuery)}(this,function(t){return function(t){function e(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return t[a].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(11)},,function(e,i){e.exports=t},,,,,,,,,function(t,e,i){"use strict";function a(){c("."+h).hide().parent().removeClass("active")}function n(t,e){this.$el=c(t),this.options=c.extend({},n.DEAFULTS,e),this.endDate="",this.uuid="C"+Math.random().toString(36).slice(-8)+"_",this.init()}function o(t){return t=t?t:"{}",new Function("return "+t)()}function s(t){var e=[].slice.call(arguments,1);return c(this).each(function(){var i=c(this),a=i.data("datetimepicker"),s=o(i.data("option")),r={};a||(r=c.extend({},s,"object"===("undefined"==typeof t?"undefined":d(t))?t:{}),i.data("datetimepicker",a=new n(i,r))),"string"==typeof t&&a[t].apply(a,e)})}function r(t){s.call(this,"show"),t.stopPropagation()}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=i(2),p=i(12),l='[data-toggle="datetimepicker"]',h="datetimepicker";n.prototype.init=function(){this.periodObj={},this.periodObj.today=0,this.periodObj.yesterday=1,this.periodObj.aRecent7Days=6,this.periodObj.aRecent14Days=13,this.periodObj.aRecent30Days=29,this.render();var t=this.$el.position(),e=this.$el.outerHeight();this.$calendar.css({top:e+"px",left:t.left+"px"}),this.$header=this.$calendar.find(".datetimepicker-header"),this.periodBtns=this.$header.find(".datetimepicker-btn"),this.$body=this.$calendar.find(".datetimepicker-body"),this.$footer=this.$calendar.find(".datetimepicker-footer"),this.$start=this.$footer.find('[data-action="start"]'),this.$end=this.$footer.find('[data-action="end"]'),this.$confirmBtn=this.$footer.find('[data-action="ok"]'),this.$cancelBtn=this.$footer.find('[data-action="cancel"]'),this.options.period||this.$header.hide()&&this.$footer.hide(),this.__setDefaultValue();var i=0,a=this.options.names;for(a.length>2?2:a.length;i<2;i++)this[0===i?"$start":"$end"].prop("name",a[i]);1===this.options.calendars&&this.options.period&&(this.$cancelBtn.hide(),this.periodBtns.eq(1).hide()),this.__listenEvent()},n.prototype.__setDefaultValue=function(){var t,e=this,i=c.trim(e.$el.val()),a=[],n="";""===i?t=n=e.date2ymd(new Date):i.indexOf(e.options.defaultText)>-1?(a=i.split(e.options.defaultText),2===a.length?e.compareStrDate(a[0],a[1])<0?(t=e.formatDate(a[0]),n=e.formatDate(a[1])):(t=e.formatDate(a[1]),n=e.formatDate(a[0])):t=n=e.formatDate(a[0])):t=n=e.formatDate(c.trim(e.$el.val())),e.setValue(t,n)},n.prototype.setValue=function(t,e,i){this.options.period?(i&&(t!==e&&(t=e=i),this.compareStrDate(i,t)<0?t=i:this.compareStrDate(e,i)<0&&(e=i)),this.$el.val([t,this.options.defaultText,e].join("")),this.endDate=e,this.$end.val(e)):(this.$el.val(t),this.$end.val(t),this.endDate=t),this.$start.val(t)},n.prototype.render=function(){var t=this.options.template?this.options.template:n.TEMPLATE.join("");this.$calendar=c(t),this.$el.after(this.$calendar)},n.prototype.renderCalendar=function(){var t,e=0,i=this.options.calendars,a=this.str2date(this.endDate);for(this.$body.empty();e<i;e++)t=this.fillDate(a.getFullYear(),a.getMonth(),e),0===e?this.$body.append(t):this.$body.prepend(t),a.setMonth(a.getMonth()-1,1);this.__addCss(),this.__setPosition()},n.prototype.__addCss=function(){var t=this.$start.val(),e=this.$end.val(),i=this.str2date(t),a=this.str2date(e),n=this.date2ymd,o=this.uuid,s=this.options.period?"selected":"active";this.$body.find("td").removeClass("selected first last active");for(var r=i;r.getTime()<=a.getTime();r.setDate(r.getDate()+1))c("#"+o+n(r)).addClass(s);this.options.period&&(c("#"+o+t).addClass("first"),c("#"+o+e).addClass("last"))},n.prototype.__setPosition=function(){var t=this.$el.offset(),e=c(window).scrollTop(),i=c(window).height(),a=this.$el.outerHeight(),n=this.$calendar[0].offsetHeight;t.top-e-n<0?this.$calendar.css("top",a+"px"):t.top-e+n>=i?this.$calendar.css("top",-n+"px"):this.$calendar.css("top",a+"px")},n.prototype.__listenEvent=function(){var t=this;this.$el.on("focus",c.proxy(this.show,this)),this.$cancelBtn.on("click",c.proxy(this.close,this)),this.$confirmBtn.on("click",c.proxy(this.confirmSelect,this)),this.$calendar.on("click",function(t){return t.stopPropagation(),!1}),this.$el.on("click",function(e){return t.show(),e.stopPropagation(),!1}),this.$calendar.on("click","[data-date]",function(){t.activeDate(this),t.selectDate(c(this).attr("data-date"))}),this.$calendar.on("click","[data-day]",function(){t.selectPeriod(c(this)),t.selectDate(),t.__togglePeriodBtn(c(this))}),this.$calendar.on("click",'[data-action="prevMonth"]',function(){t.tab(-1)}),this.$calendar.on("click",'[data-action="nextMonth"]',function(){t.tab(1)});var e=function(){t.$calendar.find(".datetimepicker-dropdown").removeClass("active")};this.$calendar.on("click",".datetimepicker-dropdown",function(i){var a=c(this).attr("data-type"),n=c(this).attr("data-index");e(),t.dropDown(this,a,n),i.stopPropagation()}),this.$calendar.on("click.hideDropdown",e),this.$calendar.on("click.setDate",".datetimepicker-dropdown li",function(){t.selectYMD(this)}),c(document).on("click.hide.datetimepicker",c.proxy(this.close,this))},n.prototype.selectPeriod=function(t){var e,i=c(t),a=i.attr("data-day");a=this.periodObj[a],e=this.getSpecialPeriod(a),this.$end.val(e.today),this.$start.val(e.otherday),this.endDate=e.today},n.prototype.__togglePeriodBtn=function(t){this.periodBtns.removeClass("active"),t&&c(t).addClass("active")},n.prototype.getSpecialPeriod=function(t){var e=this,i=new Date;1==e.options.isTodayValid&&""!=e.options.isTodayValid||2>t?"":i.setTime(i.getTime()-864e5);var a=i.getTime()-24*t*60*60*1e3<1e3*e.options.minValidDate?1e3*e.options.minValidDate:i.getTime()-24*t*60*60*1e3,n=i.getFullYear()+"-"+p(i.getMonth()+1)+"-"+p(i.getDate());i.setTime(a);var o=i.getFullYear()+"-"+p(i.getMonth()+1)+"-"+p(i.getDate());return t==e.periodObj.aYesterday&&(n=o),{today:n,otherday:o}},n.prototype.checkDateRange=function(t,e){var i,a=this.str2date(t),n=this.str2date(e),o=a.getTime(),s=n.getTime();return i=s>=o?(s-o)/1e3/60/60/24:(o-s)/1e3/60/60/24,!(i>this.options.dayRangeMax)||(alert("最大时间跨度不能大于："+this.options.dayRangeMax),!1)},n.prototype.selectDate=function(t){var e=c.Event("choose.bp.datetimepicker"),i=this.$start.val(),a=this.$end.val();this.options.period&&t?(this.setValue(i,a,t),this.__addCss(),this.__togglePeriodBtn()):(t||(t=i),this.setValue(t,a),this.$el.trigger(e,[t,a]),"function"==typeof this.options.success&&this.options.success(t,a),this.close())},n.prototype.confirmSelect=function(){var t=this,e=this.$start.val(),i=this.$end.val();t.checkDateRange(e,i)||(e=i=t.date2ymd(new Date),this.$start.val(e),this.$end.val(i)),t.selectDate()},n.prototype.activeDate=function(t){this.$calendar.find("td.active").removeClass("active"),c(t).addClass("active")},n.prototype.tab=function(t){var e=this.str2date(this.endDate);e.setMonth(e.getMonth()+t,1),this.endDate=this.date2ymd(e),this.renderCalendar()},n.prototype.show=function(){var t=c.Event("show.bp.datetimepicker");a(),this.renderCalendar(),this.$calendar.show().addClass("active"),this.__setPosition(),this.$el.trigger(t).parent().addClass("active")},n.prototype.close=function(){var t=c.Event("close.bp.datetimepicker");this.$calendar.hide().removeClass("active"),this.endDate=this.$end.val(),this.$el.trigger(t).parent().removeClass("active")},n.prototype.setMaxDate=function(t){this.options.max=this.formatDate(t)||this.options.max},n.prototype.setMinDate=function(t){this.options.min=this.formatDate(t)||this.options.min},n.prototype.setOption=function(t,e){this.options=c.extend({},this.options,t),e&&this.renderCalendar()},n.prototype.dropDown=function(t,e,i){var a=c(t).find("ul"),n=["<ul>","</ul>"],o=(this.str2date(this.endDate),this.options.max.slice(0,4)||(new Date).getFullYear()+3),s=this.str2date(this.options.min).getFullYear(),r=c(t).attr("data-value"),d=1;if(!a.length){if("month"===e)for(;d<=12;d++)n.splice(-1,-1,'<li data-type="m" data-index="'+i+'"'+(d==r?' class="active"':"")+">"+d+"</li>");else for(d=o;d>=s;d--)n.splice(-1,-1,'<li data-type="y" data-index="'+i+'"'+(d==r?' class="active"':"")+">"+d+"</li>");a=c(n.join("")),c(t).append(a)}c(t).addClass("active")},n.prototype.selectYMD=function(t){var e=c(t),i=e.attr("data-type"),a=e.attr("data-index"),n=this.endDate,o=e.text();o=o>9?o:"0"+o,n="y"===i?n.replace(/(\d{1,4})-(\d{1,2})-(\d{1,2})/g,o+"-$2-01"):n.replace(/(\d{1,4})-(\d{1,2})-(\d{1,2})/g,"$1-"+o+"-$2-01"),n=this.str2date(n),"y"===i?n.setDate(n.getMonth()):n.setMonth(0==a?n.getMonth():n.getMonth()+this.options.calendars-1,1),this.endDate=this.date2ymd(n),this.renderCalendar()},n.prototype.fillDate=function(t,e,i){var a=this,n=new Date(t,e,1),o=new Date(t,e,1),s=o.getDay();o.setDate(1-s);var r=new Date(t,e+1,0),d=new Date(t,e+1,0);s=d.getDay(),d.setDate(d.getDate()+6-s);var p=new Date,l=p.getDate(),h=p.getMonth(),u=p.getFullYear(),f=document.createElement("table"),m=document.createElement("caption");c(m).append('<div class="datetimepicker-dropdown" data-type="year" data-index="'+i+'" data-value="'+t+'">'+t+'<i class="icon-chevron-thin-down"></i></div>年<div class="datetimepicker-dropdown" data-type="month" data-index="'+i+'" data-value="'+(e+1)+'">'+(e+1)+'<i class="icon-chevron-thin-down"></i></div>月'),c(f).append(m);for(var y=document.createElement("thead"),v=document.createElement("tr"),g=["日","一","二","三","四","五","六"],D=0,b="";D<7;D++)b+="<th>"+g[D]+"</th>";c(v).html(b),c(y).append(v),c(f).append(y),v=document.createElement("tr");var $=document.createElement("td");0==i&&c($).append('<a href="javascript:void(0);" class="datetimepicker-next-month" data-action="nextMonth"><i class="icon-chevron-thin-right"></i></a>'),i+1==this.options.calendars&&c($).append('<a href="javascript:void(0);" class="datetimepicker-prev-month" data-action="prevMonth"><i class="icon-chevron-thin-left"></i></a>'),c($).attr("colSpan",7).css({"text-align":"center",height:"0px"}),c(v).append($),c(f).append(v);for(var x="",k=0,T="",C=o;C.getTime()<=d.getTime();C.setDate(C.getDate()+1)){if(C.getTime()<n.getTime())x="disabled",k="-1";else if(C.getTime()>r.getTime())x="disabled",k="1";else if(1==this.options.stopToday&&C.getTime()>p.getTime()||C.getTime()<a.str2date(a.options.min)||""!==a.str2date(a.options.max)&&C.getTime()>a.str2date(a.options.max))x="disabled",k="2";else{if(k="0",C.getDate()==l&&C.getMonth()==h&&C.getFullYear()==u?1==this.options.isTodayValid?x="today":(x="disabled",k="2"):x="",!this.options.weekendDis||6!=C.getDay()&&0!=C.getDay()||(x="disabled",k="3"),this.options.disCertainDay&&this.options.disCertainDay.length>0)for(var w in this.options.disCertainDay)isNaN(this.options.disCertainDay[w])||C.getDay()!==this.options.disCertainDay[w]||(x="disabled",k="4");if(this.options.disCertainDate&&this.options.disCertainDate.length>0){var M=!1;for(var w in this.options.disCertainDate)if(!isNaN(this.options.disCertainDate[w])||isNaN(parseInt(this.options.disCertainDate[w])))if(this.options.disCertainDate[0]===!0){if(M=!(C.getDate()===this.options.disCertainDate[w]),!M)break}else if(M=!(C.getDate()!==this.options.disCertainDate[w]))break;M&&(x="disabled",k="4")}}0==C.getDay()&&(v=document.createElement("tr")),$=document.createElement("td"),$.innerHTML=C.getDate(),""!=x&&c($).attr("class",x),0==k&&(T=a.date2ymd(C),c($).attr({"data-date":T,id:this.uuid+T}).css("cursor","pointer")),c(v).append($),6==C.getDay()&&c(f).append(v)}return f},n.prototype.str2date=function(t){var e=t.split("-");return new Date(e[0],e[1]-1,e[2])},n.prototype.compareStrDate=function(t,e){var i=this.str2date(t),a=this.str2date(e);return i.getTime()>a.getTime()?1:i.getTime()==a.getTime()?0:-1},n.prototype.date2ymd=function(t){return[t.getFullYear(),p(t.getMonth()+1),p(t.getDate())].join("-")},n.prototype.formatDate=function(t){return t.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g,function(t,e,i,a){return i<10&&(i="0"+parseInt(i,10)),a<10&&(a="0"+parseInt(a,10)),e+"-"+i+"-"+a})},n.DEAFULTS={period:!1,defaultText:" 至 ",calendars:2,dayRangeMax:366,isTodayValid:!0,min:"1970-01-01",max:"",names:[],stopToday:!1,weekendDis:!1,disCertainDay:[],disCertainDate:[],success:c.noop},n.TEMPLATE=['<div class="'+h+' clearfix">','<div class="'+h+'-header">','<button type="button" class="'+h+'-btn" data-day="today">今天</button>','<button type="button" class="'+h+'-btn" data-day="yesterday">2天</button>','<button type="button" class="'+h+'-btn" data-day="aRecent7Days">7天</button>','<button type="button" class="'+h+'-btn" data-day="aRecent14Days">14天</button>','<button type="button" class="'+h+'-btn" data-day="aRecent30Days">30天</button>',"</div>",'<div class="'+h+'-body clearfix">',"</div>",'<div class="'+h+'-footer clearfix">','<div class="'+h+'-msg">','<div class="form-smaller">','<input type="text" class="form-control" data-action="start" readonly />','<span class="'+h+'-msg-line"> - </span>','<input type="text" class="form-control" data-action="end" readonly /><br />',"</div>","</div>",'<div class="'+h+'-btns">','<button type="button" class="btn primary small-btn" data-action="ok" type="button">确定</button>','<button type="button" class="btn default small-btn" data-action="cancel" type="button">取消</button>',"</div>","</div>","</div>"],c.fn.datetimepicker=s,c.fn.datetimepicker.constructor=n,c(function(){c(document).on("click.datetimepicker",l,r),c(document).on("click.datetimepicker",".form-control-date-btn",function(t){var e=c(this).siblings(l);e.length&&r.call(e,t)})}),t.exports=n},function(t,e){"use strict";function i(t){return t>9?t:"0"+t}t.exports=i}])});