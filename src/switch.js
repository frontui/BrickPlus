/**
 * Switch 开关
 * 
 * by tommyshao <tomieric@gmail.com>
 *
 * 2016-09-21
 */

import $ from 'jquery'
import ModalLayer from './ModalLayer'

const toggle = '.switch,[data-toggle="switch"]'

class Switch {
    constructor(el, props) {
        this.el = $(el)
        this.props = props

        // 配置props
        // {
        //   type : 'toggle',
        //   docClick : true,
        //   isSecondCheck : true,
        //   secondCheckOption : {   //  isSecondCheck为true时必传
        //     title : '传参提示',   //  弹窗标题
        //     getContent : function(isChecked){   //  弹窗提示语，需要return一个字符串，isChecked为当前是否激活状态(布尔值)
        //       var content = '当前状态为' + (isChecked ? '激活' : '未激活');
        //       return content;
        //     },
        //     secondCheckCallBack : function(el,isChecked){ 
        //       // 回调，点击确定后跑逻辑
        //       console.log(el,isChecked);  // 随便打印
        //     }
        //   }
        // }

        this.isChecked = this.el.hasClass('checked');

        if(!props.docClick) this.el.on('click', $.proxy(this.toggle, this))
    }

    toggle(e) {
        e && e.preventDefault() && e.stopPropagation()
        // 禁止状态
        if(this.el.hasClass('disabled')) return;

        if(this.props.isSecondCheck){
            //  弹窗二次确认
            $.confirmModalLayer({
                title: this.props.secondCheckOption.title || '提示',
                content: $.proxy(this._getConfirmContent,this)(),
                callback : $.proxy(this._confirmModalLayerCallBack,this),
                isHideRemove : true
            });
        }else{
            this._toggleClass();
        }

    }

    _getConfirmContent(){
        var content = this.props.secondCheckOption.getContent(this.isChecked);

        return content;
    }

    _confirmModalLayerCallBack(){
        this.props.secondCheckOption.secondCheckCallBack(this.el,this.isChecked)
        this._toggleClass();
    }

    _toggleClass(){
        this.el.toggleClass('checked', !this.isChecked).trigger('checked.bp.switch', !this.isChecked)
        //  控件状态同步
        this.isChecked = !this.isChecked;
    }
}

// ----------
// jQuery api
function Plugin(option, ...args) {
    return $(this).each(function(){
        var that = $(this),
            data = that.data('bp.switch')

        if(!data) that.data('bp.switch', (data = new Switch(that, option)))
        if(option.type && typeof option.type === 'string') typeof data[option.type] === 'function' && data[option.type](...args)
    })
}

$.fn.switch = Plugin 
$.fn.switch.constructor = Switch

//  开放参数供外部调用，不用自动激活
// $(function() {
//     $(document).on('click.switch', toggle, function() {
//         $(this).switch('toggle')
//     })
// })