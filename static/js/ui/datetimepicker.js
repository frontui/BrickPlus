/**!
 * 日期控件
 * tommyshao <jinhong.shao@frontpay.cn>
 * Reference laydate v1.1 http://sentsin.com/layui/laydate
 * Version 1.0.0
 * 2015-07-29
 * useage:
 * 	## skin: default|blue|orange|red|green
 *
 *  ## $(element).datetimepicker(option);
 *
 *  ## $(element).on('choose.ui.datetimepicker', function(e, date){});
 *
 * 	## <input data-toggle="datetimepicker" data-skin="red"  />
 *
 * ## options
 *
	 skin: 'default', //皮肤
	 event: 'click', //触发事件
	 format: 'YYYY-MM-DD hh:mm:ss', //日期格式
	 istime: false, //是否开启时间选择
	 isclear: true, //是否显示清空
	 istoday: true, //是否显示今天
	 issure: true, 是否显示确认
	 festival: true //是否显示节日
	 min: '1900-01-01 00:00:00', //最小日期
	 max: '2099-12-31 23:59:59', //最大日期
	 start: '2014-6-15 23:00:00',    //开始日期
	 fixed: false, //是否固定在可视区域
	 zIndex: 99999999, //css z-index
	 choose: function(dates){ //选择好日期的回调}
 *
 */

