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
        this.model = {
            columns: [],
            titles: [],  //定义的所有Title
            formatters: [], //定义所有的formatter
            url: null,
            requestData: {}, //请求数据
            method: 'get', //请求方法
            dataType: 'json', //数据类型
            toolbars: [],
            queryParams: null
        };
        this.dom = {
            $tbody: null,
            $el: $el,
            $pageNumber: null,
        };
        this.pagination = null;
        this.option = option;
        console.log('option', option);
        this._init();
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
        this.model.queryParams && $.extend(this.model.requestData, this.model.queryParams());
        $.extend(this.model.requestData, {t: new Date().getTime().toString()}); //时间戳清除浏览器缓存
        $.ajax({
            type: this.model.method,
            url: this.model.url,
            data: this.model.requestData,
            dataType: this.model.dataType,
            success: function(json) {
                this._clear();
                this._render(json);
                //初始化页脚信息
                this._setPagination(json);
            }.bind(this),
            error: function() {
            }
        });
    }

    _setPagination(json) {
        var total = json.total;
        this.getPager.props.pageStr.show = true;
        this.getPager.items = total; //记录数
        this.getPager.totalPages = total / $(this.dom.$pageNumber).val(); //共几页
        this.getPager.render();
        //this.getPager.__renderPageStr();
    }

    //清除表格
    _clear() {
        this.dom.$tbody && $(this.dom.$tbody).remove();
    }

    //渲染表格
    _render(json) {
        var $tbody = $("<tbody></tbody>");
        var rows = json.rows;
        for(var i = 0; i < rows.length; i++) {
            //生成行
            var row = rows[i];
            var $tr = $("<tr></tr>");
            $tbody.append($tr);
            //生成格子
            for(var j = 0; j < this.model.titles.length; j++) {
                var title = this.model.titles[j];
                var formatter = this.model.formatters[j];
                var $td = $("<td></td>");
                $td.html(this._getContByTitle(title, row, formatter, i));
                $tr.append($td);
            }
        }
        this.dom.$tbody = $tbody;
        this.dom.$el.append($tbody);
    }

    // 初始化
    _init() {
        this._setTitle(this.dom.$el);
        this._build();
        if(this.option.hasOwnProperty('url')) this.url = this.option.url;  //是否有url
        if(this.option.hasOwnProperty('toolBar')) this.model.toolbars = this.option.toolBar;  //是否有toolbar
        if(this.option.hasOwnProperty('queryParams')) this.model.queryParams = this.option.queryParams;  //是否有queryParams
        if(this.option.hasOwnProperty('columns')) this.model.columns = this.option.columns;  //columns

       // this._buildTableHead();
    }

    _buildTableHead() {
        var $group = $('<colgroup></colgroup>');
        var $thead = $("<thead></thead>");
        var $tr = $("<tr></tr>");
        $thead.append($tr);
        for(var i = 0; i < this.model.columns.length; i++) {
            var column = this.model.columns[i];
            var $col = $('<col></col>');
            if(column.hasOwnProperty('width')) $col.width(column.width);
            $group.append($col);
            var $th = $("<th></th>");
            if(column.hasOwnProperty('width')) $th.html(column.title);
            $tr.append($tr);
        }
        
        this.dom.$el.append($group);
        this.dom.$el.append($thead);
        
    }

    _build() {
        //建立分页
        var $nav = $("<nav class=\"pagination-box text-align-right fn-mt-30\"></nav>");
        var $ul = $("<ul class=\"paginations\" id=\"j-page-deom1\"></ul>");
        //跳转
        var $jupmDiv = $("<div class=\"p-add-ons fn-ml-15\">" +
            "<div class=\"form-group form-gs form-no-label\">" +
            "<div class=\"form-gs-box\">" +
            "<div class=\"form-control-wrap\">" +
            "<input type=\"text\" class=\"form-control\" placeholder=\"跳转\" id=\"j-page-input-ff\">" +
            "</div>" +
            "<div class=\"form-addon child-right\">页</div>" +
            "<div class=\"form-addon-com\"> " +
            "<button type=\"button\" class=\"btn default\" id=\"j-page-btnff\">GO</button>" +
            "</div>" +
            "</div>" +
            "</div>");
        //每页显示条数
        var selectId = "j-page-itempage-" + new Date().getTime();
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
        var that = this;
        //切换事件
        $($ul).on('select.bp.pagination',
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
    }

    /**
     *请求类型
     */
    set method(type) {
        this.model.method = type;
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
     *设置uri资源
     */
    set url(u) {
        this.model.url = u;
    }

    //TODO js渲染时公开
    //记录 title 和 formatter
    _setTitle($dom) {
        var ths = $dom.find('th');
        for(var i = 0; i < ths.length; i++) {
            var obj = ths[i];
            var f = $(obj).data("options");
            this.model.titles.push(f);
            this.model.formatters.push($(obj).data("formatter"));
        }
    }

    //根据表头ID返回内容
    _getContByTitle(str, row, formatter, index) {
        for(var obj in row) {
            if(obj === str) {
                if(formatter) {
                    var f = window[formatter](row[obj], row, index);
                    return f;
                }
                return row[obj];
            }
        }
        if(formatter) {
            var f = window[formatter](row[obj], row, index);
            return f;
        }
        return '';
    }

    /**
     *获取所有表头信息
     *retrun Array
     */
    get titles() {
        return this.model.titles;
    }

    /**
     *设置数据
     *目前暂只支持JSON格式
     */
    set data(d) {
    }

    /**
     *获取页脚
     */
    get getPager() {
        return $(this.pagination).data('bp.pagination');
    }
}
// 插件定义
//======================
function Plugin(options, args) {
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

