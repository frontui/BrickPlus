/*--- 公用函数 ---*/
var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var pkg = require('../package.json')

// 静态文件头部注释banner
var banner = [
  '/*! ',
  '*  '+ pkg.name +' v'+ pkg.version,
  '*  by fronui team',
  '*  updated on '+ $.util.date(Date.now(), 'UTC:yyyy-mm-dd'),
  '*  created by generator-frontman',
  '*  (c) 2014-'+ $.util.date(Date.now(), 'UTC:yyyy') + ' www.frontpay.cn',
  '*  Licensed under MIT',
  '*/',
  ' '
].join('\n');

module.exports = function() {
  return banner;
}
