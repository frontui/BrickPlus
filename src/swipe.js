/**
 * jQuery.event.swipe
 * 
 * fork https://github.com/stephband/jquery.event.swipe
 */

import $ from 'jquery'

const add = $.event.add,
      remove = $.event.remove,
      trigger = function(node, type, data) {
          $.event.trigger(type, data, node)
      },
      settings = {
          threshold: 0.4,
          sensitivity: 6
      } 

function moveend(e) {
    let w, h ,event 

    w = e.currentTarget.offsetWidth
    h = e.currentTarget.offsetHeight

    event = {
        distX: e.distX,
        distY: e.distY,
        velocitX: e.velocitX,
        velocitY: e.velocitY,
        finger: e.finger
    }

    if (e.distX > e.distY) {
        if (e.distX > -e.distY) {
            if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
                event.type = 'swiperight';
                trigger(e.currentTarget, event);
            }
        }
        else {
            if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
                event.type = 'swipeup';
                trigger(e.currentTarget, event);
            }
        }
    }
    else {
        if (e.distX > -e.distY) {
            if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
                event.type = 'swipedown';
                trigger(e.currentTarget, event);
            }
        }
        else {
            if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
                event.type = 'swipeleft';
                trigger(e.currentTarget, event);
            }
        }
    }
}

function getData(node) {
    let data = $.data(node, 'event_swipe')

    if(!data) {
        data = { count: 0}
        $.data(node, 'event_swipe', data)
    }

    return data
}

$.event.special.swipe = 
$.event.special.swipeleft = 
$.event.special.swiperight = 
$.event.special.swipeup =
$.event.special.swipedown = {
    setup: function(data, namespaces, eventHandle) {
        data = getData(this)

        if(data.count++ > 0) return;

        add(this, 'moveend', moveend)
        return true 
    },
    teardown: function() {
        let data = getData(this)

        if(--data.count > 0) return;

        remove(this, 'moveend', moveend)

        return true
    },
    settings: settings
}

export default $