;(function (root, factory) {

	if (typeof define === 'function' && define.amd) {
		define('ui/datetimepicker', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}

}(this, function ($) {


	//全局配置，如果采用默认均不需要改动
	var config =  {
		skin: 'default', //初始化皮肤
		format: 'YYYY-MM-DD', //日期格式
		min: '1900-01-01 00:00:00', //最小日期
		max: '2099-12-31 23:59:59', //最大日期
		istime: false
	};

	var Dates = {}, $body = $(document.body);
	var as = ['laydate_box', 'laydate_void', 'laydate_click'];


	var laydate = function(options){
		options = $.extend({}, config, options);
		Dates.run(options);
		return laydate;
	};

	laydate.v = '1.1';

	Dates.trim = function(str){
		str = str || '';
		return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
	};

//补齐数位
	Dates.digit = function(num){
		return num < 10 ? '0' + (num|0) : num;
	};

//阻断mouseup
	Dates.stopMosup = function(evt, elem){
		if(evt !== 'mouseup'){
			$(elem).on('mouseup', function(ev) {
				ev.stopPropagation();
			})
		}
	};

	Dates.run = function(options){
		var elem = options.elem ? $(options.elem) : null;
		var e = $.Event('show.ui.datetimepicker', {relatedTarge: elem});
		if(!elem) return;
		Dates.view(elem, options);
		Dates.reshow();

		$(elem).trigger(e);
	};

	Dates.scroll = function(type){
		type = type ? 'scrollLeft' : 'scrollTop';
		return document.body[type] | document.documentElement[type];
	};

	Dates.winarea = function(type){
		return document.documentElement[type ? 'clientWidth' : 'clientHeight']
	};

//判断闰年
	Dates.isleap = function(year){
		return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
	};

//检测是否在有效期
	Dates.checkVoid = function(YY, MM, DD){
		var back = [];
		YY = YY|0;
		MM = MM|0;
		DD = DD|0;


		if(YY < Dates.mins[0]){
			back = ['y'];
		} else if(YY > Dates.maxs[0]){
			back = ['y', 1];
		} else if(YY >= Dates.mins[0] && YY <= Dates.maxs[0]){
			if(YY == Dates.mins[0]){
				if(MM < Dates.mins[1]){
					back = ['m'];
				} else if(MM == Dates.mins[1]){
					if(DD < Dates.mins[2]){
						back = ['d'];
					}
				}
			}
			if(YY == Dates.maxs[0]){
				if(MM > Dates.maxs[1]){
					back = ['m', 1];
				} else if(MM == Dates.maxs[1]){
					if(DD > Dates.maxs[2]){
						back = ['d', 1];
					}
				}
			}
		}
		return back;
	};

//时分秒的有效检测
	Dates.timeVoid = function(times, index){
		if(Dates.ymd[1]+1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]){
			if(index === 0 && (times < Dates.mins[3])){
				return 1;
			} else if(index === 1 && times < Dates.mins[4]){
				return 1;
			} else if(index === 2 && times < Dates.mins[5]){
				return 1;
			}
		} else if(Dates.ymd[1]+1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]){
			if(index === 0 && times > Dates.maxs[3]){
				return 1;
			} else if(index === 1 && times > Dates.maxs[4]){
				return 1;
			} else if(index === 2 && times > Dates.maxs[5]){
				return 1;
			}
		}
		if(times > (index ? 59 : 23)){
			return 1;
		}
	};

//检测日期是否合法
	Dates.check = function(){
		var reg = Dates.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,'\\d+\\').replace(/\\$/g, '');
		var exp = new RegExp(reg), value = $(Dates.elem)[as.elemv]();
		var arr = value.match(/\d+/g) || [], isvoid;

		if(!Dates.options.format.match(/YYYY/g)) {
			var _yyyy = (new Date()).getFullYear();
			arr.unshift(_yyyy);
		}

		isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);

		if(value.replace(/\s/g, '') !== ''){
			if(!exp.test(value)){
				$(Dates.elem)[as.elemv]('');
				Dates.msg('日期不符合格式，请重新选择。');
				return 1;
			} else if(isvoid[0]){
				$(Dates.elem)[as.elemv]('');
				Dates.msg('日期不在有效期内，请重新选择。');
				return 1;
			} else {
				isvoid.value = Dates.elem[as.elemv]().match(exp).join();
				arr = isvoid.value.match(/\d+/g);

				if(!Dates.options.format.match(/YYYY/g)) {
					var _yyyy = (new Date()).getFullYear();
					arr.unshift(_yyyy);
				}


				if(arr[1] < 1){
					arr[1] = 1;
					isvoid.auto = 1;
				} else if(arr[1] > 12){
					arr[1] = 12;
					isvoid.auto = 1;
				} else if(arr[1].length < 2){
					isvoid.auto = 1;
				}
				if(arr.length > 2) {
					if(arr[2] < 1){
						arr[2] = 1;
						isvoid.auto = 1;
					} else if(arr[2] > Dates.months[(arr[1]|0)-1]){
						arr[2] = 31;
						isvoid.auto = 1;
					} else if(arr[2].length < 2){
						isvoid.auto = 1;
					}
				}

				if(arr.length > 3){
					if(Dates.timeVoid(arr[3], 0)){
						isvoid.auto = 1;
					};
					if(Dates.timeVoid(arr[4], 1)){
						isvoid.auto = 1;
					};
					if(Dates.timeVoid(arr[5], 2)){
						isvoid.auto = 1;
					};
				}
				if(isvoid.auto){
					console.log(arr);
					Dates.creation([arr[0], arr[1]|0, arr[2]|0], 1);
				} else if(isvoid.value !== Dates.elem[as.elemv]()){
					Dates.elem[as.elemv](isvoid.value);
				}
			}
		}
	};

