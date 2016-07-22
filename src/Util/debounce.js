var Util = {
  now: function() {
    var d = new Date();
    return d.now ? d.now() : d.getTime()
  },
  throttle: function(fn, wait, options) {
    var context, args, result;
    var timeout = null;

    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : Util.now();
      timeout = null;
      result = fn.apply(context, args);
      if(!timeout) context = args = null;
    };

    return function() {
      var now = Util.now();
      if(!previous && options.leading === false) previous = now;

      var remaining = wait - (now - previous);

      context = this;
      args = arguments;

      if(remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = fn.apply(context, args);
        if(!timeout) context = args = null;
      } else if(!timeout && options.trailling !== false) {
        timeout = setTimeout(later, remaining)
      }

      return result;
    }
  },
  debounce: function(fn, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = Util.now() - timestamp;

      if(last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null;

        if(!immediate) {
          result  = fn.apply(context, args)
          if(!timeout) context = args = null;
        }
      }
    }

    return function() {
      context = this;
      args = arguments;
      timestamp = Util.now();

      var callNow = immediate && !timeout;
      if(!timeout) timeout = setTimeout(later, wait);
      if(callNow) {
        result = fn.apply(context, args);
        context = args = null;
      }

      return result;
    }
  }
}

module.exports = {
  throttle: Util.throttle,
  debounce: Util.debounce
}
