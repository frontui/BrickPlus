/**
 * 模态窗口
 *
 * by tommyshao <tomieric@gmail.com>
 * 2016-09-22
 */

import $ from 'jquery'
import Modal from './Modal'

export default class ModalLayer extends Modal {
    constructor(el, props) {
        super(el, props)
    }
}

ModalLayer.DEFAULTS = {
    icon: 'info',
    title: '提示',
    contentTitle:'',
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
    <div class="result-wrap result-s result-vertical {{status}}">
      <div class="result-box">
        <div class="result-icon"></div>
        <div class="result-content">
          <div class="result-inner">
            <h1>
              {{contentTitle}}
            </h1>
            <p class="bp-modallayer-content text-align-center fn-pt-5">
              {{content}}
            </p>
            <div class="bp-modallayer-btns text-align-center fn-pb-40 fn-pt-20">
              {{buttons}}
            </div>
          </div>
        </div>
      </div>
    </div>
`

// 渲染
ModalLayer.render = function (option) {
    let element;
    element = ModalLayer.TEMPLATE.replace(/{{(\w*)}}/gi, function (match, key) {
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
            btnHtml.push('<button type="button" class="' + (btns[i].style || 'btn primary w-150') + '" data-index="' + i + '">' + btns[i].text + '</button>');
        }
    }

    function callback() {
        var el = $(this)
        $(this).on('click.btnEvents', '.bp-modallayer-btns .btn', function () {
            var index = $(this).data('index'), e = true
            // console.log(btns[index]['callbackPointer']);
            if (btns.length && btns[index] && btns[index]['callback'] && typeof btns[index]['callback'] === 'function') {
                e = btns[index]['callback'].call(btns[index]['callbackPointer'], $(this), index) === false ? false : true
            }

            e && el.modal('hide')
        })
    };

    opt.content = ModalLayer.render({ status: opt.icon ? 'result-' + opt.icon : '', title: opt.title,  contentTitle: (option.contentTitle || ''), content: (option.content || ''), buttons: btnHtml.join('') })
    opt.callback = callback

    that = $(this).modal({ title: opt.title, content: opt.content, callback: opt.callback, size: opt.size, isHideRemove: opt.isHideRemove })

}

$.fn.modalLayer = Plugin
$.fn.modalLayer.constructor = ModalLayer

$.successModalLayer = function (config) {
    if (!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-successModalLayer'
    return $(id).modalLayer({
        icon: 'success',
        size: config['size'],
        title: config['title'],
        contentTitle: config['contentTitle'],   //2017-12-6 new custom contentTitle
        content: config['content'],
        buttons: [
            {
                style: 'btn secondary w-150 ' + config['buttonClassName'], //2017-12-6 custom style
                text: config['okText'] ,   //2017-12-6 custom lable
                callback: config['callback']
            }
        ],
        isHideRemove: config['isHideRemove'] || false
    })
}

$.confirmModalLayer = function (config) {
    if (!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-confirmModalLayer'
    return $(id).modalLayer({
        icon: 'info',
        size: config['size'],
        title: config['title'],
        contentTitle: config['contentTitle'],
        content: config['content'] || '',
        buttons: [
          {
              text: '确定',
              callback: config['callback']
          }
          // ,
          // {
          //   href: 'javascript:void(0);',
          //   text: '取消',
          //   style: 'btn links block-btn w-100'
          // }
        ],
        isHideRemove: config['isHideRemove'] || false
    })
}

$.alertModalLayer = function (config) {
    if (!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-alertModalLayer'
    return $(id).modalLayer({
        icon: 'info',
        size: config['size'],
        title: config['title'],
        contentTitle: config['contentTitle'],
        content: config['content'],
        buttons: [
            {
                text: '确定',
                callback: config['callback']
            }
        ],
        isHideRemove: config['isHideRemove'] || false
    })
}

$.errorModalLayer = function (config) {
    if (!$.isPlainObject(config)) return;
    let id = config['id'] ? config['id'] : '#bp-infoModalLayer'
    return $(id).modalLayer({
        icon: 'fail',
        size: config['size'],
        title: config['title'],
        contentTitle: config['contentTitle'],
        content: config['content'],
        buttons: [
            {
                text: '确定',
                style: 'btn thirdly w-150',
                callback: config['callback']
            }
        ],
        isHideRemove: config['isHideRemove'] || false
    })
}
