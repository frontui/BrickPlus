/**
 * 计算两个日期相隔多少天
 * by tommyshao
 * 2016-07-06
 */

var zeroPad = require('./zeroPad')

var dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/g;

var dayDiff = function(start, end) {
  var sArr = [], eArr = [], sTime = 0, eTime = 0, diff = 0
  if(dateReg.test(start) && dateReg.test(end)) {
    sArr = start.split('-')
    eArr = end.split('-')

    sTime = new Date(sArr[0], parseInt(sArr[1], 10) -1, sArr[2], 0, 0, 0)
    eTime = new Date(eArr[0], parseInt(eArr[1], 10) -1, eArr[2], 0, 0, 0)

    diff = Math.floor((eTime - sTime) / (24 * 60 * 60 * 1000))

    return diff;

  } else {
    throw new Error('start or end param is legal date formatter')
  }

  return null;
}

module.exports = dayDiff
