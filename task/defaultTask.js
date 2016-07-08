/*!
*  默认任务
*/
var gulp = require('gulp');
var config = require('../config.json')
var pkg    = require('../package.json')
// var svn    = require('../svn.json')
// var gulp   = require('gulp')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()
var connect = $.connect

var Lib        = require('../lib')
// var errHandler = Lib.errHandler
var errHandler = $.notify.onError('错误: <%= error.message %>')
var template   = Lib.template(config.template);

// var pngquant = require('imagemin-pngquant')
var spritesmith = require('gulp.spritesmith')
var merge = require('merge-stream')

// webpack
var webpackConfig = require('../webpack.config.js')
var webpack = require('webpack')

var clean = require('del')

module.exports = function defaultTask(serverRoot) {

  // 模板
  gulp.task('template', function(){
  	return gulp.src([config.template + '/**/**.html', '!'+ config.template + '/**/_**.html', '!'+ config.template +'/_**/*.html'])
                  .pipe($.plumber( { errorHandler: errHandler } ))
          				.pipe(template(config))
                  .pipe($.prettify({indent_size: 2}))
          				.pipe(gulp.dest(config.destPath))
                  .pipe(connect.reload())
  });

  // less
  gulp.task('less', function(){
      return gulp.src([config.staticPath+'/less/**/**.less', '!'+ config.staticPath +'/_**/**', '!'+ config.staticPath + '/**/_*.less', '!'+ config.staticPath + '/less/BrickPlus-Mixin/**/**.less'])
                  .pipe($.sourcemaps.init())
                  .pipe($.less())
                  .pipe($.autoprefixer())
                  .pipe($.sourcemaps.write('./maps'))
                  .pipe(gulp.dest(config.staticPath+'/css'))
                  .pipe($.plumber( { errorHandler: errHandler } ))
                  .pipe(connect.reload())
  })

  // brickplus.js
  gulp.task('scripts', function(callback) {
    //console.log(webpackConfig('./src'));
    // return gulp.src(['./src/**/*.js'])
    //             .pipe(webpack(webpackConfig('./src')))
    //             .pipe(gulp.dest(config.staticPath+'/js/brickplus'))
    $.util.log('webpack编译-->')
    var config = webpackConfig('./src', './static/js/brickplus');
    var init = false;
    webpack(
      config,
      function(err, stats) {
        // err && console.log(err) && console.log(stats)
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        !init && callback()
        init = !0;
      }
    )

    //callback()
  })

  // 多文件entry时，通过require方式会报错
  gulp.task('scripts:brickplus', function(callback) {
    var config = webpackConfig({brickplus: './src/brickplus.js'}, './static/js/brickplus');
    var init = false;
    $.util.log('webpack编译-->')
    webpack(
      config,
      function(err, stats) {
        //err && console.log(err)
        //console.log(stats)
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        !init && callback()
        init = !0;
      }
    )
  })

  // sprite

  gulp.task('merge-sprite', function(){
      var thisPath = config.staticPath+'/images/sprite'
      var folders = Lib.getFolders(thisPath)
      var tasks = folders.map(function(folder) {
          var spriteData = gulp.src(path.join(thisPath, folder, '/*.*'))
                          .pipe($.changed(config.staticPath+'/images/sprite'))
                          .pipe($.newer(config.staticPath+'/images/sprite'))
                          .pipe(spritesmith({
                              imgPath: '../images/sprite/'+ folder +'.png?v='+config.version,
                              imgName: folder+'.png',
                              cssName: '_'+ folder +'.css'
                              ,padding: config.sprite_padding
                            }))
          var imgPipe = spriteData.img.pipe(gulp.dest(config.staticPath+'/images/sprite'))
          var cssPipe = spriteData.css
                                      .pipe($.rename({ extname: '.less'}))
                                      .pipe(gulp.dest(config.staticPath+'/less/sprite-less'))

          return merge(imgPipe, cssPipe);
      })


      return merge(tasks)
  });

  gulp.task('sprite', ['merge-sprite'], function(next){
      var lessFile = [];
      fs.readdirSync(config.staticPath+'/less/sprite-less')
          .map(function(file) {
              /\.less$/.test(file) && lessFile.push('@import "sprite-less/'+ file +'";')
          })

      return gulp.src(config.staticPath+'/less/_sprite_all.less')
          .pipe($.changed(config.staticPath+'/less'))
          .pipe($.replace(/.*/g, lessFile.join('\n')))
          .pipe(gulp.dest(config.staticPath+'/less'))

  })

  // 启动服务
  gulp.task('server', function(){
      connect.server({
          root: serverRoot,
          port: config.port,
          livereload: true
      });

      console.log('server start at: http://localhost:' + config.port + '/'+ config.destPath)

      Lib.openURL('http://localhost:' + config.port + '/' + config.destPath)
  })

  //-- 文件监听

  gulp.task('watch', function(){
      gulp.watch(config.template + '/**/**.html', ['template'])
      gulp.watch('./src/**/**.js', ['scripts'])
      gulp.watch(config.staticPath + '/less/**/**', ['less'])
      //gulp.watch(config.staticPath + '/images/sprite/sprite-*/**/**', ['sprite'])
  })

  //-- 首次下载
  gulp.task('cleanMixin', function(cb) {
    clean(['./static/less/BrickPlus-Mixin'], cb)
  })
  gulp.task('mixin', ['cleanMixin'], function(cb) {
    $.git.clone('https://github.com/frontui/BrickPlus-Mixin.git', {args: './static/less/BrickPlus-Mixin'}, cb)
  })

  // //-- 更新less Mixin
  // gulp.task('updateMixin', function() {
  //   return gulp.src('./static/less/BrickPlus-Mixin')
  //             .pipe($.run('git pull origin master'))
  // })


  /**
   * 默认任务
   * template, less, watch
   */
  gulp.task('default:update', function(cb) {
    $.sequence('mixin', ['template', 'less'], 'server', 'watch')(cb)
  })

  // 分离出开发组件任务，减轻服务负担
  gulp.task('components', function(cb) {
    $.sequence(['template', 'less', 'scripts'], 'server', 'watch')(cb)
  })

  gulp.task('default', function(cb){
    $.sequence(['template', 'less'], 'server', 'watch')(cb)
    //gulp.start(['template', 'less', 'server', 'watch'])
  })
}
