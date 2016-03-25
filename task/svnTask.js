/**
 * 生成环境，更新到SVN
 *
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

var Lib    = require('../lib')

module.exports = function svn(banner) {
  // 模板
  gulp.task('svnTemplate', function(){
      return gulp.src(['./'+ config.destPath + '/**/**.html'])
              //.pipe($.changed(svn.path))
              .pipe($.replace(/\/static/g, './static'))
              .pipe($.replace(/"(\/)bower_components\/(.*)\/([a-zA-Z0-9.]+\.js)(.*)"/g, '"'+ config.staticPath +'/js/$3$4"'))
              .pipe(gulp.dest(svn.path))
  });

  // 拷贝
  gulp.task('svnCopy', function(){
      return gulp.src([config.staticPath + '/iconfont/**/**', config.staticPath + '/iconfont-ie7/**/**'], {base: 'client'})
          .pipe($.changed(svn.staticPath))
          .pipe(gulp.dest(svn.staticPath))
  })

  // css
  gulp.task('svnCss', function(){
      return gulp.src([config.staticPath+'/css/**/**.css'], {base: 'client'})
          .pipe($.plumber( { errorHandler: Lib.errHandler } ))
          .pipe($.changed(svn.staticPath))
          .pipe($.minifyCss({compatibility: 'ie7'}))
          .pipe($.header(banner, { pkg: pkg}))
          .pipe(gulp.dest(svn.staticPath))
  })

  // js
  gulp.task('svnJs', function(){
      return gulp.src([config.staticPath+'/js/**/**.js'], {base: 'client'})
          .pipe($.plumber( { errorHandler: Lib.errHandler } ))
          .pipe($.changed(svn.staticPath))
          .pipe($.uglify({mangle: false}))
          .pipe($.header(banner, { pkg: pkg}))
          .pipe(gulp.dest(svn.staticPath))
  })

  gulp.task('svnBowerJs', function(){
      return gulp.src(config.jsPath)
              .pipe($.changed(svn.staticPath))
              .pipe(gulp.dest(svn.staticPath+'/js'))
  })

  // images
  gulp.task('svnImage', function(){
      return gulp.src([config.staticPath+'/images/**/**', '!'+config.staticPath+'/images/sprite/sprite-**/', '!'+config.staticPath+'/images/sprite/sprite-**/**/**'])
          .pipe($.plumber( { errorHandler: Lib.errrHandler } ))
          .pipe($.changed(svn.staticPath))
          .pipe($.imagemin({
                      optimizationLevel: 5,
                      progressive: true,
                      svgoPlugins: [{removeViewBox: false}]//,
                      //use: [pngquant()]
                  })
          )
          .pipe(gulp.dest(svn.staticPath+'/images'))
  })

  gulp.task('svnServer', ['svnTemplate', 'svnCopy', 'svnCss', 'svnJs', 'svnImage', 'svnBowerJs'], function(){
      connect.server({
          root: svn.path,
          port: svn.port
      });

      console.log('server start at: http://localhost:' + svn.port + '/')

      Lib.openURL('http://localhost:' + svn.port + '/')
  })

  gulp.task('svn', function(){
      gulp.start(['svnServer']);
  });
}
