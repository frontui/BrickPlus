/**
 * 判断是否支持css transition
 * by tommyshao
 * 2016-07-19
 *
 * Reference bootstrap.transition.js
 * http://getbootstrap.com/javascript/#transitions
 *
 * API:
 * ------
 * $.support.transition
 * $(element).one('uiTransitionEnd', fn).emulateTransitionEnd(duration)
 */

var $ = require('jquery')

// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// --------------------------------------------

function transitionEnd() {
    var el = document.createElement('ui')

    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    }

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return {end: transEndEventNames[name]}
        }
    }

    return false // explicit for ie8 (  ._.)
}

// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('uiTransitionEnd', function () {
        called = true
    })
    var callback = function () {
        if (!called) $($el).trigger($.support.transition.end)
    }
    setTimeout(callback, duration)
    return this
}

$(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.uiTransitionEnd = {
        bindType: $.support.transition.end,
        delegateType: $.support.transition.end,
        handle: function (e) {
            if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
    }
})
