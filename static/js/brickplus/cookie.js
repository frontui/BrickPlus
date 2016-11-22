(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cookie"] = factory();
	else
		root["cookie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40);


/***/ },

/***/ 40:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * component cookie
	 * 
	 * https://github.com/component/cookie
	 */
	
	/**
	 * Module dependencies.
	 */
	
	//var debug = require('debug')('cookie');
	
	/**
	 * Set or get cookie `name` with `value` and `options` object.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Mixed}
	 * @api public
	 */
	
	module.exports = function (name, value, options) {
	  switch (arguments.length) {
	    case 3:
	    case 2:
	      return set(name, value, options);
	    case 1:
	      return get(name);
	    default:
	      return all();
	  }
	};
	
	/**
	 * Set cookie `name` to `value`.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @api private
	 */
	
	function set(name, value, options) {
	  options = options || {};
	  var str = encode(name) + '=' + encode(value);
	
	  if (null == value) options.maxage = -1;
	
	  if (options.maxage) {
	    options.expires = new Date(+new Date() + options.maxage);
	  }
	
	  if (options.path) str += '; path=' + options.path;
	  if (options.domain) str += '; domain=' + options.domain;
	  if (options.expires) str += '; expires=' + options.expires.toUTCString();
	  if (options.secure) str += '; secure';
	
	  document.cookie = str;
	}
	
	/**
	 * Return all cookies.
	 *
	 * @return {Object}
	 * @api private
	 */
	
	function all() {
	  var str;
	  try {
	    str = document.cookie;
	  } catch (err) {
	    if (typeof console !== 'undefined' && typeof console.error === 'function') {
	      console.error(err.stack || err);
	    }
	    return {};
	  }
	  return parse(str);
	}
	
	/**
	 * Get cookie `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api private
	 */
	
	function get(name) {
	  return all()[name];
	}
	
	/**
	 * Parse cookie `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parse(str) {
	  var obj = {};
	  var pairs = str.split(/ *; */);
	  var pair;
	  if ('' == pairs[0]) return obj;
	  for (var i = 0; i < pairs.length; ++i) {
	    pair = pairs[i].split('=');
	    obj[decode(pair[0])] = decode(pair[1]);
	  }
	  return obj;
	}
	
	/**
	 * Encode.
	 */
	
	function encode(value) {
	  try {
	    return encodeURIComponent(value);
	  } catch (e) {
	    // debug('error `encode(%o)` - %o', value, e)
	  }
	}
	
	/**
	 * Decode.
	 */
	
	function decode(value) {
	  try {
	    return decodeURIComponent(value);
	  } catch (e) {
	    // debug('error `decode(%o)` - %o', value, e)
	  }
	}

/***/ }

/******/ })
});
;
//# sourceMappingURL=cookie.js.map