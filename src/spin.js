/**
 * Spin 加载
 * 
 * by tommyshao <tomieric@gmail.com>
 * 2016-09-21
 */

import $ from 'jquery'

const toggle = '.bp-spin,[data-toggle="spin"]'

export default class Spin {
    constructor(el, props) {
        this.el = $(el)
        this.props = $.extend({}, Spin.DEFAULTS, props ? props : el)

        // 父级元素
        this.parentEl = !this.props.parent ? $(document.body) : $(this.props.parent)


        if(this.props.btn) {
            this._bindBtn()
        } else {
            this._render()
        }
    }

    // 一般 loading 层 
    _render() {
        let template = `
            <div class="page-spinner">
                <div class="spinner-layer">
                    <div class="spinner">
                    <span class="one"></span>
                    <span class="two"></span>
                    <span class="three"></span>
                    <span class="four"></span>
                    <span class="five"></span>
                    <span class="six"></span>
                    </div>
                </div>
            </div>
        `
        this.el = $(template)
        this.parentEl.append(this.el)
    }

    // btn 模式
    _bindBtn() {
        if(this.el.length < 0) {
            this.parentEl.append(`<button class="btn default">查看更多<button>`)
        }
        this.el.data('originText', this.el.html())
        this.el.on('click', $.proxy(this.spinning, this))
    }

    // 按钮加载中
    spinning() {
        let Ev = $.Event('spinning.bp')
        if(this.props.btn) {
            this.el.prop('disabled', true).addClass('btn-spinner').html(this.props.text)
        } else {
            this.el.addClass('active')
            this.parentEl.addClass('page-spinner-open')
        }

        this.el.trigger(Ev)
        return this.el
    }

    // 隐藏
    end() {
        if(this.props.btn) {
            this.el.prop('disabled', false).removeClass('btn-spinner').html(function(){
                return $(this).data('originText')
            })
        } else {
            this.parentEl.removeClass('page-spinner-open')
            this.el.removeClass('active')
        }
    }

    // 销毁
    destroy() {
        this.el.removeData('bp.spin').remove()
    }
}

Spin.DEFAULTS = {
    btn: false,
    text: 'Loading...',
    parent: null
}

// ----------
// jQuery API
function Plugin(option, ...args) {
    return $(this).each(function() {
        var that = $(this),
            data = that.data('bp.spin'),
            opt = typeof option === 'string' ? {} : opt;
            
        opt = $.extend({}, opt, that.data())

        if(!data) that.data('bp.spin', (data = new Spin(that, opt)))
        if(typeof option === 'string') typeof data[option] === 'function' && data[option].apply(data, args)
    })
}

$.fn.spin = Plugin 
$.fn.spin.constructor = Spin 

$.Spin = Spin


$(function() {
    $(document).on('click.bp.spin', toggle, function() {
        $(this).spin('spinning')
    })
})