//生成日期
	Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	Dates.viewDate = function(Y, M, D){
		var log = {}, De = new Date();
		Y < (Dates.mins[0]|0) && (Y = (Dates.mins[0]|0));
		Y > (Dates.maxs[0]|0) && (Y = (Dates.maxs[0]|0));

		De.setFullYear(Y, M, D);
		log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];

		Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;

		De.setFullYear(log.ymd[0], log.ymd[1], 1);
		log.FDay = De.getDay();

		log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
		log.NDay = 1;

		//渲染日
		$.each(as.tds, function(i, elem){
			var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
			elem.className = '';
			if(i < log.FDay){
				elem.innerHTML = DD = i + log.PDay;
				$(elem).addClass('laydate_nothis');
				MM === 1 && (YY -= 1);
				MM = MM === 1 ? 12 : MM - 1;
			} else if(i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]){
				elem.innerHTML = DD = i  - log.FDay + 1;
				if(i - log.FDay + 1 === log.ymd[2]){
					$(elem).addClass(as[2]);
					log.thisDay = elem;
				}
			} else {
				elem.innerHTML = DD = log.NDay++;
				$(elem).addClass('laydate_nothis');
				MM === 12 && (YY += 1);
				MM = MM === 12 ? 1 : MM + 1;
			}

			if(Dates.checkVoid(YY, MM, DD)[0]){
				$(elem).addClass(as[1]);
			}

			Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
			$(elem).attr({'y': YY, 'm': MM, 'd': DD});
			YY = MM = DD = null;
		});

		Dates.valid = !$(log.thisDay).hasClass(as[1]); //!Dates.hasClass(log.thisDay, as[1]);
		Dates.ymd = log.ymd;

		//锁定年月
		as.year.val(Dates.ymd[0] + '年');
		as.month.val(Dates.digit(Dates.ymd[1] + 1) + '月');

		//定位月
		$.each(as.mms, function(i, elem){
			var getCheck = Dates.checkVoid(Dates.ymd[0], ($(elem).attr('m')|0) + 1);
			if(getCheck[0] === 'y' || getCheck[0] === 'm'){
				//Dates.addClass(elem, as[1]);
				$(elem).addClass(as[1]);
			} else {
				$(elem).removeClass(as[1]);
			}
			$(elem).removeClass(as[2]);
			getCheck = null
		});
		$(as.mms[Dates.ymd[1]]).addClass(as[2]);

		//定位时分秒
		log.times = [
			Dates.inymd[3]|0 || 0,
			Dates.inymd[4]|0 || 0,
			Dates.inymd[5]|0 || 0
		];

		$.each([0,1,2], function(i) {
			Dates.hmsin[i].value = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i+3]|0 : log.times[i]|0);
		});

		//确定按钮状态
		$(as.ok)[Dates.valid ? 'removeClass' : 'addClass'](as[1]);
	};

//节日
	Dates.festival = function(td, md){
		var str;
		switch(md){
			case '1.1':
				str = '元旦';
				break;
			case '3.8':
				str = '妇女';
				break;
			case '4.5':
				str = '清明';
				break;
			case '5.1':
				str = '劳动';
				break;
			case '6.1':
				str = '儿童';
				break;
			case '9.10':
				str = '教师';
				break;
			case '10.1':
				str = '国庆';
				break;
		};
		str && (td.innerHTML = str);
		str = null;
	};

//生成年列表
	Dates.viewYears = function(YY){
		var str = '';
		$.each(new Array(14), function(i){
			if(i === 7) {
				str += '<li '+ (parseInt(as.year.value) === YY ? 'class="'+ as[2] +'"' : '') +' y="'+ YY +'">'+ YY +'年</li>';
			} else {
				str += '<li y="'+ (YY-7+i) +'">'+ (YY-7+i) +'年</li>';
			}
		});

		$('#laydate_ys').html(str);

		$('#laydate_ys li').each(function() {
			if(Dates.checkVoid($(this).attr('y'))[0] === 'y') {
				$(this).addClass(as[1]);
			} else {
				$(this).on('click', function(ev) {
					ev.stopPropagation();
					Dates.reshow();
					Dates.viewDate($(this).attr('y') |0, Dates.ymd[1], Dates.ymd[2]);
				})
			}
		});
	};

