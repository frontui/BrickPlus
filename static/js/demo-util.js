/**
 * util 页面 demo 示例代码
 */
;(function($) {

  //---------------
  // 全角半角转换
  $(document).on('keyup', '#demo-util-dbc-input', function() {
    var dbcOriginText = $('#origin-text')
    var thisVal = $(this).val()
    // 转换
    var filterVal = BrickPlus.Util.dbcToSbc(thisVal)
    // 显示原输入字符
    dbcOriginText.html(thisVal)
    $(this).val(filterVal)
  })

  //----------------
  //  金额简繁体转换
  var cnMoney = BrickPlus.Util.cnMoney,
      cnMoneyInput = $('#demo-util-cnmoney-input');
  var IntanceCnMoney = new cnMoney(cnMoneyInput, {target: '#cnmoney-trandition'});

  // 异步加载内容绑定转换功能
  var IntanceCnMoney, cnMoneyInited = false;
  $(document).on('keyup', '#demo-util-cnmoney-input', function() {
    if(cnMoneyInited) return;
    IntanceCnMoney = new cnMoney(this, {target: '#cnmoney-trandition'});
    cnMoneyInited = true;
  })

  //-------------
  // 判断浏览器版本
  var detectBrowser = BrickPlus.Util.browser;
  $(document).on('click', '[data-method]', function(e) {
    e.preventDefault();
    var method = $(this).data('method');
    alert(detectBrowser[method])
  })

  // ----------
  //  倒计时
  var clockTick = BrickPlus.Util.clockTick;
  $(document).on('click', '#clock-tick-start-btn', function() {
    var that = $(this), target = new Date().getTime() +  60 * 1000;
    that.prop('disabled', true)
    clockTick(target, function(d, h, m, s) {
      if(d === -1) {
        //alert('抱歉爆米花手机已被抢光！');
        that.prop('disabled', false);
        $('#clock').html('点击按钮重新下一轮排队');
      } else {
        $('#clock').html(d+'天'+ h + '小时' + m + '分'+ s + '秒');
      }
    })
  })

  // -----------
  // 文本框插入文字
  var insertTextAtCaret = BrickPlus.Util.insertTextAtCaret;
  $(document).on('click', '[data-text]', function() {
    var elem = $('#insert-textarea')[0];
    var text = $(this).data('text');
    insertTextAtCaret(elem, text)
  })

  // -----------
  // 金额格式化
  var fnCurrency = BrickPlus.Util.currency;
  $(document).on('keyup', '#demo-currency-input', function() {
    var number = $(this).val();
    var $target = $('#demo-currency-target');

    $target.html(fnCurrency(number))

  })

})(jQuery);
