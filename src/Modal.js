/*!
 * 弹层
 * tommyshao <tomieric@gmail.com>
 * Reference bootstrap.modal.js
 * API:
 *      // 监听打开
 *      $(element).on('show.ui.modal', function(e, obj){});
 *      $(element).on('shown.ui.modal', function(e, obj){});
 *
 *      // 监听关闭
 *      $(element).on('hide.ui.modal', function(){});
 *      $(element).on('hidden.ui.modal', function(){});

        // 绑定一个弹窗
 *      $(element).modal();
 *
 *      // 自定义弹窗
 *      $(id).modal({title: '提示', content: 'abc'});
        $(id).modal('setContent', 'cdfg');

        // loading
 */

import $ from 'jquery'
import './transition'

const toggle = '[data-toggle="modal"]'

export default class Modal {
    constructor(el, props) {
        this.el = $(el)
        this.props = $.extend({}, Modal.DEFAULTS, props)
        this.$body = $(document.body)

        this.$dialog = this.el.find('.modal-wrap')
        this.$backdrop = null 
        this.isShown = false 
        this.originalBodyPad = null 
        this.scrollbarWidth = 0
        this.size = this.props.size

        this.setSize(this.size, true)

        if(this.props.remote) {
            this.el.find('.modal-body')
                    .load(this.props.remote, $.proxy(function(){
                        this.el.trigger('loaded.bp.modal')
                    }, this))
        }
    }

    // 显示-隐藏开关
    toggle(target) {
        return this.isShown ? this.hide() : this.show(target)
    }

    // 显示
    show(target) {
        var e = $.Event('show.pb.modal', { reletedTarget: target })

        if(this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;
        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()

        this.el.on('click.dismiss.pb.modal', '[data-dismiss="modal"], .modal-close', $.proxy(this.hide, this))

        var transition = $.support.transition 

        this.el.addClass('in').scrollTop(0).attr('tabindex', -1)
        this.$dialog.addClass('bounceInDown')

        this.adjustDialog()

        // 阻塞，保证动画响应
        // 减少重绘
        if(transition) this.el[0].offsetWidth

        this.enforceFocus()

        if(transition) { // css3
            this.el.attr('aria-hidden', false)
                .one('uiTransitionEnd', ()=> this.el.trigger('focus').trigger(e))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION)
        } else {
            this.el.attr('aria-hidden', true)
                .fadeIn(Modal.TRANSITION_DURATION, () => this.el.trigger('focus').trigger(e))
        }
    }

