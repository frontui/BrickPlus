/**
 * carousel 轮播
 * 
 * tommyshao <tomieric@gmail.com>
 * 
 * fork http://unslider.com 
 * 
 * API:
 *  
 *  $(selector).carousel()
 */

import $ from 'jquery'
import './transition'
import './swipe'

const toggle = '[data-toggle="carousel"]'

export default class Carousel {
    constructor() {
        this.el = null 
        this.items = null 

        this.sizes = []
        this.max = [0, 0]

        this.current = 0 

        this.interval = null 
    }

    // 初始化
    init(el, props) {
        this.el = $(el)
        this.ulEl = el.children('ul')
        this.max = [(el.outerWidth() || el.parent().outerWidth()), (el.outerHeight() || el.parent().outerHeight())]
        // 计算宽度
        this.items = this.ulEl.children('li').each(this.calculate(this))

        // 配置参数
        this.props = $.extend({}, Carousel.DEFAULTS, props)

        // 挂载
        this.setup()

        return this
    }

    // 计算宽高属性
    calculate(instance) {
        return function(index) {
            let el = $(this),
            width = el.outerWidth(),
            height = el.outerHeight()

            // 添加到 size 列表
            instance.sizes[index] = [width, height]

            // 计算最大宽度，高度
            if(width > instance.max[0]) instance.max[0] = width 
            if(height > instance.max[1]) instance.max[1] = height 
        }
    }

    // 挂载
    setup() {
        let initEvent = $.Event('init.bp.carousel', { relatedTarget: this.el })

        // 设置容器样式
        this.el.css({
            overflow: 'hidden',
            width: this.max[0],
            height: this.max[1]
        }).toggleClass('csstransition', this.props.css3)

        // 设置ul宽度
        this.ulEl.css({ width: (this.items.length * 100) + '%', position: 'relative'})
        this.items.css({width: (100 / this.items.length) + '%'})

        // 是否自动切换
        if(this.props.delay) {
            this.start()
            this.el.hover($.proxy(this.stop, this), $.proxy(this.start, this))
        }

        // 是否键盘控制
        this.props.keys && $(document).keydown($.proxy(this.keys, this))

        // 是否显示索引 
        this.props.dots && this.dots()

        // 是否相适应宽度
        if(this.props.fluid) {
            let resize = () => {
                this.el.css({width: Math.min(Math.round((this.el.width() / this.el.parent().width()) * 100), 100) + '%'})
            }
            resize()
            $(window).off('resize.bp.carousel').on('resize.bp.carousel', resize)
        }

        // 是否显示箭头按钮
        if(this.props.arrows) {
            this.el.append('<p class="arrows"><span class="prev" title="'+ (this.props.prevText) +'">'+ (this.props.prevText) +'</span><span class="next" title="'+ (this.props.nextText) +'">'+ (this.props.nextText) +'</span></p>')
                    .find('span.prev').on('click', $.proxy(this.prev, this))
                    .end()
                    .find('span.next').on('click', $.proxy(this.next, this))

        }

        // 上下张按钮
        if(this.props.prev) $(this.props.prev).off('click').on('click', $.proxy(this.prev, this))
        if(this.props.next) $(this.props.next).off('click').on('click', $.proxy(this.next, this))

        // 是否支持滑动
        if($.event.swipe) {
            this.el.off('swipeleft.bp.carousel').on('swipeleft.bp.carousel', $.proxy(this.prev, this)).off('swiperight.bp.carousel').on('swiperight.bp.carousel', $.proxy(this.next, this))
        }

        this.el.trigger(initEvent)
    }

    // 切换跳转
    move(idx, next) {
        if(!this.items.eq(idx).length) idx = 0
        if(idx < 0) idx = this.items.length - 1

        let target = this.items.eq(idx)
        let obj = { height: target.outerHeight()}
        let speed = next ? 5 : this.props.speed 

        let moveEvent = $.Event('move.bp.carousel', { curIndex: idx })
        let complete = () => {
            this.current = idx 
            this.props.complete(idx, this.el)
            $.isFunction(next) && next(idx, this.el)
        }

        // 索引高亮
        this.el.find(`.dot:eq(${idx})`).addClass('active').siblings().removeClass('active')

        // 动画处理
        if($.support.transition && this.props.css3) { // css3
            this.ulEl.css($.extend({ left: `-${idx}00%`}, obj)).one('uiTransitionEnd', complete).emulateTransitionEnd(speed);
        } else if(!this.ulEl.is(':animated')) {
            this.ulEl.animate(obj, speed).trigger(moveEvent) && this.ulEl.animate($.extend({ left: `-${idx}00%`}, obj), speed, complete)
        }
    }

    // 自动切换-开始
    start() {
        this.interval = setInterval(()=> this.move(this.current + 1), this.props.delay)
    }

    // 自动切换-结束
    stop() {
        this.interval = clearInterval(this.interval)
        return this
    }

    // 上一页
    prev(e) {
        e && e.preventDefault();
        return this.stop().move(this.current - 1)
    }

    // 下一页
    next(e) {
        e && e.preventDefault()
        return this.stop().move(this.current + 1)
    }

    // 索引按钮
    dots() {
        let html = '<ol class="dots">'
        let that = this
        $.each(this.items, function(index) {
            html += '<li class="dot'+ (index < 1 ? ' active' : '') +'">'+ (index + 1) +'</li>'
        })
        html += '</ol>'

        this.el.addClass('has-dots').append(html).find('.dot').off('click').on('click', function() {
            that.move($(this).index())
        })
    }

    // 键盘控制
    keys(e) {
        let key = e.which 
        let map = {
            37: this.prev,
            39: this.nex,
            27: this.stop 
        }

        if(typeof map[key] === 'function') map[key]()
    }
}

// ---------
// 默认配置
Carousel.DEFAULTS = {
    css3: true,
    speed: 300,       // 切换动画速度
    delay: null,      // 自动播放时间
    complete: $.noop, // 切换完成回调
    keys: null,       // 键盘控制按键
    dots: null,       // 是否显示索引
    fluid: true,      // 是否响应式
    prev: null,       // 上一张按钮
    next: null,       // 下一张按钮
    arrows: true,      // 是否显示箭头图标
    prevText: '&lt;',     // 上一张按钮文字
    nextText: '&gt;'      // 下一张按钮文字
}

// 插件定义
//======================
function Plugin(o, s) {
    var len = this.length;

    //  Enable multiple-slider support
    return this.each(function(index) {
        //  Cache a copy of $(this), so it
        var me = $(this);
        var config = me.data();
        var instance = me.data('bp.carousel');

        if(!instance) {
            o = $.extend({}, o, config);
            instance = (new Carousel).init(me, o);
            //  Invoke an Unslider instance
            me.data('bp.carousel', instance);
        }
        s = $.extend({}, s, config);
        if(typeof o === 'string') instance[o] && instance[o](me, s);
    });
}


// jQuery 插件扩展
$.fn.carousel = Plugin;
$.fn.carousel.Constructor = Carousel;

// 元素插件绑定
// ====================
$(function(){ $(toggle).carousel() });