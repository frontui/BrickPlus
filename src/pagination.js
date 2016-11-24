/**
 * 分页组件
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-09-19
 * Reference uikit.pagination.js
 * API:
 *      $(element).pagination({ onSelectPage: function(index, instance){});
 *
 *      $(element).on('bp.select.pagination', function(e, index, instance){
            console.log(index)
         })
        $(element).pagination({ onSelectPage: function(index, instance){});
        $(element).pagination('selectPage', 2, 100);
 */

import $ from 'jquery'

const toggle = '.paginations,[data-toggle="pagination"]'
var pageStr = '<p class="p-add-ons fn-mr-15">{$items}&nbsp;条记录，共&nbsp;{$totalPages}&nbsp;页</p>'

export default class Pagination {
    constructor(el, props) {
        this.el = $(el)
        this.__init(props)
    }

    // 初始化
    __init(props, inited) {
        this.__setProps(props)
        let { itemsOnPage, items, currentPage, totalPages, visiblePages } = this.props

        // 总页数读取配置参数
        // 若未配置则 totalPages = items / itemsOnPage
        this.totalPages = !!totalPages && !items ? totalPages : (Math.ceil(items / itemsOnPage) ? Math.ceil(items / itemsOnPage) : 1)

        this.items = !!items ? items : this.totalPages * itemsOnPage;

        this.currentPage = currentPage - 1

        this.halfVisible = visiblePages / 2

        this.__render()
        !inited && this.__initEvent()

        // 初始化时触发
        this.go(currentPage)
    }

    // 设置配置参数
    __setProps(props) {
        this.props = $.extend({}, Pagination.DEFAULTS, props)
    }

    // 初始化事件
    __initEvent() {
        this.el.on('click.bp.pagination', 'a[data-page]', e => {
            e.preventDefault()
            this.selectPage($(e.target).data('page'))
        })
    }

    // 获取显示页面区间
    __getInterval() {
        return {
            start: Math.ceil(
                this.currentPage > this.halfVisible ?
                    Math.max(
                        Math.min(this.currentPage - this.halfVisible, (this.totalPages - this.props.visiblePages)),
                    0)
                    : 0
            ),
            end: Math.ceil(
                this.currentPage > this.halfVisible ?
                    Math.min(this.currentPage + this.halfVisible, this.totalPages)
                  : Math.min(this.props.visiblePages, this.totalPages)
            )
        }
    }

    // 增加页面函数
    // pageIndex 页码
    // opt 页面文本配置
    // islb 是否功能键，不需加 active
    __append(pageIndex, opts, islb) {
        let item, options, cls

        // 判断首页，末页，常规页
        pageIndex = pageIndex < 0 ? 0 : (pageIndex < this.totalPages ? pageIndex : this.totalPages - 1)
        options = $.extend({ text: pageIndex + 1 }, opts)

        // 判断当前页
        cls = islb ? '' : 'class="active"'
        item = (pageIndex === this.currentPage) ?
                    `<li ${cls}><span>${options.text}</span></li>`
                    : $.inArray(pageIndex + 1, this.props.disabledPages) > -1
                        ? `<li class="disabled"><span>${options.text}</span></li>`
                        : `<li><a href="#page-${pageIndex + 1}" data-page="${pageIndex + 1}">${options.text}</a></li>`

        this.el.append(item)
    }

