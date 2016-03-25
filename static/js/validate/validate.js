/*!
 * 表单验证
 * 基于 jquery.validate.js 的基础
 * 扩展为frontUI 皮肤
 * @return
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ui/tab', ['jquery', 'ui/validate'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    // ----
    // 附加验证规则
    jQuery.validator.addMethod('telphone', function(value, element) {
        return this.optional(element) || /^1[3-9]{10}$/g.test(value);
    });

    var Validation = {};

    Validation.DEFAULTS = {
        // 错误提示
        errorPlacement: function(error, element) {
            $errElem = $('<div class="form-notice"><i></i></div>').append(error);
            element.after($errElem.show()).parents('.form-group').addClass('has-error');
        },
        // 从新验证
        onfocusout: function(el) {
            if($(el).hasClass('error')) {
                $(el).parents('.form-group').addClass('has-error').find('.form-notice').show();
            }
        },
        // 验证成功
        success: function(label) {
            label.parent().hide().parents('.form-group').removeClass('has-error');
        },
        errorElement: "span",
    };

    function Plugin(options) {
        var config = $.extend({}, Validation.DEFAULTS, options);
        return $(this).each(function() {
            return $(this).validate(config);
        });
    }

    $.fn.validation = Plugin;
    $.fn.validation.prototype = $.fn.validate.prototype;

    return $.fn.validation;
}));
