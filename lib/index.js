/*
* 工具函数类
*/

var openURL    = require('./openURL')
var template   = require('./template')
var errHandler = require('./errHandler')
var isFolder   = require('./folders')
var banner     = require('./banner')()

module.exports = {
  openURL   : openURL,
  template  : template,
  errHandler: errHandler,
  isFolder  : isFolder,
  banner    : banner
}
