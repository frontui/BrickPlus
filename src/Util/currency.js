/**
 * 金额按千分位格式化
 * @param  {number|string} num     格式化数字或字符
 * @param  {int} decimal 小数点的位数，默认为2位
 * @return {string}       格式化后的字符串
 * @author : tommyshao
 * @created: 2016-07-06
 */
var currency = function(num, decimal) {
  decimal = decimal || 2
  let n = Number(num), parts;

  if(!isNaN(n)) {
    n = Number(num).toFixed(decimal)

    parts = n.split('.');

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "."+ (parts[1] || '')
  }

  return num
}

/*
function currency(num, prefix) {
  var options = { style: 'currency', currency: 'CNY'}
  return prefix ? num.toLocaleString('zh-CN', options) : num.toLocaleString('zh-CN', options).replace('￥', '')
}
*/

module.exports = currency
