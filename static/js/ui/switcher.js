//     switcher 脟脨禄禄脝梅
//     tommyshao <jinhong.shao@frontpay.cn>

// API:
// ------
// <div data-toggle="switcher" [data-except="true"|data-item="a"|data-active="current"]/>
// $(element).switcher({except:true, item: 'a', active: 'current'});
// $(element).on('select.ui.switcher', function(e){ e.relatedTarget; });

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/switcher', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    var toggle = '[data-toggle="switcher"]';

    // 构造函数
    // ----------
    var Switcher = function(element, option) {
        var $this = this;
        this.$el = $(element);
        this.option = $.extend({}, Switcher.DEFAULTS, option, this.$el.data());
        this.$el.on('click.ui.switcher', this.option.item,  function(e){
            e.stopPropagation();
            e.preventDefault();
            $this.select($(this));
        });
    };

    // 版本号
    // ------
    // 1.0.0
    Switcher.VERSION = '1.0.0';

    // 默认配置参数
    // ----------
    // * `item`
    // * `active`
    // * `except`
    // * `keep`
    Switcher.DEFAULTS = {
        item: 'li',
        active: 'active',
        except: false,
        keep: false
    };

    // 选中
    // -----
    Switcher.prototype.select = function ($target) {
        var o = this.option, e = $.Event('select.ui.switcher', {relatedTarget: $target});
        if(o.keep && $target.hasClass(o.active)) return;
        $target.toggleClass(o.active).trigger(e);
        if(!o.except) $target.siblings(o.item).removeClass(o.active);
    };


    // 插件接口
    // --------
    function Plugin(option) {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.switcher');

            if(!data) $this.data('ui.switcher', (data = new Switcher(this, option)));
            if(typeof option == 'string') data[option]();
        })
    }


    // jQuery 虏氓录镁脌漏脮鹿
    $.fn.switcher = Plugin;
    $.fn.switcher.Constructor = Switcher;

    // 全局绑定
    // -----------
    $(function(){ $(toggle).switcher() });

    return Switcher;

}));