/**
 * 元素展开
 * 
 * by tomieric <tomieric@gmail.com>
 * 
 * 2016-09-27
 */

import $ from 'jquery'

export default class Expand {
    constructor(el, props) {
        this.el = $(el)
        this.props = $.extend({}, Expand.DEFAULTS, props)

        //this.targetEl = $(this.props.target)
        this.originalText = this.el.html()
        this.expand = this.props.expand

        this._initEvent()
    }

    _initEvent() {
        this.el.on('click', e => {
            e.preventDefault()

            let el = $(e.target)

            let text = el.attr('data-text')
            let active = el.attr('data-active')
            let targetActive = el.attr('data-target-active')
            let targetEl = $(el.attr('data-target'))

            // switch
            this.expand = !this.expand

            if(this.expand) {
                el.addClass(active).html(text)
                targetEl.length && targetEl.addClass(targetActive)
            } else {
                el.removeClass(active).html(this.originalText)
                targetEl.length && targetEl.removeClass(targetActive)
            }
            
            this.props.callback()
        })
    }
}

Expand.DEFAULTS = {
    target: '',
    expand: false,
    callback: $.noop
}