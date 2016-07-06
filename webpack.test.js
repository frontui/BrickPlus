/**
 * bundle 使用webpack 打包
 * 配置文件
 * by tommyshao
 */
var path = require('path')
var fs = require('fs')
var NODE_ENV = process.env.NODE_ENV
var entryFiles = [];

function getEntries(folder) {
  var paths = path.resolve(folder)
  var dirs = fs.readdirSync(paths)
  var matchs = [], files = {}

  dirs.forEach(function(file) {
    matchs = file.match(/(.+)\.js$/)
    // 不包含brickplus
    if(matchs && matchs[1] && matchs[1] !== 'brickPlus') {
      files[matchs[1]] = path.resolve(folder, file)
    }
  })

  return files;
}

module.exports = {
    watch: !(NODE_ENV === 'production'),
    entry: {
      checkAll: path.resolve('./src', 'checkAll.js'),
      tab: path.resolve('./src', 'tab.js')
    },
    output: {
      path: path.join(__dirname, './static/js/brickplus'),
      filename: '[name].js',
      library: 'BrickPlus',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0']
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['', '.js'],
      root: [path.join(__dirname, 'src')]
    },
    externals: [
      {
        jquery: {
          root: 'jQuery',
          commonjs2: 'jquery',
          commonjs: 'jquery',
          amd: 'jquery'
        }
      }
    ]
  }
