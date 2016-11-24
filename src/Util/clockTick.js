/**
 * 倒计时
 * by tommyshao
 * 2016-07-06
 */

/**
 * 倒计时
 * @param {object} 小时dom元素
 * @param {object} 分钟dom元素
 * @param {object} 秒钟dom元素
 * @param {Number} 开始时间时间戳
 * @return {Object}
 */
function clockTick(target, callback) {
  if(!target) return void(0);
  var args = [].slice.call(arguments);
  var Handler = {
    init: function(ss) {
      //this.hours = h;
      //this.minutes = m;
      //this.seconds = s;
      this.target = ss;
      this.start = new Date();
      this.timer = null;

      this.tick();
      return this;
    },
    tick: function() {
      var self = this,
          //now = new Date(),
          endTime = self.target,
          diff =  endTime - self.start;

      function loop() {


        //console.log(diff)

        // function minus(n1, n2) {
        //   n1 = n1 - n2;
        //   return n1;
        // }

        // function minus2(n1, n2) {
        //   n1 -= n2;
        //   return n1;
        // }

        // console.log(minus(120000, 1000))
        // console.log(minus2(120000, 1000))



        if(diff <= 0) {
          typeof callback === 'function' && callback(-1);
          clearInterval(self.timer)
        } else {
          var days = Math.floor(diff / (24 * 60 * 60 * 1000)),
              h = Math.floor(diff / (60 * 60 * 1000)) - (days * 24),
              m = Math.floor(diff / (60 * 1000)) - (h * 60) - (days * 24 * 60),
              s = Math.ceil(diff / 1000) - (m * 60) - (h * 60 * 60) - (days * 24 * 60 * 60);

          // 更新时分秒
          typeof callback === 'function' && callback(days, h, m, s);
        }


        // 秒倒计时
        diff = diff - 1000;
      }
      // 立即执行
      loop()

      this.timer = setInterval(loop, 1000);
    },
    stop: function() {
      clearInterval(this.timer);
    }
  };

  return Handler.init.apply(Handler, args);
}

module.exports = clockTick