//初始化面板数据
	Dates.initDate = function(){
		var De = new Date();
		var elemVal = $(Dates.elem).val();
		var ymd = elemVal.match(/\d+/g) || [];
		var format = Dates.options ? Dates.options.format : config.format;
		if($.trim(elemVal) == "") {
			ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
		}else if(ymd.length < 3){
			if(!format.match(/YYYY/g)) {
				ymd.unshift(De.getFullYear());
			} else {
				if(Dates.options.start == "") {
					ymd.push("01");
				} else {
					ymd = Dates.options.start.match(/\d+/g) || [];
					if(ymd.length < 3){
						ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
					}
				}
			}
		}
		Dates.inymd = ymd;
		Dates.viewDate(ymd[0], ymd[1]-1, ymd[2]);
	};

//是否显示零件
	Dates.iswrite = function(){

		var log = { time: $('#laydate_hms')};
		log.time[Dates.options.istime ? 'show': 'hide']();
		$(as.oclear)['isclear' in Dates.options && Dates.options.isclear === false ? 'hide' : 'show']();
		$(as.otoday)['istoday' in Dates.options && Dates.options.istoday === false ? 'hide' : 'show']();
		$(as.ok)['issure' in Dates.options && Dates.options.issure === false ? 'hide' : 'show']();
	};

//方位辨别
	Dates.orien = function(obj, pos){

		var tops, rect = $(Dates.elem)[0].getBoundingClientRect();
		obj.css('left', (rect.left + (pos ? 0 : Dates.scroll(1)) +'px'));
		if(rect.bottom + obj[0].offsetHeight/1.5 <= Dates.winarea()){
			tops = rect.bottom - 1;
		} else {
			tops = rect.top > obj[0].offsetHeight/1.5 ? rect.top - obj[0].offsetHeight + 1 : Dates.winarea() - obj[0].offsetHeight;
		}
		obj.css('top', (Math.max(tops + (pos ? 0 : Dates.scroll()), 1)) + 'px');
	};

//吸附定位
	Dates.follow = function(obj){
		if(Dates.options.fixed){
			$(obj).css('position', 'fixed');
			Dates.orien(obj, 1);
		} else {
			$(obj).css('position', 'absolute');
			Dates.orien(obj);
		}
	};

//生成表格
	Dates.viewtb = (function(){
		var tr, view = [], weeks = [ '日', '一', '二', '三', '四', '五', '六'];
		var log = {}, div = $('<div />'), table = $('<table />'), thead = $('<thead />');
		//thead.append($('<tr />'));
		log.creath = function(i){
			var th = $('<th>'+ weeks[i] +'</th>');
			thead.append(th);
			th = null;
		};

		$.each(new Array(6), function(i) {
			view.push([]);
			tr = $('<tr />');
			$.each(new Array(7), function(j) {
				view[i][j] = 0;
				i === 0 && log.creath(j);
				tr.append('<td>'+ j +'</td>');
			})
			table.append(tr);
		});

		table.attr({'id': 'laydate_table', 'class': 'laydate_table'}).prepend(thead).appendTo(div);
		tr = view = null;
		return div.html();
	}());

