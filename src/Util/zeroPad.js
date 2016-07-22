/**
 * 单位数补零
 * by tommyshao
 * 2016-07-06
 */

function zeroPad(number) {
  return number > 9 ? number : '0' + number;
}

module.exports = zeroPad
