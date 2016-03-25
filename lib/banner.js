/*--- 公用函数 ---*/
var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()

// 静态文件头部注释banner
var banner = [
  '/*! generator-frontman v0.1.2',
  '*  by [object Object]',
  '*  (c) 2014-'+ $.util.date(Date.now(), 'UTC:yyyy') + ' www.frontpay.cn',
  '* updated on '+ $.util.date(Date.now(), 'UTC:yyyy-mm-dd'),
  '*  Licensed under MIT',
  '*/',
  ' '
].join('\n');

module.exports = function() {
  return banner;
}
