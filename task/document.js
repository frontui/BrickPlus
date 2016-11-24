/*
* 生成 gitpage 页面
* 更新document目录到gh-pages 分支
* 发布文档: gulp deploy
*/

var gulp = require('gulp')
var del = require('del')

var config = require('../config.json')
var pkg    = require('../package.json')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()
var ghPages    = require('gulp-gh-pages')
var errHandler = $.notify.onError('错误: <%= error.message %>')

var dest = path.join(__dirname, '../', 'document');
var staticPath = path.join(__dirname, '../', config.staticPath)

function docTask(banner) {

  gulp.task('clean', function(next) {
    del([dest], next)
  })

  gulp.task('doc:template', ['template'], function() {
    return gulp.src(config.destPath+'/BrickPlus_page/**/**.html')
                .pipe($.prettify({indent_size: 2}))
                .pipe($.replace(/\/static/g, './static'))
                .pipe($.replace(/\/bower_components\/frontui\/js\//g, './static/js/'))
                .pipe($.replace(/"(\/)bower_components\/(.*)\/([a-zA-Z0-9.]+\.js)(.*)"/g, '"'+ config.staticPath +'/js/$3$4"'))
                .pipe(gulp.dest(dest))
  })

  gulp.task('doc:home', ['doc:template'], function() {
      return gulp.src(dest+'/BP-Start-Install.html')
                  .pipe($.rename('index.html'))
                  .pipe(gulp.dest(dest))
  })

  gulp.task('doc:copy', function() {
    //return gulp.src([staticPath+'/iconfont/**/**', staticPath+'/iconfont-ie7/**/**', staticPath+'/images/**/**', staticPath+'/js/*.js', staticPath+'/images/**/**', staticPath+'/js/perfect-scrollbar/**/**'], { base: '.'})
    return gulp.src([staticPath+'/{fonts,ie7}/**/**', staticPath+'/images/**/**', staticPath+'/js/*.js', staticPath+'/images/**/**', staticPath+'/js/perfect-scrollbar/**/**'], { base: '.'})
            .pipe(gulp.dest(dest))
  })

  gulp.task('doc:brickplus', function() {
    return gulp.src([staticPath+'/js/brickplus/**/*.js', '!'+ staticPath+'/js/brickplus/**/*.js.map',])
                .pipe($.plumber( { errorHandler: errHandler } ))
                .pipe($.uglify())
                .pipe($.header(banner, { pkg: pkg}))
                .pipe(gulp.dest(dest+'/static/js/brickplus'))
  })

  gulp.task('doc:styles', function() {
    return gulp.src([staticPath+'/css/**/**.css'])
                .pipe($.cleanCss({compatibility: 'ie7'}))
                .pipe($.header(banner, { pkg: pkg}))
                .pipe(gulp.dest(dest+'/static/css'))
  })

  gulp.task('doc:copyBower', function() {
    return gulp.src(config.bower_source)
            .pipe(gulp.dest(dest+'/static/js'))
  })

  gulp.task('document', function(cb) {
    $.sequence('clean', ['doc:home', 'doc:copy', 'doc:styles', 'doc:copyBower', 'doc:brickplus'])(cb)
  })

  // gulp.task('gh-pages', ['document'], function() {
  //   git.exec({ args: 'subtree push --prefix document origin gh-pages' });
  // })
  gulp.task('deploy',['document'], function() {
    return gulp.src([dest+'/**/*'])
            .pipe(ghPages())
  })
}

module.exports = docTask;
