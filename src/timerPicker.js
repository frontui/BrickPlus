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

        this.props = $.extend(TimerPicker.DEFAULTS, this.props)

        this.timer = ['00', '00', '00']

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
            _html.push(`<li data-value="${i}"${cls}>${i > 9 ? i : '0' + i}</li>`)
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

            console.log(mm)
        for(let i = 0; i < ms; i++) {
            cls = parseInt(mm) === i ? ' class="active"' : ''

            if(u) {
                if(i % u === 0) _html.push(`<li data-value="${i}"${cls}>${i > 9 ? i : '0' + i}</li>`)
            } else {
                _html.push(`<li data-value="${i}"${cls}>${i > 9 ? i : '0' + i}</li>`)
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
        this.$HH = $('<ul class="bp-drop-list"></ul>')
        this.$mm = this.$HH.clone(true)
        this.$ss = this.$HH.clone(true)

        this.$HH.html(this.__renderHH())
        this.$mm.html(this.__renderMS(1))
        this.$ss.html(this.__renderMS(2))

        this.dropEl.append(this.$HH).append(this.$mm).append(this.$ss)

        this.__handlerPicker()
    }

    // 绑定选择事件
    __handlerPicker() {
        this.$HH.on('click', 'li', e=> this.picker(0, e))
        this.$mm.on('click', 'li', e=> this.picker(1, e))
        this.$ss.on('click', 'li', e=> this.picker(2, e))
    }

    // 选择时分秒
    picker(idx, event) {
        let $current = $(event.target)
        let value = $current.html()
        this.timer.splice(idx, 1, value)

        $current.addClass('active').siblings().removeClass('active')
        this.el.val(this.timer.join(this.props.char))

        // 如果点击的是秒则收起下拉
        idx === 2 && this.hide()
    }
}

/**
 * 默认配置
 */
TimerPicker.DEFAULTS = {
    char: ':'
}


// 插件定义
// ----------
function Plugin(option) {
    return $(this).each(function () {
        var $this = $(this);
        var data = $this.data('ui.tab');
        option = $.extend({}, option, $this.data())
        if (!data) $this.data('ui.tab', (data = new TimerPicker(this, option)));
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