//渲染控件骨架
	Dates.view = function(elem, options){
		var div, log = {};
		options = options || elem;

		Dates.elem = $(elem);
		Dates.options = options;
		Dates.options.format || (Dates.options.format = config.format);

        var $$min = Dates.elem.data('min'), $$max = Dates.elem.data('max');
		Dates.options.start = Dates.options.start || '';
		Dates.mm = log.mm = [$$min || Dates.options.min || config.min, $$max || Dates.options.max || config.max];
		Dates.mins = log.mm[0].match(/\d+/g);
		Dates.maxs = log.mm[1].match(/\d+/g);

		as.elemv = /textarea|input/i.test(Dates.elem[0].tagName) ? 'val' : 'html';

		if(!Dates.box){

			div = $('<div id="'+ as[0] +'" class="'+ as[0] +'" />').css('position', 'absolute').hide();
			log.html = '<div class="laydate_top">'
					+'<div class="laydate_ym laydate_y" id="laydate_YY">'
					+'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
					+'<input id="laydate_y" readonly><label></label>'
					+'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
					+'<div class="laydate_yms">'
					+'<a class="laydate_tab laydate_chtop"><cite></cite></a>'
					+'<ul id="laydate_ys"></ul>'
					+'<a class="laydate_tab laydate_chdown"><cite></cite></a>'
					+'</div>'
					+'</div>'
					+'<div class="laydate_ym laydate_m" id="laydate_MM">'
					+'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
					+'<input id="laydate_m" readonly><label></label>'
					+'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
					+'<div class="laydate_yms" id="laydate_ms">'+ function(){
						var str = '';
						$.each(new Array(12), function(i){
							str += '<span m="'+ i +'">'+ Dates.digit(i+1) +'月</span>';
						});
						return str;
					}() +'</div>'
					+'</div>'
					+'</div>'

					+ Dates.viewtb

					+'<div class="laydate_bottom">'
					+'<ul id="laydate_hms">'
					+'<li class="laydate_sj">时间</li>'
					+'<li><input readonly>:</li>'
					+'<li><input readonly>:</li>'
					+'<li><input readonly></li>'
					+'</ul>'
					+'<div class="laydate_time" id="laydate_time"></div>'
					+'<div class="laydate_btn">'
					+'<a id="laydate_clear">清空</a>'
					+'<a id="laydate_today">今天</a>'
					+'<a id="laydate_ok">确认</a>'
					+'</div>'
						//+(config.isv ? '<a href="http://sentsin.com/layui/laydate/" class="laydate_v" target="_blank">laydate-v'+ laydate.v +'</a>' : '')
					+'</div>';

			div.html(log.html);

			if(options.skin && typeof options.skin === 'string' && options.skin !== 'default') div.addClass(as[0]+'_'+ options.skin);

			$body.append(div);
			Dates.box = div;

			Dates.events();
			div = null;
		}
		//else {
		//	$(Dates.box).show();
		//}

		Dates.follow(
				$(Dates.box).attr('class', function(){
					return as[0] + (options.skin === 'default' ? '' : ' ' + as[0] + '_' + options.skin);
				}).show()
		);
		options.zIndex ? $(Dates.box).css('z-index', options.zIndex) : $(Dates.box).css('z-index', 'auto');
		Dates.stopMosup('click', Dates.box);
		//alert($('#laydate_table').outerWidth())

		Dates.initDate();
		Dates.iswrite();
		Dates.check();
	};

//隐藏内部弹出元素
	Dates.reshow = function(){
		$('#'+ as[0] +' .laydate_show').removeClass('laydate_show');
		return this;
	};

//关闭控件
	Dates.close = function(){
		var e = $.Event('close.ui.datetimepicker', {relateTarget: Dates.elem});
		Dates.reshow();
		$('#'+ as[0]).hide();
		$(Dates.elem).trigger(e);
		Dates.elem = null;
	};

//转换日期格式
	Dates.parse = function(ymd, hms, format){
		ymd = ymd.concat(hms);
		format = format || (Dates.options ? Dates.options.format : config.format);

		if(!format.match(/YYYY/g)) {
			ymd.shift();
		}

		return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index){
			ymd.index = ++ymd.index|0;
			return Dates.digit(ymd[ymd.index]);
		});
	};

//返回最终日期
	Dates.creation = function(ymd, hide){
		var hms = Dates.hmsin;
		var getDates = Dates.parse(ymd, [hms[0].value, hms[1].value, hms[2].value]);
		var $this = Dates.elem;
		Dates.elem[as.elemv](getDates);
		//console.log(Dates.elem);
		if(!hide){
			Dates.close();
			typeof Dates.options.choose === 'function' && Dates.options.choose(getDates);
            var e = $.Event('choose.ui.datetimepicker', {relatedTarget: $this});
            $this.trigger(e, getDates);
		}
	};