    // 渲染
    __render() {
        let props = this.props
        let interval = this.__getInterval()
        let i = 0

        this.el.empty()
        //if(this.totalPages <= 1) return;

        // 首页
        if(props.first) this.__append(0, { text: props.first }, true)

        // 上一页
        if(props.prev && this.currentPage - 1 >= 0) this.__append(this.currentPage - 1, { text: props.prev}, true)

        // 左边边缘页码
        if(interval.start >= 0 && props.edges > 0) {
            let end = Math.min(props.edges, interval.start)

            for(let i = 0; i < end; i++) this.__append(i)

            // 显示左边边缘页码
            if(props.edges < interval.start && (interval.start - props.edges != 1)) {
                this.el.append('<li><span>...</span><li>')
            } else if(interval.start - props.edges === 1) {
                this.__append(props.edges)
            }
        }

        for(i = interval.start; i < interval.end; i++) this.__append(i)

        if(interval.end < this.totalPages && props.edges > 0){
            if(this.totalPages - props.edges > interval.end && (this.totalPages - props.edges - interval.end !== 1)) {
                this.el.append('<li><span>...</span></li>')
            } else if(this.totalPages - props.edges - interval.end === 1) {
                this.__append(interval.end++)
            }
            // 从右边边缘页码
            let begin = Math.max(this.totalPages - props.edges, interval.end)
            for(i = begin; i < this.totalPages; i++) this.__append(i)
        }

        // 下一页
        if(props.next && this.currentPage < this.totalPages - 1) this.__append(this.currentPage + 1, { text: props.next }, true)
        // 末页
        if(props.last) this.__append(this.totalPages, { text: props.last }, true)

        // 显示页面字符
        this.__renderPageStr()
    }

    // 选择切换页码
    selectPage(pageIndex, pages) {
        this.currentPage = pageIndex - 1

        // 重新渲染
        this.render(pages)

        // 触发回调
        this.props.onSelectPage(pageIndex, this)

        // 触发data-API
        this.el.trigger('select.bp.pagination', [pageIndex, this])
    }

    // 渲染接口
    render(pages) {
        this.totalPages = pages ? pages : this.totalPages
        this.__render()
    }

    // 页面跳转
    go(page) {
        this.selectPage(page)
    }

    // 显示总页码信息
    __renderPageStr() {
        if(this.props.pageStr && this.props.pageStr.show) {
            let pageStrEl = this.el.prevAll()
            let template = this.props.pageStr.template || pageStr

            template = template.replace(/{\$(\w*)}/gi, (matches, key, index) => this[key] ? this[key] : 0)

            pageStrEl.length && pageStrEl.empty().remove()

            this.el.before($(template))
        }
    }

    // 销毁
    destory(force) {
        this.el.empty()
        this.el.removeData('bp.pagination')
        return this
    }

    // 重新设置
    reset(option) {
        option = $.extend({}, this.props, option)
        this.destory().__init(option, true)

        if(!this.el.data('bp.pagination')) this.el.data('bp.pagination', this)
    }
}

// --------
// 默认配置
const DEFAULTS = {
    // 总记录数
    items: 0,
    // 每页记录数
    itemsOnPage:5,
    // 总页数
    totalPages: 0,
    // 显示区间长度
    visiblePages: 5,
    // 末尾页码长度
    edges: 1,
    // 当前页码
    currentPage: 1,
    // 分页总码数字符
    //    show - 是否显示
    //    template 字符模板
    pageStr: {
        show: false,
        template: ''
    },
    // 不可用页码
    disabledPages: [],
    prev: '&lsaquo;',
    next: '&rsaquo;',
    first: '&laquo;',
    last: '&raquo;',
    onSelectPage: $.noop
}
Pagination.DEFAULTS = DEFAULTS

// 插件定义
//======================
function Plugin(options, ...args) {
    // jquery 链式
    return $(this).each(function () {
        var $this = $(this);
        if ($this.hasClass('no-js')) return;
        var data = $this.data('bp.pagination');
        // 创建一个新实例
        if (!data) $this.data('bp.pagination', (data = new Pagination($this, $.extend({}, $this.data(), options))));
        if (typeof options == 'string') { // 调用接口方法,第二个参数为方法传入参数
            data[options].apply(data, args);
        }
    })
}

// jQuery 插件扩展
$.fn.pagination = Plugin;
$.fn.pagination.Constructor = Pagination;

// 元素插件绑定
// ====================
$(function () {
    $(toggle).pagination();
})
