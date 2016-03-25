/**
 * baidu echarts
 * amd
 */
define('payweCharts', ['echarts', 'echarts/chart/line', 'echarts/theme/paywe'], function(Echarts, Line, Theme){

	// 自定义paywe的charts图表，提供简易api
	var payweChart = function(obj, options){
		return this.init(obj, options);
	};

	/* 格式化时间 */
    payweChart.formatTimer = function(str) {
        var fmt = str, year;
        if(/\d{2}-\d{2}/.test(str)) {
            year = new Date().getFullYear();
            // 拼接成2015-05-02
            str = year +'-' + str;
            fmt = str.replace(/(\d+)-(\d+)-(\d+)/g, '$1年$2月$3日');
        }

        return fmt;
    };

    /* 增长对比 */
    payweChart.getCompare = function(str, arr) {
        var per = Math.round(((arr[0] - arr[1]) / arr[1]) * 100);
        return str+ '<br/>' + '比较：<span style="color:#e10000"><b>'+ (per >= 0 ? '↑' : '↓') +'</b>' + per + '%</span>';
    };

    /* 图表集合 */
    payweChart.collection = [];
    payweChart.ticker = null;
    payweChart.resize = function(){
    	var resize = function(){
    		clearTimeout(payweChart.ticker);

    		payweChart.ticker = setTimeout(function(){
    			var charts = payweChart.collection;
	    		for (var i = 0, l = charts.length; i < l; i++) {
		            charts[i].resize && charts[i].resize();
		        }
		    }, 100);
    	}

    	if(window.attachEvent) {
			window.attachEvent('onresize', resize)
		} else {
			window.addEventListener('resize', resize, false)
		}
    }

	// 对象方法，返回的是echarts对象
	payweChart.prototype = {
		constructor: payweChart,
		init: function(obj, options){
			this.option = $.extend({}, Theme || {});
			this.obj = typeof obj === 'string' ? document.getElementById(obj) : obj;

			this.charts = Echarts.init(this.obj);
			if(options) this.setOption(options);

			payweChart.collection.push(this.charts);
			payweChart.resize();

			// 外部继续使用echarts接口api
			return this;
		},
		setOption: function(options) {
			var option = this.option,
				legend = [];
			// 继承主题
			if(options.labels) option.xAxis[0].data = options.labels;
			if(option.series){
				option.series = options.series;
				for(var i = 0, len = option.series.length; i < len; i++) {
					if(options.series[i]['name']) {
						legend.push(options.series[i]['name']);
					}
					option.series[i]['type'] = option.type || 'line';
					//option.series[i]['markLine'] = { "itemStyle": null };
				}

				if(legend.length > 0) option.legend.data = legend;
			}
			if(options.formatter) option.tooltip.formatter = options.formatter; 

			this.option = option;
			this.charts.setOption(this.option);
			this.hideLoading();
		},
		getCharts: function(){
			return this.charts;
		},
		showLoading: function(option) {
			this.getCharts().showLoading(option);
		},
		hideLoading: function() {
			this.getCharts().hideLoading();
		}
	}

    return window.UICharts = payweChart;
});
require(['payweCharts']);