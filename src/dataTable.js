/**
 * 数据表格组件
 * Created by Ethan <17881055@qq.com> on 2016/10/11.
 *
 */
import $ from 'jquery';
import Pagination from './pagination';
import './checkAll';
class DataTable {
    constructor($el, option) {
        this.event = {
            onLoadSuccess: null, //在数据加载成功的时候触发。
            onBeforeLoad: null, //在载入请求数据数据之前触发，如果返回false可终止载入数据操作。
            onLoadError: null,//在载入远程数据产生错误的时候触发。
            onBeforeDraw: null,//在载渲染之前触发，如果返回false可终止渲染操作。
        };
        this.model = {
            rows: [],
            columns: [],
            fields: [],  //定义的所有Title
            formatters: [], //定义所有的formatter
            styles: [], //样式
            url: null,
            requestData: {
                page: 1, //页数
                number: 10
            },//数量}, //请求数据
            method: 'get', //请求方法
            dataType: 'json', //数据类型
            toolbars: [],
            queryParams: null
        };
        this.dom = {
            $tbody: null,
            $el: $el,
            $loading: null, //加载
            $pageNumber: null,
            pageJumpButtonId: null,
            pageJSelectId: null,
            pageInputId: null,
        };
        this.pagination = null;
        this.option = option;
        this._init();
    }

    _init() {
        if(this.option.hasOwnProperty('url')) this.url = this.option.url;  //是否有url
        if(this.option.hasOwnProperty('toolbar')) this.model.toolbars = this.option.toolbar;  //是否有toolbar
        if(this.option.hasOwnProperty('queryParams')) this.model.queryParams = this.option.queryParams;  //是否有queryParams
        if(this.option.hasOwnProperty('columns')) this.model.columns = this.option.columns;  //columns
        //event
        if(this.option.hasOwnProperty('onBeforeLoad')) this.event.onBeforeLoad = this.option.onBeforeLoad;
        if(this.option.hasOwnProperty('onLoadSuccess')) this.event.onLoadSuccess = this.option.onLoadSuccess;
        if(this.option.hasOwnProperty('onLoadError')) this.event.onLoadError = this.option.onLoadError;
        if(this.option.hasOwnProperty('onBeforeDraw')) this.event.onBeforeDraw = this.option.onBeforeDraw;
        this._setTitleByDom(this.dom.$el);
        if(this.model.columns.length > 0) { //判断是否需要重写表头
            this._buildTableHead();
            this._setTitleByColumns(this.model.columns);
        }
        this._buildLoading();
        this._build();
    }

    _getToolbarData() {
        var obj = {};
        for(var i = 0; i < this.model.toolbars.length; i++) {
            var id = this.model.toolbars[i];
            obj[$(id).attr('name')] = $(id).val();
        }
        return obj;
    }

    _getData() { //获取数据并渲染
        this.dom.$el.find('.btn-spinner').css({display: 'block'});
        this.model.queryParams && $.extend(this.model.requestData, this.model.queryParams());
        $.extend(this.model.requestData, {t: new Date().getTime().toString()}); //时间戳清除浏览器缓存
        if(this.event.onBeforeLoad) {
            var drawAble = this.event.onBeforeLoad();
            if(!drawAble) {
                return null;
            }
        }
        $.ajax({
            type: this.model.method,
            url: this.model.url,
            data: this.model.requestData,
            dataType: this.model.dataType,
            success: function(json) {
                this.event.onLoadSuccess && this.event.onLoadSuccess(json);
                this.model.rows = json.rows;
                this._clear();
                this._render(json);
                //初始化页脚信息
                this._setPagination(json);
                this.dom.$el.find('.btn-spinner').css({display: 'none'});
            }.bind(this),
            error: function(e) {
                // console.log("dd");
                this.event.onLoadError && this.event.onLoadError(e);
            }
        });
    }

    _setPagination(json) {
        var total = json.total;
        this.getPager.props.pageStr.show = true;
        this.getPager.items = total; //记录数
        this.getPager.totalPages = Math.ceil(total / $(this.dom.$pageNumber).val()); //共几页
        this.getPager.render();
        //this.getPager.__renderPageStr();
    }

    //清除表格
    _clear() {
        this.dom.$tbody && $(this.dom.$tbody).remove();
    }

