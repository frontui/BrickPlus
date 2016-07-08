/**
 * 文本框当前光标插入文字
 * by tommyshao
 * 2016-07-06
 */

function insertTextAtCaret(elem, text) {
  var sel, startPos, endPos, scrollTop

  if (!!elem) {
    if (document.selection) {
      elem.focus()
      sel = document.selection.createRange()
      sel.text = text
      elem.focus()
    } else if(typeof (elem.selectionStart) === 'number') {
      startPos = elem.selectionStart
      endPos = elem.selectionEnd
      scrollTop = elem.scrollTop

      elem.value = elem.value.substring(0, startPos) + text + elem.value.substring(endPos, elem.value.length)
      elem.focus()
      elem.selectionStart = startPos + text.length
      elem.selectionEnd = startPos + text.length
      elem.scrollTop = scrollTop
    } else {
      elem.value += text
      elem.focus()
    }
  }
}

module.exports = insertTextAtCaret
