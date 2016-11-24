/**
 * 全角字符转半角字符
 * by tommyshao
 * 2016-07-06
 */

var $ = require('jquery')
var toggle = '[data-toggle="dbc2sbc"]'

var hash = {'12288' : ' '};

//。．，；：？！……—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％
//.,;:?!…-~()[]{}<>''""123456789/\!@#$%
var chars = {
    dbc: '。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％',
    sbc: '..,;:?!-~()[]{}<>\'\'""1234567890/\@#$%'
};

// 全角转半角
function dbc2sbc(str) {
    var ret = [], i = 0, len = str.length, code, chr;
    for (; i < len; ++i) {
        code = str.charCodeAt(i);
        chr = hash[code];
        if (!chr && code > 65280 && code < 65375) {
            chr = hash[code] = String.fromCharCode(code - 65248);
        }
        ret[i] = chr ? chr : str.charAt(i);
    }
    return ret.join('').replace(/[。．，；：？！—～〔〕【】｛｝《》‘’“”１２３４５６７８９０／＼＠＃＄％]/g, sbc).replace('……', '…');
}

function sbc(match) {
    if(match) {
        var i = chars.dbc.indexOf(match);
        return chars.sbc.charAt(i) ? chars.sbc.charAt(i) : match;
    }
}

// 全局绑定插件
$(function() {
  $(document).on('keyup.util.dbc2sbc', toggle, function() {
    var thisVal = $.trim($(this).val())
    var filterVal = dbc2sbc(thisVal)
    $(this).val(filterVal)
  })
})

module.exports = dbc2sbc