    //渲染表格
    _render(json) {
        
        if(this.event.onBeforeDraw) {
            var drawAble = this.event.onBeforeDraw();
            if(!drawAble) {
                return null;
            }
        }
        var $tbody = $("<tbody></tbody>");
        var rows = json.rows;
        for(var i = 0; i < rows.length; i++) {
            //生成行
            var row = rows[i];
            var $tr = $("<tr></tr>");
            $tbody.append($tr);
            //根据头部data-options 绑定的ID生成格子
            for(var j = 0; j < this.model.fields.length; j++) {
                var title = this.model.fields[j];
                var formatter = this.model.formatters[j];
                var style = this.model.styles[j];
                var $td = $("<td></td>");
                var obj = eval('(' + style + ')');
                style && $td.css(obj);
                $td.html(this._getContByTitle(title, row, formatter, i));
                $tr.append($td);
            }
        }
        this.dom.$tbody = $tbody;
        this.dom.$el.append($tbody);
    }

    _buildLoading() {
        this.dom.$loading = $('<div class=\"btn btn-spinner\" disabled=\"\">Loading...</div>');
        this.dom.$el.append(this.dom.$loading);
    }

    _buildTableHead() {
        this.dom.$el.empty();
        var $group = $('<colgroup></colgroup>');
        var $thead = $("<thead></thead>");
        var $tr = $("<tr></tr>");
        $thead.append($tr);
        for(var i = 0; i < this.model.columns.length; i++) {
            var column = this.model.columns[i];
            var $col = $('<col></col>');
            if(column.hasOwnProperty('width')) $col.width(column.width);
            $group.append($col);
            //
            var $th = $("<th></th>");
            if(column.hasOwnProperty('title')) $th.html(column.title);
            $tr.append($th);
        }
        this.dom.$el.append($group);
        this.dom.$el.append($thead);
    }