//事件
	Dates.events = function(){
		var log = { box: '#'+as[0] };

		$body.addClass('laydate_body');

		as.tds = $('#laydate_table td');
		as.mms = $('#laydate_ms span');
		as.year = $('#laydate_y');
		as.month = $('#laydate_m');

		//显示更多年月
		$(log.box).on('click', ' .laydate_ym', function(ev) {
			ev.stopPropagation();
			var i = $(this).index();
			Dates.reshow();
			$(this).find('div').eq(0).addClass('laydate_show');
			if(!i) {
				log.YY = parseInt(as.year.val());
				Dates.viewYears(log.YY);
			}
		});

		$(log.box).on('click', $.proxy(Dates.reshow, Dates));

		//切换年
		log.tabYear = function(type){
			if(type === 0){
				Dates.ymd[0]--;
			} else if(type === 1) {
				Dates.ymd[0]++;
			} else if(type === 2) {
				log.YY -= 14;
			} else {
				log.YY += 14;
			}
			if(type < 2){
				Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
				Dates.reshow();
			} else {
				Dates.viewYears(log.YY);
			}
		};

		$('#laydate_YY .laydate_tab').each(function(i){
			$(this).on('click', function(e){
				e.stopPropagation();
				log.tabYear(i);
			})
		});


		//切换月
		log.tabMonth = function(type){
			if(type){
				Dates.ymd[1]++;
				if(Dates.ymd[1] === 12){
					Dates.ymd[0]++;
					Dates.ymd[1] = 0;
				}
			} else {
				Dates.ymd[1]--;
				if(Dates.ymd[1] === -1){
					Dates.ymd[0]--;
					Dates.ymd[1] = 11;
				}
			}
			Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
		};

		$('#laydate_MM').on('click', '.laydate_tab', function(ev) {
			ev.stopPropagation();
			var i = $(this).index();
			Dates.reshow();
			log.tabMonth(i);
		});

		//选择月
		$('#laydate_ms').on('click', 'span', function(ev) {
			ev.stopPropagation();
			if(!$(this).hasClass(as[1])) {
				Dates.reshow();
				Dates.viewDate(Dates.ymd[0], $(this).attr('m')|0, Dates.ymd[2]);
			}
		});

		//选择日
		$('#laydate_table').on('click', 'td', function(ev) {
			if(!$(this).hasClass(as[1])) {
				ev.stopPropagation();
				Dates.creation([$(this).attr('y')|0, $(this).attr('m')|0, $(this).attr('d')|0]);
			}
		});

		//清空
		as.oclear = $('#laydate_clear').on('click', function() {
			Dates.elem[as.elemv]('');
			Dates.close();
		});

		//今天
		as.otoday = $('#laydate_today').on('click', function(){
			var now = new Date();
			Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
		});

		//确认
		as.ok = $('#laydate_ok').on('click', function(){
			if(Dates.valid) {
				Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
			}
		});

		//选择时分秒
		log.times = $('#laydate_time');
		Dates.hmsin = log.hmsin = $('#laydate_hms input');
		log.hmss = ['小时', '分钟', '秒数'];
		log.hmsarr = [];

		//生成时分秒或警告信息
		Dates.msg = function(i, title){
			var str = '<div class="laydte_hsmtex">'+ (title || '提示') +'<span>×</span></div>';
			if(typeof i === 'string'){
				str += '<p>'+ i +'</p>';
				$('#'+as[0]).show();
				$(log.times).removeClass('laydate_time1').addClass('laydata_msg');
			} else {
				if(!log.hmsarr[i]){
					str += '<div id="laydate_hmsno" class="laydate_hmsno">';
					$.each(new Array(i === 0 ? 24 : 60), function(i) {
						str += '<span>'+ i +'</span>';
					});
					str += '</div>'
					log.hmsarr[i] = str;
				} else {
					str = log.hmsarr[i];
				}
				$(log.times).removeClass('laydate_msg');
				$(log.times)[i=== 0 ? 'removeClass' : 'addClass']('laydate_time1');
			}
			//alert(log.times);
			$(log.times).addClass('laydate_show').html(str);
		};

		log.hmson = function(input, index){
			var span = $('#laydate_hmsno span'), set = Dates.valid ? null : 1;
			span.each(function(i) {
				if(set || Dates.timeVoid(i, index)) {
					$(this).addClass(as[1])
				}
			}).on('click', function() {
				if(!$(this).hasClass(as[1])) {
					input.value = Dates.digit($(this).html() || 0);
				}
			});
			$(span).eq(input.value || 0).addClass('laydate_click');
		};

		//展开选择
		//console.log(log.hmsin);
		$(log.hmsin).each(function(i){
			$(this).on('click', function(ev) {
				ev.stopPropagation();
				Dates.reshow();
				Dates.msg(i, log.hmss[i]);
				log.hmson(this, i);
			});
		});

		$(document).on('mouseup', function(ev) {
			var box = $('#'+ as[0]);
			if(box && box.length > 0 && box.is(':visible')) {
				Dates.check() || Dates.close();
			}
		}).on('mousedown', function(ev) {
			if(ev.which === 13 && Dates.elem && Dates.elem.length > 0) {
				Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
			}
		});
	};


