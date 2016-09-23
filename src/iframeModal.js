/**
 * iframe模态窗口
 * 
 * by tommyshao <tomieric@gmail.com>
 * 2016-09-23
 */

import $ from 'jquery'
import Modal from './modal'

export default class IframeModal{
    constructor(el, props, next) {
        this.el = $(el)
        this.props = props
        this.next = next 
        this.dialog = this.get(el)

        this.showModal(props)
    }

    showModal(opt) {
        let that = this
        opt.show = false
        opt.content = ''

        opt.callback = function() {
            that.dialog = $(this)
            that.$dom = $(this)

            if(opt && opt['url']) {
                that.originalUrl = opt.url;
                that.init()

                typeof that.next === 'function' && that.next.call(that, that.$dom)
            }
        }

        that.dialog.modal(opt)
    }

    init(url) {
        let $body = this.$dom.find('.modal-body')
        this.$title = this.$dom.find('.modal-title')
        this.$iframe = $('<iframe />')

        // cache
        url = this.getUrl(url)

        this.$iframe.attr({
            src: (url || this.originalUrl),
            width: (this.props.width || '100%'),
            height: (this.props.height || '100%'),
            allowtransparency: 'yes',
            frameborder: 'no',
            scrolling: 'no'
        }).on('load', $.proxy(this.adjustHeight, this))

        $body.empty().append(this.$iframe)
    }

    setProp (config) {
        if(config['title']) this.$title.html(config['title'])
        if(config['url']) this.$iframe[0].src = config['url']
    }

    getUrl (url) {
        // cache
        if(!this.props.cache) {
            url = url ? url : this.originalUrl
            url = url.indexOf('?') > -1 ? url+'&t='+ (new Date() * 1) : url+'?t='+(new Date() * 1)
        }

        return url;
    }

    setUrl(url) {
        url = this.getUrl(url)
        this.$iframe.attr({ src: url })
    }

    adjustHeight() {
        var test, h 

        this.$iframe.css({ height: '0px' })

        try {
            test = this.$iframe[0].contentWindow.frameElement
        }catch(e) {

        }

        if(test) {
            h = this.$iframe.contents().height()
            this.$iframe.css({ height: h + 'px'})
        }
    }

    show() {
        if(!this.props.cache) this.setUrl()
        this.dialog.modal('show')
    }

    hide() {
        this.dialog.modal('hide')
    }

    get(id) {
        if(id && id.frameElement) {
            var iframe = id.frameElement 
            var api 
            var modalList = $('.modal-background', id.parent.document)

            modalList.each(function(i, item) {
                var ifr = $(item).find('iframe')
                if(ifr[0] === iframe) api = $(item)
            })

            return api
        } else {
            return $(id)
        }
    }
}

IframeModal.get = IframeModal.prototype.get 

IframeModal.close = function(id) {
    var dialog = IframeModal.get(id)
    $(dialog).find('.modal-close').trigger('click')
    $(dialog).remove()
}

IframeModal.adjustHeight = function(id) {
    var dialog = IframeModal.get(id)
    var $iframe = $(dialog).find('iframe');
    var test, h;

    try {
        // 跨域测试
        test = $iframe[0].contentWindow.frameElement;
    } catch (e) {
    }

    if (test) {
        h = $iframe.contents().height();
        $iframe.css({height: h + 'px'})
    }
}

IframeModal.DEFAULTS = {
    width: '100%',
    height: '100%',
    url: '',
    cache: true
}

$.fn.iframeModal = function(opt, ...args) {
    var that = $(this);
    var selector = $(this).selector;
    opt = $.extend({}, IframeModal.DEFAULTS, opt)

    if ((this[0] === window || this[0] === parent) && opt == 'hide') {
        IframeModal.close(window);
        return;
    }

    if (this[0] === window && opt == 'adjustHeight') {
        IframeModal.adjustHeight(window);
        return;
    }

    var data = that.data('bp.iframeModal');

    if (!data) {
        data = new IframeModal(selector, opt, function (obj) {
            $(obj).data('bp.iframeModal', this);
        })
    } else {
        if (opt && opt['url'] && opt['reset']) {
            data && data.setUrl(opt.url) && data.show();
        } else {
            if ($.isPlainObject(opt)) {
                data.setProp(opt);
            }
            data && data.show();
        }
    }

    // 调用关闭方法
    if (typeof opt === 'string') {
        data[opt] && data[opt](args)
    }

}


 $(function () {
    $(document).on('click', '[data-toggle="iframeModal"]', function (e) {
        e.preventDefault();
        var title = $(this).attr('data-title') || '提示';
        var url = $(this).attr('data-url');

        url && title && $('#iframe-modal').iframeModal({
            title: title,
            url: url
        });
    })
})