/**
 * 输入控制
 * by tommyshao
 * 2016-07-06
 *
 * fork: https://github.com/maxkoshel/input-char-filter
 */

// 全局绑定标识
var toggle = '[data-toggle="filter"]'

/**
 * 输入过滤处理函数
 * @param  {RegExp}   regexp   正则
 * @param  {Function} callback 回调处理
 * @return {Boolean}  验证结果
 */
function inputFilter(regexp, callback) {
  return function(event) {
    var chr;
    var e = event || window.event;

    if(e.ctrlKey || e.altKey || e.metaKey) return;

    chr = getChar(e);

    if(chr === null) return;

    if(!regexp.test(chr)) return false;

    typeof(callback) === 'function' && callback.call(chr)
  }

  function getChar(event) {
    if(event.which === null) {
      if(event.keyCode < 32) {
        return null;
      }

      return String.fromCharCode(event.keyCode)
    }

    if(event.which !== 0 && event.charCode !== 0) {
      if(event.which < 32) return null;

      return String.fromCharCode(event.which);
    }

    return null;
  }
}


/**
 * 正则对象集合
 * @type {Object}
 */
var patterns = {
  number: /^[0-9]+$/,  // 纯数字
  integer: /^\-?[0-9]+$/, //整数
  decimal: /^\-?[0-9]*\.?[0-9]+$/, //数字
  natural: /^[1-9][0-9]*$/i, // 自然数，不能0开头
  letter: /[a-zA-z]/,  // 纯英文
  email: /[a-z0-9_\.\-@]/i, // 邮箱
  hex: /[0-9a-f]/i,  // 十六进制
  alpha: /^[a-z]+$/i, // 字母下划线
  alphaNum: /[a-z0-9_]/i, // 字母数字下划线
  name: /[a-zA-Z0-9_\-]/,  // 用户名
  phone: /\d{3,4}-\d{5,}/, // 电话 020(0668)-5201314
  mobile: /^1[3-9]\d{9}/,   // 手机号码 1[3-9]xxxxxxxxx
  ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i, // ip地址
  base64: /[^a-zA-Z0-9\/\+=]/i,
  url: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  date: /\d{4}-\d{1,2}-\d{1,2}/, // 日期
  chinese: /^[\u4e00-\u9fa5]+$/, // 纯中文
  nickName: /^[\u4e00-\u9fa50-9a-zA-Z_\-]+$/  // 中文昵称
}

/**
 * 获取正则对象
 * @param  {Object} el 输入框
 * @return RegExp 正则表达式
 */
function getPattern (el) {
  var pattern = el.getAttribute('pattern');

  if(!pattern) return null;
  var p = patterns[pattern];

  if(!p) { // pattern 优先级最高
    p = new RegExp(pattern);
  }

  return p;
}

/**
 * 按键按下处理函数
 * @param  {Event} event keypress事件对象
 * @return {Boolean}  true - 通过, false
 */
function handleKeyPressEvent(event) {
  var pattern = getPattern(event.target);

  return pattern && inputFilter(pattern)(event);
}

/**
 * keyup 事件处理
 * @param  {Event} event keypress事件对象
 * @return {Boolean}  true - 通过, false
 */
function handleKeyAfterEvent(event) {
  var pattern = getPattern(event.target);

  if(pattern === null) return;
  var $this = $(this), defaultVal = $this.val(), matched = false;
  setTimeout(function(){
    $this.val(function() {
      var res = defaultVal.replace(pattern, function(match, index, str) {
        matched = true;
        return match
      })
      return matched ? res : '';
    })
  }, 1);
}


// ----------
// jQuery 全局绑定
$(function() {
  $(document).on('keypress', toggle, handleKeyPressEvent)
  $(document).on('paste change propertychange', toggle, handleKeyAfterEvent)
})

module.exports = {
  filter: inputFilter,
  keyPress: handleKeyPressEvent,
  keyAfter: handleKeyAfterEvent
}
