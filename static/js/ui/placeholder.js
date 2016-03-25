//     placeholder 占位符
//     tommyshao <jinhong.shao@frontpay.cn>

// API:
// ------
// $(element).placeholder();

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/placeholder', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {
    'use strict';

    var toggle = 'input[placeholder]';

    var input = document.createElement('input');
    var isSupport = 'placeholder' in input;

    // 构造函数
    // ===============
    var Placeholder = function(element) {
        var $this = this;
        $this.$el = $(element);
        this.init();
    };

    Placeholder.VERSION = '1.0.0';

    Placeholder.prototype.init = function(){
        if(isSupport) return;
        var $this = this;
        this.$placeholder = $this.$el.data('placeholder');
        if(!isSupport && !this.$placeholder) {
            var text = $this.$el.attr('placeholder');
            $this.$placeholder = $('<label class="form-placeholder" />').html(text);
            $this.$el.data('placeholder', $this.$placeholder).before($this.$placeholder);
        }

        $this.$el.on('focus', $.proxy(this.focus, this));
        $this.$el.on('blur', $.proxy(this.blur, this));
        $this.$placeholder.on('click', $.proxy(this.focus, this));

        // 默认隐藏placeholder
        this.blur();
    };

    Placeholder.prototype.focus = function(){
        this.$placeholder.hide();
    };

    Placeholder.prototype.blur = function(){
        this.$placeholder[this.$el.val() === '' ? 'show' : 'hide']();
    };


    // 插件定义
    //======================
    function Plugin() {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.placeholder');
            if(!data) $this.data('ui.placeholder', (data = new Placeholder(this)));
        })
    }


    // jQuery 插件扩展
    $.fn.placeholder = Plugin;
    $.fn.placeholder.Constructor = Placeholder;

    // 元素插件绑定
    // ====================
    $(function(){ $(toggle).placeholder() });

    return Placeholder;

}));


