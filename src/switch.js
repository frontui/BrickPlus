/**
 * Switch 开关
 * 
 * by tommyshao <tomieric@gmail.com>
 * 
 * 2016-09-21
 */

import $ from 'jquery'
import ModalLayer from './ModalLayer'

const toggle = '.switch,[data-toggle="switch"]'

export default class Switch {
    constructor(el, props) {
        this.el = $(el)
        this.props = props

        //  是否点击时需要二次确认
        this.isSecondCheck = Boolean(this.el.data('issecondcheck'));

        if(!props.docClick) this.el.on('click', $.proxy(this.toggle, this)) 
    }

    toggle(e) {
        e && e.preventDefault() && e.stopPropagation()
        // 禁止状态
        if(this.el.hasClass('disabled')) return;

        var checked = this.el.hasClass('checked')

        if(this.isSecondCheck){
            //  弹窗二次确认
            var status = checked ? '激活' : '未激活';
            var toStatus = checked ? '取消激活' : '激活';
            var content = '当前状态为' + status + '，是否' + toStatus + '?';
            $.confirmModalLayer({ 
                title: '提醒', 
                content: content, 
                callback: this._toggleClass(checked)
            });
        }else{
            this._toggleClass(checked);
        }

    }

    _toggleClass(checked){
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
    $(document).on('click.swtich', toggle, function() {
        $(this).switch('toggle')
    })
})