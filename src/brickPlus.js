/**
 * brickPlus主文件
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-04
 */

'use strict'

var $ = require('jquery')

let BrickPlus = {}


// 全选组件
let checkAll = require('./checkAll')
// tab组件
let Tab = require('./tab')


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
