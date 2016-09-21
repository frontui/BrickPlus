/**
 * 进度条
 * 
 * by tommyshao <tomieric@gmail.com>
 * 2016-09-21
 */

import $ from 'jquery'
import transition from './transition'

const toggle = '.progress,[data-toggle="progress"]'

export default class Progress {
    constructor(el, props) {
        this.el = $(el)
        this.props = $.extend({}, Progress.DEFAULTS, props) 
        this.striped = this.props.striped

        this.barEl = this.props.bar ? this.el.find(this.props.bar) : this.el.find('.progress-bar')

        if(this.props.percent > 0) this.go(this.props.percent)
    }

    go(percent) {

        // 是否被禁用
        if(this.barEl.hasClass('bar-disabled')) return;

        // 进度判断
        if(isNaN(percent)) {
            percent = 0
        } else if(percent > 100) {
            percent = 100
        }


        this.barEl.css({ width: `${percent}%`})
        if(this.props.txt) this.barEl.html(`${percent}%`)

        let complete = () => {
            this.el.trigger('completed.bp.progress')
        }
        if(percent == 100) {
            $.support.transition ? this.barEl.one('uiTransitionEnd', complete).emulateTransitionEnd(this.props.speed) : complete
        }
    }

    setStriped(toggle) {
        this.striped = toggle
        this.barEl.toggleClass('bar-striped', toggle)
    }

    change(status) {
        status = status === '' ? `default`: `bar-${status}`
        let striped = this.striped ? 'bar-striped' : ''

        this.barEl.attr('class', function() {
            return `progress-bar ${striped} ${status}`
        })
    }
}

Progress.DEFAULTS = {
    speed: 2000,
    percent: 0,
    bar: '',
    striped: true,
    txt: false
}

// ----------
// jQuery api
function Plugin(option, ...args) {
    return $(this).each(function(){
        var that = $(this),
            data = that.data('bp.progress')

        if(!data) that.data('bp.progress', (data = new Progress(that, $.extend(typeof option === 'string' ? {} : option, that.data()))))
        if(typeof option === 'string') typeof data[option] === 'function' && data[option](...args)
    })
}

$.fn.progress = Plugin 
$.fn.progress.constructor = Progress

$(function() {
    $(toggle).progress()
})