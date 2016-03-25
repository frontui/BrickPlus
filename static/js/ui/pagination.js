/*!
 * 分页|pagination
 * tommyshao <jinhong.shao@frontpay.cn>
 * Reference uikit.pagination.js
 * API:
 *      $(element).pagination({ onSelectPage: function(index, instance){});
 *
 *      $(element).on('ui.select.pagination', function(e, index, instance){
            console.log(index)
         })

        $(element).pagination({ onSelectPage: function(index, instance){});

        $(element).pagination('selectPage', 2, 100);
 */

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/pagination', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    // 默认高亮类
    var active = 'active';
    // 分页总码数模板
    var pageStr = '<p class="pull-left fs-12 lh-26">共{$pages}页，{$items}条记录，每页显示{$itemsOnPage}条。</p>';


    // 构造函数
    // @param {object} element 容器dom元素
    // @param {json}   options 配置参数面量
    // ===============
    var Pagination = function(element, options) {
        // 分页主容器
        this.$el = $(element);
        // 初始化
        this._init(options);
    };

    // 版本
    Pagination.VERSION = '1.0.0';
    // 分页默认参数
    Pagination.DEFAULTS = {
        // 总记录数
        items: 1,
        // 每页记录数
        itemsOnPage: 1,
        // 总页数
        pages: 0,
        // 只显示页数区间
        displayedPages: 8,
        // 到末页显示多少页码
        edges: 1,
        // 当前页
        currentPage: 0,
        // 分页总码数字符, 默认不显示, show-是否显示, template 字符模板
        pageStr: { show: false, template: ''},
        lblPrev: '\u4e0a\u4e00\u9875', //上一页
        lblNext: '\u4e0b\u4e00\u9875', //下一页
        // 选中触发事件
        onSelectPage: function(){}
    };

    // 初始化
    // =================
    Pagination.prototype._init = function(options, inited) {
        var $this = this;

        this._setOption(options);

        $this.itemsOnPage = this.options.itemsOnPage;
        $this.items = this.options.items;
        $this.current = this.options.currentPage;

        // 总页数
        $this.pages = $this.options.pages ? $this.options.pages : Math.ceil($this.items / this.itemsOnPage) ? Math.ceil($this.items / $this.itemsOnPage) : 1;

        // 当前页，从0开始
        $this.currentPage = $this.options.currentPage -1;
        // 页数区间的一半
        $this.halfDisplayed = $this.options.displayedPages / 2;

        // dom 渲染
        $this._render();

        // 绑定点击切换页码
        !!!inited && $this.$el.on('click', 'a[data-page]', function(e) {
            e.preventDefault();
            $this.selectPage($(this).data('page'));
        });
    };

    Pagination.prototype.init = function(options){
        this._init(options, true);
    };

    // 私有方法
    // 设置配置
    Pagination.prototype._setOption = function(options){
        this.options = $.extend({}, Pagination.DEFAULTS, options);
    };

    // 切换页码
    Pagination.prototype.selectPage = function(pageIndex, pages) {
        // 切换到设置页
        this.currentPage = pageIndex - 1;
        this.current = pageIndex;
        // 重新渲染dom
        this.render(pages);

        // 触发切换选择函数
        this.options.onSelectPage(pageIndex, this);
        // 触发api接口
        this.$el.trigger('select.ui.pagination', [pageIndex, this]);
    };

    Pagination.prototype._render  = function(){
        var o = this.options, interval = this._getInterval(), i;
        // 清空dom
        this.$el.empty().prevAll().remove();
        if(this.pages <= 1) return;

        // 上一页,false时不显示，当前页-1，text为显示文字，true为自定义label
        //console.log('currentPage:'+ o.currentPage)
        if(o.lblPrev && this.currentPage - 1 >= 0) this._append(this.currentPage - 1, { text: o.lblPrev}, true);


        // 左边首页显示边缘页数
        if(interval.start > 0 && o.edges > 0) { // 显示末页
            var end = Math.min(o.edges, interval.start);
            for(i = 0; i < end; i++) this._append(i);

            if(o.edges < interval.start && (interval.start - o.edges != 1)) {
                this.$el.append('<li><span>...</span></li>')
            } else if( interval.start - o.edges == 1) {
                this._append(o.edges);
            }
        }

        // 显示 (当前页-4, 当前页， 当前页+4)
        for(i = interval.start; i < interval.end; i++) this._append(i);

        // 右边末页显示边缘页数
        if(interval.end < this.pages && o.edges > 0) {
            if(this.pages - o.edges > interval.end && (this.pages - o.edges - interval.end != 1)) {
                this.$el.append('<li><span>...</span></li>')
            } else if ( this.pages - o.edges - interval.end == 1) {
                this._append(interval.end++);
            }

            var begin = Math.max(this.pages - o.edges, interval.end);

            for(i = begin; i < this.pages; i++) this._append(i);
        }

        // 下一页,false时不显示，当前页+1，text为显示文字，true为自定义label
        //console.log(this.currentPage, this.pages)
        if(o.lblNext && this.currentPage < this.pages - 1) this._append(this.currentPage+1, {text: o.lblNext}, true);

        this.renderPageStr();
    };

    // 渲染总页码
    Pagination.prototype.renderPageStr = function(){
        if(this.options.pageStr && this.options.pageStr.show) {
            var that = this;
            var oPageStr = that.$el.prevAll();
            var template = this.options.pageStr.template || pageStr;

            template = template.replace(/{\$(\w*)}/gi, function(matches, key, index){
                return that[key] ? that[key] : 0;
            })

            oPageStr.length && oPageStr.remove();

            that.$el.before($(template));
        }
    }

    // 重新渲染,外部接口
    Pagination.prototype.render = function(pages){
        this.pages = pages ? pages: this.pages;
        this._render();
    };

    // 获取显示页码范围
    Pagination.prototype._getInterval = function(){
        return {
            start: Math.ceil(
                // 当前页是否大于显示范围的一半
                this.currentPage > this.halfDisplayed
                    ? Math.max(
                    // 从当前页-显示一半范围开始
                    Math.min(this.currentPage - this.halfDisplayed, (this.pages - this.options.displayedPages))
                    // 当前页小于一半且总页数小于显示范围，从第一页开始
                    , 0)
                    // 从第一页开始
                    : 0),
            end: Math.ceil(
                // 当前页是否大于显示范围的一半
                this.currentPage > this.halfDisplayed
                    // 当前页+显示范围的一半
                    ? Math.min(this.currentPage + this.halfDisplayed, this.pages)
                    // 结束为最多显示，末页
                    : Math.min(this.options.displayedPages, this.pages))
        }
    };

    // 重新组织dom结构
    // pageIndex 渲染页码
    // opts 文本配置
    // islb 是否上一页下一页，是永不加active
    Pagination.prototype._append = function(pageIndex, opts, islb) {
        var $this = this, item, options;

        // 判断首页，末页，常规页
        pageIndex = pageIndex < 0 ? 0: (pageIndex < this.pages ? pageIndex : this.pages -1);
        options = $.extend({ text: pageIndex + 1}, opts);

        // console.log(pageIndex, this.currentPage, islb)

        // 判断当前页与非当前页
        item = (pageIndex == this.currentPage) ?
            // 当前页， 上一页下一页不加active类
        '<li '+ (islb ? '' : 'class="'+ active +'"') +'><a href="javascript:void(0);">'+ (options.text) +'</a></li>'
            // 分当前页标识为可点击
            : '<li><a href="#page-'+ (pageIndex + 1) +'" data-page="'+ (pageIndex + 1) +'">'+ options.text +'</a></li>';

        $this.$el.append(item);
    };

    // 插件定义
    //======================
    function Plugin(options) {
        // 获取传入参数，可能不止options一个参数
        var args = arguments;
        // jquery 链式
        return $(this).each(function () {
            var $this = $(this);
            if($this.hasClass('no-js')) return;
            var data = $this.data('ui.pagination');

            // 创建一个新实例
            if(!data) $this.data('ui.pagination', (data = new Pagination($this, $.extend({}, $this.data(), options))));

            if(typeof options == 'string') { // 调用接口方法,第二个参数为方法传入参数
                data[options].apply(data, [].slice.call(args, 1));
            }
        })
    }

    // jQuery 插件扩展
    $.fn.pagination = Plugin;
    $.fn.pagination.Constructor = Pagination;

    // 元素插件绑定
    // ====================
    $(function(){
        $('[ui-pagination],.pagination').pagination();
    })

    return;

}));
