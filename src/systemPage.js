/**
 * 后台系统框架页
 * 
 * by tommyshao <tomieric@gmail.com>
 * 
 * 2016-09-26 
 * 
 * 建议 jquery 和systemPage.js 在页面head引入
 */

import $ from 'jquery'
import Cookie from './cookie'

// 面板
import Panel from './panel'
// 展开
import Expand from './expand'

// 页面框架
let systemPage = {
    init: function() {
        // 左右导航展开收起切换
        this._leftAction()
        this._rightAction()

        // 初始化左侧菜单
        this._initMenu()

        // 展开菜单项
        this._expandMenu()

        // 导航菜单展开
        this._navigator()

        // 换肤
        this._changeSkin()
    },
    _leftAction() {
        // 左侧菜单动作相反
        // show - 收起 hide - 展开
        this.leftPanel = new Panel(
            '[data-toggle="leftPanel"]', 
            '[data-toggle="container"]', 
            {
                btn: '[data-toggle="aside-switch"]',
                callback: function(expand) {
                    let val = expand ? 1 : 0
                    // 默认一年过期
                    Cookie('bp.expendMenu', val, { maxage: 60 * 60 * 24 * 360 * 1000 })
                },
                // ie9- jq animate
                polyfill: function(el, container, expand, callback) {
                    let ml = expand ? '70px' : '250px'
                    container.animate({ 'margin-left': ml}, 300, callback)
                } 
            }
        )
    },
    _rightAction() {
        this.rightPanel = new Panel(
            '[data-toggle="rightPanel"]', 
            '[data-toggle="container"]', 
            { 
                autoHide: true,
                btn: '[data-toggle="assist-switch"]',
                // ie9- jq animate
                polyfill: function(el, container, expand, callback) {
                    let ml = expand ? '-220px' : '0'
                    container.find('> div').animate({ 'margin-left': ml}, 300, callback)
                } 
            }
        )
    },
    _initMenu() {
        let expendMenu = Cookie('bp.expendMenu')
        // 首次尚无 cookie 记录用户操作
        // cookie 过期
        if(expendMenu === undefined) {
            // 分辨率1280以下默认收起左侧菜单
            let viewW = $(window).width()
            if(viewW <= 1280) this.leftPanel.show()
        } else {
            this.leftPanel[expendMenu == 1 ? 'show' : 'hide']()
        }
    },
    _expandMenu() {
        // 绑定
        $('[data-toggle="expand"]').each(function() {
            let that = $(this),
                data = that.data('bp.expand')
                
            if(!data) that.data('bp.expand', (data = new Expand(that)))
        })
    },
    _navigator() {
        var that = this;
        $('[data-toggle="navigator"] li').on('click', function(e) {
            // 阻止冒泡，搞定二三级菜单不影响一级
            e.stopPropagation()

            let self = $(this)

            // 展开导航
            that.leftPanel.hide()
            
            // 是否展开，再点击收起
            if(self.hasClass('current')) {
                self.toggleClass('current').find('.current').removeClass('current')
            } else { // 展开收起同级
                $(this).addClass('current').siblings().removeClass('current')
            }
        })
    },
    _changeSkin() {
        let skinEl = $('[data-toggle="skin"]')
        let targetEl = $(skinEl.attr('data-target'))
        skinEl.on('click', 'li', function(e) {
            e.preventDefault()
            let theme = $(this).attr('data-theme')
            targetEl.attr('href', function() {
                return this.href.replace(/\/(.*)\.css/, '/$1-'+ theme +'.css')
            })
        })
    }
}

// jquery global bind - domready
$($.proxy(systemPage.init, systemPage))

// export api
export default systemPage