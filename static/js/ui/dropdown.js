//     菜单下拉|select
//     tommyshao <jinhong.shao@frontpay.cn>
//     Reference bootstrap.dropdown.js

// API
// -----
// $(element).on('selected.ui.dropdown', function(e, obj){});

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/dropdown', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {


    'use strict';

    // 默认高亮类
    var active = 'active';
    // 绑定默认选择器
    var wrap = '.form-control-dropdown';
    var toggle = '[data-toggle="dropdown"],.form-control-dropdown-value';
    var toggleBtn = '.form-control-dropdown-btn, [data-toggle="dropdown-btn"]';
    var toggleIBtn = '.form-control-dropdown-btn > i, [data-toggle="dropdown-btn"] > i';
    var ul = '.form-control-dropdown-menu';
    var list = '.form-control-dropdown-menu li, [role="list"] li';

    // 构造函数
    // -------
    var Dropdown = function(el) {
        $(el).on('click.ui.dropdown', this.toggle);

        if(/input/i.test(el.tagName)) {
            $(el).on('keyup.ui.dropFilter', this.filter)

            //.on('focusin.ui.dropFilter', this.focusIn)
        }


        var $target = getParent(el);
        $target.on('click.ui.dropSelect', list, this.selected($target))
    };

    // 版本
    // ----------
    // 1.0.0

    Dropdown.VERSION = '1.0.0';

    // 鼠标点击
    // ---------
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);

        if($this.is('.disabled,:disabled')) return;

        dropMenus($this);

        return false
    };

    // 键盘按键 focus
    // -------------
    //Dropdown.prototype.CURRENT_ITEM = -1;
    Dropdown.prototype.keydown = function (e) {
        //console.log(e.which)
        if(e.which === 27){ // esc
            clearMenus(e);
            return;
        }
        if (!/(38|40|27|32|13|46|8)/.test(e.which)) return;

        var $this = $(this);
        var currentItem = $this.data('currentItem') === undefined ? -1 : $this.data('currentItem');

        //e.preventDefault();
        e.stopPropagation();

        if($this.is('.disabled, :disabled')) return;

        var $target = getParent($this);
        active = $this.data('active') || active;

        var isActive = $target.hasClass(active);

        //console.log(e.which)
        if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
            //console.log(e.which);
            if (e.which == 27) $target.find(toggle).trigger('focus');
            return $this.trigger('click');
        }

        var $items = $target.find(list).filter(':visible');

        if(!$items.length) return;

        if(e.which == 13 && $items.filter('.hover').length) { // enter
            $items.filter('.hover').trigger('click.ui.dropSelect');
            return;
        }

        var index = $items.index(e.target) > -1 ? $items.index(e.target) : currentItem;



        if (e.which == 38 && index >= 0)  index--;  // up
        if (e.which == 40 && index < $items.length) index++; // down
        //if (!~index) index = 0;
        //console.log(index);
        if (index < 0) index = $items.length - 1;
        if (index >= $items.length) index = 0;

        scrollTop($items, index);

        $this.data('currentItem', index);

        $items.removeClass('hover').eq(index).addClass('hover').trigger('focus')
    };

    // 下拉菜单选中
    // ---------
    Dropdown.prototype.selected = function(el){
        var $target = el.find(toggle);
        return function(e){
            e.preventDefault();
            e.stopPropagation();
            var isInput = /input/i.test($target[0].tagName);
            var option = $.trim($(this)[isInput ? 'text' : 'html']());
            $target[isInput ? 'val' : 'html'](option).trigger('selected.ui.dropdown', this).trigger('blur');
            clearMenus();
            return false;
        }
    };

    // input输入过滤
    // -----------
    Dropdown.prototype.filter = function(e) {
        if(!/input/i.test(e.target.tagName)) return;

        var $this = $(this);
        var inputText = $.trim($this.val());
        var $list = getList($this);
        if(inputText === '') {
            $list.show();
            return;
        }

        if($list.length) {
            $list.map(function(){
                var text = $(this).text();
                if(text.indexOf(inputText) > -1) {
                    return $(this).show();
                } else {
                    return $(this).hide();
                }
            })
        }
    };

    Dropdown.prototype.focusIn = function(e){
        var $this = $(this);
        dropMenus($this, true)
        //Dropdown.prototype.filter.call(this, e);
    };

    // 显示当前展开dropdown
    // -------------------

    function dropMenus($this, always) {
        var $target = getParent($this);
        active = $this.data('active') || active;

        var isActive = $target.hasClass(active);

        always === undefined && clearMenus();

        if(!isActive) {
            $target.addClass(active);
            $this.attr('aria-expanded', true).trigger('show.ui.dropdown', this)
        }
    }

    // 清除页面所有dropdown
    // ------------------
    function clearMenus(e, auto) {
        $(toggle).each(function () {
            var $this = $(this);
            var $target = getParent($this);
            var $input = $target.find(toggle);
            var isAuto = $this.attr('data-auto');
            active = $this.data('active') || active;

            if(!$target.hasClass(active)) return;
            if(e && e.isDefaultPrevented()) return;

            // 隐藏之前自动赋值
            // console.log(isAuto)
            auto && isAuto && autoFill($this, $input);

            $target.removeClass(active).find(list).removeClass('hover').show();
            $this.attr('aria-expanded', 'false').trigger('hide.ui.dropdown', this).data('currentItem', -1);

            $input.length && $input.trigger('blur');

        })
    }

    function hideAllMenus (e) {
        clearMenus(e, 1)
    }

    // 默认选中
    // -----------
    function autoFill(element, input){
        var $Li = getList(element), $vLi, isMatch = 0, txt = '', value = $.trim(input.val());

        $vLi = $Li.filter(function(){
            if($(this).is(':visible')) {
                if(isMatch === 0) {
                    txt = $.trim($(this).text());
                    isMatch = txt == value ? 1 : 0;
                }
                return true;
            }
            return false;
        });

        if(!isMatch) {
            if($vLi.length === 0) {
                $Li.eq(0).trigger('click')
            } else {
                $vLi.eq(0).trigger('click.ui.dropSelect')
            }
        }
    }

    // 匹配
    // -----------
    function chkMatch() {
        var $this = $(this),
            placeholder = $this.attr('placeholder'),
            value = $.trim($this.val()),
            $items = getList($this);

        if(value === '' || value === placeholder) {
            return;
        }

        $items.hide()
            .filter(function(){
                var txt = $.trim($(this).text()) || '';

                if(txt == value){
                    $(this).addClass('hover');
                }

                return txt.indexOf(value) > -1;
            })
            .show();
    }



    // 获取响应的元素
    // --------------
    function getParent(el) {
        var $parent = $(el).data('target') || $(el).parent();
        return $parent;
    }

    // 获取列表项
    // -----------
    function getList(el) {
        var $parent = getParent(el);
        return $parent.find(list);
    }

    // 滚动条自动跳到某位置
    // -----------------
    function scrollTop(el, i) {
        var $parent = el.parent();
        var top = el.eq(i).position().top;
        $parent.scrollTop(top);
    }

    // 插件定义
    // ------------
    function Plugin(option) {
        var args = [].slice.call(arguments, 1);
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.dropdown');

            if(!data) $this.data('ui.dropdown', (data = new Dropdown(this)));
            if(typeof option == 'string') data[option].apply(this, args);
        })
    }

    // jQuery 插件扩展
    // --------------
    $.fn.dropdown = Plugin;
    $.fn.dropdown.Constructor = Dropdown;

    // 元素插件绑定
    // --------------
    $(function(){
        $(toggle).dropdown();
        $(document)
        // 点击页面其他地方收起
            .on('click.ui.dropdown', hideAllMenus)
            // 按钮触发
            .on('click.ui.dropdown-btn', function(e){
                var that = e.target;
                if($(that).is(toggleBtn) || $(that).is(toggleIBtn)) {
                    var $wrap = $(that).closest(wrap);
                    var $target = $wrap.find(toggle);
                    //console.log($wrap);
                    //$target.length && $target.dropdown('toggle');
                    dropMenus($target)
                    //console.log($target);
                    //$target.dropdown('selected', $target[0]);
                    //$target.trigger('toggle')
                    //Dropdown.prototype.selected($target)();
                    return false;
                }

            })
            // .on('click.ui.dropdown', ul, function(e){
            .on('click.ui.dropdown', function(e){
                var that = e.target;
                if($(that).is(ul)) {
                    e.stopPropagation();
                    return false;
                }

            })
            // .on('click.ui.dropdown', list, function(e){
            //     var $toggle = $(e.target).closest(wrap);
            //     console.log($toggle);
            //     var $target = getParent($toggle.find(ul));
            //     $target.trigger('click.ui.dropSelect');
            //     e.stopPropagation();
            //     return false;
            // })
            // focus
            // .on('focus.ui.dropdown', toggle, chkMatch)
            .on('focus.ui.dropdown', function(e) {
                var that = e.target;
                $(that).is(toggle) && chkMatch(that, e);
            })
            // .on('keydown.ui.dropdown', toggle, Dropdown.prototype.keydown);
            .on('keydown.ui.dropdown', function(e) {
                var that = e.target;
                $(that).is(toggle) && Dropdown.prototype.keydown.call(that, e);
            });
    })

    return $;

}));
