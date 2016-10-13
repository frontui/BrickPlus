/**
 * brickPlus主文件
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-04
 */

'use strict'

var $ = require('jquery')

let BrickPlus = {}


// 全选组件
//require('./checkAll')
// tab组件
//require('./tab')
import './transition'
import './swipe'

import './alert'
import './carousel'
import './checkAll'
import './datetimepicker'
import './dropdown'
import './Modal'
import './modalLayer'
import './iframeModal'
import './Notify'
import './pagination'
import './placeholder'
import './progress'
import './scroller'
import './smoothScroll'
import './spin'
import './switch'
import './tab'
import './timerPicker'
import './tooltips'
import './validator'


// ------- 工具函数库 ----------
BrickPlus.Util = require('./brickPlus.Util')

// ----初始化
$(function() {
  // 1. 密码禁止复制黏贴
  // 2. 文本不能输入空格
  // 3. 表格禁止自动提示属性
  $('form').attr('autocomplete', 'off')
})

// jQuery bridge API
$.brickPlus = BrickPlus;

// API
module.exports = BrickPlus
