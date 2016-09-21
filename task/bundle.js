/**
 * 发布打包
 * 抽离 bricks 框架 css,js,images,iconfont
 */
var gulp = require('gulp')
var del = require('del')

var config = require('../config.json')
var pkg    = require('../package.json')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()


var dest = path.join(__dirname, '../', 'dist')
var staticPath = path.join(__dirname, '../', config.staticPath)

function bundle(banner) {
  gulp.task('bundle:clean', function(cb) {
    del([dest], cb)
  })

  // 样式
  gulp.task('bundle:styles', function() {
    return gulp.src([staticPath+'/css/main.css'])
                .pipe($.header(banner, { pkg: pkg}))
                .pipe($.rename('brickplus.css'))
                //.pipe(gulp.dest(dest+'/css'))
                .pipe($.cleanCss({compatibility: 'ie7'}))
                .pipe($.header(banner, { pkg: pkg}))
                //.pipe($.rename('brickplus.min.css'))
                .pipe(gulp.dest(dest+'/css'))
                .pipe($.size({showFiles: true, title: 'minified'}))
                .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}))
  })

  // 复制文件
   gulp.task('bundle:copy', function() {
    return gulp.src([staticPath+'/{fonts,ie7,images}/**/**'])
            .pipe(gulp.dest(dest))
   })

  // 生成bricks.js
  gulp.task('bundle:js', function() {
    return gulp.src(staticPath+'/js/brickplus/**.js')
                .pipe($.replace('{{VERSION}}', pkg.version))
                .pipe($.header(banner, {pkg: pkg}))
                //.pipe(gulp.dest(dest+'/js'))
                .pipe($.uglify())
                .pipe($.header(banner, {pkg: pkg}))
                //.pipe($.rename({suffix: '.min'}))
                .pipe(gulp.dest(dest+'/js'))
                .pipe($.size({showFiles: true, title: 'minified'}))
                .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}))
  })

  // 打包
  gulp.task('bundle', function(cb) {
    $.sequence('bundle:clean', ['bundle:styles', 'bundle:copy', 'bundle:js'])(cb)
  })
}

module.exports = bundle
