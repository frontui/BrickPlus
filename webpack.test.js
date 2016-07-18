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
    //watch: !(NODE_ENV === 'production'),
    entry: {
      datetimepicker: path.resolve(__dirname, './src/test.js')
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
            presets: ['es2015']
          },
          exclude: /(node_modules|bower_components)/,
        }
      ]
    },
    resolve: {
      alias: {
        jquery: 'bower_components/jquery/dist/jquery.min.js',
        zeroPad: './src/Util/zeroPad.js'
      },
      extensions: ['', '.js'],
      root: [path.join(__dirname, 'src')]
    },
    externals: [
      {
        // jquery: {
        //   root: 'jQuery',
        //   commonjs2: 'jquery',
        //   commonjs: 'jquery',
        //   amd: 'jquery'
        // }
        jquery: true
      }
    ]
  }