//重置定位
	laydate.reset = function(){
		(Dates.box && Dates.box.length && Dates.elem) && Dates.follow(Dates.box);
	};

//返回指定日期
	laydate.now = function(timestamp, format){
		var De = new Date((timestamp|0) ? function(tamp){
			return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
		}(parseInt(timestamp)) : +new Date);
		return Dates.parse(
				[De.getFullYear(), De.getMonth()+1, De.getDate()],
				[De.getHours(), De.getMinutes(), De.getSeconds()],
				format
		);
	};


	function DateTimePicker(element, option) {
		this.$element = $(element);
		this.option = $.extend({ elem: this.$element, event: 'focus' }, option);
		//laydate(option);
	}

	DateTimePicker.prototype.show = function(option){
		option = $.extend({ elem: this.$element, event: 'focus' }, this.option, option);
		laydate(option);
	};

	DateTimePicker.VERSION = '1.0.0';



	function Plugin(option) {
		return $(this).each(function(){
			var $this = $(this);
			var options = $.extend({}, $this.data(), option && typeof option == "object");
			var data = $(this).data('ui.datetimepicker');

			if(!data) $(this).data('ui.datetimepicker', (data = new DateTimePicker(this, options)));
			if(typeof option === 'string') data[option]();
		});
	}

	$.fn.datetimepicker = Plugin;
	$.fn.datetimepicker.constructor = DateTimePicker;

	// DATA-API
	var clickHandler = function(e) {
		e.preventDefault();

		$(this).one('close.ui.datetimepicker', function(){
			if($(this).hasClass('active')) $(this).removeClass('active');
			if($(this).parent('.form-control-date').hasClass('active')) $(this).parent('.form-control-date').removeClass('active');
		}).one('show.ui.datetimepicker', function(){
			if($(this).parent('.form-control-date').length) $(this).parent('.form-control-date').addClass('active');
		});

		Plugin.call($(this), 'show');
	};

	$(function(){
		var UA = window.navigator.userAgent;
		if(/msie/gi.test(UA)) { // fix ie bug
			var $el = $('<input />').hide().appendTo($(document.body));
			laydate({elem: $el[0]});
			Dates.close();
			$el.remove();
		}
		//$(document).on('click.ui.datetimepicker', '[data-toggle="datetimepicker"]', clickHandler);
		$(document).on('click.ui.datetimepicker', function(ev) {
			var that = ev.target;
			$(that).is('[data-toggle="datetimepicker"]') && clickHandler.call(that, ev);
		});
	});


	return DateTimePicker;

}));
