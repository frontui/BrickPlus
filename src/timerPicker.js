/**
 * 时间选择器
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-09-18
 */
import $ from 'jquery'
import Drop from './drop'

const toggle = '[data-toggle="timer-picker"]'

export default class TimerPicker extends Drop {
    constructor(el, props) {
        
        super(el, toggle, props)

        this.props = $.extend({}, TimerPicker.DEFAULTS, this.props)

        this.timer = ['00', '00', '00']

        // 不包括小时
        if(!this.props.hours) {
            this.timer.shift()
        }
        
        // 不包括秒
        if(!this.props.second) {
            this.timer.pop()
        }


        this.__init()
        this.render()
    }

    // 渲染小时
    // 根据配置参数h来决定24或者12
    __renderHH() {
        let hours = 24, 
            _html = [], 
            h = this.timer[0],
            cls = ''
        if(this.props.h == 12) hours = 12;
        for(let i = 1; i <= hours; i++) {
            cls = parseInt(h) === i ?  ' class="active"' : '';
            _html.push(`<li data-value="${i}"${cls}>${i}</li>`)
        }
        return _html.join('')
    }

    // 时分都是60单位
    // 可根据参数 unit 输出不同的进度
    __renderMS(pos) {
        let ms = 60, 
            _html = [], 
            u = this.props.unit,
            mm = this.timer[pos],
            cls = ''

        for(let i = 0; i < ms; i++) {
            cls = parseInt(mm) === i ? ' class="active"' : ''

            if(u) {
                if(i % u === 0) _html.push(`<li data-value="${i}"${cls}>${i}</li>`)
            } else {
                _html.push(`<li data-value="${i}"${cls}>${i}</li>`)
            }
        }

        return _html.join('')
    }

    // 初始化值
    __init() {
        let value = this.el.val(),
            arrVal = []
        if(value) {
            arrVal = value.split(this.props.char)

            if(arrVal.length > 0) this.timer = arrVal
        }
    }

    // 渲染架构
    render() {
        const NAMESPACE = 'bp-drop'
        let template = `
            <ul class="${NAMESPACE}-nav"></ul>
            <div class="${NAMESPACE}-bd">
            </div>
        `

        this.dropEl.append(template)
        this.navEl = this.dropEl.find(`.${NAMESPACE}-nav`)
        this.bodyEl = this.dropEl.find(`.${NAMESPACE}-bd`)

        this.$HH = $(`<ul class="${NAMESPACE}-list"></ul>`)
        this.$mm = this.$HH.clone(true)
        this.$ss = this.$HH.clone(true)

        if(this.props.hours) {
            this.$HH.html(this.__renderHH())
            this.navEl.append(`<li class="active">${this.props.in18[0]}</li>`)
            this.bodyEl.append(this.$HH.addClass('active'))
        }

        if(this.props.minutes) {
            this.$mm.html(this.__renderMS(1))
            this.navEl.append(`<li>${this.props.in18[1]}</li>`)
            this.bodyEl.append(this.$mm)
        }

        if(this.props.second) {
            this.$ss.html(this.__renderMS(2))
            this.navEl.append(`<li>${this.props.in18[2]}</li>`)
            this.bodyEl.append(this.$ss)
        }
        
        this.__handlerPicker()
    }

    // 绑定选择事件
    __handlerPicker() {
        this.$HH.on('click', 'li', e=> this.picker(0, e))
        this.$mm && this.$mm.on('click', 'li', e=> this.picker(this.props.hours ? 1 : 0, e))
        this.$ss && this.$ss.on('click', 'li', e=> this.picker(this.props.hours ? 2 : 1, e))
        this.navEl.on('click', 'li', $.proxy(this.__tab, this))
    }

    // 导航切换
    __tab(e) {
        let liEl = this.navEl.children('li')
        let itemEl = this.bodyEl.children('ul')
        let idx = liEl.index(e.target)
        liEl.eq(idx).addClass('active').siblings().removeClass('active')
        itemEl.eq(idx).addClass('active').siblings().removeClass('active')
    }

    // 选择时分秒
    picker(idx, event) {
        let $current = $(event.target)
        let value = $current.html()
        let liEl = this.navEl.children('li')
        this.timer.splice(idx, 1, value < 10 && this.props.zero ?  `0${value}` : value)

        $current.addClass('active').siblings().removeClass('active')
        this.el.val(this.timer.join(this.props.char))

        // tab 切换
        if(!!liEl.eq(idx + 1).length){
            liEl.eq(idx + 1).trigger('click')
        } else {
            this.hide()
        }
    }

    // 继承重载 show
    show() {
        let liEl = this.navEl.children('li')
        super.show()
        liEl.eq(0).trigger('click')
    }
}

/**
 * 默认配置
 */
TimerPicker.DEFAULTS = {
    char: ':',                  // 格式化字符
    hours: true,               // 是否显示小时
    minutes: true,            // 是否显示分钟，一般不设置
    second: true,             // 是否显示秒
    in18: ['时', '分', '秒'], // 语言配置
    zero: true              // 是否格式化补零
}


// 插件定义
// ----------
function Plugin(option) {
    return $(this).each(function () {
        var $this = $(this);
        var data = $this.data('bp.tab');
        option = $.extend({}, option, $this.data())
        if (!data) $this.data('bp.tab', (data = new TimerPicker(this, option)));
        if (typeof option == 'string') data[option] && data[option]();
    })
}

// jQuery 插件扩展
$.fn.timerPicker = Plugin;
$.fn.timerPicker.Constructor = TimerPicker;

// ----
// Global
$(function() {
    $(document).on('focus.timerpicker', toggle, function() {
                    $(this).timerPicker()
                })
                
                // .on('blur.timerpicker', toggle, function(){
                //     $(this).timerPicker('hide')
                // })
})