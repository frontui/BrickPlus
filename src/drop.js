/**
 * 模拟下拉框基本类
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-09-18
 */

import $ from 'jquery'

export default class Drop {
    /**
     * @param {object} el 触发元素
     * @param {string} toggleEl 匹配标识
     * @param {object} props 配置参数 必须包含{ toggle: ''} 参数 
     */
    constructor(el, toggleEl, props) {
        // 触发元素
        this.el = $(el)
        // 匹配选择符
        this.toggleEl = toggleEl
        // 属性配置
        this.props = $.extend({
            event: 'focus'
        }, props)
        // 显示控制标识
        this.isShow = false
        // 下拉框元素
        this.dropEl = null
        // 创建下拉框元素
        this.__createEl()
        // 初始化事件
        this.__initEvent()
        // 鼠标滑过隐藏时间点
        this.__showTime = null
    }

    // 初始化事件
    __initEvent() {
        if(!this.el || typeof this.el === 'undefined') return;
        const toggle = this.props.toggle

        // 点击
        if(this.props.event === 'click') {
            $(this.el).on('click.drop', $.proxy(this.handlerToggle, this))
        } else if(this.props.event === 'hover') { // 鼠标滑过
            $(this.el).on('mouseenter.drop', $.proxy(this.delayShow, this))
                      .on('mouseleave.drop', $.proxy(this.delayHide, this))
        } else { // 默认 input 获取焦点
            $(this.el).on('focus.drop', $.proxy(this.show, this))
                  .on('blur.drop', $.proxy(this.delayHide, this))
        }

        // 点击其他地方收起隐藏
        $(document).on('click.hide.drop', e => {
            if($(e.target).is(this.toggleEl)) {
                e.stopPropagation()
                return false
            } else {
                this.hide()
            }
        })

        // 点击阻止默认收起隐藏行为
        if(this.dropEl) {
            this.dropEl.on('click.drop', e => { 
                clearTimeout(this.__showTime)
                e.stopPropagation() 
            })

            if(this.props.event === 'hover') {
                this.dropEl.on('mouseenter', e => {
                    clearTimeout(this.__showTime)
                })
                this.dropEl.on('mouseleave', $.proxy(this.delayHide, this))
            }
        }
    }

    // 创建下拉框
    __createEl () {
        if(this.dropEl) return;
        // bp-drop = brickplus-dropdown
        this.dropEl = this.props.dropEl ? $(this.props.dropEl) : $('<div class="bp-drop" />')

        if(this.props.parents) { //  相对固定的区域元素
            this.dropEl.appendTo($(this.props.parents))
        } else { // 相对 body
            this.dropEl.appendTo($(document.body))
        }
    }

    // 设置位置
    __setPosition() {
        const [
                offset,
                elHeight]
             = [
                 this.el.offset(),
                 this.el.outerHeight(true)]

        this.dropEl.css({ top: `${offset.top + elHeight}px`, left: `${offset.left}px` })
    }

    // 渲染
    render(el) {
        if(!this.dropEl) return;
        this.dropEl.empty().append(el)
    }

    // 下拉显示
    show () {
        this.isShow = true
        this.toggle()
    }

    // 下拉隐藏
    hide () {
        this.isShow = false
        this.toggle()
    }

    // 开关
    handlerToggle() {
        this.isShow = !this.isShow
        this.toggle()
    }

    // 操作开关
    toggle() {
        if(!this.dropEl) return;
        this.__setPosition()
        this.dropEl.toggleClass('show', this.isShow)
    }

    // ----
    // 鼠标滑过
    delayShow() {
        clearTimeout(this.__showTime)
        this.show()
    }
    
    delayHide() {
        const that = this
        clearTimeout(this.__showTime)
        this.__showTime = setTimeout(() =>  that.hide(), 200)
    }
}