/*!
*  默认任务
*/
var gulp = require('gulp');
var config = require('../config.json')
var pkg    = require('../package.json')
var svn    = require('../svn.json')
var gulp   = require('gulp')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()
var connect = $.connect

var Lib        = require('../lib')
var errHandler = Lib.errHandler
var template   = Lib.template(config.template);

var pngquant = require('imagemin-pngquant')
var spritesmith = require('gulp.spritesmith')
var merge = require('merge-stream')


module.exports = function defaultTask(serverRoot) {

  // 模板
  gulp.task('template', function(){
  	return gulp.src([config.template + '/**/**.html', '!'+ config.template + '/**/_**.html', '!'+ config.template +'/_**/*.html'])
                  .pipe($.plumber( { errorHandler: errHandler } ))
          				.pipe(template(config))
          				.pipe(gulp.dest(config.destPath))
                  .pipe(connect.reload())
  });

  // less
  gulp.task('less', function(){
      return gulp.src([config.staticPath+'/less/**/**.less', '!'+ config.staticPath +'/_**/**', '!'+ config.staticPath + '/**/_*.less'])
                  .pipe($.plumber( { errorHandler: errHandler } ))
                  .pipe($.less())
                  .pipe($.autoprefixer())
                  .pipe(gulp.dest(config.staticPath+'/css'))
                  .pipe(connect.reload())
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
      gulp.watch(config.staticPath + '/less/**/**', ['less'])
      gulp.watch(config.staticPath + '/images/sprite/sprite-*/**/**', ['sprite'])
  })


  /**
   * 默认任务
   * template, less, watch
   */
  gulp.task('default', function(){
      gulp.start(['template', 'less', 'server', 'watch'])
  })
}
