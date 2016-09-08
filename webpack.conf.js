/**
 * bundle 使用webpack 打包
 * 配置文件
 * by tommyshao
 * 
 * webpack --watch
 */

var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var entryFiles = [];
var srcPath = path.resolve('./src')
var entries = getEntries(srcPath)

function getEntries(folder) {
  var paths = path.resolve(folder)
  var dirs = fs.readdirSync(paths)
  var matchs = [], files = {}

  dirs.forEach(function(file) {
    matchs = file.match(/(.+)\.js$/)
    // 不包含brickplus
    if(matchs && matchs[1]) {
      // 使用数组才不会抛出模块之间引用的错误
      files[matchs[1]] = [path.resolve(folder, file)]
    }
  })

  return files;
}


module.exports = {
    entry: entries, // 多入口
    output: {
      path: path.join(__dirname, './static/js/brickplus'),
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        jquery: 'bower_components/jquery/dist/jquery.min.js',
        zeroPad: './src/Util/zeroPad.js'
      },
      extensions: ['', '.js'],
      root: [path.resolve('./src')]
    },
    externals: [
      {
        jquery: {
          root: 'jQuery',
          commonjs2: 'jquery',
          commonjs: 'jquery',
          amd: 'jquery'
        }
        //jquery: true
      }
    ]
}