/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'fonticon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-people': '&#xe905;',
		'icon-phone': '&#xe906;',
		'icon-uniE912': '&#xe912;',
		'icon-cloud-upload': '&#xf0ee;',
		'icon-arrow-small-down': '&#xf0a0;',
		'icon-arrow-small-left': '&#xf0a1;',
		'icon-arrow-small-right': '&#xf071;',
		'icon-arrow-small-up': '&#xf09f;',
		'icon-triangle-down': '&#xf05b;',
		'icon-triangle-left': '&#xf044;',
		'icon-triangle-right': '&#xf05a;',
		'icon-triangle-up': '&#xf0aa;',
		'icon-loop2': '&#xe904;',
		'icon-attachment': '&#xe903;',
		'icon-folder-upload': '&#xe901;',
		'icon-box-remove': '&#xe902;',
		'icon-drawer2': '&#xe900;',
		'icon-browser': '&#xe607;',
		'icon-calendar': '&#xe608;',
		'icon-loop': '&#xe028;',
		'icon-error': '&#xe000;',
		'icon-error_outline': '&#xe001;',
		'icon-add': '&#xe069;',
		'icon-add_box': '&#xe06a;',
		'icon-add_circle': '&#xe06b;',
		'icon-add_circle_outline': '&#xe06c;',
		'icon-clear': '&#xe070;',
		'icon-remove': '&#xe07f;',
		'icon-remove_circle': '&#xe080;',
		'icon-remove_circle_outline': '&#xe081;',
		'icon-cancel': '&#xe205;',
		'icon-check_circle': '&#xe281;',
		'icon-done': '&#xe28a;',
		'icon-highlight_remove': '&#xe29c;',
		'icon-search': '&#xe2ca;',
		'icon-help': '&#xe604;',
		'icon-info': '&#xe605;',
		'icon-info-outline': '&#xe606;',
		'icon-chevron-thin-down': '&#xe600;',
		'icon-chevron-thin-left': '&#xe601;',
		'icon-chevron-thin-right': '&#xe602;',
		'icon-chevron-thin-up': '&#xe603;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
