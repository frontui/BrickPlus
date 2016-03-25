/*!
 * slider 图片轮播
 * tommyshao <jinhong.shao@frontpay.cn>
 * REFFRENCE: http://unslider.com
 * API:
 *      $(element).slider();
 */

;(function (root, factory) {

	if (typeof define === 'function' && define.amd) {
		define('ui/slider', ['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}

}(this, function ($, f) {

	'use strict';

	var toggle = '[data-toggle="slider"]';
	//  If there's no jQuery, Unslider can't work, so kill the operation.
	if(!$) return f;

	var Unslider = function() {
		//  Set up our elements
		this.el = f;
		this.items = f;

		//  Dimensions
		this.sizes = [];
		this.max = [0,0];

		//  Current inded
		this.current = 0;

		//  Start/stop timer
		this.interval = f;

		//  Set some options
		this.opts = {
			speed: 500,
			delay: f, // 3000, f for no autoplay
			complete: f, // when a slide's finished
			keys: f, // keyboard shortcuts - disable if it breaks things
			dots: f, // display 鈥⑩€⑩€⑩€鈥� pagination
			fluid: !f, // is it a percentage width?,
			prev: f,
			next: f,
			arrows: f
		};

		//  Create a deep clone for methods where context changes
		var _ = this;

		this.init = function(el, opts) {
			this.el = el;
			this.ul = el.children('ul');
			this.max = [(el.outerWidth() || el.parent().outerWidth()), (el.outerHeight() || el.parent().outerHeight())];
			this.items = this.ul.children('li').each(this.calculate);

			//  Check whether we're passing any options in to Unslider
			this.opts = $.extend(this.opts, opts);

			//  Set up the Unslider
			this.setup();

			return this;
		};

		//  Get the width for an element
		//  Pass a jQuery element as the context with .call(), and the index as a parameter: Unslider.calculate.call($('li:first'), 0)
		this.calculate = function(index) {
			var me = $(this),
					width = me.outerWidth(), height = me.outerHeight();

			//  Add it to the sizes list
			_.sizes[index] = [width, height];
			//  Set the max values
			if(width > _.max[0]) _.max[0] = width;
			if(height > _.max[1]) _.max[1] = height;
		};

		//  Work out what methods need calling
		this.setup = function() {
			var initEvent = $.Event('init.ui.slider', {relatedTarget: this.el });
			//  Set the main element
			this.el.css({
				overflow: 'hidden',
				width: _.max[0],
				height: this.items.first().outerHeight()
			});

			// console.log(_.max[0]);

			//  Set the relative widths
			this.ul.css({width: (this.items.length * 100) + '%', position: 'relative'});
			this.items.css('width', (100 / this.items.length) + '%');

			if(this.opts.delay !== f) {
				this.start();
				this.el.hover(this.stop, this.start);
			}

			//  Custom keyboard support
			this.opts.keys && $(document).keydown(this.keys);

			//  Dot pagination
			this.opts.dots && this.dots();

			//  Little patch for fluid-width sliders. Screw those guys.
			if(this.opts.fluid) {
				var resize = function() {
					_.el.css('width', Math.min(Math.round((_.el.width() / _.el.parent().width()) * 100), 100) + '%');
				};

				resize();
				$(window).off('resize.ui.slider').on('resize.ui.slider', resize);
			}

			if(this.opts.arrows) {
				this.el.parent().append('<p class="arrows"><span class="prev">'+ (this.opts.prevText || 'prev') +'</span><span class="next">'+ (this.opts.nextText || 'next') +'</span></p>')
						.find('.arrows span').off('click').on('click', function() {
					$.isFunction(_[this.className]) && _[this.className]();
				});
			};

			if(this.opts.prev) $(this.opts.prev).off('click').on('click', $.proxy(this.prev, this));
			if(this.opts.next) $(this.opts.next).off('click').on('click', $.proxy(this.next, this));

			//  Swipe support
			if($.event.swipe) {
				this.el.off('swipeleft').on('swipeleft', _.prev).off('swiperight').on('swiperight', _.next);
			}

			this.el.trigger(initEvent)
		};

		//  Move Unslider to a slide index
		this.move = function(index, cb) {
			//  If it's out of bounds, go to the first slide
			if(!this.items.eq(index).length) index = 0;
			if(index < 0) index = (this.items.length - 1);

			var target = this.items.eq(index);
			var obj = {height: target.outerHeight()};
			var speed = cb ? 5 : this.opts.speed;

			var moveEvent = $.Event('move.ui.slider', { relatedTarget: target, curIndex: index });

			if(!this.ul.is(':animated')) {
				//  Handle those pesky dots
				_.el.find('.dot:eq(' + index + ')').addClass('active').siblings().removeClass('active');

				this.el.animate(obj, speed).trigger(moveEvent) && this.ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, function(data) {
					_.current = index;
					$.isFunction(_.opts.complete) && !cb && _.opts.complete(_.el);
				});
			}
		};

		//  Autoplay functionality
		this.start = function() {
			_.interval = setInterval(function() {
				_.move(_.current + 1);
			}, _.opts.delay);
		};

		//  Stop autoplay
		this.stop = function() {
			_.interval = clearInterval(_.interval);
			return _;
		};

		//  Keypresses
		this.keys = function(e) {
			var key = e.which;
			var map = {
				//  Prev/next
				37: _.prev,
				39: _.next,

				//  Esc
				27: _.stop
			};

			if($.isFunction(map[key])) {
				map[key]();
			}
		};

		//  Arrow navigation
		this.next = function(e) { e && e.preventDefault(); return _.stop().move(_.current + 1) };
		this.prev = function(e) {  e && e.preventDefault(); return _.stop().move(_.current - 1) };

		this.dots = function() {
			//  Create the HTML
			var html = '<ol class="dots">';
			$.each(this.items, function(index) { html += '<li class="dot' + (index < 1 ? ' active' : '') + '">' + (index + 1) + '</li>'; });
			html += '</ol>';

			//  Add it to the Unslider
			this.el.addClass('has-dots').append(html).find('.dot').off('click').on('click', function() {
				_.move($(this).index());
			});
		};
	};

	// 插件定义
	//======================
	function Plugin(o, s) {
		var len = this.length;

		//  Enable multiple-slider support
		return this.each(function(index) {
			//  Cache a copy of $(this), so it
			var me = $(this);
			var config = me.data();
			var instance = me.data('ui.slider');

			if(!instance) {
				o = $.extend({}, o, config);
				instance = (new Unslider).init(me, o);
				//  Invoke an Unslider instance
				me.data('ui.slider', instance);
			}
			s = $.extend({}, s, config);
			if(typeof o === 'string') instance[o] && instance[o](me, s);
		});
	}


	// jQuery 插件扩展
	$.fn.slider = Plugin;
	$.fn.slider.Constructor = Unslider;

	// 元素插件绑定
	// ====================
	$(function(){ $(toggle).slider() });

	return Unslider;

}));
