/**
 * 平滑滚动
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-25
 *
 * Reference uikit.notify.js
 *
 * API:
 *      $.notify({
 *          message: '',
 *          status:['success', 'warning', 'danger'],
 *          group: false,
 *          pos: 'top-center',
 *          opacity: .85,
 *          timeout: 5000,
 *          onClose: function(){}
 *      });
 */

var $ = require('jquery')

// 存放方位集合
var containers = {};
//  通知集合
var messages = {};
// 接口，扩展$.notify
var notify = function (options) {
    if (typeof options === 'string') {
        options = {message: options};
    }

    if (arguments[1]) {
        options = $.extend(options, typeof arguments[1] === 'string' ? {status: arguments[1]} : arguments[1]);
    }

    return (new Notify(options)).show();
};
// 关闭所有接口
var closeAll = function (group, instantly) {
    var id;

    if (group) {
        for (id in messages) {
            if (group === messages[id].group) messages[id].close(instantly)
        }
    } else {
        for (id in messages) {
            messages[id].close(instantly)
        }
    }
};

// 构造函数
// ===============
var Notify = function (options) {

    this.timeout = false;
    this.currentStatus = "";
    this.group = false;
    this.options = $.extend({}, Notify.DEFAULTS, options);

    // uuid 设置唯一id
    this.uuid = 'Notify_' + Math.random().toString(36).substr(2);

    // 创建元素
    this.$el = $([
        '<div class="notify-message">',
        '<a class="notify-close">&times;</a>',
        '<div></div>',
        '</div>'
    ].join('')).data('ui.notify', this);

    // 设置内容
    this.content(this.options.message);

    // 设置状态
    if (this.options.status) {
        this.$el.addClass('notify-message-' + this.options.status);
        this.currentStatus = this.options.status;
    }

    // 分组
    this.group = this.options.group;

    // 消息按uuid存放
    messages[this.uuid] = this;

    // 方位存放
    if (!containers[this.options.pos]) {
        containers[this.options.pos] = $('<div class="notify notify-' + this.options.pos + '"></div>')
            .appendTo($('body'))
            .on('click', '.notify-message', function () {
                var message = $(this).data('ui.notify');
                message.$el.trigger('manualclose.ui.notify', [message]);
                message.close();
            });
    }
};

Notify.VERSION = '1.0.0';

Notify.DEFAULTS = {
    message: "", // 提示内容
    status: "",  // 状态，样式颜色
    opacity: .85, // 层透明度
    timeout: 5000, // 定时延迟消失
    group: null,   // 是否分组
    pos: "vcenter", // 定位
    onClose: $.noop,  // 关闭触发事件
    compelete: $.noop  // 消失后函数
};

// Public Method
// ===============
/* 显示 */
Notify.prototype.show = function () {
    if (this.$el.is(':visible')) return;

    var $this = this;

    // 方位添加元素
    containers[this.options.pos].show().prepend(this.$el);

    var marginbottom = parseInt(this.$el.css('margin-bottom'), 10);

    // 动画显示
    this.$el.css({opacity: 0, "margin-top": -1 * this.$el.outerHeight(), "margin-bottom": 0})
        .animate({opacity: this.options.opacity, "margin-top": 0, "margin-bottom": marginbottom}, function () {
            if ($this.options.timeout) { // 延时关闭
                var closefn = function () {
                    $this.close()
                };
                $this.timeout = setTimeout(closefn, $this.options.timeout);

                $this.$el.hover(
                    function () {
                        clearTimeout($this.timeout)
                    },
                    function () {
                        $this.timeout = setTimeout(closefn, $this.options.timeout)
                    }
                );
            }
        });

    return this;
};

/* 关闭 */
Notify.prototype.close = function (instanly) {
    var $this = this,
        finalize = function () {
            $this.$el.remove();

            if (!containers[$this.options.pos].children().length) {
                containers[$this.options.pos].hide();
            }

            $this.options.onClose.apply($this, []);
            $this.$el.trigger('close.ui.notify', [$this]);

            delete messages[$this.uuid];

            typoef $this.options.compelete === 'function' && $this.options.compelete($this.$el)
        }

    if (this.timeout) clearTimeout(this.timeout);

    if (instanly) {
        finalize();
    } else {
        this.$el.animate({opacity: 0, "margin-top": -1 * this.$el.outerHeight(), "margin-bottom": 0}, function () {
            finalize();
        })
    }
};

/* 设置内容或获取 */
Notify.prototype.content = function (html) {
    var container = this.$el.find('>div');

    if (!html) {
        return container.html();
    }

    container.html(html);

    return this;
};

/* 设置状态及样式 */
Notify.prototype.status = function (status) {
    if (!status) {
        return this.currentStatus;
    }

    this.$el.removeClass('nofity-message-' + this.currentStatus).addClass('notify-message-' + status);

    this.currentStatus = status;

    return this;
};


// 插件定义
//======================
function Plugin(option) {
    return $(this).on('click', function () {
        option = typeof option === 'string' ? {message: option} : option;
        var data = new Notify(option);
        data.show();
    });
}


// jQuery 插件扩展
$.notify = notify;
$.notify.closeAll = closeAll;
$.fn.notify = Plugin;
$.fn.notify.Constructor = Notify;
