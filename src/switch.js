/**
 * Switch 开关
 * 
 * by tommyshao <tomieric@gmail.com>
 * 
 * 2016-09-21
 */

import $ from 'jquery'

const toggle = '.switch,[data-toggle="switch"]'

export default class Switch {
    constructor(el, props) {
        this.el = $(el)
        this.props = props

        if(!props.docClick) this.el.on('click', $.proxy(this.toggle, this)) 
    }

    toggle(e) {
        e && e.preventDefault() && e.stopPropagation()
        // 禁止状态
        if(this.el.hasClass('disabled')) return;

        var checked = this.el.hasClass('checked')
        this.el.toggleClass('checked', !checked).trigger('checked.bp.switch', !checked)
    }
}

// ----------
// jQuery api
function Plugin(option, ...args) {
    return $(this).each(function(){
        var that = $(this),
            data = that.data('bp.switch')

        if(!data) that.data('bp.switch', (data = new Switch(that, typeof option === 'string' ? { docClick: true } : option)))
        if(typeof option === 'string') typeof data[option] === 'function' && data[option](...args)
    })
}

$.fn.switch = Plugin 
$.fn.switch.constructor = Switch

$(function() {
    $(document).on('click', toggle, function() {
        $(this).switch('toggle')
    })
})