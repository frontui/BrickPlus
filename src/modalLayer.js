/**
 * 模态窗口
 * 
 * by tommyshao <tomieric@gmail.com>
 * 2016-09-22
 */

import $ from 'jquery'
import Modal from './modal'

export default class ModalLayer extends Modal {
    constructor(el, props) {
        super(el, props)
    }
}

ModalLayer.DEFAULTS = {
    icon: 'info',
    title: '提示',
    content: '',
    close: true,
    size: false,
    buttons: [
        {
            text: '确定',
            href: false,
            style: 'btn primary',
            target: false,
            callback: $.noop
        }
    ]
}

ModalLayer.TEMPLATE = `
    <div class="result-wrap result-s {{status}}">
        <div class="result-box">
            <div class="result-icon"></div>
            <div class="result-content">
                <div class="result-inner">
                    <h1>
                        {{title}}
                    </h1>
                    <div class="bp-modallayer-content fn-pt-15">
                        {{content}}
                    </div>
                    <div class="bp-modallayer-btns plural-btns fn-pt-15 small-btn-gb">
                        {{buttons}}
                    </div>
                </div>
            </div>
        </div>
    </div>
`

// 渲染
ModalLayer.render = function(option) {
    let element;
    element = ModalLayer.TEMPLATE.replace(/{{(\w*)}}/gi, function(match, key) {
        let value = option[key]
        return value
    })

    return element;
}

// --------
// jqurey api
function Plugin(option) {
    let that, opt, btnHtml = [], btns = option.buttons  

    opt = $.extend({}, ModalLayer.DEFAULTS, option)

     for (let i = 0; i < btns.length; i++) {
        if (btns[i].href) {
            btnHtml.push('<a href="' + btns[i].href + '" ' + (btns[i].target ? 'target="' + btns[i].target + '"' : '') + ' class="' + (btns[i].style || 'btn primary') + '" data-index="' + i + '">' + btns[i].text + '</a>');
        } else {
            btnHtml.push('<button type="button" class="' + (btns[i].style || 'btn primary') + '" data-index="' + i + '">' + btns[i].text + '</button>');
        }
    }

    function callback() {
        var el = $(this)
        $(this).on('click', '.bp-modallayer-btns .btn', function() {
            var index = $(this).data('index'), e = true 

            if(btns.length && btns[index] && btns[index]['callback'] && typeof btns[index]['callback'] === 'function') {
                e = btns[index]['callback'].call(null, $(this), index) === false ? false : true 
            }

            e && el.modal('hide')
        })
    }

    opt.content = ModalLayer.render({ status: opt.icon ? 'result-'+ opt.icon : '', title: opt.title, content: (option.content || ''), buttons: btnHtml.join('') })
    opt.callback = callback

    that = $(this).modal({ title: opt.title, content: opt.content, callback: opt.callback, size: opt.size })

}

$.fn.modalLayer = Plugin 
$.fn.modalLayer.constructor = ModalLayer

$.successModalLayer = function(config) {
    if(!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-successModalLayer'
    return $(id).modalLayer({
        icon: 'success',
        size: 'small',
        title: config['title'],
        content: config['content'],
        buttons: [
            {
                style: 'btn secondary',
                text: '确定',
                callback: config['callback']
            }
        ]
    })
}

$.confirmModalLayer = function(config) {
    if(!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-confirmModalLayer'
    return $(id).modalLayer({
        icon: 'info',
        size: 'small',
        title: config['title'],
        content: config['content'],
        buttons: [
            {
                text: '确定',
                callback: config['callback']
            },
            {
                href: 'javascript:void(0);',
                text: '取消',
                style: 'btn links'
            }
        ]
    })
}

$.alertModalLayer = function(config) {
    if(!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-alertModalLayer'
    return $(id).modalLayer({
        icon: 'info',
        size: 'small',
        title: config['title'],
        content: config['content'],
        buttons: [
            {
                text: '确定',
                callback: config['callback']
            }
        ]
    })
}

$.errorModalLayer = function(config) {
    if(!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-infoModalLayer'
    return $(id).modalLayer({
        icon: 'fail',
        size: 'small',
        title: config['title'],
        content: config['content'],
        buttons: [
            {
                text: '确定',
                style: 'btn thirdly',
                callback: config['callback']
            }
        ]
    })
}