/**
 * brickPlus主文件
 * by tommyshao <jinhong.shao@frontpay.cn>
 * 2016-07-04
 */

'use strict'

var $ = require('jquery')

// var BrickPlus = require('brickPlus')
if( typeof BrickPlus === 'undefined') {
  var BrickPlus = {}
}

// ------- 工具函数库 ----------

var Util = {
  // 1. 输入框输入过滤
  inputFilter: require('./Util/inputFilter'),
  // 2. 金额简体转繁体
  cnMoney: require('./Util/cnMoney'),
  // 3. 浏览器版本检测
  browser: require('./Util/detect'),
  // 4. 倒计时
  clockTick: require('./Util/clockTick'),
  //-- 5. 银行卡格式化
  //-- 6. 银行卡开户行补齐
  //-- 7. 进度条
  // 8. 全角半角转换
  dbcToSbc: require('./Util/dbcToSbc'),
  // 9. 文本框插入文字
  insertTextAtCaret: require('./Util/insertTextAtCaret'),
  //-- 10. 隐私查看器
  // 11. 日期间隔计算
  dayDiff : require('./Util/dayDiff'),
  // 12. 时间计算
  dateDiff: require('./Util/dateDiff'),
  // 13. 金额格式化
  currency: require('./Util/currency')
}

BrickPlus.Util = Util

// API
module.exports = BrickPlus
