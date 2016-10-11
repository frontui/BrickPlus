# BrickPlus

## 简介

BrickPlus 是部分基于 Bootstarp 框架的FrontUI团队的项目UI

## 快速开始

    gulp

或者

    npm run dev

### 任务列表

* `gulp default:update` 带更新 BrickPlus-Mixin 样式参数和工具函数

* `npm run cp` js组件开发任务，通过 webpack 将 ES6编译，js组件文件放在 src 目录，编译后的目录为 static/js

* `gulp or npm start `默认 UI 任务

## 更新文档

    gulp deploy

或者

    npm run deploy

## 发布前打上更新版本的标签

* `package.json` 修改版本号

* `bower.json`   修改成和 package.json 一样的版本号

* 将要发布的那个git分支或者提交打上和 package.json 一样的版本号标签

## 发布

    npm run bundle


## 发布到 npm

    npm publish

## bower register

    bower 注册

## contributors

- [@tommyshao](https://github.com/tomieric)
- [@rayalienkiss](https://github.com/rayalienkiss)
- [@limitLam](https://github.com/limitLam)
- [@17881055](https://github.com/17881055)
