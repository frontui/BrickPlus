/*!
 * TAB 切换
 * tommyshao <jinhong.shao@frontpay.cn>
 * Reference bootstrap.tab.js
 * API:
 *      $(element).on('closed.ui.alert', function(e, obj){});
 */

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/tab', ['jquery', 'ui/transition'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    var tab = '[data-toggle="tab"],.tabs-btn';

    // 构造函数
    // ----------
    var Tab = function(element) {
        this.$el = $(element);
    };

    Tab.VERSION = '1.0.0';

    // 动画过渡时间
    Tab.TRANSITION_DURATION = 150;

    // 关闭
    // ---------
    Tab.prototype.show = function( ) {
        var $this = this.$el;
        var $ul = $this.closest('.tabs');
        var selector = $this.data('target');

        if (!selector) { // a标签
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if($this.hasClass('active')) return;

        var $previous = $ul.find('.active a');
        var hideEvent = $.Event('hide.ui.tab', {
            relatedTarget: $this[0]
        });
        var showEvent = $.Event('show.ui.tab', {
            relatedTarget: $previous[0]
        });

        $previous.trigger(hideEvent);
        $this.trigger(showEvent);

        if(showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

        var $target = $(selector);

        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function(){
            $previous.trigger({
                type: 'hidden.ui.tab',
                relatedTarget: $this[0]
            });
            $this.trigger({
                type: 'shown.ui.tab',
                relatedTarget: $previous[0]
            })
        })
    };

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback
            && $.support.transition
            && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

        function next() {
            $active.removeClass('active').find(tab).attr('aria-expanded', false);

            element.addClass('active').find(tab).attr('aria-expanded', true);

            if(transition) {
                element[0].offsetWidth;
                element.addClass('in');
            } else {
                element.removeClass('fade');
            }

            callback && callback();
        }

        $active.length && transition ?
            $active.one('uiTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION)
            :
            next();
        $active.removeClass('in');
    };


    // 插件定义
    // ----------
    function Plugin(option) {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.tab');

            if(!data) $this.data('ui.tab', (data = new Tab(this)));
            if(typeof option == 'string') data[option] && data[option]();
        })
    }


    // jQuery 插件扩展
    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab;

    // 元素插件绑定
    // -------------
    var clickHandler = function(e) {
        if(!$(e.target).hasClass('tab-disabled')){
            e.preventDefault();
            Plugin.call($(this), 'show')
        }
    };

    $(function(){
        // $(document).on('click.ui.tab', tab, clickHandler)
        $(document).on('click.ui.tab', function(e) {
            var that = e.target;
            $(that).is(tab) && clickHandler.call(that, e)
        })
    })

    return Tab;

}));