    // 隐藏弹层
    hide(e) {
        if(e) e.preventDefault()

        if(!this.el.is(':visible') && !this.isShown) return;

        this.isShown = false

        this.escape()

        $(document).off('focusin.pb.modal').off('keydown.bp.modal')

        this.el.attr('aria-hidden', true)
                .off('click.dismiss.pb.modal')
                .off('mouseup.dismiss.pb.modal')
        
        this.$dialog.off('mousedown.dismiss.bp.modal')

        $.support.transition 
            ? this.el.one('uiTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION)
            : this.el.fadeOut(Modal.TRANSITION_DURATION, ()=> this.hideModal())
    }

    // esc关闭
    escape() {
        if(this.isShown && this.props.keyboard) {
            this.el.on('keydown.dismiss.bp.modal', e => { e.which === 27 && this.hide() })
        } else if(!this.isShown) {
            this.el.off('keydown.dismiss.bp.modal')
        }
    }

    // 隐藏弹层
    hideModal() {
        let e = $.Event('hide.bp.modal', { reletedTarget: this.el })
        this.$body.removeClass('modal-open')
        this.resetAdjustments()
        this.resetScrollbar()
        this.$dialog.removeClass('bounceInDown')
        this.el.removeClass('in').trigger(e)
    }

    // 调整弹层位置
    handleUpdate() {
        this.ajustDialog()
    }

    adjustDialog() {
        let modalIsOverflowing = this.el[0].scrollHeight > document.documentElement.clientHeight
        this.el.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth: '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth: ''
        })
    }

    resetAdjustments() {
        this.el.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    // 弹层获取焦点
    enforceFocus() {
        $(document)
            .off('focusin.bp.modal')
            .on('focusin.bp.modal', e => {
                if(this.el[0] !== e.target && !this.el.has(e.target).length) this.$dialog.trigger('focus')
            })
    }

    // 滚动条
    checkScrollbar() {
        var fullWindowWidth = window.innerWidth

        if(!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }

        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth

        this.scrollbarWidth = this.measureScrollbar()
    }

    // 设置滚动条
    setScrollbar() {
        let bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if(this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    resetScrollbar() {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    measureScrollbar() {
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body[0].appendChild(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }

    // ------
    // 扩展方法
    setContent(content) {
        let $content = this.el.find('.modal-body')
        $content.length && $content.html(content || '')
    }

    setTitle(title) {
        let $title = this.el.find('.modal-title')
        $title.length && $title.html(title || '')
    }

    // 调整大小
    setSize(size, inited) {
        if(this.size === size && !inited) return;
        let cls = this.el.attr('class').split(' '),
            i = 0,
            sizes = []
        for(; i < cls.length; i++) {
            if(cls[i].indexOf('-modal') === -1) sizes.push(cls[i]) 
        }
        size && sizes.push(`${size}-modal`)
        this.el.attr('class', sizes.join(' '))
    }
}

// 动画时长
Modal.TRANSITION_DURATION = 150

// 默认配置
Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true,
    size: false
}

// 弹层 HTML 结构
Modal.TEMPLATE = `
    <div class="modal-background fade" id="{{mid}}">
        <div class="modal-layer">
            <div class="modal-position">
            <div class="modal-wrap animated bounceInDown">
                <div class="modal-head">
                    <span class="modal-title">{{title}}</span>
                    <i class="modal-close"></i>
                </div>
                <div class="modal-body">
                {{content}}
                </div>
            </div>
            </div>
        </div>
    </div>
`

// 渲染
Modal.render = function(option) {
    let $body = $(document.body),
        element;
    
    // 按配置参数类搭建骨架
    if($.isPlainObject(option)) {
        element = Modal.TEMPLATE.replace(/{{(\w*)}}/gi, function(match, key) {
            let value = option[key]
            // 字符串字段
            if(value && typeof value === 'string') return /^(\.|#)\w*/gi.test(value) ? $(value).html() : value 
            // 如果 value 为 jquery 元素
            if(value && (value instanceof $) && value.length > 0) return value.html()
        })

        element = $(element).appendTo($body)
    }

    return element;
}

// 插件定义
//======================
function Plugin(option, ...args) {

    if (!$(this).length && option && /^#(\w*)/gi.test($(this).selector)) {  // js创建
        let data, fn;

        if(typeof option === 'string') {
            fn = option; 
            option = {title: '\u6807\u9898', content: ''}
        }

        option.mid = $(this).selector.replace(/^#/g, '');
        let el = Modal.render(option)
        
        el.data('bp.modal', (data = new Modal(el, option)))

        if(typeof fn === 'string' && typeof data[fn] === 'function') {
            data[fn].apply(data, args)
        }

        if(typeof option['callback'] === 'function') option['callback'].call(el)

        // 首次直接显示
        data.show()

        return el
    } else {
        return $(this).each(function() {
            var that = $(this),
                data = that.data('bp.modal'),
                opt = $.extend({}, Modal.DEFAULTS, that.data(), $.isPlainObject(option) ? option : {})
            if(!data) that.data('bp.modal', (data = new Modal(that, opt)))

            
            if(typeof option === 'string') {
                typeof data[option] === 'function' && data[option].apply(data, args)
            } else if($.isPlainObject(option)) {
                if(option.title) data.setTitle(option.title)
                if(option.content) data.setContent(option.content)
                data.show(args)
            }
        })
    }
}

// jQuery 插件扩展
$.fn.modal = Plugin;
$.fn.modal.Constructor = Modal;
$.closeModal = function(id) {
    $(id).modal('hide')
}


let Handler = function(e) {
    var that = $(this),
        href = that.attr('href'),
        $target = $(that.attr('data-target')) || (href && href.replace(/.*(?=#[^\s]+$)/, ''));

        Plugin.call($target, 'show', this)
}

$(function() {
    $(document).on('click.bp.modal', toggle, function(e) {
        Handler.call(e.target, e)
    })
})
