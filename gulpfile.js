/**
 *! frontman 手脚架
 * v0.1.0
 * (c) frontui team
 */

var config = require('./config.json')
var pkg    = require('./package.json')
var svn    = require('./svn.json')
var gulp   = require('gulp')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()
var Lib = require('./lib')

// 服务启动根目录
var serverRoot = __dirname

/*-------------
*  默认任务
-------------*/
var task = require('./task/defaultTask');
task(serverRoot);


/*-------------
*  svn任务
-------------*/
var svnTask = require('./task/svnTask');
svnTask(Lib.banner);
