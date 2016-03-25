define('echarts/theme/paywe', function() {

   var theme = {
        // 默认色板
        color: [
            '#689eec',  '#d1d1d1','#b6a2de','#fd8832','#54d393','#de5252', '#b5c9e5','#8fb0db'
        ],
       //backgroundColor: '#f9f9f9',
        title : {
           show: false
        },
        grid: {
            backgroundColor: '#f9f9f9',
            borderColor: '#e6e5e5',
            borderWidth: 0,
            y: 20,
            x2: 20,
            y2: 60
        },
        // 提示框
        tooltip: {
            textStyle: {
                color: '#666666',
                fontFamily: '宋体,simsun,Verdana, sans-serif',
                fontSize: 12
            },
            padding: [10, 30, 10, 20],
            borderWidth: 1,
            borderColor: '#e6e6e6',
            backgroundColor: 'rgba(255,255,255,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle : {          // 直线指示器样式设置
                    width: 1,
                    color: '#008acd'
                },
                crossStyle: {
                    color: '#008acd'
                },
                shadowStyle : {                     // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            },
            trigger: 'axis'
        },
        legend: {
            data:['undefined'],
            y: 'bottom',
            textStyle: {
                fontSize: 12,
                fontFamily: 'Tohama,Microsoft Yahei',
                color: '#777'
            }
         },
        toolbox: {
            show : false
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ["undefined"],
                axisLabel: {
                    textStyle: {
                        fontSize: 11,
                        fontFamily: 'Myriad Pro Regular,Tohama,Microsoft Yahei',
                        color: '#666666'
                    }
                },
                axisLine: {
                    //show: false,
                    lineStyle: {
                        width: 0,
                        type: 'solid',
                        color: '#cccccc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis : [
            {
                //name: '消费',
                type : 'value',
                axisLine: {
                    //show: false,
                    lineStyle: {
                        width: 0,
                        type: 'solid',
                        color: '#e6e5e5'
                    }
                },                        
                axisLabel: {
                    textStyle: {
                        color: '#999999'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        width: 1,
                        type: 'solid',
                        color: ['#e6e5e5']
                    }
                }
                //,
                //splitArea: {
                //    show: true,
                //    onGap: false,
                //    color: ['#f9f9f9']
                //}
            }
        ],
        series : [],
        lineStyle: {
            color: '#eeeeee'
        }
    };

    return theme;
});