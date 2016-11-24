/**
 * 面板
 * 
 * by tomieric <tomieric@gmail.com>
 * 
 * 2016-09-27
 */

import $ from 'jquery'
import './transition'

// 面板展开
export default class Panel {
    constructor(el, container, props) {
        this.el = $(el)
        this.container = $(container)
        this.props = $.extend({}, Panel.DEFAULTS, props) 
        this.opened = this.props.opened 

        // 右侧打开激活类
        this.toggleCls = this.el.attr('data-active')
        // 主体内容激活类
        this.containerCls = this.el.attr('data-container-active')

        if(this.props.autoHide) this.autoBindEvent()

        if(!!this.props.btn) this.btnBindEvent()
    }
    autoBindEvent() {
        // 事件监听
        // 元素本身，阻止事件冒泡
        this.el.on('click', e => e.stopPropagation())

        // 除元素本身任何地方点击则收起
        $(document).on('click.close.rightPanel', $.proxy(this.hide, this))
    }
    btnBindEvent() {
        $(this.props.btn).on('click', e => {
            e.preventDefault()
            // 阻止冒泡
            e.stopPropagation()
            this.toggle()            
        })
    }
    show() {
        this.toggle(true)
    }
    hide() {
        this.toggle(false)
    }
    toggle (b) {

        this.opened = b === undefined ? !this.opened : b 

        let callback = () => {
            this.el.toggleClass(this.toggleCls, this.opened)
            this.container.toggleClass(this.containerCls, this.opened)

            this.props.callback(this.opened)
        }

        if($.support.transition) {
            this.container[0].offsetWidth;
            this.container.one('uiTransitionEnd', callback).emulateTransitionEnd(Panel.TRANSITION_DURATION)
        } else {
            typeof this.props.polyfill === 'function' ? this.props.polyfill(this.el, this.container, callback) : callback()
        }
        
    }
}

Panel.DEFAULTS = {
    autoHide: false,
    opened: false,
    btn: '',
    callback: $.noop,
    polyfill: null
}

// 动画时间
Panel.TRANSITION_DURATION = 150