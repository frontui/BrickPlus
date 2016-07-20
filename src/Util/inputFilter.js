/**
 * 输入控制
 * by tommyshao
 * 2016-07-06
 */

var filters = {
  'space': [32],
  'number': [],
  'word': [],
  'controls': []
}

function inputFilter(e, option) {
  var keyCode = e.keyCode
  var allows = [], disAllows = [], i, l, onlys, ds;
  // 不允许输入
  if(option && option['disabled']) {
    ds = option.disabled
    for(i = 0, l = ds.length; i < l; i++) {
      if(filters[ds[i]]) disAllows = disAllows.concat(ds[i])
    }

    // 不允许输入
    if(disAllows.indexOf(keyCode) > -1) {
      e.preventDefault()
      return false;
    }
  }

  // 允许输入
  if(option && option['only']) {
    onlys = option.only
    for(i = 0, l = onlys.length; i < l; i++) {
      if(filters[onlys[i]]) allows = allows.concat(onlys[i])
    }

    // 只允许输入
    if(allows.indexOf(keyCode) == -1) {
      e.preventDefault()
      return false;
    }
  }
}

module.exports = inputFilter
