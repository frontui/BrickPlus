(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["swipe"] = factory(require("jquery"));
	else
		root["swipe"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __webpack_require__(8);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var add = _jquery2.default.event.add,
	    remove = _jquery2.default.event.remove,
	    trigger = function trigger(node, type, data) {
	    _jquery2.default.event.trigger(type, data, node);
	},
	    settings = {
	    threshold: 0.4,
	    sensitivity: 6
	}; /**
	    * jQuery.event.swipe
	    * 
	    * fork https://github.com/stephband/jquery.event.swipe
	    */
	
	function moveend(e) {
	    var w = void 0,
	        h = void 0,
	        event = void 0;
	
	    w = e.currentTarget.offsetWidth;
	    h = e.currentTarget.offsetHeight;
	
	    event = {
	        distX: e.distX,
	        distY: e.distY,
	        velocitX: e.velocitX,
	        velocitY: e.velocitY,
	        finger: e.finger
	    };
	
	    if (e.distX > e.distY) {
	        if (e.distX > -e.distY) {
	            if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
	                event.type = 'swiperight';
	                trigger(e.currentTarget, event);
	            }
	        } else {
	            if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
	                event.type = 'swipeup';
	                trigger(e.currentTarget, event);
	            }
	        }
	    } else {
	        if (e.distX > -e.distY) {
	            if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
	                event.type = 'swipedown';
	                trigger(e.currentTarget, event);
	            }
	        } else {
	            if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
	                event.type = 'swipeleft';
	                trigger(e.currentTarget, event);
	            }
	        }
	    }
	}
	
	function getData(node) {
	    var data = _jquery2.default.data(node, 'event_swipe');
	
	    if (!data) {
	        data = { count: 0 };
	        _jquery2.default.data(node, 'event_swipe', data);
	    }
	
	    return data;
	}
	
	_jquery2.default.event.special.swipe = _jquery2.default.event.special.swipeleft = _jquery2.default.event.special.swiperight = _jquery2.default.event.special.swipeup = _jquery2.default.event.special.swipedown = {
	    setup: function setup(data, namespaces, eventHandle) {
	        data = getData(this);
	
	        if (data.count++ > 0) return;
	
	        add(this, 'moveend', moveend);
	        return true;
	    },
	    teardown: function teardown() {
	        var data = getData(this);
	
	        if (--data.count > 0) return;
	
	        remove(this, 'moveend', moveend);
	
	        return true;
	    },
	    settings: settings
	};
	
	exports.default = _jquery2.default;

/***/ }

/******/ })
});
;
//# sourceMappingURL=swipe.js.map