    _build() {
        var paginationId = "j_paginations_" + new Date().getTime().toString();
        this.model.paginationId = paginationId;
        //建立分页
        var $nav = $("<nav class=\"pagination-box text-align-right fn-mt-30\"></nav>");
        var $ul = $("<ul class=\"paginations\" id=\"" + paginationId + "\"></ul>");
        //跳转
        var jumpId = "j-page-itempage-" + new Date().getTime();
        var pageInputId = "j-page-input-" + new Date().getTime();
        this.dom.pageJumpButtonId = jumpId;
        this.dom.pageInputId = pageInputId;
        var $jupmDiv = $("<div class=\"p-add-ons fn-ml-15 \">" +
            "<div class=\"form-group form-gs form-no-label\">" +
            "<div class=\"form-gs-box\">" +
            "<div class=\"form-control-wrap\">" +
            "<input type=\"text\" class=\"form-control\" placeholder=\"跳转\" id=\"" + pageInputId + "\">" +
            "</div>" +
            "<div class=\"form-addon child-right\">页</div>" +
            "<div class=\"form-addon-com\"> " +
            "<button type=\"button\" class=\"btn default\" id=\"" + jumpId + "\">GO</button>" +
            "</div>" +
            "</div>" +
            "</div>");
        //每页显示条数
        var selectId = "s-page-itempage-" + new Date().getTime();
        this.dom.pageJSelectId = selectId;
        var $pageNumber = $("<div class=\"p-add-ons fn-ml-15\">" +
            "<div class=\"form-group form-gs form-no-label\">" +
            "<div class=\"form-gs-box\">" +
            "<div class=\"form-addon\">每页</div>" +
            "<div class=\"form-control-wrap\">" +
            "<select class=\"form-control\" id=\"" + selectId + "\">" +
            "<option>10</option>" +
            "<option>20</option>" +
            "<option>60</option>" +
            "<option>100</option>" +
            "</select> " +
            "</div>" +
            "<div class=\"form-addon\">条</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        )
        $nav.append($ul);
        $nav.append($jupmDiv);
        $nav.append($pageNumber);
        this.dom.$el.after($nav);
        this.dom.$pageNumber = $pageNumber.find('select');
        this.pagination = $ul;
        this._addPageListener();
    }

    _addPageListener() {
        var that = this;
        //切换事件
        $(this.pagination).on('select.bp.pagination',
            function(e, page) {
                that.model.requestData = {
                    page: page, //页数
                    number: $(that.dom.$pageNumber).val(), //数量
                }
                if(that.model.toolbars.length > 0) {
                    $.extend(that.model.requestData, that._getToolbarData());
                }
                that._getData();
            });
        // 控制跳转
        $('#' + this.dom.pageJumpButtonId).on('click', function() {
            var page = $.trim($('#' + that.dom.pageInputId).val());
            if(page !== '' && page > 0 && page <= that.getPager.totalPages) { //判断是否超出 或者为空
                that.model.requestData = {
                    page: page, //页数
                    number: $(that.dom.$pageNumber).val(), //数量
                }
                // that._getData();
                $('#' + that.model.paginationId).pagination('go', parseInt(page))
                $('#' + that.dom.pageInputId).val(" ")
            }
        })
        // 每页记录数
        $('#' + this.dom.pageJSelectId).on('change', function() {
            that.model.requestData = {
                // page: that.model.requestData.page, //页数
                page: 1,
                number: $(that.dom.$pageNumber).val(), //数量
            }
            $('#' + that.model.paginationId).pagination('go', 1) //跳回第1页
        })
    }

    //记录 title 和 formatter
    _setTitleByDom($dom) {
        var ths = $dom.find('th');
        for(var i = 0; i < ths.length; i++) {
            var obj = ths[i];
            this.model.fields.push($(obj).data("options"));
            this.model.formatters.push($(obj).data("formatter"));
            this.model.styles.push($(obj).data("style"));
        }
    }

    _setTitleByColumns(columns) {
        for(var i = 0; i < columns.length; i++) {
            var obj = columns[i];
            this.model.fields.push(obj.field || null);
            this.model.formatters.push(obj.formatter || null);
            this.model.styles.push(obj.style || null);
        }
    }

    //根据表头ID返回内容
    _getContByTitle(str, row, formatter, index) {
        for(var obj in row) {
            if(obj === str) {
                if(formatter) {
                    var a = this._getFormatter(formatter, row[obj], row, index);
                    return a;
                }
                return row[obj];
            }
        }
        if(formatter) {
            var b = this._getFormatter(formatter, row[obj], row, index);
            return b;
        }
        return '';
    }

    _getFormatter(formatter, value, row, index) {
        if(typeof formatter == 'function') {
            var f = formatter(value, row, index);
            return f;
        }
        if(typeof formatter == "string") {
            var f = window[formatter](value, row, index);
            return f;
        }
        return null;
    }

    /**
     * 重新渲染
     */
    draw(resetPage = true) {
        if(resetPage) this.model.requestData.page = 1; //重新渲染时回到第1页
        this._getData();
    }

    /**
     *设置参数值
     */
    setting(obj) {
        for(var key in obj) {
            this.model[key] = obj[key];
        }
    }

    /**
     *获取页脚
     * page
     * number
     */
    getPagination() {
        return {
            page: this.model.requestData.page,
            number: this.model.requestData.number
        }
    }

    /**
     *请求类型
     */
    set method(type) {
        this.model.method = type;
    }

    /**
     *设置uri资源
     */
    set url(u) {
        this.model.url = u;
    }

    /**
     *获取所有表头信息
     *retrun Array
     */
    get fields() {
        return this.model.fields;
    }

    /**
     *设置数据
     *目前暂只支持JSON格式
     */
    set data(d) {
    }

    get getPager() {
        return $(this.pagination).data('bp.pagination');
    }
}
// 插件定义
//======================
function Plugin(options, args) {
    if(typeof options == 'undefined') {
        var data = $(this).data('bp.dataTable');
        if(!data) $(this).data('bp.dataTable', (data = new DataTable($(this), $.extend({}, $(this).data(), options))));
        return data;
    }
    if(typeof options == 'string' && typeof args == 'undefined') {
        var data = $(this).data('bp.dataTable');
        if(!data) $(this).data('bp.dataTable', (data = new DataTable($(this), $.extend({}, $(this).data(), options))));
        if(typeof options == 'string') {
            return data[options].call(data, args);
        }
    }
// jquery 链式
    return $(this).each(function() {
        var $this = $(this);
        if($this.hasClass('no-js')) return;
        var data = $this.data('bp.dataTable');
        // 创建一个新实例
        if(!data) $this.data('bp.dataTable', (data = new DataTable($this, $.extend({}, $this.data(), options))));
        if(typeof options == 'string') { // 调用接口方法,第二个参数为方法传入参数
            data[options].call(data, args);
        }
    })
}
// jQuery 插件扩展
$.fn.dataTable = Plugin;
$.fn.dataTable.Constructor = DataTable;


