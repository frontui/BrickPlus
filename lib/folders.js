/*
* 获取文件夹操作
*/

var fs   = require('fs')
var path = require('path')

function getFolders(dir) {
  return fs.readdirSync(dir)
            .filter(function(file) {
              return fs.statSync(path.join(dir, file)).isDirectory()
            })
}

module.exports = getFolders
