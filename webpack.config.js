/**
 * bundle 使用webpack 打包
 * 配置文件
 * by tommyshao
 */

var NODE_ENV = process.env.NODE_ENV

module.exports = {
  watch: !(NODE_ENV === 'production'),
  output: {
    filename: 'brickplus.js',
    library: 'BrickPlus',
    libraryTarget: 'umd'
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
