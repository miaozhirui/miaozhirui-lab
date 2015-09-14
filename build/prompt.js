/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    var $ele = $('.box a');

	    var Prompt = function(ele, opt) {
	        this.ele = ele;
	        this.opt = opt;

	        this.init();

	        this.$ele.on('mouseover', $.proxy(this.showInfo, this))
	    }

	    Prompt.prototype = {
	        constructor : Prompt,
	        init: function() {
	            this.$ele = $(this.ele);
	        },
	        showInfo: function() {
	            this.createBox();
	        },
	        createBox: function() {
	            var Prompt = $('<div></div>');
	            
	            
	        }
	    }

	    $.extend($.fn, {
	        prompt: function(opt) {
	            var defautl = {

	            };
	            var opt = $.extend(defautl, opt);

	            this.each(function() {
	                new Prompt(this, opt)
	            })
	        }
	    })


	    $('a').prompt()
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ]);