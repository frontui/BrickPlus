/**
 * 计算某时间多少天后的日期
 * by tommyshao
 * 2016-07-06
 */

var zeroPad = require('./zeroPad')

/**
 * 时间间隔计算
 * @param  {string} d      时间字符串，一般都是xxxx-xx-xx格式
 * @param  {int} diff   间隔天数
 * @param  {String} prefix 连接字符串，默认是“-”
 * @return {String}     计算后的时间 xxxx-xx-xx
 */
var dateDiff = function(d, diff, prefix='-') {
  var date = new Date(d),
      diffDay = date.getTime() + 24 * 60 * 60 * 1000 * diff,
      dd = new Date(diffDay)

  return [dd.getFullYear(), zeroPad(dd.getMonth() + 1), zeroPad(dd.getDate())].join(prefix);
}

module.exports = dateDiff
