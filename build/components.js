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

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
	    __webpack_require__(1);
	    // require('miao')
	    __webpack_require__(13);

	    ko.components.register('my-component', {
	        viewModel: function(params) {
	            function View(item) {
	                this.name = ko.observable(item.name);
	                this.age = ko.observable(item.age);
	                this.hight = ko.observable(item.hight);
	            }

	            this.data = _.map(params, function(item) {
	                return new View(item);
	            })
	        },
	        template: '<div data-bind="foreach: data">\
	                            <div>\
	                            <span data-bind="text: name"></span>\
	                            <span data-bind="style: {color: age() > 20 ? &quot;red &quot;: &quot blue &quot }">111</span>\
	                            <span data-bind="text: hight"></span>\
	                            </div>\
	                         </div>'
	    });

	    $.ajax('/js/ajax/components.json', {
	        dateType: 'json',
	        success: function(data) {
	            var string = JSON.stringify({component: data})
	            
	            $('#component').attr("data-bind", string);
	            ko.applyBindings()
	        },
	        error: function(XML){
	            console.log(XML)
	        }
	    })
	    // ko.applyBindings()
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * Knockout JavaScript library v3.2.0
	 * (c) Steven Sanderson - http://knockoutjs.com/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */

	(function(){
	var DEBUG=true;
	(function(undefined){
	    // (0, eval)('this') is a robust way of getting a reference to the global object
	    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
	    var window = this || (0, eval)('this'),
	        document = window['document'],
	        navigator = window['navigator'],
	        jQueryInstance = window["jQuery"],
	        JSON = window["JSON"];
	(function(factory) {
	    // Support three module loading scenarios
	    if (true) {
	        // [1] CommonJS/Node.js
	        var target = module['exports'] || exports; // module.exports is for Node.js
	        factory(target, __webpack_require__(3));
	    } else if (typeof define === 'function' && define['amd']) {
	        // [2] AMD anonymous module
	        define(['exports', 'require'], factory);
	    } else {
	        // [3] No module loader (plain <script> tag) - put directly in global namespace
	        factory(window['ko'] = {});
	    }
	}(function(koExports, require){
	// Internally, all KO objects are attached to koExports (even the non-exported ones whose names will be minified by the closure compiler).
	// In the future, the following "ko" variable may be made distinct from "koExports" so that private objects are not externally reachable.
	var ko = typeof koExports !== 'undefined' ? koExports : {};
	// Google Closure Compiler helpers (used only to make the minified file smaller)
	ko.exportSymbol = function(koPath, object) {
	    var tokens = koPath.split(".");

	    // In the future, "ko" may become distinct from "koExports" (so that non-exported objects are not reachable)
	    // At that point, "target" would be set to: (typeof koExports !== "undefined" ? koExports : ko)
	    var target = ko;

	    for (var i = 0; i < tokens.length - 1; i++)
	        target = target[tokens[i]];
	    target[tokens[tokens.length - 1]] = object;
	};
	ko.exportProperty = function(owner, publicName, object) {
	    owner[publicName] = object;
	};
	ko.version = "3.2.0";

	ko.exportSymbol('version', ko.version);
	ko.utils = (function () {
	    function objectForEach(obj, action) {
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) {
	                action(prop, obj[prop]);
	            }
	        }
	    }

	    function extend(target, source) {
	        if (source) {
	            for(var prop in source) {
	                if(source.hasOwnProperty(prop)) {
	                    target[prop] = source[prop];
	                }
	            }
	        }
	        return target;
	    }

	    function setPrototypeOf(obj, proto) {
	        obj.__proto__ = proto;
	        return obj;
	    }

	    var canSetPrototype = ({ __proto__: [] } instanceof Array);

	    // Represent the known event types in a compact way, then at runtime transform it into a hash with event name as key (for fast lookup)
	    var knownEvents = {}, knownEventTypesByEventName = {};
	    var keyEventTypeName = (navigator && /Firefox\/2/i.test(navigator.userAgent)) ? 'KeyboardEvent' : 'UIEvents';
	    knownEvents[keyEventTypeName] = ['keyup', 'keydown', 'keypress'];
	    knownEvents['MouseEvents'] = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'];
	    objectForEach(knownEvents, function(eventType, knownEventsForType) {
	        if (knownEventsForType.length) {
	            for (var i = 0, j = knownEventsForType.length; i < j; i++)
	                knownEventTypesByEventName[knownEventsForType[i]] = eventType;
	        }
	    });
	    var eventsThatMustBeRegisteredUsingAttachEvent = { 'propertychange': true }; // Workaround for an IE9 issue - https://github.com/SteveSanderson/knockout/issues/406

	    // Detect IE versions for bug workarounds (uses IE conditionals, not UA string, for robustness)
	    // Note that, since IE 10 does not support conditional comments, the following logic only detects IE < 10.
	    // Currently this is by design, since IE 10+ behaves correctly when treated as a standard browser.
	    // If there is a future need to detect specific versions of IE10+, we will amend this.
	    var ieVersion = document && (function() {
	        var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');

	        // Keep constructing conditional HTML blocks until we hit one that resolves to an empty fragment
	        while (
	            div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->',
	            iElems[0]
	        ) {}
	        return version > 4 ? version : undefined;
	    }());
	    var isIe6 = ieVersion === 6,
	        isIe7 = ieVersion === 7;

	    function isClickOnCheckableElement(element, eventType) {
	        if ((ko.utils.tagNameLower(element) !== "input") || !element.type) return false;
	        if (eventType.toLowerCase() != "click") return false;
	        var inputType = element.type;
	        return (inputType == "checkbox") || (inputType == "radio");
	    }

	    return {
	        fieldsIncludedWithJsonPost: ['authenticity_token', /^__RequestVerificationToken(_.*)?$/],

	        arrayForEach: function (array, action) {
	            for (var i = 0, j = array.length; i < j; i++)
	                action(array[i], i);
	        },

	        arrayIndexOf: function (array, item) {
	            if (typeof Array.prototype.indexOf == "function")
	                return Array.prototype.indexOf.call(array, item);
	            for (var i = 0, j = array.length; i < j; i++)
	                if (array[i] === item)
	                    return i;
	            return -1;
	        },

	        arrayFirst: function (array, predicate, predicateOwner) {
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate.call(predicateOwner, array[i], i))
	                    return array[i];
	            return null;
	        },

	        arrayRemoveItem: function (array, itemToRemove) {
	            var index = ko.utils.arrayIndexOf(array, itemToRemove);
	            if (index > 0) {
	                array.splice(index, 1);
	            }
	            else if (index === 0) {
	                array.shift();
	            }
	        },

	        arrayGetDistinctValues: function (array) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++) {
	                if (ko.utils.arrayIndexOf(result, array[i]) < 0)
	                    result.push(array[i]);
	            }
	            return result;
	        },

	        arrayMap: function (array, mapping) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                result.push(mapping(array[i], i));
	            return result;
	        },

	        arrayFilter: function (array, predicate) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate(array[i], i))
	                    result.push(array[i]);
	            return result;
	        },

	        arrayPushAll: function (array, valuesToPush) {
	            if (valuesToPush instanceof Array)
	                array.push.apply(array, valuesToPush);
	            else
	                for (var i = 0, j = valuesToPush.length; i < j; i++)
	                    array.push(valuesToPush[i]);
	            return array;
	        },

	        addOrRemoveItem: function(array, value, included) {
	            var existingEntryIndex = ko.utils.arrayIndexOf(ko.utils.peekObservable(array), value);
	            if (existingEntryIndex < 0) {
	                if (included)
	                    array.push(value);
	            } else {
	                if (!included)
	                    array.splice(existingEntryIndex, 1);
	            }
	        },

	        canSetPrototype: canSetPrototype,

	        extend: extend,

	        setPrototypeOf: setPrototypeOf,

	        setPrototypeOfOrExtend: canSetPrototype ? setPrototypeOf : extend,

	        objectForEach: objectForEach,

	        objectMap: function(source, mapping) {
	            if (!source)
	                return source;
	            var target = {};
	            for (var prop in source) {
	                if (source.hasOwnProperty(prop)) {
	                    target[prop] = mapping(source[prop], prop, source);
	                }
	            }
	            return target;
	        },

	        emptyDomNode: function (domNode) {
	            while (domNode.firstChild) {
	                ko.removeNode(domNode.firstChild);
	            }
	        },

	        moveCleanedNodesToContainerElement: function(nodes) {
	            // Ensure it's a real array, as we're about to reparent the nodes and
	            // we don't want the underlying collection to change while we're doing that.
	            var nodesArray = ko.utils.makeArray(nodes);

	            var container = document.createElement('div');
	            for (var i = 0, j = nodesArray.length; i < j; i++) {
	                container.appendChild(ko.cleanNode(nodesArray[i]));
	            }
	            return container;
	        },

	        cloneNodes: function (nodesArray, shouldCleanNodes) {
	            for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
	                var clonedNode = nodesArray[i].cloneNode(true);
	                newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
	            }
	            return newNodesArray;
	        },

	        setDomNodeChildren: function (domNode, childNodes) {
	            ko.utils.emptyDomNode(domNode);
	            if (childNodes) {
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    domNode.appendChild(childNodes[i]);
	            }
	        },

	        replaceDomNodes: function (nodeToReplaceOrNodeArray, newNodesArray) {
	            var nodesToReplaceArray = nodeToReplaceOrNodeArray.nodeType ? [nodeToReplaceOrNodeArray] : nodeToReplaceOrNodeArray;
	            if (nodesToReplaceArray.length > 0) {
	                var insertionPoint = nodesToReplaceArray[0];
	                var parent = insertionPoint.parentNode;
	                for (var i = 0, j = newNodesArray.length; i < j; i++)
	                    parent.insertBefore(newNodesArray[i], insertionPoint);
	                for (var i = 0, j = nodesToReplaceArray.length; i < j; i++) {
	                    ko.removeNode(nodesToReplaceArray[i]);
	                }
	            }
	        },

	        fixUpContinuousNodeArray: function(continuousNodeArray, parentNode) {
	            // Before acting on a set of nodes that were previously outputted by a template function, we have to reconcile
	            // them against what is in the DOM right now. It may be that some of the nodes have already been removed, or that
	            // new nodes might have been inserted in the middle, for example by a binding. Also, there may previously have been
	            // leading comment nodes (created by rewritten string-based templates) that have since been removed during binding.
	            // So, this function translates the old "map" output array into its best guess of the set of current DOM nodes.
	            //
	            // Rules:
	            //   [A] Any leading nodes that have been removed should be ignored
	            //       These most likely correspond to memoization nodes that were already removed during binding
	            //       See https://github.com/SteveSanderson/knockout/pull/440
	            //   [B] We want to output a continuous series of nodes. So, ignore any nodes that have already been removed,
	            //       and include any nodes that have been inserted among the previous collection

	            if (continuousNodeArray.length) {
	                // The parent node can be a virtual element; so get the real parent node
	                parentNode = (parentNode.nodeType === 8 && parentNode.parentNode) || parentNode;

	                // Rule [A]
	                while (continuousNodeArray.length && continuousNodeArray[0].parentNode !== parentNode)
	                    continuousNodeArray.shift();

	                // Rule [B]
	                if (continuousNodeArray.length > 1) {
	                    var current = continuousNodeArray[0], last = continuousNodeArray[continuousNodeArray.length - 1];
	                    // Replace with the actual new continuous node set
	                    continuousNodeArray.length = 0;
	                    while (current !== last) {
	                        continuousNodeArray.push(current);
	                        current = current.nextSibling;
	                        if (!current) // Won't happen, except if the developer has manually removed some DOM elements (then we're in an undefined scenario)
	                            return;
	                    }
	                    continuousNodeArray.push(last);
	                }
	            }
	            return continuousNodeArray;
	        },

	        setOptionNodeSelectionState: function (optionNode, isSelected) {
	            // IE6 sometimes throws "unknown error" if you try to write to .selected directly, whereas Firefox struggles with setAttribute. Pick one based on browser.
	            if (ieVersion < 7)
	                optionNode.setAttribute("selected", isSelected);
	            else
	                optionNode.selected = isSelected;
	        },

	        stringTrim: function (string) {
	            return string === null || string === undefined ? '' :
	                string.trim ?
	                    string.trim() :
	                    string.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
	        },

	        stringStartsWith: function (string, startsWith) {
	            string = string || "";
	            if (startsWith.length > string.length)
	                return false;
	            return string.substring(0, startsWith.length) === startsWith;
	        },

	        domNodeIsContainedBy: function (node, containedByNode) {
	            if (node === containedByNode)
	                return true;
	            if (node.nodeType === 11)
	                return false; // Fixes issue #1162 - can't use node.contains for document fragments on IE8
	            if (containedByNode.contains)
	                return containedByNode.contains(node.nodeType === 3 ? node.parentNode : node);
	            if (containedByNode.compareDocumentPosition)
	                return (containedByNode.compareDocumentPosition(node) & 16) == 16;
	            while (node && node != containedByNode) {
	                node = node.parentNode;
	            }
	            return !!node;
	        },

	        domNodeIsAttachedToDocument: function (node) {
	            return ko.utils.domNodeIsContainedBy(node, node.ownerDocument.documentElement);
	        },

	        anyDomNodeIsAttachedToDocument: function(nodes) {
	            return !!ko.utils.arrayFirst(nodes, ko.utils.domNodeIsAttachedToDocument);
	        },

	        tagNameLower: function(element) {
	            // For HTML elements, tagName will always be upper case; for XHTML elements, it'll be lower case.
	            // Possible future optimization: If we know it's an element from an XHTML document (not HTML),
	            // we don't need to do the .toLowerCase() as it will always be lower case anyway.
	            return element && element.tagName && element.tagName.toLowerCase();
	        },

	        registerEventHandler: function (element, eventType, handler) {
	            var mustUseAttachEvent = ieVersion && eventsThatMustBeRegisteredUsingAttachEvent[eventType];
	            if (!mustUseAttachEvent && jQueryInstance) {
	                jQueryInstance(element)['bind'](eventType, handler);
	            } else if (!mustUseAttachEvent && typeof element.addEventListener == "function")
	                element.addEventListener(eventType, handler, false);
	            else if (typeof element.attachEvent != "undefined") {
	                var attachEventHandler = function (event) { handler.call(element, event); },
	                    attachEventName = "on" + eventType;
	                element.attachEvent(attachEventName, attachEventHandler);

	                // IE does not dispose attachEvent handlers automatically (unlike with addEventListener)
	                // so to avoid leaks, we have to remove them manually. See bug #856
	                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	                    element.detachEvent(attachEventName, attachEventHandler);
	                });
	            } else
	                throw new Error("Browser doesn't support addEventListener or attachEvent");
	        },

	        triggerEvent: function (element, eventType) {
	            if (!(element && element.nodeType))
	                throw new Error("element must be a DOM node when calling triggerEvent");

	            // For click events on checkboxes and radio buttons, jQuery toggles the element checked state *after* the
	            // event handler runs instead of *before*. (This was fixed in 1.9 for checkboxes but not for radio buttons.)
	            // IE doesn't change the checked state when you trigger the click event using "fireEvent".
	            // In both cases, we'll use the click method instead.
	            var useClickWorkaround = isClickOnCheckableElement(element, eventType);

	            if (jQueryInstance && !useClickWorkaround) {
	                jQueryInstance(element)['trigger'](eventType);
	            } else if (typeof document.createEvent == "function") {
	                if (typeof element.dispatchEvent == "function") {
	                    var eventCategory = knownEventTypesByEventName[eventType] || "HTMLEvents";
	                    var event = document.createEvent(eventCategory);
	                    event.initEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, element);
	                    element.dispatchEvent(event);
	                }
	                else
	                    throw new Error("The supplied element doesn't support dispatchEvent");
	            } else if (useClickWorkaround && element.click) {
	                element.click();
	            } else if (typeof element.fireEvent != "undefined") {
	                element.fireEvent("on" + eventType);
	            } else {
	                throw new Error("Browser doesn't support triggering events");
	            }
	        },

	        unwrapObservable: function (value) {
	            return ko.isObservable(value) ? value() : value;
	        },

	        peekObservable: function (value) {
	            return ko.isObservable(value) ? value.peek() : value;
	        },

	        toggleDomNodeCssClass: function (node, classNames, shouldHaveClass) {
	            if (classNames) {
	                var cssClassNameRegex = /\S+/g,
	                    currentClassNames = node.className.match(cssClassNameRegex) || [];
	                ko.utils.arrayForEach(classNames.match(cssClassNameRegex), function(className) {
	                    ko.utils.addOrRemoveItem(currentClassNames, className, shouldHaveClass);
	                });
	                node.className = currentClassNames.join(" ");
	            }
	        },

	        setTextContent: function(element, textContent) {
	            var value = ko.utils.unwrapObservable(textContent);
	            if ((value === null) || (value === undefined))
	                value = "";

	            // We need there to be exactly one child: a text node.
	            // If there are no children, more than one, or if it's not a text node,
	            // we'll clear everything and create a single text node.
	            var innerTextNode = ko.virtualElements.firstChild(element);
	            if (!innerTextNode || innerTextNode.nodeType != 3 || ko.virtualElements.nextSibling(innerTextNode)) {
	                ko.virtualElements.setDomNodeChildren(element, [element.ownerDocument.createTextNode(value)]);
	            } else {
	                innerTextNode.data = value;
	            }

	            ko.utils.forceRefresh(element);
	        },

	        setElementName: function(element, name) {
	            element.name = name;

	            // Workaround IE 6/7 issue
	            // - https://github.com/SteveSanderson/knockout/issues/197
	            // - http://www.matts411.com/post/setting_the_name_attribute_in_ie_dom/
	            if (ieVersion <= 7) {
	                try {
	                    element.mergeAttributes(document.createElement("<input name='" + element.name + "'/>"), false);
	                }
	                catch(e) {} // For IE9 with doc mode "IE9 Standards" and browser mode "IE9 Compatibility View"
	            }
	        },

	        forceRefresh: function(node) {
	            // Workaround for an IE9 rendering bug - https://github.com/SteveSanderson/knockout/issues/209
	            if (ieVersion >= 9) {
	                // For text nodes and comment nodes (most likely virtual elements), we will have to refresh the container
	                var elem = node.nodeType == 1 ? node : node.parentNode;
	                if (elem.style)
	                    elem.style.zoom = elem.style.zoom;
	            }
	        },

	        ensureSelectElementIsRenderedCorrectly: function(selectElement) {
	            // Workaround for IE9 rendering bug - it doesn't reliably display all the text in dynamically-added select boxes unless you force it to re-render by updating the width.
	            // (See https://github.com/SteveSanderson/knockout/issues/312, http://stackoverflow.com/questions/5908494/select-only-shows-first-char-of-selected-option)
	            // Also fixes IE7 and IE8 bug that causes selects to be zero width if enclosed by 'if' or 'with'. (See issue #839)
	            if (ieVersion) {
	                var originalWidth = selectElement.style.width;
	                selectElement.style.width = 0;
	                selectElement.style.width = originalWidth;
	            }
	        },

	        range: function (min, max) {
	            min = ko.utils.unwrapObservable(min);
	            max = ko.utils.unwrapObservable(max);
	            var result = [];
	            for (var i = min; i <= max; i++)
	                result.push(i);
	            return result;
	        },

	        makeArray: function(arrayLikeObject) {
	            var result = [];
	            for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
	                result.push(arrayLikeObject[i]);
	            };
	            return result;
	        },

	        isIe6 : isIe6,
	        isIe7 : isIe7,
	        ieVersion : ieVersion,

	        getFormFields: function(form, fieldName) {
	            var fields = ko.utils.makeArray(form.getElementsByTagName("input")).concat(ko.utils.makeArray(form.getElementsByTagName("textarea")));
	            var isMatchingField = (typeof fieldName == 'string')
	                ? function(field) { return field.name === fieldName }
	                : function(field) { return fieldName.test(field.name) }; // Treat fieldName as regex or object containing predicate
	            var matches = [];
	            for (var i = fields.length - 1; i >= 0; i--) {
	                if (isMatchingField(fields[i]))
	                    matches.push(fields[i]);
	            };
	            return matches;
	        },

	        parseJson: function (jsonString) {
	            if (typeof jsonString == "string") {
	                jsonString = ko.utils.stringTrim(jsonString);
	                if (jsonString) {
	                    if (JSON && JSON.parse) // Use native parsing where available
	                        return JSON.parse(jsonString);
	                    return (new Function("return " + jsonString))(); // Fallback on less safe parsing for older browsers
	                }
	            }
	            return null;
	        },

	        stringifyJson: function (data, replacer, space) {   // replacer and space are optional
	            if (!JSON || !JSON.stringify)
	                throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
	            return JSON.stringify(ko.utils.unwrapObservable(data), replacer, space);
	        },

	        postJson: function (urlOrForm, data, options) {
	            options = options || {};
	            var params = options['params'] || {};
	            var includeFields = options['includeFields'] || this.fieldsIncludedWithJsonPost;
	            var url = urlOrForm;

	            // If we were given a form, use its 'action' URL and pick out any requested field values
	            if((typeof urlOrForm == 'object') && (ko.utils.tagNameLower(urlOrForm) === "form")) {
	                var originalForm = urlOrForm;
	                url = originalForm.action;
	                for (var i = includeFields.length - 1; i >= 0; i--) {
	                    var fields = ko.utils.getFormFields(originalForm, includeFields[i]);
	                    for (var j = fields.length - 1; j >= 0; j--)
	                        params[fields[j].name] = fields[j].value;
	                }
	            }

	            data = ko.utils.unwrapObservable(data);
	            var form = document.createElement("form");
	            form.style.display = "none";
	            form.action = url;
	            form.method = "post";
	            for (var key in data) {
	                // Since 'data' this is a model object, we include all properties including those inherited from its prototype
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = ko.utils.stringifyJson(ko.utils.unwrapObservable(data[key]));
	                form.appendChild(input);
	            }
	            objectForEach(params, function(key, value) {
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = value;
	                form.appendChild(input);
	            });
	            document.body.appendChild(form);
	            options['submitter'] ? options['submitter'](form) : form.submit();
	            setTimeout(function () { form.parentNode.removeChild(form); }, 0);
	        }
	    }
	}());

	ko.exportSymbol('utils', ko.utils);
	ko.exportSymbol('utils.arrayForEach', ko.utils.arrayForEach);
	ko.exportSymbol('utils.arrayFirst', ko.utils.arrayFirst);
	ko.exportSymbol('utils.arrayFilter', ko.utils.arrayFilter);
	ko.exportSymbol('utils.arrayGetDistinctValues', ko.utils.arrayGetDistinctValues);
	ko.exportSymbol('utils.arrayIndexOf', ko.utils.arrayIndexOf);
	ko.exportSymbol('utils.arrayMap', ko.utils.arrayMap);
	ko.exportSymbol('utils.arrayPushAll', ko.utils.arrayPushAll);
	ko.exportSymbol('utils.arrayRemoveItem', ko.utils.arrayRemoveItem);
	ko.exportSymbol('utils.extend', ko.utils.extend);
	ko.exportSymbol('utils.fieldsIncludedWithJsonPost', ko.utils.fieldsIncludedWithJsonPost);
	ko.exportSymbol('utils.getFormFields', ko.utils.getFormFields);
	ko.exportSymbol('utils.peekObservable', ko.utils.peekObservable);
	ko.exportSymbol('utils.postJson', ko.utils.postJson);
	ko.exportSymbol('utils.parseJson', ko.utils.parseJson);
	ko.exportSymbol('utils.registerEventHandler', ko.utils.registerEventHandler);
	ko.exportSymbol('utils.stringifyJson', ko.utils.stringifyJson);
	ko.exportSymbol('utils.range', ko.utils.range);
	ko.exportSymbol('utils.toggleDomNodeCssClass', ko.utils.toggleDomNodeCssClass);
	ko.exportSymbol('utils.triggerEvent', ko.utils.triggerEvent);
	ko.exportSymbol('utils.unwrapObservable', ko.utils.unwrapObservable);
	ko.exportSymbol('utils.objectForEach', ko.utils.objectForEach);
	ko.exportSymbol('utils.addOrRemoveItem', ko.utils.addOrRemoveItem);
	ko.exportSymbol('unwrap', ko.utils.unwrapObservable); // Convenient shorthand, because this is used so commonly

	if (!Function.prototype['bind']) {
	    // Function.prototype.bind is a standard part of ECMAScript 5th Edition (December 2009, http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
	    // In case the browser doesn't implement it natively, provide a JavaScript implementation. This implementation is based on the one in prototype.js
	    Function.prototype['bind'] = function (object) {
	        var originalFunction = this, args = Array.prototype.slice.call(arguments), object = args.shift();
	        return function () {
	            return originalFunction.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	        };
	    };
	}

	ko.utils.domData = new (function () {
	    var uniqueId = 0;
	    var dataStoreKeyExpandoPropertyName = "__ko__" + (new Date).getTime();
	    var dataStore = {};

	    function getAll(node, createIfNotFound) {
	        var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	        var hasExistingDataStore = dataStoreKey && (dataStoreKey !== "null") && dataStore[dataStoreKey];
	        if (!hasExistingDataStore) {
	            if (!createIfNotFound)
	                return undefined;
	            dataStoreKey = node[dataStoreKeyExpandoPropertyName] = "ko" + uniqueId++;
	            dataStore[dataStoreKey] = {};
	        }
	        return dataStore[dataStoreKey];
	    }

	    return {
	        get: function (node, key) {
	            var allDataForNode = getAll(node, false);
	            return allDataForNode === undefined ? undefined : allDataForNode[key];
	        },
	        set: function (node, key, value) {
	            if (value === undefined) {
	                // Make sure we don't actually create a new domData key if we are actually deleting a value
	                if (getAll(node, false) === undefined)
	                    return;
	            }
	            var allDataForNode = getAll(node, true);
	            allDataForNode[key] = value;
	        },
	        clear: function (node) {
	            var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	            if (dataStoreKey) {
	                delete dataStore[dataStoreKey];
	                node[dataStoreKeyExpandoPropertyName] = null;
	                return true; // Exposing "did clean" flag purely so specs can infer whether things have been cleaned up as intended
	            }
	            return false;
	        },

	        nextKey: function () {
	            return (uniqueId++) + dataStoreKeyExpandoPropertyName;
	        }
	    };
	})();

	ko.exportSymbol('utils.domData', ko.utils.domData);
	ko.exportSymbol('utils.domData.clear', ko.utils.domData.clear); // Exporting only so specs can clear up after themselves fully

	ko.utils.domNodeDisposal = new (function () {
	    var domDataKey = ko.utils.domData.nextKey();
	    var cleanableNodeTypes = { 1: true, 8: true, 9: true };       // Element, Comment, Document
	    var cleanableNodeTypesWithDescendants = { 1: true, 9: true }; // Element, Document

	    function getDisposeCallbacksCollection(node, createIfNotFound) {
	        var allDisposeCallbacks = ko.utils.domData.get(node, domDataKey);
	        if ((allDisposeCallbacks === undefined) && createIfNotFound) {
	            allDisposeCallbacks = [];
	            ko.utils.domData.set(node, domDataKey, allDisposeCallbacks);
	        }
	        return allDisposeCallbacks;
	    }
	    function destroyCallbacksCollection(node) {
	        ko.utils.domData.set(node, domDataKey, undefined);
	    }

	    function cleanSingleNode(node) {
	        // Run all the dispose callbacks
	        var callbacks = getDisposeCallbacksCollection(node, false);
	        if (callbacks) {
	            callbacks = callbacks.slice(0); // Clone, as the array may be modified during iteration (typically, callbacks will remove themselves)
	            for (var i = 0; i < callbacks.length; i++)
	                callbacks[i](node);
	        }

	        // Erase the DOM data
	        ko.utils.domData.clear(node);

	        // Perform cleanup needed by external libraries (currently only jQuery, but can be extended)
	        ko.utils.domNodeDisposal["cleanExternalData"](node);

	        // Clear any immediate-child comment nodes, as these wouldn't have been found by
	        // node.getElementsByTagName("*") in cleanNode() (comment nodes aren't elements)
	        if (cleanableNodeTypesWithDescendants[node.nodeType])
	            cleanImmediateCommentTypeChildren(node);
	    }

	    function cleanImmediateCommentTypeChildren(nodeWithChildren) {
	        var child, nextChild = nodeWithChildren.firstChild;
	        while (child = nextChild) {
	            nextChild = child.nextSibling;
	            if (child.nodeType === 8)
	                cleanSingleNode(child);
	        }
	    }

	    return {
	        addDisposeCallback : function(node, callback) {
	            if (typeof callback != "function")
	                throw new Error("Callback must be a function");
	            getDisposeCallbacksCollection(node, true).push(callback);
	        },

	        removeDisposeCallback : function(node, callback) {
	            var callbacksCollection = getDisposeCallbacksCollection(node, false);
	            if (callbacksCollection) {
	                ko.utils.arrayRemoveItem(callbacksCollection, callback);
	                if (callbacksCollection.length == 0)
	                    destroyCallbacksCollection(node);
	            }
	        },

	        cleanNode : function(node) {
	            // First clean this node, where applicable
	            if (cleanableNodeTypes[node.nodeType]) {
	                cleanSingleNode(node);

	                // ... then its descendants, where applicable
	                if (cleanableNodeTypesWithDescendants[node.nodeType]) {
	                    // Clone the descendants list in case it changes during iteration
	                    var descendants = [];
	                    ko.utils.arrayPushAll(descendants, node.getElementsByTagName("*"));
	                    for (var i = 0, j = descendants.length; i < j; i++)
	                        cleanSingleNode(descendants[i]);
	                }
	            }
	            return node;
	        },

	        removeNode : function(node) {
	            ko.cleanNode(node);
	            if (node.parentNode)
	                node.parentNode.removeChild(node);
	        },

	        "cleanExternalData" : function (node) {
	            // Special support for jQuery here because it's so commonly used.
	            // Many jQuery plugins (including jquery.tmpl) store data using jQuery's equivalent of domData
	            // so notify it to tear down any resources associated with the node & descendants here.
	            if (jQueryInstance && (typeof jQueryInstance['cleanData'] == "function"))
	                jQueryInstance['cleanData']([node]);
	        }
	    }
	})();
	ko.cleanNode = ko.utils.domNodeDisposal.cleanNode; // Shorthand name for convenience
	ko.removeNode = ko.utils.domNodeDisposal.removeNode; // Shorthand name for convenience
	ko.exportSymbol('cleanNode', ko.cleanNode);
	ko.exportSymbol('removeNode', ko.removeNode);
	ko.exportSymbol('utils.domNodeDisposal', ko.utils.domNodeDisposal);
	ko.exportSymbol('utils.domNodeDisposal.addDisposeCallback', ko.utils.domNodeDisposal.addDisposeCallback);
	ko.exportSymbol('utils.domNodeDisposal.removeDisposeCallback', ko.utils.domNodeDisposal.removeDisposeCallback);
	(function () {
	    var leadingCommentRegex = /^(\s*)<!--(.*?)-->/;

	    function simpleHtmlParse(html) {
	        // Based on jQuery's "clean" function, but only accounting for table-related elements.
	        // If you have referenced jQuery, this won't be used anyway - KO will use jQuery's "clean" function directly

	        // Note that there's still an issue in IE < 9 whereby it will discard comment nodes that are the first child of
	        // a descendant node. For example: "<div><!-- mycomment -->abc</div>" will get parsed as "<div>abc</div>"
	        // This won't affect anyone who has referenced jQuery, and there's always the workaround of inserting a dummy node
	        // (possibly a text node) in front of the comment. So, KO does not attempt to workaround this IE issue automatically at present.

	        // Trim whitespace, otherwise indexOf won't work as expected
	        var tags = ko.utils.stringTrim(html).toLowerCase(), div = document.createElement("div");

	        // Finds the first match from the left column, and returns the corresponding "wrap" data from the right column
	        var wrap = tags.match(/^<(thead|tbody|tfoot)/)              && [1, "<table>", "</table>"] ||
	                   !tags.indexOf("<tr")                             && [2, "<table><tbody>", "</tbody></table>"] ||
	                   (!tags.indexOf("<td") || !tags.indexOf("<th"))   && [3, "<table><tbody><tr>", "</tr></tbody></table>"] ||
	                   /* anything else */                                 [0, "", ""];

	        // Go to html and back, then peel off extra wrappers
	        // Note that we always prefix with some dummy text, because otherwise, IE<9 will strip out leading comment nodes in descendants. Total madness.
	        var markup = "ignored<div>" + wrap[1] + html + wrap[2] + "</div>";
	        if (typeof window['innerShiv'] == "function") {
	            div.appendChild(window['innerShiv'](markup));
	        } else {
	            div.innerHTML = markup;
	        }

	        // Move to the right depth
	        while (wrap[0]--)
	            div = div.lastChild;

	        return ko.utils.makeArray(div.lastChild.childNodes);
	    }

	    function jQueryHtmlParse(html) {
	        // jQuery's "parseHTML" function was introduced in jQuery 1.8.0 and is a documented public API.
	        if (jQueryInstance['parseHTML']) {
	            return jQueryInstance['parseHTML'](html) || []; // Ensure we always return an array and never null
	        } else {
	            // For jQuery < 1.8.0, we fall back on the undocumented internal "clean" function.
	            var elems = jQueryInstance['clean']([html]);

	            // As of jQuery 1.7.1, jQuery parses the HTML by appending it to some dummy parent nodes held in an in-memory document fragment.
	            // Unfortunately, it never clears the dummy parent nodes from the document fragment, so it leaks memory over time.
	            // Fix this by finding the top-most dummy parent element, and detaching it from its owner fragment.
	            if (elems && elems[0]) {
	                // Find the top-most parent element that's a direct child of a document fragment
	                var elem = elems[0];
	                while (elem.parentNode && elem.parentNode.nodeType !== 11 /* i.e., DocumentFragment */)
	                    elem = elem.parentNode;
	                // ... then detach it
	                if (elem.parentNode)
	                    elem.parentNode.removeChild(elem);
	            }

	            return elems;
	        }
	    }

	    ko.utils.parseHtmlFragment = function(html) {
	        return jQueryInstance ? jQueryHtmlParse(html)   // As below, benefit from jQuery's optimisations where possible
	                              : simpleHtmlParse(html);  // ... otherwise, this simple logic will do in most common cases.
	    };

	    ko.utils.setHtml = function(node, html) {
	        ko.utils.emptyDomNode(node);

	        // There's no legitimate reason to display a stringified observable without unwrapping it, so we'll unwrap it
	        html = ko.utils.unwrapObservable(html);

	        if ((html !== null) && (html !== undefined)) {
	            if (typeof html != 'string')
	                html = html.toString();

	            // jQuery contains a lot of sophisticated code to parse arbitrary HTML fragments,
	            // for example <tr> elements which are not normally allowed to exist on their own.
	            // If you've referenced jQuery we'll use that rather than duplicating its code.
	            if (jQueryInstance) {
	                jQueryInstance(node)['html'](html);
	            } else {
	                // ... otherwise, use KO's own parsing logic.
	                var parsedNodes = ko.utils.parseHtmlFragment(html);
	                for (var i = 0; i < parsedNodes.length; i++)
	                    node.appendChild(parsedNodes[i]);
	            }
	        }
	    };
	})();

	ko.exportSymbol('utils.parseHtmlFragment', ko.utils.parseHtmlFragment);
	ko.exportSymbol('utils.setHtml', ko.utils.setHtml);

	ko.memoization = (function () {
	    var memos = {};

	    function randomMax8HexChars() {
	        return (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
	    }
	    function generateRandomId() {
	        return randomMax8HexChars() + randomMax8HexChars();
	    }
	    function findMemoNodes(rootNode, appendToArray) {
	        if (!rootNode)
	            return;
	        if (rootNode.nodeType == 8) {
	            var memoId = ko.memoization.parseMemoText(rootNode.nodeValue);
	            if (memoId != null)
	                appendToArray.push({ domNode: rootNode, memoId: memoId });
	        } else if (rootNode.nodeType == 1) {
	            for (var i = 0, childNodes = rootNode.childNodes, j = childNodes.length; i < j; i++)
	                findMemoNodes(childNodes[i], appendToArray);
	        }
	    }

	    return {
	        memoize: function (callback) {
	            if (typeof callback != "function")
	                throw new Error("You can only pass a function to ko.memoization.memoize()");
	            var memoId = generateRandomId();
	            memos[memoId] = callback;
	            return "<!--[ko_memo:" + memoId + "]-->";
	        },

	        unmemoize: function (memoId, callbackParams) {
	            var callback = memos[memoId];
	            if (callback === undefined)
	                throw new Error("Couldn't find any memo with ID " + memoId + ". Perhaps it's already been unmemoized.");
	            try {
	                callback.apply(null, callbackParams || []);
	                return true;
	            }
	            finally { delete memos[memoId]; }
	        },

	        unmemoizeDomNodeAndDescendants: function (domNode, extraCallbackParamsArray) {
	            var memos = [];
	            findMemoNodes(domNode, memos);
	            for (var i = 0, j = memos.length; i < j; i++) {
	                var node = memos[i].domNode;
	                var combinedParams = [node];
	                if (extraCallbackParamsArray)
	                    ko.utils.arrayPushAll(combinedParams, extraCallbackParamsArray);
	                ko.memoization.unmemoize(memos[i].memoId, combinedParams);
	                node.nodeValue = ""; // Neuter this node so we don't try to unmemoize it again
	                if (node.parentNode)
	                    node.parentNode.removeChild(node); // If possible, erase it totally (not always possible - someone else might just hold a reference to it then call unmemoizeDomNodeAndDescendants again)
	            }
	        },

	        parseMemoText: function (memoText) {
	            var match = memoText.match(/^\[ko_memo\:(.*?)\]$/);
	            return match ? match[1] : null;
	        }
	    };
	})();

	ko.exportSymbol('memoization', ko.memoization);
	ko.exportSymbol('memoization.memoize', ko.memoization.memoize);
	ko.exportSymbol('memoization.unmemoize', ko.memoization.unmemoize);
	ko.exportSymbol('memoization.parseMemoText', ko.memoization.parseMemoText);
	ko.exportSymbol('memoization.unmemoizeDomNodeAndDescendants', ko.memoization.unmemoizeDomNodeAndDescendants);
	ko.extenders = {
	    'throttle': function(target, timeout) {
	        // Throttling means two things:

	        // (1) For dependent observables, we throttle *evaluations* so that, no matter how fast its dependencies
	        //     notify updates, the target doesn't re-evaluate (and hence doesn't notify) faster than a certain rate
	        target['throttleEvaluation'] = timeout;

	        // (2) For writable targets (observables, or writable dependent observables), we throttle *writes*
	        //     so the target cannot change value synchronously or faster than a certain rate
	        var writeTimeoutInstance = null;
	        return ko.dependentObservable({
	            'read': target,
	            'write': function(value) {
	                clearTimeout(writeTimeoutInstance);
	                writeTimeoutInstance = setTimeout(function() {
	                    target(value);
	                }, timeout);
	            }
	        });
	    },

	    'rateLimit': function(target, options) {
	        var timeout, method, limitFunction;

	        if (typeof options == 'number') {
	            timeout = options;
	        } else {
	            timeout = options['timeout'];
	            method = options['method'];
	        }

	        limitFunction = method == 'notifyWhenChangesStop' ?  debounce : throttle;
	        target.limit(function(callback) {
	            return limitFunction(callback, timeout);
	        });
	    },

	    'notify': function(target, notifyWhen) {
	        target["equalityComparer"] = notifyWhen == "always" ?
	            null :  // null equalityComparer means to always notify
	            valuesArePrimitiveAndEqual;
	    }
	};

	var primitiveTypes = { 'undefined':1, 'boolean':1, 'number':1, 'string':1 };
	function valuesArePrimitiveAndEqual(a, b) {
	    var oldValueIsPrimitive = (a === null) || (typeof(a) in primitiveTypes);
	    return oldValueIsPrimitive ? (a === b) : false;
	}

	function throttle(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        if (!timeoutInstance) {
	            timeoutInstance = setTimeout(function() {
	                timeoutInstance = undefined;
	                callback();
	            }, timeout);
	        }
	    };
	}

	function debounce(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        clearTimeout(timeoutInstance);
	        timeoutInstance = setTimeout(callback, timeout);
	    };
	}

	function applyExtenders(requestedExtenders) {
	    var target = this;
	    if (requestedExtenders) {
	        ko.utils.objectForEach(requestedExtenders, function(key, value) {
	            var extenderHandler = ko.extenders[key];
	            if (typeof extenderHandler == 'function') {
	                target = extenderHandler(target, value) || target;
	            }
	        });
	    }
	    return target;
	}

	ko.exportSymbol('extenders', ko.extenders);

	ko.subscription = function (target, callback, disposeCallback) {
	    this.target = target;
	    this.callback = callback;
	    this.disposeCallback = disposeCallback;
	    this.isDisposed = false;
	    ko.exportProperty(this, 'dispose', this.dispose);
	};
	ko.subscription.prototype.dispose = function () {
	    this.isDisposed = true;
	    this.disposeCallback();
	};

	ko.subscribable = function () {
	    ko.utils.setPrototypeOfOrExtend(this, ko.subscribable['fn']);
	    this._subscriptions = {};
	}

	var defaultEvent = "change";

	var ko_subscribable_fn = {
	    subscribe: function (callback, callbackTarget, event) {
	        var self = this;

	        event = event || defaultEvent;
	        var boundCallback = callbackTarget ? callback.bind(callbackTarget) : callback;

	        var subscription = new ko.subscription(self, boundCallback, function () {
	            ko.utils.arrayRemoveItem(self._subscriptions[event], subscription);
	            if (self.afterSubscriptionRemove)
	                self.afterSubscriptionRemove(event);
	        });

	        if (self.beforeSubscriptionAdd)
	            self.beforeSubscriptionAdd(event);

	        if (!self._subscriptions[event])
	            self._subscriptions[event] = [];
	        self._subscriptions[event].push(subscription);

	        return subscription;
	    },

	    "notifySubscribers": function (valueToNotify, event) {
	        event = event || defaultEvent;
	        if (this.hasSubscriptionsForEvent(event)) {
	            try {
	                ko.dependencyDetection.begin(); // Begin suppressing dependency detection (by setting the top frame to undefined)
	                for (var a = this._subscriptions[event].slice(0), i = 0, subscription; subscription = a[i]; ++i) {
	                    // In case a subscription was disposed during the arrayForEach cycle, check
	                    // for isDisposed on each subscription before invoking its callback
	                    if (!subscription.isDisposed)
	                        subscription.callback(valueToNotify);
	                }
	            } finally {
	                ko.dependencyDetection.end(); // End suppressing dependency detection
	            }
	        }
	    },

	    limit: function(limitFunction) {
	        var self = this, selfIsObservable = ko.isObservable(self),
	            isPending, previousValue, pendingValue, beforeChange = 'beforeChange';

	        if (!self._origNotifySubscribers) {
	            self._origNotifySubscribers = self["notifySubscribers"];
	            self["notifySubscribers"] = function(value, event) {
	                if (!event || event === defaultEvent) {
	                    self._rateLimitedChange(value);
	                } else if (event === beforeChange) {
	                    self._rateLimitedBeforeChange(value);
	                } else {
	                    self._origNotifySubscribers(value, event);
	                }
	            };
	        }

	        var finish = limitFunction(function() {
	            // If an observable provided a reference to itself, access it to get the latest value.
	            // This allows computed observables to delay calculating their value until needed.
	            if (selfIsObservable && pendingValue === self) {
	                pendingValue = self();
	            }
	            isPending = false;
	            if (self.isDifferent(previousValue, pendingValue)) {
	                self._origNotifySubscribers(previousValue = pendingValue);
	            }
	        });

	        self._rateLimitedChange = function(value) {
	            isPending = true;
	            pendingValue = value;
	            finish();
	        };
	        self._rateLimitedBeforeChange = function(value) {
	            if (!isPending) {
	                previousValue = value;
	                self._origNotifySubscribers(value, beforeChange);
	            }
	        };
	    },

	    hasSubscriptionsForEvent: function(event) {
	        return this._subscriptions[event] && this._subscriptions[event].length;
	    },

	    getSubscriptionsCount: function () {
	        var total = 0;
	        ko.utils.objectForEach(this._subscriptions, function(eventName, subscriptions) {
	            total += subscriptions.length;
	        });
	        return total;
	    },

	    isDifferent: function(oldValue, newValue) {
	        return !this['equalityComparer'] || !this['equalityComparer'](oldValue, newValue);
	    },

	    extend: applyExtenders
	};

	ko.exportProperty(ko_subscribable_fn, 'subscribe', ko_subscribable_fn.subscribe);
	ko.exportProperty(ko_subscribable_fn, 'extend', ko_subscribable_fn.extend);
	ko.exportProperty(ko_subscribable_fn, 'getSubscriptionsCount', ko_subscribable_fn.getSubscriptionsCount);

	// For browsers that support proto assignment, we overwrite the prototype of each
	// observable instance. Since observables are functions, we need Function.prototype
	// to still be in the prototype chain.
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko_subscribable_fn, Function.prototype);
	}

	ko.subscribable['fn'] = ko_subscribable_fn;


	ko.isSubscribable = function (instance) {
	    return instance != null && typeof instance.subscribe == "function" && typeof instance["notifySubscribers"] == "function";
	};

	ko.exportSymbol('subscribable', ko.subscribable);
	ko.exportSymbol('isSubscribable', ko.isSubscribable);

	ko.computedContext = ko.dependencyDetection = (function () {
	    var outerFrames = [],
	        currentFrame,
	        lastId = 0;

	    // Return a unique ID that can be assigned to an observable for dependency tracking.
	    // Theoretically, you could eventually overflow the number storage size, resulting
	    // in duplicate IDs. But in JavaScript, the largest exact integral value is 2^53
	    // or 9,007,199,254,740,992. If you created 1,000,000 IDs per second, it would
	    // take over 285 years to reach that number.
	    // Reference http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html
	    function getId() {
	        return ++lastId;
	    }

	    function begin(options) {
	        outerFrames.push(currentFrame);
	        currentFrame = options;
	    }

	    function end() {
	        currentFrame = outerFrames.pop();
	    }

	    return {
	        begin: begin,

	        end: end,

	        registerDependency: function (subscribable) {
	            if (currentFrame) {
	                if (!ko.isSubscribable(subscribable))
	                    throw new Error("Only subscribable things can act as dependencies");
	                currentFrame.callback(subscribable, subscribable._id || (subscribable._id = getId()));
	            }
	        },

	        ignore: function (callback, callbackTarget, callbackArgs) {
	            try {
	                begin();
	                return callback.apply(callbackTarget, callbackArgs || []);
	            } finally {
	                end();
	            }
	        },

	        getDependenciesCount: function () {
	            if (currentFrame)
	                return currentFrame.computed.getDependenciesCount();
	        },

	        isInitial: function() {
	            if (currentFrame)
	                return currentFrame.isInitial;
	        }
	    };
	})();

	ko.exportSymbol('computedContext', ko.computedContext);
	ko.exportSymbol('computedContext.getDependenciesCount', ko.computedContext.getDependenciesCount);
	ko.exportSymbol('computedContext.isInitial', ko.computedContext.isInitial);
	ko.exportSymbol('computedContext.isSleeping', ko.computedContext.isSleeping);
	ko.observable = function (initialValue) {
	    var _latestValue = initialValue;

	    function observable() {
	        if (arguments.length > 0) {
	            // Write

	            // Ignore writes if the value hasn't changed
	            if (observable.isDifferent(_latestValue, arguments[0])) {
	                observable.valueWillMutate();
	                _latestValue = arguments[0];
	                if (DEBUG) observable._latestValue = _latestValue;
	                observable.valueHasMutated();
	            }
	            return this; // Permits chained assignments
	        }
	        else {
	            // Read
	            ko.dependencyDetection.registerDependency(observable); // The caller only needs to be notified of changes if they did a "read" operation
	            return _latestValue;
	        }
	    }
	    ko.subscribable.call(observable);
	    ko.utils.setPrototypeOfOrExtend(observable, ko.observable['fn']);

	    if (DEBUG) observable._latestValue = _latestValue;
	    observable.peek = function() { return _latestValue };
	    observable.valueHasMutated = function () { observable["notifySubscribers"](_latestValue); }
	    observable.valueWillMutate = function () { observable["notifySubscribers"](_latestValue, "beforeChange"); }

	    ko.exportProperty(observable, 'peek', observable.peek);
	    ko.exportProperty(observable, "valueHasMutated", observable.valueHasMutated);
	    ko.exportProperty(observable, "valueWillMutate", observable.valueWillMutate);

	    return observable;
	}

	ko.observable['fn'] = {
	    "equalityComparer": valuesArePrimitiveAndEqual
	};

	var protoProperty = ko.observable.protoProperty = "__ko_proto__";
	ko.observable['fn'][protoProperty] = ko.observable;

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observable constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.observable['fn'], ko.subscribable['fn']);
	}

	ko.hasPrototype = function(instance, prototype) {
	    if ((instance === null) || (instance === undefined) || (instance[protoProperty] === undefined)) return false;
	    if (instance[protoProperty] === prototype) return true;
	    return ko.hasPrototype(instance[protoProperty], prototype); // Walk the prototype chain
	};

	ko.isObservable = function (instance) {
	    return ko.hasPrototype(instance, ko.observable);
	}
	ko.isWriteableObservable = function (instance) {
	    // Observable
	    if ((typeof instance == "function") && instance[protoProperty] === ko.observable)
	        return true;
	    // Writeable dependent observable
	    if ((typeof instance == "function") && (instance[protoProperty] === ko.dependentObservable) && (instance.hasWriteFunction))
	        return true;
	    // Anything else
	    return false;
	}


	ko.exportSymbol('observable', ko.observable);
	ko.exportSymbol('isObservable', ko.isObservable);
	ko.exportSymbol('isWriteableObservable', ko.isWriteableObservable);
	ko.exportSymbol('isWritableObservable', ko.isWriteableObservable);
	ko.observableArray = function (initialValues) {
	    initialValues = initialValues || [];

	    if (typeof initialValues != 'object' || !('length' in initialValues))
	        throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");

	    var result = ko.observable(initialValues);
	    ko.utils.setPrototypeOfOrExtend(result, ko.observableArray['fn']);
	    return result.extend({'trackArrayChanges':true});
	};

	ko.observableArray['fn'] = {
	    'remove': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var removedValues = [];
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        for (var i = 0; i < underlyingArray.length; i++) {
	            var value = underlyingArray[i];
	            if (predicate(value)) {
	                if (removedValues.length === 0) {
	                    this.valueWillMutate();
	                }
	                removedValues.push(value);
	                underlyingArray.splice(i, 1);
	                i--;
	            }
	        }
	        if (removedValues.length) {
	            this.valueHasMutated();
	        }
	        return removedValues;
	    },

	    'removeAll': function (arrayOfValues) {
	        // If you passed zero args, we remove everything
	        if (arrayOfValues === undefined) {
	            var underlyingArray = this.peek();
	            var allValues = underlyingArray.slice(0);
	            this.valueWillMutate();
	            underlyingArray.splice(0, underlyingArray.length);
	            this.valueHasMutated();
	            return allValues;
	        }
	        // If you passed an arg, we interpret it as an array of entries to remove
	        if (!arrayOfValues)
	            return [];
	        return this['remove'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },

	    'destroy': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        this.valueWillMutate();
	        for (var i = underlyingArray.length - 1; i >= 0; i--) {
	            var value = underlyingArray[i];
	            if (predicate(value))
	                underlyingArray[i]["_destroy"] = true;
	        }
	        this.valueHasMutated();
	    },

	    'destroyAll': function (arrayOfValues) {
	        // If you passed zero args, we destroy everything
	        if (arrayOfValues === undefined)
	            return this['destroy'](function() { return true });

	        // If you passed an arg, we interpret it as an array of entries to destroy
	        if (!arrayOfValues)
	            return [];
	        return this['destroy'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },

	    'indexOf': function (item) {
	        var underlyingArray = this();
	        return ko.utils.arrayIndexOf(underlyingArray, item);
	    },

	    'replace': function(oldItem, newItem) {
	        var index = this['indexOf'](oldItem);
	        if (index >= 0) {
	            this.valueWillMutate();
	            this.peek()[index] = newItem;
	            this.valueHasMutated();
	        }
	    }
	};

	// Populate ko.observableArray.fn with read/write functions from native arrays
	// Important: Do not add any additional functions here that may reasonably be used to *read* data from the array
	// because we'll eval them without causing subscriptions, so ko.computed output could end up getting stale
	ko.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        // Use "peek" to avoid creating a subscription in any computed that we're executing in the context of
	        // (for consistency with mutating regular observables)
	        var underlyingArray = this.peek();
	        this.valueWillMutate();
	        this.cacheDiffForKnownOperation(underlyingArray, methodName, arguments);
	        var methodCallResult = underlyingArray[methodName].apply(underlyingArray, arguments);
	        this.valueHasMutated();
	        return methodCallResult;
	    };
	});

	// Populate ko.observableArray.fn with read-only functions from native arrays
	ko.utils.arrayForEach(["slice"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        var underlyingArray = this();
	        return underlyingArray[methodName].apply(underlyingArray, arguments);
	    };
	});

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observableArray constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.observableArray['fn'], ko.observable['fn']);
	}

	ko.exportSymbol('observableArray', ko.observableArray);
	var arrayChangeEventName = 'arrayChange';
	ko.extenders['trackArrayChanges'] = function(target) {
	    // Only modify the target observable once
	    if (target.cacheDiffForKnownOperation) {
	        return;
	    }
	    var trackingChanges = false,
	        cachedDiff = null,
	        pendingNotifications = 0,
	        underlyingSubscribeFunction = target.subscribe;

	    // Intercept "subscribe" calls, and for array change events, ensure change tracking is enabled
	    target.subscribe = target['subscribe'] = function(callback, callbackTarget, event) {
	        if (event === arrayChangeEventName) {
	            trackChanges();
	        }
	        return underlyingSubscribeFunction.apply(this, arguments);
	    };

	    function trackChanges() {
	        // Calling 'trackChanges' multiple times is the same as calling it once
	        if (trackingChanges) {
	            return;
	        }

	        trackingChanges = true;

	        // Intercept "notifySubscribers" to track how many times it was called.
	        var underlyingNotifySubscribersFunction = target['notifySubscribers'];
	        target['notifySubscribers'] = function(valueToNotify, event) {
	            if (!event || event === defaultEvent) {
	                ++pendingNotifications;
	            }
	            return underlyingNotifySubscribersFunction.apply(this, arguments);
	        };

	        // Each time the array changes value, capture a clone so that on the next
	        // change it's possible to produce a diff
	        var previousContents = [].concat(target.peek() || []);
	        cachedDiff = null;
	        target.subscribe(function(currentContents) {
	            // Make a copy of the current contents and ensure it's an array
	            currentContents = [].concat(currentContents || []);

	            // Compute the diff and issue notifications, but only if someone is listening
	            if (target.hasSubscriptionsForEvent(arrayChangeEventName)) {
	                var changes = getChanges(previousContents, currentContents);
	                if (changes.length) {
	                    target['notifySubscribers'](changes, arrayChangeEventName);
	                }
	            }

	            // Eliminate references to the old, removed items, so they can be GCed
	            previousContents = currentContents;
	            cachedDiff = null;
	            pendingNotifications = 0;
	        });
	    }

	    function getChanges(previousContents, currentContents) {
	        // We try to re-use cached diffs.
	        // The scenarios where pendingNotifications > 1 are when using rate-limiting or the Deferred Updates
	        // plugin, which without this check would not be compatible with arrayChange notifications. Normally,
	        // notifications are issued immediately so we wouldn't be queueing up more than one.
	        if (!cachedDiff || pendingNotifications > 1) {
	            cachedDiff = ko.utils.compareArrays(previousContents, currentContents, { 'sparse': true });
	        }

	        return cachedDiff;
	    }

	    target.cacheDiffForKnownOperation = function(rawArray, operationName, args) {
	        // Only run if we're currently tracking changes for this observable array
	        // and there aren't any pending deferred notifications.
	        if (!trackingChanges || pendingNotifications) {
	            return;
	        }
	        var diff = [],
	            arrayLength = rawArray.length,
	            argsLength = args.length,
	            offset = 0;

	        function pushDiff(status, value, index) {
	            return diff[diff.length] = { 'status': status, 'value': value, 'index': index };
	        }
	        switch (operationName) {
	            case 'push':
	                offset = arrayLength;
	            case 'unshift':
	                for (var index = 0; index < argsLength; index++) {
	                    pushDiff('added', args[index], offset + index);
	                }
	                break;

	            case 'pop':
	                offset = arrayLength - 1;
	            case 'shift':
	                if (arrayLength) {
	                    pushDiff('deleted', rawArray[offset], offset);
	                }
	                break;

	            case 'splice':
	                // Negative start index means 'from end of array'. After that we clamp to [0...arrayLength].
	                // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	                var startIndex = Math.min(Math.max(0, args[0] < 0 ? arrayLength + args[0] : args[0]), arrayLength),
	                    endDeleteIndex = argsLength === 1 ? arrayLength : Math.min(startIndex + (args[1] || 0), arrayLength),
	                    endAddIndex = startIndex + argsLength - 2,
	                    endIndex = Math.max(endDeleteIndex, endAddIndex),
	                    additions = [], deletions = [];
	                for (var index = startIndex, argsIndex = 2; index < endIndex; ++index, ++argsIndex) {
	                    if (index < endDeleteIndex)
	                        deletions.push(pushDiff('deleted', rawArray[index], index));
	                    if (index < endAddIndex)
	                        additions.push(pushDiff('added', args[argsIndex], index));
	                }
	                ko.utils.findMovesInArrayComparison(deletions, additions);
	                break;

	            default:
	                return;
	        }
	        cachedDiff = diff;
	    };
	};
	ko.computed = ko.dependentObservable = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) {
	    var _latestValue,
	        _needsEvaluation = true,
	        _isBeingEvaluated = false,
	        _suppressDisposalUntilDisposeWhenReturnsFalse = false,
	        _isDisposed = false,
	        readFunction = evaluatorFunctionOrOptions,
	        pure = false,
	        isSleeping = false;

	    if (readFunction && typeof readFunction == "object") {
	        // Single-parameter syntax - everything is on this "options" param
	        options = readFunction;
	        readFunction = options["read"];
	    } else {
	        // Multi-parameter syntax - construct the options according to the params passed
	        options = options || {};
	        if (!readFunction)
	            readFunction = options["read"];
	    }
	    if (typeof readFunction != "function")
	        throw new Error("Pass a function that returns the value of the ko.computed");

	    function addSubscriptionToDependency(subscribable, id) {
	        if (!_subscriptionsToDependencies[id]) {
	            _subscriptionsToDependencies[id] = subscribable.subscribe(evaluatePossiblyAsync);
	            ++_dependenciesCount;
	        }
	    }

	    function disposeAllSubscriptionsToDependencies() {
	        ko.utils.objectForEach(_subscriptionsToDependencies, function (id, subscription) {
	            subscription.dispose();
	        });
	        _subscriptionsToDependencies = {};
	    }

	    function disposeComputed() {
	        disposeAllSubscriptionsToDependencies();
	        _dependenciesCount = 0;
	        _isDisposed = true;
	        _needsEvaluation = false;
	    }

	    function evaluatePossiblyAsync() {
	        var throttleEvaluationTimeout = dependentObservable['throttleEvaluation'];
	        if (throttleEvaluationTimeout && throttleEvaluationTimeout >= 0) {
	            clearTimeout(evaluationTimeoutInstance);
	            evaluationTimeoutInstance = setTimeout(evaluateImmediate, throttleEvaluationTimeout);
	        } else if (dependentObservable._evalRateLimited) {
	            dependentObservable._evalRateLimited();
	        } else {
	            evaluateImmediate();
	        }
	    }

	    function evaluateImmediate(suppressChangeNotification) {
	        if (_isBeingEvaluated) {
	            if (pure) {
	                throw Error("A 'pure' computed must not be called recursively");
	            }
	            // If the evaluation of a ko.computed causes side effects, it's possible that it will trigger its own re-evaluation.
	            // This is not desirable (it's hard for a developer to realise a chain of dependencies might cause this, and they almost
	            // certainly didn't intend infinite re-evaluations). So, for predictability, we simply prevent ko.computeds from causing
	            // their own re-evaluation. Further discussion at https://github.com/SteveSanderson/knockout/pull/387
	            return;
	        }

	        // Do not evaluate (and possibly capture new dependencies) if disposed
	        if (_isDisposed) {
	            return;
	        }

	        if (disposeWhen && disposeWhen()) {
	            // See comment below about _suppressDisposalUntilDisposeWhenReturnsFalse
	            if (!_suppressDisposalUntilDisposeWhenReturnsFalse) {
	                dispose();
	                return;
	            }
	        } else {
	            // It just did return false, so we can stop suppressing now
	            _suppressDisposalUntilDisposeWhenReturnsFalse = false;
	        }

	        _isBeingEvaluated = true;

	        // When sleeping, recalculate the value and return.
	        if (isSleeping) {
	            try {
	                var dependencyTracking = {};
	                ko.dependencyDetection.begin({
	                    callback: function (subscribable, id) {
	                        if (!dependencyTracking[id]) {
	                            dependencyTracking[id] = 1;
	                            ++_dependenciesCount;
	                        }
	                    },
	                    computed: dependentObservable,
	                    isInitial: undefined
	                });
	                _dependenciesCount = 0;
	                _latestValue = readFunction.call(evaluatorFunctionTarget);
	            } finally {
	                ko.dependencyDetection.end();
	                _isBeingEvaluated = false;
	            }
	        } else {
	            try {
	                // Initially, we assume that none of the subscriptions are still being used (i.e., all are candidates for disposal).
	                // Then, during evaluation, we cross off any that are in fact still being used.
	                var disposalCandidates = _subscriptionsToDependencies, disposalCount = _dependenciesCount;
	                ko.dependencyDetection.begin({
	                    callback: function(subscribable, id) {
	                        if (!_isDisposed) {
	                            if (disposalCount && disposalCandidates[id]) {
	                                // Don't want to dispose this subscription, as it's still being used
	                                _subscriptionsToDependencies[id] = disposalCandidates[id];
	                                ++_dependenciesCount;
	                                delete disposalCandidates[id];
	                                --disposalCount;
	                            } else {
	                                // Brand new subscription - add it
	                                addSubscriptionToDependency(subscribable, id);
	                            }
	                        }
	                    },
	                    computed: dependentObservable,
	                    isInitial: pure ? undefined : !_dependenciesCount        // If we're evaluating when there are no previous dependencies, it must be the first time
	                });

	                _subscriptionsToDependencies = {};
	                _dependenciesCount = 0;

	                try {
	                    var newValue = evaluatorFunctionTarget ? readFunction.call(evaluatorFunctionTarget) : readFunction();

	                } finally {
	                    ko.dependencyDetection.end();

	                    // For each subscription no longer being used, remove it from the active subscriptions list and dispose it
	                    if (disposalCount) {
	                        ko.utils.objectForEach(disposalCandidates, function(id, toDispose) {
	                            toDispose.dispose();
	                        });
	                    }

	                    _needsEvaluation = false;
	                }

	                if (dependentObservable.isDifferent(_latestValue, newValue)) {
	                    dependentObservable["notifySubscribers"](_latestValue, "beforeChange");

	                    _latestValue = newValue;
	                    if (DEBUG) dependentObservable._latestValue = _latestValue;

	                    if (suppressChangeNotification !== true) {  // Check for strict true value since setTimeout in Firefox passes a numeric value to the function
	                        dependentObservable["notifySubscribers"](_latestValue);
	                    }
	                }
	            } finally {
	                _isBeingEvaluated = false;
	            }
	        }

	        if (!_dependenciesCount)
	            dispose();
	    }

	    function dependentObservable() {
	        if (arguments.length > 0) {
	            if (typeof writeFunction === "function") {
	                // Writing a value
	                writeFunction.apply(evaluatorFunctionTarget, arguments);
	            } else {
	                throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
	            }
	            return this; // Permits chained assignments
	        } else {
	            // Reading the value
	            ko.dependencyDetection.registerDependency(dependentObservable);
	            if (_needsEvaluation)
	                evaluateImmediate(true /* suppressChangeNotification */);
	            return _latestValue;
	        }
	    }

	    function peek() {
	        // Peek won't re-evaluate, except to get the initial value when "deferEvaluation" is set, or while the computed is sleeping.
	        // Those are the only times that both of these conditions will be satisfied.
	        if (_needsEvaluation && !_dependenciesCount)
	            evaluateImmediate(true /* suppressChangeNotification */);
	        return _latestValue;
	    }

	    function isActive() {
	        return _needsEvaluation || _dependenciesCount > 0;
	    }

	    // By here, "options" is always non-null
	    var writeFunction = options["write"],
	        disposeWhenNodeIsRemoved = options["disposeWhenNodeIsRemoved"] || options.disposeWhenNodeIsRemoved || null,
	        disposeWhenOption = options["disposeWhen"] || options.disposeWhen,
	        disposeWhen = disposeWhenOption,
	        dispose = disposeComputed,
	        _subscriptionsToDependencies = {},
	        _dependenciesCount = 0,
	        evaluationTimeoutInstance = null;

	    if (!evaluatorFunctionTarget)
	        evaluatorFunctionTarget = options["owner"];

	    ko.subscribable.call(dependentObservable);
	    ko.utils.setPrototypeOfOrExtend(dependentObservable, ko.dependentObservable['fn']);

	    dependentObservable.peek = peek;
	    dependentObservable.getDependenciesCount = function () { return _dependenciesCount; };
	    dependentObservable.hasWriteFunction = typeof options["write"] === "function";
	    dependentObservable.dispose = function () { dispose(); };
	    dependentObservable.isActive = isActive;

	    // Replace the limit function with one that delays evaluation as well.
	    var originalLimit = dependentObservable.limit;
	    dependentObservable.limit = function(limitFunction) {
	        originalLimit.call(dependentObservable, limitFunction);
	        dependentObservable._evalRateLimited = function() {
	            dependentObservable._rateLimitedBeforeChange(_latestValue);

	            _needsEvaluation = true;    // Mark as dirty

	            // Pass the observable to the rate-limit code, which will access it when
	            // it's time to do the notification.
	            dependentObservable._rateLimitedChange(dependentObservable);
	        }
	    };

	    if (options['pure']) {
	        pure = true;
	        isSleeping = true;     // Starts off sleeping; will awake on the first subscription
	        dependentObservable.beforeSubscriptionAdd = function () {
	            // If asleep, wake up the computed and evaluate to register any dependencies.
	            if (isSleeping) {
	                isSleeping = false;
	                evaluateImmediate(true /* suppressChangeNotification */);
	            }
	        }
	        dependentObservable.afterSubscriptionRemove = function () {
	            if (!dependentObservable.getSubscriptionsCount()) {
	                disposeAllSubscriptionsToDependencies();
	                isSleeping = _needsEvaluation = true;
	            }
	        }
	    } else if (options['deferEvaluation']) {
	        // This will force a computed with deferEvaluation to evaluate when the first subscriptions is registered.
	        dependentObservable.beforeSubscriptionAdd = function () {
	            peek();
	            delete dependentObservable.beforeSubscriptionAdd;
	        }
	    }

	    ko.exportProperty(dependentObservable, 'peek', dependentObservable.peek);
	    ko.exportProperty(dependentObservable, 'dispose', dependentObservable.dispose);
	    ko.exportProperty(dependentObservable, 'isActive', dependentObservable.isActive);
	    ko.exportProperty(dependentObservable, 'getDependenciesCount', dependentObservable.getDependenciesCount);

	    // Add a "disposeWhen" callback that, on each evaluation, disposes if the node was removed without using ko.removeNode.
	    if (disposeWhenNodeIsRemoved) {
	        // Since this computed is associated with a DOM node, and we don't want to dispose the computed
	        // until the DOM node is *removed* from the document (as opposed to never having been in the document),
	        // we'll prevent disposal until "disposeWhen" first returns false.
	        _suppressDisposalUntilDisposeWhenReturnsFalse = true;

	        // Only watch for the node's disposal if the value really is a node. It might not be,
	        // e.g., { disposeWhenNodeIsRemoved: true } can be used to opt into the "only dispose
	        // after first false result" behaviour even if there's no specific node to watch. This
	        // technique is intended for KO's internal use only and shouldn't be documented or used
	        // by application code, as it's likely to change in a future version of KO.
	        if (disposeWhenNodeIsRemoved.nodeType) {
	            disposeWhen = function () {
	                return !ko.utils.domNodeIsAttachedToDocument(disposeWhenNodeIsRemoved) || (disposeWhenOption && disposeWhenOption());
	            };
	        }
	    }

	    // Evaluate, unless sleeping or deferEvaluation is true
	    if (!isSleeping && !options['deferEvaluation'])
	        evaluateImmediate();

	    // Attach a DOM node disposal callback so that the computed will be proactively disposed as soon as the node is
	    // removed using ko.removeNode. But skip if isActive is false (there will never be any dependencies to dispose).
	    if (disposeWhenNodeIsRemoved && isActive() && disposeWhenNodeIsRemoved.nodeType) {
	        dispose = function() {
	            ko.utils.domNodeDisposal.removeDisposeCallback(disposeWhenNodeIsRemoved, dispose);
	            disposeComputed();
	        };
	        ko.utils.domNodeDisposal.addDisposeCallback(disposeWhenNodeIsRemoved, dispose);
	    }

	    return dependentObservable;
	};

	ko.isComputed = function(instance) {
	    return ko.hasPrototype(instance, ko.dependentObservable);
	};

	var protoProp = ko.observable.protoProperty; // == "__ko_proto__"
	ko.dependentObservable[protoProp] = ko.observable;

	ko.dependentObservable['fn'] = {
	    "equalityComparer": valuesArePrimitiveAndEqual
	};
	ko.dependentObservable['fn'][protoProp] = ko.dependentObservable;

	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.dependentObservable constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.dependentObservable['fn'], ko.subscribable['fn']);
	}

	ko.exportSymbol('dependentObservable', ko.dependentObservable);
	ko.exportSymbol('computed', ko.dependentObservable); // Make "ko.computed" an alias for "ko.dependentObservable"
	ko.exportSymbol('isComputed', ko.isComputed);

	ko.pureComputed = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget) {
	    if (typeof evaluatorFunctionOrOptions === 'function') {
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget, {'pure':true});
	    } else {
	        evaluatorFunctionOrOptions = ko.utils.extend({}, evaluatorFunctionOrOptions);   // make a copy of the parameter object
	        evaluatorFunctionOrOptions['pure'] = true;
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget);
	    }
	}
	ko.exportSymbol('pureComputed', ko.pureComputed);

	(function() {
	    var maxNestedObservableDepth = 10; // Escape the (unlikely) pathalogical case where an observable's current value is itself (or similar reference cycle)

	    ko.toJS = function(rootObject) {
	        if (arguments.length == 0)
	            throw new Error("When calling ko.toJS, pass the object you want to convert.");

	        // We just unwrap everything at every level in the object graph
	        return mapJsObjectGraph(rootObject, function(valueToMap) {
	            // Loop because an observable's value might in turn be another observable wrapper
	            for (var i = 0; ko.isObservable(valueToMap) && (i < maxNestedObservableDepth); i++)
	                valueToMap = valueToMap();
	            return valueToMap;
	        });
	    };

	    ko.toJSON = function(rootObject, replacer, space) {     // replacer and space are optional
	        var plainJavaScriptObject = ko.toJS(rootObject);
	        return ko.utils.stringifyJson(plainJavaScriptObject, replacer, space);
	    };

	    function mapJsObjectGraph(rootObject, mapInputCallback, visitedObjects) {
	        visitedObjects = visitedObjects || new objectLookup();

	        rootObject = mapInputCallback(rootObject);
	        var canHaveProperties = (typeof rootObject == "object") && (rootObject !== null) && (rootObject !== undefined) && (!(rootObject instanceof Date)) && (!(rootObject instanceof String)) && (!(rootObject instanceof Number)) && (!(rootObject instanceof Boolean));
	        if (!canHaveProperties)
	            return rootObject;

	        var outputProperties = rootObject instanceof Array ? [] : {};
	        visitedObjects.save(rootObject, outputProperties);

	        visitPropertiesOrArrayEntries(rootObject, function(indexer) {
	            var propertyValue = mapInputCallback(rootObject[indexer]);

	            switch (typeof propertyValue) {
	                case "boolean":
	                case "number":
	                case "string":
	                case "function":
	                    outputProperties[indexer] = propertyValue;
	                    break;
	                case "object":
	                case "undefined":
	                    var previouslyMappedValue = visitedObjects.get(propertyValue);
	                    outputProperties[indexer] = (previouslyMappedValue !== undefined)
	                        ? previouslyMappedValue
	                        : mapJsObjectGraph(propertyValue, mapInputCallback, visitedObjects);
	                    break;
	            }
	        });

	        return outputProperties;
	    }

	    function visitPropertiesOrArrayEntries(rootObject, visitorCallback) {
	        if (rootObject instanceof Array) {
	            for (var i = 0; i < rootObject.length; i++)
	                visitorCallback(i);

	            // For arrays, also respect toJSON property for custom mappings (fixes #278)
	            if (typeof rootObject['toJSON'] == 'function')
	                visitorCallback('toJSON');
	        } else {
	            for (var propertyName in rootObject) {
	                visitorCallback(propertyName);
	            }
	        }
	    };

	    function objectLookup() {
	        this.keys = [];
	        this.values = [];
	    };

	    objectLookup.prototype = {
	        constructor: objectLookup,
	        save: function(key, value) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            if (existingIndex >= 0)
	                this.values[existingIndex] = value;
	            else {
	                this.keys.push(key);
	                this.values.push(value);
	            }
	        },
	        get: function(key) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            return (existingIndex >= 0) ? this.values[existingIndex] : undefined;
	        }
	    };
	})();

	ko.exportSymbol('toJS', ko.toJS);
	ko.exportSymbol('toJSON', ko.toJSON);
	(function () {
	    var hasDomDataExpandoProperty = '__ko__hasDomDataOptionValue__';

	    // Normally, SELECT elements and their OPTIONs can only take value of type 'string' (because the values
	    // are stored on DOM attributes). ko.selectExtensions provides a way for SELECTs/OPTIONs to have values
	    // that are arbitrary objects. This is very convenient when implementing things like cascading dropdowns.
	    ko.selectExtensions = {
	        readValue : function(element) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    if (element[hasDomDataExpandoProperty] === true)
	                        return ko.utils.domData.get(element, ko.bindingHandlers.options.optionValueDomDataKey);
	                    return ko.utils.ieVersion <= 7
	                        ? (element.getAttributeNode('value') && element.getAttributeNode('value').specified ? element.value : element.text)
	                        : element.value;
	                case 'select':
	                    return element.selectedIndex >= 0 ? ko.selectExtensions.readValue(element.options[element.selectedIndex]) : undefined;
	                default:
	                    return element.value;
	            }
	        },

	        writeValue: function(element, value, allowUnset) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    switch(typeof value) {
	                        case "string":
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, undefined);
	                            if (hasDomDataExpandoProperty in element) { // IE <= 8 throws errors if you delete non-existent properties from a DOM node
	                                delete element[hasDomDataExpandoProperty];
	                            }
	                            element.value = value;
	                            break;
	                        default:
	                            // Store arbitrary object using DomData
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, value);
	                            element[hasDomDataExpandoProperty] = true;

	                            // Special treatment of numbers is just for backward compatibility. KO 1.2.1 wrote numerical values to element.value.
	                            element.value = typeof value === "number" ? value : "";
	                            break;
	                    }
	                    break;
	                case 'select':
	                    if (value === "" || value === null)       // A blank string or null value will select the caption
	                        value = undefined;
	                    var selection = -1;
	                    for (var i = 0, n = element.options.length, optionValue; i < n; ++i) {
	                        optionValue = ko.selectExtensions.readValue(element.options[i]);
	                        // Include special check to handle selecting a caption with a blank string value
	                        if (optionValue == value || (optionValue == "" && value === undefined)) {
	                            selection = i;
	                            break;
	                        }
	                    }
	                    if (allowUnset || selection >= 0 || (value === undefined && element.size > 1)) {
	                        element.selectedIndex = selection;
	                    }
	                    break;
	                default:
	                    if ((value === null) || (value === undefined))
	                        value = "";
	                    element.value = value;
	                    break;
	            }
	        }
	    };
	})();

	ko.exportSymbol('selectExtensions', ko.selectExtensions);
	ko.exportSymbol('selectExtensions.readValue', ko.selectExtensions.readValue);
	ko.exportSymbol('selectExtensions.writeValue', ko.selectExtensions.writeValue);
	ko.expressionRewriting = (function () {
	    var javaScriptReservedWords = ["true", "false", "null", "undefined"];

	    // Matches something that can be assigned to--either an isolated identifier or something ending with a property accessor
	    // This is designed to be simple and avoid false negatives, but could produce false positives (e.g., a+b.c).
	    // This also will not properly handle nested brackets (e.g., obj1[obj2['prop']]; see #911).
	    var javaScriptAssignmentTarget = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;

	    function getWriteableValue(expression) {
	        if (ko.utils.arrayIndexOf(javaScriptReservedWords, expression) >= 0)
	            return false;
	        var match = expression.match(javaScriptAssignmentTarget);
	        return match === null ? false : match[1] ? ('Object(' + match[1] + ')' + match[2]) : expression;
	    }

	    // The following regular expressions will be used to split an object-literal string into tokens

	        // These two match strings, either with double quotes or single quotes
	    var stringDouble = '"(?:[^"\\\\]|\\\\.)*"',
	        stringSingle = "'(?:[^'\\\\]|\\\\.)*'",
	        // Matches a regular expression (text enclosed by slashes), but will also match sets of divisions
	        // as a regular expression (this is handled by the parsing loop below).
	        stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*',
	        // These characters have special meaning to the parser and must not appear in the middle of a
	        // token, except as part of a string.
	        specials = ',"\'{}()/:[\\]',
	        // Match text (at least two characters) that does not contain any of the above special characters,
	        // although some of the special characters are allowed to start it (all but the colon and comma).
	        // The text can contain spaces, but leading or trailing spaces are skipped.
	        everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']',
	        // Match any non-space character not matched already. This will match colons and commas, since they're
	        // not matched by "everyThingElse", but will also match any other single character that wasn't already
	        // matched (for example: in "a: 1, b: 2", each of the non-space characters will be matched by oneNotSpace).
	        oneNotSpace = '[^\\s]',

	        // Create the actual regular expression by or-ing the above strings. The order is important.
	        bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g'),

	        // Match end of previous token to determine whether a slash is a division or regex.
	        divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/,
	        keywordRegexLookBehind = {'in':1,'return':1,'typeof':1};

	    function parseObjectLiteral(objectLiteralString) {
	        // Trim leading and trailing spaces from the string
	        var str = ko.utils.stringTrim(objectLiteralString);

	        // Trim braces '{' surrounding the whole object literal
	        if (str.charCodeAt(0) === 123) str = str.slice(1, -1);

	        // Split into tokens
	        var result = [], toks = str.match(bindingToken), key, values, depth = 0;

	        if (toks) {
	            // Append a comma so that we don't need a separate code block to deal with the last item
	            toks.push(',');

	            for (var i = 0, tok; tok = toks[i]; ++i) {
	                var c = tok.charCodeAt(0);
	                // A comma signals the end of a key/value pair if depth is zero
	                if (c === 44) { // ","
	                    if (depth <= 0) {
	                        if (key)
	                            result.push(values ? {key: key, value: values.join('')} : {'unknown': key});
	                        key = values = depth = 0;
	                        continue;
	                    }
	                // Simply skip the colon that separates the name and value
	                } else if (c === 58) { // ":"
	                    if (!values)
	                        continue;
	                // A set of slashes is initially matched as a regular expression, but could be division
	                } else if (c === 47 && i && tok.length > 1) {  // "/"
	                    // Look at the end of the previous token to determine if the slash is actually division
	                    var match = toks[i-1].match(divisionLookBehind);
	                    if (match && !keywordRegexLookBehind[match[0]]) {
	                        // The slash is actually a division punctuator; re-parse the remainder of the string (not including the slash)
	                        str = str.substr(str.indexOf(tok) + 1);
	                        toks = str.match(bindingToken);
	                        toks.push(',');
	                        i = -1;
	                        // Continue with just the slash
	                        tok = '/';
	                    }
	                // Increment depth for parentheses, braces, and brackets so that interior commas are ignored
	                } else if (c === 40 || c === 123 || c === 91) { // '(', '{', '['
	                    ++depth;
	                } else if (c === 41 || c === 125 || c === 93) { // ')', '}', ']'
	                    --depth;
	                // The key must be a single token; if it's a string, trim the quotes
	                } else if (!key && !values) {
	                    key = (c === 34 || c === 39) /* '"', "'" */ ? tok.slice(1, -1) : tok;
	                    continue;
	                }
	                if (values)
	                    values.push(tok);
	                else
	                    values = [tok];
	            }
	        }
	        return result;
	    }

	    // Two-way bindings include a write function that allow the handler to update the value even if it's not an observable.
	    var twoWayBindings = {};

	    function preProcessBindings(bindingsStringOrKeyValueArray, bindingOptions) {
	        bindingOptions = bindingOptions || {};

	        function processKeyValue(key, val) {
	            var writableVal;
	            function callPreprocessHook(obj) {
	                return (obj && obj['preprocess']) ? (val = obj['preprocess'](val, key, processKeyValue)) : true;
	            }
	            if (!bindingParams) {
	                if (!callPreprocessHook(ko['getBindingHandler'](key)))
	                    return;

	                if (twoWayBindings[key] && (writableVal = getWriteableValue(val))) {
	                    // For two-way bindings, provide a write method in case the value
	                    // isn't a writable observable.
	                    propertyAccessorResultStrings.push("'" + key + "':function(_z){" + writableVal + "=_z}");
	                }
	            }
	            // Values are wrapped in a function so that each value can be accessed independently
	            if (makeValueAccessors) {
	                val = 'function(){return ' + val + ' }';
	            }
	            resultStrings.push("'" + key + "':" + val);
	        }

	        var resultStrings = [],
	            propertyAccessorResultStrings = [],
	            makeValueAccessors = bindingOptions['valueAccessors'],
	            bindingParams = bindingOptions['bindingParams'],
	            keyValueArray = typeof bindingsStringOrKeyValueArray === "string" ?
	                parseObjectLiteral(bindingsStringOrKeyValueArray) : bindingsStringOrKeyValueArray;

	        ko.utils.arrayForEach(keyValueArray, function(keyValue) {
	            processKeyValue(keyValue.key || keyValue['unknown'], keyValue.value);
	        });

	        if (propertyAccessorResultStrings.length)
	            processKeyValue('_ko_property_writers', "{" + propertyAccessorResultStrings.join(",") + " }");

	        return resultStrings.join(",");
	    }

	    return {
	        bindingRewriteValidators: [],

	        twoWayBindings: twoWayBindings,

	        parseObjectLiteral: parseObjectLiteral,

	        preProcessBindings: preProcessBindings,

	        keyValueArrayContainsKey: function(keyValueArray, key) {
	            for (var i = 0; i < keyValueArray.length; i++)
	                if (keyValueArray[i]['key'] == key)
	                    return true;
	            return false;
	        },

	        // Internal, private KO utility for updating model properties from within bindings
	        // property:            If the property being updated is (or might be) an observable, pass it here
	        //                      If it turns out to be a writable observable, it will be written to directly
	        // allBindings:         An object with a get method to retrieve bindings in the current execution context.
	        //                      This will be searched for a '_ko_property_writers' property in case you're writing to a non-observable
	        // key:                 The key identifying the property to be written. Example: for { hasFocus: myValue }, write to 'myValue' by specifying the key 'hasFocus'
	        // value:               The value to be written
	        // checkIfDifferent:    If true, and if the property being written is a writable observable, the value will only be written if
	        //                      it is !== existing value on that writable observable
	        writeValueToProperty: function(property, allBindings, key, value, checkIfDifferent) {
	            if (!property || !ko.isObservable(property)) {
	                var propWriters = allBindings.get('_ko_property_writers');
	                if (propWriters && propWriters[key])
	                    propWriters[key](value);
	            } else if (ko.isWriteableObservable(property) && (!checkIfDifferent || property.peek() !== value)) {
	                property(value);
	            }
	        }
	    };
	})();

	ko.exportSymbol('expressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('expressionRewriting.bindingRewriteValidators', ko.expressionRewriting.bindingRewriteValidators);
	ko.exportSymbol('expressionRewriting.parseObjectLiteral', ko.expressionRewriting.parseObjectLiteral);
	ko.exportSymbol('expressionRewriting.preProcessBindings', ko.expressionRewriting.preProcessBindings);

	// Making bindings explicitly declare themselves as "two way" isn't ideal in the long term (it would be better if
	// all bindings could use an official 'property writer' API without needing to declare that they might). However,
	// since this is not, and has never been, a public API (_ko_property_writers was never documented), it's acceptable
	// as an internal implementation detail in the short term.
	// For those developers who rely on _ko_property_writers in their custom bindings, we expose _twoWayBindings as an
	// undocumented feature that makes it relatively easy to upgrade to KO 3.0. However, this is still not an official
	// public API, and we reserve the right to remove it at any time if we create a real public property writers API.
	ko.exportSymbol('expressionRewriting._twoWayBindings', ko.expressionRewriting.twoWayBindings);

	// For backward compatibility, define the following aliases. (Previously, these function names were misleading because
	// they referred to JSON specifically, even though they actually work with arbitrary JavaScript object literal expressions.)
	ko.exportSymbol('jsonExpressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('jsonExpressionRewriting.insertPropertyAccessorsIntoJson', ko.expressionRewriting.preProcessBindings);
	(function() {
	    // "Virtual elements" is an abstraction on top of the usual DOM API which understands the notion that comment nodes
	    // may be used to represent hierarchy (in addition to the DOM's natural hierarchy).
	    // If you call the DOM-manipulating functions on ko.virtualElements, you will be able to read and write the state
	    // of that virtual hierarchy
	    //
	    // The point of all this is to support containerless templates (e.g., <!-- ko foreach:someCollection -->blah<!-- /ko -->)
	    // without having to scatter special cases all over the binding and templating code.

	    // IE 9 cannot reliably read the "nodeValue" property of a comment node (see https://github.com/SteveSanderson/knockout/issues/186)
	    // but it does give them a nonstandard alternative property called "text" that it can read reliably. Other browsers don't have that property.
	    // So, use node.text where available, and node.nodeValue elsewhere
	    var commentNodesHaveTextProperty = document && document.createComment("test").text === "<!--test-->";

	    var startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
	    var endCommentRegex =   commentNodesHaveTextProperty ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/;
	    var htmlTagsWithOptionallyClosingChildren = { 'ul': true, 'ol': true };

	    function isStartComment(node) {
	        return (node.nodeType == 8) && startCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }

	    function isEndComment(node) {
	        return (node.nodeType == 8) && endCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }

	    function getVirtualChildren(startComment, allowUnbalanced) {
	        var currentNode = startComment;
	        var depth = 1;
	        var children = [];
	        while (currentNode = currentNode.nextSibling) {
	            if (isEndComment(currentNode)) {
	                depth--;
	                if (depth === 0)
	                    return children;
	            }

	            children.push(currentNode);

	            if (isStartComment(currentNode))
	                depth++;
	        }
	        if (!allowUnbalanced)
	            throw new Error("Cannot find closing comment tag to match: " + startComment.nodeValue);
	        return null;
	    }

	    function getMatchingEndComment(startComment, allowUnbalanced) {
	        var allVirtualChildren = getVirtualChildren(startComment, allowUnbalanced);
	        if (allVirtualChildren) {
	            if (allVirtualChildren.length > 0)
	                return allVirtualChildren[allVirtualChildren.length - 1].nextSibling;
	            return startComment.nextSibling;
	        } else
	            return null; // Must have no matching end comment, and allowUnbalanced is true
	    }

	    function getUnbalancedChildTags(node) {
	        // e.g., from <div>OK</div><!-- ko blah --><span>Another</span>, returns: <!-- ko blah --><span>Another</span>
	        //       from <div>OK</div><!-- /ko --><!-- /ko -->,             returns: <!-- /ko --><!-- /ko -->
	        var childNode = node.firstChild, captureRemaining = null;
	        if (childNode) {
	            do {
	                if (captureRemaining)                   // We already hit an unbalanced node and are now just scooping up all subsequent nodes
	                    captureRemaining.push(childNode);
	                else if (isStartComment(childNode)) {
	                    var matchingEndComment = getMatchingEndComment(childNode, /* allowUnbalanced: */ true);
	                    if (matchingEndComment)             // It's a balanced tag, so skip immediately to the end of this virtual set
	                        childNode = matchingEndComment;
	                    else
	                        captureRemaining = [childNode]; // It's unbalanced, so start capturing from this point
	                } else if (isEndComment(childNode)) {
	                    captureRemaining = [childNode];     // It's unbalanced (if it wasn't, we'd have skipped over it already), so start capturing
	                }
	            } while (childNode = childNode.nextSibling);
	        }
	        return captureRemaining;
	    }

	    ko.virtualElements = {
	        allowedBindings: {},

	        childNodes: function(node) {
	            return isStartComment(node) ? getVirtualChildren(node) : node.childNodes;
	        },

	        emptyNode: function(node) {
	            if (!isStartComment(node))
	                ko.utils.emptyDomNode(node);
	            else {
	                var virtualChildren = ko.virtualElements.childNodes(node);
	                for (var i = 0, j = virtualChildren.length; i < j; i++)
	                    ko.removeNode(virtualChildren[i]);
	            }
	        },

	        setDomNodeChildren: function(node, childNodes) {
	            if (!isStartComment(node))
	                ko.utils.setDomNodeChildren(node, childNodes);
	            else {
	                ko.virtualElements.emptyNode(node);
	                var endCommentNode = node.nextSibling; // Must be the next sibling, as we just emptied the children
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    endCommentNode.parentNode.insertBefore(childNodes[i], endCommentNode);
	            }
	        },

	        prepend: function(containerNode, nodeToPrepend) {
	            if (!isStartComment(containerNode)) {
	                if (containerNode.firstChild)
	                    containerNode.insertBefore(nodeToPrepend, containerNode.firstChild);
	                else
	                    containerNode.appendChild(nodeToPrepend);
	            } else {
	                // Start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToPrepend, containerNode.nextSibling);
	            }
	        },

	        insertAfter: function(containerNode, nodeToInsert, insertAfterNode) {
	            if (!insertAfterNode) {
	                ko.virtualElements.prepend(containerNode, nodeToInsert);
	            } else if (!isStartComment(containerNode)) {
	                // Insert after insertion point
	                if (insertAfterNode.nextSibling)
	                    containerNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	                else
	                    containerNode.appendChild(nodeToInsert);
	            } else {
	                // Children of start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	            }
	        },

	        firstChild: function(node) {
	            if (!isStartComment(node))
	                return node.firstChild;
	            if (!node.nextSibling || isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },

	        nextSibling: function(node) {
	            if (isStartComment(node))
	                node = getMatchingEndComment(node);
	            if (node.nextSibling && isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },

	        hasBindingValue: isStartComment,

	        virtualNodeBindingValue: function(node) {
	            var regexMatch = (commentNodesHaveTextProperty ? node.text : node.nodeValue).match(startCommentRegex);
	            return regexMatch ? regexMatch[1] : null;
	        },

	        normaliseVirtualElementDomStructure: function(elementVerified) {
	            // Workaround for https://github.com/SteveSanderson/knockout/issues/155
	            // (IE <= 8 or IE 9 quirks mode parses your HTML weirdly, treating closing </li> tags as if they don't exist, thereby moving comment nodes
	            // that are direct descendants of <ul> into the preceding <li>)
	            if (!htmlTagsWithOptionallyClosingChildren[ko.utils.tagNameLower(elementVerified)])
	                return;

	            // Scan immediate children to see if they contain unbalanced comment tags. If they do, those comment tags
	            // must be intended to appear *after* that child, so move them there.
	            var childNode = elementVerified.firstChild;
	            if (childNode) {
	                do {
	                    if (childNode.nodeType === 1) {
	                        var unbalancedTags = getUnbalancedChildTags(childNode);
	                        if (unbalancedTags) {
	                            // Fix up the DOM by moving the unbalanced tags to where they most likely were intended to be placed - *after* the child
	                            var nodeToInsertBefore = childNode.nextSibling;
	                            for (var i = 0; i < unbalancedTags.length; i++) {
	                                if (nodeToInsertBefore)
	                                    elementVerified.insertBefore(unbalancedTags[i], nodeToInsertBefore);
	                                else
	                                    elementVerified.appendChild(unbalancedTags[i]);
	                            }
	                        }
	                    }
	                } while (childNode = childNode.nextSibling);
	            }
	        }
	    };
	})();
	ko.exportSymbol('virtualElements', ko.virtualElements);
	ko.exportSymbol('virtualElements.allowedBindings', ko.virtualElements.allowedBindings);
	ko.exportSymbol('virtualElements.emptyNode', ko.virtualElements.emptyNode);
	//ko.exportSymbol('virtualElements.firstChild', ko.virtualElements.firstChild);     // firstChild is not minified
	ko.exportSymbol('virtualElements.insertAfter', ko.virtualElements.insertAfter);
	//ko.exportSymbol('virtualElements.nextSibling', ko.virtualElements.nextSibling);   // nextSibling is not minified
	ko.exportSymbol('virtualElements.prepend', ko.virtualElements.prepend);
	ko.exportSymbol('virtualElements.setDomNodeChildren', ko.virtualElements.setDomNodeChildren);
	(function() {
	    var defaultBindingAttributeName = "data-bind";

	    ko.bindingProvider = function() {
	        this.bindingCache = {};
	    };

	    ko.utils.extend(ko.bindingProvider.prototype, {
	        'nodeHasBindings': function(node) {
	            switch (node.nodeType) {
	                case 1: // Element
	                    return node.getAttribute(defaultBindingAttributeName) != null
	                        || ko.components['getComponentNameForNode'](node);
	                case 8: // Comment node
	                    return ko.virtualElements.hasBindingValue(node);
	                default: return false;
	            }
	        },

	        'getBindings': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ false);
	        },

	        'getBindingAccessors': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node, { 'valueAccessors': true }) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ true);
	        },

	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'getBindingsString': function(node, bindingContext) {
	            switch (node.nodeType) {
	                case 1: return node.getAttribute(defaultBindingAttributeName);   // Element
	                case 8: return ko.virtualElements.virtualNodeBindingValue(node); // Comment node
	                default: return null;
	            }
	        },

	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'parseBindingsString': function(bindingsString, bindingContext, node, options) {
	            try {
	                var bindingFunction = createBindingsStringEvaluatorViaCache(bindingsString, this.bindingCache, options);
	                return bindingFunction(bindingContext, node);
	            } catch (ex) {
	                ex.message = "Unable to parse bindings.\nBindings value: " + bindingsString + "\nMessage: " + ex.message;
	                throw ex;
	            }
	        }
	    });

	    ko.bindingProvider['instance'] = new ko.bindingProvider();

	    function createBindingsStringEvaluatorViaCache(bindingsString, cache, options) {
	        var cacheKey = bindingsString + (options && options['valueAccessors'] || '');
	        return cache[cacheKey]
	            || (cache[cacheKey] = createBindingsStringEvaluator(bindingsString, options));
	    }

	    function createBindingsStringEvaluator(bindingsString, options) {
	        // Build the source for a function that evaluates "expression"
	        // For each scope variable, add an extra level of "with" nesting
	        // Example result: with(sc1) { with(sc0) { return (expression) } }
	        var rewrittenBindings = ko.expressionRewriting.preProcessBindings(bindingsString, options),
	            functionBody = "with($context){with($data||{}){return{" + rewrittenBindings + "}}}";
	        return new Function("$context", "$element", functionBody);
	    }
	})();

	ko.exportSymbol('bindingProvider', ko.bindingProvider);
	(function () {
	    ko.bindingHandlers = {};

	    // The following element types will not be recursed into during binding. In the future, we
	    // may consider adding <template> to this list, because such elements' contents are always
	    // intended to be bound in a different context from where they appear in the document.
	    var bindingDoesNotRecurseIntoElementTypes = {
	        // Don't want bindings that operate on text nodes to mutate <script> contents,
	        // because it's unexpected and a potential XSS issue
	        'script': true
	    };

	    // Use an overridable method for retrieving binding handlers so that a plugins may support dynamically created handlers
	    ko['getBindingHandler'] = function(bindingKey) {
	        return ko.bindingHandlers[bindingKey];
	    };

	    // The ko.bindingContext constructor is only called directly to create the root context. For child
	    // contexts, use bindingContext.createChildContext or bindingContext.extend.
	    ko.bindingContext = function(dataItemOrAccessor, parentContext, dataItemAlias, extendCallback) {

	        // The binding context object includes static properties for the current, parent, and root view models.
	        // If a view model is actually stored in an observable, the corresponding binding context object, and
	        // any child contexts, must be updated when the view model is changed.
	        function updateContext() {
	            // Most of the time, the context will directly get a view model object, but if a function is given,
	            // we call the function to retrieve the view model. If the function accesses any obsevables or returns
	            // an observable, the dependency is tracked, and those observables can later cause the binding
	            // context to be updated.
	            var dataItemOrObservable = isFunc ? dataItemOrAccessor() : dataItemOrAccessor,
	                dataItem = ko.utils.unwrapObservable(dataItemOrObservable);

	            if (parentContext) {
	                // When a "parent" context is given, register a dependency on the parent context. Thus whenever the
	                // parent context is updated, this context will also be updated.
	                if (parentContext._subscribable)
	                    parentContext._subscribable();

	                // Copy $root and any custom properties from the parent context
	                ko.utils.extend(self, parentContext);

	                // Because the above copy overwrites our own properties, we need to reset them.
	                // During the first execution, "subscribable" isn't set, so don't bother doing the update then.
	                if (subscribable) {
	                    self._subscribable = subscribable;
	                }
	            } else {
	                self['$parents'] = [];
	                self['$root'] = dataItem;

	                // Export 'ko' in the binding context so it will be available in bindings and templates
	                // even if 'ko' isn't exported as a global, such as when using an AMD loader.
	                // See https://github.com/SteveSanderson/knockout/issues/490
	                self['ko'] = ko;
	            }
	            self['$rawData'] = dataItemOrObservable;
	            self['$data'] = dataItem;
	            if (dataItemAlias)
	                self[dataItemAlias] = dataItem;

	            // The extendCallback function is provided when creating a child context or extending a context.
	            // It handles the specific actions needed to finish setting up the binding context. Actions in this
	            // function could also add dependencies to this binding context.
	            if (extendCallback)
	                extendCallback(self, parentContext, dataItem);

	            return self['$data'];
	        }
	        function disposeWhen() {
	            return nodes && !ko.utils.anyDomNodeIsAttachedToDocument(nodes);
	        }

	        var self = this,
	            isFunc = typeof(dataItemOrAccessor) == "function" && !ko.isObservable(dataItemOrAccessor),
	            nodes,
	            subscribable = ko.dependentObservable(updateContext, null, { disposeWhen: disposeWhen, disposeWhenNodeIsRemoved: true });

	        // At this point, the binding context has been initialized, and the "subscribable" computed observable is
	        // subscribed to any observables that were accessed in the process. If there is nothing to track, the
	        // computed will be inactive, and we can safely throw it away. If it's active, the computed is stored in
	        // the context object.
	        if (subscribable.isActive()) {
	            self._subscribable = subscribable;

	            // Always notify because even if the model ($data) hasn't changed, other context properties might have changed
	            subscribable['equalityComparer'] = null;

	            // We need to be able to dispose of this computed observable when it's no longer needed. This would be
	            // easy if we had a single node to watch, but binding contexts can be used by many different nodes, and
	            // we cannot assume that those nodes have any relation to each other. So instead we track any node that
	            // the context is attached to, and dispose the computed when all of those nodes have been cleaned.

	            // Add properties to *subscribable* instead of *self* because any properties added to *self* may be overwritten on updates
	            nodes = [];
	            subscribable._addNode = function(node) {
	                nodes.push(node);
	                ko.utils.domNodeDisposal.addDisposeCallback(node, function(node) {
	                    ko.utils.arrayRemoveItem(nodes, node);
	                    if (!nodes.length) {
	                        subscribable.dispose();
	                        self._subscribable = subscribable = undefined;
	                    }
	                });
	            };
	        }
	    }

	    // Extend the binding context hierarchy with a new view model object. If the parent context is watching
	    // any obsevables, the new child context will automatically get a dependency on the parent context.
	    // But this does not mean that the $data value of the child context will also get updated. If the child
	    // view model also depends on the parent view model, you must provide a function that returns the correct
	    // view model on each update.
	    ko.bindingContext.prototype['createChildContext'] = function (dataItemOrAccessor, dataItemAlias, extendCallback) {
	        return new ko.bindingContext(dataItemOrAccessor, this, dataItemAlias, function(self, parentContext) {
	            // Extend the context hierarchy by setting the appropriate pointers
	            self['$parentContext'] = parentContext;
	            self['$parent'] = parentContext['$data'];
	            self['$parents'] = (parentContext['$parents'] || []).slice(0);
	            self['$parents'].unshift(self['$parent']);
	            if (extendCallback)
	                extendCallback(self);
	        });
	    };

	    // Extend the binding context with new custom properties. This doesn't change the context hierarchy.
	    // Similarly to "child" contexts, provide a function here to make sure that the correct values are set
	    // when an observable view model is updated.
	    ko.bindingContext.prototype['extend'] = function(properties) {
	        // If the parent context references an observable view model, "_subscribable" will always be the
	        // latest view model object. If not, "_subscribable" isn't set, and we can use the static "$data" value.
	        return new ko.bindingContext(this._subscribable || this['$data'], this, null, function(self, parentContext) {
	            // This "child" context doesn't directly track a parent observable view model,
	            // so we need to manually set the $rawData value to match the parent.
	            self['$rawData'] = parentContext['$rawData'];
	            ko.utils.extend(self, typeof(properties) == "function" ? properties() : properties);
	        });
	    };

	    // Returns the valueAccesor function for a binding value
	    function makeValueAccessor(value) {
	        return function() {
	            return value;
	        };
	    }

	    // Returns the value of a valueAccessor function
	    function evaluateValueAccessor(valueAccessor) {
	        return valueAccessor();
	    }

	    // Given a function that returns bindings, create and return a new object that contains
	    // binding value-accessors functions. Each accessor function calls the original function
	    // so that it always gets the latest value and all dependencies are captured. This is used
	    // by ko.applyBindingsToNode and getBindingsAndMakeAccessors.
	    function makeAccessorsFromFunction(callback) {
	        return ko.utils.objectMap(ko.dependencyDetection.ignore(callback), function(value, key) {
	            return function() {
	                return callback()[key];
	            };
	        });
	    }

	    // Given a bindings function or object, create and return a new object that contains
	    // binding value-accessors functions. This is used by ko.applyBindingsToNode.
	    function makeBindingAccessors(bindings, context, node) {
	        if (typeof bindings === 'function') {
	            return makeAccessorsFromFunction(bindings.bind(null, context, node));
	        } else {
	            return ko.utils.objectMap(bindings, makeValueAccessor);
	        }
	    }

	    // This function is used if the binding provider doesn't include a getBindingAccessors function.
	    // It must be called with 'this' set to the provider instance.
	    function getBindingsAndMakeAccessors(node, context) {
	        return makeAccessorsFromFunction(this['getBindings'].bind(this, node, context));
	    }

	    function validateThatBindingIsAllowedForVirtualElements(bindingName) {
	        var validator = ko.virtualElements.allowedBindings[bindingName];
	        if (!validator)
	            throw new Error("The binding '" + bindingName + "' cannot be used with virtual elements")
	    }

	    function applyBindingsToDescendantsInternal (bindingContext, elementOrVirtualElement, bindingContextsMayDifferFromDomParentElement) {
	        var currentChild,
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement),
	            provider = ko.bindingProvider['instance'],
	            preprocessNode = provider['preprocessNode'];

	        // Preprocessing allows a binding provider to mutate a node before bindings are applied to it. For example it's
	        // possible to insert new siblings after it, and/or replace the node with a different one. This can be used to
	        // implement custom binding syntaxes, such as {{ value }} for string interpolation, or custom element types that
	        // trigger insertion of <template> contents at that point in the document.
	        if (preprocessNode) {
	            while (currentChild = nextInQueue) {
	                nextInQueue = ko.virtualElements.nextSibling(currentChild);
	                preprocessNode.call(provider, currentChild);
	            }
	            // Reset nextInQueue for the next loop
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement);
	        }

	        while (currentChild = nextInQueue) {
	            // Keep a record of the next child *before* applying bindings, in case the binding removes the current child from its position
	            nextInQueue = ko.virtualElements.nextSibling(currentChild);
	            applyBindingsToNodeAndDescendantsInternal(bindingContext, currentChild, bindingContextsMayDifferFromDomParentElement);
	        }
	    }

	    function applyBindingsToNodeAndDescendantsInternal (bindingContext, nodeVerified, bindingContextMayDifferFromDomParentElement) {
	        var shouldBindDescendants = true;

	        // Perf optimisation: Apply bindings only if...
	        // (1) We need to store the binding context on this node (because it may differ from the DOM parent node's binding context)
	        //     Note that we can't store binding contexts on non-elements (e.g., text nodes), as IE doesn't allow expando properties for those
	        // (2) It might have bindings (e.g., it has a data-bind attribute, or it's a marker for a containerless template)
	        var isElement = (nodeVerified.nodeType === 1);
	        if (isElement) // Workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(nodeVerified);

	        var shouldApplyBindings = (isElement && bindingContextMayDifferFromDomParentElement)             // Case (1)
	                               || ko.bindingProvider['instance']['nodeHasBindings'](nodeVerified);       // Case (2)
	        if (shouldApplyBindings)
	            shouldBindDescendants = applyBindingsToNodeInternal(nodeVerified, null, bindingContext, bindingContextMayDifferFromDomParentElement)['shouldBindDescendants'];

	        if (shouldBindDescendants && !bindingDoesNotRecurseIntoElementTypes[ko.utils.tagNameLower(nodeVerified)]) {
	            // We're recursing automatically into (real or virtual) child nodes without changing binding contexts. So,
	            //  * For children of a *real* element, the binding context is certainly the same as on their DOM .parentNode,
	            //    hence bindingContextsMayDifferFromDomParentElement is false
	            //  * For children of a *virtual* element, we can't be sure. Evaluating .parentNode on those children may
	            //    skip over any number of intermediate virtual elements, any of which might define a custom binding context,
	            //    hence bindingContextsMayDifferFromDomParentElement is true
	            applyBindingsToDescendantsInternal(bindingContext, nodeVerified, /* bindingContextsMayDifferFromDomParentElement: */ !isElement);
	        }
	    }

	    var boundElementDomDataKey = ko.utils.domData.nextKey();


	    function topologicalSortBindings(bindings) {
	        // Depth-first sort
	        var result = [],                // The list of key/handler pairs that we will return
	            bindingsConsidered = {},    // A temporary record of which bindings are already in 'result'
	            cyclicDependencyStack = []; // Keeps track of a depth-search so that, if there's a cycle, we know which bindings caused it
	        ko.utils.objectForEach(bindings, function pushBinding(bindingKey) {
	            if (!bindingsConsidered[bindingKey]) {
	                var binding = ko['getBindingHandler'](bindingKey);
	                if (binding) {
	                    // First add dependencies (if any) of the current binding
	                    if (binding['after']) {
	                        cyclicDependencyStack.push(bindingKey);
	                        ko.utils.arrayForEach(binding['after'], function(bindingDependencyKey) {
	                            if (bindings[bindingDependencyKey]) {
	                                if (ko.utils.arrayIndexOf(cyclicDependencyStack, bindingDependencyKey) !== -1) {
	                                    throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + cyclicDependencyStack.join(", "));
	                                } else {
	                                    pushBinding(bindingDependencyKey);
	                                }
	                            }
	                        });
	                        cyclicDependencyStack.length--;
	                    }
	                    // Next add the current binding
	                    result.push({ key: bindingKey, handler: binding });
	                }
	                bindingsConsidered[bindingKey] = true;
	            }
	        });

	        return result;
	    }

	    function applyBindingsToNodeInternal(node, sourceBindings, bindingContext, bindingContextMayDifferFromDomParentElement) {
	        // Prevent multiple applyBindings calls for the same node, except when a binding value is specified
	        var alreadyBound = ko.utils.domData.get(node, boundElementDomDataKey);
	        if (!sourceBindings) {
	            if (alreadyBound) {
	                throw Error("You cannot apply bindings multiple times to the same element.");
	            }
	            ko.utils.domData.set(node, boundElementDomDataKey, true);
	        }

	        // Optimization: Don't store the binding context on this node if it's definitely the same as on node.parentNode, because
	        // we can easily recover it just by scanning up the node's ancestors in the DOM
	        // (note: here, parent node means "real DOM parent" not "virtual parent", as there's no O(1) way to find the virtual parent)
	        if (!alreadyBound && bindingContextMayDifferFromDomParentElement)
	            ko.storedBindingContextForNode(node, bindingContext);

	        // Use bindings if given, otherwise fall back on asking the bindings provider to give us some bindings
	        var bindings;
	        if (sourceBindings && typeof sourceBindings !== 'function') {
	            bindings = sourceBindings;
	        } else {
	            var provider = ko.bindingProvider['instance'],
	                getBindings = provider['getBindingAccessors'] || getBindingsAndMakeAccessors;

	            // Get the binding from the provider within a computed observable so that we can update the bindings whenever
	            // the binding context is updated or if the binding provider accesses observables.
	            var bindingsUpdater = ko.dependentObservable(
	                function() {
	                    bindings = sourceBindings ? sourceBindings(bindingContext, node) : getBindings.call(provider, node, bindingContext);
	                    // Register a dependency on the binding context to support obsevable view models.
	                    if (bindings && bindingContext._subscribable)
	                        bindingContext._subscribable();
	                    return bindings;
	                },
	                null, { disposeWhenNodeIsRemoved: node }
	            );

	            if (!bindings || !bindingsUpdater.isActive())
	                bindingsUpdater = null;
	        }

	        var bindingHandlerThatControlsDescendantBindings;
	        if (bindings) {
	            // Return the value accessor for a given binding. When bindings are static (won't be updated because of a binding
	            // context update), just return the value accessor from the binding. Otherwise, return a function that always gets
	            // the latest binding value and registers a dependency on the binding updater.
	            var getValueAccessor = bindingsUpdater
	                ? function(bindingKey) {
	                    return function() {
	                        return evaluateValueAccessor(bindingsUpdater()[bindingKey]);
	                    };
	                } : function(bindingKey) {
	                    return bindings[bindingKey];
	                };

	            // Use of allBindings as a function is maintained for backwards compatibility, but its use is deprecated
	            function allBindings() {
	                return ko.utils.objectMap(bindingsUpdater ? bindingsUpdater() : bindings, evaluateValueAccessor);
	            }
	            // The following is the 3.x allBindings API
	            allBindings['get'] = function(key) {
	                return bindings[key] && evaluateValueAccessor(getValueAccessor(key));
	            };
	            allBindings['has'] = function(key) {
	                return key in bindings;
	            };

	            // First put the bindings into the right order
	            var orderedBindings = topologicalSortBindings(bindings);

	            // Go through the sorted bindings, calling init and update for each
	            ko.utils.arrayForEach(orderedBindings, function(bindingKeyAndHandler) {
	                // Note that topologicalSortBindings has already filtered out any nonexistent binding handlers,
	                // so bindingKeyAndHandler.handler will always be nonnull.
	                var handlerInitFn = bindingKeyAndHandler.handler["init"],
	                    handlerUpdateFn = bindingKeyAndHandler.handler["update"],
	                    bindingKey = bindingKeyAndHandler.key;

	                if (node.nodeType === 8) {
	                    validateThatBindingIsAllowedForVirtualElements(bindingKey);
	                }

	                try {
	                    // Run init, ignoring any dependencies
	                    if (typeof handlerInitFn == "function") {
	                        ko.dependencyDetection.ignore(function() {
	                            var initResult = handlerInitFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);

	                            // If this binding handler claims to control descendant bindings, make a note of this
	                            if (initResult && initResult['controlsDescendantBindings']) {
	                                if (bindingHandlerThatControlsDescendantBindings !== undefined)
	                                    throw new Error("Multiple bindings (" + bindingHandlerThatControlsDescendantBindings + " and " + bindingKey + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
	                                bindingHandlerThatControlsDescendantBindings = bindingKey;
	                            }
	                        });
	                    }

	                    // Run update in its own computed wrapper
	                    if (typeof handlerUpdateFn == "function") {
	                        ko.dependentObservable(
	                            function() {
	                                handlerUpdateFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);
	                            },
	                            null,
	                            { disposeWhenNodeIsRemoved: node }
	                        );
	                    }
	                } catch (ex) {
	                    ex.message = "Unable to process binding \"" + bindingKey + ": " + bindings[bindingKey] + "\"\nMessage: " + ex.message;
	                    throw ex;
	                }
	            });
	        }

	        return {
	            'shouldBindDescendants': bindingHandlerThatControlsDescendantBindings === undefined
	        };
	    };

	    var storedBindingContextDomDataKey = ko.utils.domData.nextKey();
	    ko.storedBindingContextForNode = function (node, bindingContext) {
	        if (arguments.length == 2) {
	            ko.utils.domData.set(node, storedBindingContextDomDataKey, bindingContext);
	            if (bindingContext._subscribable)
	                bindingContext._subscribable._addNode(node);
	        } else {
	            return ko.utils.domData.get(node, storedBindingContextDomDataKey);
	        }
	    }

	    function getBindingContext(viewModelOrBindingContext) {
	        return viewModelOrBindingContext && (viewModelOrBindingContext instanceof ko.bindingContext)
	            ? viewModelOrBindingContext
	            : new ko.bindingContext(viewModelOrBindingContext);
	    }

	    ko.applyBindingAccessorsToNode = function (node, bindings, viewModelOrBindingContext) {
	        if (node.nodeType === 1) // If it's an element, workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(node);
	        return applyBindingsToNodeInternal(node, bindings, getBindingContext(viewModelOrBindingContext), true);
	    };

	    ko.applyBindingsToNode = function (node, bindings, viewModelOrBindingContext) {
	        var context = getBindingContext(viewModelOrBindingContext);
	        return ko.applyBindingAccessorsToNode(node, makeBindingAccessors(bindings, context, node), context);
	    };

	    ko.applyBindingsToDescendants = function(viewModelOrBindingContext, rootNode) {
	        if (rootNode.nodeType === 1 || rootNode.nodeType === 8)
	            applyBindingsToDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };

	    ko.applyBindings = function (viewModelOrBindingContext, rootNode) {
	        // If jQuery is loaded after Knockout, we won't initially have access to it. So save it here.
	        if (!jQueryInstance && window['jQuery']) {
	            jQueryInstance = window['jQuery'];
	        }

	        if (rootNode && (rootNode.nodeType !== 1) && (rootNode.nodeType !== 8))
	            throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
	        rootNode = rootNode || window.document.body; // Make "rootNode" parameter optional

	        applyBindingsToNodeAndDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };

	    // Retrieving binding context from arbitrary nodes
	    ko.contextFor = function(node) {
	        // We can only do something meaningful for elements and comment nodes (in particular, not text nodes, as IE can't store domdata for them)
	        switch (node.nodeType) {
	            case 1:
	            case 8:
	                var context = ko.storedBindingContextForNode(node);
	                if (context) return context;
	                if (node.parentNode) return ko.contextFor(node.parentNode);
	                break;
	        }
	        return undefined;
	    };
	    ko.dataFor = function(node) {
	        var context = ko.contextFor(node);
	        return context ? context['$data'] : undefined;
	    };

	    ko.exportSymbol('bindingHandlers', ko.bindingHandlers);
	    ko.exportSymbol('applyBindings', ko.applyBindings);
	    ko.exportSymbol('applyBindingsToDescendants', ko.applyBindingsToDescendants);
	    ko.exportSymbol('applyBindingAccessorsToNode', ko.applyBindingAccessorsToNode);
	    ko.exportSymbol('applyBindingsToNode', ko.applyBindingsToNode);
	    ko.exportSymbol('contextFor', ko.contextFor);
	    ko.exportSymbol('dataFor', ko.dataFor);
	})();
	(function(undefined) {
	    var loadingSubscribablesCache = {}, // Tracks component loads that are currently in flight
	        loadedDefinitionsCache = {};    // Tracks component loads that have already completed

	    ko.components = {
	        get: function(componentName, callback) {
	            var cachedDefinition = getObjectOwnProperty(loadedDefinitionsCache, componentName);
	            if (cachedDefinition) {
	                // It's already loaded and cached. Reuse the same definition object.
	                // Note that for API consistency, even cache hits complete asynchronously.
	                setTimeout(function() { callback(cachedDefinition) }, 0);
	            } else {
	                // Join the loading process that is already underway, or start a new one.
	                loadComponentAndNotify(componentName, callback);
	            }
	        },

	        clearCachedDefinition: function(componentName) {
	            delete loadedDefinitionsCache[componentName];
	        },

	        _getFirstResultFromLoaders: getFirstResultFromLoaders
	    };

	    function getObjectOwnProperty(obj, propName) {
	        return obj.hasOwnProperty(propName) ? obj[propName] : undefined;
	    }

	    function loadComponentAndNotify(componentName, callback) {
	        var subscribable = getObjectOwnProperty(loadingSubscribablesCache, componentName),
	            completedAsync;
	        if (!subscribable) {
	            // It's not started loading yet. Start loading, and when it's done, move it to loadedDefinitionsCache.
	            subscribable = loadingSubscribablesCache[componentName] = new ko.subscribable();
	            beginLoadingComponent(componentName, function(definition) {
	                loadedDefinitionsCache[componentName] = definition;
	                delete loadingSubscribablesCache[componentName];

	                // For API consistency, all loads complete asynchronously. However we want to avoid
	                // adding an extra setTimeout if it's unnecessary (i.e., the completion is already
	                // async) since setTimeout(..., 0) still takes about 16ms or more on most browsers.
	                if (completedAsync) {
	                    subscribable['notifySubscribers'](definition);
	                } else {
	                    setTimeout(function() {
	                        subscribable['notifySubscribers'](definition);
	                    }, 0);
	                }
	            });
	            completedAsync = true;
	        }
	        subscribable.subscribe(callback);
	    }

	    function beginLoadingComponent(componentName, callback) {
	        getFirstResultFromLoaders('getConfig', [componentName], function(config) {
	            if (config) {
	                // We have a config, so now load its definition
	                getFirstResultFromLoaders('loadComponent', [componentName, config], function(definition) {
	                    callback(definition);
	                });
	            } else {
	                // The component has no config - it's unknown to all the loaders.
	                // Note that this is not an error (e.g., a module loading error) - that would abort the
	                // process and this callback would not run. For this callback to run, all loaders must
	                // have confirmed they don't know about this component.
	                callback(null);
	            }
	        });
	    }

	    function getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders) {
	        // On the first call in the stack, start with the full set of loaders
	        if (!candidateLoaders) {
	            candidateLoaders = ko.components['loaders'].slice(0); // Use a copy, because we'll be mutating this array
	        }

	        // Try the next candidate
	        var currentCandidateLoader = candidateLoaders.shift();
	        if (currentCandidateLoader) {
	            var methodInstance = currentCandidateLoader[methodName];
	            if (methodInstance) {
	                var wasAborted = false,
	                    synchronousReturnValue = methodInstance.apply(currentCandidateLoader, argsExceptCallback.concat(function(result) {
	                        if (wasAborted) {
	                            callback(null);
	                        } else if (result !== null) {
	                            // This candidate returned a value. Use it.
	                            callback(result);
	                        } else {
	                            // Try the next candidate
	                            getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	                        }
	                    }));

	                // Currently, loaders may not return anything synchronously. This leaves open the possibility
	                // that we'll extend the API to support synchronous return values in the future. It won't be
	                // a breaking change, because currently no loader is allowed to return anything except undefined.
	                if (synchronousReturnValue !== undefined) {
	                    wasAborted = true;

	                    // Method to suppress exceptions will remain undocumented. This is only to keep
	                    // KO's specs running tidily, since we can observe the loading got aborted without
	                    // having exceptions cluttering up the console too.
	                    if (!currentCandidateLoader['suppressLoaderExceptions']) {
	                        throw new Error('Component loaders must supply values by invoking the callback, not by returning values synchronously.');
	                    }
	                }
	            } else {
	                // This candidate doesn't have the relevant handler. Synchronously move on to the next one.
	                getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	            }
	        } else {
	            // No candidates returned a value
	            callback(null);
	        }
	    }

	    // Reference the loaders via string name so it's possible for developers
	    // to replace the whole array by assigning to ko.components.loaders
	    ko.components['loaders'] = [];

	    ko.exportSymbol('components', ko.components);
	    ko.exportSymbol('components.get', ko.components.get);
	    ko.exportSymbol('components.clearCachedDefinition', ko.components.clearCachedDefinition);
	})();
	(function(undefined) {

	    // The default loader is responsible for two things:
	    // 1. Maintaining the default in-memory registry of component configuration objects
	    //    (i.e., the thing you're writing to when you call ko.components.register(someName, ...))
	    // 2. Answering requests for components by fetching configuration objects
	    //    from that default in-memory registry and resolving them into standard
	    //    component definition objects (of the form { createViewModel: ..., template: ... })
	    // Custom loaders may override either of these facilities, i.e.,
	    // 1. To supply configuration objects from some other source (e.g., conventions)
	    // 2. Or, to resolve configuration objects by loading viewmodels/templates via arbitrary logic.

	    var defaultConfigRegistry = {};

	    ko.components.register = function(componentName, config) {
	        if (!config) {
	            throw new Error('Invalid configuration for ' + componentName);
	        }

	        if (ko.components.isRegistered(componentName)) {
	            throw new Error('Component ' + componentName + ' is already registered');
	        }

	        defaultConfigRegistry[componentName] = config;
	    }

	    ko.components.isRegistered = function(componentName) {
	        return componentName in defaultConfigRegistry;
	    }

	    ko.components.unregister = function(componentName) {
	        delete defaultConfigRegistry[componentName];
	        ko.components.clearCachedDefinition(componentName);
	    }

	    ko.components.defaultLoader = {
	        'getConfig': function(componentName, callback) {
	            var result = defaultConfigRegistry.hasOwnProperty(componentName)
	                ? defaultConfigRegistry[componentName]
	                : null;
	            callback(result);
	        },

	        'loadComponent': function(componentName, config, callback) {
	            var errorCallback = makeErrorCallback(componentName);
	            possiblyGetConfigFromAmd(errorCallback, config, function(loadedConfig) {
	                resolveConfig(componentName, errorCallback, loadedConfig, callback);
	            });
	        },

	        'loadTemplate': function(componentName, templateConfig, callback) {
	            resolveTemplate(makeErrorCallback(componentName), templateConfig, callback);
	        },

	        'loadViewModel': function(componentName, viewModelConfig, callback) {
	            resolveViewModel(makeErrorCallback(componentName), viewModelConfig, callback);
	        }
	    };

	    var createViewModelKey = 'createViewModel';

	    // Takes a config object of the form { template: ..., viewModel: ... }, and asynchronously convert it
	    // into the standard component definition format:
	    //    { template: <ArrayOfDomNodes>, createViewModel: function(params, componentInfo) { ... } }.
	    // Since both template and viewModel may need to be resolved asynchronously, both tasks are performed
	    // in parallel, and the results joined when both are ready. We don't depend on any promises infrastructure,
	    // so this is implemented manually below.
	    function resolveConfig(componentName, errorCallback, config, callback) {
	        var result = {},
	            makeCallBackWhenZero = 2,
	            tryIssueCallback = function() {
	                if (--makeCallBackWhenZero === 0) {
	                    callback(result);
	                }
	            },
	            templateConfig = config['template'],
	            viewModelConfig = config['viewModel'];

	        if (templateConfig) {
	            possiblyGetConfigFromAmd(errorCallback, templateConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadTemplate', [componentName, loadedConfig], function(resolvedTemplate) {
	                    result['template'] = resolvedTemplate;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }

	        if (viewModelConfig) {
	            possiblyGetConfigFromAmd(errorCallback, viewModelConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadViewModel', [componentName, loadedConfig], function(resolvedViewModel) {
	                    result[createViewModelKey] = resolvedViewModel;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }
	    }

	    function resolveTemplate(errorCallback, templateConfig, callback) {
	        if (typeof templateConfig === 'string') {
	            // Markup - parse it
	            callback(ko.utils.parseHtmlFragment(templateConfig));
	        } else if (templateConfig instanceof Array) {
	            // Assume already an array of DOM nodes - pass through unchanged
	            callback(templateConfig);
	        } else if (isDocumentFragment(templateConfig)) {
	            // Document fragment - use its child nodes
	            callback(ko.utils.makeArray(templateConfig.childNodes));
	        } else if (templateConfig['element']) {
	            var element = templateConfig['element'];
	            if (isDomElement(element)) {
	                // Element instance - copy its child nodes
	                callback(cloneNodesFromTemplateSourceElement(element));
	            } else if (typeof element === 'string') {
	                // Element ID - find it, then copy its child nodes
	                var elemInstance = document.getElementById(element);
	                if (elemInstance) {
	                    callback(cloneNodesFromTemplateSourceElement(elemInstance));
	                } else {
	                    errorCallback('Cannot find element with ID ' + element);
	                }
	            } else {
	                errorCallback('Unknown element type: ' + element);
	            }
	        } else {
	            errorCallback('Unknown template value: ' + templateConfig);
	        }
	    }

	    function resolveViewModel(errorCallback, viewModelConfig, callback) {
	        if (typeof viewModelConfig === 'function') {
	            // Constructor - convert to standard factory function format
	            // By design, this does *not* supply componentInfo to the constructor, as the intent is that
	            // componentInfo contains non-viewmodel data (e.g., the component's element) that should only
	            // be used in factory functions, not viewmodel constructors.
	            callback(function (params /*, componentInfo */) {
	                return new viewModelConfig(params);
	            });
	        } else if (typeof viewModelConfig[createViewModelKey] === 'function') {
	            // Already a factory function - use it as-is
	            callback(viewModelConfig[createViewModelKey]);
	        } else if ('instance' in viewModelConfig) {
	            // Fixed object instance - promote to createViewModel format for API consistency
	            var fixedInstance = viewModelConfig['instance'];
	            callback(function (params, componentInfo) {
	                return fixedInstance;
	            });
	        } else if ('viewModel' in viewModelConfig) {
	            // Resolved AMD module whose value is of the form { viewModel: ... }
	            resolveViewModel(errorCallback, viewModelConfig['viewModel'], callback);
	        } else {
	            errorCallback('Unknown viewModel value: ' + viewModelConfig);
	        }
	    }

	    function cloneNodesFromTemplateSourceElement(elemInstance) {
	        switch (ko.utils.tagNameLower(elemInstance)) {
	            case 'script':
	                return ko.utils.parseHtmlFragment(elemInstance.text);
	            case 'textarea':
	                return ko.utils.parseHtmlFragment(elemInstance.value);
	            case 'template':
	                // For browsers with proper <template> element support (i.e., where the .content property
	                // gives a document fragment), use that document fragment.
	                if (isDocumentFragment(elemInstance.content)) {
	                    return ko.utils.cloneNodes(elemInstance.content.childNodes);
	                }
	        }

	        // Regular elements such as <div>, and <template> elements on old browsers that don't really
	        // understand <template> and just treat it as a regular container
	        return ko.utils.cloneNodes(elemInstance.childNodes);
	    }

	    function isDomElement(obj) {
	        if (window['HTMLElement']) {
	            return obj instanceof HTMLElement;
	        } else {
	            return obj && obj.tagName && obj.nodeType === 1;
	        }
	    }

	    function isDocumentFragment(obj) {
	        if (window['DocumentFragment']) {
	            return obj instanceof DocumentFragment;
	        } else {
	            return obj && obj.nodeType === 11;
	        }
	    }

	    function possiblyGetConfigFromAmd(errorCallback, config, callback) {
	        if (typeof config['require'] === 'string') {
	            // The config is the value of an AMD module
	            if (require || window['require']) {
	                (require || window['require'])([config['require']], callback);
	            } else {
	                errorCallback('Uses require, but no AMD loader is present');
	            }
	        } else {
	            callback(config);
	        }
	    }

	    function makeErrorCallback(componentName) {
	        return function (message) {
	            throw new Error('Component \'' + componentName + '\': ' + message);
	        };
	    }

	    ko.exportSymbol('components.register', ko.components.register);
	    ko.exportSymbol('components.isRegistered', ko.components.isRegistered);
	    ko.exportSymbol('components.unregister', ko.components.unregister);

	    // Expose the default loader so that developers can directly ask it for configuration
	    // or to resolve configuration
	    ko.exportSymbol('components.defaultLoader', ko.components.defaultLoader);

	    // By default, the default loader is the only registered component loader
	    ko.components['loaders'].push(ko.components.defaultLoader);

	    // Privately expose the underlying config registry for use in old-IE shim
	    ko.components._allRegisteredComponents = defaultConfigRegistry;
	})();
	(function (undefined) {
	    // Overridable API for determining which component name applies to a given node. By overriding this,
	    // you can for example map specific tagNames to components that are not preregistered.
	    ko.components['getComponentNameForNode'] = function(node) {
	        var tagNameLower = ko.utils.tagNameLower(node);
	        return ko.components.isRegistered(tagNameLower) && tagNameLower;
	    };

	    ko.components.addBindingsForCustomElement = function(allBindings, node, bindingContext, valueAccessors) {
	        // Determine if it's really a custom element matching a component
	        if (node.nodeType === 1) {
	            var componentName = ko.components['getComponentNameForNode'](node);
	            if (componentName) {
	                // It does represent a component, so add a component binding for it
	                allBindings = allBindings || {};

	                if (allBindings['component']) {
	                    // Avoid silently overwriting some other 'component' binding that may already be on the element
	                    throw new Error('Cannot use the "component" binding on a custom element matching a component');
	                }

	                var componentBindingValue = { 'name': componentName, 'params': getComponentParamsFromCustomElement(node, bindingContext) };

	                allBindings['component'] = valueAccessors
	                    ? function() { return componentBindingValue; }
	                    : componentBindingValue;
	            }
	        }

	        return allBindings;
	    }

	    var nativeBindingProviderInstance = new ko.bindingProvider();

	    function getComponentParamsFromCustomElement(elem, bindingContext) {
	        var paramsAttribute = elem.getAttribute('params');

	        if (paramsAttribute) {
	            var params = nativeBindingProviderInstance['parseBindingsString'](paramsAttribute, bindingContext, elem, { 'valueAccessors': true, 'bindingParams': true }),
	                rawParamComputedValues = ko.utils.objectMap(params, function(paramValue, paramName) {
	                    return ko.computed(paramValue, null, { disposeWhenNodeIsRemoved: elem });
	                }),
	                result = ko.utils.objectMap(rawParamComputedValues, function(paramValueComputed, paramName) {
	                    // Does the evaluation of the parameter value unwrap any observables?
	                    if (!paramValueComputed.isActive()) {
	                        // No it doesn't, so there's no need for any computed wrapper. Just pass through the supplied value directly.
	                        // Example: "someVal: firstName, age: 123" (whether or not firstName is an observable/computed)
	                        return paramValueComputed.peek();
	                    } else {
	                        // Yes it does. Supply a computed property that unwraps both the outer (binding expression)
	                        // level of observability, and any inner (resulting model value) level of observability.
	                        // This means the component doesn't have to worry about multiple unwrapping.
	                        return ko.computed(function() {
	                            return ko.utils.unwrapObservable(paramValueComputed());
	                        }, null, { disposeWhenNodeIsRemoved: elem });
	                    }
	                });

	            // Give access to the raw computeds, as long as that wouldn't overwrite any custom param also called '$raw'
	            // This is in case the developer wants to react to outer (binding) observability separately from inner
	            // (model value) observability, or in case the model value observable has subobservables.
	            if (!result.hasOwnProperty('$raw')) {
	                result['$raw'] = rawParamComputedValues;
	            }

	            return result;
	        } else {
	            // For consistency, absence of a "params" attribute is treated the same as the presence of
	            // any empty one. Otherwise component viewmodels need special code to check whether or not
	            // 'params' or 'params.$raw' is null/undefined before reading subproperties, which is annoying.
	            return { '$raw': {} };
	        }
	    }

	    // --------------------------------------------------------------------------------
	    // Compatibility code for older (pre-HTML5) IE browsers

	    if (ko.utils.ieVersion < 9) {
	        // Whenever you preregister a component, enable it as a custom element in the current document
	        ko.components['register'] = (function(originalFunction) {
	            return function(componentName) {
	                document.createElement(componentName); // Allows IE<9 to parse markup containing the custom element
	                return originalFunction.apply(this, arguments);
	            }
	        })(ko.components['register']);

	        // Whenever you create a document fragment, enable all preregistered component names as custom elements
	        // This is needed to make innerShiv/jQuery HTML parsing correctly handle the custom elements
	        document.createDocumentFragment = (function(originalFunction) {
	            return function() {
	                var newDocFrag = originalFunction(),
	                    allComponents = ko.components._allRegisteredComponents;
	                for (var componentName in allComponents) {
	                    if (allComponents.hasOwnProperty(componentName)) {
	                        newDocFrag.createElement(componentName);
	                    }
	                }
	                return newDocFrag;
	            };
	        })(document.createDocumentFragment);
	    }
	})();(function(undefined) {

	    var componentLoadingOperationUniqueId = 0;

	    ko.bindingHandlers['component'] = {
	        'init': function(element, valueAccessor, ignored1, ignored2, bindingContext) {
	            var currentViewModel,
	                currentLoadingOperationId,
	                disposeAssociatedComponentViewModel = function () {
	                    var currentViewModelDispose = currentViewModel && currentViewModel['dispose'];
	                    if (typeof currentViewModelDispose === 'function') {
	                        currentViewModelDispose.call(currentViewModel);
	                    }

	                    // Any in-flight loading operation is no longer relevant, so make sure we ignore its completion
	                    currentLoadingOperationId = null;
	                };

	            ko.utils.domNodeDisposal.addDisposeCallback(element, disposeAssociatedComponentViewModel);

	            ko.computed(function () {
	                var value = ko.utils.unwrapObservable(valueAccessor()),
	                    componentName, componentParams;

	                if (typeof value === 'string') {
	                    componentName = value;
	                } else {
	                    componentName = ko.utils.unwrapObservable(value['name']);
	                    componentParams = ko.utils.unwrapObservable(value['params']);
	                }

	                if (!componentName) {
	                    throw new Error('No component name specified');
	                }

	                var loadingOperationId = currentLoadingOperationId = ++componentLoadingOperationUniqueId;
	                ko.components.get(componentName, function(componentDefinition) {
	                    // If this is not the current load operation for this element, ignore it.
	                    if (currentLoadingOperationId !== loadingOperationId) {
	                        return;
	                    }

	                    // Clean up previous state
	                    disposeAssociatedComponentViewModel();

	                    // Instantiate and bind new component. Implicitly this cleans any old DOM nodes.
	                    if (!componentDefinition) {
	                        throw new Error('Unknown component \'' + componentName + '\'');
	                    }
	                    cloneTemplateIntoElement(componentName, componentDefinition, element);
	                    var componentViewModel = createViewModel(componentDefinition, element, componentParams),
	                        childBindingContext = bindingContext['createChildContext'](componentViewModel);
	                    currentViewModel = componentViewModel;
	                    ko.applyBindingsToDescendants(childBindingContext, element);
	                });
	            }, null, { disposeWhenNodeIsRemoved: element });

	            return { 'controlsDescendantBindings': true };
	        }
	    };

	    ko.virtualElements.allowedBindings['component'] = true;

	    function cloneTemplateIntoElement(componentName, componentDefinition, element) {
	        var template = componentDefinition['template'];
	        if (!template) {
	            throw new Error('Component \'' + componentName + '\' has no template');
	        }

	        var clonedNodesArray = ko.utils.cloneNodes(template);
	        ko.virtualElements.setDomNodeChildren(element, clonedNodesArray);
	    }

	    function createViewModel(componentDefinition, element, componentParams) {
	        var componentViewModelFactory = componentDefinition['createViewModel'];
	        return componentViewModelFactory
	            ? componentViewModelFactory.call(componentDefinition, componentParams, { element: element })
	            : componentParams; // Template-only component
	    }

	})();
	var attrHtmlToJavascriptMap = { 'class': 'className', 'for': 'htmlFor' };
	ko.bindingHandlers['attr'] = {
	    'update': function(element, valueAccessor, allBindings) {
	        var value = ko.utils.unwrapObservable(valueAccessor()) || {};
	        ko.utils.objectForEach(value, function(attrName, attrValue) {
	            attrValue = ko.utils.unwrapObservable(attrValue);

	            // To cover cases like "attr: { checked:someProp }", we want to remove the attribute entirely
	            // when someProp is a "no value"-like value (strictly null, false, or undefined)
	            // (because the absence of the "checked" attr is how to mark an element as not checked, etc.)
	            var toRemove = (attrValue === false) || (attrValue === null) || (attrValue === undefined);
	            if (toRemove)
	                element.removeAttribute(attrName);

	            // In IE <= 7 and IE8 Quirks Mode, you have to use the Javascript property name instead of the
	            // HTML attribute name for certain attributes. IE8 Standards Mode supports the correct behavior,
	            // but instead of figuring out the mode, we'll just set the attribute through the Javascript
	            // property for IE <= 8.
	            if (ko.utils.ieVersion <= 8 && attrName in attrHtmlToJavascriptMap) {
	                attrName = attrHtmlToJavascriptMap[attrName];
	                if (toRemove)
	                    element.removeAttribute(attrName);
	                else
	                    element[attrName] = attrValue;
	            } else if (!toRemove) {
	                element.setAttribute(attrName, attrValue.toString());
	            }

	            // Treat "name" specially - although you can think of it as an attribute, it also needs
	            // special handling on older versions of IE (https://github.com/SteveSanderson/knockout/pull/333)
	            // Deliberately being case-sensitive here because XHTML would regard "Name" as a different thing
	            // entirely, and there's no strong reason to allow for such casing in HTML.
	            if (attrName === "name") {
	                ko.utils.setElementName(element, toRemove ? "" : attrValue.toString());
	            }
	        });
	    }
	};
	(function() {

	ko.bindingHandlers['checked'] = {
	    'after': ['value', 'attr'],
	    'init': function (element, valueAccessor, allBindings) {
	        var checkedValue = ko.pureComputed(function() {
	            // Treat "value" like "checkedValue" when it is included with "checked" binding
	            if (allBindings['has']('checkedValue')) {
	                return ko.utils.unwrapObservable(allBindings.get('checkedValue'));
	            } else if (allBindings['has']('value')) {
	                return ko.utils.unwrapObservable(allBindings.get('value'));
	            }

	            return element.value;
	        });

	        function updateModel() {
	            // This updates the model value from the view value.
	            // It runs in response to DOM events (click) and changes in checkedValue.
	            var isChecked = element.checked,
	                elemValue = useCheckedValue ? checkedValue() : isChecked;

	            // When we're first setting up this computed, don't change any model state.
	            if (ko.computedContext.isInitial()) {
	                return;
	            }

	            // We can ignore unchecked radio buttons, because some other radio
	            // button will be getting checked, and that one can take care of updating state.
	            if (isRadio && !isChecked) {
	                return;
	            }

	            var modelValue = ko.dependencyDetection.ignore(valueAccessor);
	            if (isValueArray) {
	                if (oldElemValue !== elemValue) {
	                    // When we're responding to the checkedValue changing, and the element is
	                    // currently checked, replace the old elem value with the new elem value
	                    // in the model array.
	                    if (isChecked) {
	                        ko.utils.addOrRemoveItem(modelValue, elemValue, true);
	                        ko.utils.addOrRemoveItem(modelValue, oldElemValue, false);
	                    }

	                    oldElemValue = elemValue;
	                } else {
	                    // When we're responding to the user having checked/unchecked a checkbox,
	                    // add/remove the element value to the model array.
	                    ko.utils.addOrRemoveItem(modelValue, elemValue, isChecked);
	                }
	            } else {
	                ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'checked', elemValue, true);
	            }
	        };

	        function updateView() {
	            // This updates the view value from the model value.
	            // It runs in response to changes in the bound (checked) value.
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());

	            if (isValueArray) {
	                // When a checkbox is bound to an array, being checked represents its value being present in that array
	                element.checked = ko.utils.arrayIndexOf(modelValue, checkedValue()) >= 0;
	            } else if (isCheckbox) {
	                // When a checkbox is bound to any other value (not an array), being checked represents the value being trueish
	                element.checked = modelValue;
	            } else {
	                // For radio buttons, being checked means that the radio button's value corresponds to the model value
	                element.checked = (checkedValue() === modelValue);
	            }
	        };

	        var isCheckbox = element.type == "checkbox",
	            isRadio = element.type == "radio";

	        // Only bind to check boxes and radio buttons
	        if (!isCheckbox && !isRadio) {
	            return;
	        }

	        var isValueArray = isCheckbox && (ko.utils.unwrapObservable(valueAccessor()) instanceof Array),
	            oldElemValue = isValueArray ? checkedValue() : undefined,
	            useCheckedValue = isRadio || isValueArray;

	        // IE 6 won't allow radio buttons to be selected unless they have a name
	        if (isRadio && !element.name)
	            ko.bindingHandlers['uniqueName']['init'](element, function() { return true });

	        // Set up two computeds to update the binding:

	        // The first responds to changes in the checkedValue value and to element clicks
	        ko.computed(updateModel, null, { disposeWhenNodeIsRemoved: element });
	        ko.utils.registerEventHandler(element, "click", updateModel);

	        // The second responds to changes in the model value (the one associated with the checked binding)
	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	    }
	};
	ko.expressionRewriting.twoWayBindings['checked'] = true;

	ko.bindingHandlers['checkedValue'] = {
	    'update': function (element, valueAccessor) {
	        element.value = ko.utils.unwrapObservable(valueAccessor());
	    }
	};

	})();var classesWrittenByBindingKey = '__ko__cssValue';
	ko.bindingHandlers['css'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (typeof value == "object") {
	            ko.utils.objectForEach(value, function(className, shouldHaveClass) {
	                shouldHaveClass = ko.utils.unwrapObservable(shouldHaveClass);
	                ko.utils.toggleDomNodeCssClass(element, className, shouldHaveClass);
	            });
	        } else {
	            value = String(value || ''); // Make sure we don't try to store or set a non-string value
	            ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
	            element[classesWrittenByBindingKey] = value;
	            ko.utils.toggleDomNodeCssClass(element, value, true);
	        }
	    }
	};
	ko.bindingHandlers['enable'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (value && element.disabled)
	            element.removeAttribute("disabled");
	        else if ((!value) && (!element.disabled))
	            element.disabled = true;
	    }
	};

	ko.bindingHandlers['disable'] = {
	    'update': function (element, valueAccessor) {
	        ko.bindingHandlers['enable']['update'](element, function() { return !ko.utils.unwrapObservable(valueAccessor()) });
	    }
	};
	// For certain common events (currently just 'click'), allow a simplified data-binding syntax
	// e.g. click:handler instead of the usual full-length event:{click:handler}
	function makeEventHandlerShortcut(eventName) {
	    ko.bindingHandlers[eventName] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var newValueAccessor = function () {
	                var result = {};
	                result[eventName] = valueAccessor();
	                return result;
	            };
	            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindings, viewModel, bindingContext);
	        }
	    }
	}

	ko.bindingHandlers['event'] = {
	    'init' : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        var eventsToHandle = valueAccessor() || {};
	        ko.utils.objectForEach(eventsToHandle, function(eventName) {
	            if (typeof eventName == "string") {
	                ko.utils.registerEventHandler(element, eventName, function (event) {
	                    var handlerReturnValue;
	                    var handlerFunction = valueAccessor()[eventName];
	                    if (!handlerFunction)
	                        return;

	                    try {
	                        // Take all the event args, and prefix with the viewmodel
	                        var argsForHandler = ko.utils.makeArray(arguments);
	                        viewModel = bindingContext['$data'];
	                        argsForHandler.unshift(viewModel);
	                        handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);
	                    } finally {
	                        if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                            if (event.preventDefault)
	                                event.preventDefault();
	                            else
	                                event.returnValue = false;
	                        }
	                    }

	                    var bubble = allBindings.get(eventName + 'Bubble') !== false;
	                    if (!bubble) {
	                        event.cancelBubble = true;
	                        if (event.stopPropagation)
	                            event.stopPropagation();
	                    }
	                });
	            }
	        });
	    }
	};
	// "foreach: someExpression" is equivalent to "template: { foreach: someExpression }"
	// "foreach: { data: someExpression, afterAdd: myfn }" is equivalent to "template: { foreach: someExpression, afterAdd: myfn }"
	ko.bindingHandlers['foreach'] = {
	    makeTemplateValueAccessor: function(valueAccessor) {
	        return function() {
	            var modelValue = valueAccessor(),
	                unwrappedValue = ko.utils.peekObservable(modelValue);    // Unwrap without setting a dependency here

	            // If unwrappedValue is the array, pass in the wrapped value on its own
	            // The value will be unwrapped and tracked within the template binding
	            // (See https://github.com/SteveSanderson/knockout/issues/523)
	            if ((!unwrappedValue) || typeof unwrappedValue.length == "number")
	                return { 'foreach': modelValue, 'templateEngine': ko.nativeTemplateEngine.instance };

	            // If unwrappedValue.data is the array, preserve all relevant options and unwrap again value so we get updates
	            ko.utils.unwrapObservable(modelValue);
	            return {
	                'foreach': unwrappedValue['data'],
	                'as': unwrappedValue['as'],
	                'includeDestroyed': unwrappedValue['includeDestroyed'],
	                'afterAdd': unwrappedValue['afterAdd'],
	                'beforeRemove': unwrappedValue['beforeRemove'],
	                'afterRender': unwrappedValue['afterRender'],
	                'beforeMove': unwrappedValue['beforeMove'],
	                'afterMove': unwrappedValue['afterMove'],
	                'templateEngine': ko.nativeTemplateEngine.instance
	            };
	        };
	    },
	    'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor));
	    },
	    'update': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor), allBindings, viewModel, bindingContext);
	    }
	};
	ko.expressionRewriting.bindingRewriteValidators['foreach'] = false; // Can't rewrite control flow bindings
	ko.virtualElements.allowedBindings['foreach'] = true;
	var hasfocusUpdatingProperty = '__ko_hasfocusUpdating';
	var hasfocusLastValue = '__ko_hasfocusLastValue';
	ko.bindingHandlers['hasfocus'] = {
	    'init': function(element, valueAccessor, allBindings) {
	        var handleElementFocusChange = function(isFocused) {
	            // Where possible, ignore which event was raised and determine focus state using activeElement,
	            // as this avoids phantom focus/blur events raised when changing tabs in modern browsers.
	            // However, not all KO-targeted browsers (Firefox 2) support activeElement. For those browsers,
	            // prevent a loss of focus when changing tabs/windows by setting a flag that prevents hasfocus
	            // from calling 'blur()' on the element when it loses focus.
	            // Discussion at https://github.com/SteveSanderson/knockout/pull/352
	            element[hasfocusUpdatingProperty] = true;
	            var ownerDoc = element.ownerDocument;
	            if ("activeElement" in ownerDoc) {
	                var active;
	                try {
	                    active = ownerDoc.activeElement;
	                } catch(e) {
	                    // IE9 throws if you access activeElement during page load (see issue #703)
	                    active = ownerDoc.body;
	                }
	                isFocused = (active === element);
	            }
	            var modelValue = valueAccessor();
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'hasfocus', isFocused, true);

	            //cache the latest value, so we can avoid unnecessarily calling focus/blur in the update function
	            element[hasfocusLastValue] = isFocused;
	            element[hasfocusUpdatingProperty] = false;
	        };
	        var handleElementFocusIn = handleElementFocusChange.bind(null, true);
	        var handleElementFocusOut = handleElementFocusChange.bind(null, false);

	        ko.utils.registerEventHandler(element, "focus", handleElementFocusIn);
	        ko.utils.registerEventHandler(element, "focusin", handleElementFocusIn); // For IE
	        ko.utils.registerEventHandler(element, "blur",  handleElementFocusOut);
	        ko.utils.registerEventHandler(element, "focusout",  handleElementFocusOut); // For IE
	    },
	    'update': function(element, valueAccessor) {
	        var value = !!ko.utils.unwrapObservable(valueAccessor()); //force boolean to compare with last value
	        if (!element[hasfocusUpdatingProperty] && element[hasfocusLastValue] !== value) {
	            value ? element.focus() : element.blur();
	            ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, value ? "focusin" : "focusout"]); // For IE, which doesn't reliably fire "focus" or "blur" events synchronously
	        }
	    }
	};
	ko.expressionRewriting.twoWayBindings['hasfocus'] = true;

	ko.bindingHandlers['hasFocus'] = ko.bindingHandlers['hasfocus']; // Make "hasFocus" an alias
	ko.expressionRewriting.twoWayBindings['hasFocus'] = true;
	ko.bindingHandlers['html'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected HTML (as developers are unlikely to expect that, and it has security implications)
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        // setHtml will unwrap the value if needed
	        ko.utils.setHtml(element, valueAccessor());
	    }
	};
	// Makes a binding like with or if
	function makeWithIfBinding(bindingKey, isWith, isNot, makeContextCallback) {
	    ko.bindingHandlers[bindingKey] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var didDisplayOnLastUpdate,
	                savedNodes;
	            ko.computed(function() {
	                var dataValue = ko.utils.unwrapObservable(valueAccessor()),
	                    shouldDisplay = !isNot !== !dataValue, // equivalent to isNot ? !dataValue : !!dataValue
	                    isFirstRender = !savedNodes,
	                    needsRefresh = isFirstRender || isWith || (shouldDisplay !== didDisplayOnLastUpdate);

	                if (needsRefresh) {
	                    // Save a copy of the inner nodes on the initial update, but only if we have dependencies.
	                    if (isFirstRender && ko.computedContext.getDependenciesCount()) {
	                        savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
	                    }

	                    if (shouldDisplay) {
	                        if (!isFirstRender) {
	                            ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(savedNodes));
	                        }
	                        ko.applyBindingsToDescendants(makeContextCallback ? makeContextCallback(bindingContext, dataValue) : bindingContext, element);
	                    } else {
	                        ko.virtualElements.emptyNode(element);
	                    }

	                    didDisplayOnLastUpdate = shouldDisplay;
	                }
	            }, null, { disposeWhenNodeIsRemoved: element });
	            return { 'controlsDescendantBindings': true };
	        }
	    };
	    ko.expressionRewriting.bindingRewriteValidators[bindingKey] = false; // Can't rewrite control flow bindings
	    ko.virtualElements.allowedBindings[bindingKey] = true;
	}

	// Construct the actual binding handlers
	makeWithIfBinding('if');
	makeWithIfBinding('ifnot', false /* isWith */, true /* isNot */);
	makeWithIfBinding('with', true /* isWith */, false /* isNot */,
	    function(bindingContext, dataValue) {
	        return bindingContext['createChildContext'](dataValue);
	    }
	);
	var captionPlaceholder = {};
	ko.bindingHandlers['options'] = {
	    'init': function(element) {
	        if (ko.utils.tagNameLower(element) !== "select")
	            throw new Error("options binding applies only to SELECT elements");

	        // Remove all existing <option>s.
	        while (element.length > 0) {
	            element.remove(0);
	        }

	        // Ensures that the binding processor doesn't try to bind the options
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor, allBindings) {
	        function selectedOptions() {
	            return ko.utils.arrayFilter(element.options, function (node) { return node.selected; });
	        }

	        var selectWasPreviouslyEmpty = element.length == 0;
	        var previousScrollTop = (!selectWasPreviouslyEmpty && element.multiple) ? element.scrollTop : null;
	        var unwrappedArray = ko.utils.unwrapObservable(valueAccessor());
	        var includeDestroyed = allBindings.get('optionsIncludeDestroyed');
	        var arrayToDomNodeChildrenOptions = {};
	        var captionValue;
	        var filteredArray;
	        var previousSelectedValues;

	        if (element.multiple) {
	            previousSelectedValues = ko.utils.arrayMap(selectedOptions(), ko.selectExtensions.readValue);
	        } else {
	            previousSelectedValues = element.selectedIndex >= 0 ? [ ko.selectExtensions.readValue(element.options[element.selectedIndex]) ] : [];
	        }

	        if (unwrappedArray) {
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];

	            // Filter out any entries marked as destroyed
	            filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return includeDestroyed || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });

	            // If caption is included, add it to the array
	            if (allBindings['has']('optionsCaption')) {
	                captionValue = ko.utils.unwrapObservable(allBindings.get('optionsCaption'));
	                // If caption value is null or undefined, don't show a caption
	                if (captionValue !== null && captionValue !== undefined) {
	                    filteredArray.unshift(captionPlaceholder);
	                }
	            }
	        } else {
	            // If a falsy value is provided (e.g. null), we'll simply empty the select element
	        }

	        function applyToObject(object, predicate, defaultValue) {
	            var predicateType = typeof predicate;
	            if (predicateType == "function")    // Given a function; run it against the data value
	                return predicate(object);
	            else if (predicateType == "string") // Given a string; treat it as a property name on the data value
	                return object[predicate];
	            else                                // Given no optionsText arg; use the data value itself
	                return defaultValue;
	        }

	        // The following functions can run at two different times:
	        // The first is when the whole array is being updated directly from this binding handler.
	        // The second is when an observable value for a specific array entry is updated.
	        // oldOptions will be empty in the first case, but will be filled with the previously generated option in the second.
	        var itemUpdate = false;
	        function optionForArrayItem(arrayEntry, index, oldOptions) {
	            if (oldOptions.length) {
	                previousSelectedValues = oldOptions[0].selected ? [ ko.selectExtensions.readValue(oldOptions[0]) ] : [];
	                itemUpdate = true;
	            }
	            var option = element.ownerDocument.createElement("option");
	            if (arrayEntry === captionPlaceholder) {
	                ko.utils.setTextContent(option, allBindings.get('optionsCaption'));
	                ko.selectExtensions.writeValue(option, undefined);
	            } else {
	                // Apply a value to the option element
	                var optionValue = applyToObject(arrayEntry, allBindings.get('optionsValue'), arrayEntry);
	                ko.selectExtensions.writeValue(option, ko.utils.unwrapObservable(optionValue));

	                // Apply some text to the option element
	                var optionText = applyToObject(arrayEntry, allBindings.get('optionsText'), optionValue);
	                ko.utils.setTextContent(option, optionText);
	            }
	            return [option];
	        }

	        // By using a beforeRemove callback, we delay the removal until after new items are added. This fixes a selection
	        // problem in IE<=8 and Firefox. See https://github.com/knockout/knockout/issues/1208
	        arrayToDomNodeChildrenOptions['beforeRemove'] =
	            function (option) {
	                element.removeChild(option);
	            };

	        function setSelectionCallback(arrayEntry, newOptions) {
	            // IE6 doesn't like us to assign selection to OPTION nodes before they're added to the document.
	            // That's why we first added them without selection. Now it's time to set the selection.
	            if (previousSelectedValues.length) {
	                var isSelected = ko.utils.arrayIndexOf(previousSelectedValues, ko.selectExtensions.readValue(newOptions[0])) >= 0;
	                ko.utils.setOptionNodeSelectionState(newOptions[0], isSelected);

	                // If this option was changed from being selected during a single-item update, notify the change
	                if (itemUpdate && !isSelected)
	                    ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	            }
	        }

	        var callback = setSelectionCallback;
	        if (allBindings['has']('optionsAfterRender')) {
	            callback = function(arrayEntry, newOptions) {
	                setSelectionCallback(arrayEntry, newOptions);
	                ko.dependencyDetection.ignore(allBindings.get('optionsAfterRender'), null, [newOptions[0], arrayEntry !== captionPlaceholder ? arrayEntry : undefined]);
	            }
	        }

	        ko.utils.setDomNodeChildrenFromArrayMapping(element, filteredArray, optionForArrayItem, arrayToDomNodeChildrenOptions, callback);

	        ko.dependencyDetection.ignore(function () {
	            if (allBindings.get('valueAllowUnset') && allBindings['has']('value')) {
	                // The model value is authoritative, so make sure its value is the one selected
	                ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(allBindings.get('value')), true /* allowUnset */);
	            } else {
	                // Determine if the selection has changed as a result of updating the options list
	                var selectionChanged;
	                if (element.multiple) {
	                    // For a multiple-select box, compare the new selection count to the previous one
	                    // But if nothing was selected before, the selection can't have changed
	                    selectionChanged = previousSelectedValues.length && selectedOptions().length < previousSelectedValues.length;
	                } else {
	                    // For a single-select box, compare the current value to the previous value
	                    // But if nothing was selected before or nothing is selected now, just look for a change in selection
	                    selectionChanged = (previousSelectedValues.length && element.selectedIndex >= 0)
	                        ? (ko.selectExtensions.readValue(element.options[element.selectedIndex]) !== previousSelectedValues[0])
	                        : (previousSelectedValues.length || element.selectedIndex >= 0);
	                }

	                // Ensure consistency between model value and selected option.
	                // If the dropdown was changed so that selection is no longer the same,
	                // notify the value or selectedOptions binding.
	                if (selectionChanged) {
	                    ko.utils.triggerEvent(element, "change");
	                }
	            }
	        });

	        // Workaround for IE bug
	        ko.utils.ensureSelectElementIsRenderedCorrectly(element);

	        if (previousScrollTop && Math.abs(previousScrollTop - element.scrollTop) > 20)
	            element.scrollTop = previousScrollTop;
	    }
	};
	ko.bindingHandlers['options'].optionValueDomDataKey = ko.utils.domData.nextKey();
	ko.bindingHandlers['selectedOptions'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        ko.utils.registerEventHandler(element, "change", function () {
	            var value = valueAccessor(), valueToWrite = [];
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                if (node.selected)
	                    valueToWrite.push(ko.selectExtensions.readValue(node));
	            });
	            ko.expressionRewriting.writeValueToProperty(value, allBindings, 'selectedOptions', valueToWrite);
	        });
	    },
	    'update': function (element, valueAccessor) {
	        if (ko.utils.tagNameLower(element) != "select")
	            throw new Error("values binding applies only to SELECT elements");

	        var newValue = ko.utils.unwrapObservable(valueAccessor());
	        if (newValue && typeof newValue.length == "number") {
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                var isSelected = ko.utils.arrayIndexOf(newValue, ko.selectExtensions.readValue(node)) >= 0;
	                ko.utils.setOptionNodeSelectionState(node, isSelected);
	            });
	        }
	    }
	};
	ko.expressionRewriting.twoWayBindings['selectedOptions'] = true;
	ko.bindingHandlers['style'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor() || {});
	        ko.utils.objectForEach(value, function(styleName, styleValue) {
	            styleValue = ko.utils.unwrapObservable(styleValue);

	            if (styleValue === null || styleValue === undefined || styleValue === false) {
	                // Empty string removes the value, whereas null/undefined have no effect
	                styleValue = "";
	            }

	            element.style[styleName] = styleValue;
	        });
	    }
	};
	ko.bindingHandlers['submit'] = {
	    'init': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        if (typeof valueAccessor() != "function")
	            throw new Error("The value for a submit binding must be a function");
	        ko.utils.registerEventHandler(element, "submit", function (event) {
	            var handlerReturnValue;
	            var value = valueAccessor();
	            try { handlerReturnValue = value.call(bindingContext['$data'], element); }
	            finally {
	                if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                    if (event.preventDefault)
	                        event.preventDefault();
	                    else
	                        event.returnValue = false;
	                }
	            }
	        });
	    }
	};
	ko.bindingHandlers['text'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected text node (as developers are unlikely to expect that, and it has security implications).
	        // It should also make things faster, as we no longer have to consider whether the text node might be bindable.
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        ko.utils.setTextContent(element, valueAccessor());
	    }
	};
	ko.virtualElements.allowedBindings['text'] = true;
	(function () {

	if (window && window.navigator) {
	    var parseVersion = function (matches) {
	        if (matches) {
	            return parseFloat(matches[1]);
	        }
	    };

	    // Detect various browser versions because some old versions don't fully support the 'input' event
	    var operaVersion = window.opera && window.opera.version && parseInt(window.opera.version()),
	        userAgent = window.navigator.userAgent,
	        safariVersion = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),
	        firefoxVersion = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
	}

	// IE 8 and 9 have bugs that prevent the normal events from firing when the value changes.
	// But it does fire the 'selectionchange' event on many of those, presumably because the
	// cursor is moving and that counts as the selection changing. The 'selectionchange' event is
	// fired at the document level only and doesn't directly indicate which element changed. We
	// set up just one event handler for the document and use 'activeElement' to determine which
	// element was changed.
	if (ko.utils.ieVersion < 10) {
	    var selectionChangeRegisteredName = ko.utils.domData.nextKey(),
	        selectionChangeHandlerName = ko.utils.domData.nextKey();
	    var selectionChangeHandler = function(event) {
	        var target = this.activeElement,
	            handler = target && ko.utils.domData.get(target, selectionChangeHandlerName);
	        if (handler) {
	            handler(event);
	        }
	    };
	    var registerForSelectionChangeEvent = function (element, handler) {
	        var ownerDoc = element.ownerDocument;
	        if (!ko.utils.domData.get(ownerDoc, selectionChangeRegisteredName)) {
	            ko.utils.domData.set(ownerDoc, selectionChangeRegisteredName, true);
	            ko.utils.registerEventHandler(ownerDoc, 'selectionchange', selectionChangeHandler);
	        }
	        ko.utils.domData.set(element, selectionChangeHandlerName, handler);
	    };
	}

	ko.bindingHandlers['textInput'] = {
	    'init': function (element, valueAccessor, allBindings) {

	        var previousElementValue = element.value,
	            timeoutHandle,
	            elementValueBeforeEvent;

	        var updateModel = function (event) {
	            clearTimeout(timeoutHandle);
	            elementValueBeforeEvent = timeoutHandle = undefined;

	            var elementValue = element.value;
	            if (previousElementValue !== elementValue) {
	                // Provide a way for tests to know exactly which event was processed
	                if (DEBUG && event) element['_ko_textInputProcessedEvent'] = event.type;
	                previousElementValue = elementValue;
	                ko.expressionRewriting.writeValueToProperty(valueAccessor(), allBindings, 'textInput', elementValue);
	            }
	        };

	        var deferUpdateModel = function (event) {
	            if (!timeoutHandle) {
	                // The elementValueBeforeEvent variable is set *only* during the brief gap between an
	                // event firing and the updateModel function running. This allows us to ignore model
	                // updates that are from the previous state of the element, usually due to techniques
	                // such as rateLimit. Such updates, if not ignored, can cause keystrokes to be lost.
	                elementValueBeforeEvent = element.value;
	                var handler = DEBUG ? updateModel.bind(element, {type: event.type}) : updateModel;
	                timeoutHandle = setTimeout(handler, 4);
	            }
	        };

	        var updateView = function () {
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());

	            if (modelValue === null || modelValue === undefined) {
	                modelValue = '';
	            }

	            if (elementValueBeforeEvent !== undefined && modelValue === elementValueBeforeEvent) {
	                setTimeout(updateView, 4);
	                return;
	            }

	            // Update the element only if the element and model are different. On some browsers, updating the value
	            // will move the cursor to the end of the input, which would be bad while the user is typing.
	            if (element.value !== modelValue) {
	                previousElementValue = modelValue;  // Make sure we ignore events (propertychange) that result from updating the value
	                element.value = modelValue;
	            }
	        };

	        var onEvent = function (event, handler) {
	            ko.utils.registerEventHandler(element, event, handler);
	        };

	        if (DEBUG && ko.bindingHandlers['textInput']['_forceUpdateOn']) {
	            // Provide a way for tests to specify exactly which events are bound
	            ko.utils.arrayForEach(ko.bindingHandlers['textInput']['_forceUpdateOn'], function(eventName) {
	                if (eventName.slice(0,5) == 'after') {
	                    onEvent(eventName.slice(5), deferUpdateModel);
	                } else {
	                    onEvent(eventName, updateModel);
	                }
	            });
	        } else {
	            if (ko.utils.ieVersion < 10) {
	                // Internet Explorer <= 8 doesn't support the 'input' event, but does include 'propertychange' that fires whenever
	                // any property of an element changes. Unlike 'input', it also fires if a property is changed from JavaScript code,
	                // but that's an acceptable compromise for this binding. IE 9 does support 'input', but since it doesn't fire it
	                // when using autocomplete, we'll use 'propertychange' for it also.
	                onEvent('propertychange', function(event) {
	                    if (event.propertyName === 'value') {
	                        updateModel(event);
	                    }
	                });

	                if (ko.utils.ieVersion == 8) {
	                    // IE 8 has a bug where it fails to fire 'propertychange' on the first update following a value change from
	                    // JavaScript code. It also doesn't fire if you clear the entire value. To fix this, we bind to the following
	                    // events too.
	                    onEvent('keyup', updateModel);      // A single keystoke
	                    onEvent('keydown', updateModel);    // The first character when a key is held down
	                }
	                if (ko.utils.ieVersion >= 8) {
	                    // Internet Explorer 9 doesn't fire the 'input' event when deleting text, including using
	                    // the backspace, delete, or ctrl-x keys, clicking the 'x' to clear the input, dragging text
	                    // out of the field, and cutting or deleting text using the context menu. 'selectionchange'
	                    // can detect all of those except dragging text out of the field, for which we use 'dragend'.
	                    // These are also needed in IE8 because of the bug described above.
	                    registerForSelectionChangeEvent(element, updateModel);  // 'selectionchange' covers cut, paste, drop, delete, etc.
	                    onEvent('dragend', deferUpdateModel);
	                }
	            } else {
	                // All other supported browsers support the 'input' event, which fires whenever the content of the element is changed
	                // through the user interface.
	                onEvent('input', updateModel);

	                if (safariVersion < 5 && ko.utils.tagNameLower(element) === "textarea") {
	                    // Safari <5 doesn't fire the 'input' event for <textarea> elements (it does fire 'textInput'
	                    // but only when typing). So we'll just catch as much as we can with keydown, cut, and paste.
	                    onEvent('keydown', deferUpdateModel);
	                    onEvent('paste', deferUpdateModel);
	                    onEvent('cut', deferUpdateModel);
	                } else if (operaVersion < 11) {
	                    // Opera 10 doesn't always fire the 'input' event for cut, paste, undo & drop operations.
	                    // We can try to catch some of those using 'keydown'.
	                    onEvent('keydown', deferUpdateModel);
	                } else if (firefoxVersion < 4.0) {
	                    // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                    onEvent('DOMAutoComplete', updateModel);

	                    // Firefox <=3.5 doesn't fire the 'input' event when text is dropped into the input.
	                    onEvent('dragdrop', updateModel);       // <3.5
	                    onEvent('drop', updateModel);           // 3.5
	                }
	            }
	        }

	        // Bind to the change event so that we can catch programmatic updates of the value that fire this event.
	        onEvent('change', updateModel);

	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	    }
	};
	ko.expressionRewriting.twoWayBindings['textInput'] = true;

	// textinput is an alias for textInput
	ko.bindingHandlers['textinput'] = {
	    // preprocess is the only way to set up a full alias
	    'preprocess': function (value, name, addBinding) {
	        addBinding('textInput', value);
	    }
	};

	})();ko.bindingHandlers['uniqueName'] = {
	    'init': function (element, valueAccessor) {
	        if (valueAccessor()) {
	            var name = "ko_unique_" + (++ko.bindingHandlers['uniqueName'].currentIndex);
	            ko.utils.setElementName(element, name);
	        }
	    }
	};
	ko.bindingHandlers['uniqueName'].currentIndex = 0;
	ko.bindingHandlers['value'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        // If the value binding is placed on a radio/checkbox, then just pass through to checkedValue and quit
	        if (element.tagName.toLowerCase() == "input" && (element.type == "checkbox" || element.type == "radio")) {
	            ko.applyBindingAccessorsToNode(element, { 'checkedValue': valueAccessor });
	            return;
	        }

	        // Always catch "change" event; possibly other events too if asked
	        var eventsToCatch = ["change"];
	        var requestedEventsToCatch = allBindings.get("valueUpdate");
	        var propertyChangedFired = false;
	        var elementValueBeforeEvent = null;

	        if (requestedEventsToCatch) {
	            if (typeof requestedEventsToCatch == "string") // Allow both individual event names, and arrays of event names
	                requestedEventsToCatch = [requestedEventsToCatch];
	            ko.utils.arrayPushAll(eventsToCatch, requestedEventsToCatch);
	            eventsToCatch = ko.utils.arrayGetDistinctValues(eventsToCatch);
	        }

	        var valueUpdateHandler = function() {
	            elementValueBeforeEvent = null;
	            propertyChangedFired = false;
	            var modelValue = valueAccessor();
	            var elementValue = ko.selectExtensions.readValue(element);
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'value', elementValue);
	        }

	        // Workaround for https://github.com/SteveSanderson/knockout/issues/122
	        // IE doesn't fire "change" events on textboxes if the user selects a value from its autocomplete list
	        var ieAutoCompleteHackNeeded = ko.utils.ieVersion && element.tagName.toLowerCase() == "input" && element.type == "text"
	                                       && element.autocomplete != "off" && (!element.form || element.form.autocomplete != "off");
	        if (ieAutoCompleteHackNeeded && ko.utils.arrayIndexOf(eventsToCatch, "propertychange") == -1) {
	            ko.utils.registerEventHandler(element, "propertychange", function () { propertyChangedFired = true });
	            ko.utils.registerEventHandler(element, "focus", function () { propertyChangedFired = false });
	            ko.utils.registerEventHandler(element, "blur", function() {
	                if (propertyChangedFired) {
	                    valueUpdateHandler();
	                }
	            });
	        }

	        ko.utils.arrayForEach(eventsToCatch, function(eventName) {
	            // The syntax "after<eventname>" means "run the handler asynchronously after the event"
	            // This is useful, for example, to catch "keydown" events after the browser has updated the control
	            // (otherwise, ko.selectExtensions.readValue(this) will receive the control's value *before* the key event)
	            var handler = valueUpdateHandler;
	            if (ko.utils.stringStartsWith(eventName, "after")) {
	                handler = function() {
	                    // The elementValueBeforeEvent variable is non-null *only* during the brief gap between
	                    // a keyX event firing and the valueUpdateHandler running, which is scheduled to happen
	                    // at the earliest asynchronous opportunity. We store this temporary information so that
	                    // if, between keyX and valueUpdateHandler, the underlying model value changes separately,
	                    // we can overwrite that model value change with the value the user just typed. Otherwise,
	                    // techniques like rateLimit can trigger model changes at critical moments that will
	                    // override the user's inputs, causing keystrokes to be lost.
	                    elementValueBeforeEvent = ko.selectExtensions.readValue(element);
	                    setTimeout(valueUpdateHandler, 0);
	                };
	                eventName = eventName.substring("after".length);
	            }
	            ko.utils.registerEventHandler(element, eventName, handler);
	        });

	        var updateFromModel = function () {
	            var newValue = ko.utils.unwrapObservable(valueAccessor());
	            var elementValue = ko.selectExtensions.readValue(element);

	            if (elementValueBeforeEvent !== null && newValue === elementValueBeforeEvent) {
	                setTimeout(updateFromModel, 0);
	                return;
	            }

	            var valueHasChanged = (newValue !== elementValue);

	            if (valueHasChanged) {
	                if (ko.utils.tagNameLower(element) === "select") {
	                    var allowUnset = allBindings.get('valueAllowUnset');
	                    var applyValueAction = function () {
	                        ko.selectExtensions.writeValue(element, newValue, allowUnset);
	                    };
	                    applyValueAction();

	                    if (!allowUnset && newValue !== ko.selectExtensions.readValue(element)) {
	                        // If you try to set a model value that can't be represented in an already-populated dropdown, reject that change,
	                        // because you're not allowed to have a model value that disagrees with a visible UI selection.
	                        ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	                    } else {
	                        // Workaround for IE6 bug: It won't reliably apply values to SELECT nodes during the same execution thread
	                        // right after you've changed the set of OPTION nodes on it. So for that node type, we'll schedule a second thread
	                        // to apply the value as well.
	                        setTimeout(applyValueAction, 0);
	                    }
	                } else {
	                    ko.selectExtensions.writeValue(element, newValue);
	                }
	            }
	        };

	        ko.computed(updateFromModel, null, { disposeWhenNodeIsRemoved: element });
	    },
	    'update': function() {} // Keep for backwards compatibility with code that may have wrapped value binding
	};
	ko.expressionRewriting.twoWayBindings['value'] = true;
	ko.bindingHandlers['visible'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        var isCurrentlyVisible = !(element.style.display == "none");
	        if (value && !isCurrentlyVisible)
	            element.style.display = "";
	        else if ((!value) && isCurrentlyVisible)
	            element.style.display = "none";
	    }
	};
	// 'click' is just a shorthand for the usual full-length event:{click:handler}
	makeEventHandlerShortcut('click');
	// If you want to make a custom template engine,
	//
	// [1] Inherit from this class (like ko.nativeTemplateEngine does)
	// [2] Override 'renderTemplateSource', supplying a function with this signature:
	//
	//        function (templateSource, bindingContext, options) {
	//            // - templateSource.text() is the text of the template you should render
	//            // - bindingContext.$data is the data you should pass into the template
	//            //   - you might also want to make bindingContext.$parent, bindingContext.$parents,
	//            //     and bindingContext.$root available in the template too
	//            // - options gives you access to any other properties set on "data-bind: { template: options }"
	//            //
	//            // Return value: an array of DOM nodes
	//        }
	//
	// [3] Override 'createJavaScriptEvaluatorBlock', supplying a function with this signature:
	//
	//        function (script) {
	//            // Return value: Whatever syntax means "Evaluate the JavaScript statement 'script' and output the result"
	//            //               For example, the jquery.tmpl template engine converts 'someScript' to '${ someScript }'
	//        }
	//
	//     This is only necessary if you want to allow data-bind attributes to reference arbitrary template variables.
	//     If you don't want to allow that, you can set the property 'allowTemplateRewriting' to false (like ko.nativeTemplateEngine does)
	//     and then you don't need to override 'createJavaScriptEvaluatorBlock'.

	ko.templateEngine = function () { };

	ko.templateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options) {
	    throw new Error("Override renderTemplateSource");
	};

	ko.templateEngine.prototype['createJavaScriptEvaluatorBlock'] = function (script) {
	    throw new Error("Override createJavaScriptEvaluatorBlock");
	};

	ko.templateEngine.prototype['makeTemplateSource'] = function(template, templateDocument) {
	    // Named template
	    if (typeof template == "string") {
	        templateDocument = templateDocument || document;
	        var elem = templateDocument.getElementById(template);
	        if (!elem)
	            throw new Error("Cannot find template with ID " + template);
	        return new ko.templateSources.domElement(elem);
	    } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
	        // Anonymous template
	        return new ko.templateSources.anonymousTemplate(template);
	    } else
	        throw new Error("Unknown template type: " + template);
	};

	ko.templateEngine.prototype['renderTemplate'] = function (template, bindingContext, options, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    return this['renderTemplateSource'](templateSource, bindingContext, options);
	};

	ko.templateEngine.prototype['isTemplateRewritten'] = function (template, templateDocument) {
	    // Skip rewriting if requested
	    if (this['allowTemplateRewriting'] === false)
	        return true;
	    return this['makeTemplateSource'](template, templateDocument)['data']("isRewritten");
	};

	ko.templateEngine.prototype['rewriteTemplate'] = function (template, rewriterCallback, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    var rewritten = rewriterCallback(templateSource['text']());
	    templateSource['text'](rewritten);
	    templateSource['data']("isRewritten", true);
	};

	ko.exportSymbol('templateEngine', ko.templateEngine);

	ko.templateRewriting = (function () {
	    var memoizeDataBindingAttributeSyntaxRegex = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi;
	    var memoizeVirtualContainerBindingSyntaxRegex = /<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;

	    function validateDataBindValuesForRewriting(keyValueArray) {
	        var allValidators = ko.expressionRewriting.bindingRewriteValidators;
	        for (var i = 0; i < keyValueArray.length; i++) {
	            var key = keyValueArray[i]['key'];
	            if (allValidators.hasOwnProperty(key)) {
	                var validator = allValidators[key];

	                if (typeof validator === "function") {
	                    var possibleErrorMessage = validator(keyValueArray[i]['value']);
	                    if (possibleErrorMessage)
	                        throw new Error(possibleErrorMessage);
	                } else if (!validator) {
	                    throw new Error("This template engine does not support the '" + key + "' binding within its templates");
	                }
	            }
	        }
	    }

	    function constructMemoizedTagReplacement(dataBindAttributeValue, tagToRetain, nodeName, templateEngine) {
	        var dataBindKeyValueArray = ko.expressionRewriting.parseObjectLiteral(dataBindAttributeValue);
	        validateDataBindValuesForRewriting(dataBindKeyValueArray);
	        var rewrittenDataBindAttributeValue = ko.expressionRewriting.preProcessBindings(dataBindKeyValueArray, {'valueAccessors':true});

	        // For no obvious reason, Opera fails to evaluate rewrittenDataBindAttributeValue unless it's wrapped in an additional
	        // anonymous function, even though Opera's built-in debugger can evaluate it anyway. No other browser requires this
	        // extra indirection.
	        var applyBindingsToNextSiblingScript =
	            "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + rewrittenDataBindAttributeValue + " } })()},'" + nodeName.toLowerCase() + "')";
	        return templateEngine['createJavaScriptEvaluatorBlock'](applyBindingsToNextSiblingScript) + tagToRetain;
	    }

	    return {
	        ensureTemplateIsRewritten: function (template, templateEngine, templateDocument) {
	            if (!templateEngine['isTemplateRewritten'](template, templateDocument))
	                templateEngine['rewriteTemplate'](template, function (htmlString) {
	                    return ko.templateRewriting.memoizeBindingAttributeSyntax(htmlString, templateEngine);
	                }, templateDocument);
	        },

	        memoizeBindingAttributeSyntax: function (htmlString, templateEngine) {
	            return htmlString.replace(memoizeDataBindingAttributeSyntaxRegex, function () {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[4], /* tagToRetain: */ arguments[1], /* nodeName: */ arguments[2], templateEngine);
	            }).replace(memoizeVirtualContainerBindingSyntaxRegex, function() {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[1], /* tagToRetain: */ "<!-- ko -->", /* nodeName: */ "#comment", templateEngine);
	            });
	        },

	        applyMemoizedBindingsToNextSibling: function (bindings, nodeName) {
	            return ko.memoization.memoize(function (domNode, bindingContext) {
	                var nodeToBind = domNode.nextSibling;
	                if (nodeToBind && nodeToBind.nodeName.toLowerCase() === nodeName) {
	                    ko.applyBindingAccessorsToNode(nodeToBind, bindings, bindingContext);
	                }
	            });
	        }
	    }
	})();


	// Exported only because it has to be referenced by string lookup from within rewritten template
	ko.exportSymbol('__tr_ambtns', ko.templateRewriting.applyMemoizedBindingsToNextSibling);
	(function() {
	    // A template source represents a read/write way of accessing a template. This is to eliminate the need for template loading/saving
	    // logic to be duplicated in every template engine (and means they can all work with anonymous templates, etc.)
	    //
	    // Two are provided by default:
	    //  1. ko.templateSources.domElement       - reads/writes the text content of an arbitrary DOM element
	    //  2. ko.templateSources.anonymousElement - uses ko.utils.domData to read/write text *associated* with the DOM element, but
	    //                                           without reading/writing the actual element text content, since it will be overwritten
	    //                                           with the rendered template output.
	    // You can implement your own template source if you want to fetch/store templates somewhere other than in DOM elements.
	    // Template sources need to have the following functions:
	    //   text()             - returns the template text from your storage location
	    //   text(value)        - writes the supplied template text to your storage location
	    //   data(key)          - reads values stored using data(key, value) - see below
	    //   data(key, value)   - associates "value" with this template and the key "key". Is used to store information like "isRewritten".
	    //
	    // Optionally, template sources can also have the following functions:
	    //   nodes()            - returns a DOM element containing the nodes of this template, where available
	    //   nodes(value)       - writes the given DOM element to your storage location
	    // If a DOM element is available for a given template source, template engines are encouraged to use it in preference over text()
	    // for improved speed. However, all templateSources must supply text() even if they don't supply nodes().
	    //
	    // Once you've implemented a templateSource, make your template engine use it by subclassing whatever template engine you were
	    // using and overriding "makeTemplateSource" to return an instance of your custom template source.

	    ko.templateSources = {};

	    // ---- ko.templateSources.domElement -----

	    ko.templateSources.domElement = function(element) {
	        this.domElement = element;
	    }

	    ko.templateSources.domElement.prototype['text'] = function(/* valueToWrite */) {
	        var tagNameLower = ko.utils.tagNameLower(this.domElement),
	            elemContentsProperty = tagNameLower === "script" ? "text"
	                                 : tagNameLower === "textarea" ? "value"
	                                 : "innerHTML";

	        if (arguments.length == 0) {
	            return this.domElement[elemContentsProperty];
	        } else {
	            var valueToWrite = arguments[0];
	            if (elemContentsProperty === "innerHTML")
	                ko.utils.setHtml(this.domElement, valueToWrite);
	            else
	                this.domElement[elemContentsProperty] = valueToWrite;
	        }
	    };

	    var dataDomDataPrefix = ko.utils.domData.nextKey() + "_";
	    ko.templateSources.domElement.prototype['data'] = function(key /*, valueToWrite */) {
	        if (arguments.length === 1) {
	            return ko.utils.domData.get(this.domElement, dataDomDataPrefix + key);
	        } else {
	            ko.utils.domData.set(this.domElement, dataDomDataPrefix + key, arguments[1]);
	        }
	    };

	    // ---- ko.templateSources.anonymousTemplate -----
	    // Anonymous templates are normally saved/retrieved as DOM nodes through "nodes".
	    // For compatibility, you can also read "text"; it will be serialized from the nodes on demand.
	    // Writing to "text" is still supported, but then the template data will not be available as DOM nodes.

	    var anonymousTemplatesDomDataKey = ko.utils.domData.nextKey();
	    ko.templateSources.anonymousTemplate = function(element) {
	        this.domElement = element;
	    }
	    ko.templateSources.anonymousTemplate.prototype = new ko.templateSources.domElement();
	    ko.templateSources.anonymousTemplate.prototype.constructor = ko.templateSources.anonymousTemplate;
	    ko.templateSources.anonymousTemplate.prototype['text'] = function(/* valueToWrite */) {
	        if (arguments.length == 0) {
	            var templateData = ko.utils.domData.get(this.domElement, anonymousTemplatesDomDataKey) || {};
	            if (templateData.textData === undefined && templateData.containerData)
	                templateData.textData = templateData.containerData.innerHTML;
	            return templateData.textData;
	        } else {
	            var valueToWrite = arguments[0];
	            ko.utils.domData.set(this.domElement, anonymousTemplatesDomDataKey, {textData: valueToWrite});
	        }
	    };
	    ko.templateSources.domElement.prototype['nodes'] = function(/* valueToWrite */) {
	        if (arguments.length == 0) {
	            var templateData = ko.utils.domData.get(this.domElement, anonymousTemplatesDomDataKey) || {};
	            return templateData.containerData;
	        } else {
	            var valueToWrite = arguments[0];
	            ko.utils.domData.set(this.domElement, anonymousTemplatesDomDataKey, {containerData: valueToWrite});
	        }
	    };

	    ko.exportSymbol('templateSources', ko.templateSources);
	    ko.exportSymbol('templateSources.domElement', ko.templateSources.domElement);
	    ko.exportSymbol('templateSources.anonymousTemplate', ko.templateSources.anonymousTemplate);
	})();
	(function () {
	    var _templateEngine;
	    ko.setTemplateEngine = function (templateEngine) {
	        if ((templateEngine != undefined) && !(templateEngine instanceof ko.templateEngine))
	            throw new Error("templateEngine must inherit from ko.templateEngine");
	        _templateEngine = templateEngine;
	    }

	    function invokeForEachNodeInContinuousRange(firstNode, lastNode, action) {
	        var node, nextInQueue = firstNode, firstOutOfRangeNode = ko.virtualElements.nextSibling(lastNode);
	        while (nextInQueue && ((node = nextInQueue) !== firstOutOfRangeNode)) {
	            nextInQueue = ko.virtualElements.nextSibling(node);
	            action(node, nextInQueue);
	        }
	    }

	    function activateBindingsOnContinuousNodeArray(continuousNodeArray, bindingContext) {
	        // To be used on any nodes that have been rendered by a template and have been inserted into some parent element
	        // Walks through continuousNodeArray (which *must* be continuous, i.e., an uninterrupted sequence of sibling nodes, because
	        // the algorithm for walking them relies on this), and for each top-level item in the virtual-element sense,
	        // (1) Does a regular "applyBindings" to associate bindingContext with this node and to activate any non-memoized bindings
	        // (2) Unmemoizes any memos in the DOM subtree (e.g., to activate bindings that had been memoized during template rewriting)

	        if (continuousNodeArray.length) {
	            var firstNode = continuousNodeArray[0],
	                lastNode = continuousNodeArray[continuousNodeArray.length - 1],
	                parentNode = firstNode.parentNode,
	                provider = ko.bindingProvider['instance'],
	                preprocessNode = provider['preprocessNode'];

	            if (preprocessNode) {
	                invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node, nextNodeInRange) {
	                    var nodePreviousSibling = node.previousSibling;
	                    var newNodes = preprocessNode.call(provider, node);
	                    if (newNodes) {
	                        if (node === firstNode)
	                            firstNode = newNodes[0] || nextNodeInRange;
	                        if (node === lastNode)
	                            lastNode = newNodes[newNodes.length - 1] || nodePreviousSibling;
	                    }
	                });

	                // Because preprocessNode can change the nodes, including the first and last nodes, update continuousNodeArray to match.
	                // We need the full set, including inner nodes, because the unmemoize step might remove the first node (and so the real
	                // first node needs to be in the array).
	                continuousNodeArray.length = 0;
	                if (!firstNode) { // preprocessNode might have removed all the nodes, in which case there's nothing left to do
	                    return;
	                }
	                if (firstNode === lastNode) {
	                    continuousNodeArray.push(firstNode);
	                } else {
	                    continuousNodeArray.push(firstNode, lastNode);
	                    ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	                }
	            }

	            // Need to applyBindings *before* unmemoziation, because unmemoization might introduce extra nodes (that we don't want to re-bind)
	            // whereas a regular applyBindings won't introduce new memoized nodes
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.applyBindings(bindingContext, node);
	            });
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.memoization.unmemoizeDomNodeAndDescendants(node, [bindingContext]);
	            });

	            // Make sure any changes done by applyBindings or unmemoize are reflected in the array
	            ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	        }
	    }

	    function getFirstNodeFromPossibleArray(nodeOrNodeArray) {
	        return nodeOrNodeArray.nodeType ? nodeOrNodeArray
	                                        : nodeOrNodeArray.length > 0 ? nodeOrNodeArray[0]
	                                        : null;
	    }

	    function executeTemplate(targetNodeOrNodeArray, renderMode, template, bindingContext, options) {
	        options = options || {};
	        var firstTargetNode = targetNodeOrNodeArray && getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	        var templateDocument = firstTargetNode && firstTargetNode.ownerDocument;
	        var templateEngineToUse = (options['templateEngine'] || _templateEngine);
	        ko.templateRewriting.ensureTemplateIsRewritten(template, templateEngineToUse, templateDocument);
	        var renderedNodesArray = templateEngineToUse['renderTemplate'](template, bindingContext, options, templateDocument);

	        // Loosely check result is an array of DOM nodes
	        if ((typeof renderedNodesArray.length != "number") || (renderedNodesArray.length > 0 && typeof renderedNodesArray[0].nodeType != "number"))
	            throw new Error("Template engine must return an array of DOM nodes");

	        var haveAddedNodesToParent = false;
	        switch (renderMode) {
	            case "replaceChildren":
	                ko.virtualElements.setDomNodeChildren(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "replaceNode":
	                ko.utils.replaceDomNodes(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "ignoreTargetNode": break;
	            default:
	                throw new Error("Unknown renderMode: " + renderMode);
	        }

	        if (haveAddedNodesToParent) {
	            activateBindingsOnContinuousNodeArray(renderedNodesArray, bindingContext);
	            if (options['afterRender'])
	                ko.dependencyDetection.ignore(options['afterRender'], null, [renderedNodesArray, bindingContext['$data']]);
	        }

	        return renderedNodesArray;
	    }

	    function resolveTemplateName(template, data, context) {
	        // The template can be specified as:
	        if (ko.isObservable(template)) {
	            // 1. An observable, with string value
	            return template();
	        } else if (typeof template === 'function') {
	            // 2. A function of (data, context) returning a string
	            return template(data, context);
	        } else {
	            // 3. A string
	            return template;
	        }
	    }

	    ko.renderTemplate = function (template, dataOrBindingContext, options, targetNodeOrNodeArray, renderMode) {
	        options = options || {};
	        if ((options['templateEngine'] || _templateEngine) == undefined)
	            throw new Error("Set a template engine before calling renderTemplate");
	        renderMode = renderMode || "replaceChildren";

	        if (targetNodeOrNodeArray) {
	            var firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);

	            var whenToDispose = function () { return (!firstTargetNode) || !ko.utils.domNodeIsAttachedToDocument(firstTargetNode); }; // Passive disposal (on next evaluation)
	            var activelyDisposeWhenNodeIsRemoved = (firstTargetNode && renderMode == "replaceNode") ? firstTargetNode.parentNode : firstTargetNode;

	            return ko.dependentObservable( // So the DOM is automatically updated when any dependency changes
	                function () {
	                    // Ensure we've got a proper binding context to work with
	                    var bindingContext = (dataOrBindingContext && (dataOrBindingContext instanceof ko.bindingContext))
	                        ? dataOrBindingContext
	                        : new ko.bindingContext(ko.utils.unwrapObservable(dataOrBindingContext));

	                    var templateName = resolveTemplateName(template, bindingContext['$data'], bindingContext),
	                        renderedNodesArray = executeTemplate(targetNodeOrNodeArray, renderMode, templateName, bindingContext, options);

	                    if (renderMode == "replaceNode") {
	                        targetNodeOrNodeArray = renderedNodesArray;
	                        firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	                    }
	                },
	                null,
	                { disposeWhen: whenToDispose, disposeWhenNodeIsRemoved: activelyDisposeWhenNodeIsRemoved }
	            );
	        } else {
	            // We don't yet have a DOM node to evaluate, so use a memo and render the template later when there is a DOM node
	            return ko.memoization.memoize(function (domNode) {
	                ko.renderTemplate(template, dataOrBindingContext, options, domNode, "replaceNode");
	            });
	        }
	    };

	    ko.renderTemplateForEach = function (template, arrayOrObservableArray, options, targetNode, parentBindingContext) {
	        // Since setDomNodeChildrenFromArrayMapping always calls executeTemplateForArrayItem and then
	        // activateBindingsCallback for added items, we can store the binding context in the former to use in the latter.
	        var arrayItemContext;

	        // This will be called by setDomNodeChildrenFromArrayMapping to get the nodes to add to targetNode
	        var executeTemplateForArrayItem = function (arrayValue, index) {
	            // Support selecting template as a function of the data being rendered
	            arrayItemContext = parentBindingContext['createChildContext'](arrayValue, options['as'], function(context) {
	                context['$index'] = index;
	            });

	            var templateName = resolveTemplateName(template, arrayValue, arrayItemContext);
	            return executeTemplate(null, "ignoreTargetNode", templateName, arrayItemContext, options);
	        }

	        // This will be called whenever setDomNodeChildrenFromArrayMapping has added nodes to targetNode
	        var activateBindingsCallback = function(arrayValue, addedNodesArray, index) {
	            activateBindingsOnContinuousNodeArray(addedNodesArray, arrayItemContext);
	            if (options['afterRender'])
	                options['afterRender'](addedNodesArray, arrayValue);
	        };

	        return ko.dependentObservable(function () {
	            var unwrappedArray = ko.utils.unwrapObservable(arrayOrObservableArray) || [];
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];

	            // Filter out any entries marked as destroyed
	            var filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return options['includeDestroyed'] || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });

	            // Call setDomNodeChildrenFromArrayMapping, ignoring any observables unwrapped within (most likely from a callback function).
	            // If the array items are observables, though, they will be unwrapped in executeTemplateForArrayItem and managed within setDomNodeChildrenFromArrayMapping.
	            ko.dependencyDetection.ignore(ko.utils.setDomNodeChildrenFromArrayMapping, null, [targetNode, filteredArray, executeTemplateForArrayItem, options, activateBindingsCallback]);

	        }, null, { disposeWhenNodeIsRemoved: targetNode });
	    };

	    var templateComputedDomDataKey = ko.utils.domData.nextKey();
	    function disposeOldComputedAndStoreNewOne(element, newComputed) {
	        var oldComputed = ko.utils.domData.get(element, templateComputedDomDataKey);
	        if (oldComputed && (typeof(oldComputed.dispose) == 'function'))
	            oldComputed.dispose();
	        ko.utils.domData.set(element, templateComputedDomDataKey, (newComputed && newComputed.isActive()) ? newComputed : undefined);
	    }

	    ko.bindingHandlers['template'] = {
	        'init': function(element, valueAccessor) {
	            // Support anonymous templates
	            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
	            if (typeof bindingValue == "string" || bindingValue['name']) {
	                // It's a named template - clear the element
	                ko.virtualElements.emptyNode(element);
	            } else {
	                // It's an anonymous template - store the element contents, then clear the element
	                var templateNodes = ko.virtualElements.childNodes(element),
	                    container = ko.utils.moveCleanedNodesToContainerElement(templateNodes); // This also removes the nodes from their current parent
	                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
	            }
	            return { 'controlsDescendantBindings': true };
	        },
	        'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var value = valueAccessor(),
	                dataValue,
	                options = ko.utils.unwrapObservable(value),
	                shouldDisplay = true,
	                templateComputed = null,
	                templateName;

	            if (typeof options == "string") {
	                templateName = value;
	                options = {};
	            } else {
	                templateName = options['name'];

	                // Support "if"/"ifnot" conditions
	                if ('if' in options)
	                    shouldDisplay = ko.utils.unwrapObservable(options['if']);
	                if (shouldDisplay && 'ifnot' in options)
	                    shouldDisplay = !ko.utils.unwrapObservable(options['ifnot']);

	                dataValue = ko.utils.unwrapObservable(options['data']);
	            }

	            if ('foreach' in options) {
	                // Render once for each data point (treating data set as empty if shouldDisplay==false)
	                var dataArray = (shouldDisplay && options['foreach']) || [];
	                templateComputed = ko.renderTemplateForEach(templateName || element, dataArray, options, element, bindingContext);
	            } else if (!shouldDisplay) {
	                ko.virtualElements.emptyNode(element);
	            } else {
	                // Render once for this single data point (or use the viewModel if no data was provided)
	                var innerBindingContext = ('data' in options) ?
	                    bindingContext['createChildContext'](dataValue, options['as']) :  // Given an explitit 'data' value, we create a child binding context for it
	                    bindingContext;                                                        // Given no explicit 'data' value, we retain the same binding context
	                templateComputed = ko.renderTemplate(templateName || element, innerBindingContext, options, element);
	            }

	            // It only makes sense to have a single template computed per element (otherwise which one should have its output displayed?)
	            disposeOldComputedAndStoreNewOne(element, templateComputed);
	        }
	    };

	    // Anonymous templates can't be rewritten. Give a nice error message if you try to do it.
	    ko.expressionRewriting.bindingRewriteValidators['template'] = function(bindingValue) {
	        var parsedBindingValue = ko.expressionRewriting.parseObjectLiteral(bindingValue);

	        if ((parsedBindingValue.length == 1) && parsedBindingValue[0]['unknown'])
	            return null; // It looks like a string literal, not an object literal, so treat it as a named template (which is allowed for rewriting)

	        if (ko.expressionRewriting.keyValueArrayContainsKey(parsedBindingValue, "name"))
	            return null; // Named templates can be rewritten, so return "no error"
	        return "This template engine does not support anonymous templates nested within its templates";
	    };

	    ko.virtualElements.allowedBindings['template'] = true;
	})();

	ko.exportSymbol('setTemplateEngine', ko.setTemplateEngine);
	ko.exportSymbol('renderTemplate', ko.renderTemplate);
	// Go through the items that have been added and deleted and try to find matches between them.
	ko.utils.findMovesInArrayComparison = function (left, right, limitFailedCompares) {
	    if (left.length && right.length) {
	        var failedCompares, l, r, leftItem, rightItem;
	        for (failedCompares = l = 0; (!limitFailedCompares || failedCompares < limitFailedCompares) && (leftItem = left[l]); ++l) {
	            for (r = 0; rightItem = right[r]; ++r) {
	                if (leftItem['value'] === rightItem['value']) {
	                    leftItem['moved'] = rightItem['index'];
	                    rightItem['moved'] = leftItem['index'];
	                    right.splice(r, 1);         // This item is marked as moved; so remove it from right list
	                    failedCompares = r = 0;     // Reset failed compares count because we're checking for consecutive failures
	                    break;
	                }
	            }
	            failedCompares += r;
	        }
	    }
	};

	ko.utils.compareArrays = (function () {
	    var statusNotInOld = 'added', statusNotInNew = 'deleted';

	    // Simple calculation based on Levenshtein distance.
	    function compareArrays(oldArray, newArray, options) {
	        // For backward compatibility, if the third arg is actually a bool, interpret
	        // it as the old parameter 'dontLimitMoves'. Newer code should use { dontLimitMoves: true }.
	        options = (typeof options === 'boolean') ? { 'dontLimitMoves': options } : (options || {});
	        oldArray = oldArray || [];
	        newArray = newArray || [];

	        if (oldArray.length <= newArray.length)
	            return compareSmallArrayToBigArray(oldArray, newArray, statusNotInOld, statusNotInNew, options);
	        else
	            return compareSmallArrayToBigArray(newArray, oldArray, statusNotInNew, statusNotInOld, options);
	    }

	    function compareSmallArrayToBigArray(smlArray, bigArray, statusNotInSml, statusNotInBig, options) {
	        var myMin = Math.min,
	            myMax = Math.max,
	            editDistanceMatrix = [],
	            smlIndex, smlIndexMax = smlArray.length,
	            bigIndex, bigIndexMax = bigArray.length,
	            compareRange = (bigIndexMax - smlIndexMax) || 1,
	            maxDistance = smlIndexMax + bigIndexMax + 1,
	            thisRow, lastRow,
	            bigIndexMaxForRow, bigIndexMinForRow;

	        for (smlIndex = 0; smlIndex <= smlIndexMax; smlIndex++) {
	            lastRow = thisRow;
	            editDistanceMatrix.push(thisRow = []);
	            bigIndexMaxForRow = myMin(bigIndexMax, smlIndex + compareRange);
	            bigIndexMinForRow = myMax(0, smlIndex - 1);
	            for (bigIndex = bigIndexMinForRow; bigIndex <= bigIndexMaxForRow; bigIndex++) {
	                if (!bigIndex)
	                    thisRow[bigIndex] = smlIndex + 1;
	                else if (!smlIndex)  // Top row - transform empty array into new array via additions
	                    thisRow[bigIndex] = bigIndex + 1;
	                else if (smlArray[smlIndex - 1] === bigArray[bigIndex - 1])
	                    thisRow[bigIndex] = lastRow[bigIndex - 1];                  // copy value (no edit)
	                else {
	                    var northDistance = lastRow[bigIndex] || maxDistance;       // not in big (deletion)
	                    var westDistance = thisRow[bigIndex - 1] || maxDistance;    // not in small (addition)
	                    thisRow[bigIndex] = myMin(northDistance, westDistance) + 1;
	                }
	            }
	        }

	        var editScript = [], meMinusOne, notInSml = [], notInBig = [];
	        for (smlIndex = smlIndexMax, bigIndex = bigIndexMax; smlIndex || bigIndex;) {
	            meMinusOne = editDistanceMatrix[smlIndex][bigIndex] - 1;
	            if (bigIndex && meMinusOne === editDistanceMatrix[smlIndex][bigIndex-1]) {
	                notInSml.push(editScript[editScript.length] = {     // added
	                    'status': statusNotInSml,
	                    'value': bigArray[--bigIndex],
	                    'index': bigIndex });
	            } else if (smlIndex && meMinusOne === editDistanceMatrix[smlIndex - 1][bigIndex]) {
	                notInBig.push(editScript[editScript.length] = {     // deleted
	                    'status': statusNotInBig,
	                    'value': smlArray[--smlIndex],
	                    'index': smlIndex });
	            } else {
	                --bigIndex;
	                --smlIndex;
	                if (!options['sparse']) {
	                    editScript.push({
	                        'status': "retained",
	                        'value': bigArray[bigIndex] });
	                }
	            }
	        }

	        // Set a limit on the number of consecutive non-matching comparisons; having it a multiple of
	        // smlIndexMax keeps the time complexity of this algorithm linear.
	        ko.utils.findMovesInArrayComparison(notInSml, notInBig, smlIndexMax * 10);

	        return editScript.reverse();
	    }

	    return compareArrays;
	})();

	ko.exportSymbol('utils.compareArrays', ko.utils.compareArrays);
	(function () {
	    // Objective:
	    // * Given an input array, a container DOM node, and a function from array elements to arrays of DOM nodes,
	    //   map the array elements to arrays of DOM nodes, concatenate together all these arrays, and use them to populate the container DOM node
	    // * Next time we're given the same combination of things (with the array possibly having mutated), update the container DOM node
	    //   so that its children is again the concatenation of the mappings of the array elements, but don't re-map any array elements that we
	    //   previously mapped - retain those nodes, and just insert/delete other ones

	    // "callbackAfterAddingNodes" will be invoked after any "mapping"-generated nodes are inserted into the container node
	    // You can use this, for example, to activate bindings on those nodes.

	    function mapNodeAndRefreshWhenChanged(containerNode, mapping, valueToMap, callbackAfterAddingNodes, index) {
	        // Map this array value inside a dependentObservable so we re-map when any dependency changes
	        var mappedNodes = [];
	        var dependentObservable = ko.dependentObservable(function() {
	            var newMappedNodes = mapping(valueToMap, index, ko.utils.fixUpContinuousNodeArray(mappedNodes, containerNode)) || [];

	            // On subsequent evaluations, just replace the previously-inserted DOM nodes
	            if (mappedNodes.length > 0) {
	                ko.utils.replaceDomNodes(mappedNodes, newMappedNodes);
	                if (callbackAfterAddingNodes)
	                    ko.dependencyDetection.ignore(callbackAfterAddingNodes, null, [valueToMap, newMappedNodes, index]);
	            }

	            // Replace the contents of the mappedNodes array, thereby updating the record
	            // of which nodes would be deleted if valueToMap was itself later removed
	            mappedNodes.length = 0;
	            ko.utils.arrayPushAll(mappedNodes, newMappedNodes);
	        }, null, { disposeWhenNodeIsRemoved: containerNode, disposeWhen: function() { return !ko.utils.anyDomNodeIsAttachedToDocument(mappedNodes); } });
	        return { mappedNodes : mappedNodes, dependentObservable : (dependentObservable.isActive() ? dependentObservable : undefined) };
	    }

	    var lastMappingResultDomDataKey = ko.utils.domData.nextKey();

	    ko.utils.setDomNodeChildrenFromArrayMapping = function (domNode, array, mapping, options, callbackAfterAddingNodes) {
	        // Compare the provided array against the previous one
	        array = array || [];
	        options = options || {};
	        var isFirstExecution = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) === undefined;
	        var lastMappingResult = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) || [];
	        var lastArray = ko.utils.arrayMap(lastMappingResult, function (x) { return x.arrayEntry; });
	        var editScript = ko.utils.compareArrays(lastArray, array, options['dontLimitMoves']);

	        // Build the new mapping result
	        var newMappingResult = [];
	        var lastMappingResultIndex = 0;
	        var newMappingResultIndex = 0;

	        var nodesToDelete = [];
	        var itemsToProcess = [];
	        var itemsForBeforeRemoveCallbacks = [];
	        var itemsForMoveCallbacks = [];
	        var itemsForAfterAddCallbacks = [];
	        var mapData;

	        function itemMovedOrRetained(editScriptIndex, oldPosition) {
	            mapData = lastMappingResult[oldPosition];
	            if (newMappingResultIndex !== oldPosition)
	                itemsForMoveCallbacks[editScriptIndex] = mapData;
	            // Since updating the index might change the nodes, do so before calling fixUpContinuousNodeArray
	            mapData.indexObservable(newMappingResultIndex++);
	            ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode);
	            newMappingResult.push(mapData);
	            itemsToProcess.push(mapData);
	        }

	        function callCallback(callback, items) {
	            if (callback) {
	                for (var i = 0, n = items.length; i < n; i++) {
	                    if (items[i]) {
	                        ko.utils.arrayForEach(items[i].mappedNodes, function(node) {
	                            callback(node, i, items[i].arrayEntry);
	                        });
	                    }
	                }
	            }
	        }

	        for (var i = 0, editScriptItem, movedIndex; editScriptItem = editScript[i]; i++) {
	            movedIndex = editScriptItem['moved'];
	            switch (editScriptItem['status']) {
	                case "deleted":
	                    if (movedIndex === undefined) {
	                        mapData = lastMappingResult[lastMappingResultIndex];

	                        // Stop tracking changes to the mapping for these nodes
	                        if (mapData.dependentObservable)
	                            mapData.dependentObservable.dispose();

	                        // Queue these nodes for later removal
	                        nodesToDelete.push.apply(nodesToDelete, ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode));
	                        if (options['beforeRemove']) {
	                            itemsForBeforeRemoveCallbacks[i] = mapData;
	                            itemsToProcess.push(mapData);
	                        }
	                    }
	                    lastMappingResultIndex++;
	                    break;

	                case "retained":
	                    itemMovedOrRetained(i, lastMappingResultIndex++);
	                    break;

	                case "added":
	                    if (movedIndex !== undefined) {
	                        itemMovedOrRetained(i, movedIndex);
	                    } else {
	                        mapData = { arrayEntry: editScriptItem['value'], indexObservable: ko.observable(newMappingResultIndex++) };
	                        newMappingResult.push(mapData);
	                        itemsToProcess.push(mapData);
	                        if (!isFirstExecution)
	                            itemsForAfterAddCallbacks[i] = mapData;
	                    }
	                    break;
	            }
	        }

	        // Call beforeMove first before any changes have been made to the DOM
	        callCallback(options['beforeMove'], itemsForMoveCallbacks);

	        // Next remove nodes for deleted items (or just clean if there's a beforeRemove callback)
	        ko.utils.arrayForEach(nodesToDelete, options['beforeRemove'] ? ko.cleanNode : ko.removeNode);

	        // Next add/reorder the remaining items (will include deleted items if there's a beforeRemove callback)
	        for (var i = 0, nextNode = ko.virtualElements.firstChild(domNode), lastNode, node; mapData = itemsToProcess[i]; i++) {
	            // Get nodes for newly added items
	            if (!mapData.mappedNodes)
	                ko.utils.extend(mapData, mapNodeAndRefreshWhenChanged(domNode, mapping, mapData.arrayEntry, callbackAfterAddingNodes, mapData.indexObservable));

	            // Put nodes in the right place if they aren't there already
	            for (var j = 0; node = mapData.mappedNodes[j]; nextNode = node.nextSibling, lastNode = node, j++) {
	                if (node !== nextNode)
	                    ko.virtualElements.insertAfter(domNode, node, lastNode);
	            }

	            // Run the callbacks for newly added nodes (for example, to apply bindings, etc.)
	            if (!mapData.initialized && callbackAfterAddingNodes) {
	                callbackAfterAddingNodes(mapData.arrayEntry, mapData.mappedNodes, mapData.indexObservable);
	                mapData.initialized = true;
	            }
	        }

	        // If there's a beforeRemove callback, call it after reordering.
	        // Note that we assume that the beforeRemove callback will usually be used to remove the nodes using
	        // some sort of animation, which is why we first reorder the nodes that will be removed. If the
	        // callback instead removes the nodes right away, it would be more efficient to skip reordering them.
	        // Perhaps we'll make that change in the future if this scenario becomes more common.
	        callCallback(options['beforeRemove'], itemsForBeforeRemoveCallbacks);

	        // Finally call afterMove and afterAdd callbacks
	        callCallback(options['afterMove'], itemsForMoveCallbacks);
	        callCallback(options['afterAdd'], itemsForAfterAddCallbacks);

	        // Store a copy of the array items we just considered so we can difference it next time
	        ko.utils.domData.set(domNode, lastMappingResultDomDataKey, newMappingResult);
	    }
	})();

	ko.exportSymbol('utils.setDomNodeChildrenFromArrayMapping', ko.utils.setDomNodeChildrenFromArrayMapping);
	ko.nativeTemplateEngine = function () {
	    this['allowTemplateRewriting'] = false;
	}

	ko.nativeTemplateEngine.prototype = new ko.templateEngine();
	ko.nativeTemplateEngine.prototype.constructor = ko.nativeTemplateEngine;
	ko.nativeTemplateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options) {
	    var useNodesIfAvailable = !(ko.utils.ieVersion < 9), // IE<9 cloneNode doesn't work properly
	        templateNodesFunc = useNodesIfAvailable ? templateSource['nodes'] : null,
	        templateNodes = templateNodesFunc ? templateSource['nodes']() : null;

	    if (templateNodes) {
	        return ko.utils.makeArray(templateNodes.cloneNode(true).childNodes);
	    } else {
	        var templateText = templateSource['text']();
	        return ko.utils.parseHtmlFragment(templateText);
	    }
	};

	ko.nativeTemplateEngine.instance = new ko.nativeTemplateEngine();
	ko.setTemplateEngine(ko.nativeTemplateEngine.instance);

	ko.exportSymbol('nativeTemplateEngine', ko.nativeTemplateEngine);
	(function() {
	    ko.jqueryTmplTemplateEngine = function () {
	        // Detect which version of jquery-tmpl you're using. Unfortunately jquery-tmpl
	        // doesn't expose a version number, so we have to infer it.
	        // Note that as of Knockout 1.3, we only support jQuery.tmpl 1.0.0pre and later,
	        // which KO internally refers to as version "2", so older versions are no longer detected.
	        var jQueryTmplVersion = this.jQueryTmplVersion = (function() {
	            if (!jQueryInstance || !(jQueryInstance['tmpl']))
	                return 0;
	            // Since it exposes no official version number, we use our own numbering system. To be updated as jquery-tmpl evolves.
	            try {
	                if (jQueryInstance['tmpl']['tag']['tmpl']['open'].toString().indexOf('__') >= 0) {
	                    // Since 1.0.0pre, custom tags should append markup to an array called "__"
	                    return 2; // Final version of jquery.tmpl
	                }
	            } catch(ex) { /* Apparently not the version we were looking for */ }

	            return 1; // Any older version that we don't support
	        })();

	        function ensureHasReferencedJQueryTemplates() {
	            if (jQueryTmplVersion < 2)
	                throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
	        }

	        function executeTemplate(compiledTemplate, data, jQueryTemplateOptions) {
	            return jQueryInstance['tmpl'](compiledTemplate, data, jQueryTemplateOptions);
	        }

	        this['renderTemplateSource'] = function(templateSource, bindingContext, options) {
	            options = options || {};
	            ensureHasReferencedJQueryTemplates();

	            // Ensure we have stored a precompiled version of this template (don't want to reparse on every render)
	            var precompiled = templateSource['data']('precompiled');
	            if (!precompiled) {
	                var templateText = templateSource['text']() || "";
	                // Wrap in "with($whatever.koBindingContext) { ... }"
	                templateText = "{{ko_with $item.koBindingContext}}" + templateText + "{{/ko_with}}";

	                precompiled = jQueryInstance['template'](null, templateText);
	                templateSource['data']('precompiled', precompiled);
	            }

	            var data = [bindingContext['$data']]; // Prewrap the data in an array to stop jquery.tmpl from trying to unwrap any arrays
	            var jQueryTemplateOptions = jQueryInstance['extend']({ 'koBindingContext': bindingContext }, options['templateOptions']);

	            var resultNodes = executeTemplate(precompiled, data, jQueryTemplateOptions);
	            resultNodes['appendTo'](document.createElement("div")); // Using "appendTo" forces jQuery/jQuery.tmpl to perform necessary cleanup work

	            jQueryInstance['fragments'] = {}; // Clear jQuery's fragment cache to avoid a memory leak after a large number of template renders
	            return resultNodes;
	        };

	        this['createJavaScriptEvaluatorBlock'] = function(script) {
	            return "{{ko_code ((function() { return " + script + " })()) }}";
	        };

	        this['addTemplate'] = function(templateName, templateMarkup) {
	            document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
	        };

	        if (jQueryTmplVersion > 0) {
	            jQueryInstance['tmpl']['tag']['ko_code'] = {
	                open: "__.push($1 || '');"
	            };
	            jQueryInstance['tmpl']['tag']['ko_with'] = {
	                open: "with($1) {",
	                close: "} "
	            };
	        }
	    };

	    ko.jqueryTmplTemplateEngine.prototype = new ko.templateEngine();
	    ko.jqueryTmplTemplateEngine.prototype.constructor = ko.jqueryTmplTemplateEngine;

	    // Use this one by default *only if jquery.tmpl is referenced*
	    var jqueryTmplTemplateEngineInstance = new ko.jqueryTmplTemplateEngine();
	    if (jqueryTmplTemplateEngineInstance.jQueryTmplVersion > 0)
	        ko.setTemplateEngine(jqueryTmplTemplateEngineInstance);

	    ko.exportSymbol('jqueryTmplTemplateEngine', ko.jqueryTmplTemplateEngine);
	})();
	}));
	}());
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./jquery-1.8.3": 4,
		"./jquery-1.8.3.js": 4,
		"./juicer": 6,
		"./juicer.js": 6,
		"./knockout-3.2.0": 1,
		"./knockout-3.2.0.js": 1,
		"./lodash": 7,
		"./lodash.js": 7,
		"./plugin-shim": 8,
		"./plugin-shim.js": 8,
		"./sea": 10,
		"./sea.js": 10,
		"./when": 11,
		"./when.js": 11
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v1.8.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2012 jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
	 */
	(function( window, undefined ) {
	var
	    // A central reference to the root jQuery(document)
	    rootjQuery,

	    // The deferred used on DOM ready
	    readyList,

	    // Use the correct document accordingly with window argument (sandbox)
	    document = window.document,
	    location = window.location,
	    navigator = window.navigator,

	    // Map over jQuery in case of overwrite
	    _jQuery = window.jQuery,

	    // Map over the $ in case of overwrite
	    _$ = window.$,

	    // Save a reference to some core methods
	    core_push = Array.prototype.push,
	    core_slice = Array.prototype.slice,
	    core_indexOf = Array.prototype.indexOf,
	    core_toString = Object.prototype.toString,
	    core_hasOwn = Object.prototype.hasOwnProperty,
	    core_trim = String.prototype.trim,

	    // Define a local copy of jQuery
	    jQuery = function( selector, context ) {
	        // The jQuery object is actually just the init constructor 'enhanced'
	        return new jQuery.fn.init( selector, context, rootjQuery );
	    },

	    // Used for matching numbers
	    core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	    // Used for detecting and trimming whitespace
	    core_rnotwhite = /\S/,
	    core_rspace = /\s+/,

	    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	    // A simple way to check for HTML strings
	    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	    rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	    // Match a standalone tag
	    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	    // JSON RegExp
	    rvalidchars = /^[\],:{}\s]*$/,
	    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	    // Matches dashed string for camelizing
	    rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([\da-z])/gi,

	    // Used by jQuery.camelCase as callback to replace()
	    fcamelCase = function( all, letter ) {
	        return ( letter + "" ).toUpperCase();
	    },

	    // The ready event handler and self cleanup method
	    DOMContentLoaded = function() {
	        if ( document.addEventListener ) {
	            document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
	            jQuery.ready();
	        } else if ( document.readyState === "complete" ) {
	            // we're here because readyState === "complete" in oldIE
	            // which is good enough for us to call the dom ready!
	            document.detachEvent( "onreadystatechange", DOMContentLoaded );
	            jQuery.ready();
	        }
	    },

	    // [[Class]] -> type pairs
	    class2type = {};

	jQuery.fn = jQuery.prototype = {
	    constructor: jQuery,
	    init: function( selector, context, rootjQuery ) {
	        var match, elem, ret, doc;

	        // Handle $(""), $(null), $(undefined), $(false)
	        if ( !selector ) {
	            return this;
	        }

	        // Handle $(DOMElement)
	        if ( selector.nodeType ) {
	            this.context = this[0] = selector;
	            this.length = 1;
	            return this;
	        }

	        // Handle HTML strings
	        if ( typeof selector === "string" ) {
	            if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
	                // Assume that strings that start and end with <> are HTML and skip the regex check
	                match = [ null, selector, null ];

	            } else {
	                match = rquickExpr.exec( selector );
	            }

	            // Match html or make sure no context is specified for #id
	            if ( match && (match[1] || !context) ) {

	                // HANDLE: $(html) -> $(array)
	                if ( match[1] ) {
	                    context = context instanceof jQuery ? context[0] : context;
	                    doc = ( context && context.nodeType ? context.ownerDocument || context : document );

	                    // scripts is true for back-compat
	                    selector = jQuery.parseHTML( match[1], doc, true );
	                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
	                        this.attr.call( selector, context, true );
	                    }

	                    return jQuery.merge( this, selector );

	                // HANDLE: $(#id)
	                } else {
	                    elem = document.getElementById( match[2] );

	                    // Check parentNode to catch when Blackberry 4.6 returns
	                    // nodes that are no longer in the document #6963
	                    if ( elem && elem.parentNode ) {
	                        // Handle the case where IE and Opera return items
	                        // by name instead of ID
	                        if ( elem.id !== match[2] ) {
	                            return rootjQuery.find( selector );
	                        }

	                        // Otherwise, we inject the element directly into the jQuery object
	                        this.length = 1;
	                        this[0] = elem;
	                    }

	                    this.context = document;
	                    this.selector = selector;
	                    return this;
	                }

	            // HANDLE: $(expr, $(...))
	            } else if ( !context || context.jquery ) {
	                return ( context || rootjQuery ).find( selector );

	            // HANDLE: $(expr, context)
	            // (which is just equivalent to: $(context).find(expr)
	            } else {
	                return this.constructor( context ).find( selector );
	            }

	        // HANDLE: $(function)
	        // Shortcut for document ready
	        } else if ( jQuery.isFunction( selector ) ) {
	            return rootjQuery.ready( selector );
	        }

	        if ( selector.selector !== undefined ) {
	            this.selector = selector.selector;
	            this.context = selector.context;
	        }

	        return jQuery.makeArray( selector, this );
	    },

	    // Start with an empty selector
	    selector: "",

	    // The current version of jQuery being used
	    jquery: "1.8.3",

	    // The default length of a jQuery object is 0
	    length: 0,

	    // The number of elements contained in the matched element set
	    size: function() {
	        return this.length;
	    },

	    toArray: function() {
	        return core_slice.call( this );
	    },

	    // Get the Nth element in the matched element set OR
	    // Get the whole matched element set as a clean array
	    get: function( num ) {
	        return num == null ?

	            // Return a 'clean' array
	            this.toArray() :

	            // Return just the object
	            ( num < 0 ? this[ this.length + num ] : this[ num ] );
	    },

	    // Take an array of elements and push it onto the stack
	    // (returning the new matched element set)
	    pushStack: function( elems, name, selector ) {

	        // Build a new jQuery matched element set
	        var ret = jQuery.merge( this.constructor(), elems );

	        // Add the old object onto the stack (as a reference)
	        ret.prevObject = this;

	        ret.context = this.context;

	        if ( name === "find" ) {
	            ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
	        } else if ( name ) {
	            ret.selector = this.selector + "." + name + "(" + selector + ")";
	        }

	        // Return the newly-formed element set
	        return ret;
	    },

	    // Execute a callback for every element in the matched set.
	    // (You can seed the arguments with an array of args, but this is
	    // only used internally.)
	    each: function( callback, args ) {
	        return jQuery.each( this, callback, args );
	    },

	    ready: function( fn ) {
	        // Add the callback
	        jQuery.ready.promise().done( fn );

	        return this;
	    },

	    eq: function( i ) {
	        i = +i;
	        return i === -1 ?
	            this.slice( i ) :
	            this.slice( i, i + 1 );
	    },

	    first: function() {
	        return this.eq( 0 );
	    },

	    last: function() {
	        return this.eq( -1 );
	    },

	    slice: function() {
	        return this.pushStack( core_slice.apply( this, arguments ),
	            "slice", core_slice.call(arguments).join(",") );
	    },

	    map: function( callback ) {
	        return this.pushStack( jQuery.map(this, function( elem, i ) {
	            return callback.call( elem, i, elem );
	        }));
	    },

	    end: function() {
	        return this.prevObject || this.constructor(null);
	    },

	    // For internal use only.
	    // Behaves like an Array's method, not like a jQuery method.
	    push: core_push,
	    sort: [].sort,
	    splice: [].splice
	};

	// Give the init function the jQuery prototype for later instantiation
	jQuery.fn.init.prototype = jQuery.fn;

	jQuery.extend = jQuery.fn.extend = function() {
	    var options, name, src, copy, copyIsArray, clone,
	        target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false;

	    // Handle a deep copy situation
	    if ( typeof target === "boolean" ) {
	        deep = target;
	        target = arguments[1] || {};
	        // skip the boolean and the target
	        i = 2;
	    }

	    // Handle case when target is a string or something (possible in deep copy)
	    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
	        target = {};
	    }

	    // extend jQuery itself if only one argument is passed
	    if ( length === i ) {
	        target = this;
	        --i;
	    }

	    for ( ; i < length; i++ ) {
	        // Only deal with non-null/undefined values
	        if ( (options = arguments[ i ]) != null ) {
	            // Extend the base object
	            for ( name in options ) {
	                src = target[ name ];
	                copy = options[ name ];

	                // Prevent never-ending loop
	                if ( target === copy ) {
	                    continue;
	                }

	                // Recurse if we're merging plain objects or arrays
	                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
	                    if ( copyIsArray ) {
	                        copyIsArray = false;
	                        clone = src && jQuery.isArray(src) ? src : [];

	                    } else {
	                        clone = src && jQuery.isPlainObject(src) ? src : {};
	                    }

	                    // Never move original objects, clone them
	                    target[ name ] = jQuery.extend( deep, clone, copy );

	                // Don't bring in undefined values
	                } else if ( copy !== undefined ) {
	                    target[ name ] = copy;
	                }
	            }
	        }
	    }

	    // Return the modified object
	    return target;
	};

	jQuery.extend({
	    noConflict: function( deep ) {
	        if ( window.$ === jQuery ) {
	            window.$ = _$;
	        }

	        if ( deep && window.jQuery === jQuery ) {
	            window.jQuery = _jQuery;
	        }

	        return jQuery;
	    },

	    // Is the DOM ready to be used? Set to true once it occurs.
	    isReady: false,

	    // A counter to track how many items to wait for before
	    // the ready event fires. See #6781
	    readyWait: 1,

	    // Hold (or release) the ready event
	    holdReady: function( hold ) {
	        if ( hold ) {
	            jQuery.readyWait++;
	        } else {
	            jQuery.ready( true );
	        }
	    },

	    // Handle when the DOM is ready
	    ready: function( wait ) {

	        // Abort if there are pending holds or we're already ready
	        if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
	            return;
	        }

	        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
	        if ( !document.body ) {
	            return setTimeout( jQuery.ready, 1 );
	        }

	        // Remember that the DOM is ready
	        jQuery.isReady = true;

	        // If a normal DOM Ready event fired, decrement, and wait if need be
	        if ( wait !== true && --jQuery.readyWait > 0 ) {
	            return;
	        }

	        // If there are functions bound, to execute
	        readyList.resolveWith( document, [ jQuery ] );

	        // Trigger any bound ready events
	        if ( jQuery.fn.trigger ) {
	            jQuery( document ).trigger("ready").off("ready");
	        }
	    },

	    // See test/unit/core.js for details concerning isFunction.
	    // Since version 1.3, DOM methods and functions like alert
	    // aren't supported. They return false on IE (#2968).
	    isFunction: function( obj ) {
	        return jQuery.type(obj) === "function";
	    },

	    isArray: Array.isArray || function( obj ) {
	        return jQuery.type(obj) === "array";
	    },

	    isWindow: function( obj ) {
	        return obj != null && obj == obj.window;
	    },

	    isNumeric: function( obj ) {
	        return !isNaN( parseFloat(obj) ) && isFinite( obj );
	    },

	    type: function( obj ) {
	        return obj == null ?
	            String( obj ) :
	            class2type[ core_toString.call(obj) ] || "object";
	    },

	    isPlainObject: function( obj ) {
	        // Must be an Object.
	        // Because of IE, we also have to check the presence of the constructor property.
	        // Make sure that DOM nodes and window objects don't pass through, as well
	        if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
	            return false;
	        }

	        try {
	            // Not own constructor property must be Object
	            if ( obj.constructor &&
	                !core_hasOwn.call(obj, "constructor") &&
	                !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
	                return false;
	            }
	        } catch ( e ) {
	            // IE8,9 Will throw exceptions on certain host objects #9897
	            return false;
	        }

	        // Own properties are enumerated firstly, so to speed up,
	        // if last one is own, then all properties are own.

	        var key;
	        for ( key in obj ) {}

	        return key === undefined || core_hasOwn.call( obj, key );
	    },

	    isEmptyObject: function( obj ) {
	        var name;
	        for ( name in obj ) {
	            return false;
	        }
	        return true;
	    },

	    error: function( msg ) {
	        throw new Error( msg );
	    },

	    // data: string of html
	    // context (optional): If specified, the fragment will be created in this context, defaults to document
	    // scripts (optional): If true, will include scripts passed in the html string
	    parseHTML: function( data, context, scripts ) {
	        var parsed;
	        if ( !data || typeof data !== "string" ) {
	            return null;
	        }
	        if ( typeof context === "boolean" ) {
	            scripts = context;
	            context = 0;
	        }
	        context = context || document;

	        // Single tag
	        if ( (parsed = rsingleTag.exec( data )) ) {
	            return [ context.createElement( parsed[1] ) ];
	        }

	        parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
	        return jQuery.merge( [],
	            (parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	    },

	    parseJSON: function( data ) {
	        if ( !data || typeof data !== "string") {
	            return null;
	        }

	        // Make sure leading/trailing whitespace is removed (IE can't handle it)
	        data = jQuery.trim( data );

	        // Attempt to parse using the native JSON parser first
	        if ( window.JSON && window.JSON.parse ) {
	            return window.JSON.parse( data );
	        }

	        // Make sure the incoming data is actual JSON
	        // Logic borrowed from http://json.org/json2.js
	        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
	            .replace( rvalidtokens, "]" )
	            .replace( rvalidbraces, "")) ) {

	            return ( new Function( "return " + data ) )();

	        }
	        jQuery.error( "Invalid JSON: " + data );
	    },

	    // Cross-browser xml parsing
	    parseXML: function( data ) {
	        var xml, tmp;
	        if ( !data || typeof data !== "string" ) {
	            return null;
	        }
	        try {
	            if ( window.DOMParser ) { // Standard
	                tmp = new DOMParser();
	                xml = tmp.parseFromString( data , "text/xml" );
	            } else { // IE
	                xml = new ActiveXObject( "Microsoft.XMLDOM" );
	                xml.async = "false";
	                xml.loadXML( data );
	            }
	        } catch( e ) {
	            xml = undefined;
	        }
	        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
	            jQuery.error( "Invalid XML: " + data );
	        }
	        return xml;
	    },

	    noop: function() {},

	    // Evaluates a script in a global context
	    // Workarounds based on findings by Jim Driscoll
	    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	    globalEval: function( data ) {
	        if ( data && core_rnotwhite.test( data ) ) {
	            // We use execScript on Internet Explorer
	            // We use an anonymous function so that context is window
	            // rather than jQuery in Firefox
	            ( window.execScript || function( data ) {
	                window[ "eval" ].call( window, data );
	            } )( data );
	        }
	    },

	    // Convert dashed to camelCase; used by the css and data modules
	    // Microsoft forgot to hump their vendor prefix (#9572)
	    camelCase: function( string ) {
	        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	    },

	    nodeName: function( elem, name ) {
	        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	    },

	    // args is for internal usage only
	    each: function( obj, callback, args ) {
	        var name,
	            i = 0,
	            length = obj.length,
	            isObj = length === undefined || jQuery.isFunction( obj );

	        if ( args ) {
	            if ( isObj ) {
	                for ( name in obj ) {
	                    if ( callback.apply( obj[ name ], args ) === false ) {
	                        break;
	                    }
	                }
	            } else {
	                for ( ; i < length; ) {
	                    if ( callback.apply( obj[ i++ ], args ) === false ) {
	                        break;
	                    }
	                }
	            }

	        // A special, fast, case for the most common use of each
	        } else {
	            if ( isObj ) {
	                for ( name in obj ) {
	                    if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
	                        break;
	                    }
	                }
	            } else {
	                for ( ; i < length; ) {
	                    if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
	                        break;
	                    }
	                }
	            }
	        }

	        return obj;
	    },

	    // Use native String.trim function wherever possible
	    trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
	        function( text ) {
	            return text == null ?
	                "" :
	                core_trim.call( text );
	        } :

	        // Otherwise use our own trimming functionality
	        function( text ) {
	            return text == null ?
	                "" :
	                ( text + "" ).replace( rtrim, "" );
	        },

	    // results is for internal usage only
	    makeArray: function( arr, results ) {
	        var type,
	            ret = results || [];

	        if ( arr != null ) {
	            // The window, strings (and functions) also have 'length'
	            // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
	            type = jQuery.type( arr );

	            if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
	                core_push.call( ret, arr );
	            } else {
	                jQuery.merge( ret, arr );
	            }
	        }

	        return ret;
	    },

	    inArray: function( elem, arr, i ) {
	        var len;

	        if ( arr ) {
	            if ( core_indexOf ) {
	                return core_indexOf.call( arr, elem, i );
	            }

	            len = arr.length;
	            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

	            for ( ; i < len; i++ ) {
	                // Skip accessing in sparse arrays
	                if ( i in arr && arr[ i ] === elem ) {
	                    return i;
	                }
	            }
	        }

	        return -1;
	    },

	    merge: function( first, second ) {
	        var l = second.length,
	            i = first.length,
	            j = 0;

	        if ( typeof l === "number" ) {
	            for ( ; j < l; j++ ) {
	                first[ i++ ] = second[ j ];
	            }

	        } else {
	            while ( second[j] !== undefined ) {
	                first[ i++ ] = second[ j++ ];
	            }
	        }

	        first.length = i;

	        return first;
	    },

	    grep: function( elems, callback, inv ) {
	        var retVal,
	            ret = [],
	            i = 0,
	            length = elems.length;
	        inv = !!inv;

	        // Go through the array, only saving the items
	        // that pass the validator function
	        for ( ; i < length; i++ ) {
	            retVal = !!callback( elems[ i ], i );
	            if ( inv !== retVal ) {
	                ret.push( elems[ i ] );
	            }
	        }

	        return ret;
	    },

	    // arg is for internal usage only
	    map: function( elems, callback, arg ) {
	        var value, key,
	            ret = [],
	            i = 0,
	            length = elems.length,
	            // jquery objects are treated as arrays
	            isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

	        // Go through the array, translating each of the items to their
	        if ( isArray ) {
	            for ( ; i < length; i++ ) {
	                value = callback( elems[ i ], i, arg );

	                if ( value != null ) {
	                    ret[ ret.length ] = value;
	                }
	            }

	        // Go through every key on the object,
	        } else {
	            for ( key in elems ) {
	                value = callback( elems[ key ], key, arg );

	                if ( value != null ) {
	                    ret[ ret.length ] = value;
	                }
	            }
	        }

	        // Flatten any nested arrays
	        return ret.concat.apply( [], ret );
	    },

	    // A global GUID counter for objects
	    guid: 1,

	    // Bind a function to a context, optionally partially applying any
	    // arguments.
	    proxy: function( fn, context ) {
	        var tmp, args, proxy;

	        if ( typeof context === "string" ) {
	            tmp = fn[ context ];
	            context = fn;
	            fn = tmp;
	        }

	        // Quick check to determine if target is callable, in the spec
	        // this throws a TypeError, but we will just return undefined.
	        if ( !jQuery.isFunction( fn ) ) {
	            return undefined;
	        }

	        // Simulated bind
	        args = core_slice.call( arguments, 2 );
	        proxy = function() {
	            return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
	        };

	        // Set the guid of unique handler to the same of original handler, so it can be removed
	        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	        return proxy;
	    },

	    // Multifunctional method to get and set values of a collection
	    // The value/s can optionally be executed if it's a function
	    access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
	        var exec,
	            bulk = key == null,
	            i = 0,
	            length = elems.length;

	        // Sets many values
	        if ( key && typeof key === "object" ) {
	            for ( i in key ) {
	                jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
	            }
	            chainable = 1;

	        // Sets one value
	        } else if ( value !== undefined ) {
	            // Optionally, function values get executed if exec is true
	            exec = pass === undefined && jQuery.isFunction( value );

	            if ( bulk ) {
	                // Bulk operations only iterate when executing function values
	                if ( exec ) {
	                    exec = fn;
	                    fn = function( elem, key, value ) {
	                        return exec.call( jQuery( elem ), value );
	                    };

	                // Otherwise they run against the entire set
	                } else {
	                    fn.call( elems, value );
	                    fn = null;
	                }
	            }

	            if ( fn ) {
	                for (; i < length; i++ ) {
	                    fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
	                }
	            }

	            chainable = 1;
	        }

	        return chainable ?
	            elems :

	            // Gets
	            bulk ?
	                fn.call( elems ) :
	                length ? fn( elems[0], key ) : emptyGet;
	    },

	    now: function() {
	        return ( new Date() ).getTime();
	    }
	});

	jQuery.ready.promise = function( obj ) {
	    if ( !readyList ) {

	        readyList = jQuery.Deferred();

	        // Catch cases where $(document).ready() is called after the browser event has already occurred.
	        // we once tried to use readyState "interactive" here, but it caused issues like the one
	        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	        if ( document.readyState === "complete" ) {
	            // Handle it asynchronously to allow scripts the opportunity to delay ready
	            setTimeout( jQuery.ready, 1 );

	        // Standards-based browsers support DOMContentLoaded
	        } else if ( document.addEventListener ) {
	            // Use the handy event callback
	            document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

	            // A fallback to window.onload, that will always work
	            window.addEventListener( "load", jQuery.ready, false );

	        // If IE event model is used
	        } else {
	            // Ensure firing before onload, maybe late but safe also for iframes
	            document.attachEvent( "onreadystatechange", DOMContentLoaded );

	            // A fallback to window.onload, that will always work
	            window.attachEvent( "onload", jQuery.ready );

	            // If IE and not a frame
	            // continually check to see if the document is ready
	            var top = false;

	            try {
	                top = window.frameElement == null && document.documentElement;
	            } catch(e) {}

	            if ( top && top.doScroll ) {
	                (function doScrollCheck() {
	                    if ( !jQuery.isReady ) {

	                        try {
	                            // Use the trick by Diego Perini
	                            // http://javascript.nwbox.com/IEContentLoaded/
	                            top.doScroll("left");
	                        } catch(e) {
	                            return setTimeout( doScrollCheck, 50 );
	                        }

	                        // and execute any waiting functions
	                        jQuery.ready();
	                    }
	                })();
	            }
	        }
	    }
	    return readyList.promise( obj );
	};

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	// All jQuery objects should point back to these
	rootjQuery = jQuery(document);
	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
	    var object = optionsCache[ options ] = {};
	    jQuery.each( options.split( core_rspace ), function( _, flag ) {
	        object[ flag ] = true;
	    });
	    return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *  options: an optional list of space-separated options that will change how
	 *          the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *  once:           will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *  memory:         will keep track of previous values and will call any callback added
	 *                  after the list has been fired right away with the latest "memorized"
	 *                  values (like a Deferred)
	 *
	 *  unique:         will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *  stopOnFalse:    interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

	    // Convert options from String-formatted to Object-formatted if needed
	    // (we check in cache first)
	    options = typeof options === "string" ?
	        ( optionsCache[ options ] || createOptions( options ) ) :
	        jQuery.extend( {}, options );

	    var // Last fire value (for non-forgettable lists)
	        memory,
	        // Flag to know if list was already fired
	        fired,
	        // Flag to know if list is currently firing
	        firing,
	        // First callback to fire (used internally by add and fireWith)
	        firingStart,
	        // End of the loop when firing
	        firingLength,
	        // Index of currently firing callback (modified by remove if needed)
	        firingIndex,
	        // Actual callback list
	        list = [],
	        // Stack of fire calls for repeatable lists
	        stack = !options.once && [],
	        // Fire callbacks
	        fire = function( data ) {
	            memory = options.memory && data;
	            fired = true;
	            firingIndex = firingStart || 0;
	            firingStart = 0;
	            firingLength = list.length;
	            firing = true;
	            for ( ; list && firingIndex < firingLength; firingIndex++ ) {
	                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
	                    memory = false; // To prevent further calls using add
	                    break;
	                }
	            }
	            firing = false;
	            if ( list ) {
	                if ( stack ) {
	                    if ( stack.length ) {
	                        fire( stack.shift() );
	                    }
	                } else if ( memory ) {
	                    list = [];
	                } else {
	                    self.disable();
	                }
	            }
	        },
	        // Actual Callbacks object
	        self = {
	            // Add a callback or a collection of callbacks to the list
	            add: function() {
	                if ( list ) {
	                    // First, we save the current length
	                    var start = list.length;
	                    (function add( args ) {
	                        jQuery.each( args, function( _, arg ) {
	                            var type = jQuery.type( arg );
	                            if ( type === "function" ) {
	                                if ( !options.unique || !self.has( arg ) ) {
	                                    list.push( arg );
	                                }
	                            } else if ( arg && arg.length && type !== "string" ) {
	                                // Inspect recursively
	                                add( arg );
	                            }
	                        });
	                    })( arguments );
	                    // Do we need to add the callbacks to the
	                    // current firing batch?
	                    if ( firing ) {
	                        firingLength = list.length;
	                    // With memory, if we're not firing then
	                    // we should call right away
	                    } else if ( memory ) {
	                        firingStart = start;
	                        fire( memory );
	                    }
	                }
	                return this;
	            },
	            // Remove a callback from the list
	            remove: function() {
	                if ( list ) {
	                    jQuery.each( arguments, function( _, arg ) {
	                        var index;
	                        while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
	                            list.splice( index, 1 );
	                            // Handle firing indexes
	                            if ( firing ) {
	                                if ( index <= firingLength ) {
	                                    firingLength--;
	                                }
	                                if ( index <= firingIndex ) {
	                                    firingIndex--;
	                                }
	                            }
	                        }
	                    });
	                }
	                return this;
	            },
	            // Control if a given callback is in the list
	            has: function( fn ) {
	                return jQuery.inArray( fn, list ) > -1;
	            },
	            // Remove all callbacks from the list
	            empty: function() {
	                list = [];
	                return this;
	            },
	            // Have the list do nothing anymore
	            disable: function() {
	                list = stack = memory = undefined;
	                return this;
	            },
	            // Is it disabled?
	            disabled: function() {
	                return !list;
	            },
	            // Lock the list in its current state
	            lock: function() {
	                stack = undefined;
	                if ( !memory ) {
	                    self.disable();
	                }
	                return this;
	            },
	            // Is it locked?
	            locked: function() {
	                return !stack;
	            },
	            // Call all callbacks with the given context and arguments
	            fireWith: function( context, args ) {
	                args = args || [];
	                args = [ context, args.slice ? args.slice() : args ];
	                if ( list && ( !fired || stack ) ) {
	                    if ( firing ) {
	                        stack.push( args );
	                    } else {
	                        fire( args );
	                    }
	                }
	                return this;
	            },
	            // Call all the callbacks with the given arguments
	            fire: function() {
	                self.fireWith( this, arguments );
	                return this;
	            },
	            // To know if the callbacks have already been called at least once
	            fired: function() {
	                return !!fired;
	            }
	        };

	    return self;
	};
	jQuery.extend({

	    Deferred: function( func ) {
	        var tuples = [
	                // action, add listener, listener list, final state
	                [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
	                [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
	                [ "notify", "progress", jQuery.Callbacks("memory") ]
	            ],
	            state = "pending",
	            promise = {
	                state: function() {
	                    return state;
	                },
	                always: function() {
	                    deferred.done( arguments ).fail( arguments );
	                    return this;
	                },
	                then: function( /* fnDone, fnFail, fnProgress */ ) {
	                    var fns = arguments;
	                    return jQuery.Deferred(function( newDefer ) {
	                        jQuery.each( tuples, function( i, tuple ) {
	                            var action = tuple[ 0 ],
	                                fn = fns[ i ];
	                            // deferred[ done | fail | progress ] for forwarding actions to newDefer
	                            deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
	                                function() {
	                                    var returned = fn.apply( this, arguments );
	                                    if ( returned && jQuery.isFunction( returned.promise ) ) {
	                                        returned.promise()
	                                            .done( newDefer.resolve )
	                                            .fail( newDefer.reject )
	                                            .progress( newDefer.notify );
	                                    } else {
	                                        newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
	                                    }
	                                } :
	                                newDefer[ action ]
	                            );
	                        });
	                        fns = null;
	                    }).promise();
	                },
	                // Get a promise for this deferred
	                // If obj is provided, the promise aspect is added to the object
	                promise: function( obj ) {
	                    return obj != null ? jQuery.extend( obj, promise ) : promise;
	                }
	            },
	            deferred = {};

	        // Keep pipe for back-compat
	        promise.pipe = promise.then;

	        // Add list-specific methods
	        jQuery.each( tuples, function( i, tuple ) {
	            var list = tuple[ 2 ],
	                stateString = tuple[ 3 ];

	            // promise[ done | fail | progress ] = list.add
	            promise[ tuple[1] ] = list.add;

	            // Handle state
	            if ( stateString ) {
	                list.add(function() {
	                    // state = [ resolved | rejected ]
	                    state = stateString;

	                // [ reject_list | resolve_list ].disable; progress_list.lock
	                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
	            }

	            // deferred[ resolve | reject | notify ] = list.fire
	            deferred[ tuple[0] ] = list.fire;
	            deferred[ tuple[0] + "With" ] = list.fireWith;
	        });

	        // Make the deferred a promise
	        promise.promise( deferred );

	        // Call given func if any
	        if ( func ) {
	            func.call( deferred, deferred );
	        }

	        // All done!
	        return deferred;
	    },

	    // Deferred helper
	    when: function( subordinate /* , ..., subordinateN */ ) {
	        var i = 0,
	            resolveValues = core_slice.call( arguments ),
	            length = resolveValues.length,

	            // the count of uncompleted subordinates
	            remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

	            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
	            deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

	            // Update function for both resolve and progress values
	            updateFunc = function( i, contexts, values ) {
	                return function( value ) {
	                    contexts[ i ] = this;
	                    values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
	                    if( values === progressValues ) {
	                        deferred.notifyWith( contexts, values );
	                    } else if ( !( --remaining ) ) {
	                        deferred.resolveWith( contexts, values );
	                    }
	                };
	            },

	            progressValues, progressContexts, resolveContexts;

	        // add listeners to Deferred subordinates; treat others as resolved
	        if ( length > 1 ) {
	            progressValues = new Array( length );
	            progressContexts = new Array( length );
	            resolveContexts = new Array( length );
	            for ( ; i < length; i++ ) {
	                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
	                    resolveValues[ i ].promise()
	                        .done( updateFunc( i, resolveContexts, resolveValues ) )
	                        .fail( deferred.reject )
	                        .progress( updateFunc( i, progressContexts, progressValues ) );
	                } else {
	                    --remaining;
	                }
	            }
	        }

	        // if we're not waiting on anything, resolve the master
	        if ( !remaining ) {
	            deferred.resolveWith( resolveContexts, resolveValues );
	        }

	        return deferred.promise();
	    }
	});
	jQuery.support = (function() {

	    var support,
	        all,
	        a,
	        select,
	        opt,
	        input,
	        fragment,
	        eventName,
	        i,
	        isSupported,
	        clickFn,
	        div = document.createElement("div");

	    // Setup
	    div.setAttribute( "className", "t" );
	    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	    // Support tests won't run in some limited or non-browser environments
	    all = div.getElementsByTagName("*");
	    a = div.getElementsByTagName("a")[ 0 ];
	    if ( !all || !a || !all.length ) {
	        return {};
	    }

	    // First batch of tests
	    select = document.createElement("select");
	    opt = select.appendChild( document.createElement("option") );
	    input = div.getElementsByTagName("input")[ 0 ];

	    a.style.cssText = "top:1px;float:left;opacity:.5";
	    support = {
	        // IE strips leading whitespace when .innerHTML is used
	        leadingWhitespace: ( div.firstChild.nodeType === 3 ),

	        // Make sure that tbody elements aren't automatically inserted
	        // IE will insert them into empty tables
	        tbody: !div.getElementsByTagName("tbody").length,

	        // Make sure that link elements get serialized correctly by innerHTML
	        // This requires a wrapper element in IE
	        htmlSerialize: !!div.getElementsByTagName("link").length,

	        // Get the style information from getAttribute
	        // (IE uses .cssText instead)
	        style: /top/.test( a.getAttribute("style") ),

	        // Make sure that URLs aren't manipulated
	        // (IE normalizes it by default)
	        hrefNormalized: ( a.getAttribute("href") === "/a" ),

	        // Make sure that element opacity exists
	        // (IE uses filter instead)
	        // Use a regex to work around a WebKit issue. See #5145
	        opacity: /^0.5/.test( a.style.opacity ),

	        // Verify style float existence
	        // (IE uses styleFloat instead of cssFloat)
	        cssFloat: !!a.style.cssFloat,

	        // Make sure that if no value is specified for a checkbox
	        // that it defaults to "on".
	        // (WebKit defaults to "" instead)
	        checkOn: ( input.value === "on" ),

	        // Make sure that a selected-by-default option has a working selected property.
	        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	        optSelected: opt.selected,

	        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	        getSetAttribute: div.className !== "t",

	        // Tests for enctype support on a form (#6743)
	        enctype: !!document.createElement("form").enctype,

	        // Makes sure cloning an html5 element does not cause problems
	        // Where outerHTML is undefined, this still works
	        html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

	        // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
	        boxModel: ( document.compatMode === "CSS1Compat" ),

	        // Will be defined later
	        submitBubbles: true,
	        changeBubbles: true,
	        focusinBubbles: false,
	        deleteExpando: true,
	        noCloneEvent: true,
	        inlineBlockNeedsLayout: false,
	        shrinkWrapBlocks: false,
	        reliableMarginRight: true,
	        boxSizingReliable: true,
	        pixelPosition: false
	    };

	    // Make sure checked status is properly cloned
	    input.checked = true;
	    support.noCloneChecked = input.cloneNode( true ).checked;

	    // Make sure that the options inside disabled selects aren't marked as disabled
	    // (WebKit marks them as disabled)
	    select.disabled = true;
	    support.optDisabled = !opt.disabled;

	    // Test to see if it's possible to delete an expando from an element
	    // Fails in Internet Explorer
	    try {
	        delete div.test;
	    } catch( e ) {
	        support.deleteExpando = false;
	    }

	    if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
	        div.attachEvent( "onclick", clickFn = function() {
	            // Cloning a node shouldn't copy over any
	            // bound event handlers (IE does this)
	            support.noCloneEvent = false;
	        });
	        div.cloneNode( true ).fireEvent("onclick");
	        div.detachEvent( "onclick", clickFn );
	    }

	    // Check if a radio maintains its value
	    // after being appended to the DOM
	    input = document.createElement("input");
	    input.value = "t";
	    input.setAttribute( "type", "radio" );
	    support.radioValue = input.value === "t";

	    input.setAttribute( "checked", "checked" );

	    // #11217 - WebKit loses check when the name is after the checked attribute
	    input.setAttribute( "name", "t" );

	    div.appendChild( input );
	    fragment = document.createDocumentFragment();
	    fragment.appendChild( div.lastChild );

	    // WebKit doesn't clone checked state correctly in fragments
	    support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	    // Check if a disconnected checkbox will retain its checked
	    // value of true after appended to the DOM (IE6/7)
	    support.appendChecked = input.checked;

	    fragment.removeChild( input );
	    fragment.appendChild( div );

	    // Technique from Juriy Zaytsev
	    // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	    // We only care about the case where non-standard event systems
	    // are used, namely in IE. Short-circuiting here helps us to
	    // avoid an eval call (in setAttribute) which can cause CSP
	    // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	    if ( div.attachEvent ) {
	        for ( i in {
	            submit: true,
	            change: true,
	            focusin: true
	        }) {
	            eventName = "on" + i;
	            isSupported = ( eventName in div );
	            if ( !isSupported ) {
	                div.setAttribute( eventName, "return;" );
	                isSupported = ( typeof div[ eventName ] === "function" );
	            }
	            support[ i + "Bubbles" ] = isSupported;
	        }
	    }

	    // Run tests that need a body at doc ready
	    jQuery(function() {
	        var container, div, tds, marginDiv,
	            divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
	            body = document.getElementsByTagName("body")[0];

	        if ( !body ) {
	            // Return for frameset docs that don't have a body
	            return;
	        }

	        container = document.createElement("div");
	        container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
	        body.insertBefore( container, body.firstChild );

	        // Construct the test element
	        div = document.createElement("div");
	        container.appendChild( div );

	        // Check if table cells still have offsetWidth/Height when they are set
	        // to display:none and there are still other visible table cells in a
	        // table row; if so, offsetWidth/Height are not reliable for use when
	        // determining if an element has been hidden directly using
	        // display:none (it is still safe to use offsets if a parent element is
	        // hidden; don safety goggles and see bug #4512 for more information).
	        // (only IE 8 fails this test)
	        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
	        tds = div.getElementsByTagName("td");
	        tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
	        isSupported = ( tds[ 0 ].offsetHeight === 0 );

	        tds[ 0 ].style.display = "";
	        tds[ 1 ].style.display = "none";

	        // Check if empty table cells still have offsetWidth/Height
	        // (IE <= 8 fail this test)
	        support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

	        // Check box-sizing and margin behavior
	        div.innerHTML = "";
	        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
	        support.boxSizing = ( div.offsetWidth === 4 );
	        support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

	        // NOTE: To any future maintainer, we've window.getComputedStyle
	        // because jsdom on node.js will break without it.
	        if ( window.getComputedStyle ) {
	            support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
	            support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

	            // Check if div with explicit width and no margin-right incorrectly
	            // gets computed margin-right based on width of container. For more
	            // info see bug #3333
	            // Fails in WebKit before Feb 2011 nightlies
	            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	            marginDiv = document.createElement("div");
	            marginDiv.style.cssText = div.style.cssText = divReset;
	            marginDiv.style.marginRight = marginDiv.style.width = "0";
	            div.style.width = "1px";
	            div.appendChild( marginDiv );
	            support.reliableMarginRight =
	                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
	        }

	        if ( typeof div.style.zoom !== "undefined" ) {
	            // Check if natively block-level elements act like inline-block
	            // elements when setting their display to 'inline' and giving
	            // them layout
	            // (IE < 8 does this)
	            div.innerHTML = "";
	            div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
	            support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

	            // Check if elements with layout shrink-wrap their children
	            // (IE 6 does this)
	            div.style.display = "block";
	            div.style.overflow = "visible";
	            div.innerHTML = "<div></div>";
	            div.firstChild.style.width = "5px";
	            support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

	            container.style.zoom = 1;
	        }

	        // Null elements to avoid leaks in IE
	        body.removeChild( container );
	        container = div = tds = marginDiv = null;
	    });

	    // Null elements to avoid leaks in IE
	    fragment.removeChild( div );
	    all = a = select = opt = input = fragment = div = null;

	    return support;
	})();
	var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	    rmultiDash = /([A-Z])/g;

	jQuery.extend({
	    cache: {},

	    deletedIds: [],

	    // Remove at next major release (1.9/2.0)
	    uuid: 0,

	    // Unique for each copy of jQuery on the page
	    // Non-digits removed to match rinlinejQuery
	    expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	    // The following elements throw uncatchable exceptions if you
	    // attempt to add expando properties to them.
	    noData: {
	        "embed": true,
	        // Ban all objects except for Flash (which handle expandos)
	        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
	        "applet": true
	    },

	    hasData: function( elem ) {
	        elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
	        return !!elem && !isEmptyDataObject( elem );
	    },

	    data: function( elem, name, data, pvt /* Internal Use Only */ ) {
	        if ( !jQuery.acceptData( elem ) ) {
	            return;
	        }

	        var thisCache, ret,
	            internalKey = jQuery.expando,
	            getByName = typeof name === "string",

	            // We have to handle DOM nodes and JS objects differently because IE6-7
	            // can't GC object references properly across the DOM-JS boundary
	            isNode = elem.nodeType,

	            // Only DOM nodes need the global jQuery cache; JS object data is
	            // attached directly to the object so GC can occur automatically
	            cache = isNode ? jQuery.cache : elem,

	            // Only defining an ID for JS objects if its cache already exists allows
	            // the code to shortcut on the same path as a DOM node with no cache
	            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	        // Avoid doing any more work than we need to when trying to get data on an
	        // object that has no data at all
	        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
	            return;
	        }

	        if ( !id ) {
	            // Only DOM nodes need a new unique ID for each element since their data
	            // ends up in the global cache
	            if ( isNode ) {
	                elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
	            } else {
	                id = internalKey;
	            }
	        }

	        if ( !cache[ id ] ) {
	            cache[ id ] = {};

	            // Avoids exposing jQuery metadata on plain JS objects when the object
	            // is serialized using JSON.stringify
	            if ( !isNode ) {
	                cache[ id ].toJSON = jQuery.noop;
	            }
	        }

	        // An object can be passed to jQuery.data instead of a key/value pair; this gets
	        // shallow copied over onto the existing cache
	        if ( typeof name === "object" || typeof name === "function" ) {
	            if ( pvt ) {
	                cache[ id ] = jQuery.extend( cache[ id ], name );
	            } else {
	                cache[ id ].data = jQuery.extend( cache[ id ].data, name );
	            }
	        }

	        thisCache = cache[ id ];

	        // jQuery data() is stored in a separate object inside the object's internal data
	        // cache in order to avoid key collisions between internal data and user-defined
	        // data.
	        if ( !pvt ) {
	            if ( !thisCache.data ) {
	                thisCache.data = {};
	            }

	            thisCache = thisCache.data;
	        }

	        if ( data !== undefined ) {
	            thisCache[ jQuery.camelCase( name ) ] = data;
	        }

	        // Check for both converted-to-camel and non-converted data property names
	        // If a data property was specified
	        if ( getByName ) {

	            // First Try to find as-is property data
	            ret = thisCache[ name ];

	            // Test for null|undefined property data
	            if ( ret == null ) {

	                // Try to find the camelCased property
	                ret = thisCache[ jQuery.camelCase( name ) ];
	            }
	        } else {
	            ret = thisCache;
	        }

	        return ret;
	    },

	    removeData: function( elem, name, pvt /* Internal Use Only */ ) {
	        if ( !jQuery.acceptData( elem ) ) {
	            return;
	        }

	        var thisCache, i, l,

	            isNode = elem.nodeType,

	            // See jQuery.data for more information
	            cache = isNode ? jQuery.cache : elem,
	            id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	        // If there is already no cache entry for this object, there is no
	        // purpose in continuing
	        if ( !cache[ id ] ) {
	            return;
	        }

	        if ( name ) {

	            thisCache = pvt ? cache[ id ] : cache[ id ].data;

	            if ( thisCache ) {

	                // Support array or space separated string names for data keys
	                if ( !jQuery.isArray( name ) ) {

	                    // try the string as a key before any manipulation
	                    if ( name in thisCache ) {
	                        name = [ name ];
	                    } else {

	                        // split the camel cased version by spaces unless a key with the spaces exists
	                        name = jQuery.camelCase( name );
	                        if ( name in thisCache ) {
	                            name = [ name ];
	                        } else {
	                            name = name.split(" ");
	                        }
	                    }
	                }

	                for ( i = 0, l = name.length; i < l; i++ ) {
	                    delete thisCache[ name[i] ];
	                }

	                // If there is no data left in the cache, we want to continue
	                // and let the cache object itself get destroyed
	                if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
	                    return;
	                }
	            }
	        }

	        // See jQuery.data for more information
	        if ( !pvt ) {
	            delete cache[ id ].data;

	            // Don't destroy the parent cache unless the internal data object
	            // had been the only thing left in it
	            if ( !isEmptyDataObject( cache[ id ] ) ) {
	                return;
	            }
	        }

	        // Destroy the cache
	        if ( isNode ) {
	            jQuery.cleanData( [ elem ], true );

	        // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	        } else if ( jQuery.support.deleteExpando || cache != cache.window ) {
	            delete cache[ id ];

	        // When all else fails, null
	        } else {
	            cache[ id ] = null;
	        }
	    },

	    // For internal use only.
	    _data: function( elem, name, data ) {
	        return jQuery.data( elem, name, data, true );
	    },

	    // A method for determining if a DOM node can handle the data expando
	    acceptData: function( elem ) {
	        var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

	        // nodes accept data unless otherwise specified; rejection can be conditional
	        return !noData || noData !== true && elem.getAttribute("classid") === noData;
	    }
	});

	jQuery.fn.extend({
	    data: function( key, value ) {
	        var parts, part, attr, name, l,
	            elem = this[0],
	            i = 0,
	            data = null;

	        // Gets all values
	        if ( key === undefined ) {
	            if ( this.length ) {
	                data = jQuery.data( elem );

	                if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
	                    attr = elem.attributes;
	                    for ( l = attr.length; i < l; i++ ) {
	                        name = attr[i].name;

	                        if ( !name.indexOf( "data-" ) ) {
	                            name = jQuery.camelCase( name.substring(5) );

	                            dataAttr( elem, name, data[ name ] );
	                        }
	                    }
	                    jQuery._data( elem, "parsedAttrs", true );
	                }
	            }

	            return data;
	        }

	        // Sets multiple values
	        if ( typeof key === "object" ) {
	            return this.each(function() {
	                jQuery.data( this, key );
	            });
	        }

	        parts = key.split( ".", 2 );
	        parts[1] = parts[1] ? "." + parts[1] : "";
	        part = parts[1] + "!";

	        return jQuery.access( this, function( value ) {

	            if ( value === undefined ) {
	                data = this.triggerHandler( "getData" + part, [ parts[0] ] );

	                // Try to fetch any internally stored data first
	                if ( data === undefined && elem ) {
	                    data = jQuery.data( elem, key );
	                    data = dataAttr( elem, key, data );
	                }

	                return data === undefined && parts[1] ?
	                    this.data( parts[0] ) :
	                    data;
	            }

	            parts[1] = value;
	            this.each(function() {
	                var self = jQuery( this );

	                self.triggerHandler( "setData" + part, parts );
	                jQuery.data( this, key, value );
	                self.triggerHandler( "changeData" + part, parts );
	            });
	        }, null, value, arguments.length > 1, null, false );
	    },

	    removeData: function( key ) {
	        return this.each(function() {
	            jQuery.removeData( this, key );
	        });
	    }
	});

	function dataAttr( elem, key, data ) {
	    // If nothing was found internally, try to fetch any
	    // data from the HTML5 data-* attribute
	    if ( data === undefined && elem.nodeType === 1 ) {

	        var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

	        data = elem.getAttribute( name );

	        if ( typeof data === "string" ) {
	            try {
	                data = data === "true" ? true :
	                data === "false" ? false :
	                data === "null" ? null :
	                // Only convert to a number if it doesn't change the string
	                +data + "" === data ? +data :
	                rbrace.test( data ) ? jQuery.parseJSON( data ) :
	                    data;
	            } catch( e ) {}

	            // Make sure we set the data so it isn't changed later
	            jQuery.data( elem, key, data );

	        } else {
	            data = undefined;
	        }
	    }

	    return data;
	}

	// checks a cache object for emptiness
	function isEmptyDataObject( obj ) {
	    var name;
	    for ( name in obj ) {

	        // if the public data object is empty, the private is still empty
	        if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
	            continue;
	        }
	        if ( name !== "toJSON" ) {
	            return false;
	        }
	    }

	    return true;
	}
	jQuery.extend({
	    queue: function( elem, type, data ) {
	        var queue;

	        if ( elem ) {
	            type = ( type || "fx" ) + "queue";
	            queue = jQuery._data( elem, type );

	            // Speed up dequeue by getting out quickly if this is just a lookup
	            if ( data ) {
	                if ( !queue || jQuery.isArray(data) ) {
	                    queue = jQuery._data( elem, type, jQuery.makeArray(data) );
	                } else {
	                    queue.push( data );
	                }
	            }
	            return queue || [];
	        }
	    },

	    dequeue: function( elem, type ) {
	        type = type || "fx";

	        var queue = jQuery.queue( elem, type ),
	            startLength = queue.length,
	            fn = queue.shift(),
	            hooks = jQuery._queueHooks( elem, type ),
	            next = function() {
	                jQuery.dequeue( elem, type );
	            };

	        // If the fx queue is dequeued, always remove the progress sentinel
	        if ( fn === "inprogress" ) {
	            fn = queue.shift();
	            startLength--;
	        }

	        if ( fn ) {

	            // Add a progress sentinel to prevent the fx queue from being
	            // automatically dequeued
	            if ( type === "fx" ) {
	                queue.unshift( "inprogress" );
	            }

	            // clear up the last queue stop function
	            delete hooks.stop;
	            fn.call( elem, next, hooks );
	        }

	        if ( !startLength && hooks ) {
	            hooks.empty.fire();
	        }
	    },

	    // not intended for public consumption - generates a queueHooks object, or returns the current one
	    _queueHooks: function( elem, type ) {
	        var key = type + "queueHooks";
	        return jQuery._data( elem, key ) || jQuery._data( elem, key, {
	            empty: jQuery.Callbacks("once memory").add(function() {
	                jQuery.removeData( elem, type + "queue", true );
	                jQuery.removeData( elem, key, true );
	            })
	        });
	    }
	});

	jQuery.fn.extend({
	    queue: function( type, data ) {
	        var setter = 2;

	        if ( typeof type !== "string" ) {
	            data = type;
	            type = "fx";
	            setter--;
	        }

	        if ( arguments.length < setter ) {
	            return jQuery.queue( this[0], type );
	        }

	        return data === undefined ?
	            this :
	            this.each(function() {
	                var queue = jQuery.queue( this, type, data );

	                // ensure a hooks for this queue
	                jQuery._queueHooks( this, type );

	                if ( type === "fx" && queue[0] !== "inprogress" ) {
	                    jQuery.dequeue( this, type );
	                }
	            });
	    },
	    dequeue: function( type ) {
	        return this.each(function() {
	            jQuery.dequeue( this, type );
	        });
	    },
	    // Based off of the plugin by Clint Helfers, with permission.
	    // http://blindsignals.com/index.php/2009/07/jquery-delay/
	    delay: function( time, type ) {
	        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	        type = type || "fx";

	        return this.queue( type, function( next, hooks ) {
	            var timeout = setTimeout( next, time );
	            hooks.stop = function() {
	                clearTimeout( timeout );
	            };
	        });
	    },
	    clearQueue: function( type ) {
	        return this.queue( type || "fx", [] );
	    },
	    // Get a promise resolved when queues of a certain type
	    // are emptied (fx is the type by default)
	    promise: function( type, obj ) {
	        var tmp,
	            count = 1,
	            defer = jQuery.Deferred(),
	            elements = this,
	            i = this.length,
	            resolve = function() {
	                if ( !( --count ) ) {
	                    defer.resolveWith( elements, [ elements ] );
	                }
	            };

	        if ( typeof type !== "string" ) {
	            obj = type;
	            type = undefined;
	        }
	        type = type || "fx";

	        while( i-- ) {
	            tmp = jQuery._data( elements[ i ], type + "queueHooks" );
	            if ( tmp && tmp.empty ) {
	                count++;
	                tmp.empty.add( resolve );
	            }
	        }
	        resolve();
	        return defer.promise( obj );
	    }
	});
	var nodeHook, boolHook, fixSpecified,
	    rclass = /[\t\r\n]/g,
	    rreturn = /\r/g,
	    rtype = /^(?:button|input)$/i,
	    rfocusable = /^(?:button|input|object|select|textarea)$/i,
	    rclickable = /^a(?:rea|)$/i,
	    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	    getSetAttribute = jQuery.support.getSetAttribute;

	jQuery.fn.extend({
	    attr: function( name, value ) {
	        return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	    },

	    removeAttr: function( name ) {
	        return this.each(function() {
	            jQuery.removeAttr( this, name );
	        });
	    },

	    prop: function( name, value ) {
	        return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	    },

	    removeProp: function( name ) {
	        name = jQuery.propFix[ name ] || name;
	        return this.each(function() {
	            // try/catch handles cases where IE balks (such as removing a property on window)
	            try {
	                this[ name ] = undefined;
	                delete this[ name ];
	            } catch( e ) {}
	        });
	    },

	    addClass: function( value ) {
	        var classNames, i, l, elem,
	            setClass, c, cl;

	        if ( jQuery.isFunction( value ) ) {
	            return this.each(function( j ) {
	                jQuery( this ).addClass( value.call(this, j, this.className) );
	            });
	        }

	        if ( value && typeof value === "string" ) {
	            classNames = value.split( core_rspace );

	            for ( i = 0, l = this.length; i < l; i++ ) {
	                elem = this[ i ];

	                if ( elem.nodeType === 1 ) {
	                    if ( !elem.className && classNames.length === 1 ) {
	                        elem.className = value;

	                    } else {
	                        setClass = " " + elem.className + " ";

	                        for ( c = 0, cl = classNames.length; c < cl; c++ ) {
	                            if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
	                                setClass += classNames[ c ] + " ";
	                            }
	                        }
	                        elem.className = jQuery.trim( setClass );
	                    }
	                }
	            }
	        }

	        return this;
	    },

	    removeClass: function( value ) {
	        var removes, className, elem, c, cl, i, l;

	        if ( jQuery.isFunction( value ) ) {
	            return this.each(function( j ) {
	                jQuery( this ).removeClass( value.call(this, j, this.className) );
	            });
	        }
	        if ( (value && typeof value === "string") || value === undefined ) {
	            removes = ( value || "" ).split( core_rspace );

	            for ( i = 0, l = this.length; i < l; i++ ) {
	                elem = this[ i ];
	                if ( elem.nodeType === 1 && elem.className ) {

	                    className = (" " + elem.className + " ").replace( rclass, " " );

	                    // loop over each item in the removal list
	                    for ( c = 0, cl = removes.length; c < cl; c++ ) {
	                        // Remove until there is nothing to remove,
	                        while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
	                            className = className.replace( " " + removes[ c ] + " " , " " );
	                        }
	                    }
	                    elem.className = value ? jQuery.trim( className ) : "";
	                }
	            }
	        }

	        return this;
	    },

	    toggleClass: function( value, stateVal ) {
	        var type = typeof value,
	            isBool = typeof stateVal === "boolean";

	        if ( jQuery.isFunction( value ) ) {
	            return this.each(function( i ) {
	                jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
	            });
	        }

	        return this.each(function() {
	            if ( type === "string" ) {
	                // toggle individual class names
	                var className,
	                    i = 0,
	                    self = jQuery( this ),
	                    state = stateVal,
	                    classNames = value.split( core_rspace );

	                while ( (className = classNames[ i++ ]) ) {
	                    // check each className given, space separated list
	                    state = isBool ? state : !self.hasClass( className );
	                    self[ state ? "addClass" : "removeClass" ]( className );
	                }

	            } else if ( type === "undefined" || type === "boolean" ) {
	                if ( this.className ) {
	                    // store className if set
	                    jQuery._data( this, "__className__", this.className );
	                }

	                // toggle whole className
	                this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
	            }
	        });
	    },

	    hasClass: function( selector ) {
	        var className = " " + selector + " ",
	            i = 0,
	            l = this.length;
	        for ( ; i < l; i++ ) {
	            if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
	                return true;
	            }
	        }

	        return false;
	    },

	    val: function( value ) {
	        var hooks, ret, isFunction,
	            elem = this[0];

	        if ( !arguments.length ) {
	            if ( elem ) {
	                hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

	                if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
	                    return ret;
	                }

	                ret = elem.value;

	                return typeof ret === "string" ?
	                    // handle most common string cases
	                    ret.replace(rreturn, "") :
	                    // handle cases where value is null/undef or number
	                    ret == null ? "" : ret;
	            }

	            return;
	        }

	        isFunction = jQuery.isFunction( value );

	        return this.each(function( i ) {
	            var val,
	                self = jQuery(this);

	            if ( this.nodeType !== 1 ) {
	                return;
	            }

	            if ( isFunction ) {
	                val = value.call( this, i, self.val() );
	            } else {
	                val = value;
	            }

	            // Treat null/undefined as ""; convert numbers to string
	            if ( val == null ) {
	                val = "";
	            } else if ( typeof val === "number" ) {
	                val += "";
	            } else if ( jQuery.isArray( val ) ) {
	                val = jQuery.map(val, function ( value ) {
	                    return value == null ? "" : value + "";
	                });
	            }

	            hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

	            // If set returns undefined, fall back to normal setting
	            if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
	                this.value = val;
	            }
	        });
	    }
	});

	jQuery.extend({
	    valHooks: {
	        option: {
	            get: function( elem ) {
	                // attributes.value is undefined in Blackberry 4.7 but
	                // uses .value. See #6932
	                var val = elem.attributes.value;
	                return !val || val.specified ? elem.value : elem.text;
	            }
	        },
	        select: {
	            get: function( elem ) {
	                var value, option,
	                    options = elem.options,
	                    index = elem.selectedIndex,
	                    one = elem.type === "select-one" || index < 0,
	                    values = one ? null : [],
	                    max = one ? index + 1 : options.length,
	                    i = index < 0 ?
	                        max :
	                        one ? index : 0;

	                // Loop through all the selected options
	                for ( ; i < max; i++ ) {
	                    option = options[ i ];

	                    // oldIE doesn't update selected after form reset (#2551)
	                    if ( ( option.selected || i === index ) &&
	                            // Don't return options that are disabled or in a disabled optgroup
	                            ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
	                            ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

	                        // Get the specific value for the option
	                        value = jQuery( option ).val();

	                        // We don't need an array for one selects
	                        if ( one ) {
	                            return value;
	                        }

	                        // Multi-Selects return an array
	                        values.push( value );
	                    }
	                }

	                return values;
	            },

	            set: function( elem, value ) {
	                var values = jQuery.makeArray( value );

	                jQuery(elem).find("option").each(function() {
	                    this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
	                });

	                if ( !values.length ) {
	                    elem.selectedIndex = -1;
	                }
	                return values;
	            }
	        }
	    },

	    // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	    attrFn: {},

	    attr: function( elem, name, value, pass ) {
	        var ret, hooks, notxml,
	            nType = elem.nodeType;

	        // don't get/set attributes on text, comment and attribute nodes
	        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
	            return;
	        }

	        if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
	            return jQuery( elem )[ name ]( value );
	        }

	        // Fallback to prop when attributes are not supported
	        if ( typeof elem.getAttribute === "undefined" ) {
	            return jQuery.prop( elem, name, value );
	        }

	        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

	        // All attributes are lowercase
	        // Grab necessary hook if one is defined
	        if ( notxml ) {
	            name = name.toLowerCase();
	            hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
	        }

	        if ( value !== undefined ) {

	            if ( value === null ) {
	                jQuery.removeAttr( elem, name );
	                return;

	            } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
	                return ret;

	            } else {
	                elem.setAttribute( name, value + "" );
	                return value;
	            }

	        } else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
	            return ret;

	        } else {

	            ret = elem.getAttribute( name );

	            // Non-existent attributes return null, we normalize to undefined
	            return ret === null ?
	                undefined :
	                ret;
	        }
	    },

	    removeAttr: function( elem, value ) {
	        var propName, attrNames, name, isBool,
	            i = 0;

	        if ( value && elem.nodeType === 1 ) {

	            attrNames = value.split( core_rspace );

	            for ( ; i < attrNames.length; i++ ) {
	                name = attrNames[ i ];

	                if ( name ) {
	                    propName = jQuery.propFix[ name ] || name;
	                    isBool = rboolean.test( name );

	                    // See #9699 for explanation of this approach (setting first, then removal)
	                    // Do not do this for boolean attributes (see #10870)
	                    if ( !isBool ) {
	                        jQuery.attr( elem, name, "" );
	                    }
	                    elem.removeAttribute( getSetAttribute ? name : propName );

	                    // Set corresponding property to false for boolean attributes
	                    if ( isBool && propName in elem ) {
	                        elem[ propName ] = false;
	                    }
	                }
	            }
	        }
	    },

	    attrHooks: {
	        type: {
	            set: function( elem, value ) {
	                // We can't allow the type property to be changed (since it causes problems in IE)
	                if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
	                    jQuery.error( "type property can't be changed" );
	                } else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
	                    // Setting the type on a radio button after the value resets the value in IE6-9
	                    // Reset value to it's default in case type is set after value
	                    // This is for element creation
	                    var val = elem.value;
	                    elem.setAttribute( "type", value );
	                    if ( val ) {
	                        elem.value = val;
	                    }
	                    return value;
	                }
	            }
	        },
	        // Use the value property for back compat
	        // Use the nodeHook for button elements in IE6/7 (#1954)
	        value: {
	            get: function( elem, name ) {
	                if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
	                    return nodeHook.get( elem, name );
	                }
	                return name in elem ?
	                    elem.value :
	                    null;
	            },
	            set: function( elem, value, name ) {
	                if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
	                    return nodeHook.set( elem, value, name );
	                }
	                // Does not return so that setAttribute is also used
	                elem.value = value;
	            }
	        }
	    },

	    propFix: {
	        tabindex: "tabIndex",
	        readonly: "readOnly",
	        "for": "htmlFor",
	        "class": "className",
	        maxlength: "maxLength",
	        cellspacing: "cellSpacing",
	        cellpadding: "cellPadding",
	        rowspan: "rowSpan",
	        colspan: "colSpan",
	        usemap: "useMap",
	        frameborder: "frameBorder",
	        contenteditable: "contentEditable"
	    },

	    prop: function( elem, name, value ) {
	        var ret, hooks, notxml,
	            nType = elem.nodeType;

	        // don't get/set properties on text, comment and attribute nodes
	        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
	            return;
	        }

	        notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

	        if ( notxml ) {
	            // Fix name and attach hooks
	            name = jQuery.propFix[ name ] || name;
	            hooks = jQuery.propHooks[ name ];
	        }

	        if ( value !== undefined ) {
	            if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
	                return ret;

	            } else {
	                return ( elem[ name ] = value );
	            }

	        } else {
	            if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
	                return ret;

	            } else {
	                return elem[ name ];
	            }
	        }
	    },

	    propHooks: {
	        tabIndex: {
	            get: function( elem ) {
	                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
	                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	                var attributeNode = elem.getAttributeNode("tabindex");

	                return attributeNode && attributeNode.specified ?
	                    parseInt( attributeNode.value, 10 ) :
	                    rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
	                        0 :
	                        undefined;
	            }
	        }
	    }
	});

	// Hook for boolean attributes
	boolHook = {
	    get: function( elem, name ) {
	        // Align boolean attributes with corresponding properties
	        // Fall back to attribute presence where some booleans are not supported
	        var attrNode,
	            property = jQuery.prop( elem, name );
	        return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
	            name.toLowerCase() :
	            undefined;
	    },
	    set: function( elem, value, name ) {
	        var propName;
	        if ( value === false ) {
	            // Remove boolean attributes when set to false
	            jQuery.removeAttr( elem, name );
	        } else {
	            // value is true since we know at this point it's type boolean and not false
	            // Set boolean attributes to the same name and set the DOM property
	            propName = jQuery.propFix[ name ] || name;
	            if ( propName in elem ) {
	                // Only set the IDL specifically if it already exists on the element
	                elem[ propName ] = true;
	            }

	            elem.setAttribute( name, name.toLowerCase() );
	        }
	        return name;
	    }
	};

	// IE6/7 do not support getting/setting some attributes with get/setAttribute
	if ( !getSetAttribute ) {

	    fixSpecified = {
	        name: true,
	        id: true,
	        coords: true
	    };

	    // Use this for any attribute in IE6/7
	    // This fixes almost every IE6/7 issue
	    nodeHook = jQuery.valHooks.button = {
	        get: function( elem, name ) {
	            var ret;
	            ret = elem.getAttributeNode( name );
	            return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
	                ret.value :
	                undefined;
	        },
	        set: function( elem, value, name ) {
	            // Set the existing or create a new attribute node
	            var ret = elem.getAttributeNode( name );
	            if ( !ret ) {
	                ret = document.createAttribute( name );
	                elem.setAttributeNode( ret );
	            }
	            return ( ret.value = value + "" );
	        }
	    };

	    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
	    // This is for removals
	    jQuery.each([ "width", "height" ], function( i, name ) {
	        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
	            set: function( elem, value ) {
	                if ( value === "" ) {
	                    elem.setAttribute( name, "auto" );
	                    return value;
	                }
	            }
	        });
	    });

	    // Set contenteditable to false on removals(#10429)
	    // Setting to empty string throws an error as an invalid value
	    jQuery.attrHooks.contenteditable = {
	        get: nodeHook.get,
	        set: function( elem, value, name ) {
	            if ( value === "" ) {
	                value = "false";
	            }
	            nodeHook.set( elem, value, name );
	        }
	    };
	}


	// Some attributes require a special call on IE
	if ( !jQuery.support.hrefNormalized ) {
	    jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
	        jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
	            get: function( elem ) {
	                var ret = elem.getAttribute( name, 2 );
	                return ret === null ? undefined : ret;
	            }
	        });
	    });
	}

	if ( !jQuery.support.style ) {
	    jQuery.attrHooks.style = {
	        get: function( elem ) {
	            // Return undefined in the case of empty string
	            // Normalize to lowercase since IE uppercases css property names
	            return elem.style.cssText.toLowerCase() || undefined;
	        },
	        set: function( elem, value ) {
	            return ( elem.style.cssText = value + "" );
	        }
	    };
	}

	// Safari mis-reports the default selected property of an option
	// Accessing the parent's selectedIndex property fixes it
	if ( !jQuery.support.optSelected ) {
	    jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
	        get: function( elem ) {
	            var parent = elem.parentNode;

	            if ( parent ) {
	                parent.selectedIndex;

	                // Make sure that it also works with optgroups, see #5701
	                if ( parent.parentNode ) {
	                    parent.parentNode.selectedIndex;
	                }
	            }
	            return null;
	        }
	    });
	}

	// IE6/7 call enctype encoding
	if ( !jQuery.support.enctype ) {
	    jQuery.propFix.enctype = "encoding";
	}

	// Radios and checkboxes getter/setter
	if ( !jQuery.support.checkOn ) {
	    jQuery.each([ "radio", "checkbox" ], function() {
	        jQuery.valHooks[ this ] = {
	            get: function( elem ) {
	                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
	                return elem.getAttribute("value") === null ? "on" : elem.value;
	            }
	        };
	    });
	}
	jQuery.each([ "radio", "checkbox" ], function() {
	    jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
	        set: function( elem, value ) {
	            if ( jQuery.isArray( value ) ) {
	                return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
	            }
	        }
	    });
	});
	var rformElems = /^(?:textarea|input|select)$/i,
	    rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	    rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	    rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|contextmenu)|click/,
	    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	    hoverHack = function( events ) {
	        return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	    };

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

	    add: function( elem, types, handler, data, selector ) {

	        var elemData, eventHandle, events,
	            t, tns, type, namespaces, handleObj,
	            handleObjIn, handlers, special;

	        // Don't attach events to noData or text/comment nodes (allow plain objects tho)
	        if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
	            return;
	        }

	        // Caller can pass in an object of custom data in lieu of the handler
	        if ( handler.handler ) {
	            handleObjIn = handler;
	            handler = handleObjIn.handler;
	            selector = handleObjIn.selector;
	        }

	        // Make sure that the handler has a unique ID, used to find/remove it later
	        if ( !handler.guid ) {
	            handler.guid = jQuery.guid++;
	        }

	        // Init the element's event structure and main handler, if this is the first
	        events = elemData.events;
	        if ( !events ) {
	            elemData.events = events = {};
	        }
	        eventHandle = elemData.handle;
	        if ( !eventHandle ) {
	            elemData.handle = eventHandle = function( e ) {
	                // Discard the second event of a jQuery.event.trigger() and
	                // when an event is called after a page has unloaded
	                return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
	                    jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
	                    undefined;
	            };
	            // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
	            eventHandle.elem = elem;
	        }

	        // Handle multiple events separated by a space
	        // jQuery(...).bind("mouseover mouseout", fn);
	        types = jQuery.trim( hoverHack(types) ).split( " " );
	        for ( t = 0; t < types.length; t++ ) {

	            tns = rtypenamespace.exec( types[t] ) || [];
	            type = tns[1];
	            namespaces = ( tns[2] || "" ).split( "." ).sort();

	            // If event changes its type, use the special event handlers for the changed type
	            special = jQuery.event.special[ type ] || {};

	            // If selector defined, determine special event api type, otherwise given type
	            type = ( selector ? special.delegateType : special.bindType ) || type;

	            // Update special based on newly reset type
	            special = jQuery.event.special[ type ] || {};

	            // handleObj is passed to all event handlers
	            handleObj = jQuery.extend({
	                type: type,
	                origType: tns[1],
	                data: data,
	                handler: handler,
	                guid: handler.guid,
	                selector: selector,
	                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
	                namespace: namespaces.join(".")
	            }, handleObjIn );

	            // Init the event handler queue if we're the first
	            handlers = events[ type ];
	            if ( !handlers ) {
	                handlers = events[ type ] = [];
	                handlers.delegateCount = 0;

	                // Only use addEventListener/attachEvent if the special events handler returns false
	                if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	                    // Bind the global event handler to the element
	                    if ( elem.addEventListener ) {
	                        elem.addEventListener( type, eventHandle, false );

	                    } else if ( elem.attachEvent ) {
	                        elem.attachEvent( "on" + type, eventHandle );
	                    }
	                }
	            }

	            if ( special.add ) {
	                special.add.call( elem, handleObj );

	                if ( !handleObj.handler.guid ) {
	                    handleObj.handler.guid = handler.guid;
	                }
	            }

	            // Add to the element's handler list, delegates in front
	            if ( selector ) {
	                handlers.splice( handlers.delegateCount++, 0, handleObj );
	            } else {
	                handlers.push( handleObj );
	            }

	            // Keep track of which events have ever been used, for event optimization
	            jQuery.event.global[ type ] = true;
	        }

	        // Nullify elem to prevent memory leaks in IE
	        elem = null;
	    },

	    global: {},

	    // Detach an event or set of events from an element
	    remove: function( elem, types, handler, selector, mappedTypes ) {

	        var t, tns, type, origType, namespaces, origCount,
	            j, events, special, eventType, handleObj,
	            elemData = jQuery.hasData( elem ) && jQuery._data( elem );

	        if ( !elemData || !(events = elemData.events) ) {
	            return;
	        }

	        // Once for each type.namespace in types; type may be omitted
	        types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
	        for ( t = 0; t < types.length; t++ ) {
	            tns = rtypenamespace.exec( types[t] ) || [];
	            type = origType = tns[1];
	            namespaces = tns[2];

	            // Unbind all events (on this namespace, if provided) for the element
	            if ( !type ) {
	                for ( type in events ) {
	                    jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
	                }
	                continue;
	            }

	            special = jQuery.event.special[ type ] || {};
	            type = ( selector? special.delegateType : special.bindType ) || type;
	            eventType = events[ type ] || [];
	            origCount = eventType.length;
	            namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

	            // Remove matching events
	            for ( j = 0; j < eventType.length; j++ ) {
	                handleObj = eventType[ j ];

	                if ( ( mappedTypes || origType === handleObj.origType ) &&
	                     ( !handler || handler.guid === handleObj.guid ) &&
	                     ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
	                     ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
	                    eventType.splice( j--, 1 );

	                    if ( handleObj.selector ) {
	                        eventType.delegateCount--;
	                    }
	                    if ( special.remove ) {
	                        special.remove.call( elem, handleObj );
	                    }
	                }
	            }

	            // Remove generic event handler if we removed something and no more handlers exist
	            // (avoids potential for endless recursion during removal of special event handlers)
	            if ( eventType.length === 0 && origCount !== eventType.length ) {
	                if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	                    jQuery.removeEvent( elem, type, elemData.handle );
	                }

	                delete events[ type ];
	            }
	        }

	        // Remove the expando if it's no longer used
	        if ( jQuery.isEmptyObject( events ) ) {
	            delete elemData.handle;

	            // removeData also checks for emptiness and clears the expando if empty
	            // so use it instead of delete
	            jQuery.removeData( elem, "events", true );
	        }
	    },

	    // Events that are safe to short-circuit if no handlers are attached.
	    // Native DOM events should not be added, they may have inline handlers.
	    customEvent: {
	        "getData": true,
	        "setData": true,
	        "changeData": true
	    },

	    trigger: function( event, data, elem, onlyHandlers ) {
	        // Don't do events on text and comment nodes
	        if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
	            return;
	        }

	        // Event object or event type
	        var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
	            type = event.type || event,
	            namespaces = [];

	        // focus/blur morphs to focusin/out; ensure we're not firing them right now
	        if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
	            return;
	        }

	        if ( type.indexOf( "!" ) >= 0 ) {
	            // Exclusive events trigger only for the exact event (no namespaces)
	            type = type.slice(0, -1);
	            exclusive = true;
	        }

	        if ( type.indexOf( "." ) >= 0 ) {
	            // Namespaced trigger; create a regexp to match event type in handle()
	            namespaces = type.split(".");
	            type = namespaces.shift();
	            namespaces.sort();
	        }

	        if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
	            // No jQuery handlers for this event type, and it can't have inline handlers
	            return;
	        }

	        // Caller can pass in an Event, Object, or just an event type string
	        event = typeof event === "object" ?
	            // jQuery.Event object
	            event[ jQuery.expando ] ? event :
	            // Object literal
	            new jQuery.Event( type, event ) :
	            // Just the event type (string)
	            new jQuery.Event( type );

	        event.type = type;
	        event.isTrigger = true;
	        event.exclusive = exclusive;
	        event.namespace = namespaces.join( "." );
	        event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
	        ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

	        // Handle a global trigger
	        if ( !elem ) {

	            // TODO: Stop taunting the data cache; remove global events and always attach to document
	            cache = jQuery.cache;
	            for ( i in cache ) {
	                if ( cache[ i ].events && cache[ i ].events[ type ] ) {
	                    jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
	                }
	            }
	            return;
	        }

	        // Clean up the event in case it is being reused
	        event.result = undefined;
	        if ( !event.target ) {
	            event.target = elem;
	        }

	        // Clone any incoming data and prepend the event, creating the handler arg list
	        data = data != null ? jQuery.makeArray( data ) : [];
	        data.unshift( event );

	        // Allow special events to draw outside the lines
	        special = jQuery.event.special[ type ] || {};
	        if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
	            return;
	        }

	        // Determine event propagation path in advance, per W3C events spec (#9951)
	        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
	        eventPath = [[ elem, special.bindType || type ]];
	        if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

	            bubbleType = special.delegateType || type;
	            cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
	            for ( old = elem; cur; cur = cur.parentNode ) {
	                eventPath.push([ cur, bubbleType ]);
	                old = cur;
	            }

	            // Only add window if we got to document (e.g., not plain obj or detached DOM)
	            if ( old === (elem.ownerDocument || document) ) {
	                eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
	            }
	        }

	        // Fire handlers on the event path
	        for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

	            cur = eventPath[i][0];
	            event.type = eventPath[i][1];

	            handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
	            if ( handle ) {
	                handle.apply( cur, data );
	            }
	            // Note that this is a bare JS function and not a jQuery handler
	            handle = ontype && cur[ ontype ];
	            if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
	                event.preventDefault();
	            }
	        }
	        event.type = type;

	        // If nobody prevented the default action, do it now
	        if ( !onlyHandlers && !event.isDefaultPrevented() ) {

	            if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
	                !(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

	                // Call a native DOM method on the target with the same name name as the event.
	                // Can't use an .isFunction() check here because IE6/7 fails that test.
	                // Don't do default actions on window, that's where global variables be (#6170)
	                // IE<9 dies on focus/blur to hidden element (#1486)
	                if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

	                    // Don't re-trigger an onFOO event when we call its FOO() method
	                    old = elem[ ontype ];

	                    if ( old ) {
	                        elem[ ontype ] = null;
	                    }

	                    // Prevent re-triggering of the same event, since we already bubbled it above
	                    jQuery.event.triggered = type;
	                    elem[ type ]();
	                    jQuery.event.triggered = undefined;

	                    if ( old ) {
	                        elem[ ontype ] = old;
	                    }
	                }
	            }
	        }

	        return event.result;
	    },

	    dispatch: function( event ) {

	        // Make a writable jQuery.Event from the native event object
	        event = jQuery.event.fix( event || window.event );

	        var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
	            handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
	            delegateCount = handlers.delegateCount,
	            args = core_slice.call( arguments ),
	            run_all = !event.exclusive && !event.namespace,
	            special = jQuery.event.special[ event.type ] || {},
	            handlerQueue = [];

	        // Use the fix-ed jQuery.Event rather than the (read-only) native event
	        args[0] = event;
	        event.delegateTarget = this;

	        // Call the preDispatch hook for the mapped type, and let it bail if desired
	        if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
	            return;
	        }

	        // Determine handlers that should run if there are delegated events
	        // Avoid non-left-click bubbling in Firefox (#3861)
	        if ( delegateCount && !(event.button && event.type === "click") ) {

	            for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

	                // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
	                if ( cur.disabled !== true || event.type !== "click" ) {
	                    selMatch = {};
	                    matches = [];
	                    for ( i = 0; i < delegateCount; i++ ) {
	                        handleObj = handlers[ i ];
	                        sel = handleObj.selector;

	                        if ( selMatch[ sel ] === undefined ) {
	                            selMatch[ sel ] = handleObj.needsContext ?
	                                jQuery( sel, this ).index( cur ) >= 0 :
	                                jQuery.find( sel, this, null, [ cur ] ).length;
	                        }
	                        if ( selMatch[ sel ] ) {
	                            matches.push( handleObj );
	                        }
	                    }
	                    if ( matches.length ) {
	                        handlerQueue.push({ elem: cur, matches: matches });
	                    }
	                }
	            }
	        }

	        // Add the remaining (directly-bound) handlers
	        if ( handlers.length > delegateCount ) {
	            handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
	        }

	        // Run delegates first; they may want to stop propagation beneath us
	        for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
	            matched = handlerQueue[ i ];
	            event.currentTarget = matched.elem;

	            for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
	                handleObj = matched.matches[ j ];

	                // Triggered event must either 1) be non-exclusive and have no namespace, or
	                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
	                if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

	                    event.data = handleObj.data;
	                    event.handleObj = handleObj;

	                    ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
	                            .apply( matched.elem, args );

	                    if ( ret !== undefined ) {
	                        event.result = ret;
	                        if ( ret === false ) {
	                            event.preventDefault();
	                            event.stopPropagation();
	                        }
	                    }
	                }
	            }
	        }

	        // Call the postDispatch hook for the mapped type
	        if ( special.postDispatch ) {
	            special.postDispatch.call( this, event );
	        }

	        return event.result;
	    },

	    // Includes some event props shared by KeyEvent and MouseEvent
	    // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	    fixHooks: {},

	    keyHooks: {
	        props: "char charCode key keyCode".split(" "),
	        filter: function( event, original ) {

	            // Add which for key events
	            if ( event.which == null ) {
	                event.which = original.charCode != null ? original.charCode : original.keyCode;
	            }

	            return event;
	        }
	    },

	    mouseHooks: {
	        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
	        filter: function( event, original ) {
	            var eventDoc, doc, body,
	                button = original.button,
	                fromElement = original.fromElement;

	            // Calculate pageX/Y if missing and clientX/Y available
	            if ( event.pageX == null && original.clientX != null ) {
	                eventDoc = event.target.ownerDocument || document;
	                doc = eventDoc.documentElement;
	                body = eventDoc.body;

	                event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
	                event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
	            }

	            // Add relatedTarget, if necessary
	            if ( !event.relatedTarget && fromElement ) {
	                event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
	            }

	            // Add which for click: 1 === left; 2 === middle; 3 === right
	            // Note: button is not normalized, so don't use it
	            if ( !event.which && button !== undefined ) {
	                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
	            }

	            return event;
	        }
	    },

	    fix: function( event ) {
	        if ( event[ jQuery.expando ] ) {
	            return event;
	        }

	        // Create a writable copy of the event object and normalize some properties
	        var i, prop,
	            originalEvent = event,
	            fixHook = jQuery.event.fixHooks[ event.type ] || {},
	            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

	        event = jQuery.Event( originalEvent );

	        for ( i = copy.length; i; ) {
	            prop = copy[ --i ];
	            event[ prop ] = originalEvent[ prop ];
	        }

	        // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
	        if ( !event.target ) {
	            event.target = originalEvent.srcElement || document;
	        }

	        // Target should not be a text node (#504, Safari)
	        if ( event.target.nodeType === 3 ) {
	            event.target = event.target.parentNode;
	        }

	        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
	        event.metaKey = !!event.metaKey;

	        return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	    },

	    special: {
	        load: {
	            // Prevent triggered image.load events from bubbling to window.load
	            noBubble: true
	        },

	        focus: {
	            delegateType: "focusin"
	        },
	        blur: {
	            delegateType: "focusout"
	        },

	        beforeunload: {
	            setup: function( data, namespaces, eventHandle ) {
	                // We only want to do this special case on windows
	                if ( jQuery.isWindow( this ) ) {
	                    this.onbeforeunload = eventHandle;
	                }
	            },

	            teardown: function( namespaces, eventHandle ) {
	                if ( this.onbeforeunload === eventHandle ) {
	                    this.onbeforeunload = null;
	                }
	            }
	        }
	    },

	    simulate: function( type, elem, event, bubble ) {
	        // Piggyback on a donor event to simulate a different one.
	        // Fake originalEvent to avoid donor's stopPropagation, but if the
	        // simulated event prevents default then we do the same on the donor.
	        var e = jQuery.extend(
	            new jQuery.Event(),
	            event,
	            { type: type,
	                isSimulated: true,
	                originalEvent: {}
	            }
	        );
	        if ( bubble ) {
	            jQuery.event.trigger( e, null, elem );
	        } else {
	            jQuery.event.dispatch.call( elem, e );
	        }
	        if ( e.isDefaultPrevented() ) {
	            event.preventDefault();
	        }
	    }
	};

	// Some plugins are using, but it's undocumented/deprecated and will be removed.
	// The 1.7 special event interface should provide all the hooks needed now.
	jQuery.event.handle = jQuery.event.dispatch;

	jQuery.removeEvent = document.removeEventListener ?
	    function( elem, type, handle ) {
	        if ( elem.removeEventListener ) {
	            elem.removeEventListener( type, handle, false );
	        }
	    } :
	    function( elem, type, handle ) {
	        var name = "on" + type;

	        if ( elem.detachEvent ) {

	            // #8545, #7054, preventing memory leaks for custom events in IE6-8
	            // detachEvent needed property on element, by name of that event, to properly expose it to GC
	            if ( typeof elem[ name ] === "undefined" ) {
	                elem[ name ] = null;
	            }

	            elem.detachEvent( name, handle );
	        }
	    };

	jQuery.Event = function( src, props ) {
	    // Allow instantiation without the 'new' keyword
	    if ( !(this instanceof jQuery.Event) ) {
	        return new jQuery.Event( src, props );
	    }

	    // Event object
	    if ( src && src.type ) {
	        this.originalEvent = src;
	        this.type = src.type;

	        // Events bubbling up the document may have been marked as prevented
	        // by a handler lower down the tree; reflect the correct value.
	        this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
	            src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	    // Event type
	    } else {
	        this.type = src;
	    }

	    // Put explicitly provided properties onto the event object
	    if ( props ) {
	        jQuery.extend( this, props );
	    }

	    // Create a timestamp if incoming event doesn't have one
	    this.timeStamp = src && src.timeStamp || jQuery.now();

	    // Mark it as fixed
	    this[ jQuery.expando ] = true;
	};

	function returnFalse() {
	    return false;
	}
	function returnTrue() {
	    return true;
	}

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
	    preventDefault: function() {
	        this.isDefaultPrevented = returnTrue;

	        var e = this.originalEvent;
	        if ( !e ) {
	            return;
	        }

	        // if preventDefault exists run it on the original event
	        if ( e.preventDefault ) {
	            e.preventDefault();

	        // otherwise set the returnValue property of the original event to false (IE)
	        } else {
	            e.returnValue = false;
	        }
	    },
	    stopPropagation: function() {
	        this.isPropagationStopped = returnTrue;

	        var e = this.originalEvent;
	        if ( !e ) {
	            return;
	        }
	        // if stopPropagation exists run it on the original event
	        if ( e.stopPropagation ) {
	            e.stopPropagation();
	        }
	        // otherwise set the cancelBubble property of the original event to true (IE)
	        e.cancelBubble = true;
	    },
	    stopImmediatePropagation: function() {
	        this.isImmediatePropagationStopped = returnTrue;
	        this.stopPropagation();
	    },
	    isDefaultPrevented: returnFalse,
	    isPropagationStopped: returnFalse,
	    isImmediatePropagationStopped: returnFalse
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	jQuery.each({
	    mouseenter: "mouseover",
	    mouseleave: "mouseout"
	}, function( orig, fix ) {
	    jQuery.event.special[ orig ] = {
	        delegateType: fix,
	        bindType: fix,

	        handle: function( event ) {
	            var ret,
	                target = this,
	                related = event.relatedTarget,
	                handleObj = event.handleObj,
	                selector = handleObj.selector;

	            // For mousenter/leave call the handler if related is outside the target.
	            // NB: No relatedTarget if the mouse left/entered the browser window
	            if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
	                event.type = handleObj.origType;
	                ret = handleObj.handler.apply( this, arguments );
	                event.type = fix;
	            }
	            return ret;
	        }
	    };
	});

	// IE submit delegation
	if ( !jQuery.support.submitBubbles ) {

	    jQuery.event.special.submit = {
	        setup: function() {
	            // Only need this for delegated form submit events
	            if ( jQuery.nodeName( this, "form" ) ) {
	                return false;
	            }

	            // Lazy-add a submit handler when a descendant form may potentially be submitted
	            jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
	                // Node name check avoids a VML-related crash in IE (#9807)
	                var elem = e.target,
	                    form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
	                if ( form && !jQuery._data( form, "_submit_attached" ) ) {
	                    jQuery.event.add( form, "submit._submit", function( event ) {
	                        event._submit_bubble = true;
	                    });
	                    jQuery._data( form, "_submit_attached", true );
	                }
	            });
	            // return undefined since we don't need an event listener
	        },

	        postDispatch: function( event ) {
	            // If form was submitted by the user, bubble the event up the tree
	            if ( event._submit_bubble ) {
	                delete event._submit_bubble;
	                if ( this.parentNode && !event.isTrigger ) {
	                    jQuery.event.simulate( "submit", this.parentNode, event, true );
	                }
	            }
	        },

	        teardown: function() {
	            // Only need this for delegated form submit events
	            if ( jQuery.nodeName( this, "form" ) ) {
	                return false;
	            }

	            // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
	            jQuery.event.remove( this, "._submit" );
	        }
	    };
	}

	// IE change delegation and checkbox/radio fix
	if ( !jQuery.support.changeBubbles ) {

	    jQuery.event.special.change = {

	        setup: function() {

	            if ( rformElems.test( this.nodeName ) ) {
	                // IE doesn't fire change on a check/radio until blur; trigger it on click
	                // after a propertychange. Eat the blur-change in special.change.handle.
	                // This still fires onchange a second time for check/radio after blur.
	                if ( this.type === "checkbox" || this.type === "radio" ) {
	                    jQuery.event.add( this, "propertychange._change", function( event ) {
	                        if ( event.originalEvent.propertyName === "checked" ) {
	                            this._just_changed = true;
	                        }
	                    });
	                    jQuery.event.add( this, "click._change", function( event ) {
	                        if ( this._just_changed && !event.isTrigger ) {
	                            this._just_changed = false;
	                        }
	                        // Allow triggered, simulated change events (#11500)
	                        jQuery.event.simulate( "change", this, event, true );
	                    });
	                }
	                return false;
	            }
	            // Delegated event; lazy-add a change handler on descendant inputs
	            jQuery.event.add( this, "beforeactivate._change", function( e ) {
	                var elem = e.target;

	                if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
	                    jQuery.event.add( elem, "change._change", function( event ) {
	                        if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
	                            jQuery.event.simulate( "change", this.parentNode, event, true );
	                        }
	                    });
	                    jQuery._data( elem, "_change_attached", true );
	                }
	            });
	        },

	        handle: function( event ) {
	            var elem = event.target;

	            // Swallow native change events from checkbox/radio, we already triggered them above
	            if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
	                return event.handleObj.handler.apply( this, arguments );
	            }
	        },

	        teardown: function() {
	            jQuery.event.remove( this, "._change" );

	            return !rformElems.test( this.nodeName );
	        }
	    };
	}

	// Create "bubbling" focus and blur events
	if ( !jQuery.support.focusinBubbles ) {
	    jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

	        // Attach a single capturing handler while someone wants focusin/focusout
	        var attaches = 0,
	            handler = function( event ) {
	                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
	            };

	        jQuery.event.special[ fix ] = {
	            setup: function() {
	                if ( attaches++ === 0 ) {
	                    document.addEventListener( orig, handler, true );
	                }
	            },
	            teardown: function() {
	                if ( --attaches === 0 ) {
	                    document.removeEventListener( orig, handler, true );
	                }
	            }
	        };
	    });
	}

	jQuery.fn.extend({

	    on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
	        var origFn, type;

	        // Types can be a map of types/handlers
	        if ( typeof types === "object" ) {
	            // ( types-Object, selector, data )
	            if ( typeof selector !== "string" ) { // && selector != null
	                // ( types-Object, data )
	                data = data || selector;
	                selector = undefined;
	            }
	            for ( type in types ) {
	                this.on( type, selector, data, types[ type ], one );
	            }
	            return this;
	        }

	        if ( data == null && fn == null ) {
	            // ( types, fn )
	            fn = selector;
	            data = selector = undefined;
	        } else if ( fn == null ) {
	            if ( typeof selector === "string" ) {
	                // ( types, selector, fn )
	                fn = data;
	                data = undefined;
	            } else {
	                // ( types, data, fn )
	                fn = data;
	                data = selector;
	                selector = undefined;
	            }
	        }
	        if ( fn === false ) {
	            fn = returnFalse;
	        } else if ( !fn ) {
	            return this;
	        }

	        if ( one === 1 ) {
	            origFn = fn;
	            fn = function( event ) {
	                // Can use an empty set, since event contains the info
	                jQuery().off( event );
	                return origFn.apply( this, arguments );
	            };
	            // Use same guid so caller can remove using origFn
	            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	        }
	        return this.each( function() {
	            jQuery.event.add( this, types, fn, data, selector );
	        });
	    },
	    one: function( types, selector, data, fn ) {
	        return this.on( types, selector, data, fn, 1 );
	    },
	    off: function( types, selector, fn ) {
	        var handleObj, type;
	        if ( types && types.preventDefault && types.handleObj ) {
	            // ( event )  dispatched jQuery.Event
	            handleObj = types.handleObj;
	            jQuery( types.delegateTarget ).off(
	                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
	                handleObj.selector,
	                handleObj.handler
	            );
	            return this;
	        }
	        if ( typeof types === "object" ) {
	            // ( types-object [, selector] )
	            for ( type in types ) {
	                this.off( type, selector, types[ type ] );
	            }
	            return this;
	        }
	        if ( selector === false || typeof selector === "function" ) {
	            // ( types [, fn] )
	            fn = selector;
	            selector = undefined;
	        }
	        if ( fn === false ) {
	            fn = returnFalse;
	        }
	        return this.each(function() {
	            jQuery.event.remove( this, types, fn, selector );
	        });
	    },

	    bind: function( types, data, fn ) {
	        return this.on( types, null, data, fn );
	    },
	    unbind: function( types, fn ) {
	        return this.off( types, null, fn );
	    },

	    live: function( types, data, fn ) {
	        jQuery( this.context ).on( types, this.selector, data, fn );
	        return this;
	    },
	    die: function( types, fn ) {
	        jQuery( this.context ).off( types, this.selector || "**", fn );
	        return this;
	    },

	    delegate: function( selector, types, data, fn ) {
	        return this.on( types, selector, data, fn );
	    },
	    undelegate: function( selector, types, fn ) {
	        // ( namespace ) or ( selector, types [, fn] )
	        return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	    },

	    trigger: function( type, data ) {
	        return this.each(function() {
	            jQuery.event.trigger( type, data, this );
	        });
	    },
	    triggerHandler: function( type, data ) {
	        if ( this[0] ) {
	            return jQuery.event.trigger( type, data, this[0], true );
	        }
	    },

	    toggle: function( fn ) {
	        // Save reference to arguments for access in closure
	        var args = arguments,
	            guid = fn.guid || jQuery.guid++,
	            i = 0,
	            toggler = function( event ) {
	                // Figure out which function to execute
	                var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
	                jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

	                // Make sure that clicks stop
	                event.preventDefault();

	                // and execute the function
	                return args[ lastToggle ].apply( this, arguments ) || false;
	            };

	        // link all the functions, so any of them can unbind this click handler
	        toggler.guid = guid;
	        while ( i < args.length ) {
	            args[ i++ ].guid = guid;
	        }

	        return this.click( toggler );
	    },

	    hover: function( fnOver, fnOut ) {
	        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	    }
	});

	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	    "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	    // Handle event binding
	    jQuery.fn[ name ] = function( data, fn ) {
	        if ( fn == null ) {
	            fn = data;
	            data = null;
	        }

	        return arguments.length > 0 ?
	            this.on( name, null, data, fn ) :
	            this.trigger( name );
	    };

	    if ( rkeyEvent.test( name ) ) {
	        jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	    }

	    if ( rmouseEvent.test( name ) ) {
	        jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	    }
	});
	/*!
	 * Sizzle CSS Selector Engine
	 * Copyright 2012 jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://sizzlejs.com/
	 */
	(function( window, undefined ) {

	var cachedruns,
	    assertGetIdNotName,
	    Expr,
	    getText,
	    isXML,
	    contains,
	    compile,
	    sortOrder,
	    hasDuplicate,
	    outermostContext,

	    baseHasDuplicate = true,
	    strundefined = "undefined",

	    expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	    Token = String,
	    document = window.document,
	    docElem = document.documentElement,
	    dirruns = 0,
	    done = 0,
	    pop = [].pop,
	    push = [].push,
	    slice = [].slice,
	    // Use a stripped-down indexOf if a native one is unavailable
	    indexOf = [].indexOf || function( elem ) {
	        var i = 0,
	            len = this.length;
	        for ( ; i < len; i++ ) {
	            if ( this[i] === elem ) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    // Augment a function for special use by Sizzle
	    markFunction = function( fn, value ) {
	        fn[ expando ] = value == null || value;
	        return fn;
	    },

	    createCache = function() {
	        var cache = {},
	            keys = [];

	        return markFunction(function( key, value ) {
	            // Only keep the most recent entries
	            if ( keys.push( key ) > Expr.cacheLength ) {
	                delete cache[ keys.shift() ];
	            }

	            // Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
	            return (cache[ key + " " ] = value);
	        }, cache );
	    },

	    classCache = createCache(),
	    tokenCache = createCache(),
	    compilerCache = createCache(),

	    // Regex

	    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	    whitespace = "[\\x20\\t\\r\\n\\f]",
	    // http://www.w3.org/TR/css3-syntax/#characters
	    characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	    // Loosely modeled on CSS identifier characters
	    // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	    identifier = characterEncoding.replace( "w", "w#" ),

	    // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	    operators = "([*^$|!~]?=)",
	    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
	        "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	    // Prefer arguments not in parens/brackets,
	    //   then attribute selectors and non-pseudos (denoted by :),
	    //   then anything else
	    // These preferences are here to reduce the number of selectors
	    //   needing tokenize in the PSEUDO preFilter
	    pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	    // For matchExpr.POS and matchExpr.needsContext
	    pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
	        "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	    rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	    rpseudo = new RegExp( pseudos ),

	    // Easily-parseable/retrievable ID or TAG or CLASS selectors
	    rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	    rnot = /^:not/,
	    rsibling = /[\x20\t\r\n\f]*[+~]/,
	    rendsWithNot = /:not\($/,

	    rheader = /h\d/i,
	    rinputs = /input|select|textarea|button/i,

	    rbackslash = /\\(?!\\)/g,

	    matchExpr = {
	        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
	        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
	        "NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
	        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
	        "ATTR": new RegExp( "^" + attributes ),
	        "PSEUDO": new RegExp( "^" + pseudos ),
	        "POS": new RegExp( pos, "i" ),
	        "CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
	            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
	            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
	        // For use in libraries implementing .is()
	        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	    },

	    // Support

	    // Used for testing something on an element
	    assert = function( fn ) {
	        var div = document.createElement("div");

	        try {
	            return fn( div );
	        } catch (e) {
	            return false;
	        } finally {
	            // release memory in IE
	            div = null;
	        }
	    },

	    // Check if getElementsByTagName("*") returns only elements
	    assertTagNameNoComments = assert(function( div ) {
	        div.appendChild( document.createComment("") );
	        return !div.getElementsByTagName("*").length;
	    }),

	    // Check if getAttribute returns normalized href attributes
	    assertHrefNotNormalized = assert(function( div ) {
	        div.innerHTML = "<a href='#'></a>";
	        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
	            div.firstChild.getAttribute("href") === "#";
	    }),

	    // Check if attributes should be retrieved by attribute nodes
	    assertAttributes = assert(function( div ) {
	        div.innerHTML = "<select></select>";
	        var type = typeof div.lastChild.getAttribute("multiple");
	        // IE8 returns a string for some attributes even when not present
	        return type !== "boolean" && type !== "string";
	    }),

	    // Check if getElementsByClassName can be trusted
	    assertUsableClassName = assert(function( div ) {
	        // Opera can't find a second classname (in 9.6)
	        div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
	        if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
	            return false;
	        }

	        // Safari 3.2 caches class attributes and doesn't catch changes
	        div.lastChild.className = "e";
	        return div.getElementsByClassName("e").length === 2;
	    }),

	    // Check if getElementById returns elements by name
	    // Check if getElementsByName privileges form controls or returns elements by ID
	    assertUsableName = assert(function( div ) {
	        // Inject content
	        div.id = expando + 0;
	        div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
	        docElem.insertBefore( div, docElem.firstChild );

	        // Test
	        var pass = document.getElementsByName &&
	            // buggy browsers will return fewer than the correct 2
	            document.getElementsByName( expando ).length === 2 +
	            // buggy browsers will return more than the correct 0
	            document.getElementsByName( expando + 0 ).length;
	        assertGetIdNotName = !document.getElementById( expando );

	        // Cleanup
	        docElem.removeChild( div );

	        return pass;
	    });

	// If slice is not available, provide a backup
	try {
	    slice.call( docElem.childNodes, 0 )[0].nodeType;
	} catch ( e ) {
	    slice = function( i ) {
	        var elem,
	            results = [];
	        for ( ; (elem = this[i]); i++ ) {
	            results.push( elem );
	        }
	        return results;
	    };
	}

	function Sizzle( selector, context, results, seed ) {
	    results = results || [];
	    context = context || document;
	    var match, elem, xml, m,
	        nodeType = context.nodeType;

	    if ( !selector || typeof selector !== "string" ) {
	        return results;
	    }

	    if ( nodeType !== 1 && nodeType !== 9 ) {
	        return [];
	    }

	    xml = isXML( context );

	    if ( !xml && !seed ) {
	        if ( (match = rquickExpr.exec( selector )) ) {
	            // Speed-up: Sizzle("#ID")
	            if ( (m = match[1]) ) {
	                if ( nodeType === 9 ) {
	                    elem = context.getElementById( m );
	                    // Check parentNode to catch when Blackberry 4.6 returns
	                    // nodes that are no longer in the document #6963
	                    if ( elem && elem.parentNode ) {
	                        // Handle the case where IE, Opera, and Webkit return items
	                        // by name instead of ID
	                        if ( elem.id === m ) {
	                            results.push( elem );
	                            return results;
	                        }
	                    } else {
	                        return results;
	                    }
	                } else {
	                    // Context is not a document
	                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
	                        contains( context, elem ) && elem.id === m ) {
	                        results.push( elem );
	                        return results;
	                    }
	                }

	            // Speed-up: Sizzle("TAG")
	            } else if ( match[2] ) {
	                push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
	                return results;

	            // Speed-up: Sizzle(".CLASS")
	            } else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
	                push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
	                return results;
	            }
	        }
	    }

	    // All others
	    return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
	}

	Sizzle.matches = function( expr, elements ) {
	    return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
	    return Sizzle( expr, null, null, [ elem ] ).length > 0;
	};

	// Returns a function to use in pseudos for input types
	function createInputPseudo( type ) {
	    return function( elem ) {
	        var name = elem.nodeName.toLowerCase();
	        return name === "input" && elem.type === type;
	    };
	}

	// Returns a function to use in pseudos for buttons
	function createButtonPseudo( type ) {
	    return function( elem ) {
	        var name = elem.nodeName.toLowerCase();
	        return (name === "input" || name === "button") && elem.type === type;
	    };
	}

	// Returns a function to use in pseudos for positionals
	function createPositionalPseudo( fn ) {
	    return markFunction(function( argument ) {
	        argument = +argument;
	        return markFunction(function( seed, matches ) {
	            var j,
	                matchIndexes = fn( [], seed.length, argument ),
	                i = matchIndexes.length;

	            // Match elements found at the specified indexes
	            while ( i-- ) {
	                if ( seed[ (j = matchIndexes[i]) ] ) {
	                    seed[j] = !(matches[j] = seed[j]);
	                }
	            }
	        });
	    });
	}

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
	    var node,
	        ret = "",
	        i = 0,
	        nodeType = elem.nodeType;

	    if ( nodeType ) {
	        if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
	            // Use textContent for elements
	            // innerText usage removed for consistency of new lines (see #11153)
	            if ( typeof elem.textContent === "string" ) {
	                return elem.textContent;
	            } else {
	                // Traverse its children
	                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
	                    ret += getText( elem );
	                }
	            }
	        } else if ( nodeType === 3 || nodeType === 4 ) {
	            return elem.nodeValue;
	        }
	        // Do not include comment or processing instruction nodes
	    } else {

	        // If no nodeType, this is expected to be an array
	        for ( ; (node = elem[i]); i++ ) {
	            // Do not traverse comment nodes
	            ret += getText( node );
	        }
	    }
	    return ret;
	};

	isXML = Sizzle.isXML = function( elem ) {
	    // documentElement is verified for cases where it doesn't yet exist
	    // (such as loading iframes in IE - #4833)
	    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	    return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	// Element contains another
	contains = Sizzle.contains = docElem.contains ?
	    function( a, b ) {
	        var adown = a.nodeType === 9 ? a.documentElement : a,
	            bup = b && b.parentNode;
	        return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	    } :
	    docElem.compareDocumentPosition ?
	    function( a, b ) {
	        return b && !!( a.compareDocumentPosition( b ) & 16 );
	    } :
	    function( a, b ) {
	        while ( (b = b.parentNode) ) {
	            if ( b === a ) {
	                return true;
	            }
	        }
	        return false;
	    };

	Sizzle.attr = function( elem, name ) {
	    var val,
	        xml = isXML( elem );

	    if ( !xml ) {
	        name = name.toLowerCase();
	    }
	    if ( (val = Expr.attrHandle[ name ]) ) {
	        return val( elem );
	    }
	    if ( xml || assertAttributes ) {
	        return elem.getAttribute( name );
	    }
	    val = elem.getAttributeNode( name );
	    return val ?
	        typeof elem[ name ] === "boolean" ?
	            elem[ name ] ? name : null :
	            val.specified ? val.value : null :
	        null;
	};

	Expr = Sizzle.selectors = {

	    // Can be adjusted by the user
	    cacheLength: 50,

	    createPseudo: markFunction,

	    match: matchExpr,

	    // IE6/7 return a modified href
	    attrHandle: assertHrefNotNormalized ?
	        {} :
	        {
	            "href": function( elem ) {
	                return elem.getAttribute( "href", 2 );
	            },
	            "type": function( elem ) {
	                return elem.getAttribute("type");
	            }
	        },

	    find: {
	        "ID": assertGetIdNotName ?
	            function( id, context, xml ) {
	                if ( typeof context.getElementById !== strundefined && !xml ) {
	                    var m = context.getElementById( id );
	                    // Check parentNode to catch when Blackberry 4.6 returns
	                    // nodes that are no longer in the document #6963
	                    return m && m.parentNode ? [m] : [];
	                }
	            } :
	            function( id, context, xml ) {
	                if ( typeof context.getElementById !== strundefined && !xml ) {
	                    var m = context.getElementById( id );

	                    return m ?
	                        m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
	                            [m] :
	                            undefined :
	                        [];
	                }
	            },

	        "TAG": assertTagNameNoComments ?
	            function( tag, context ) {
	                if ( typeof context.getElementsByTagName !== strundefined ) {
	                    return context.getElementsByTagName( tag );
	                }
	            } :
	            function( tag, context ) {
	                var results = context.getElementsByTagName( tag );

	                // Filter out possible comments
	                if ( tag === "*" ) {
	                    var elem,
	                        tmp = [],
	                        i = 0;

	                    for ( ; (elem = results[i]); i++ ) {
	                        if ( elem.nodeType === 1 ) {
	                            tmp.push( elem );
	                        }
	                    }

	                    return tmp;
	                }
	                return results;
	            },

	        "NAME": assertUsableName && function( tag, context ) {
	            if ( typeof context.getElementsByName !== strundefined ) {
	                return context.getElementsByName( name );
	            }
	        },

	        "CLASS": assertUsableClassName && function( className, context, xml ) {
	            if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
	                return context.getElementsByClassName( className );
	            }
	        }
	    },

	    relative: {
	        ">": { dir: "parentNode", first: true },
	        " ": { dir: "parentNode" },
	        "+": { dir: "previousSibling", first: true },
	        "~": { dir: "previousSibling" }
	    },

	    preFilter: {
	        "ATTR": function( match ) {
	            match[1] = match[1].replace( rbackslash, "" );

	            // Move the given value to match[3] whether quoted or unquoted
	            match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

	            if ( match[2] === "~=" ) {
	                match[3] = " " + match[3] + " ";
	            }

	            return match.slice( 0, 4 );
	        },

	        "CHILD": function( match ) {
	            /* matches from matchExpr["CHILD"]
	                1 type (only|nth|...)
	                2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	                3 xn-component of xn+y argument ([+-]?\d*n|)
	                4 sign of xn-component
	                5 x of xn-component
	                6 sign of y-component
	                7 y of y-component
	            */
	            match[1] = match[1].toLowerCase();

	            if ( match[1] === "nth" ) {
	                // nth-child requires argument
	                if ( !match[2] ) {
	                    Sizzle.error( match[0] );
	                }

	                // numeric x and y parameters for Expr.filter.CHILD
	                // remember that false/true cast respectively to 0/1
	                match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
	                match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

	            // other types prohibit arguments
	            } else if ( match[2] ) {
	                Sizzle.error( match[0] );
	            }

	            return match;
	        },

	        "PSEUDO": function( match ) {
	            var unquoted, excess;
	            if ( matchExpr["CHILD"].test( match[0] ) ) {
	                return null;
	            }

	            if ( match[3] ) {
	                match[2] = match[3];
	            } else if ( (unquoted = match[4]) ) {
	                // Only check arguments that contain a pseudo
	                if ( rpseudo.test(unquoted) &&
	                    // Get excess from tokenize (recursively)
	                    (excess = tokenize( unquoted, true )) &&
	                    // advance to the next closing parenthesis
	                    (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

	                    // excess is a negative index
	                    unquoted = unquoted.slice( 0, excess );
	                    match[0] = match[0].slice( 0, excess );
	                }
	                match[2] = unquoted;
	            }

	            // Return only captures needed by the pseudo filter method (type and argument)
	            return match.slice( 0, 3 );
	        }
	    },

	    filter: {
	        "ID": assertGetIdNotName ?
	            function( id ) {
	                id = id.replace( rbackslash, "" );
	                return function( elem ) {
	                    return elem.getAttribute("id") === id;
	                };
	            } :
	            function( id ) {
	                id = id.replace( rbackslash, "" );
	                return function( elem ) {
	                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
	                    return node && node.value === id;
	                };
	            },

	        "TAG": function( nodeName ) {
	            if ( nodeName === "*" ) {
	                return function() { return true; };
	            }
	            nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

	            return function( elem ) {
	                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	            };
	        },

	        "CLASS": function( className ) {
	            var pattern = classCache[ expando ][ className + " " ];

	            return pattern ||
	                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
	                classCache( className, function( elem ) {
	                    return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
	                });
	        },

	        "ATTR": function( name, operator, check ) {
	            return function( elem, context ) {
	                var result = Sizzle.attr( elem, name );

	                if ( result == null ) {
	                    return operator === "!=";
	                }
	                if ( !operator ) {
	                    return true;
	                }

	                result += "";

	                return operator === "=" ? result === check :
	                    operator === "!=" ? result !== check :
	                    operator === "^=" ? check && result.indexOf( check ) === 0 :
	                    operator === "*=" ? check && result.indexOf( check ) > -1 :
	                    operator === "$=" ? check && result.substr( result.length - check.length ) === check :
	                    operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
	                    operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
	                    false;
	            };
	        },

	        "CHILD": function( type, argument, first, last ) {

	            if ( type === "nth" ) {
	                return function( elem ) {
	                    var node, diff,
	                        parent = elem.parentNode;

	                    if ( first === 1 && last === 0 ) {
	                        return true;
	                    }

	                    if ( parent ) {
	                        diff = 0;
	                        for ( node = parent.firstChild; node; node = node.nextSibling ) {
	                            if ( node.nodeType === 1 ) {
	                                diff++;
	                                if ( elem === node ) {
	                                    break;
	                                }
	                            }
	                        }
	                    }

	                    // Incorporate the offset (or cast to NaN), then check against cycle size
	                    diff -= last;
	                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
	                };
	            }

	            return function( elem ) {
	                var node = elem;

	                switch ( type ) {
	                    case "only":
	                    case "first":
	                        while ( (node = node.previousSibling) ) {
	                            if ( node.nodeType === 1 ) {
	                                return false;
	                            }
	                        }

	                        if ( type === "first" ) {
	                            return true;
	                        }

	                        node = elem;

	                        /* falls through */
	                    case "last":
	                        while ( (node = node.nextSibling) ) {
	                            if ( node.nodeType === 1 ) {
	                                return false;
	                            }
	                        }

	                        return true;
	                }
	            };
	        },

	        "PSEUDO": function( pseudo, argument ) {
	            // pseudo-class names are case-insensitive
	            // http://www.w3.org/TR/selectors/#pseudo-classes
	            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	            // Remember that setFilters inherits from pseudos
	            var args,
	                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
	                    Sizzle.error( "unsupported pseudo: " + pseudo );

	            // The user may use createPseudo to indicate that
	            // arguments are needed to create the filter function
	            // just as Sizzle does
	            if ( fn[ expando ] ) {
	                return fn( argument );
	            }

	            // But maintain support for old signatures
	            if ( fn.length > 1 ) {
	                args = [ pseudo, pseudo, "", argument ];
	                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
	                    markFunction(function( seed, matches ) {
	                        var idx,
	                            matched = fn( seed, argument ),
	                            i = matched.length;
	                        while ( i-- ) {
	                            idx = indexOf.call( seed, matched[i] );
	                            seed[ idx ] = !( matches[ idx ] = matched[i] );
	                        }
	                    }) :
	                    function( elem ) {
	                        return fn( elem, 0, args );
	                    };
	            }

	            return fn;
	        }
	    },

	    pseudos: {
	        "not": markFunction(function( selector ) {
	            // Trim the selector passed to compile
	            // to avoid treating leading and trailing
	            // spaces as combinators
	            var input = [],
	                results = [],
	                matcher = compile( selector.replace( rtrim, "$1" ) );

	            return matcher[ expando ] ?
	                markFunction(function( seed, matches, context, xml ) {
	                    var elem,
	                        unmatched = matcher( seed, null, xml, [] ),
	                        i = seed.length;

	                    // Match elements unmatched by `matcher`
	                    while ( i-- ) {
	                        if ( (elem = unmatched[i]) ) {
	                            seed[i] = !(matches[i] = elem);
	                        }
	                    }
	                }) :
	                function( elem, context, xml ) {
	                    input[0] = elem;
	                    matcher( input, null, xml, results );
	                    return !results.pop();
	                };
	        }),

	        "has": markFunction(function( selector ) {
	            return function( elem ) {
	                return Sizzle( selector, elem ).length > 0;
	            };
	        }),

	        "contains": markFunction(function( text ) {
	            return function( elem ) {
	                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
	            };
	        }),

	        "enabled": function( elem ) {
	            return elem.disabled === false;
	        },

	        "disabled": function( elem ) {
	            return elem.disabled === true;
	        },

	        "checked": function( elem ) {
	            // In CSS3, :checked should return both checked and selected elements
	            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	            var nodeName = elem.nodeName.toLowerCase();
	            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
	        },

	        "selected": function( elem ) {
	            // Accessing this property makes selected-by-default
	            // options in Safari work properly
	            if ( elem.parentNode ) {
	                elem.parentNode.selectedIndex;
	            }

	            return elem.selected === true;
	        },

	        "parent": function( elem ) {
	            return !Expr.pseudos["empty"]( elem );
	        },

	        "empty": function( elem ) {
	            // http://www.w3.org/TR/selectors/#empty-pseudo
	            // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
	            //   not comment, processing instructions, or others
	            // Thanks to Diego Perini for the nodeName shortcut
	            //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
	            var nodeType;
	            elem = elem.firstChild;
	            while ( elem ) {
	                if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
	                    return false;
	                }
	                elem = elem.nextSibling;
	            }
	            return true;
	        },

	        "header": function( elem ) {
	            return rheader.test( elem.nodeName );
	        },

	        "text": function( elem ) {
	            var type, attr;
	            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
	            // use getAttribute instead to test this case
	            return elem.nodeName.toLowerCase() === "input" &&
	                (type = elem.type) === "text" &&
	                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
	        },

	        // Input types
	        "radio": createInputPseudo("radio"),
	        "checkbox": createInputPseudo("checkbox"),
	        "file": createInputPseudo("file"),
	        "password": createInputPseudo("password"),
	        "image": createInputPseudo("image"),

	        "submit": createButtonPseudo("submit"),
	        "reset": createButtonPseudo("reset"),

	        "button": function( elem ) {
	            var name = elem.nodeName.toLowerCase();
	            return name === "input" && elem.type === "button" || name === "button";
	        },

	        "input": function( elem ) {
	            return rinputs.test( elem.nodeName );
	        },

	        "focus": function( elem ) {
	            var doc = elem.ownerDocument;
	            return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	        },

	        "active": function( elem ) {
	            return elem === elem.ownerDocument.activeElement;
	        },

	        // Positional types
	        "first": createPositionalPseudo(function() {
	            return [ 0 ];
	        }),

	        "last": createPositionalPseudo(function( matchIndexes, length ) {
	            return [ length - 1 ];
	        }),

	        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
	            return [ argument < 0 ? argument + length : argument ];
	        }),

	        "even": createPositionalPseudo(function( matchIndexes, length ) {
	            for ( var i = 0; i < length; i += 2 ) {
	                matchIndexes.push( i );
	            }
	            return matchIndexes;
	        }),

	        "odd": createPositionalPseudo(function( matchIndexes, length ) {
	            for ( var i = 1; i < length; i += 2 ) {
	                matchIndexes.push( i );
	            }
	            return matchIndexes;
	        }),

	        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
	            for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
	                matchIndexes.push( i );
	            }
	            return matchIndexes;
	        }),

	        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
	            for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
	                matchIndexes.push( i );
	            }
	            return matchIndexes;
	        })
	    }
	};

	function siblingCheck( a, b, ret ) {
	    if ( a === b ) {
	        return ret;
	    }

	    var cur = a.nextSibling;

	    while ( cur ) {
	        if ( cur === b ) {
	            return -1;
	        }

	        cur = cur.nextSibling;
	    }

	    return 1;
	}

	sortOrder = docElem.compareDocumentPosition ?
	    function( a, b ) {
	        if ( a === b ) {
	            hasDuplicate = true;
	            return 0;
	        }

	        return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
	            a.compareDocumentPosition :
	            a.compareDocumentPosition(b) & 4
	        ) ? -1 : 1;
	    } :
	    function( a, b ) {
	        // The nodes are identical, we can exit early
	        if ( a === b ) {
	            hasDuplicate = true;
	            return 0;

	        // Fallback to using sourceIndex (in IE) if it's available on both nodes
	        } else if ( a.sourceIndex && b.sourceIndex ) {
	            return a.sourceIndex - b.sourceIndex;
	        }

	        var al, bl,
	            ap = [],
	            bp = [],
	            aup = a.parentNode,
	            bup = b.parentNode,
	            cur = aup;

	        // If the nodes are siblings (or identical) we can do a quick check
	        if ( aup === bup ) {
	            return siblingCheck( a, b );

	        // If no parents were found then the nodes are disconnected
	        } else if ( !aup ) {
	            return -1;

	        } else if ( !bup ) {
	            return 1;
	        }

	        // Otherwise they're somewhere else in the tree so we need
	        // to build up a full list of the parentNodes for comparison
	        while ( cur ) {
	            ap.unshift( cur );
	            cur = cur.parentNode;
	        }

	        cur = bup;

	        while ( cur ) {
	            bp.unshift( cur );
	            cur = cur.parentNode;
	        }

	        al = ap.length;
	        bl = bp.length;

	        // Start walking down the tree looking for a discrepancy
	        for ( var i = 0; i < al && i < bl; i++ ) {
	            if ( ap[i] !== bp[i] ) {
	                return siblingCheck( ap[i], bp[i] );
	            }
	        }

	        // We ended someplace up the tree so do a sibling check
	        return i === al ?
	            siblingCheck( a, bp[i], -1 ) :
	            siblingCheck( ap[i], b, 1 );
	    };

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	[0, 0].sort( sortOrder );
	baseHasDuplicate = !hasDuplicate;

	// Document sorting and removing duplicates
	Sizzle.uniqueSort = function( results ) {
	    var elem,
	        duplicates = [],
	        i = 1,
	        j = 0;

	    hasDuplicate = baseHasDuplicate;
	    results.sort( sortOrder );

	    if ( hasDuplicate ) {
	        for ( ; (elem = results[i]); i++ ) {
	            if ( elem === results[ i - 1 ] ) {
	                j = duplicates.push( i );
	            }
	        }
	        while ( j-- ) {
	            results.splice( duplicates[ j ], 1 );
	        }
	    }

	    return results;
	};

	Sizzle.error = function( msg ) {
	    throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	function tokenize( selector, parseOnly ) {
	    var matched, match, tokens, type,
	        soFar, groups, preFilters,
	        cached = tokenCache[ expando ][ selector + " " ];

	    if ( cached ) {
	        return parseOnly ? 0 : cached.slice( 0 );
	    }

	    soFar = selector;
	    groups = [];
	    preFilters = Expr.preFilter;

	    while ( soFar ) {

	        // Comma and first run
	        if ( !matched || (match = rcomma.exec( soFar )) ) {
	            if ( match ) {
	                // Don't consume trailing commas as valid
	                soFar = soFar.slice( match[0].length ) || soFar;
	            }
	            groups.push( tokens = [] );
	        }

	        matched = false;

	        // Combinators
	        if ( (match = rcombinators.exec( soFar )) ) {
	            tokens.push( matched = new Token( match.shift() ) );
	            soFar = soFar.slice( matched.length );

	            // Cast descendant combinators to space
	            matched.type = match[0].replace( rtrim, " " );
	        }

	        // Filters
	        for ( type in Expr.filter ) {
	            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
	                (match = preFilters[ type ]( match ))) ) {

	                tokens.push( matched = new Token( match.shift() ) );
	                soFar = soFar.slice( matched.length );
	                matched.type = type;
	                matched.matches = match;
	            }
	        }

	        if ( !matched ) {
	            break;
	        }
	    }

	    // Return the length of the invalid excess
	    // if we're just parsing
	    // Otherwise, throw an error or return tokens
	    return parseOnly ?
	        soFar.length :
	        soFar ?
	            Sizzle.error( selector ) :
	            // Cache the tokens
	            tokenCache( selector, groups ).slice( 0 );
	}

	function addCombinator( matcher, combinator, base ) {
	    var dir = combinator.dir,
	        checkNonElements = base && combinator.dir === "parentNode",
	        doneName = done++;

	    return combinator.first ?
	        // Check against closest ancestor/preceding element
	        function( elem, context, xml ) {
	            while ( (elem = elem[ dir ]) ) {
	                if ( checkNonElements || elem.nodeType === 1  ) {
	                    return matcher( elem, context, xml );
	                }
	            }
	        } :

	        // Check against all ancestor/preceding elements
	        function( elem, context, xml ) {
	            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
	            if ( !xml ) {
	                var cache,
	                    dirkey = dirruns + " " + doneName + " ",
	                    cachedkey = dirkey + cachedruns;
	                while ( (elem = elem[ dir ]) ) {
	                    if ( checkNonElements || elem.nodeType === 1 ) {
	                        if ( (cache = elem[ expando ]) === cachedkey ) {
	                            return elem.sizset;
	                        } else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
	                            if ( elem.sizset ) {
	                                return elem;
	                            }
	                        } else {
	                            elem[ expando ] = cachedkey;
	                            if ( matcher( elem, context, xml ) ) {
	                                elem.sizset = true;
	                                return elem;
	                            }
	                            elem.sizset = false;
	                        }
	                    }
	                }
	            } else {
	                while ( (elem = elem[ dir ]) ) {
	                    if ( checkNonElements || elem.nodeType === 1 ) {
	                        if ( matcher( elem, context, xml ) ) {
	                            return elem;
	                        }
	                    }
	                }
	            }
	        };
	}

	function elementMatcher( matchers ) {
	    return matchers.length > 1 ?
	        function( elem, context, xml ) {
	            var i = matchers.length;
	            while ( i-- ) {
	                if ( !matchers[i]( elem, context, xml ) ) {
	                    return false;
	                }
	            }
	            return true;
	        } :
	        matchers[0];
	}

	function condense( unmatched, map, filter, context, xml ) {
	    var elem,
	        newUnmatched = [],
	        i = 0,
	        len = unmatched.length,
	        mapped = map != null;

	    for ( ; i < len; i++ ) {
	        if ( (elem = unmatched[i]) ) {
	            if ( !filter || filter( elem, context, xml ) ) {
	                newUnmatched.push( elem );
	                if ( mapped ) {
	                    map.push( i );
	                }
	            }
	        }
	    }

	    return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	    if ( postFilter && !postFilter[ expando ] ) {
	        postFilter = setMatcher( postFilter );
	    }
	    if ( postFinder && !postFinder[ expando ] ) {
	        postFinder = setMatcher( postFinder, postSelector );
	    }
	    return markFunction(function( seed, results, context, xml ) {
	        var temp, i, elem,
	            preMap = [],
	            postMap = [],
	            preexisting = results.length,

	            // Get initial elements from seed or context
	            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

	            // Prefilter to get matcher input, preserving a map for seed-results synchronization
	            matcherIn = preFilter && ( seed || !selector ) ?
	                condense( elems, preMap, preFilter, context, xml ) :
	                elems,

	            matcherOut = matcher ?
	                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
	                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

	                    // ...intermediate processing is necessary
	                    [] :

	                    // ...otherwise use results directly
	                    results :
	                matcherIn;

	        // Find primary matches
	        if ( matcher ) {
	            matcher( matcherIn, matcherOut, context, xml );
	        }

	        // Apply postFilter
	        if ( postFilter ) {
	            temp = condense( matcherOut, postMap );
	            postFilter( temp, [], context, xml );

	            // Un-match failing elements by moving them back to matcherIn
	            i = temp.length;
	            while ( i-- ) {
	                if ( (elem = temp[i]) ) {
	                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
	                }
	            }
	        }

	        if ( seed ) {
	            if ( postFinder || preFilter ) {
	                if ( postFinder ) {
	                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
	                    temp = [];
	                    i = matcherOut.length;
	                    while ( i-- ) {
	                        if ( (elem = matcherOut[i]) ) {
	                            // Restore matcherIn since elem is not yet a final match
	                            temp.push( (matcherIn[i] = elem) );
	                        }
	                    }
	                    postFinder( null, (matcherOut = []), temp, xml );
	                }

	                // Move matched elements from seed to results to keep them synchronized
	                i = matcherOut.length;
	                while ( i-- ) {
	                    if ( (elem = matcherOut[i]) &&
	                        (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

	                        seed[temp] = !(results[temp] = elem);
	                    }
	                }
	            }

	        // Add elements to results, through postFinder if defined
	        } else {
	            matcherOut = condense(
	                matcherOut === results ?
	                    matcherOut.splice( preexisting, matcherOut.length ) :
	                    matcherOut
	            );
	            if ( postFinder ) {
	                postFinder( null, results, matcherOut, xml );
	            } else {
	                push.apply( results, matcherOut );
	            }
	        }
	    });
	}

	function matcherFromTokens( tokens ) {
	    var checkContext, matcher, j,
	        len = tokens.length,
	        leadingRelative = Expr.relative[ tokens[0].type ],
	        implicitRelative = leadingRelative || Expr.relative[" "],
	        i = leadingRelative ? 1 : 0,

	        // The foundational matcher ensures that elements are reachable from top-level context(s)
	        matchContext = addCombinator( function( elem ) {
	            return elem === checkContext;
	        }, implicitRelative, true ),
	        matchAnyContext = addCombinator( function( elem ) {
	            return indexOf.call( checkContext, elem ) > -1;
	        }, implicitRelative, true ),
	        matchers = [ function( elem, context, xml ) {
	            return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
	                (checkContext = context).nodeType ?
	                    matchContext( elem, context, xml ) :
	                    matchAnyContext( elem, context, xml ) );
	        } ];

	    for ( ; i < len; i++ ) {
	        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
	            matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
	        } else {
	            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

	            // Return special upon seeing a positional matcher
	            if ( matcher[ expando ] ) {
	                // Find the next relative operator (if any) for proper handling
	                j = ++i;
	                for ( ; j < len; j++ ) {
	                    if ( Expr.relative[ tokens[j].type ] ) {
	                        break;
	                    }
	                }
	                return setMatcher(
	                    i > 1 && elementMatcher( matchers ),
	                    i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
	                    matcher,
	                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
	                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
	                    j < len && tokens.join("")
	                );
	            }
	            matchers.push( matcher );
	        }
	    }

	    return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	    var bySet = setMatchers.length > 0,
	        byElement = elementMatchers.length > 0,
	        superMatcher = function( seed, context, xml, results, expandContext ) {
	            var elem, j, matcher,
	                setMatched = [],
	                matchedCount = 0,
	                i = "0",
	                unmatched = seed && [],
	                outermost = expandContext != null,
	                contextBackup = outermostContext,
	                // We must always have either seed elements or context
	                elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
	                // Nested matchers should use non-integer dirruns
	                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

	            if ( outermost ) {
	                outermostContext = context !== document && context;
	                cachedruns = superMatcher.el;
	            }

	            // Add elements passing elementMatchers directly to results
	            for ( ; (elem = elems[i]) != null; i++ ) {
	                if ( byElement && elem ) {
	                    for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
	                        if ( matcher( elem, context, xml ) ) {
	                            results.push( elem );
	                            break;
	                        }
	                    }
	                    if ( outermost ) {
	                        dirruns = dirrunsUnique;
	                        cachedruns = ++superMatcher.el;
	                    }
	                }

	                // Track unmatched elements for set filters
	                if ( bySet ) {
	                    // They will have gone through all possible matchers
	                    if ( (elem = !matcher && elem) ) {
	                        matchedCount--;
	                    }

	                    // Lengthen the array for every element, matched or not
	                    if ( seed ) {
	                        unmatched.push( elem );
	                    }
	                }
	            }

	            // Apply set filters to unmatched elements
	            matchedCount += i;
	            if ( bySet && i !== matchedCount ) {
	                for ( j = 0; (matcher = setMatchers[j]); j++ ) {
	                    matcher( unmatched, setMatched, context, xml );
	                }

	                if ( seed ) {
	                    // Reintegrate element matches to eliminate the need for sorting
	                    if ( matchedCount > 0 ) {
	                        while ( i-- ) {
	                            if ( !(unmatched[i] || setMatched[i]) ) {
	                                setMatched[i] = pop.call( results );
	                            }
	                        }
	                    }

	                    // Discard index placeholder values to get only actual matches
	                    setMatched = condense( setMatched );
	                }

	                // Add matches to results
	                push.apply( results, setMatched );

	                // Seedless set matches succeeding multiple successful matchers stipulate sorting
	                if ( outermost && !seed && setMatched.length > 0 &&
	                    ( matchedCount + setMatchers.length ) > 1 ) {

	                    Sizzle.uniqueSort( results );
	                }
	            }

	            // Override manipulation of globals by nested matchers
	            if ( outermost ) {
	                dirruns = dirrunsUnique;
	                outermostContext = contextBackup;
	            }

	            return unmatched;
	        };

	    superMatcher.el = 0;
	    return bySet ?
	        markFunction( superMatcher ) :
	        superMatcher;
	}

	compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	    var i,
	        setMatchers = [],
	        elementMatchers = [],
	        cached = compilerCache[ expando ][ selector + " " ];

	    if ( !cached ) {
	        // Generate a function of recursive functions that can be used to check each element
	        if ( !group ) {
	            group = tokenize( selector );
	        }
	        i = group.length;
	        while ( i-- ) {
	            cached = matcherFromTokens( group[i] );
	            if ( cached[ expando ] ) {
	                setMatchers.push( cached );
	            } else {
	                elementMatchers.push( cached );
	            }
	        }

	        // Cache the compiled function
	        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	    }
	    return cached;
	};

	function multipleContexts( selector, contexts, results ) {
	    var i = 0,
	        len = contexts.length;
	    for ( ; i < len; i++ ) {
	        Sizzle( selector, contexts[i], results );
	    }
	    return results;
	}

	function select( selector, context, results, seed, xml ) {
	    var i, tokens, token, type, find,
	        match = tokenize( selector ),
	        j = match.length;

	    if ( !seed ) {
	        // Try to minimize operations if there is only one group
	        if ( match.length === 1 ) {

	            // Take a shortcut and set the context if the root selector is an ID
	            tokens = match[0] = match[0].slice( 0 );
	            if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
	                    context.nodeType === 9 && !xml &&
	                    Expr.relative[ tokens[1].type ] ) {

	                context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
	                if ( !context ) {
	                    return results;
	                }

	                selector = selector.slice( tokens.shift().length );
	            }

	            // Fetch a seed set for right-to-left matching
	            for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
	                token = tokens[i];

	                // Abort if we hit a combinator
	                if ( Expr.relative[ (type = token.type) ] ) {
	                    break;
	                }
	                if ( (find = Expr.find[ type ]) ) {
	                    // Search, expanding context for leading sibling combinators
	                    if ( (seed = find(
	                        token.matches[0].replace( rbackslash, "" ),
	                        rsibling.test( tokens[0].type ) && context.parentNode || context,
	                        xml
	                    )) ) {

	                        // If seed is empty or no tokens remain, we can return early
	                        tokens.splice( i, 1 );
	                        selector = seed.length && tokens.join("");
	                        if ( !selector ) {
	                            push.apply( results, slice.call( seed, 0 ) );
	                            return results;
	                        }

	                        break;
	                    }
	                }
	            }
	        }
	    }

	    // Compile and execute a filtering function
	    // Provide `match` to avoid retokenization if we modified the selector above
	    compile( selector, match )(
	        seed,
	        context,
	        xml,
	        results,
	        rsibling.test( selector )
	    );
	    return results;
	}

	if ( document.querySelectorAll ) {
	    (function() {
	        var disconnectedMatch,
	            oldSelect = select,
	            rescape = /'|\\/g,
	            rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	            // qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
	            // A support test would require too much code (would include document ready)
	            rbuggyQSA = [ ":focus" ],

	            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	            // A support test would require too much code (would include document ready)
	            // just skip matchesSelector for :active
	            rbuggyMatches = [ ":active" ],
	            matches = docElem.matchesSelector ||
	                docElem.mozMatchesSelector ||
	                docElem.webkitMatchesSelector ||
	                docElem.oMatchesSelector ||
	                docElem.msMatchesSelector;

	        // Build QSA regex
	        // Regex strategy adopted from Diego Perini
	        assert(function( div ) {
	            // Select is set to empty string on purpose
	            // This is to test IE's treatment of not explictly
	            // setting a boolean content attribute,
	            // since its presence should be enough
	            // http://bugs.jquery.com/ticket/12359
	            div.innerHTML = "<select><option selected=''></option></select>";

	            // IE8 - Some boolean attributes are not treated correctly
	            if ( !div.querySelectorAll("[selected]").length ) {
	                rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
	            }

	            // Webkit/Opera - :checked should return selected option elements
	            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	            // IE8 throws error here (do not put tests after this one)
	            if ( !div.querySelectorAll(":checked").length ) {
	                rbuggyQSA.push(":checked");
	            }
	        });

	        assert(function( div ) {

	            // Opera 10-12/IE9 - ^= $= *= and empty values
	            // Should not select anything
	            div.innerHTML = "<p test=''></p>";
	            if ( div.querySelectorAll("[test^='']").length ) {
	                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
	            }

	            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
	            // IE8 throws error here (do not put tests after this one)
	            div.innerHTML = "<input type='hidden'/>";
	            if ( !div.querySelectorAll(":enabled").length ) {
	                rbuggyQSA.push(":enabled", ":disabled");
	            }
	        });

	        // rbuggyQSA always contains :focus, so no need for a length check
	        rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

	        select = function( selector, context, results, seed, xml ) {
	            // Only use querySelectorAll when not filtering,
	            // when this is not xml,
	            // and when no QSA bugs apply
	            if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
	                var groups, i,
	                    old = true,
	                    nid = expando,
	                    newContext = context,
	                    newSelector = context.nodeType === 9 && selector;

	                // qSA works strangely on Element-rooted queries
	                // We can work around this by specifying an extra ID on the root
	                // and working up from there (Thanks to Andrew Dupont for the technique)
	                // IE 8 doesn't work on object elements
	                if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
	                    groups = tokenize( selector );

	                    if ( (old = context.getAttribute("id")) ) {
	                        nid = old.replace( rescape, "\\$&" );
	                    } else {
	                        context.setAttribute( "id", nid );
	                    }
	                    nid = "[id='" + nid + "'] ";

	                    i = groups.length;
	                    while ( i-- ) {
	                        groups[i] = nid + groups[i].join("");
	                    }
	                    newContext = rsibling.test( selector ) && context.parentNode || context;
	                    newSelector = groups.join(",");
	                }

	                if ( newSelector ) {
	                    try {
	                        push.apply( results, slice.call( newContext.querySelectorAll(
	                            newSelector
	                        ), 0 ) );
	                        return results;
	                    } catch(qsaError) {
	                    } finally {
	                        if ( !old ) {
	                            context.removeAttribute("id");
	                        }
	                    }
	                }
	            }

	            return oldSelect( selector, context, results, seed, xml );
	        };

	        if ( matches ) {
	            assert(function( div ) {
	                // Check to see if it's possible to do matchesSelector
	                // on a disconnected node (IE 9)
	                disconnectedMatch = matches.call( div, "div" );

	                // This should fail with an exception
	                // Gecko does not error, returns false instead
	                try {
	                    matches.call( div, "[test!='']:sizzle" );
	                    rbuggyMatches.push( "!=", pseudos );
	                } catch ( e ) {}
	            });

	            // rbuggyMatches always contains :active and :focus, so no need for a length check
	            rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

	            Sizzle.matchesSelector = function( elem, expr ) {
	                // Make sure that attribute selectors are quoted
	                expr = expr.replace( rattributeQuotes, "='$1']" );

	                // rbuggyMatches always contains :active, so no need for an existence check
	                if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
	                    try {
	                        var ret = matches.call( elem, expr );

	                        // IE 9's matchesSelector returns false on disconnected nodes
	                        if ( ret || disconnectedMatch ||
	                                // As well, disconnected nodes are said to be in a document
	                                // fragment in IE 9
	                                elem.document && elem.document.nodeType !== 11 ) {
	                            return ret;
	                        }
	                    } catch(e) {}
	                }

	                return Sizzle( expr, null, null, [ elem ] ).length > 0;
	            };
	        }
	    })();
	}

	// Deprecated
	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Back-compat
	function setFilters() {}
	Expr.filters = setFilters.prototype = Expr.pseudos;
	Expr.setFilters = new setFilters();

	// Override sizzle attribute retrieval
	Sizzle.attr = jQuery.attr;
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;


	})( window );
	var runtil = /Until$/,
	    rparentsprev = /^(?:parents|prev(?:Until|All))/,
	    isSimple = /^.[^:#\[\.,]*$/,
	    rneedsContext = jQuery.expr.match.needsContext,
	    // methods guaranteed to produce a unique set when starting from a unique set
	    guaranteedUnique = {
	        children: true,
	        contents: true,
	        next: true,
	        prev: true
	    };

	jQuery.fn.extend({
	    find: function( selector ) {
	        var i, l, length, n, r, ret,
	            self = this;

	        if ( typeof selector !== "string" ) {
	            return jQuery( selector ).filter(function() {
	                for ( i = 0, l = self.length; i < l; i++ ) {
	                    if ( jQuery.contains( self[ i ], this ) ) {
	                        return true;
	                    }
	                }
	            });
	        }

	        ret = this.pushStack( "", "find", selector );

	        for ( i = 0, l = this.length; i < l; i++ ) {
	            length = ret.length;
	            jQuery.find( selector, this[i], ret );

	            if ( i > 0 ) {
	                // Make sure that the results are unique
	                for ( n = length; n < ret.length; n++ ) {
	                    for ( r = 0; r < length; r++ ) {
	                        if ( ret[r] === ret[n] ) {
	                            ret.splice(n--, 1);
	                            break;
	                        }
	                    }
	                }
	            }
	        }

	        return ret;
	    },

	    has: function( target ) {
	        var i,
	            targets = jQuery( target, this ),
	            len = targets.length;

	        return this.filter(function() {
	            for ( i = 0; i < len; i++ ) {
	                if ( jQuery.contains( this, targets[i] ) ) {
	                    return true;
	                }
	            }
	        });
	    },

	    not: function( selector ) {
	        return this.pushStack( winnow(this, selector, false), "not", selector);
	    },

	    filter: function( selector ) {
	        return this.pushStack( winnow(this, selector, true), "filter", selector );
	    },

	    is: function( selector ) {
	        return !!selector && (
	            typeof selector === "string" ?
	                // If this is a positional/relative selector, check membership in the returned set
	                // so $("p:first").is("p:last") won't return true for a doc with two "p".
	                rneedsContext.test( selector ) ?
	                    jQuery( selector, this.context ).index( this[0] ) >= 0 :
	                    jQuery.filter( selector, this ).length > 0 :
	                this.filter( selector ).length > 0 );
	    },

	    closest: function( selectors, context ) {
	        var cur,
	            i = 0,
	            l = this.length,
	            ret = [],
	            pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
	                jQuery( selectors, context || this.context ) :
	                0;

	        for ( ; i < l; i++ ) {
	            cur = this[i];

	            while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
	                if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
	                    ret.push( cur );
	                    break;
	                }
	                cur = cur.parentNode;
	            }
	        }

	        ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

	        return this.pushStack( ret, "closest", selectors );
	    },

	    // Determine the position of an element within
	    // the matched set of elements
	    index: function( elem ) {

	        // No argument, return index in parent
	        if ( !elem ) {
	            return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
	        }

	        // index in selector
	        if ( typeof elem === "string" ) {
	            return jQuery.inArray( this[0], jQuery( elem ) );
	        }

	        // Locate the position of the desired element
	        return jQuery.inArray(
	            // If it receives a jQuery object, the first element is used
	            elem.jquery ? elem[0] : elem, this );
	    },

	    add: function( selector, context ) {
	        var set = typeof selector === "string" ?
	                jQuery( selector, context ) :
	                jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
	            all = jQuery.merge( this.get(), set );

	        return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
	            all :
	            jQuery.unique( all ) );
	    },

	    addBack: function( selector ) {
	        return this.add( selector == null ?
	            this.prevObject : this.prevObject.filter(selector)
	        );
	    }
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	// A painfully simple check to see if an element is disconnected
	// from a document (should be improved, where feasible).
	function isDisconnected( node ) {
	    return !node || !node.parentNode || node.parentNode.nodeType === 11;
	}

	function sibling( cur, dir ) {
	    do {
	        cur = cur[ dir ];
	    } while ( cur && cur.nodeType !== 1 );

	    return cur;
	}

	jQuery.each({
	    parent: function( elem ) {
	        var parent = elem.parentNode;
	        return parent && parent.nodeType !== 11 ? parent : null;
	    },
	    parents: function( elem ) {
	        return jQuery.dir( elem, "parentNode" );
	    },
	    parentsUntil: function( elem, i, until ) {
	        return jQuery.dir( elem, "parentNode", until );
	    },
	    next: function( elem ) {
	        return sibling( elem, "nextSibling" );
	    },
	    prev: function( elem ) {
	        return sibling( elem, "previousSibling" );
	    },
	    nextAll: function( elem ) {
	        return jQuery.dir( elem, "nextSibling" );
	    },
	    prevAll: function( elem ) {
	        return jQuery.dir( elem, "previousSibling" );
	    },
	    nextUntil: function( elem, i, until ) {
	        return jQuery.dir( elem, "nextSibling", until );
	    },
	    prevUntil: function( elem, i, until ) {
	        return jQuery.dir( elem, "previousSibling", until );
	    },
	    siblings: function( elem ) {
	        return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	    },
	    children: function( elem ) {
	        return jQuery.sibling( elem.firstChild );
	    },
	    contents: function( elem ) {
	        return jQuery.nodeName( elem, "iframe" ) ?
	            elem.contentDocument || elem.contentWindow.document :
	            jQuery.merge( [], elem.childNodes );
	    }
	}, function( name, fn ) {
	    jQuery.fn[ name ] = function( until, selector ) {
	        var ret = jQuery.map( this, fn, until );

	        if ( !runtil.test( name ) ) {
	            selector = until;
	        }

	        if ( selector && typeof selector === "string" ) {
	            ret = jQuery.filter( selector, ret );
	        }

	        ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

	        if ( this.length > 1 && rparentsprev.test( name ) ) {
	            ret = ret.reverse();
	        }

	        return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	    };
	});

	jQuery.extend({
	    filter: function( expr, elems, not ) {
	        if ( not ) {
	            expr = ":not(" + expr + ")";
	        }

	        return elems.length === 1 ?
	            jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
	            jQuery.find.matches(expr, elems);
	    },

	    dir: function( elem, dir, until ) {
	        var matched = [],
	            cur = elem[ dir ];

	        while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
	            if ( cur.nodeType === 1 ) {
	                matched.push( cur );
	            }
	            cur = cur[dir];
	        }
	        return matched;
	    },

	    sibling: function( n, elem ) {
	        var r = [];

	        for ( ; n; n = n.nextSibling ) {
	            if ( n.nodeType === 1 && n !== elem ) {
	                r.push( n );
	            }
	        }

	        return r;
	    }
	});

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, keep ) {

	    // Can't pass null or undefined to indexOf in Firefox 4
	    // Set to 0 to skip string check
	    qualifier = qualifier || 0;

	    if ( jQuery.isFunction( qualifier ) ) {
	        return jQuery.grep(elements, function( elem, i ) {
	            var retVal = !!qualifier.call( elem, i, elem );
	            return retVal === keep;
	        });

	    } else if ( qualifier.nodeType ) {
	        return jQuery.grep(elements, function( elem, i ) {
	            return ( elem === qualifier ) === keep;
	        });

	    } else if ( typeof qualifier === "string" ) {
	        var filtered = jQuery.grep(elements, function( elem ) {
	            return elem.nodeType === 1;
	        });

	        if ( isSimple.test( qualifier ) ) {
	            return jQuery.filter(qualifier, filtered, !keep);
	        } else {
	            qualifier = jQuery.filter( qualifier, filtered );
	        }
	    }

	    return jQuery.grep(elements, function( elem, i ) {
	        return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	    });
	}
	function createSafeFragment( document ) {
	    var list = nodeNames.split( "|" ),
	    safeFrag = document.createDocumentFragment();

	    if ( safeFrag.createElement ) {
	        while ( list.length ) {
	            safeFrag.createElement(
	                list.pop()
	            );
	        }
	    }
	    return safeFrag;
	}

	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
	        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	    rleadingWhitespace = /^\s+/,
	    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	    rtagName = /<([\w:]+)/,
	    rtbody = /<tbody/i,
	    rhtml = /<|&#?\w+;/,
	    rnoInnerhtml = /<(?:script|style|link)/i,
	    rnocache = /<(?:script|object|embed|option|style)/i,
	    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	    rcheckableType = /^(?:checkbox|radio)$/,
	    // checked="checked" or checked
	    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptType = /\/(java|ecma)script/i,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	    wrapMap = {
	        option: [ 1, "<select multiple='multiple'>", "</select>" ],
	        legend: [ 1, "<fieldset>", "</fieldset>" ],
	        thead: [ 1, "<table>", "</table>" ],
	        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	        area: [ 1, "<map>", "</map>" ],
	        _default: [ 0, "", "" ]
	    },
	    safeFragment = createSafeFragment( document ),
	    fragmentDiv = safeFragment.appendChild( document.createElement("div") );

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	if ( !jQuery.support.htmlSerialize ) {
	    wrapMap._default = [ 1, "X<div>", "</div>" ];
	}

	jQuery.fn.extend({
	    text: function( value ) {
	        return jQuery.access( this, function( value ) {
	            return value === undefined ?
	                jQuery.text( this ) :
	                this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
	        }, null, value, arguments.length );
	    },

	    wrapAll: function( html ) {
	        if ( jQuery.isFunction( html ) ) {
	            return this.each(function(i) {
	                jQuery(this).wrapAll( html.call(this, i) );
	            });
	        }

	        if ( this[0] ) {
	            // The elements to wrap the target around
	            var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

	            if ( this[0].parentNode ) {
	                wrap.insertBefore( this[0] );
	            }

	            wrap.map(function() {
	                var elem = this;

	                while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
	                    elem = elem.firstChild;
	                }

	                return elem;
	            }).append( this );
	        }

	        return this;
	    },

	    wrapInner: function( html ) {
	        if ( jQuery.isFunction( html ) ) {
	            return this.each(function(i) {
	                jQuery(this).wrapInner( html.call(this, i) );
	            });
	        }

	        return this.each(function() {
	            var self = jQuery( this ),
	                contents = self.contents();

	            if ( contents.length ) {
	                contents.wrapAll( html );

	            } else {
	                self.append( html );
	            }
	        });
	    },

	    wrap: function( html ) {
	        var isFunction = jQuery.isFunction( html );

	        return this.each(function(i) {
	            jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
	        });
	    },

	    unwrap: function() {
	        return this.parent().each(function() {
	            if ( !jQuery.nodeName( this, "body" ) ) {
	                jQuery( this ).replaceWith( this.childNodes );
	            }
	        }).end();
	    },

	    append: function() {
	        return this.domManip(arguments, true, function( elem ) {
	            if ( this.nodeType === 1 || this.nodeType === 11 ) {
	                this.appendChild( elem );
	            }
	        });
	    },

	    prepend: function() {
	        return this.domManip(arguments, true, function( elem ) {
	            if ( this.nodeType === 1 || this.nodeType === 11 ) {
	                this.insertBefore( elem, this.firstChild );
	            }
	        });
	    },

	    before: function() {
	        if ( !isDisconnected( this[0] ) ) {
	            return this.domManip(arguments, false, function( elem ) {
	                this.parentNode.insertBefore( elem, this );
	            });
	        }

	        if ( arguments.length ) {
	            var set = jQuery.clean( arguments );
	            return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
	        }
	    },

	    after: function() {
	        if ( !isDisconnected( this[0] ) ) {
	            return this.domManip(arguments, false, function( elem ) {
	                this.parentNode.insertBefore( elem, this.nextSibling );
	            });
	        }

	        if ( arguments.length ) {
	            var set = jQuery.clean( arguments );
	            return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
	        }
	    },

	    // keepData is for internal use only--do not document
	    remove: function( selector, keepData ) {
	        var elem,
	            i = 0;

	        for ( ; (elem = this[i]) != null; i++ ) {
	            if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
	                if ( !keepData && elem.nodeType === 1 ) {
	                    jQuery.cleanData( elem.getElementsByTagName("*") );
	                    jQuery.cleanData( [ elem ] );
	                }

	                if ( elem.parentNode ) {
	                    elem.parentNode.removeChild( elem );
	                }
	            }
	        }

	        return this;
	    },

	    empty: function() {
	        var elem,
	            i = 0;

	        for ( ; (elem = this[i]) != null; i++ ) {
	            // Remove element nodes and prevent memory leaks
	            if ( elem.nodeType === 1 ) {
	                jQuery.cleanData( elem.getElementsByTagName("*") );
	            }

	            // Remove any remaining nodes
	            while ( elem.firstChild ) {
	                elem.removeChild( elem.firstChild );
	            }
	        }

	        return this;
	    },

	    clone: function( dataAndEvents, deepDataAndEvents ) {
	        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

	        return this.map( function () {
	            return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
	        });
	    },

	    html: function( value ) {
	        return jQuery.access( this, function( value ) {
	            var elem = this[0] || {},
	                i = 0,
	                l = this.length;

	            if ( value === undefined ) {
	                return elem.nodeType === 1 ?
	                    elem.innerHTML.replace( rinlinejQuery, "" ) :
	                    undefined;
	            }

	            // See if we can take a shortcut and just use innerHTML
	            if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
	                ( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
	                ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
	                !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

	                value = value.replace( rxhtmlTag, "<$1></$2>" );

	                try {
	                    for (; i < l; i++ ) {
	                        // Remove element nodes and prevent memory leaks
	                        elem = this[i] || {};
	                        if ( elem.nodeType === 1 ) {
	                            jQuery.cleanData( elem.getElementsByTagName( "*" ) );
	                            elem.innerHTML = value;
	                        }
	                    }

	                    elem = 0;

	                // If using innerHTML throws an exception, use the fallback method
	                } catch(e) {}
	            }

	            if ( elem ) {
	                this.empty().append( value );
	            }
	        }, null, value, arguments.length );
	    },

	    replaceWith: function( value ) {
	        if ( !isDisconnected( this[0] ) ) {
	            // Make sure that the elements are removed from the DOM before they are inserted
	            // this can help fix replacing a parent with child elements
	            if ( jQuery.isFunction( value ) ) {
	                return this.each(function(i) {
	                    var self = jQuery(this), old = self.html();
	                    self.replaceWith( value.call( this, i, old ) );
	                });
	            }

	            if ( typeof value !== "string" ) {
	                value = jQuery( value ).detach();
	            }

	            return this.each(function() {
	                var next = this.nextSibling,
	                    parent = this.parentNode;

	                jQuery( this ).remove();

	                if ( next ) {
	                    jQuery(next).before( value );
	                } else {
	                    jQuery(parent).append( value );
	                }
	            });
	        }

	        return this.length ?
	            this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
	            this;
	    },

	    detach: function( selector ) {
	        return this.remove( selector, true );
	    },

	    domManip: function( args, table, callback ) {

	        // Flatten any nested arrays
	        args = [].concat.apply( [], args );

	        var results, first, fragment, iNoClone,
	            i = 0,
	            value = args[0],
	            scripts = [],
	            l = this.length;

	        // We can't cloneNode fragments that contain checked, in WebKit
	        if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
	            return this.each(function() {
	                jQuery(this).domManip( args, table, callback );
	            });
	        }

	        if ( jQuery.isFunction(value) ) {
	            return this.each(function(i) {
	                var self = jQuery(this);
	                args[0] = value.call( this, i, table ? self.html() : undefined );
	                self.domManip( args, table, callback );
	            });
	        }

	        if ( this[0] ) {
	            results = jQuery.buildFragment( args, this, scripts );
	            fragment = results.fragment;
	            first = fragment.firstChild;

	            if ( fragment.childNodes.length === 1 ) {
	                fragment = first;
	            }

	            if ( first ) {
	                table = table && jQuery.nodeName( first, "tr" );

	                // Use the original fragment for the last item instead of the first because it can end up
	                // being emptied incorrectly in certain situations (#8070).
	                // Fragments from the fragment cache must always be cloned and never used in place.
	                for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
	                    callback.call(
	                        table && jQuery.nodeName( this[i], "table" ) ?
	                            findOrAppend( this[i], "tbody" ) :
	                            this[i],
	                        i === iNoClone ?
	                            fragment :
	                            jQuery.clone( fragment, true, true )
	                    );
	                }
	            }

	            // Fix #11809: Avoid leaking memory
	            fragment = first = null;

	            if ( scripts.length ) {
	                jQuery.each( scripts, function( i, elem ) {
	                    if ( elem.src ) {
	                        if ( jQuery.ajax ) {
	                            jQuery.ajax({
	                                url: elem.src,
	                                type: "GET",
	                                dataType: "script",
	                                async: false,
	                                global: false,
	                                "throws": true
	                            });
	                        } else {
	                            jQuery.error("no ajax");
	                        }
	                    } else {
	                        jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
	                    }

	                    if ( elem.parentNode ) {
	                        elem.parentNode.removeChild( elem );
	                    }
	                });
	            }
	        }

	        return this;
	    }
	});

	function findOrAppend( elem, tag ) {
	    return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
	}

	function cloneCopyEvent( src, dest ) {

	    if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
	        return;
	    }

	    var type, i, l,
	        oldData = jQuery._data( src ),
	        curData = jQuery._data( dest, oldData ),
	        events = oldData.events;

	    if ( events ) {
	        delete curData.handle;
	        curData.events = {};

	        for ( type in events ) {
	            for ( i = 0, l = events[ type ].length; i < l; i++ ) {
	                jQuery.event.add( dest, type, events[ type ][ i ] );
	            }
	        }
	    }

	    // make the cloned public data object a copy from the original
	    if ( curData.data ) {
	        curData.data = jQuery.extend( {}, curData.data );
	    }
	}

	function cloneFixAttributes( src, dest ) {
	    var nodeName;

	    // We do not need to do anything for non-Elements
	    if ( dest.nodeType !== 1 ) {
	        return;
	    }

	    // clearAttributes removes the attributes, which we don't want,
	    // but also removes the attachEvent events, which we *do* want
	    if ( dest.clearAttributes ) {
	        dest.clearAttributes();
	    }

	    // mergeAttributes, in contrast, only merges back on the
	    // original attributes, not the events
	    if ( dest.mergeAttributes ) {
	        dest.mergeAttributes( src );
	    }

	    nodeName = dest.nodeName.toLowerCase();

	    if ( nodeName === "object" ) {
	        // IE6-10 improperly clones children of object elements using classid.
	        // IE10 throws NoModificationAllowedError if parent is null, #12132.
	        if ( dest.parentNode ) {
	            dest.outerHTML = src.outerHTML;
	        }

	        // This path appears unavoidable for IE9. When cloning an object
	        // element in IE9, the outerHTML strategy above is not sufficient.
	        // If the src has innerHTML and the destination does not,
	        // copy the src.innerHTML into the dest.innerHTML. #10324
	        if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
	            dest.innerHTML = src.innerHTML;
	        }

	    } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
	        // IE6-8 fails to persist the checked state of a cloned checkbox
	        // or radio button. Worse, IE6-7 fail to give the cloned element
	        // a checked appearance if the defaultChecked value isn't also set

	        dest.defaultChecked = dest.checked = src.checked;

	        // IE6-7 get confused and end up setting the value of a cloned
	        // checkbox/radio button to an empty string instead of "on"
	        if ( dest.value !== src.value ) {
	            dest.value = src.value;
	        }

	    // IE6-8 fails to return the selected option to the default selected
	    // state when cloning options
	    } else if ( nodeName === "option" ) {
	        dest.selected = src.defaultSelected;

	    // IE6-8 fails to set the defaultValue to the correct value when
	    // cloning other types of input fields
	    } else if ( nodeName === "input" || nodeName === "textarea" ) {
	        dest.defaultValue = src.defaultValue;

	    // IE blanks contents when cloning scripts
	    } else if ( nodeName === "script" && dest.text !== src.text ) {
	        dest.text = src.text;
	    }

	    // Event data gets referenced instead of copied if the expando
	    // gets copied too
	    dest.removeAttribute( jQuery.expando );
	}

	jQuery.buildFragment = function( args, context, scripts ) {
	    var fragment, cacheable, cachehit,
	        first = args[ 0 ];

	    // Set context from what may come in as undefined or a jQuery collection or a node
	    // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	    // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	    context = context || document;
	    context = !context.nodeType && context[0] || context;
	    context = context.ownerDocument || context;

	    // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	    // Cloning options loses the selected state, so don't cache them
	    // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	    // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	    // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	    if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
	        first.charAt(0) === "<" && !rnocache.test( first ) &&
	        (jQuery.support.checkClone || !rchecked.test( first )) &&
	        (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

	        // Mark cacheable and look for a hit
	        cacheable = true;
	        fragment = jQuery.fragments[ first ];
	        cachehit = fragment !== undefined;
	    }

	    if ( !fragment ) {
	        fragment = context.createDocumentFragment();
	        jQuery.clean( args, context, fragment, scripts );

	        // Update the cache, but only store false
	        // unless this is a second parsing of the same content
	        if ( cacheable ) {
	            jQuery.fragments[ first ] = cachehit && fragment;
	        }
	    }

	    return { fragment: fragment, cacheable: cacheable };
	};

	jQuery.fragments = {};

	jQuery.each({
	    appendTo: "append",
	    prependTo: "prepend",
	    insertBefore: "before",
	    insertAfter: "after",
	    replaceAll: "replaceWith"
	}, function( name, original ) {
	    jQuery.fn[ name ] = function( selector ) {
	        var elems,
	            i = 0,
	            ret = [],
	            insert = jQuery( selector ),
	            l = insert.length,
	            parent = this.length === 1 && this[0].parentNode;

	        if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
	            insert[ original ]( this[0] );
	            return this;
	        } else {
	            for ( ; i < l; i++ ) {
	                elems = ( i > 0 ? this.clone(true) : this ).get();
	                jQuery( insert[i] )[ original ]( elems );
	                ret = ret.concat( elems );
	            }

	            return this.pushStack( ret, name, insert.selector );
	        }
	    };
	});

	function getAll( elem ) {
	    if ( typeof elem.getElementsByTagName !== "undefined" ) {
	        return elem.getElementsByTagName( "*" );

	    } else if ( typeof elem.querySelectorAll !== "undefined" ) {
	        return elem.querySelectorAll( "*" );

	    } else {
	        return [];
	    }
	}

	// Used in clean, fixes the defaultChecked property
	function fixDefaultChecked( elem ) {
	    if ( rcheckableType.test( elem.type ) ) {
	        elem.defaultChecked = elem.checked;
	    }
	}

	jQuery.extend({
	    clone: function( elem, dataAndEvents, deepDataAndEvents ) {
	        var srcElements,
	            destElements,
	            i,
	            clone;

	        if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
	            clone = elem.cloneNode( true );

	        // IE<=8 does not properly clone detached, unknown element nodes
	        } else {
	            fragmentDiv.innerHTML = elem.outerHTML;
	            fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
	        }

	        if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
	                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
	            // IE copies events bound via attachEvent when using cloneNode.
	            // Calling detachEvent on the clone will also remove the events
	            // from the original. In order to get around this, we use some
	            // proprietary methods to clear the events. Thanks to MooTools
	            // guys for this hotness.

	            cloneFixAttributes( elem, clone );

	            // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
	            srcElements = getAll( elem );
	            destElements = getAll( clone );

	            // Weird iteration because IE will replace the length property
	            // with an element if you are cloning the body and one of the
	            // elements on the page has a name or id of "length"
	            for ( i = 0; srcElements[i]; ++i ) {
	                // Ensure that the destination node is not null; Fixes #9587
	                if ( destElements[i] ) {
	                    cloneFixAttributes( srcElements[i], destElements[i] );
	                }
	            }
	        }

	        // Copy the events from the original to the clone
	        if ( dataAndEvents ) {
	            cloneCopyEvent( elem, clone );

	            if ( deepDataAndEvents ) {
	                srcElements = getAll( elem );
	                destElements = getAll( clone );

	                for ( i = 0; srcElements[i]; ++i ) {
	                    cloneCopyEvent( srcElements[i], destElements[i] );
	                }
	            }
	        }

	        srcElements = destElements = null;

	        // Return the cloned set
	        return clone;
	    },

	    clean: function( elems, context, fragment, scripts ) {
	        var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
	            safe = context === document && safeFragment,
	            ret = [];

	        // Ensure that context is a document
	        if ( !context || typeof context.createDocumentFragment === "undefined" ) {
	            context = document;
	        }

	        // Use the already-created safe fragment if context permits
	        for ( i = 0; (elem = elems[i]) != null; i++ ) {
	            if ( typeof elem === "number" ) {
	                elem += "";
	            }

	            if ( !elem ) {
	                continue;
	            }

	            // Convert html string into DOM nodes
	            if ( typeof elem === "string" ) {
	                if ( !rhtml.test( elem ) ) {
	                    elem = context.createTextNode( elem );
	                } else {
	                    // Ensure a safe container in which to render the html
	                    safe = safe || createSafeFragment( context );
	                    div = context.createElement("div");
	                    safe.appendChild( div );

	                    // Fix "XHTML"-style tags in all browsers
	                    elem = elem.replace(rxhtmlTag, "<$1></$2>");

	                    // Go to html and back, then peel off extra wrappers
	                    tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
	                    wrap = wrapMap[ tag ] || wrapMap._default;
	                    depth = wrap[0];
	                    div.innerHTML = wrap[1] + elem + wrap[2];

	                    // Move to the right depth
	                    while ( depth-- ) {
	                        div = div.lastChild;
	                    }

	                    // Remove IE's autoinserted <tbody> from table fragments
	                    if ( !jQuery.support.tbody ) {

	                        // String was a <table>, *may* have spurious <tbody>
	                        hasBody = rtbody.test(elem);
	                            tbody = tag === "table" && !hasBody ?
	                                div.firstChild && div.firstChild.childNodes :

	                                // String was a bare <thead> or <tfoot>
	                                wrap[1] === "<table>" && !hasBody ?
	                                    div.childNodes :
	                                    [];

	                        for ( j = tbody.length - 1; j >= 0 ; --j ) {
	                            if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
	                                tbody[ j ].parentNode.removeChild( tbody[ j ] );
	                            }
	                        }
	                    }

	                    // IE completely kills leading whitespace when innerHTML is used
	                    if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
	                        div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
	                    }

	                    elem = div.childNodes;

	                    // Take out of fragment container (we need a fresh div each time)
	                    div.parentNode.removeChild( div );
	                }
	            }

	            if ( elem.nodeType ) {
	                ret.push( elem );
	            } else {
	                jQuery.merge( ret, elem );
	            }
	        }

	        // Fix #11356: Clear elements from safeFragment
	        if ( div ) {
	            elem = div = safe = null;
	        }

	        // Reset defaultChecked for any radios and checkboxes
	        // about to be appended to the DOM in IE 6/7 (#8060)
	        if ( !jQuery.support.appendChecked ) {
	            for ( i = 0; (elem = ret[i]) != null; i++ ) {
	                if ( jQuery.nodeName( elem, "input" ) ) {
	                    fixDefaultChecked( elem );
	                } else if ( typeof elem.getElementsByTagName !== "undefined" ) {
	                    jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	                }
	            }
	        }

	        // Append elements to a provided document fragment
	        if ( fragment ) {
	            // Special handling of each script element
	            handleScript = function( elem ) {
	                // Check if we consider it executable
	                if ( !elem.type || rscriptType.test( elem.type ) ) {
	                    // Detach the script and store it in the scripts array (if provided) or the fragment
	                    // Return truthy to indicate that it has been handled
	                    return scripts ?
	                        scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
	                        fragment.appendChild( elem );
	                }
	            };

	            for ( i = 0; (elem = ret[i]) != null; i++ ) {
	                // Check if we're done after handling an executable script
	                if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
	                    // Append to fragment and handle embedded scripts
	                    fragment.appendChild( elem );
	                    if ( typeof elem.getElementsByTagName !== "undefined" ) {
	                        // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
	                        jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

	                        // Splice the scripts into ret after their former ancestor and advance our index beyond them
	                        ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
	                        i += jsTags.length;
	                    }
	                }
	            }
	        }

	        return ret;
	    },

	    cleanData: function( elems, /* internal */ acceptData ) {
	        var data, id, elem, type,
	            i = 0,
	            internalKey = jQuery.expando,
	            cache = jQuery.cache,
	            deleteExpando = jQuery.support.deleteExpando,
	            special = jQuery.event.special;

	        for ( ; (elem = elems[i]) != null; i++ ) {

	            if ( acceptData || jQuery.acceptData( elem ) ) {

	                id = elem[ internalKey ];
	                data = id && cache[ id ];

	                if ( data ) {
	                    if ( data.events ) {
	                        for ( type in data.events ) {
	                            if ( special[ type ] ) {
	                                jQuery.event.remove( elem, type );

	                            // This is a shortcut to avoid jQuery.event.remove's overhead
	                            } else {
	                                jQuery.removeEvent( elem, type, data.handle );
	                            }
	                        }
	                    }

	                    // Remove cache only if it was not already removed by jQuery.event.remove
	                    if ( cache[ id ] ) {

	                        delete cache[ id ];

	                        // IE does not allow us to delete expando properties from nodes,
	                        // nor does it have a removeAttribute function on Document nodes;
	                        // we must handle all of these cases
	                        if ( deleteExpando ) {
	                            delete elem[ internalKey ];

	                        } else if ( elem.removeAttribute ) {
	                            elem.removeAttribute( internalKey );

	                        } else {
	                            elem[ internalKey ] = null;
	                        }

	                        jQuery.deletedIds.push( id );
	                    }
	                }
	            }
	        }
	    }
	});
	// Limit scope pollution from any deprecated API
	(function() {

	var matched, browser;

	// Use of jQuery.browser is frowned upon.
	// More details: http://api.jquery.com/jQuery.browser
	// jQuery.uaMatch maintained for back-compat
	jQuery.uaMatch = function( ua ) {
	    ua = ua.toLowerCase();

	    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
	        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
	        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
	        /(msie) ([\w.]+)/.exec( ua ) ||
	        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
	        [];

	    return {
	        browser: match[ 1 ] || "",
	        version: match[ 2 ] || "0"
	    };
	};

	matched = jQuery.uaMatch( navigator.userAgent );
	browser = {};

	if ( matched.browser ) {
	    browser[ matched.browser ] = true;
	    browser.version = matched.version;
	}

	// Chrome is Webkit, but Webkit is also Safari.
	if ( browser.chrome ) {
	    browser.webkit = true;
	} else if ( browser.webkit ) {
	    browser.safari = true;
	}

	jQuery.browser = browser;

	jQuery.sub = function() {
	    function jQuerySub( selector, context ) {
	        return new jQuerySub.fn.init( selector, context );
	    }
	    jQuery.extend( true, jQuerySub, this );
	    jQuerySub.superclass = this;
	    jQuerySub.fn = jQuerySub.prototype = this();
	    jQuerySub.fn.constructor = jQuerySub;
	    jQuerySub.sub = this.sub;
	    jQuerySub.fn.init = function init( selector, context ) {
	        if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
	            context = jQuerySub( context );
	        }

	        return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	    };
	    jQuerySub.fn.init.prototype = jQuerySub.fn;
	    var rootjQuerySub = jQuerySub(document);
	    return jQuerySub;
	};

	})();
	var curCSS, iframe, iframeDoc,
	    ralpha = /alpha\([^)]*\)/i,
	    ropacity = /opacity=([^)]*)/,
	    rposition = /^(top|right|bottom|left)$/,
	    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rmargin = /^margin/,
	    rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	    rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	    rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	    elemdisplay = { BODY: "block" },

	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
	        letterSpacing: 0,
	        fontWeight: 400
	    },

	    cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	    cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	    eventsToggle = jQuery.fn.toggle;

	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

	    // shortcut for names that are not vendor prefixed
	    if ( name in style ) {
	        return name;
	    }

	    // check for vendor prefixed names
	    var capName = name.charAt(0).toUpperCase() + name.slice(1),
	        origName = name,
	        i = cssPrefixes.length;

	    while ( i-- ) {
	        name = cssPrefixes[ i ] + capName;
	        if ( name in style ) {
	            return name;
	        }
	    }

	    return origName;
	}

	function isHidden( elem, el ) {
	    elem = el || elem;
	    return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	}

	function showHide( elements, show ) {
	    var elem, display,
	        values = [],
	        index = 0,
	        length = elements.length;

	    for ( ; index < length; index++ ) {
	        elem = elements[ index ];
	        if ( !elem.style ) {
	            continue;
	        }
	        values[ index ] = jQuery._data( elem, "olddisplay" );
	        if ( show ) {
	            // Reset the inline display of this element to learn if it is
	            // being hidden by cascaded rules or not
	            if ( !values[ index ] && elem.style.display === "none" ) {
	                elem.style.display = "";
	            }

	            // Set elements which have been overridden with display: none
	            // in a stylesheet to whatever the default browser style is
	            // for such an element
	            if ( elem.style.display === "" && isHidden( elem ) ) {
	                values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
	            }
	        } else {
	            display = curCSS( elem, "display" );

	            if ( !values[ index ] && display !== "none" ) {
	                jQuery._data( elem, "olddisplay", display );
	            }
	        }
	    }

	    // Set the display of most of the elements in a second loop
	    // to avoid the constant reflow
	    for ( index = 0; index < length; index++ ) {
	        elem = elements[ index ];
	        if ( !elem.style ) {
	            continue;
	        }
	        if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
	            elem.style.display = show ? values[ index ] || "" : "none";
	        }
	    }

	    return elements;
	}

	jQuery.fn.extend({
	    css: function( name, value ) {
	        return jQuery.access( this, function( elem, name, value ) {
	            return value !== undefined ?
	                jQuery.style( elem, name, value ) :
	                jQuery.css( elem, name );
	        }, name, value, arguments.length > 1 );
	    },
	    show: function() {
	        return showHide( this, true );
	    },
	    hide: function() {
	        return showHide( this );
	    },
	    toggle: function( state, fn2 ) {
	        var bool = typeof state === "boolean";

	        if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
	            return eventsToggle.apply( this, arguments );
	        }

	        return this.each(function() {
	            if ( bool ? state : isHidden( this ) ) {
	                jQuery( this ).show();
	            } else {
	                jQuery( this ).hide();
	            }
	        });
	    }
	});

	jQuery.extend({
	    // Add in style property hooks for overriding the default
	    // behavior of getting and setting a style property
	    cssHooks: {
	        opacity: {
	            get: function( elem, computed ) {
	                if ( computed ) {
	                    // We should always get a number back from opacity
	                    var ret = curCSS( elem, "opacity" );
	                    return ret === "" ? "1" : ret;

	                }
	            }
	        }
	    },

	    // Exclude the following css properties to add px
	    cssNumber: {
	        "fillOpacity": true,
	        "fontWeight": true,
	        "lineHeight": true,
	        "opacity": true,
	        "orphans": true,
	        "widows": true,
	        "zIndex": true,
	        "zoom": true
	    },

	    // Add in properties whose names you wish to fix before
	    // setting or getting the value
	    cssProps: {
	        // normalize float css property
	        "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	    },

	    // Get and set the style property on a DOM Node
	    style: function( elem, name, value, extra ) {
	        // Don't set styles on text and comment nodes
	        if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
	            return;
	        }

	        // Make sure that we're working with the right name
	        var ret, type, hooks,
	            origName = jQuery.camelCase( name ),
	            style = elem.style;

	        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

	        // gets hook for the prefixed version
	        // followed by the unprefixed version
	        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

	        // Check if we're setting a value
	        if ( value !== undefined ) {
	            type = typeof value;

	            // convert relative number strings (+= or -=) to relative numbers. #7345
	            if ( type === "string" && (ret = rrelNum.exec( value )) ) {
	                value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
	                // Fixes bug #9237
	                type = "number";
	            }

	            // Make sure that NaN and null values aren't set. See: #7116
	            if ( value == null || type === "number" && isNaN( value ) ) {
	                return;
	            }

	            // If a number was passed in, add 'px' to the (except for certain CSS properties)
	            if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
	                value += "px";
	            }

	            // If a hook was provided, use that value, otherwise just set the specified value
	            if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
	                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
	                // Fixes bug #5509
	                try {
	                    style[ name ] = value;
	                } catch(e) {}
	            }

	        } else {
	            // If a hook was provided get the non-computed value from there
	            if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
	                return ret;
	            }

	            // Otherwise just get the value from the style object
	            return style[ name ];
	        }
	    },

	    css: function( elem, name, numeric, extra ) {
	        var val, num, hooks,
	            origName = jQuery.camelCase( name );

	        // Make sure that we're working with the right name
	        name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

	        // gets hook for the prefixed version
	        // followed by the unprefixed version
	        hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

	        // If a hook was provided get the computed value from there
	        if ( hooks && "get" in hooks ) {
	            val = hooks.get( elem, true, extra );
	        }

	        // Otherwise, if a way to get the computed value exists, use that
	        if ( val === undefined ) {
	            val = curCSS( elem, name );
	        }

	        //convert "normal" to computed value
	        if ( val === "normal" && name in cssNormalTransform ) {
	            val = cssNormalTransform[ name ];
	        }

	        // Return, converting to number if forced or a qualifier was provided and val looks numeric
	        if ( numeric || extra !== undefined ) {
	            num = parseFloat( val );
	            return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
	        }
	        return val;
	    },

	    // A method for quickly swapping in/out CSS properties to get correct calculations
	    swap: function( elem, options, callback ) {
	        var ret, name,
	            old = {};

	        // Remember the old values, and insert the new ones
	        for ( name in options ) {
	            old[ name ] = elem.style[ name ];
	            elem.style[ name ] = options[ name ];
	        }

	        ret = callback.call( elem );

	        // Revert the old values
	        for ( name in options ) {
	            elem.style[ name ] = old[ name ];
	        }

	        return ret;
	    }
	});

	// NOTE: To any future maintainer, we've window.getComputedStyle
	// because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
	    curCSS = function( elem, name ) {
	        var ret, width, minWidth, maxWidth,
	            computed = window.getComputedStyle( elem, null ),
	            style = elem.style;

	        if ( computed ) {

	            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
	            ret = computed.getPropertyValue( name ) || computed[ name ];

	            if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
	                ret = jQuery.style( elem, name );
	            }

	            // A tribute to the "awesome hack by Dean Edwards"
	            // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
	            // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
	            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
	            if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	                width = style.width;
	                minWidth = style.minWidth;
	                maxWidth = style.maxWidth;

	                style.minWidth = style.maxWidth = style.width = ret;
	                ret = computed.width;

	                style.width = width;
	                style.minWidth = minWidth;
	                style.maxWidth = maxWidth;
	            }
	        }

	        return ret;
	    };
	} else if ( document.documentElement.currentStyle ) {
	    curCSS = function( elem, name ) {
	        var left, rsLeft,
	            ret = elem.currentStyle && elem.currentStyle[ name ],
	            style = elem.style;

	        // Avoid setting ret to empty string here
	        // so we don't default to auto
	        if ( ret == null && style && style[ name ] ) {
	            ret = style[ name ];
	        }

	        // From the awesome hack by Dean Edwards
	        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

	        // If we're not dealing with a regular pixel number
	        // but a number that has a weird ending, we need to convert it to pixels
	        // but not position css attributes, as those are proportional to the parent element instead
	        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
	        if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

	            // Remember the original values
	            left = style.left;
	            rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

	            // Put in the new values to get a computed value out
	            if ( rsLeft ) {
	                elem.runtimeStyle.left = elem.currentStyle.left;
	            }
	            style.left = name === "fontSize" ? "1em" : ret;
	            ret = style.pixelLeft + "px";

	            // Revert the changed values
	            style.left = left;
	            if ( rsLeft ) {
	                elem.runtimeStyle.left = rsLeft;
	            }
	        }

	        return ret === "" ? "auto" : ret;
	    };
	}

	function setPositiveNumber( elem, value, subtract ) {
	    var matches = rnumsplit.exec( value );
	    return matches ?
	            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
	            value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	    var i = extra === ( isBorderBox ? "border" : "content" ) ?
	        // If we already have the right measurement, avoid augmentation
	        4 :
	        // Otherwise initialize for horizontal or vertical properties
	        name === "width" ? 1 : 0,

	        val = 0;

	    for ( ; i < 4; i += 2 ) {
	        // both box models exclude margin, so add it if we want it
	        if ( extra === "margin" ) {
	            // we use jQuery.css instead of curCSS here
	            // because of the reliableMarginRight CSS hook!
	            val += jQuery.css( elem, extra + cssExpand[ i ], true );
	        }

	        // From this point on we use curCSS for maximum performance (relevant in animations)
	        if ( isBorderBox ) {
	            // border-box includes padding, so remove it if we want content
	            if ( extra === "content" ) {
	                val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
	            }

	            // at this point, extra isn't border nor margin, so remove border
	            if ( extra !== "margin" ) {
	                val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
	            }
	        } else {
	            // at this point, extra isn't content, so add padding
	            val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

	            // at this point, extra isn't content nor padding, so add border
	            if ( extra !== "padding" ) {
	                val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
	            }
	        }
	    }

	    return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

	    // Start with offset property, which is equivalent to the border-box value
	    var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
	        valueIsBorderBox = true,
	        isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	    // some non-html elements return undefined for offsetWidth, so check for null/undefined
	    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	    if ( val <= 0 || val == null ) {
	        // Fall back to computed then uncomputed css if necessary
	        val = curCSS( elem, name );
	        if ( val < 0 || val == null ) {
	            val = elem.style[ name ];
	        }

	        // Computed unit is not pixels. Stop here and return.
	        if ( rnumnonpx.test(val) ) {
	            return val;
	        }

	        // we need the check for style in case a browser which returns unreliable values
	        // for getComputedStyle silently falls back to the reliable elem.style
	        valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

	        // Normalize "", auto, and prepare for extra
	        val = parseFloat( val ) || 0;
	    }

	    // use the active box-sizing model to add/subtract irrelevant styles
	    return ( val +
	        augmentWidthOrHeight(
	            elem,
	            name,
	            extra || ( isBorderBox ? "border" : "content" ),
	            valueIsBorderBox
	        )
	    ) + "px";
	}


	// Try to determine the default display value of an element
	function css_defaultDisplay( nodeName ) {
	    if ( elemdisplay[ nodeName ] ) {
	        return elemdisplay[ nodeName ];
	    }

	    var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
	        display = elem.css("display");
	    elem.remove();

	    // If the simple way fails,
	    // get element's real default display by attaching it to a temp iframe
	    if ( display === "none" || display === "" ) {
	        // Use the already-created iframe if possible
	        iframe = document.body.appendChild(
	            iframe || jQuery.extend( document.createElement("iframe"), {
	                frameBorder: 0,
	                width: 0,
	                height: 0
	            })
	        );

	        // Create a cacheable copy of the iframe document on first call.
	        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
	        // document to it; WebKit & Firefox won't allow reusing the iframe document.
	        if ( !iframeDoc || !iframe.createElement ) {
	            iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
	            iframeDoc.write("<!doctype html><html><body>");
	            iframeDoc.close();
	        }

	        elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

	        display = curCSS( elem, "display" );
	        document.body.removeChild( iframe );
	    }

	    // Store the correct default display
	    elemdisplay[ nodeName ] = display;

	    return display;
	}

	jQuery.each([ "height", "width" ], function( i, name ) {
	    jQuery.cssHooks[ name ] = {
	        get: function( elem, computed, extra ) {
	            if ( computed ) {
	                // certain elements can have dimension info if we invisibly show them
	                // however, it must have a current display style that would benefit from this
	                if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
	                    return jQuery.swap( elem, cssShow, function() {
	                        return getWidthOrHeight( elem, name, extra );
	                    });
	                } else {
	                    return getWidthOrHeight( elem, name, extra );
	                }
	            }
	        },

	        set: function( elem, value, extra ) {
	            return setPositiveNumber( elem, value, extra ?
	                augmentWidthOrHeight(
	                    elem,
	                    name,
	                    extra,
	                    jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
	                ) : 0
	            );
	        }
	    };
	});

	if ( !jQuery.support.opacity ) {
	    jQuery.cssHooks.opacity = {
	        get: function( elem, computed ) {
	            // IE uses filters for opacity
	            return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
	                ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
	                computed ? "1" : "";
	        },

	        set: function( elem, value ) {
	            var style = elem.style,
	                currentStyle = elem.currentStyle,
	                opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
	                filter = currentStyle && currentStyle.filter || style.filter || "";

	            // IE has trouble with opacity if it does not have layout
	            // Force it by setting the zoom level
	            style.zoom = 1;

	            // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
	            if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
	                style.removeAttribute ) {

	                // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
	                // if "filter:" is present at all, clearType is disabled, we want to avoid this
	                // style.removeAttribute is IE Only, but so apparently is this code path...
	                style.removeAttribute( "filter" );

	                // if there there is no filter style applied in a css rule, we are done
	                if ( currentStyle && !currentStyle.filter ) {
	                    return;
	                }
	            }

	            // otherwise, set new filter values
	            style.filter = ralpha.test( filter ) ?
	                filter.replace( ralpha, opacity ) :
	                filter + " " + opacity;
	        }
	    };
	}

	// These hooks cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	jQuery(function() {
	    if ( !jQuery.support.reliableMarginRight ) {
	        jQuery.cssHooks.marginRight = {
	            get: function( elem, computed ) {
	                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	                // Work around by temporarily setting element display to inline-block
	                return jQuery.swap( elem, { "display": "inline-block" }, function() {
	                    if ( computed ) {
	                        return curCSS( elem, "marginRight" );
	                    }
	                });
	            }
	        };
	    }

	    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	    // getComputedStyle returns percent when specified for top/left/bottom/right
	    // rather than make the css module depend on the offset module, we just check for it here
	    if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
	        jQuery.each( [ "top", "left" ], function( i, prop ) {
	            jQuery.cssHooks[ prop ] = {
	                get: function( elem, computed ) {
	                    if ( computed ) {
	                        var ret = curCSS( elem, prop );
	                        // if curCSS returns percentage, fallback to offset
	                        return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
	                    }
	                }
	            };
	        });
	    }

	});

	if ( jQuery.expr && jQuery.expr.filters ) {
	    jQuery.expr.filters.hidden = function( elem ) {
	        return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	    };

	    jQuery.expr.filters.visible = function( elem ) {
	        return !jQuery.expr.filters.hidden( elem );
	    };
	}

	// These hooks are used by animate to expand properties
	jQuery.each({
	    margin: "",
	    padding: "",
	    border: "Width"
	}, function( prefix, suffix ) {
	    jQuery.cssHooks[ prefix + suffix ] = {
	        expand: function( value ) {
	            var i,

	                // assumes a single number if not a string
	                parts = typeof value === "string" ? value.split(" ") : [ value ],
	                expanded = {};

	            for ( i = 0; i < 4; i++ ) {
	                expanded[ prefix + cssExpand[ i ] + suffix ] =
	                    parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
	            }

	            return expanded;
	        }
	    };

	    if ( !rmargin.test( prefix ) ) {
	        jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	    }
	});
	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	    rselectTextarea = /^(?:select|textarea)/i;

	jQuery.fn.extend({
	    serialize: function() {
	        return jQuery.param( this.serializeArray() );
	    },
	    serializeArray: function() {
	        return this.map(function(){
	            return this.elements ? jQuery.makeArray( this.elements ) : this;
	        })
	        .filter(function(){
	            return this.name && !this.disabled &&
	                ( this.checked || rselectTextarea.test( this.nodeName ) ||
	                    rinput.test( this.type ) );
	        })
	        .map(function( i, elem ){
	            var val = jQuery( this ).val();

	            return val == null ?
	                null :
	                jQuery.isArray( val ) ?
	                    jQuery.map( val, function( val, i ){
	                        return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
	                    }) :
	                    { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
	        }).get();
	    }
	});

	//Serialize an array of form elements or a set of
	//key/values into a query string
	jQuery.param = function( a, traditional ) {
	    var prefix,
	        s = [],
	        add = function( key, value ) {
	            // If value is a function, invoke it and return its value
	            value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
	            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
	        };

	    // Set traditional to true for jQuery <= 1.3.2 behavior.
	    if ( traditional === undefined ) {
	        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	    }

	    // If an array was passed in, assume that it is an array of form elements.
	    if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	        // Serialize the form elements
	        jQuery.each( a, function() {
	            add( this.name, this.value );
	        });

	    } else {
	        // If traditional, encode the "old" way (the way 1.3.2 or older
	        // did it), otherwise encode params recursively.
	        for ( prefix in a ) {
	            buildParams( prefix, a[ prefix ], traditional, add );
	        }
	    }

	    // Return the resulting serialization
	    return s.join( "&" ).replace( r20, "+" );
	};

	function buildParams( prefix, obj, traditional, add ) {
	    var name;

	    if ( jQuery.isArray( obj ) ) {
	        // Serialize array item.
	        jQuery.each( obj, function( i, v ) {
	            if ( traditional || rbracket.test( prefix ) ) {
	                // Treat each array item as a scalar.
	                add( prefix, v );

	            } else {
	                // If array item is non-scalar (array or object), encode its
	                // numeric index to resolve deserialization ambiguity issues.
	                // Note that rack (as of 1.0.0) can't currently deserialize
	                // nested arrays properly, and attempting to do so may cause
	                // a server error. Possible fixes are to modify rack's
	                // deserialization algorithm or to provide an option or flag
	                // to force array serialization to be shallow.
	                buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
	            }
	        });

	    } else if ( !traditional && jQuery.type( obj ) === "object" ) {
	        // Serialize object item.
	        for ( name in obj ) {
	            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
	        }

	    } else {
	        // Serialize scalar item.
	        add( prefix, obj );
	    }
	}
	var
	    // Document location
	    ajaxLocParts,
	    ajaxLocation,

	    rhash = /#.*$/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	    // #7653, #8125, #8152: local protocol detection
	    rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,
	    rquery = /\?/,
	    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	    rts = /([?&])_=[^&]*/,
	    rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	    // Keep a copy of the old load method
	    _load = jQuery.fn.load,

	    /* Prefilters
	     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	     * 2) These are called:
	     *    - BEFORE asking for a transport
	     *    - AFTER param serialization (s.data is a string if s.processData is true)
	     * 3) key is the dataType
	     * 4) the catchall symbol "*" can be used
	     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	     */
	    prefilters = {},

	    /* Transports bindings
	     * 1) key is the dataType
	     * 2) the catchall symbol "*" can be used
	     * 3) selection will start with transport dataType and THEN go to "*" if needed
	     */
	    transports = {},

	    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	    allTypes = ["*/"] + ["*"];

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
	    ajaxLocation = location.href;
	} catch( e ) {
	    // Use the href attribute of an A element
	    // since IE will modify it given document.location
	    ajaxLocation = document.createElement( "a" );
	    ajaxLocation.href = "";
	    ajaxLocation = ajaxLocation.href;
	}

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

	    // dataTypeExpression is optional and defaults to "*"
	    return function( dataTypeExpression, func ) {

	        if ( typeof dataTypeExpression !== "string" ) {
	            func = dataTypeExpression;
	            dataTypeExpression = "*";
	        }

	        var dataType, list, placeBefore,
	            dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
	            i = 0,
	            length = dataTypes.length;

	        if ( jQuery.isFunction( func ) ) {
	            // For each dataType in the dataTypeExpression
	            for ( ; i < length; i++ ) {
	                dataType = dataTypes[ i ];
	                // We control if we're asked to add before
	                // any existing element
	                placeBefore = /^\+/.test( dataType );
	                if ( placeBefore ) {
	                    dataType = dataType.substr( 1 ) || "*";
	                }
	                list = structure[ dataType ] = structure[ dataType ] || [];
	                // then we add to the structure accordingly
	                list[ placeBefore ? "unshift" : "push" ]( func );
	            }
	        }
	    };
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
	        dataType /* internal */, inspected /* internal */ ) {

	    dataType = dataType || options.dataTypes[ 0 ];
	    inspected = inspected || {};

	    inspected[ dataType ] = true;

	    var selection,
	        list = structure[ dataType ],
	        i = 0,
	        length = list ? list.length : 0,
	        executeOnly = ( structure === prefilters );

	    for ( ; i < length && ( executeOnly || !selection ); i++ ) {
	        selection = list[ i ]( options, originalOptions, jqXHR );
	        // If we got redirected to another dataType
	        // we try there if executing only and not done already
	        if ( typeof selection === "string" ) {
	            if ( !executeOnly || inspected[ selection ] ) {
	                selection = undefined;
	            } else {
	                options.dataTypes.unshift( selection );
	                selection = inspectPrefiltersOrTransports(
	                        structure, options, originalOptions, jqXHR, selection, inspected );
	            }
	        }
	    }
	    // If we're only executing or nothing was selected
	    // we try the catchall dataType if not done already
	    if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
	        selection = inspectPrefiltersOrTransports(
	                structure, options, originalOptions, jqXHR, "*", inspected );
	    }
	    // unnecessary when only executing (prefilters)
	    // but it'll be ignored by the caller in that case
	    return selection;
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
	    var key, deep,
	        flatOptions = jQuery.ajaxSettings.flatOptions || {};
	    for ( key in src ) {
	        if ( src[ key ] !== undefined ) {
	            ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
	        }
	    }
	    if ( deep ) {
	        jQuery.extend( true, target, deep );
	    }
	}

	jQuery.fn.load = function( url, params, callback ) {
	    if ( typeof url !== "string" && _load ) {
	        return _load.apply( this, arguments );
	    }

	    // Don't do a request if no elements are being requested
	    if ( !this.length ) {
	        return this;
	    }

	    var selector, type, response,
	        self = this,
	        off = url.indexOf(" ");

	    if ( off >= 0 ) {
	        selector = url.slice( off, url.length );
	        url = url.slice( 0, off );
	    }

	    // If it's a function
	    if ( jQuery.isFunction( params ) ) {

	        // We assume that it's the callback
	        callback = params;
	        params = undefined;

	    // Otherwise, build a param string
	    } else if ( params && typeof params === "object" ) {
	        type = "POST";
	    }

	    // Request the remote document
	    jQuery.ajax({
	        url: url,

	        // if "type" variable is undefined, then "GET" method will be used
	        type: type,
	        dataType: "html",
	        data: params,
	        complete: function( jqXHR, status ) {
	            if ( callback ) {
	                self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
	            }
	        }
	    }).done(function( responseText ) {

	        // Save response for use in complete callback
	        response = arguments;

	        // See if a selector was specified
	        self.html( selector ?

	            // Create a dummy div to hold the results
	            jQuery("<div>")

	                // inject the contents of the document in, removing the scripts
	                // to avoid any 'Permission Denied' errors in IE
	                .append( responseText.replace( rscript, "" ) )

	                // Locate the specified elements
	                .find( selector ) :

	            // If not, just inject the full result
	            responseText );

	    });

	    return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	    jQuery.fn[ o ] = function( f ){
	        return this.on( o, f );
	    };
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
	    jQuery[ method ] = function( url, data, callback, type ) {
	        // shift arguments if data argument was omitted
	        if ( jQuery.isFunction( data ) ) {
	            type = type || callback;
	            callback = data;
	            data = undefined;
	        }

	        return jQuery.ajax({
	            type: method,
	            url: url,
	            data: data,
	            success: callback,
	            dataType: type
	        });
	    };
	});

	jQuery.extend({

	    getScript: function( url, callback ) {
	        return jQuery.get( url, undefined, callback, "script" );
	    },

	    getJSON: function( url, data, callback ) {
	        return jQuery.get( url, data, callback, "json" );
	    },

	    // Creates a full fledged settings object into target
	    // with both ajaxSettings and settings fields.
	    // If target is omitted, writes into ajaxSettings.
	    ajaxSetup: function( target, settings ) {
	        if ( settings ) {
	            // Building a settings object
	            ajaxExtend( target, jQuery.ajaxSettings );
	        } else {
	            // Extending ajaxSettings
	            settings = target;
	            target = jQuery.ajaxSettings;
	        }
	        ajaxExtend( target, settings );
	        return target;
	    },

	    ajaxSettings: {
	        url: ajaxLocation,
	        isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
	        global: true,
	        type: "GET",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        processData: true,
	        async: true,
	        /*
	        timeout: 0,
	        data: null,
	        dataType: null,
	        username: null,
	        password: null,
	        cache: null,
	        throws: false,
	        traditional: false,
	        headers: {},
	        */

	        accepts: {
	            xml: "application/xml, text/xml",
	            html: "text/html",
	            text: "text/plain",
	            json: "application/json, text/javascript",
	            "*": allTypes
	        },

	        contents: {
	            xml: /xml/,
	            html: /html/,
	            json: /json/
	        },

	        responseFields: {
	            xml: "responseXML",
	            text: "responseText"
	        },

	        // List of data converters
	        // 1) key format is "source_type destination_type" (a single space in-between)
	        // 2) the catchall symbol "*" can be used for source_type
	        converters: {

	            // Convert anything to text
	            "* text": window.String,

	            // Text to html (true = no transformation)
	            "text html": true,

	            // Evaluate text as a json expression
	            "text json": jQuery.parseJSON,

	            // Parse text as xml
	            "text xml": jQuery.parseXML
	        },

	        // For options that shouldn't be deep extended:
	        // you can add your own custom options here if
	        // and when you create one that shouldn't be
	        // deep extended (see ajaxExtend)
	        flatOptions: {
	            context: true,
	            url: true
	        }
	    },

	    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	    ajaxTransport: addToPrefiltersOrTransports( transports ),

	    // Main method
	    ajax: function( url, options ) {

	        // If url is an object, simulate pre-1.5 signature
	        if ( typeof url === "object" ) {
	            options = url;
	            url = undefined;
	        }

	        // Force options to be an object
	        options = options || {};

	        var // ifModified key
	            ifModifiedKey,
	            // Response headers
	            responseHeadersString,
	            responseHeaders,
	            // transport
	            transport,
	            // timeout handle
	            timeoutTimer,
	            // Cross-domain detection vars
	            parts,
	            // To know if global events are to be dispatched
	            fireGlobals,
	            // Loop variable
	            i,
	            // Create the final options object
	            s = jQuery.ajaxSetup( {}, options ),
	            // Callbacks context
	            callbackContext = s.context || s,
	            // Context for global events
	            // It's the callbackContext if one was provided in the options
	            // and if it's a DOM node or a jQuery collection
	            globalEventContext = callbackContext !== s &&
	                ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
	                        jQuery( callbackContext ) : jQuery.event,
	            // Deferreds
	            deferred = jQuery.Deferred(),
	            completeDeferred = jQuery.Callbacks( "once memory" ),
	            // Status-dependent callbacks
	            statusCode = s.statusCode || {},
	            // Headers (they are sent all at once)
	            requestHeaders = {},
	            requestHeadersNames = {},
	            // The jqXHR state
	            state = 0,
	            // Default abort message
	            strAbort = "canceled",
	            // Fake xhr
	            jqXHR = {

	                readyState: 0,

	                // Caches the header
	                setRequestHeader: function( name, value ) {
	                    if ( !state ) {
	                        var lname = name.toLowerCase();
	                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
	                        requestHeaders[ name ] = value;
	                    }
	                    return this;
	                },

	                // Raw string
	                getAllResponseHeaders: function() {
	                    return state === 2 ? responseHeadersString : null;
	                },

	                // Builds headers hashtable if needed
	                getResponseHeader: function( key ) {
	                    var match;
	                    if ( state === 2 ) {
	                        if ( !responseHeaders ) {
	                            responseHeaders = {};
	                            while( ( match = rheaders.exec( responseHeadersString ) ) ) {
	                                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
	                            }
	                        }
	                        match = responseHeaders[ key.toLowerCase() ];
	                    }
	                    return match === undefined ? null : match;
	                },

	                // Overrides response content-type header
	                overrideMimeType: function( type ) {
	                    if ( !state ) {
	                        s.mimeType = type;
	                    }
	                    return this;
	                },

	                // Cancel the request
	                abort: function( statusText ) {
	                    statusText = statusText || strAbort;
	                    if ( transport ) {
	                        transport.abort( statusText );
	                    }
	                    done( 0, statusText );
	                    return this;
	                }
	            };

	        // Callback for when everything is done
	        // It is defined here because jslint complains if it is declared
	        // at the end of the function (which would be more logical and readable)
	        function done( status, nativeStatusText, responses, headers ) {
	            var isSuccess, success, error, response, modified,
	                statusText = nativeStatusText;

	            // Called once
	            if ( state === 2 ) {
	                return;
	            }

	            // State is "done" now
	            state = 2;

	            // Clear timeout if it exists
	            if ( timeoutTimer ) {
	                clearTimeout( timeoutTimer );
	            }

	            // Dereference transport for early garbage collection
	            // (no matter how long the jqXHR object will be used)
	            transport = undefined;

	            // Cache response headers
	            responseHeadersString = headers || "";

	            // Set readyState
	            jqXHR.readyState = status > 0 ? 4 : 0;

	            // Get response data
	            if ( responses ) {
	                response = ajaxHandleResponses( s, jqXHR, responses );
	            }

	            // If successful, handle type chaining
	            if ( status >= 200 && status < 300 || status === 304 ) {

	                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	                if ( s.ifModified ) {

	                    modified = jqXHR.getResponseHeader("Last-Modified");
	                    if ( modified ) {
	                        jQuery.lastModified[ ifModifiedKey ] = modified;
	                    }
	                    modified = jqXHR.getResponseHeader("Etag");
	                    if ( modified ) {
	                        jQuery.etag[ ifModifiedKey ] = modified;
	                    }
	                }

	                // If not modified
	                if ( status === 304 ) {

	                    statusText = "notmodified";
	                    isSuccess = true;

	                // If we have data
	                } else {

	                    isSuccess = ajaxConvert( s, response );
	                    statusText = isSuccess.state;
	                    success = isSuccess.data;
	                    error = isSuccess.error;
	                    isSuccess = !error;
	                }
	            } else {
	                // We extract error from statusText
	                // then normalize statusText and status for non-aborts
	                error = statusText;
	                if ( !statusText || status ) {
	                    statusText = "error";
	                    if ( status < 0 ) {
	                        status = 0;
	                    }
	                }
	            }

	            // Set data for the fake xhr object
	            jqXHR.status = status;
	            jqXHR.statusText = ( nativeStatusText || statusText ) + "";

	            // Success/Error
	            if ( isSuccess ) {
	                deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
	            } else {
	                deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
	            }

	            // Status-dependent callbacks
	            jqXHR.statusCode( statusCode );
	            statusCode = undefined;

	            if ( fireGlobals ) {
	                globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
	                        [ jqXHR, s, isSuccess ? success : error ] );
	            }

	            // Complete
	            completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

	            if ( fireGlobals ) {
	                globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	                // Handle the global AJAX counter
	                if ( !( --jQuery.active ) ) {
	                    jQuery.event.trigger( "ajaxStop" );
	                }
	            }
	        }

	        // Attach deferreds
	        deferred.promise( jqXHR );
	        jqXHR.success = jqXHR.done;
	        jqXHR.error = jqXHR.fail;
	        jqXHR.complete = completeDeferred.add;

	        // Status-dependent callbacks
	        jqXHR.statusCode = function( map ) {
	            if ( map ) {
	                var tmp;
	                if ( state < 2 ) {
	                    for ( tmp in map ) {
	                        statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
	                    }
	                } else {
	                    tmp = map[ jqXHR.status ];
	                    jqXHR.always( tmp );
	                }
	            }
	            return this;
	        };

	        // Remove hash character (#7531: and string promotion)
	        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
	        // We also use the url parameter if available
	        s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

	        // Extract dataTypes list
	        s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

	        // A cross-domain request is in order when we have a protocol:host:port mismatch
	        if ( s.crossDomain == null ) {
	            parts = rurl.exec( s.url.toLowerCase() );
	            s.crossDomain = !!( parts &&
	                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
	                    ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
	                        ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
	            );
	        }

	        // Convert data if not already a string
	        if ( s.data && s.processData && typeof s.data !== "string" ) {
	            s.data = jQuery.param( s.data, s.traditional );
	        }

	        // Apply prefilters
	        inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

	        // If request was aborted inside a prefilter, stop there
	        if ( state === 2 ) {
	            return jqXHR;
	        }

	        // We can fire global events as of now if asked to
	        fireGlobals = s.global;

	        // Uppercase the type
	        s.type = s.type.toUpperCase();

	        // Determine if request has content
	        s.hasContent = !rnoContent.test( s.type );

	        // Watch for a new set of requests
	        if ( fireGlobals && jQuery.active++ === 0 ) {
	            jQuery.event.trigger( "ajaxStart" );
	        }

	        // More options handling for requests with no content
	        if ( !s.hasContent ) {

	            // If data is available, append data to url
	            if ( s.data ) {
	                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
	                // #9682: remove data so that it's not used in an eventual retry
	                delete s.data;
	            }

	            // Get ifModifiedKey before adding the anti-cache parameter
	            ifModifiedKey = s.url;

	            // Add anti-cache in url if needed
	            if ( s.cache === false ) {

	                var ts = jQuery.now(),
	                    // try replacing _= if it is there
	                    ret = s.url.replace( rts, "$1_=" + ts );

	                // if nothing was replaced, add timestamp to the end
	                s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
	            }
	        }

	        // Set the correct header, if data is being sent
	        if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
	            jqXHR.setRequestHeader( "Content-Type", s.contentType );
	        }

	        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	        if ( s.ifModified ) {
	            ifModifiedKey = ifModifiedKey || s.url;
	            if ( jQuery.lastModified[ ifModifiedKey ] ) {
	                jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
	            }
	            if ( jQuery.etag[ ifModifiedKey ] ) {
	                jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
	            }
	        }

	        // Set the Accepts header for the server, depending on the dataType
	        jqXHR.setRequestHeader(
	            "Accept",
	            s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
	                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
	                s.accepts[ "*" ]
	        );

	        // Check for headers option
	        for ( i in s.headers ) {
	            jqXHR.setRequestHeader( i, s.headers[ i ] );
	        }

	        // Allow custom headers/mimetypes and early abort
	        if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	                // Abort if not done already and return
	                return jqXHR.abort();

	        }

	        // aborting is no longer a cancellation
	        strAbort = "abort";

	        // Install callbacks on deferreds
	        for ( i in { success: 1, error: 1, complete: 1 } ) {
	            jqXHR[ i ]( s[ i ] );
	        }

	        // Get transport
	        transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

	        // If no transport, we auto-abort
	        if ( !transport ) {
	            done( -1, "No Transport" );
	        } else {
	            jqXHR.readyState = 1;
	            // Send global event
	            if ( fireGlobals ) {
	                globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
	            }
	            // Timeout
	            if ( s.async && s.timeout > 0 ) {
	                timeoutTimer = setTimeout( function(){
	                    jqXHR.abort( "timeout" );
	                }, s.timeout );
	            }

	            try {
	                state = 1;
	                transport.send( requestHeaders, done );
	            } catch (e) {
	                // Propagate exception as error if not done
	                if ( state < 2 ) {
	                    done( -1, e );
	                // Simply rethrow otherwise
	                } else {
	                    throw e;
	                }
	            }
	        }

	        return jqXHR;
	    },

	    // Counter for holding the number of active queries
	    active: 0,

	    // Last-Modified header cache for next request
	    lastModified: {},
	    etag: {}

	});

	/* Handles responses to an ajax request:
	 * - sets all responseXXX fields accordingly
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

	    var ct, type, finalDataType, firstDataType,
	        contents = s.contents,
	        dataTypes = s.dataTypes,
	        responseFields = s.responseFields;

	    // Fill responseXXX fields
	    for ( type in responseFields ) {
	        if ( type in responses ) {
	            jqXHR[ responseFields[type] ] = responses[ type ];
	        }
	    }

	    // Remove auto dataType and get content-type in the process
	    while( dataTypes[ 0 ] === "*" ) {
	        dataTypes.shift();
	        if ( ct === undefined ) {
	            ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
	        }
	    }

	    // Check if we're dealing with a known content-type
	    if ( ct ) {
	        for ( type in contents ) {
	            if ( contents[ type ] && contents[ type ].test( ct ) ) {
	                dataTypes.unshift( type );
	                break;
	            }
	        }
	    }

	    // Check to see if we have a response for the expected dataType
	    if ( dataTypes[ 0 ] in responses ) {
	        finalDataType = dataTypes[ 0 ];
	    } else {
	        // Try convertible dataTypes
	        for ( type in responses ) {
	            if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
	                finalDataType = type;
	                break;
	            }
	            if ( !firstDataType ) {
	                firstDataType = type;
	            }
	        }
	        // Or just use first one
	        finalDataType = finalDataType || firstDataType;
	    }

	    // If we found a dataType
	    // We add the dataType to the list if needed
	    // and return the corresponding response
	    if ( finalDataType ) {
	        if ( finalDataType !== dataTypes[ 0 ] ) {
	            dataTypes.unshift( finalDataType );
	        }
	        return responses[ finalDataType ];
	    }
	}

	// Chain conversions given the request and the original response
	function ajaxConvert( s, response ) {

	    var conv, conv2, current, tmp,
	        // Work with a copy of dataTypes in case we need to modify it for conversion
	        dataTypes = s.dataTypes.slice(),
	        prev = dataTypes[ 0 ],
	        converters = {},
	        i = 0;

	    // Apply the dataFilter if provided
	    if ( s.dataFilter ) {
	        response = s.dataFilter( response, s.dataType );
	    }

	    // Create converters map with lowercased keys
	    if ( dataTypes[ 1 ] ) {
	        for ( conv in s.converters ) {
	            converters[ conv.toLowerCase() ] = s.converters[ conv ];
	        }
	    }

	    // Convert to each sequential dataType, tolerating list modification
	    for ( ; (current = dataTypes[++i]); ) {

	        // There's only work to do if current dataType is non-auto
	        if ( current !== "*" ) {

	            // Convert response if prev dataType is non-auto and differs from current
	            if ( prev !== "*" && prev !== current ) {

	                // Seek a direct converter
	                conv = converters[ prev + " " + current ] || converters[ "* " + current ];

	                // If none found, seek a pair
	                if ( !conv ) {
	                    for ( conv2 in converters ) {

	                        // If conv2 outputs current
	                        tmp = conv2.split(" ");
	                        if ( tmp[ 1 ] === current ) {

	                            // If prev can be converted to accepted input
	                            conv = converters[ prev + " " + tmp[ 0 ] ] ||
	                                converters[ "* " + tmp[ 0 ] ];
	                            if ( conv ) {
	                                // Condense equivalence converters
	                                if ( conv === true ) {
	                                    conv = converters[ conv2 ];

	                                // Otherwise, insert the intermediate dataType
	                                } else if ( converters[ conv2 ] !== true ) {
	                                    current = tmp[ 0 ];
	                                    dataTypes.splice( i--, 0, current );
	                                }

	                                break;
	                            }
	                        }
	                    }
	                }

	                // Apply converter (if not an equivalence)
	                if ( conv !== true ) {

	                    // Unless errors are allowed to bubble, catch and return them
	                    if ( conv && s["throws"] ) {
	                        response = conv( response );
	                    } else {
	                        try {
	                            response = conv( response );
	                        } catch ( e ) {
	                            return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
	                        }
	                    }
	                }
	            }

	            // Update prev for next iteration
	            prev = current;
	        }
	    }

	    return { state: "success", data: response };
	}
	var oldCallbacks = [],
	    rquestion = /\?/,
	    rjsonp = /(=)\?(?=&|$)|\?\?/,
	    nonce = jQuery.now();

	// Default jsonp settings
	jQuery.ajaxSetup({
	    jsonp: "callback",
	    jsonpCallback: function() {
	        var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
	        this[ callback ] = true;
	        return callback;
	    }
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	    var callbackName, overwritten, responseContainer,
	        data = s.data,
	        url = s.url,
	        hasCallback = s.jsonp !== false,
	        replaceInUrl = hasCallback && rjsonp.test( url ),
	        replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
	            !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
	            rjsonp.test( data );

	    // Handle iff the expected data type is "jsonp" or we have a parameter to set
	    if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

	        // Get callback name, remembering preexisting value associated with it
	        callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
	            s.jsonpCallback() :
	            s.jsonpCallback;
	        overwritten = window[ callbackName ];

	        // Insert callback into url or form data
	        if ( replaceInUrl ) {
	            s.url = url.replace( rjsonp, "$1" + callbackName );
	        } else if ( replaceInData ) {
	            s.data = data.replace( rjsonp, "$1" + callbackName );
	        } else if ( hasCallback ) {
	            s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
	        }

	        // Use data converter to retrieve json after script execution
	        s.converters["script json"] = function() {
	            if ( !responseContainer ) {
	                jQuery.error( callbackName + " was not called" );
	            }
	            return responseContainer[ 0 ];
	        };

	        // force json dataType
	        s.dataTypes[ 0 ] = "json";

	        // Install callback
	        window[ callbackName ] = function() {
	            responseContainer = arguments;
	        };

	        // Clean-up function (fires after converters)
	        jqXHR.always(function() {
	            // Restore preexisting value
	            window[ callbackName ] = overwritten;

	            // Save back as free
	            if ( s[ callbackName ] ) {
	                // make sure that re-using the options doesn't screw things around
	                s.jsonpCallback = originalSettings.jsonpCallback;

	                // save the callback name for future use
	                oldCallbacks.push( callbackName );
	            }

	            // Call if it was a function and we have a response
	            if ( responseContainer && jQuery.isFunction( overwritten ) ) {
	                overwritten( responseContainer[ 0 ] );
	            }

	            responseContainer = overwritten = undefined;
	        });

	        // Delegate to script
	        return "script";
	    }
	});
	// Install script dataType
	jQuery.ajaxSetup({
	    accepts: {
	        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	    },
	    contents: {
	        script: /javascript|ecmascript/
	    },
	    converters: {
	        "text script": function( text ) {
	            jQuery.globalEval( text );
	            return text;
	        }
	    }
	});

	// Handle cache's special case and global
	jQuery.ajaxPrefilter( "script", function( s ) {
	    if ( s.cache === undefined ) {
	        s.cache = false;
	    }
	    if ( s.crossDomain ) {
	        s.type = "GET";
	        s.global = false;
	    }
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function(s) {

	    // This transport only deals with cross domain requests
	    if ( s.crossDomain ) {

	        var script,
	            head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

	        return {

	            send: function( _, callback ) {

	                script = document.createElement( "script" );

	                script.async = "async";

	                if ( s.scriptCharset ) {
	                    script.charset = s.scriptCharset;
	                }

	                script.src = s.url;

	                // Attach handlers for all browsers
	                script.onload = script.onreadystatechange = function( _, isAbort ) {

	                    if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

	                        // Handle memory leak in IE
	                        script.onload = script.onreadystatechange = null;

	                        // Remove the script
	                        if ( head && script.parentNode ) {
	                            head.removeChild( script );
	                        }

	                        // Dereference the script
	                        script = undefined;

	                        // Callback if not abort
	                        if ( !isAbort ) {
	                            callback( 200, "success" );
	                        }
	                    }
	                };
	                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
	                // This arises when a base node is used (#2709 and #4378).
	                head.insertBefore( script, head.firstChild );
	            },

	            abort: function() {
	                if ( script ) {
	                    script.onload( 0, 1 );
	                }
	            }
	        };
	    }
	});
	var xhrCallbacks,
	    // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	    xhrOnUnloadAbort = window.ActiveXObject ? function() {
	        // Abort all pending requests
	        for ( var key in xhrCallbacks ) {
	            xhrCallbacks[ key ]( 0, 1 );
	        }
	    } : false,
	    xhrId = 0;

	// Functions to create xhrs
	function createStandardXHR() {
	    try {
	        return new window.XMLHttpRequest();
	    } catch( e ) {}
	}

	function createActiveXHR() {
	    try {
	        return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	    } catch( e ) {}
	}

	// Create the request object
	// (This is still attached to ajaxSettings for backward compatibility)
	jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	    /* Microsoft failed to properly
	     * implement the XMLHttpRequest in IE7 (can't request local files),
	     * so we use the ActiveXObject when it is available
	     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	     * we need a fallback.
	     */
	    function() {
	        return !this.isLocal && createStandardXHR() || createActiveXHR();
	    } :
	    // For all other browsers, use the standard XMLHttpRequest object
	    createStandardXHR;

	// Determine support properties
	(function( xhr ) {
	    jQuery.extend( jQuery.support, {
	        ajax: !!xhr,
	        cors: !!xhr && ( "withCredentials" in xhr )
	    });
	})( jQuery.ajaxSettings.xhr() );

	// Create transport if the browser can provide an xhr
	if ( jQuery.support.ajax ) {

	    jQuery.ajaxTransport(function( s ) {
	        // Cross domain only allowed if supported through XMLHttpRequest
	        if ( !s.crossDomain || jQuery.support.cors ) {

	            var callback;

	            return {
	                send: function( headers, complete ) {

	                    // Get a new xhr
	                    var handle, i,
	                        xhr = s.xhr();

	                    // Open the socket
	                    // Passing null username, generates a login popup on Opera (#2865)
	                    if ( s.username ) {
	                        xhr.open( s.type, s.url, s.async, s.username, s.password );
	                    } else {
	                        xhr.open( s.type, s.url, s.async );
	                    }

	                    // Apply custom fields if provided
	                    if ( s.xhrFields ) {
	                        for ( i in s.xhrFields ) {
	                            xhr[ i ] = s.xhrFields[ i ];
	                        }
	                    }

	                    // Override mime type if needed
	                    if ( s.mimeType && xhr.overrideMimeType ) {
	                        xhr.overrideMimeType( s.mimeType );
	                    }

	                    // X-Requested-With header
	                    // For cross-domain requests, seeing as conditions for a preflight are
	                    // akin to a jigsaw puzzle, we simply never set it to be sure.
	                    // (it can always be set on a per-request basis or even using ajaxSetup)
	                    // For same-domain requests, won't change header if already provided.
	                    if ( !s.crossDomain && !headers["X-Requested-With"] ) {
	                        headers[ "X-Requested-With" ] = "XMLHttpRequest";
	                    }

	                    // Need an extra try/catch for cross domain requests in Firefox 3
	                    try {
	                        for ( i in headers ) {
	                            xhr.setRequestHeader( i, headers[ i ] );
	                        }
	                    } catch( _ ) {}

	                    // Do send the request
	                    // This may raise an exception which is actually
	                    // handled in jQuery.ajax (so no try/catch here)
	                    xhr.send( ( s.hasContent && s.data ) || null );

	                    // Listener
	                    callback = function( _, isAbort ) {

	                        var status,
	                            statusText,
	                            responseHeaders,
	                            responses,
	                            xml;

	                        // Firefox throws exceptions when accessing properties
	                        // of an xhr when a network error occurred
	                        // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	                        try {

	                            // Was never called and is aborted or complete
	                            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

	                                // Only called once
	                                callback = undefined;

	                                // Do not keep as active anymore
	                                if ( handle ) {
	                                    xhr.onreadystatechange = jQuery.noop;
	                                    if ( xhrOnUnloadAbort ) {
	                                        delete xhrCallbacks[ handle ];
	                                    }
	                                }

	                                // If it's an abort
	                                if ( isAbort ) {
	                                    // Abort it manually if needed
	                                    if ( xhr.readyState !== 4 ) {
	                                        xhr.abort();
	                                    }
	                                } else {
	                                    status = xhr.status;
	                                    responseHeaders = xhr.getAllResponseHeaders();
	                                    responses = {};
	                                    xml = xhr.responseXML;

	                                    // Construct response list
	                                    if ( xml && xml.documentElement /* #4958 */ ) {
	                                        responses.xml = xml;
	                                    }

	                                    // When requesting binary data, IE6-9 will throw an exception
	                                    // on any attempt to access responseText (#11426)
	                                    try {
	                                        responses.text = xhr.responseText;
	                                    } catch( e ) {
	                                    }

	                                    // Firefox throws an exception when accessing
	                                    // statusText for faulty cross-domain requests
	                                    try {
	                                        statusText = xhr.statusText;
	                                    } catch( e ) {
	                                        // We normalize with Webkit giving an empty statusText
	                                        statusText = "";
	                                    }

	                                    // Filter status for non standard behaviors

	                                    // If the request is local and we have data: assume a success
	                                    // (success with no data won't get notified, that's the best we
	                                    // can do given current implementations)
	                                    if ( !status && s.isLocal && !s.crossDomain ) {
	                                        status = responses.text ? 200 : 404;
	                                    // IE - #1450: sometimes returns 1223 when it should be 204
	                                    } else if ( status === 1223 ) {
	                                        status = 204;
	                                    }
	                                }
	                            }
	                        } catch( firefoxAccessException ) {
	                            if ( !isAbort ) {
	                                complete( -1, firefoxAccessException );
	                            }
	                        }

	                        // Call complete if needed
	                        if ( responses ) {
	                            complete( status, statusText, responses, responseHeaders );
	                        }
	                    };

	                    if ( !s.async ) {
	                        // if we're in sync mode we fire the callback
	                        callback();
	                    } else if ( xhr.readyState === 4 ) {
	                        // (IE6 & IE7) if it's in cache and has been
	                        // retrieved directly we need to fire the callback
	                        setTimeout( callback, 0 );
	                    } else {
	                        handle = ++xhrId;
	                        if ( xhrOnUnloadAbort ) {
	                            // Create the active xhrs callbacks list if needed
	                            // and attach the unload handler
	                            if ( !xhrCallbacks ) {
	                                xhrCallbacks = {};
	                                jQuery( window ).unload( xhrOnUnloadAbort );
	                            }
	                            // Add to list of active xhrs callbacks
	                            xhrCallbacks[ handle ] = callback;
	                        }
	                        xhr.onreadystatechange = callback;
	                    }
	                },

	                abort: function() {
	                    if ( callback ) {
	                        callback(0,1);
	                    }
	                }
	            };
	        }
	    });
	}
	var fxNow, timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	    rrun = /queueHooks$/,
	    animationPrefilters = [ defaultPrefilter ],
	    tweeners = {
	        "*": [function( prop, value ) {
	            var end, unit,
	                tween = this.createTween( prop, value ),
	                parts = rfxnum.exec( value ),
	                target = tween.cur(),
	                start = +target || 0,
	                scale = 1,
	                maxIterations = 20;

	            if ( parts ) {
	                end = +parts[2];
	                unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

	                // We need to compute starting value
	                if ( unit !== "px" && start ) {
	                    // Iteratively approximate from a nonzero starting point
	                    // Prefer the current property, because this process will be trivial if it uses the same units
	                    // Fallback to end or a simple constant
	                    start = jQuery.css( tween.elem, prop, true ) || end || 1;

	                    do {
	                        // If previous iteration zeroed out, double until we get *something*
	                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
	                        scale = scale || ".5";

	                        // Adjust and apply
	                        start = start / scale;
	                        jQuery.style( tween.elem, prop, start + unit );

	                    // Update scale, tolerating zero or NaN from tween.cur()
	                    // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
	                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
	                }

	                tween.unit = unit;
	                tween.start = start;
	                // If a +=/-= token was provided, we're doing a relative animation
	                tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
	            }
	            return tween;
	        }]
	    };

	// Animations created synchronously will run synchronously
	function createFxNow() {
	    setTimeout(function() {
	        fxNow = undefined;
	    }, 0 );
	    return ( fxNow = jQuery.now() );
	}

	function createTweens( animation, props ) {
	    jQuery.each( props, function( prop, value ) {
	        var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
	            index = 0,
	            length = collection.length;
	        for ( ; index < length; index++ ) {
	            if ( collection[ index ].call( animation, prop, value ) ) {

	                // we're done with this property
	                return;
	            }
	        }
	    });
	}

	function Animation( elem, properties, options ) {
	    var result,
	        index = 0,
	        tweenerIndex = 0,
	        length = animationPrefilters.length,
	        deferred = jQuery.Deferred().always( function() {
	            // don't match elem in the :animated selector
	            delete tick.elem;
	        }),
	        tick = function() {
	            var currentTime = fxNow || createFxNow(),
	                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
	                temp = remaining / animation.duration || 0,
	                percent = 1 - temp,
	                index = 0,
	                length = animation.tweens.length;

	            for ( ; index < length ; index++ ) {
	                animation.tweens[ index ].run( percent );
	            }

	            deferred.notifyWith( elem, [ animation, percent, remaining ]);

	            if ( percent < 1 && length ) {
	                return remaining;
	            } else {
	                deferred.resolveWith( elem, [ animation ] );
	                return false;
	            }
	        },
	        animation = deferred.promise({
	            elem: elem,
	            props: jQuery.extend( {}, properties ),
	            opts: jQuery.extend( true, { specialEasing: {} }, options ),
	            originalProperties: properties,
	            originalOptions: options,
	            startTime: fxNow || createFxNow(),
	            duration: options.duration,
	            tweens: [],
	            createTween: function( prop, end, easing ) {
	                var tween = jQuery.Tween( elem, animation.opts, prop, end,
	                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
	                animation.tweens.push( tween );
	                return tween;
	            },
	            stop: function( gotoEnd ) {
	                var index = 0,
	                    // if we are going to the end, we want to run all the tweens
	                    // otherwise we skip this part
	                    length = gotoEnd ? animation.tweens.length : 0;

	                for ( ; index < length ; index++ ) {
	                    animation.tweens[ index ].run( 1 );
	                }

	                // resolve when we played the last frame
	                // otherwise, reject
	                if ( gotoEnd ) {
	                    deferred.resolveWith( elem, [ animation, gotoEnd ] );
	                } else {
	                    deferred.rejectWith( elem, [ animation, gotoEnd ] );
	                }
	                return this;
	            }
	        }),
	        props = animation.props;

	    propFilter( props, animation.opts.specialEasing );

	    for ( ; index < length ; index++ ) {
	        result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
	        if ( result ) {
	            return result;
	        }
	    }

	    createTweens( animation, props );

	    if ( jQuery.isFunction( animation.opts.start ) ) {
	        animation.opts.start.call( elem, animation );
	    }

	    jQuery.fx.timer(
	        jQuery.extend( tick, {
	            anim: animation,
	            queue: animation.opts.queue,
	            elem: elem
	        })
	    );

	    // attach callbacks from options
	    return animation.progress( animation.opts.progress )
	        .done( animation.opts.done, animation.opts.complete )
	        .fail( animation.opts.fail )
	        .always( animation.opts.always );
	}

	function propFilter( props, specialEasing ) {
	    var index, name, easing, value, hooks;

	    // camelCase, specialEasing and expand cssHook pass
	    for ( index in props ) {
	        name = jQuery.camelCase( index );
	        easing = specialEasing[ name ];
	        value = props[ index ];
	        if ( jQuery.isArray( value ) ) {
	            easing = value[ 1 ];
	            value = props[ index ] = value[ 0 ];
	        }

	        if ( index !== name ) {
	            props[ name ] = value;
	            delete props[ index ];
	        }

	        hooks = jQuery.cssHooks[ name ];
	        if ( hooks && "expand" in hooks ) {
	            value = hooks.expand( value );
	            delete props[ name ];

	            // not quite $.extend, this wont overwrite keys already present.
	            // also - reusing 'index' from above because we have the correct "name"
	            for ( index in value ) {
	                if ( !( index in props ) ) {
	                    props[ index ] = value[ index ];
	                    specialEasing[ index ] = easing;
	                }
	            }
	        } else {
	            specialEasing[ name ] = easing;
	        }
	    }
	}

	jQuery.Animation = jQuery.extend( Animation, {

	    tweener: function( props, callback ) {
	        if ( jQuery.isFunction( props ) ) {
	            callback = props;
	            props = [ "*" ];
	        } else {
	            props = props.split(" ");
	        }

	        var prop,
	            index = 0,
	            length = props.length;

	        for ( ; index < length ; index++ ) {
	            prop = props[ index ];
	            tweeners[ prop ] = tweeners[ prop ] || [];
	            tweeners[ prop ].unshift( callback );
	        }
	    },

	    prefilter: function( callback, prepend ) {
	        if ( prepend ) {
	            animationPrefilters.unshift( callback );
	        } else {
	            animationPrefilters.push( callback );
	        }
	    }
	});

	function defaultPrefilter( elem, props, opts ) {
	    var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
	        anim = this,
	        style = elem.style,
	        orig = {},
	        handled = [],
	        hidden = elem.nodeType && isHidden( elem );

	    // handle queue: false promises
	    if ( !opts.queue ) {
	        hooks = jQuery._queueHooks( elem, "fx" );
	        if ( hooks.unqueued == null ) {
	            hooks.unqueued = 0;
	            oldfire = hooks.empty.fire;
	            hooks.empty.fire = function() {
	                if ( !hooks.unqueued ) {
	                    oldfire();
	                }
	            };
	        }
	        hooks.unqueued++;

	        anim.always(function() {
	            // doing this makes sure that the complete handler will be called
	            // before this completes
	            anim.always(function() {
	                hooks.unqueued--;
	                if ( !jQuery.queue( elem, "fx" ).length ) {
	                    hooks.empty.fire();
	                }
	            });
	        });
	    }

	    // height/width overflow pass
	    if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	        // Make sure that nothing sneaks out
	        // Record all 3 overflow attributes because IE does not
	        // change the overflow attribute when overflowX and
	        // overflowY are set to the same value
	        opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

	        // Set display property to inline-block for height/width
	        // animations on inline elements that are having width/height animated
	        if ( jQuery.css( elem, "display" ) === "inline" &&
	                jQuery.css( elem, "float" ) === "none" ) {

	            // inline-level elements accept inline-block;
	            // block-level elements need to be inline with layout
	            if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
	                style.display = "inline-block";

	            } else {
	                style.zoom = 1;
	            }
	        }
	    }

	    if ( opts.overflow ) {
	        style.overflow = "hidden";
	        if ( !jQuery.support.shrinkWrapBlocks ) {
	            anim.done(function() {
	                style.overflow = opts.overflow[ 0 ];
	                style.overflowX = opts.overflow[ 1 ];
	                style.overflowY = opts.overflow[ 2 ];
	            });
	        }
	    }


	    // show/hide pass
	    for ( index in props ) {
	        value = props[ index ];
	        if ( rfxtypes.exec( value ) ) {
	            delete props[ index ];
	            toggle = toggle || value === "toggle";
	            if ( value === ( hidden ? "hide" : "show" ) ) {
	                continue;
	            }
	            handled.push( index );
	        }
	    }

	    length = handled.length;
	    if ( length ) {
	        dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
	        if ( "hidden" in dataShow ) {
	            hidden = dataShow.hidden;
	        }

	        // store state if its toggle - enables .stop().toggle() to "reverse"
	        if ( toggle ) {
	            dataShow.hidden = !hidden;
	        }
	        if ( hidden ) {
	            jQuery( elem ).show();
	        } else {
	            anim.done(function() {
	                jQuery( elem ).hide();
	            });
	        }
	        anim.done(function() {
	            var prop;
	            jQuery.removeData( elem, "fxshow", true );
	            for ( prop in orig ) {
	                jQuery.style( elem, prop, orig[ prop ] );
	            }
	        });
	        for ( index = 0 ; index < length ; index++ ) {
	            prop = handled[ index ];
	            tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
	            orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

	            if ( !( prop in dataShow ) ) {
	                dataShow[ prop ] = tween.start;
	                if ( hidden ) {
	                    tween.end = tween.start;
	                    tween.start = prop === "width" || prop === "height" ? 1 : 0;
	                }
	            }
	        }
	    }
	}

	function Tween( elem, options, prop, end, easing ) {
	    return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
	    constructor: Tween,
	    init: function( elem, options, prop, end, easing, unit ) {
	        this.elem = elem;
	        this.prop = prop;
	        this.easing = easing || "swing";
	        this.options = options;
	        this.start = this.now = this.cur();
	        this.end = end;
	        this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	    },
	    cur: function() {
	        var hooks = Tween.propHooks[ this.prop ];

	        return hooks && hooks.get ?
	            hooks.get( this ) :
	            Tween.propHooks._default.get( this );
	    },
	    run: function( percent ) {
	        var eased,
	            hooks = Tween.propHooks[ this.prop ];

	        if ( this.options.duration ) {
	            this.pos = eased = jQuery.easing[ this.easing ](
	                percent, this.options.duration * percent, 0, 1, this.options.duration
	            );
	        } else {
	            this.pos = eased = percent;
	        }
	        this.now = ( this.end - this.start ) * eased + this.start;

	        if ( this.options.step ) {
	            this.options.step.call( this.elem, this.now, this );
	        }

	        if ( hooks && hooks.set ) {
	            hooks.set( this );
	        } else {
	            Tween.propHooks._default.set( this );
	        }
	        return this;
	    }
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
	    _default: {
	        get: function( tween ) {
	            var result;

	            if ( tween.elem[ tween.prop ] != null &&
	                (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
	                return tween.elem[ tween.prop ];
	            }

	            // passing any value as a 4th parameter to .css will automatically
	            // attempt a parseFloat and fallback to a string if the parse fails
	            // so, simple values such as "10px" are parsed to Float.
	            // complex values such as "rotate(1rad)" are returned as is.
	            result = jQuery.css( tween.elem, tween.prop, false, "" );
	            // Empty strings, null, undefined and "auto" are converted to 0.
	            return !result || result === "auto" ? 0 : result;
	        },
	        set: function( tween ) {
	            // use step hook for back compat - use cssHook if its there - use .style if its
	            // available and use plain properties where available
	            if ( jQuery.fx.step[ tween.prop ] ) {
	                jQuery.fx.step[ tween.prop ]( tween );
	            } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
	                jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
	            } else {
	                tween.elem[ tween.prop ] = tween.now;
	            }
	        }
	    }
	};

	// Remove in 2.0 - this supports IE8's panic based approach
	// to setting things on disconnected nodes

	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	    set: function( tween ) {
	        if ( tween.elem.nodeType && tween.elem.parentNode ) {
	            tween.elem[ tween.prop ] = tween.now;
	        }
	    }
	};

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	    var cssFn = jQuery.fn[ name ];
	    jQuery.fn[ name ] = function( speed, easing, callback ) {
	        return speed == null || typeof speed === "boolean" ||
	            // special check for .toggle( handler, handler, ... )
	            ( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
	            cssFn.apply( this, arguments ) :
	            this.animate( genFx( name, true ), speed, easing, callback );
	    };
	});

	jQuery.fn.extend({
	    fadeTo: function( speed, to, easing, callback ) {

	        // show any hidden elements after setting opacity to 0
	        return this.filter( isHidden ).css( "opacity", 0 ).show()

	            // animate to the value specified
	            .end().animate({ opacity: to }, speed, easing, callback );
	    },
	    animate: function( prop, speed, easing, callback ) {
	        var empty = jQuery.isEmptyObject( prop ),
	            optall = jQuery.speed( speed, easing, callback ),
	            doAnimation = function() {
	                // Operate on a copy of prop so per-property easing won't be lost
	                var anim = Animation( this, jQuery.extend( {}, prop ), optall );

	                // Empty animations resolve immediately
	                if ( empty ) {
	                    anim.stop( true );
	                }
	            };

	        return empty || optall.queue === false ?
	            this.each( doAnimation ) :
	            this.queue( optall.queue, doAnimation );
	    },
	    stop: function( type, clearQueue, gotoEnd ) {
	        var stopQueue = function( hooks ) {
	            var stop = hooks.stop;
	            delete hooks.stop;
	            stop( gotoEnd );
	        };

	        if ( typeof type !== "string" ) {
	            gotoEnd = clearQueue;
	            clearQueue = type;
	            type = undefined;
	        }
	        if ( clearQueue && type !== false ) {
	            this.queue( type || "fx", [] );
	        }

	        return this.each(function() {
	            var dequeue = true,
	                index = type != null && type + "queueHooks",
	                timers = jQuery.timers,
	                data = jQuery._data( this );

	            if ( index ) {
	                if ( data[ index ] && data[ index ].stop ) {
	                    stopQueue( data[ index ] );
	                }
	            } else {
	                for ( index in data ) {
	                    if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
	                        stopQueue( data[ index ] );
	                    }
	                }
	            }

	            for ( index = timers.length; index--; ) {
	                if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
	                    timers[ index ].anim.stop( gotoEnd );
	                    dequeue = false;
	                    timers.splice( index, 1 );
	                }
	            }

	            // start the next in the queue if the last step wasn't forced
	            // timers currently will call their complete callbacks, which will dequeue
	            // but only if they were gotoEnd
	            if ( dequeue || !gotoEnd ) {
	                jQuery.dequeue( this, type );
	            }
	        });
	    }
	});

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
	    var which,
	        attrs = { height: type },
	        i = 0;

	    // if we include width, step value is 1 to do all cssExpand values,
	    // if we don't include width, step value is 2 to skip over Left and Right
	    includeWidth = includeWidth? 1 : 0;
	    for( ; i < 4 ; i += 2 - includeWidth ) {
	        which = cssExpand[ i ];
	        attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	    }

	    if ( includeWidth ) {
	        attrs.opacity = attrs.width = type;
	    }

	    return attrs;
	}

	// Generate shortcuts for custom animations
	jQuery.each({
	    slideDown: genFx("show"),
	    slideUp: genFx("hide"),
	    slideToggle: genFx("toggle"),
	    fadeIn: { opacity: "show" },
	    fadeOut: { opacity: "hide" },
	    fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
	    jQuery.fn[ name ] = function( speed, easing, callback ) {
	        return this.animate( props, speed, easing, callback );
	    };
	});

	jQuery.speed = function( speed, easing, fn ) {
	    var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
	        complete: fn || !fn && easing ||
	            jQuery.isFunction( speed ) && speed,
	        duration: speed,
	        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	    };

	    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
	        opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	    // normalize opt.queue - true/undefined/null -> "fx"
	    if ( opt.queue == null || opt.queue === true ) {
	        opt.queue = "fx";
	    }

	    // Queueing
	    opt.old = opt.complete;

	    opt.complete = function() {
	        if ( jQuery.isFunction( opt.old ) ) {
	            opt.old.call( this );
	        }

	        if ( opt.queue ) {
	            jQuery.dequeue( this, opt.queue );
	        }
	    };

	    return opt;
	};

	jQuery.easing = {
	    linear: function( p ) {
	        return p;
	    },
	    swing: function( p ) {
	        return 0.5 - Math.cos( p*Math.PI ) / 2;
	    }
	};

	jQuery.timers = [];
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.tick = function() {
	    var timer,
	        timers = jQuery.timers,
	        i = 0;

	    fxNow = jQuery.now();

	    for ( ; i < timers.length; i++ ) {
	        timer = timers[ i ];
	        // Checks the timer has not already been removed
	        if ( !timer() && timers[ i ] === timer ) {
	            timers.splice( i--, 1 );
	        }
	    }

	    if ( !timers.length ) {
	        jQuery.fx.stop();
	    }
	    fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
	    if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
	        timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	    }
	};

	jQuery.fx.interval = 13;

	jQuery.fx.stop = function() {
	    clearInterval( timerId );
	    timerId = null;
	};

	jQuery.fx.speeds = {
	    slow: 600,
	    fast: 200,
	    // Default speed
	    _default: 400
	};

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	if ( jQuery.expr && jQuery.expr.filters ) {
	    jQuery.expr.filters.animated = function( elem ) {
	        return jQuery.grep(jQuery.timers, function( fn ) {
	            return elem === fn.elem;
	        }).length;
	    };
	}
	var rroot = /^(?:body|html)$/i;

	jQuery.fn.offset = function( options ) {
	    if ( arguments.length ) {
	        return options === undefined ?
	            this :
	            this.each(function( i ) {
	                jQuery.offset.setOffset( this, options, i );
	            });
	    }

	    var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
	        box = { top: 0, left: 0 },
	        elem = this[ 0 ],
	        doc = elem && elem.ownerDocument;

	    if ( !doc ) {
	        return;
	    }

	    if ( (body = doc.body) === elem ) {
	        return jQuery.offset.bodyOffset( elem );
	    }

	    docElem = doc.documentElement;

	    // Make sure it's not a disconnected DOM node
	    if ( !jQuery.contains( docElem, elem ) ) {
	        return box;
	    }

	    // If we don't have gBCR, just use 0,0 rather than error
	    // BlackBerry 5, iOS 3 (original iPhone)
	    if ( typeof elem.getBoundingClientRect !== "undefined" ) {
	        box = elem.getBoundingClientRect();
	    }
	    win = getWindow( doc );
	    clientTop  = docElem.clientTop  || body.clientTop  || 0;
	    clientLeft = docElem.clientLeft || body.clientLeft || 0;
	    scrollTop  = win.pageYOffset || docElem.scrollTop;
	    scrollLeft = win.pageXOffset || docElem.scrollLeft;
	    return {
	        top: box.top  + scrollTop  - clientTop,
	        left: box.left + scrollLeft - clientLeft
	    };
	};

	jQuery.offset = {

	    bodyOffset: function( body ) {
	        var top = body.offsetTop,
	            left = body.offsetLeft;

	        if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
	            top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
	            left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
	        }

	        return { top: top, left: left };
	    },

	    setOffset: function( elem, options, i ) {
	        var position = jQuery.css( elem, "position" );

	        // set position first, in-case top/left are set even on static elem
	        if ( position === "static" ) {
	            elem.style.position = "relative";
	        }

	        var curElem = jQuery( elem ),
	            curOffset = curElem.offset(),
	            curCSSTop = jQuery.css( elem, "top" ),
	            curCSSLeft = jQuery.css( elem, "left" ),
	            calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
	            props = {}, curPosition = {}, curTop, curLeft;

	        // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
	        if ( calculatePosition ) {
	            curPosition = curElem.position();
	            curTop = curPosition.top;
	            curLeft = curPosition.left;
	        } else {
	            curTop = parseFloat( curCSSTop ) || 0;
	            curLeft = parseFloat( curCSSLeft ) || 0;
	        }

	        if ( jQuery.isFunction( options ) ) {
	            options = options.call( elem, i, curOffset );
	        }

	        if ( options.top != null ) {
	            props.top = ( options.top - curOffset.top ) + curTop;
	        }
	        if ( options.left != null ) {
	            props.left = ( options.left - curOffset.left ) + curLeft;
	        }

	        if ( "using" in options ) {
	            options.using.call( elem, props );
	        } else {
	            curElem.css( props );
	        }
	    }
	};


	jQuery.fn.extend({

	    position: function() {
	        if ( !this[0] ) {
	            return;
	        }

	        var elem = this[0],

	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),

	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

	        // Subtract element margins
	        // note: when an element has margin: auto the offsetLeft and marginLeft
	        // are the same in Safari causing offset.left to incorrectly be 0
	        offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
	        offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

	        // Add offsetParent borders
	        parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
	        parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

	        // Subtract the two offsets
	        return {
	            top:  offset.top  - parentOffset.top,
	            left: offset.left - parentOffset.left
	        };
	    },

	    offsetParent: function() {
	        return this.map(function() {
	            var offsetParent = this.offsetParent || document.body;
	            while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
	                offsetParent = offsetParent.offsetParent;
	            }
	            return offsetParent || document.body;
	        });
	    }
	});


	// Create scrollLeft and scrollTop methods
	jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	    var top = /Y/.test( prop );

	    jQuery.fn[ method ] = function( val ) {
	        return jQuery.access( this, function( elem, method, val ) {
	            var win = getWindow( elem );

	            if ( val === undefined ) {
	                return win ? (prop in win) ? win[ prop ] :
	                    win.document.documentElement[ method ] :
	                    elem[ method ];
	            }

	            if ( win ) {
	                win.scrollTo(
	                    !top ? val : jQuery( win ).scrollLeft(),
	                     top ? val : jQuery( win ).scrollTop()
	                );

	            } else {
	                elem[ method ] = val;
	            }
	        }, method, val, arguments.length, null );
	    };
	});

	function getWindow( elem ) {
	    return jQuery.isWindow( elem ) ?
	        elem :
	        elem.nodeType === 9 ?
	            elem.defaultView || elem.parentWindow :
	            false;
	}
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	    jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
	        // margin is only for outerHeight, outerWidth
	        jQuery.fn[ funcName ] = function( margin, value ) {
	            var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
	                extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

	            return jQuery.access( this, function( elem, type, value ) {
	                var doc;

	                if ( jQuery.isWindow( elem ) ) {
	                    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
	                    // isn't a whole lot we can do. See pull request at this URL for discussion:
	                    // https://github.com/jquery/jquery/pull/764
	                    return elem.document.documentElement[ "client" + name ];
	                }

	                // Get document width or height
	                if ( elem.nodeType === 9 ) {
	                    doc = elem.documentElement;

	                    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
	                    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
	                    return Math.max(
	                        elem.body[ "scroll" + name ], doc[ "scroll" + name ],
	                        elem.body[ "offset" + name ], doc[ "offset" + name ],
	                        doc[ "client" + name ]
	                    );
	                }

	                return value === undefined ?
	                    // Get width or height on the element, requesting but not forcing parseFloat
	                    jQuery.css( elem, type, value, extra ) :

	                    // Set width or height on the element
	                    jQuery.style( elem, type, value, extra );
	            }, type, chainable ? margin : undefined, chainable, null );
	        };
	    });
	});
	// Expose jQuery to the global object
	window.jQuery = window.$ = jQuery;

	// Expose jQuery as an AMD module, but only for AMD loaders that
	// understand the issues with loading multiple versions of jQuery
	// in a page that all might call define(). The loader will indicate
	// they have special allowances for multiple jQuery versions by
	// specifying define.amd.jQuery = true. Register as a named module,
	// since jQuery can be concatenated with other files that may use define,
	// but not use a proper concatenation script that understands anonymous
	// AMD modules. A named AMD is safest and most robust way to register.
	// Lowercase jquery is used because AMD module names are derived from
	// file names, and jQuery is normally delivered in a lowercase file name.
	// Do this after creating the global so that if an AMD module wants to call
	// noConflict to hide this version of jQuery, it will work.
	if ( "function" === "function" && __webpack_require__(5) && __webpack_require__(5).jQuery ) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return jQuery; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	})( window );


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*
	    ********** Juicer **********
	    ${A Fast template engine}
	    Project Home: http://juicer.name

	    Author: Guokai
	    Gtalk: badkaikai@gmail.com
	    Blog: http://benben.cc
	    Licence: MIT License
	    Version: 0.6.4-stable
	*/

	(function() {

	    // This is the main function for not only compiling but also rendering.
	    // there's at least two parameters need to be provided, one is the tpl, 
	    // another is the data, the tpl can either be a string, or an id like #id.
	    // if only tpl was given, it'll return the compiled reusable function.
	    // if tpl and data were given at the same time, it'll return the rendered 
	    // result immediately.

	    var juicer = function() {
	        var args = [].slice.call(arguments);

	        args.push(juicer.options);

	        if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
	            args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
	                var _document = document;
	                var elem = _document && _document.getElementById($id);
	                args[0] = elem ? (elem.value || elem.innerHTML) : $;
	            });
	        }
	        
	        if(arguments.length == 1) {
	            return juicer.compile.apply(juicer, args);
	        }
	        
	        if(arguments.length >= 2) {
	            return juicer.to_html.apply(juicer, args);
	        }
	    };

	    var __escapehtml = {
	        escapehash: {
	            '<': '&lt;',
	            '>': '&gt;',
	            '&': '&amp;',
	            '"': '&quot;',
	            "'": '&#x27;',
	            '/': '&#x2f;'
	        },
	        escapereplace: function(k) {
	            return __escapehtml.escapehash[k];
	        },
	        escaping: function(str) {
	            return typeof(str) !== 'string' ? str : str.replace(/[&<>"]/igm, this.escapereplace);
	        },
	        detection: function(data) {
	            return typeof(data) === 'undefined' ? '' : data;
	        }
	    };
	    
	    var __throw = function(error) {
	        if(typeof(console) !== 'undefined') {
	            if(console.warn) {
	                console.warn(error);
	                return;
	            }

	            if(console.log) {
	                console.log(error);
	                return;
	            }
	        }
	        
	        throw(error);
	    };

	    var __creator = function(o, proto) {
	        o = o !== Object(o) ? {} : o;

	        if(o.__proto__) {
	            o.__proto__ = proto;
	            return o;
	        }

	        var empty = function() {};
	        var n = Object.create ? 
	            Object.create(proto) : 
	            new(empty.prototype = proto, empty);

	        for(var i in o) {
	            if(o.hasOwnProperty(i)) {
	                n[i] = o[i];
	            }
	        }

	        return n;
	    };

	    juicer.__cache = {};
	    juicer.version = '0.6.4-stable';
	    juicer.settings = {};

	    juicer.tags = {
	        operationOpen: '{@',
	        operationClose: '}',
	        interpolateOpen: '\\${',
	        interpolateClose: '}',
	        noneencodeOpen: '\\$\\${',
	        noneencodeClose: '}',
	        commentOpen: '\\{#',
	        commentClose: '\\}'
	    };

	    juicer.options = {
	        cache: true,
	        strip: true,
	        errorhandling: true,
	        detection: true,
	        _method: __creator({
	            __escapehtml: __escapehtml,
	            __throw: __throw,
	            __juicer: juicer
	        }, {})
	    };

	    juicer.tagInit = function() {
	        var forstart = juicer.tags.operationOpen + 'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' + juicer.tags.operationClose;
	        var forend = juicer.tags.operationOpen + '\\/each' + juicer.tags.operationClose;
	        var ifstart = juicer.tags.operationOpen + 'if\\s*([^}]*?)' + juicer.tags.operationClose;
	        var ifend = juicer.tags.operationOpen + '\\/if' + juicer.tags.operationClose;
	        var elsestart = juicer.tags.operationOpen + 'else' + juicer.tags.operationClose;
	        var elseifstart = juicer.tags.operationOpen + 'else if\\s*([^}]*?)' + juicer.tags.operationClose;
	        var interpolate = juicer.tags.interpolateOpen + '([\\s\\S]+?)' + juicer.tags.interpolateClose;
	        var noneencode = juicer.tags.noneencodeOpen + '([\\s\\S]+?)' + juicer.tags.noneencodeClose;
	        var inlinecomment = juicer.tags.commentOpen + '[^}]*?' + juicer.tags.commentClose;
	        var rangestart = juicer.tags.operationOpen + 'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' + juicer.tags.operationClose;
	        var include = juicer.tags.operationOpen + 'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' + juicer.tags.operationClose;

	        juicer.settings.forstart = new RegExp(forstart, 'igm');
	        juicer.settings.forend = new RegExp(forend, 'igm');
	        juicer.settings.ifstart = new RegExp(ifstart, 'igm');
	        juicer.settings.ifend = new RegExp(ifend, 'igm');
	        juicer.settings.elsestart = new RegExp(elsestart, 'igm');
	        juicer.settings.elseifstart = new RegExp(elseifstart, 'igm');
	        juicer.settings.interpolate = new RegExp(interpolate, 'igm');
	        juicer.settings.noneencode = new RegExp(noneencode, 'igm');
	        juicer.settings.inlinecomment = new RegExp(inlinecomment, 'igm');
	        juicer.settings.rangestart = new RegExp(rangestart, 'igm');
	        juicer.settings.include = new RegExp(include, 'igm');
	    };

	    juicer.tagInit();

	    // Using this method to set the options by given conf-name and conf-value,
	    // you can also provide more than one key-value pair wrapped by an object.
	    // this interface also used to custom the template tag delimater, for this
	    // situation, the conf-name must begin with tag::, for example: juicer.set
	    // ('tag::operationOpen', '{@').

	    juicer.set = function(conf, value) {
	        var that = this;

	        var escapePattern = function(v) {
	            return v.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function($) {
	                return '\\' + $;
	            });
	        };

	        var set = function(conf, value) {
	            var tag = conf.match(/^tag::(.*)$/i);

	            if(tag) {
	                that.tags[tag[1]] = escapePattern(value);
	                that.tagInit();
	                return;
	            }

	            that.options[conf] = value;
	        };

	        if(arguments.length === 2) {
	            set(conf, value);
	            return;
	        }
	        
	        if(conf === Object(conf)) {
	            for(var i in conf) {
	                if(conf.hasOwnProperty(i)) {
	                    set(i, conf[i]);
	                }
	            }
	        }
	    };

	    // Before you're using custom functions in your template like ${name | fnName},
	    // you need to register this fn by juicer.register('fnName', fn).

	    juicer.register = function(fname, fn) {
	        var _method = this.options._method;

	        if(_method.hasOwnProperty(fname)) {
	            return false;
	        }

	        return _method[fname] = fn;
	    };

	    // remove the registered function in the memory by the provided function name.
	    // for example: juicer.unregister('fnName').

	    juicer.unregister = function(fname) {
	        var _method = this.options._method;

	        if(_method.hasOwnProperty(fname)) {
	            return delete _method[fname];
	        }
	    };

	    juicer.template = function(options) {
	        var that = this;

	        this.options = options;

	        this.__interpolate = function(_name, _escape, options) {
	            var _define = _name.split('|'), _fn = _define[0] || '', _cluster;

	            if(_define.length > 1) {
	                _name = _define.shift();
	                _cluster = _define.shift().split(',');
	                _fn = '_method.' + _cluster.shift() + '.call({}, ' + [_name].concat(_cluster) + ')';
	            }

	            return '<%= ' + (_escape ? '_method.__escapehtml.escaping' : '') + '(' +
	                        (!options || options.detection !== false ? '_method.__escapehtml.detection' : '') + '(' +
	                            _fn +
	                        ')' +
	                    ')' +
	                ' %>';
	        };

	        this.__removeShell = function(tpl, options) {
	            var _counter = 0;
	            
	            tpl = tpl
	                // for expression
	                .replace(juicer.settings.forstart, function($, _name, alias, key) {
	                    var alias = alias || 'value', key = key && key.substr(1);
	                    var _iterate = 'i' + _counter++;
	                    return '<% ~function() {' +
	                                'for(var ' + _iterate + ' in ' + _name + ') {' +
	                                    'if(' + _name + '.hasOwnProperty(' + _iterate + ')) {' +
	                                        'var ' + alias + '=' + _name + '[' + _iterate + '];' +
	                                        (key ? ('var ' + key + '=' + _iterate + ';') : '') +
	                            ' %>';
	                })
	                .replace(juicer.settings.forend, '<% }}}(); %>')

	                // if expression
	                .replace(juicer.settings.ifstart, function($, condition) {
	                    return '<% if(' + condition + ') { %>';
	                })
	                .replace(juicer.settings.ifend, '<% } %>')

	                // else expression
	                .replace(juicer.settings.elsestart, function($) {
	                    return '<% } else { %>';
	                })

	                // else if expression
	                .replace(juicer.settings.elseifstart, function($, condition) {
	                    return '<% } else if(' + condition + ') { %>';
	                })

	                // interpolate without escape
	                .replace(juicer.settings.noneencode, function($, _name) {
	                    return that.__interpolate(_name, false, options);
	                })

	                // interpolate with escape
	                .replace(juicer.settings.interpolate, function($, _name) {
	                    return that.__interpolate(_name, true, options);
	                })

	                // clean up comments
	                .replace(juicer.settings.inlinecomment, '')

	                // range expression
	                .replace(juicer.settings.rangestart, function($, _name, start, end) {
	                    var _iterate = 'j' + _counter++;
	                    return '<% ~function() {' +
	                                'for(var ' + _iterate + '=' + start + ';' + _iterate + '<' + end + ';' + _iterate + '++) {{' +
	                                    'var ' + _name + '=' + _iterate + ';' +
	                            ' %>';
	                })

	                // include sub-template
	                .replace(juicer.settings.include, function($, tpl, data) {
	                    return '<%= _method.__juicer(' + tpl + ', ' + data + '); %>';
	                });

	            // exception handling
	            if(!options || options.errorhandling !== false) {
	                tpl = '<% try { %>' + tpl;
	                tpl += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
	            }

	            return tpl;
	        };

	        this.__toNative = function(tpl, options) {
	            return this.__convert(tpl, !options || options.strip);
	        };

	        this.__lexicalAnalyze = function(tpl) {
	            var buffer = [];
	            var method = [];
	            var prefix = '';
	            var reserved = [
	                'if', 'each', '_', '_method', 'console', 
	                'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 
	                'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 
	                'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'null', 'typeof', 
	                'class', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 
	                'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'const', 'arguments', 
	                'true', 'false', 'undefined', 'NaN'
	            ];

	            var indexOf = function(array, item) {
	                if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf) {
	                    return array.indexOf(item);
	                }
	                
	                for(var i=0; i < array.length; i++) {
	                    if(array[i] === item) return i;
	                }
	                
	                return -1;
	            };

	            var variableAnalyze = function($, statement) {
	                statement = statement.match(/\w+/igm)[0];
	                
	                if(indexOf(buffer, statement) === -1 && indexOf(reserved, statement) === -1 && indexOf(method, statement) === -1) {
	                    
	                    // avoid re-declare native function, if not do this, template 
	                    // `{@if encodeURIComponent(name)}` could be throw undefined.
	                    
	                    if(typeof(window) !== 'undefined' && typeof(window[statement]) === 'function' && window[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
	                        return $;
	                    }

	                    // compatible for node.js
	                    if(typeof(global) !== 'undefined' && typeof(global[statement]) === 'function' && global[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
	                        return $;
	                    }

	                    // avoid re-declare registered function, if not do this, template 
	                    // `{@if registered_func(name)}` could be throw undefined.

	                    if(typeof(juicer.options._method[statement]) === 'function') {
	                        method.push(statement);
	                        return $;
	                    }

	                    buffer.push(statement); // fuck ie
	                }

	                return $;
	            };

	            tpl.replace(juicer.settings.forstart, variableAnalyze).
	                replace(juicer.settings.interpolate, variableAnalyze).
	                replace(juicer.settings.ifstart, variableAnalyze).
	                replace(juicer.settings.elseifstart, variableAnalyze).
	                replace(juicer.settings.include, variableAnalyze).
	                replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)]\s*([A-Za-z_]+)/igm, variableAnalyze);

	            for(var i = 0;i < buffer.length; i++) {
	                prefix += 'var ' + buffer[i] + '=_.' + buffer[i] + ';';
	            }

	            for(var i = 0;i < method.length; i++) {
	                prefix += 'var ' + method[i] + '=_method.' + method[i] + ';';
	            }

	            return '<% ' + prefix + ' %>';
	        };
	        
	        this.__convert=function(tpl, strip) {
	            var buffer = [].join('');

	            buffer += "'use strict';"; // use strict mode
	            buffer += "var _=_||{};";
	            buffer += "var _out='';_out+='";

	            if(strip !== false) {
	                buffer += tpl
	                    .replace(/\\/g, "\\\\")
	                    .replace(/[\r\t\n]/g, " ")
	                    .replace(/'(?=[^%]*%>)/g, "\t")
	                    .split("'").join("\\'")
	                    .split("\t").join("'")
	                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
	                    .split("<%").join("';")
	                    .split("%>").join("_out+='")+
	                    "';return _out;";

	                return buffer;
	            }

	            buffer += tpl
	                    .replace(/\\/g, "\\\\")
	                    .replace(/[\r]/g, "\\r")
	                    .replace(/[\t]/g, "\\t")
	                    .replace(/[\n]/g, "\\n")
	                    .replace(/'(?=[^%]*%>)/g, "\t")
	                    .split("'").join("\\'")
	                    .split("\t").join("'")
	                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
	                    .split("<%").join("';")
	                    .split("%>").join("_out+='")+
	                    "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";
	                    
	            return buffer;
	        };

	        this.parse = function(tpl, options) {
	            var _that = this;

	            if(!options || options.loose !== false) {
	                tpl = this.__lexicalAnalyze(tpl) + tpl;
	            }
	            
	            tpl = this.__removeShell(tpl, options);
	            tpl = this.__toNative(tpl, options);

	            this._render = new Function('_, _method', tpl);

	            this.render = function(_, _method) {
	                if(!_method || _method !== that.options._method) {
	                    _method = __creator(_method, that.options._method);
	                }

	                return _that._render.call(this, _, _method);
	            };

	            return this;
	        };
	    };

	    juicer.compile = function(tpl, options) {
	        if(!options || options !== this.options) {
	            options = __creator(options, this.options);
	        }

	        try {
	            var engine = this.__cache[tpl] ? 
	                this.__cache[tpl] : 
	                new this.template(this.options).parse(tpl, options);
	            
	            if(!options || options.cache !== false) {
	                this.__cache[tpl] = engine;
	            }
	            
	            return engine;

	        } catch(e) {
	            __throw('Juicer Compile Exception: ' + e.message);
	            
	            return {
	                render: function() {} // noop
	            };
	        }
	    };

	    juicer.to_html = function(tpl, data, options) {
	        if(!options || options !== this.options) {
	            options = __creator(options, this.options);
	        }

	        return this.compile(tpl, options).render(data, options._method);
	    };

	    typeof(module) !== 'undefined' && module.exports ? module.exports = juicer : this.juicer = juicer;
	    "function" == 'function' && !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return juicer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modern -o ./dist/lodash.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre ES5 environments */
	  var undefined;

	  /** Used to pool arrays and objects used internally */
	  var arrayPool = [],
	      objectPool = [];

	  /** Used to generate unique IDs */
	  var idCounter = 0;

	  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
	  var keyPrefix = +new Date + '';

	  /** Used as the size when optimizations are enabled for large arrays */
	  var largeArraySize = 75;

	  /** Used as the max size of the `arrayPool` and `objectPool` */
	  var maxPoolSize = 40;

	  /** Used to detect and test whitespace */
	  var whitespace = (
	    // whitespace
	    ' \t\x0B\f\xA0\ufeff' +

	    // line terminators
	    '\n\r\u2028\u2029' +

	    // unicode category "Zs" space separators
	    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
	  );

	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;

	  /** Used to detected named functions */
	  var reFuncName = /^\s*function[ \n\r\t]+\w/;

	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;

	  /** Used to match leading whitespace and zeros to be removed */
	  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;

	  /** Used to detect functions containing a `this` reference */
	  var reThis = /\bthis\b/;

	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

	  /** Used to assign default `context` object properties */
	  var contextProps = [
	    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
	    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
	    'parseInt', 'setTimeout'
	  ];

	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;

	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';

	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

	  /** Used as an internal `_.debounce` options object */
	  var debounceOptions = {
	    'leading': false,
	    'maxWait': 0,
	    'trailing': false
	  };

	  /** Used as the property descriptor for `__bindData__` */
	  var descriptor = {
	    'configurable': false,
	    'enumerable': false,
	    'value': null,
	    'writable': false
	  };

	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };

	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;

	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect the popular CommonJS extension `module.exports` */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = objectTypes[typeof global] && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The base implementation of `_.indexOf` without support for binary searches
	   * or `fromIndex` constraints.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value or `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    var index = (fromIndex || 0) - 1,
	        length = array ? array.length : 0;

	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * An implementation of `_.contains` for cache objects that mimics the return
	   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
	   *
	   * @private
	   * @param {Object} cache The cache object to inspect.
	   * @param {*} value The value to search for.
	   * @returns {number} Returns `0` if `value` is found, else `-1`.
	   */
	  function cacheIndexOf(cache, value) {
	    var type = typeof value;
	    cache = cache.cache;

	    if (type == 'boolean' || value == null) {
	      return cache[value] ? 0 : -1;
	    }
	    if (type != 'number' && type != 'string') {
	      type = 'object';
	    }
	    var key = type == 'number' ? value : keyPrefix + value;
	    cache = (cache = cache[type]) && cache[key];

	    return type == 'object'
	      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
	      : (cache ? 0 : -1);
	  }

	  /**
	   * Adds a given value to the corresponding cache object.
	   *
	   * @private
	   * @param {*} value The value to add to the cache.
	   */
	  function cachePush(value) {
	    var cache = this.cache,
	        type = typeof value;

	    if (type == 'boolean' || value == null) {
	      cache[value] = true;
	    } else {
	      if (type != 'number' && type != 'string') {
	        type = 'object';
	      }
	      var key = type == 'number' ? value : keyPrefix + value,
	          typeCache = cache[type] || (cache[type] = {});

	      if (type == 'object') {
	        (typeCache[key] || (typeCache[key] = [])).push(value);
	      } else {
	        typeCache[key] = true;
	      }
	    }
	  }

	  /**
	   * Used by `_.max` and `_.min` as the default callback when a given
	   * collection is a string value.
	   *
	   * @private
	   * @param {string} value The character to inspect.
	   * @returns {number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }

	  /**
	   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ac = a.criteria,
	        bc = b.criteria,
	        index = -1,
	        length = ac.length;

	    while (++index < length) {
	      var value = ac[index],
	          other = bc[index];

	      if (value !== other) {
	        if (value > other || typeof value == 'undefined') {
	          return 1;
	        }
	        if (value < other || typeof other == 'undefined') {
	          return -1;
	        }
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to return the same value for
	    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See http://code.google.com/p/v8/issues/detail?id=90
	    return a.index - b.index;
	  }

	  /**
	   * Creates a cache object to optimize linear searches of large arrays.
	   *
	   * @private
	   * @param {Array} [array=[]] The array to search.
	   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
	   */
	  function createCache(array) {
	    var index = -1,
	        length = array.length,
	        first = array[0],
	        mid = array[(length / 2) | 0],
	        last = array[length - 1];

	    if (first && typeof first == 'object' &&
	        mid && typeof mid == 'object' && last && typeof last == 'object') {
	      return false;
	    }
	    var cache = getObject();
	    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

	    var result = getObject();
	    result.array = array;
	    result.cache = cache;
	    result.push = cachePush;

	    while (++index < length) {
	      result.push(array[index]);
	    }
	    return result;
	  }

	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {string} match The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }

	  /**
	   * Gets an array from the array pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Array} The array from the pool.
	   */
	  function getArray() {
	    return arrayPool.pop() || [];
	  }

	  /**
	   * Gets an object from the object pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Object} The object from the pool.
	   */
	  function getObject() {
	    return objectPool.pop() || {
	      'array': null,
	      'cache': null,
	      'criteria': null,
	      'false': false,
	      'index': 0,
	      'null': false,
	      'number': null,
	      'object': null,
	      'push': null,
	      'string': null,
	      'true': false,
	      'undefined': false,
	      'value': null
	    };
	  }

	  /**
	   * Releases the given array back to the array pool.
	   *
	   * @private
	   * @param {Array} [array] The array to release.
	   */
	  function releaseArray(array) {
	    array.length = 0;
	    if (arrayPool.length < maxPoolSize) {
	      arrayPool.push(array);
	    }
	  }

	  /**
	   * Releases the given object back to the object pool.
	   *
	   * @private
	   * @param {Object} [object] The object to release.
	   */
	  function releaseObject(object) {
	    var cache = object.cache;
	    if (cache) {
	      releaseObject(cache);
	    }
	    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
	    if (objectPool.length < maxPoolSize) {
	      objectPool.push(object);
	    }
	  }

	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used instead of `Array#slice` to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to slice.
	   * @param {number} start The start index.
	   * @param {number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);

	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new `lodash` function using the given context object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns the `lodash` function.
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

	    /** Native constructor references */
	    var Array = context.Array,
	        Boolean = context.Boolean,
	        Date = context.Date,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;

	    /**
	     * Used for `Array` method references.
	     *
	     * Normally `Array.prototype` would suffice, however, using an array literal
	     * avoids issues in Narwhal.
	     */
	    var arrayRef = [];

	    /** Used for native method references */
	    var objectProto = Object.prototype;

	    /** Used to restore the original `_` reference in `noConflict` */
	    var oldDash = context._;

	    /** Used to resolve the internal [[Class]] of values */
	    var toString = objectProto.toString;

	    /** Used to detect if a method is native */
	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );

	    /** Native method shortcuts */
	    var ceil = Math.ceil,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        fnToString = Function.prototype.toString,
	        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	        hasOwnProperty = objectProto.hasOwnProperty,
	        push = arrayRef.push,
	        setTimeout = context.setTimeout,
	        splice = arrayRef.splice,
	        unshift = arrayRef.unshift;

	    /** Used to set meta data on functions */
	    var defineProperty = (function() {
	      // IE 8 only accepts DOM elements
	      try {
	        var o = {},
	            func = isNative(func = Object.defineProperty) && func,
	            result = func(o, o, o) && func;
	      } catch(e) { }
	      return result;
	    }());

	    /* Native method shortcuts for methods with the same name as other `lodash` methods */
	    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
	        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	        nativeIsFinite = context.isFinite,
	        nativeIsNaN = context.isNaN,
	        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;

	    /** Used to lookup a built-in constructor by [[Class]] */
	    var ctorByClass = {};
	    ctorByClass[arrayClass] = Array;
	    ctorByClass[boolClass] = Boolean;
	    ctorByClass[dateClass] = Date;
	    ctorByClass[funcClass] = Function;
	    ctorByClass[objectClass] = Object;
	    ctorByClass[numberClass] = Number;
	    ctorByClass[regexpClass] = RegExp;
	    ctorByClass[stringClass] = String;

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object which wraps the given value to enable intuitive
	     * method chaining.
	     *
	     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	     * and `unshift`
	     *
	     * Chaining is supported in custom builds as long as the `value` method is
	     * implicitly or explicitly included in the build.
	     *
	     * The chainable wrapper functions are:
	     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
	     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
	     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
	     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
	     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
	     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
	     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
	     * and `zip`
	     *
	     * The non-chainable wrapper functions are:
	     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
	     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
	     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
	     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
	     * `template`, `unescape`, `uniqueId`, and `value`
	     *
	     * The wrapper functions `first` and `last` return wrapped values when `n` is
	     * provided, otherwise they return unwrapped values.
	     *
	     * Explicit chaining can be enabled by using the `_.chain` method.
	     *
	     * @name _
	     * @constructor
	     * @category Chaining
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns a `lodash` instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(num) {
	     *   return num * num;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
	      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
	       ? value
	       : new lodashWrapper(value);
	    }

	    /**
	     * A fast path for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @param {boolean} chainAll A flag to enable chaining for all methods
	     * @returns {Object} Returns a `lodash` instance.
	     */
	    function lodashWrapper(value, chainAll) {
	      this.__chain__ = !!chainAll;
	      this.__wrapped__ = value;
	    }
	    // ensure `new lodashWrapper` is an instance of `lodash`
	    lodashWrapper.prototype = lodash.prototype;

	    /**
	     * An object used to flag environments features.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};

	    /**
	     * Detect if functions can be decompiled by `Function#toString`
	     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

	    /**
	     * Detect if `Function#name` is supported (all but IE).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcNames = typeof Function.name == 'string';

	    /**
	     * By default, the template delimiters used by Lo-Dash are similar to those in
	     * embedded Ruby (ERB). Change the following template settings to use alternative
	     * delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {

	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': /<%-([\s\S]+?)%>/g,

	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': /<%([\s\S]+?)%>/g,

	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,

	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',

	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {

	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };

	    /*--------------------------------------------------------------------------*/

	    /**
	     * The base implementation of `_.bind` that creates the bound function and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new bound function.
	     */
	    function baseBind(bindData) {
	      var func = bindData[0],
	          partialArgs = bindData[2],
	          thisArg = bindData[4];

	      function bound() {
	        // `Function#bind` spec
	        // http://es5.github.io/#x15.3.4.5
	        if (partialArgs) {
	          // avoid `arguments` object deoptimizations by using `slice` instead
	          // of `Array.prototype.slice.call` and not assigning `arguments` to a
	          // variable as a ternary expression
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        // mimic the constructor's `return` behavior
	        // http://es5.github.io/#x13.2.2
	        if (this instanceof bound) {
	          // ensure `new bound` is an instance of `func`
	          var thisBinding = baseCreate(func.prototype),
	              result = func.apply(thisBinding, args || arguments);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisArg, args || arguments);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }

	    /**
	     * The base implementation of `_.clone` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, callback, stackA, stackB) {
	      if (callback) {
	        var result = callback(value);
	        if (typeof result != 'undefined') {
	          return result;
	        }
	      }
	      // inspect [[Class]]
	      var isObj = isObject(value);
	      if (isObj) {
	        var className = toString.call(value);
	        if (!cloneableClasses[className]) {
	          return value;
	        }
	        var ctor = ctorByClass[className];
	        switch (className) {
	          case boolClass:
	          case dateClass:
	            return new ctor(+value);

	          case numberClass:
	          case stringClass:
	            return new ctor(value);

	          case regexpClass:
	            result = ctor(value.source, reFlags.exec(value));
	            result.lastIndex = value.lastIndex;
	            return result;
	        }
	      } else {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isDeep) {
	        // check for circular references and return corresponding clone
	        var initedStack = !stackA;
	        stackA || (stackA = getArray());
	        stackB || (stackB = getArray());

	        var length = stackA.length;
	        while (length--) {
	          if (stackA[length] == value) {
	            return stackB[length];
	          }
	        }
	        result = isArr ? ctor(value.length) : {};
	      }
	      else {
	        result = isArr ? slice(value) : assign({}, value);
	      }
	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	      // exit for shallow clone
	      if (!isDeep) {
	        return result;
	      }
	      // add the source value to the stack of traversed objects
	      // and associate it with its clone
	      stackA.push(value);
	      stackB.push(result);

	      // recursively populate clone (susceptible to call stack limits)
	      (isArr ? forEach : forOwn)(value, function(objValue, key) {
	        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
	      });

	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    function baseCreate(prototype, properties) {
	      return isObject(prototype) ? nativeCreate(prototype) : {};
	    }
	    // fallback for browsers without `Object.create`
	    if (!nativeCreate) {
	      baseCreate = (function() {
	        function Object() {}
	        return function(prototype) {
	          if (isObject(prototype)) {
	            Object.prototype = prototype;
	            var result = new Object;
	            Object.prototype = null;
	          }
	          return result || context.Object();
	        };
	      }());
	    }

	    /**
	     * The base implementation of `_.createCallback` without support for creating
	     * "_.pluck" or "_.where" style callbacks.
	     *
	     * @private
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     */
	    function baseCreateCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      // exit early for no `thisArg` or already bound by `Function#bind`
	      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	        return func;
	      }
	      var bindData = func.__bindData__;
	      if (typeof bindData == 'undefined') {
	        if (support.funcNames) {
	          bindData = !func.name;
	        }
	        bindData = bindData || !support.funcDecomp;
	        if (!bindData) {
	          var source = fnToString.call(func);
	          if (!support.funcNames) {
	            bindData = !reFuncName.test(source);
	          }
	          if (!bindData) {
	            // checks if `func` references the `this` keyword and stores the result
	            bindData = reThis.test(source);
	            setBindData(func, bindData);
	          }
	        }
	      }
	      // exit early if there are no `this` references or `func` is bound
	      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 2: return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	      }
	      return bind(func, thisArg);
	    }

	    /**
	     * The base implementation of `createWrapper` that creates the wrapper and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new function.
	     */
	    function baseCreateWrapper(bindData) {
	      var func = bindData[0],
	          bitmask = bindData[1],
	          partialArgs = bindData[2],
	          partialRightArgs = bindData[3],
	          thisArg = bindData[4],
	          arity = bindData[5];

	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          key = func;

	      function bound() {
	        var thisBinding = isBind ? thisArg : this;
	        if (partialArgs) {
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        if (partialRightArgs || isCurry) {
	          args || (args = slice(arguments));
	          if (partialRightArgs) {
	            push.apply(args, partialRightArgs);
	          }
	          if (isCurry && args.length < arity) {
	            bitmask |= 16 & ~32;
	            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	          }
	        }
	        args || (args = arguments);
	        if (isBindKey) {
	          func = thisBinding[key];
	        }
	        if (this instanceof bound) {
	          thisBinding = baseCreate(func.prototype);
	          var result = func.apply(thisBinding, args);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisBinding, args);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }

	    /**
	     * The base implementation of `_.difference` that accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {Array} [values] The array of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
	          result = [];

	      if (isLarge) {
	        var cache = createCache(values);
	        if (cache) {
	          indexOf = cacheIndexOf;
	          values = cache;
	        } else {
	          isLarge = false;
	        }
	      }
	      while (++index < length) {
	        var value = array[index];
	        if (indexOf(values, value) < 0) {
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseObject(values);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.flatten` without support for callback
	     * shorthands or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
	     * @param {number} [fromIndex=0] The index to start from.
	     * @returns {Array} Returns a new flattened array.
	     */
	    function baseFlatten(array, isShallow, isStrict, fromIndex) {
	      var index = (fromIndex || 0) - 1,
	          length = array ? array.length : 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index];

	        if (value && typeof value == 'object' && typeof value.length == 'number'
	            && (isArray(value) || isArguments(value))) {
	          // recursively flatten arrays (susceptible to call stack limits)
	          if (!isShallow) {
	            value = baseFlatten(value, isShallow, isStrict);
	          }
	          var valIndex = -1,
	              valLength = value.length,
	              resIndex = result.length;

	          result.length += valLength;
	          while (++valIndex < valLength) {
	            result[resIndex++] = value[valIndex];
	          }
	        } else if (!isStrict) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
	     * that allows partial "_.where" style comparisons.
	     *
	     * @private
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
	      // used to indicate that when comparing objects, `a` has at least the properties of `b`
	      if (callback) {
	        var result = callback(a, b);
	        if (typeof result != 'undefined') {
	          return !!result;
	        }
	      }
	      // exit early for identical values
	      if (a === b) {
	        // treat `+0` vs. `-0` as not equal
	        return a !== 0 || (1 / a == 1 / b);
	      }
	      var type = typeof a,
	          otherType = typeof b;

	      // exit early for unlike primitive values
	      if (a === a &&
	          !(a && objectTypes[type]) &&
	          !(b && objectTypes[otherType])) {
	        return false;
	      }
	      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
	      // http://es5.github.io/#x15.3.4.4
	      if (a == null || b == null) {
	        return a === b;
	      }
	      // compare [[Class]] names
	      var className = toString.call(a),
	          otherClass = toString.call(b);

	      if (className == argsClass) {
	        className = objectClass;
	      }
	      if (otherClass == argsClass) {
	        otherClass = objectClass;
	      }
	      if (className != otherClass) {
	        return false;
	      }
	      switch (className) {
	        case boolClass:
	        case dateClass:
	          // coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	          return +a == +b;

	        case numberClass:
	          // treat `NaN` vs. `NaN` as equal
	          return (a != +a)
	            ? b != +b
	            // but treat `+0` vs. `-0` as not equal
	            : (a == 0 ? (1 / a == 1 / b) : a == +b);

	        case regexpClass:
	        case stringClass:
	          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	          // treat string primitives and their corresponding object instances as equal
	          return a == String(b);
	      }
	      var isArr = className == arrayClass;
	      if (!isArr) {
	        // unwrap any `lodash` wrapped values
	        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
	            bWrapped = hasOwnProperty.call(b, '__wrapped__');

	        if (aWrapped || bWrapped) {
	          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
	        }
	        // exit for functions and DOM nodes
	        if (className != objectClass) {
	          return false;
	        }
	        // in older versions of Opera, `arguments` objects have `Array` constructors
	        var ctorA = a.constructor,
	            ctorB = b.constructor;

	        // non `Object` object instances with different constructors are not equal
	        if (ctorA != ctorB &&
	              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	              ('constructor' in a && 'constructor' in b)
	            ) {
	          return false;
	        }
	      }
	      // assume cyclic structures are equal
	      // the algorithm for detecting cyclic structures is adapted from ES 5.1
	      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	      var initedStack = !stackA;
	      stackA || (stackA = getArray());
	      stackB || (stackB = getArray());

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == a) {
	          return stackB[length] == b;
	        }
	      }
	      var size = 0;
	      result = true;

	      // add `a` and `b` to the stack of traversed objects
	      stackA.push(a);
	      stackB.push(b);

	      // recursively compare objects and arrays (susceptible to call stack limits)
	      if (isArr) {
	        // compare lengths to determine if a deep comparison is necessary
	        length = a.length;
	        size = b.length;
	        result = size == length;

	        if (result || isWhere) {
	          // deep compare the contents, ignoring non-numeric properties
	          while (size--) {
	            var index = length,
	                value = b[size];

	            if (isWhere) {
	              while (index--) {
	                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
	                  break;
	                }
	              }
	            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
	              break;
	            }
	          }
	        }
	      }
	      else {
	        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	        // which, in this case, is more costly
	        forIn(b, function(value, key, b) {
	          if (hasOwnProperty.call(b, key)) {
	            // count the number of properties.
	            size++;
	            // deep compare each property value.
	            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
	          }
	        });

	        if (result && !isWhere) {
	          // ensure both objects have the same number of properties
	          forIn(a, function(value, key, a) {
	            if (hasOwnProperty.call(a, key)) {
	              // `size` will be `-1` if `a` has more properties than `b`
	              return (result = --size > -1);
	            }
	          });
	        }
	      }
	      stackA.pop();
	      stackB.pop();

	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.merge` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     */
	    function baseMerge(object, source, callback, stackA, stackB) {
	      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];

	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            var isShallow;
	            if (callback) {
	              result = callback(value, source);
	              if ((isShallow = typeof result != 'undefined')) {
	                value = result;
	              }
	            }
	            if (!isShallow) {
	              value = isArr
	                ? (isArray(value) ? value : [])
	                : (isPlainObject(value) ? value : {});
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);

	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!isShallow) {
	              baseMerge(value, source, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }

	    /**
	     * The base implementation of `_.random` without argument juggling or support
	     * for returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns a random number.
	     */
	    function baseRandom(min, max) {
	      return min + floor(nativeRandom() * (max - min + 1));
	    }

	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function} [callback] The function called per iteration.
	     * @returns {Array} Returns a duplicate-value-free array.
	     */
	    function baseUniq(array, isSorted, callback) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          result = [];

	      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
	          seen = (callback || isLarge) ? getArray() : result;

	      if (isLarge) {
	        var cache = createCache(seen);
	        indexOf = cacheIndexOf;
	        seen = cache;
	      }
	      while (++index < length) {
	        var value = array[index],
	            computed = callback ? callback(value, index, array) : value;

	        if (isSorted
	              ? !index || seen[seen.length - 1] !== computed
	              : indexOf(seen, computed) < 0
	            ) {
	          if (callback || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseArray(seen.array);
	        releaseObject(seen);
	      } else if (callback) {
	        releaseArray(seen);
	      }
	      return result;
	    }

	    /**
	     * Creates a function that aggregates a collection, creating an object composed
	     * of keys generated from the results of running each element of the collection
	     * through a callback. The given `setter` function sets the keys and values
	     * of the composed object.
	     *
	     * @private
	     * @param {Function} setter The setter function.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter) {
	      return function(collection, callback, thisArg) {
	        var result = {};
	        callback = lodash.createCallback(callback, thisArg, 3);

	        var index = -1,
	            length = collection ? collection.length : 0;

	        if (typeof length == 'number') {
	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, callback(value, index, collection), collection);
	          }
	        } else {
	          forOwn(collection, function(value, key, collection) {
	            setter(result, value, callback(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that, when called, either curries or invokes `func`
	     * with an optional `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of method flags to compose.
	     *  The bitmask may be composed of the following flags:
	     *  1 - `_.bind`
	     *  2 - `_.bindKey`
	     *  4 - `_.curry`
	     *  8 - `_.curry` (bound)
	     *  16 - `_.partial`
	     *  32 - `_.partialRight`
	     * @param {Array} [partialArgs] An array of arguments to prepend to those
	     *  provided to the new function.
	     * @param {Array} [partialRightArgs] An array of arguments to append to those
	     *  provided to the new function.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new function.
	     */
	    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          isPartial = bitmask & 16,
	          isPartialRight = bitmask & 32;

	      if (!isBindKey && !isFunction(func)) {
	        throw new TypeError;
	      }
	      if (isPartial && !partialArgs.length) {
	        bitmask &= ~16;
	        isPartial = partialArgs = false;
	      }
	      if (isPartialRight && !partialRightArgs.length) {
	        bitmask &= ~32;
	        isPartialRight = partialRightArgs = false;
	      }
	      var bindData = func && func.__bindData__;
	      if (bindData && bindData !== true) {
	        // clone `bindData`
	        bindData = slice(bindData);
	        if (bindData[2]) {
	          bindData[2] = slice(bindData[2]);
	        }
	        if (bindData[3]) {
	          bindData[3] = slice(bindData[3]);
	        }
	        // set `thisBinding` is not previously bound
	        if (isBind && !(bindData[1] & 1)) {
	          bindData[4] = thisArg;
	        }
	        // set if previously bound but not currently (subsequent curried functions)
	        if (!isBind && bindData[1] & 1) {
	          bitmask |= 8;
	        }
	        // set curried arity if not yet set
	        if (isCurry && !(bindData[1] & 4)) {
	          bindData[5] = arity;
	        }
	        // append partial left arguments
	        if (isPartial) {
	          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	        }
	        // append partial right arguments
	        if (isPartialRight) {
	          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	        }
	        // merge flags
	        bindData[1] |= bitmask;
	        return createWrapper.apply(null, bindData);
	      }
	      // fast path for `_.bind`
	      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	    }

	    /**
	     * Used by `escape` to convert characters to HTML entities.
	     *
	     * @private
	     * @param {string} match The matched character to escape.
	     * @returns {string} Returns the escaped character.
	     */
	    function escapeHtmlChar(match) {
	      return htmlEscapes[match];
	    }

	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized, this method returns the custom method, otherwise it returns
	     * the `baseIndexOf` function.
	     *
	     * @private
	     * @returns {Function} Returns the "indexOf" function.
	     */
	    function getIndexOf() {
	      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
	      return result;
	    }

	    /**
	     * Checks if `value` is a native function.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	     */
	    function isNative(value) {
	      return typeof value == 'function' && reNative.test(value);
	    }

	    /**
	     * Sets `this` binding data on a given function.
	     *
	     * @private
	     * @param {Function} func The function to set data on.
	     * @param {Array} value The data array to set.
	     */
	    var setBindData = !defineProperty ? noop : function(func, value) {
	      descriptor.value = value;
	      defineProperty(func, '__bindData__', descriptor);
	    };

	    /**
	     * A fallback implementation of `isPlainObject` which checks if a given value
	     * is an object created by the `Object` constructor, assuming objects created
	     * by the `Object` constructor have no inherited enumerable properties and that
	     * there are no `Object.prototype` extensions.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     */
	    function shimIsPlainObject(value) {
	      var ctor,
	          result;

	      // avoid non Object objects, `arguments` objects, and DOM elements
	      if (!(value && toString.call(value) == objectClass) ||
	          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
	        return false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	    }

	    /**
	     * Used by `unescape` to convert HTML entities to characters.
	     *
	     * @private
	     * @param {string} match The matched character to unescape.
	     * @returns {string} Returns the unescaped character.
	     */
	    function unescapeHtmlChar(match) {
	      return htmlUnescapes[match];
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Checks if `value` is an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
	     * @example
	     *
	     * (function() { return _.isArguments(arguments); })(1, 2, 3);
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == argsClass || false;
	    }

	    /**
	     * Checks if `value` is an array.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
	     * @example
	     *
	     * (function() { return _.isArray(arguments); })();
	     * // => false
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     */
	    var isArray = nativeIsArray || function(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == arrayClass || false;
	    };

	    /**
	     * A fallback implementation of `Object.keys` which produces an array of the
	     * given object's own enumerable property names.
	     *
	     * @private
	     * @type Function
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     */
	    var shimKeys = function(object) {
	      var index, iterable = object, result = [];
	      if (!iterable) return result;
	      if (!(objectTypes[typeof object])) return result;
	        for (index in iterable) {
	          if (hasOwnProperty.call(iterable, index)) {
	            result.push(index);
	          }
	        }
	      return result
	    };

	    /**
	     * Creates an array composed of the own enumerable property names of an object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     * @example
	     *
	     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      if (!isObject(object)) {
	        return [];
	      }
	      return nativeKeys(object);
	    };

	    /**
	     * Used to convert characters to HTML entities:
	     *
	     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	     * don't require escaping in HTML and have no special meaning unless they're part
	     * of a tag or an unquoted attribute value.
	     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	     */
	    var htmlEscapes = {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#39;'
	    };

	    /** Used to convert HTML entities to characters */
	    var htmlUnescapes = invert(htmlEscapes);

	    /** Used to match HTML entities and HTML characters */
	    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
	        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources will overwrite property assignments of previous
	     * sources. If a callback is provided it will be executed to produce the
	     * assigned values. The callback is bound to `thisArg` and invoked with two
	     * arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @alias extend
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize assigning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
	     * // => { 'name': 'fred', 'employer': 'slate' }
	     *
	     * var defaults = _.partialRight(_.assign, function(a, b) {
	     *   return typeof a == 'undefined' ? b : a;
	     * });
	     *
	     * var object = { 'name': 'barney' };
	     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var assign = function(object, source, guard) {
	      var index, iterable = object, result = iterable;
	      if (!iterable) return result;
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = typeof guard == 'number' ? 2 : args.length;
	      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
	        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
	      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
	        callback = args[--argsLength];
	      }
	      while (++argsIndex < argsLength) {
	        iterable = args[argsIndex];
	        if (iterable && objectTypes[typeof iterable]) {
	        var ownIndex = -1,
	            ownProps = objectTypes[typeof iterable] && keys(iterable),
	            length = ownProps ? ownProps.length : 0;

	        while (++ownIndex < length) {
	          index = ownProps[ownIndex];
	          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
	        }
	        }
	      }
	      return result
	    };

	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
	     * be cloned, otherwise they will be assigned by reference. If a callback
	     * is provided it will be executed to produce the cloned values. If the
	     * callback returns `undefined` cloning will be handled by the method instead.
	     * The callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var shallow = _.clone(characters);
	     * shallow[0] === characters[0];
	     * // => true
	     *
	     * var deep = _.clone(characters, true);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * _.mixin({
	     *   'clone': _.partialRight(_.clone, function(value) {
	     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	     *   })
	     * });
	     *
	     * var clone = _.clone(document.body);
	     * clone.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, callback, thisArg) {
	      // allows working with "Collections" methods without using their `index`
	      // and `collection` arguments for `isDeep` and `callback`
	      if (typeof isDeep != 'boolean' && isDeep != null) {
	        thisArg = callback;
	        callback = isDeep;
	        isDeep = false;
	      }
	      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }

	    /**
	     * Creates a deep clone of `value`. If a callback is provided it will be
	     * executed to produce the cloned values. If the callback returns `undefined`
	     * cloning will be handled by the method instead. The callback is bound to
	     * `thisArg` and invoked with one argument; (value).
	     *
	     * Note: This method is loosely based on the structured clone algorithm. Functions
	     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var deep = _.cloneDeep(characters);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'node': element
	     * };
	     *
	     * var clone = _.cloneDeep(view, function(value) {
	     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
	     * });
	     *
	     * clone.node == view.node;
	     * // => false
	     */
	    function cloneDeep(value, callback, thisArg) {
	      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }

	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties) {
	      var result = baseCreate(prototype);
	      return properties ? assign(result, properties) : result;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional defaults of the same property will be ignored.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param- {Object} [guard] Allows working with `_.reduce` without using its
	     *  `key` and `object` arguments as sources.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var object = { 'name': 'barney' };
	     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var defaults = function(object, source, guard) {
	      var index, iterable = object, result = iterable;
	      if (!iterable) return result;
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = typeof guard == 'number' ? 2 : args.length;
	      while (++argsIndex < argsLength) {
	        iterable = args[argsIndex];
	        if (iterable && objectTypes[typeof iterable]) {
	        var ownIndex = -1,
	            ownProps = objectTypes[typeof iterable] && keys(iterable),
	            length = ownProps ? ownProps.length : 0;

	        while (++ownIndex < length) {
	          index = ownProps[ownIndex];
	          if (typeof result[index] == 'undefined') result[index] = iterable[index];
	        }
	        }
	      }
	      return result
	    };

	    /**
	     * This method is like `_.findIndex` except that it returns the key of the
	     * first element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': false },
	     *   'fred': {    'age': 40, 'blocked': true },
	     *   'pebbles': { 'age': 1,  'blocked': false }
	     * };
	     *
	     * _.findKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (property order is not guaranteed across environments)
	     *
	     * // using "_.where" callback shorthand
	     * _.findKey(characters, { 'age': 1 });
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findKey(characters, 'blocked');
	     * // => 'fred'
	     */
	    function findKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * This method is like `_.findKey` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': true },
	     *   'fred': {    'age': 40, 'blocked': false },
	     *   'pebbles': { 'age': 1,  'blocked': true }
	     * };
	     *
	     * _.findLastKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastKey(characters, { 'age': 40 });
	     * // => 'fred'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastKey(characters, 'blocked');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwnRight(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * Iterates over own and inherited enumerable properties of an object,
	     * executing the callback for each property. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, key, object). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forIn(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
	     */
	    var forIn = function(collection, callback, thisArg) {
	      var index, iterable = collection, result = iterable;
	      if (!iterable) return result;
	      if (!objectTypes[typeof iterable]) return result;
	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	        for (index in iterable) {
	          if (callback(iterable[index], index, collection) === false) return result;
	        }
	      return result
	    };

	    /**
	     * This method is like `_.forIn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forInRight(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
	     */
	    function forInRight(object, callback, thisArg) {
	      var pairs = [];

	      forIn(object, function(value, key) {
	        pairs.push(key, value);
	      });

	      var length = pairs.length;
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(pairs[length--], pairs[length], object) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * Iterates over own enumerable properties of an object, executing the callback
	     * for each property. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, key, object). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	     */
	    var forOwn = function(collection, callback, thisArg) {
	      var index, iterable = collection, result = iterable;
	      if (!iterable) return result;
	      if (!objectTypes[typeof iterable]) return result;
	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	        var ownIndex = -1,
	            ownProps = objectTypes[typeof iterable] && keys(iterable),
	            length = ownProps ? ownProps.length : 0;

	        while (++ownIndex < length) {
	          index = ownProps[ownIndex];
	          if (callback(iterable[index], index, collection) === false) return result;
	        }
	      return result
	    };

	    /**
	     * This method is like `_.forOwn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
	     */
	    function forOwnRight(object, callback, thisArg) {
	      var props = keys(object),
	          length = props.length;

	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        var key = props[length];
	        if (callback(object[key], key, object) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * Creates a sorted array of property names of all enumerable properties,
	     * own and inherited, of `object` that have function values.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names that have function values.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	     */
	    function functions(object) {
	      var result = [];
	      forIn(object, function(value, key) {
	        if (isFunction(value)) {
	          result.push(key);
	        }
	      });
	      return result.sort();
	    }

	    /**
	     * Checks if the specified property name exists as a direct property of `object`,
	     * instead of an inherited property.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to check.
	     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
	     * @example
	     *
	     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	     * // => true
	     */
	    function has(object, key) {
	      return object ? hasOwnProperty.call(object, key) : false;
	    }

	    /**
	     * Creates an object composed of the inverted keys and values of the given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to invert.
	     * @returns {Object} Returns the created inverted object.
	     * @example
	     *
	     * _.invert({ 'first': 'fred', 'second': 'barney' });
	     * // => { 'fred': 'first', 'barney': 'second' }
	     */
	    function invert(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index];
	        result[object[key]] = key;
	      }
	      return result;
	    }

	    /**
	     * Checks if `value` is a boolean value.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
	     * @example
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false ||
	        value && typeof value == 'object' && toString.call(value) == boolClass || false;
	    }

	    /**
	     * Checks if `value` is a date.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     */
	    function isDate(value) {
	      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
	    }

	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     */
	    function isElement(value) {
	      return value && value.nodeType === 1 || false;
	    }

	    /**
	     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	     * length of `0` and objects with no own enumerable properties are considered
	     * "empty".
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({});
	     * // => true
	     *
	     * _.isEmpty('');
	     * // => true
	     */
	    function isEmpty(value) {
	      var result = true;
	      if (!value) {
	        return result;
	      }
	      var className = toString.call(value),
	          length = value.length;

	      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
	          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	        return !length;
	      }
	      forOwn(value, function() {
	        return (result = false);
	      });
	      return result;
	    }

	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent to each other. If a callback is provided it will be executed
	     * to compare values. If the callback returns `undefined` comparisons will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (a, b).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var copy = { 'name': 'fred' };
	     *
	     * object == copy;
	     * // => false
	     *
	     * _.isEqual(object, copy);
	     * // => true
	     *
	     * var words = ['hello', 'goodbye'];
	     * var otherWords = ['hi', 'goodbye'];
	     *
	     * _.isEqual(words, otherWords, function(a, b) {
	     *   var reGreet = /^(?:hello|hi)$/i,
	     *       aGreet = _.isString(a) && reGreet.test(a),
	     *       bGreet = _.isString(b) && reGreet.test(b);
	     *
	     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	     * });
	     * // => true
	     */
	    function isEqual(a, b, callback, thisArg) {
	      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
	    }

	    /**
	     * Checks if `value` is, or can be coerced to, a finite number.
	     *
	     * Note: This is not the same as native `isFinite` which will return true for
	     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
	     * @example
	     *
	     * _.isFinite(-101);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => true
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite('');
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	    }

	    /**
	     * Checks if `value` is a function.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     */
	    function isFunction(value) {
	      return typeof value == 'function';
	    }

	    /**
	     * Checks if `value` is the language type of Object.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // check if the value is the ECMAScript language type of Object
	      // http://es5.github.io/#x8
	      // and avoid a V8 bug
	      // http://code.google.com/p/v8/issues/detail?id=2291
	      return !!(value && objectTypes[typeof value]);
	    }

	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * Note: This is not the same as native `isNaN` which will return `true` for
	     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // `NaN` as a primitive is the only value that is not equal to itself
	      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	      return isNumber(value) && value != +value;
	    }

	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(undefined);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }

	    /**
	     * Checks if `value` is a number.
	     *
	     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4 * 5);
	     * // => true
	     */
	    function isNumber(value) {
	      return typeof value == 'number' ||
	        value && typeof value == 'object' && toString.call(value) == numberClass || false;
	    }

	    /**
	     * Checks if `value` is an object created by the `Object` constructor.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * _.isPlainObject(new Shape);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     */
	    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	      if (!(value && toString.call(value) == objectClass)) {
	        return false;
	      }
	      var valueOf = value.valueOf,
	          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	      return objProto
	        ? (value == objProto || getPrototypeOf(value) == objProto)
	        : shimIsPlainObject(value);
	    };

	    /**
	     * Checks if `value` is a regular expression.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
	     * @example
	     *
	     * _.isRegExp(/fred/);
	     * // => true
	     */
	    function isRegExp(value) {
	      return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
	    }

	    /**
	     * Checks if `value` is a string.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('fred');
	     * // => true
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        value && typeof value == 'object' && toString.call(value) == stringClass || false;
	    }

	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     */
	    function isUndefined(value) {
	      return typeof value == 'undefined';
	    }

	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     *
	     * var characters = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.mapValues(characters, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 }
	     */
	    function mapValues(object, callback, thisArg) {
	      var result = {};
	      callback = lodash.createCallback(callback, thisArg, 3);

	      forOwn(object, function(value, key, object) {
	        result[key] = callback(value, key, object);
	      });
	      return result;
	    }

	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * will overwrite property assignments of previous sources. If a callback is
	     * provided it will be executed to produce the merged values of the destination
	     * and source properties. If the callback returns `undefined` merging will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var names = {
	     *   'characters': [
	     *     { 'name': 'barney' },
	     *     { 'name': 'fred' }
	     *   ]
	     * };
	     *
	     * var ages = {
	     *   'characters': [
	     *     { 'age': 36 },
	     *     { 'age': 40 }
	     *   ]
	     * };
	     *
	     * _.merge(names, ages);
	     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
	     *
	     * var food = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var otherFood = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(food, otherFood, function(a, b) {
	     *   return _.isArray(a) ? a.concat(b) : undefined;
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	     */
	    function merge(object) {
	      var args = arguments,
	          length = 2;

	      if (!isObject(object)) {
	        return object;
	      }
	      // allows working with `_.reduce` and `_.reduceRight` without using
	      // their `index` and `collection` arguments
	      if (typeof args[2] != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	      var sources = slice(arguments, 1, length),
	          index = -1,
	          stackA = getArray(),
	          stackB = getArray();

	      while (++index < length) {
	        baseMerge(object, sources[index], callback, stackA, stackB);
	      }
	      releaseArray(stackA);
	      releaseArray(stackB);
	      return object;
	    }

	    /**
	     * Creates a shallow clone of `object` excluding the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` omitting the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The properties to omit or the
	     *  function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object without the omitted properties.
	     * @example
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
	     * // => { 'name': 'fred' }
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
	     *   return typeof value == 'number';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function omit(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var props = [];
	        forIn(object, function(value, key) {
	          props.push(key);
	        });
	        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

	        var index = -1,
	            length = props.length;

	        while (++index < length) {
	          var key = props[index];
	          result[key] = object[key];
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (!callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Creates a two dimensional array of an object's key-value pairs,
	     * i.e. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
	     */
	    function pairs(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }

	    /**
	     * Creates a shallow clone of `object` composed of the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` picking the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The function called per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object composed of the picked properties.
	     * @example
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
	     * // => { 'name': 'fred' }
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
	     *   return key.charAt(0) != '_';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function pick(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var index = -1,
	            props = baseFlatten(arguments, true, false, 1),
	            length = isObject(object) ? props.length : 0;

	        while (++index < length) {
	          var key = props[index];
	          if (key in object) {
	            result[key] = object[key];
	          }
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * An alternative to `_.reduce` this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable properties through a callback, with each callback execution
	     * potentially mutating the `accumulator` object. The callback is bound to
	     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
	     * Callbacks may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
	     *   num *= num;
	     *   if (num % 2) {
	     *     return result.push(num) < 3;
	     *   }
	     * });
	     * // => [1, 9, 25]
	     *
	     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     * });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function transform(object, callback, accumulator, thisArg) {
	      var isArr = isArray(object);
	      if (accumulator == null) {
	        if (isArr) {
	          accumulator = [];
	        } else {
	          var ctor = object && object.constructor,
	              proto = ctor && ctor.prototype;

	          accumulator = baseCreate(proto);
	        }
	      }
	      if (callback) {
	        callback = lodash.createCallback(callback, thisArg, 4);
	        (isArr ? forEach : forOwn)(object, function(value, index, object) {
	          return callback(accumulator, value, index, object);
	        });
	      }
	      return accumulator;
	    }

	    /**
	     * Creates an array composed of the own enumerable property values of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property values.
	     * @example
	     *
	     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => [1, 2, 3] (property order is not guaranteed across environments)
	     */
	    function values(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements from the specified indexes, or keys, of the
	     * `collection`. Indexes may be specified as individual arguments or as arrays
	     * of indexes.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
	     *   to retrieve, specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns a new array of elements corresponding to the
	     *  provided indexes.
	     * @example
	     *
	     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	     * // => ['a', 'c', 'e']
	     *
	     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
	     * // => ['fred', 'pebbles']
	     */
	    function at(collection) {
	      var args = arguments,
	          index = -1,
	          props = baseFlatten(args, true, false, 1),
	          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
	          result = Array(length);

	      while(++index < length) {
	        result[index] = collection[props[index]];
	      }
	      return result;
	    }

	    /**
	     * Checks if a given value is present in a collection using strict equality
	     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
	     * offset from the end of the collection.
	     *
	     * @static
	     * @memberOf _
	     * @alias include
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {*} target The value to check for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
	     * @example
	     *
	     * _.contains([1, 2, 3], 1);
	     * // => true
	     *
	     * _.contains([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.contains('pebbles', 'eb');
	     * // => true
	     */
	    function contains(collection, target, fromIndex) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = collection ? collection.length : 0,
	          result = false;

	      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	      if (isArray(collection)) {
	        result = indexOf(collection, target, fromIndex) > -1;
	      } else if (typeof length == 'number') {
	        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
	      } else {
	        forOwn(collection, function(value) {
	          if (++index >= fromIndex) {
	            return !(result = value === target);
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through the callback. The corresponding value
	     * of each key is the number of times the key was returned by the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });

	    /**
	     * Checks if the given callback returns truey value for **all** elements of
	     * a collection. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if all elements passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes']);
	     * // => false
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.every(characters, 'age');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.every(characters, { 'age': 36 });
	     * // => false
	     */
	    function every(collection, callback, thisArg) {
	      var result = true;
	      callback = lodash.createCallback(callback, thisArg, 3);

	      var index = -1,
	          length = collection ? collection.length : 0;

	      if (typeof length == 'number') {
	        while (++index < length) {
	          if (!(result = !!callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        forOwn(collection, function(value, index, collection) {
	          return (result = !!callback(value, index, collection));
	        });
	      }
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, returning an array of all elements
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that passed the callback check.
	     * @example
	     *
	     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [2, 4, 6]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.filter(characters, 'blocked');
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     *
	     * // using "_.where" callback shorthand
	     * _.filter(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     */
	    function filter(collection, callback, thisArg) {
	      var result = [];
	      callback = lodash.createCallback(callback, thisArg, 3);

	      var index = -1,
	          length = collection ? collection.length : 0;

	      if (typeof length == 'number') {
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        }
	      } else {
	        forOwn(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, returning the first element that
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect, findWhere
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.find(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
	     *
	     * // using "_.where" callback shorthand
	     * _.find(characters, { 'age': 1 });
	     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.find(characters, 'blocked');
	     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
	     */
	    function find(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);

	      var index = -1,
	          length = collection ? collection.length : 0;

	      if (typeof length == 'number') {
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            return value;
	          }
	        }
	      } else {
	        var result;
	        forOwn(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result = value;
	            return false;
	          }
	        });
	        return result;
	      }
	    }

	    /**
	     * This method is like `_.find` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(num) {
	     *   return num % 2 == 1;
	     * });
	     * // => 3
	     */
	    function findLast(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forEachRight(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result = value;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, executing the callback for each
	     * element. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * Note: As with other "Collections" methods, objects with a `length` property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
	     * // => logs each number and returns '1,2,3'
	     *
	     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
	     * // => logs each number and returns the object (property order is not guaranteed across environments)
	     */
	    function forEach(collection, callback, thisArg) {
	      var index = -1,
	          length = collection ? collection.length : 0;

	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	      if (typeof length == 'number') {
	        while (++index < length) {
	          if (callback(collection[index], index, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        forOwn(collection, callback);
	      }
	      return collection;
	    }

	    /**
	     * This method is like `_.forEach` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
	     * // => logs each number from right to left and returns '3,2,1'
	     */
	    function forEachRight(collection, callback, thisArg) {
	      var length = collection ? collection.length : 0;
	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	      if (typeof length == 'number') {
	        while (length--) {
	          if (callback(collection[length], length, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        var props = keys(collection);
	        length = props.length;
	        forOwn(collection, function(value, key, collection) {
	          key = props ? props[--length] : --length;
	          return callback(collection[key], key, collection);
	        });
	      }
	      return collection;
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of a collection through the callback. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of the collection through the given callback. The corresponding
	     * value of each key is the last element responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keys = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keys, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });

	    /**
	     * Invokes the method named by `methodName` on each element in the `collection`
	     * returning an array of the results of each invoked method. Additional arguments
	     * will be provided to each invoked method. If `methodName` is a function it
	     * will be invoked for, and `this` bound to, each element in the `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [arg] Arguments to invoke the method with.
	     * @returns {Array} Returns a new array of the results of each invoked method.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    function invoke(collection, methodName) {
	      var args = slice(arguments, 2),
	          index = -1,
	          isFunc = typeof methodName == 'function',
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      forEach(collection, function(value) {
	        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	      });
	      return result;
	    }

	    /**
	     * Creates an array of values by running each element in the collection
	     * through the callback. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of the results of each `callback` execution.
	     * @example
	     *
	     * _.map([1, 2, 3], function(num) { return num * 3; });
	     * // => [3, 6, 9]
	     *
	     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	     * // => [3, 6, 9] (property order is not guaranteed across environments)
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, callback, thisArg) {
	      var index = -1,
	          length = collection ? collection.length : 0;

	      callback = lodash.createCallback(callback, thisArg, 3);
	      if (typeof length == 'number') {
	        var result = Array(length);
	        while (++index < length) {
	          result[index] = callback(collection[index], index, collection);
	        }
	      } else {
	        result = [];
	        forOwn(collection, function(value, key, collection) {
	          result[++index] = callback(value, key, collection);
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the maximum value of a collection. If the collection is empty or
	     * falsey `-Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'fred', 'age': 40 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.max(characters, 'age');
	     * // => { 'name': 'fred', 'age': 40 };
	     */
	    function max(collection, callback, thisArg) {
	      var computed = -Infinity,
	          result = computed;

	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (value > result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);

	        forEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current > computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the minimum value of a collection. If the collection is empty or
	     * falsey `Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'barney', 'age': 36 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.min(characters, 'age');
	     * // => { 'name': 'barney', 'age': 36 };
	     */
	    function min(collection, callback, thisArg) {
	      var computed = Infinity,
	          result = computed;

	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (value < result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);

	        forEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current < computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the value of a specified property from all elements in the collection.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {string} property The name of the property to pluck.
	     * @returns {Array} Returns a new array of property values.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    var pluck = map;

	    /**
	     * Reduces a collection to a value which is the accumulated result of running
	     * each element in the collection through the callback, where each successive
	     * callback execution consumes the return value of the previous execution. If
	     * `accumulator` is not provided the first element of the collection will be
	     * used as the initial `accumulator` value. The callback is bound to `thisArg`
	     * and invoked with four arguments; (accumulator, value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var sum = _.reduce([1, 2, 3], function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function reduce(collection, callback, accumulator, thisArg) {
	      if (!collection) return accumulator;
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);

	      var index = -1,
	          length = collection.length;

	      if (typeof length == 'number') {
	        if (noaccum) {
	          accumulator = collection[++index];
	        }
	        while (++index < length) {
	          accumulator = callback(accumulator, collection[index], index, collection);
	        }
	      } else {
	        forOwn(collection, function(value, index, collection) {
	          accumulator = noaccum
	            ? (noaccum = false, value)
	            : callback(accumulator, value, index, collection)
	        });
	      }
	      return accumulator;
	    }

	    /**
	     * This method is like `_.reduce` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var list = [[0, 1], [2, 3], [4, 5]];
	     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	      forEachRight(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }

	    /**
	     * The opposite of `_.filter` this method returns the elements of a
	     * collection that the callback does **not** return truey for.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that failed the callback check.
	     * @example
	     *
	     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [1, 3, 5]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.reject(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     *
	     * // using "_.where" callback shorthand
	     * _.reject(characters, { 'age': 36 });
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     */
	    function reject(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	      return filter(collection, function(value, index, collection) {
	        return !callback(value, index, collection);
	      });
	    }

	    /**
	     * Retrieves a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Allows working with functions like `_.map`
	     *  without using their `index` arguments as `n`.
	     * @returns {Array} Returns the random sample(s) of `collection`.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (collection && typeof collection.length != 'number') {
	        collection = values(collection);
	      }
	      if (n == null || guard) {
	        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
	      }
	      var result = shuffle(collection);
	      result.length = nativeMin(nativeMax(0, n), result.length);
	      return result;
	    }

	    /**
	     * Creates an array of shuffled values, using a version of the Fisher-Yates
	     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns a new shuffled collection.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4, 5, 6]);
	     * // => [4, 1, 6, 3, 5, 2]
	     */
	    function shuffle(collection) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      forEach(collection, function(value) {
	        var rand = baseRandom(0, ++index);
	        result[index] = result[rand];
	        result[rand] = value;
	      });
	      return result;
	    }

	    /**
	     * Gets the size of the `collection` by returning `collection.length` for arrays
	     * and array-like objects or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns `collection.length` or number of own enumerable properties.
	     * @example
	     *
	     * _.size([1, 2]);
	     * // => 2
	     *
	     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => 3
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? collection.length : 0;
	      return typeof length == 'number' ? length : keys(collection).length;
	    }

	    /**
	     * Checks if the callback returns a truey value for **any** element of a
	     * collection. The function returns as soon as it finds a passing value and
	     * does not iterate over the entire collection. The callback is bound to
	     * `thisArg` and invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if any element passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.some(characters, 'blocked');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.some(characters, { 'age': 1 });
	     * // => false
	     */
	    function some(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);

	      var index = -1,
	          length = collection ? collection.length : 0;

	      if (typeof length == 'number') {
	        while (++index < length) {
	          if ((result = callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        forOwn(collection, function(value, index, collection) {
	          return !(result = callback(value, index, collection));
	        });
	      }
	      return !!result;
	    }

	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through the callback. This method
	     * performs a stable sort, that is, it will preserve the original sort order
	     * of equal elements. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an array of property names is provided for `callback` the collection
	     * will be sorted by each property value.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of sorted elements.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	     * // => [3, 1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'barney',  'age': 26 },
	     *   { 'name': 'fred',    'age': 30 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(_.sortBy(characters, 'age'), _.values);
	     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
	     *
	     * // sorting by multiple properties
	     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
	     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
	     */
	    function sortBy(collection, callback, thisArg) {
	      var index = -1,
	          isArr = isArray(callback),
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      if (!isArr) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      forEach(collection, function(value, key, collection) {
	        var object = result[++index] = getObject();
	        if (isArr) {
	          object.criteria = map(callback, function(key) { return value[key]; });
	        } else {
	          (object.criteria = getArray())[0] = callback(value, key, collection);
	        }
	        object.index = index;
	        object.value = value;
	      });

	      length = result.length;
	      result.sort(compareAscending);
	      while (length--) {
	        var object = result[length];
	        result[length] = object.value;
	        if (!isArr) {
	          releaseArray(object.criteria);
	        }
	        releaseObject(object);
	      }
	      return result;
	    }

	    /**
	     * Converts the `collection` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to convert.
	     * @returns {Array} Returns the new converted array.
	     * @example
	     *
	     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	     * // => [2, 3, 4]
	     */
	    function toArray(collection) {
	      if (collection && typeof collection.length == 'number') {
	        return slice(collection);
	      }
	      return values(collection);
	    }

	    /**
	     * Performs a deep comparison of each element in a `collection` to the given
	     * `properties` object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Object} props The object of property values to filter by.
	     * @returns {Array} Returns a new array of elements that have the given properties.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.where(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
	     *
	     * _.where(characters, { 'pets': ['dino'] });
	     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
	     */
	    var where = filter;

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are all falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array excluding all values of the provided arrays using strict
	     * equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	     * // => [1, 3, 4]
	     */
	    function difference(array) {
	      return baseDifference(array, baseFlatten(arguments, true, true, 1));
	    }

	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.findIndex(characters, function(chr) {
	     *   return chr.age < 20;
	     * });
	     * // => 2
	     *
	     * // using "_.where" callback shorthand
	     * _.findIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findIndex(characters, 'blocked');
	     * // => 1
	     */
	    function findIndex(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;

	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        if (callback(array[index], index, array)) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': true },
	     *   { 'name': 'fred',    'age': 40, 'blocked': false },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
	     * ];
	     *
	     * _.findLastIndex(characters, function(chr) {
	     *   return chr.age > 30;
	     * });
	     * // => 1
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastIndex(characters, 'blocked');
	     * // => 2
	     */
	    function findLastIndex(array, callback, thisArg) {
	      var length = array ? array.length : 0;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(array[length], length, array)) {
	          return length;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Gets the first element or first `n` elements of an array. If a callback
	     * is provided elements at the beginning of the array are returned as long
	     * as the callback returns truey. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head, take
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the first element(s) of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.first([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.first(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function first(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[0] : undefined;
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }

	    /**
	     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
	     * is truey, the array will only be flattened a single level. If a callback
	     * is provided each element of the array is passed through the callback before
	     * flattening. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, 4];
	     *
	     * _.flatten([1, [2], [3, [[4]]]], true);
	     * // => [1, 2, 3, [[4]]];
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.flatten(characters, 'pets');
	     * // => ['hoppy', 'baby puss', 'dino']
	     */
	    function flatten(array, isShallow, callback, thisArg) {
	      // juggle arguments
	      if (typeof isShallow != 'boolean' && isShallow != null) {
	        thisArg = callback;
	        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
	        isShallow = false;
	      }
	      if (callback != null) {
	        array = map(array, callback, thisArg);
	      }
	      return baseFlatten(array, isShallow);
	    }

	    /**
	     * Gets the index at which the first occurrence of `value` is found using
	     * strict equality for comparisons, i.e. `===`. If the array is already sorted
	     * providing `true` for `fromIndex` will run a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 1
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 4
	     *
	     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      if (typeof fromIndex == 'number') {
	        var length = array ? array.length : 0;
	        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
	      } else if (fromIndex) {
	        var index = sortedIndex(array, value);
	        return array[index] === value ? index : -1;
	      }
	      return baseIndexOf(array, value, fromIndex);
	    }

	    /**
	     * Gets all but the last element or last `n` elements of an array. If a
	     * callback is provided elements at the end of the array are excluded from
	     * the result as long as the callback returns truey. The callback is bound
	     * to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.initial([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.initial([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [1]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.initial(characters, 'blocked');
	     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function initial(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : callback || n;
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	    }

	    /**
	     * Creates an array of unique values present in all provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of shared values.
	     * @example
	     *
	     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2]
	     */
	    function intersection() {
	      var args = [],
	          argsIndex = -1,
	          argsLength = arguments.length,
	          caches = getArray(),
	          indexOf = getIndexOf(),
	          trustIndexOf = indexOf === baseIndexOf,
	          seen = getArray();

	      while (++argsIndex < argsLength) {
	        var value = arguments[argsIndex];
	        if (isArray(value) || isArguments(value)) {
	          args.push(value);
	          caches.push(trustIndexOf && value.length >= largeArraySize &&
	            createCache(argsIndex ? args[argsIndex] : seen));
	        }
	      }
	      var array = args[0],
	          index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      outer:
	      while (++index < length) {
	        var cache = caches[0];
	        value = array[index];

	        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
	          argsIndex = argsLength;
	          (cache || seen).push(value);
	          while (--argsIndex) {
	            cache = caches[argsIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	      }
	      while (argsLength--) {
	        cache = caches[argsLength];
	        if (cache) {
	          releaseObject(cache);
	        }
	      }
	      releaseArray(caches);
	      releaseArray(seen);
	      return result;
	    }

	    /**
	     * Gets the last element or last `n` elements of an array. If a callback is
	     * provided elements at the end of the array are returned as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the last element(s) of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     *
	     * _.last([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.last([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.last(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.last(characters, { 'employer': 'na' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function last(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[length - 1] : undefined;
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }

	    /**
	     * Gets the index at which the last occurrence of `value` is found using strict
	     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	     * as the offset from the end of the collection.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 4
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 1
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var index = array ? array.length : 0;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Removes all provided values from the given array using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {...*} [value] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull(array) {
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = args.length,
	          length = array ? array.length : 0;

	      while (++argsIndex < argsLength) {
	        var index = -1,
	            value = args[argsIndex];
	        while (++index < length) {
	          if (array[index] === value) {
	            splice.call(array, index--, 1);
	            length--;
	          }
	        }
	      }
	      return array;
	    }

	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to but not including `end`. If `start` is less than `stop` a
	     * zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns a new range array.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      start = +start || 0;
	      step = typeof step == 'number' ? step : (+step || 1);

	      if (end == null) {
	        end = start;
	        start = 0;
	      }
	      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
	      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	      var index = -1,
	          length = nativeMax(0, ceil((end - start) / (step || 1))),
	          result = Array(length);

	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }

	    /**
	     * Removes all elements from an array that the callback returns truey for
	     * and returns an array of removed elements. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4, 5, 6];
	     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
	     *
	     * console.log(array);
	     * // => [1, 3, 5]
	     *
	     * console.log(evens);
	     * // => [2, 4, 6]
	     */
	    function remove(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (callback(value, index, array)) {
	          result.push(value);
	          splice.call(array, index--, 1);
	          length--;
	        }
	      }
	      return result;
	    }

	    /**
	     * The opposite of `_.initial` this method gets all but the first element or
	     * first `n` elements of an array. If a callback function is provided elements
	     * at the beginning of the array are excluded from the result as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias drop, tail
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.rest([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.rest([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.rest(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.rest(characters, { 'employer': 'slate' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function rest(array, callback, thisArg) {
	      if (typeof callback != 'number' && callback != null) {
	        var n = 0,
	            index = -1,
	            length = array ? array.length : 0;

	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	      }
	      return slice(array, n);
	    }

	    /**
	     * Uses a binary search to determine the smallest index at which a value
	     * should be inserted into a given sorted array in order to maintain the sort
	     * order of the array. If a callback is provided it will be executed for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([20, 30, 50], 40);
	     * // => 2
	     *
	     * // using "_.pluck" callback shorthand
	     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 2
	     *
	     * var dict = {
	     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	     * };
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return dict.wordToNumber[word];
	     * });
	     * // => 2
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return this.wordToNumber[word];
	     * }, dict);
	     * // => 2
	     */
	    function sortedIndex(array, value, callback, thisArg) {
	      var low = 0,
	          high = array ? array.length : low;

	      // explicitly reference `identity` for better inlining in Firefox
	      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
	      value = callback(value);

	      while (low < high) {
	        var mid = (low + high) >>> 1;
	        (callback(array[mid]) < value)
	          ? low = mid + 1
	          : high = mid;
	      }
	      return low;
	    }

	    /**
	     * Creates an array of unique values, in order, of the provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of combined values.
	     * @example
	     *
	     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2, 3, 5, 4]
	     */
	    function union() {
	      return baseUniq(baseFlatten(arguments, true, true));
	    }

	    /**
	     * Creates a duplicate-value-free version of an array using strict equality
	     * for comparisons, i.e. `===`. If the array is sorted, providing
	     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
	     * each element of `array` is passed through the callback before uniqueness
	     * is computed. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([1, 2, 1, 3, 1]);
	     * // => [1, 2, 3]
	     *
	     * _.uniq([1, 1, 2, 2, 3], true);
	     * // => [1, 2, 3]
	     *
	     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
	     * // => ['A', 'b', 'C']
	     *
	     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
	     * // => [1, 2.5, 3]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, callback, thisArg) {
	      // juggle arguments
	      if (typeof isSorted != 'boolean' && isSorted != null) {
	        thisArg = callback;
	        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
	        isSorted = false;
	      }
	      if (callback != null) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      return baseUniq(array, isSorted, callback);
	    }

	    /**
	     * Creates an array excluding all provided values using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to filter.
	     * @param {...*} [value] The values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	     * // => [2, 3, 4]
	     */
	    function without(array) {
	      return baseDifference(array, slice(arguments, 1));
	    }

	    /**
	     * Creates an array that is the symmetric difference of the provided arrays.
	     * See http://en.wikipedia.org/wiki/Symmetric_difference.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of values.
	     * @example
	     *
	     * _.xor([1, 2, 3], [5, 2, 1, 4]);
	     * // => [3, 5, 4]
	     *
	     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
	     * // => [1, 4, 5]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;

	      while (++index < length) {
	        var array = arguments[index];
	        if (isArray(array) || isArguments(array)) {
	          var result = result
	            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
	            : array;
	        }
	      }
	      return result || [];
	    }

	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second
	     * elements of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @alias unzip
	     * @category Arrays
	     * @param {...Array} [array] Arrays to process.
	     * @returns {Array} Returns a new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    function zip() {
	      var array = arguments.length > 1 ? arguments : arguments[0],
	          index = -1,
	          length = array ? max(pluck(array, 'length')) : 0,
	          result = Array(length < 0 ? 0 : length);

	      while (++index < length) {
	        result[index] = pluck(array, index);
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed from arrays of `keys` and `values`. Provide
	     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
	     * or two arrays, one of `keys` and one of corresponding `values`.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Arrays
	     * @param {Array} keys The array of keys.
	     * @param {Array} [values=[]] The array of values.
	     * @returns {Object} Returns an object composed of the given keys and
	     *  corresponding values.
	     * @example
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(keys, values) {
	      var index = -1,
	          length = keys ? keys.length : 0,
	          result = {};

	      if (!values && length && !isArray(keys[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = keys[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a function that executes `func`, with  the `this` binding and
	     * arguments of the created function, only after being called `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {number} n The number of times the function must be called before
	     *  `func` is executed.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('Done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'Done saving!', after all saves have completed
	     */
	    function after(n, func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }

	    /**
	     * Creates a function that, when called, invokes `func` with the `this`
	     * binding of `thisArg` and prepends any additional `bind` arguments to those
	     * provided to the bound function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var func = function(greeting) {
	     *   return greeting + ' ' + this.name;
	     * };
	     *
	     * func = _.bind(func, { 'name': 'fred' }, 'hi');
	     * func();
	     * // => 'hi fred'
	     */
	    function bind(func, thisArg) {
	      return arguments.length > 2
	        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	        : createWrapper(func, 1, null, null, thisArg);
	    }

	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all the function properties
	     * of `object` will be bound.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...string} [methodName] The object method names to
	     *  bind, specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() { console.log('clicked ' + this.label); }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs', when the button is clicked
	     */
	    function bindAll(object) {
	      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
	          index = -1,
	          length = funcs.length;

	      while (++index < length) {
	        var key = funcs[index];
	        object[key] = createWrapper(object[key], 1, null, null, object);
	      }
	      return object;
	    }

	    /**
	     * Creates a function that, when called, invokes the method at `object[key]`
	     * and prepends any additional `bindKey` arguments to those provided to the bound
	     * function. This method differs from `_.bind` by allowing bound functions to
	     * reference methods that will be redefined or don't yet exist.
	     * See http://michaux.ca/articles/lazy-function-definition-pattern.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'name': 'fred',
	     *   'greet': function(greeting) {
	     *     return greeting + ' ' + this.name;
	     *   }
	     * };
	     *
	     * var func = _.bindKey(object, 'greet', 'hi');
	     * func();
	     * // => 'hi fred'
	     *
	     * object.greet = function(greeting) {
	     *   return greeting + 'ya ' + this.name + '!';
	     * };
	     *
	     * func();
	     * // => 'hiya fred!'
	     */
	    function bindKey(object, key) {
	      return arguments.length > 2
	        ? createWrapper(key, 19, slice(arguments, 2), null, object)
	        : createWrapper(key, 3, null, null, object);
	    }

	    /**
	     * Creates a function that is the composition of the provided functions,
	     * where each function consumes the return value of the function that follows.
	     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	     * Each function is executed with the `this` binding of the composed function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {...Function} [func] Functions to compose.
	     * @returns {Function} Returns the new composed function.
	     * @example
	     *
	     * var realNameMap = {
	     *   'pebbles': 'penelope'
	     * };
	     *
	     * var format = function(name) {
	     *   name = realNameMap[name.toLowerCase()] || name;
	     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	     * };
	     *
	     * var greet = function(formatted) {
	     *   return 'Hiya ' + formatted + '!';
	     * };
	     *
	     * var welcome = _.compose(greet, format);
	     * welcome('pebbles');
	     * // => 'Hiya Penelope!'
	     */
	    function compose() {
	      var funcs = arguments,
	          length = funcs.length;

	      while (length--) {
	        if (!isFunction(funcs[length])) {
	          throw new TypeError;
	        }
	      }
	      return function() {
	        var args = arguments,
	            length = funcs.length;

	        while (length--) {
	          args = [funcs[length].apply(this, args)];
	        }
	        return args[0];
	      };
	    }

	    /**
	     * Creates a function which accepts one or more arguments of `func` that when
	     * invoked either executes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` can be specified
	     * if `func.length` is not sufficient.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var curried = _.curry(function(a, b, c) {
	     *   console.log(a + b + c);
	     * });
	     *
	     * curried(1)(2)(3);
	     * // => 6
	     *
	     * curried(1, 2)(3);
	     * // => 6
	     *
	     * curried(1, 2, 3);
	     * // => 6
	     */
	    function curry(func, arity) {
	      arity = typeof arity == 'number' ? arity : (+arity || func.length);
	      return createWrapper(func, 4, null, null, null, arity);
	    }

	    /**
	     * Creates a function that will delay the execution of `func` until after
	     * `wait` milliseconds have elapsed since the last time it was invoked.
	     * Provide an options object to indicate that `func` should be invoked on
	     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
	     * to the debounced function will return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to debounce.
	     * @param {number} wait The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * var lazyLayout = _.debounce(calculateLayout, 150);
	     * jQuery(window).on('resize', lazyLayout);
	     *
	     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * });
	     *
	     * // ensure `batchLog` is executed once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * source.addEventListener('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }, false);
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      wait = nativeMax(0, wait) || 0;
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = options.leading;
	        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      var delayed = function() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0) {
	          if (maxTimeoutId) {
	            clearTimeout(maxTimeoutId);
	          }
	          var isCalled = trailingCall;
	          maxTimeoutId = timeoutId = trailingCall = undefined;
	          if (isCalled) {
	            lastCalled = now();
	            result = func.apply(thisArg, args);
	            if (!timeoutId && !maxTimeoutId) {
	              args = thisArg = null;
	            }
	          }
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      };

	      var maxDelayed = function() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (trailing || (maxWait !== wait)) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = null;
	          }
	        }
	      };

	      return function() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);

	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0;

	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	        return result;
	      };
	    }

	    /**
	     * Defers executing the `func` function until the current call stack has cleared.
	     * Additional arguments will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to defer.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) { console.log(text); }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    function defer(func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 1);
	      return setTimeout(function() { func.apply(undefined, args); }, 1);
	    }

	    /**
	     * Executes the `func` function after `wait` milliseconds. Additional arguments
	     * will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay execution.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) { console.log(text); }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    function delay(func, wait) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 2);
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }

	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it will be used to determine the cache key for storing the result
	     * based on the arguments provided to the memoized function. By default, the
	     * first argument provided to the memoized function is used as the cache key.
	     * The `func` is executed with the `this` binding of the memoized function.
	     * The result cache is exposed as the `cache` property on the memoized function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] A function used to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var fibonacci = _.memoize(function(n) {
	     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	     * });
	     *
	     * fibonacci(9)
	     * // => 34
	     *
	     * var data = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // modifying the result cache
	     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
	     * get('pebbles');
	     * // => { 'name': 'pebbles', 'age': 1 }
	     *
	     * get.cache.pebbles.name = 'penelope';
	     * get('pebbles');
	     * // => { 'name': 'penelope', 'age': 1 }
	     */
	    function memoize(func, resolver) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var memoized = function() {
	        var cache = memoized.cache,
	            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

	        return hasOwnProperty.call(cache, key)
	          ? cache[key]
	          : (cache[key] = func.apply(this, arguments));
	      }
	      memoized.cache = {};
	      return memoized;
	    }

	    /**
	     * Creates a function that is restricted to execute `func` once. Repeat calls to
	     * the function will return the value of the first call. The `func` is executed
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` executes `createApplication` once
	     */
	    function once(func) {
	      var ran,
	          result;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (ran) {
	          return result;
	        }
	        ran = true;
	        result = func.apply(this, arguments);

	        // clear the `func` variable so the function may be garbage collected
	        func = null;
	        return result;
	      };
	    }

	    /**
	     * Creates a function that, when called, invokes `func` with any additional
	     * `partial` arguments prepended to those provided to the new function. This
	     * method is similar to `_.bind` except it does **not** alter the `this` binding.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) { return greeting + ' ' + name; };
	     * var hi = _.partial(greet, 'hi');
	     * hi('fred');
	     * // => 'hi fred'
	     */
	    function partial(func) {
	      return createWrapper(func, 16, slice(arguments, 1));
	    }

	    /**
	     * This method is like `_.partial` except that `partial` arguments are
	     * appended to those provided to the new function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	     *
	     * var options = {
	     *   'variable': 'data',
	     *   'imports': { 'jq': $ }
	     * };
	     *
	     * defaultsDeep(options, _.templateSettings);
	     *
	     * options.variable
	     * // => 'data'
	     *
	     * options.imports
	     * // => { '_': _, 'jq': $ }
	     */
	    function partialRight(func) {
	      return createWrapper(func, 32, null, slice(arguments, 1));
	    }

	    /**
	     * Creates a function that, when executed, will only call the `func` function
	     * at most once per every `wait` milliseconds. Provide an options object to
	     * indicate that `func` should be invoked on the leading and/or trailing edge
	     * of the `wait` timeout. Subsequent calls to the throttled function will
	     * return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to throttle.
	     * @param {number} wait The number of milliseconds to throttle executions to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * var throttled = _.throttle(updatePosition, 100);
	     * jQuery(window).on('scroll', throttled);
	     *
	     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? options.leading : leading;
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      debounceOptions.leading = leading;
	      debounceOptions.maxWait = wait;
	      debounceOptions.trailing = trailing;

	      return debounce(func, wait, debounceOptions);
	    }

	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Additional arguments provided to the function are appended
	     * to those provided to the wrapper function. The wrapper is executed with
	     * the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('Fred, Wilma, & Pebbles');
	     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      return createWrapper(wrapper, 16, [value]);
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var getter = _.constant(object);
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }

	    /**
	     * Produces a callback bound to an optional `thisArg`. If `func` is a property
	     * name the created callback will return the property value for a given element.
	     * If `func` is an object the created callback will return `true` for elements
	     * that contain the equivalent object properties, otherwise it will return `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
	     *   return !match ? func(callback, thisArg) : function(object) {
	     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(characters, 'age__gt38');
	     * // => [{ 'name': 'fred', 'age': 40 }]
	     */
	    function createCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (func == null || type == 'function') {
	        return baseCreateCallback(func, thisArg, argCount);
	      }
	      // handle "_.pluck" style callback shorthands
	      if (type != 'object') {
	        return property(func);
	      }
	      var props = keys(func),
	          key = props[0],
	          a = func[key];

	      // handle "_.where" style callback shorthands
	      if (props.length == 1 && a === a && !isObject(a)) {
	        // fast path the common case of providing an object with a single
	        // property containing a primitive value
	        return function(object) {
	          var b = object[key];
	          return a === b && (a !== 0 || (1 / a == 1 / b));
	        };
	      }
	      return function(object) {
	        var length = props.length,
	            result = false;

	        while (length--) {
	          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }

	    /**
	     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	     * corresponding HTML entities.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('Fred, Wilma, & Pebbles');
	     * // => 'Fred, Wilma, &amp; Pebbles'
	     */
	    function escape(string) {
	      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	    }

	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }

	    /**
	     * Adds function properties of a source object to the destination object.
	     * If `object` is a function methods will be added to its prototype as well.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Function|Object} [object=lodash] object The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
	     * @example
	     *
	     * function capitalize(string) {
	     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	     * }
	     *
	     * _.mixin({ 'capitalize': capitalize });
	     * _.capitalize('fred');
	     * // => 'Fred'
	     *
	     * _('fred').capitalize().value();
	     * // => 'Fred'
	     *
	     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
	     * _('fred').capitalize();
	     * // => 'Fred'
	     */
	    function mixin(object, source, options) {
	      var chain = true,
	          methodNames = source && functions(source);

	      if (!source || (!options && !methodNames.length)) {
	        if (options == null) {
	          options = source;
	        }
	        ctor = lodashWrapper;
	        source = object;
	        object = lodash;
	        methodNames = functions(source);
	      }
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      var ctor = object,
	          isFunc = isFunction(ctor);

	      forEach(methodNames, function(methodName) {
	        var func = object[methodName] = source[methodName];
	        if (isFunc) {
	          ctor.prototype[methodName] = function() {
	            var chainAll = this.__chain__,
	                value = this.__wrapped__,
	                args = [value];

	            push.apply(args, arguments);
	            var result = func.apply(object, args);
	            if (chain || chainAll) {
	              if (value === result && isObject(result)) {
	                return this;
	              }
	              result = new ctor(result);
	              result.__chain__ = chainAll;
	            }
	            return result;
	          };
	        }
	      });
	    }

	    /**
	     * Reverts the '_' variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      context._ = oldDash;
	      return this;
	    }

	    /**
	     * A no-operation function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // no operation performed
	    }

	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var stamp = _.now();
	     * _.defer(function() { console.log(_.now() - stamp); });
	     * // => logs the number of milliseconds it took for the deferred function to be called
	     */
	    var now = isNative(now = Date.now) && now || function() {
	      return new Date().getTime();
	    };

	    /**
	     * Converts the given value into an integer of the specified radix.
	     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
	     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
	     * implementations. See http://es5.github.io/#E.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} value The value to parse.
	     * @param {number} [radix] The radix used to interpret the value to parse.
	     * @returns {number} Returns the new integer value.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     */
	    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
	      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
	      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
	    };

	    /**
	     * Creates a "_.pluck" style function, which returns the `key` value of a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'fred',   'age': 40 },
	     *   { 'name': 'barney', 'age': 36 }
	     * ];
	     *
	     * var getName = _.property('name');
	     *
	     * _.map(characters, getName);
	     * // => ['barney', 'fred']
	     *
	     * _.sortBy(characters, getName);
	     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
	     */
	    function property(key) {
	      return function(object) {
	        return object[key];
	      };
	    }

	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number will be
	     * returned. If `floating` is truey or either `min` or `max` are floats a
	     * floating-point number will be returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating=false] Specify returning a floating-point number.
	     * @returns {number} Returns a random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      var noMin = min == null,
	          noMax = max == null;

	      if (floating == null) {
	        if (typeof min == 'boolean' && noMax) {
	          floating = min;
	          min = 1;
	        }
	        else if (!noMax && typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }

	    /**
	     * Resolves the value of property `key` on `object`. If `key` is a function
	     * it will be invoked with the `this` binding of `object` and its result returned,
	     * else the property value is returned. If `object` is falsey then `undefined`
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to resolve.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = {
	     *   'cheese': 'crumpets',
	     *   'stuff': function() {
	     *     return 'nonsense';
	     *   }
	     * };
	     *
	     * _.result(object, 'cheese');
	     * // => 'crumpets'
	     *
	     * _.result(object, 'stuff');
	     * // => 'nonsense'
	     */
	    function result(object, key) {
	      if (object) {
	        var value = object[key];
	        return isFunction(value) ? object[key]() : value;
	      }
	    }

	    /**
	     * A micro-templating method that handles arbitrary delimiters, preserves
	     * whitespace, and correctly escapes quotes within interpolated code.
	     *
	     * Note: In the development build, `_.template` utilizes sourceURLs for easier
	     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	     *
	     * For more information on precompiling templates see:
	     * http://lodash.com/custom-builds
	     *
	     * For more information on Chrome extension sandboxes see:
	     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} text The template text.
	     * @param {Object} data The data object used to populate the text.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as local variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [variable] The data object variable name.
	     * @returns {Function|string} Returns a compiled function when no `data` object
	     *  is given, else it returns the interpolated text.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= name %>');
	     * compiled({ 'name': 'fred' });
	     * // => 'hello fred'
	     *
	     * // using the "escape" delimiter to escape HTML in data property values
	     * _.template('<b><%- value %></b>', { 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to generate HTML
	     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	     * _.template('hello ${ name }', { 'name': 'pebbles' });
	     * // => 'hello pebbles'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using a custom template delimiters
	     * _.templateSettings = {
	     *   'interpolate': /{{([\s\S]+?)}}/g
	     * };
	     *
	     * _.template('hello {{ name }}!', { 'name': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using the `imports` option to import jQuery
	     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     *   var __t, __p = '', __e = _.escape;
	     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	     *   return __p;
	     * }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(text, data, options) {
	      // based on John Resig's `tmpl` implementation
	      // http://ejohn.org/blog/javascript-micro-templating/
	      // and Laura Doktorova's doT.js
	      // https://github.com/olado/doT
	      var settings = lodash.templateSettings;
	      text = String(text || '');

	      // avoid missing dependencies when `iteratorTemplate` is not defined
	      options = defaults({}, options, settings);

	      var imports = defaults({}, options.imports, settings.imports),
	          importsKeys = keys(imports),
	          importsValues = values(imports);

	      var isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";

	      // compile the regexp to match each delimiter
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');

	      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);

	        // escape characters that cannot be included in string literals
	        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	        // replace delimiters with snippets
	        if (escapeValue) {
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;

	        // the JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value
	        return match;
	      });

	      source += "';\n";

	      // if `variable` is not specified, wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain
	      var variable = options.variable,
	          hasVariable = variable;

	      if (!hasVariable) {
	        variable = 'obj';
	        source = 'with (' + variable + ') {\n' + source + '\n}\n';
	      }
	      // cleanup code by stripping empty strings
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');

	      // frame code as the function body
	      source = 'function(' + variable + ') {\n' +
	        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	        "var __t, __p = '', __e = _.escape" +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';

	      // Use a sourceURL for easier debugging.
	      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

	      try {
	        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	      } catch(e) {
	        e.source = source;
	        throw e;
	      }
	      if (data) {
	        return result(data);
	      }
	      // provide the compiled function's source by its `toString` method, in
	      // supported environments, or the `source` property as a convenience for
	      // inlining compiled templates during the build process
	      result.source = source;
	      return result;
	    }

	    /**
	     * Executes the callback `n` times, returning an array of the results
	     * of each callback execution. The callback is bound to `thisArg` and invoked
	     * with one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} n The number of times to execute the callback.
	     * @param {Function} callback The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns an array of the results of each `callback` execution.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) { mage.castSpell(n); });
	     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	     *
	     * _.times(3, function(n) { this.cast(n); }, mage);
	     * // => also calls `mage.castSpell(n)` three times
	     */
	    function times(n, callback, thisArg) {
	      n = (n = +n) > -1 ? n : 0;
	      var index = -1,
	          result = Array(n);

	      callback = baseCreateCallback(callback, thisArg, 1);
	      while (++index < n) {
	        result[index] = callback(index);
	      }
	      return result;
	    }

	    /**
	     * The inverse of `_.escape` this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	     * corresponding characters.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('Fred, Barney &amp; Pebbles');
	     * // => 'Fred, Barney & Pebbles'
	     */
	    function unescape(string) {
	      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
	    }

	    /**
	     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return String(prefix == null ? '' : prefix) + id;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object that wraps the given value with explicit
	     * method chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(characters)
	     *     .sortBy('age')
	     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
	     *     .first()
	     *     .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      value = new lodashWrapper(value);
	      value.__chain__ = true;
	      return value;
	    }

	    /**
	     * Invokes `interceptor` with the `value` as the first argument and then
	     * returns `value`. The purpose of this method is to "tap into" a method
	     * chain in order to perform operations on intermediate results within
	     * the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3, 4])
	     *  .tap(function(array) { array.pop(); })
	     *  .reverse()
	     *  .value();
	     * // => [3, 2, 1]
	     */
	    function tap(value, interceptor) {
	      interceptor(value);
	      return value;
	    }

	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chaining
	     * @returns {*} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(characters).first();
	     * // => { 'name': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(characters).chain()
	     *   .first()
	     *   .pick('age')
	     *   .value();
	     * // => { 'age': 36 }
	     */
	    function wrapperChain() {
	      this.__chain__ = true;
	      return this;
	    }

	    /**
	     * Produces the `toString` result of the wrapped value.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chaining
	     * @returns {string} Returns the string result.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return String(this.__wrapped__);
	    }

	    /**
	     * Extracts the wrapped value.
	     *
	     * @name valueOf
	     * @memberOf _
	     * @alias value
	     * @category Chaining
	     * @returns {*} Returns the wrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).valueOf();
	     * // => [1, 2, 3]
	     */
	    function wrapperValueOf() {
	      return this.__wrapped__;
	    }

	    /*--------------------------------------------------------------------------*/

	    // add functions that return wrapped values when chaining
	    lodash.after = after;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.chain = chain;
	    lodash.compact = compact;
	    lodash.compose = compose;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.createCallback = createCallback;
	    lodash.curry = curry;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.map = map;
	    lodash.mapValues = mapValues;
	    lodash.max = max;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.min = min;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.pull = pull;
	    lodash.range = range;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.shuffle = shuffle;
	    lodash.sortBy = sortBy;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.values = values;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;

	    // add aliases
	    lodash.collect = map;
	    lodash.drop = rest;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;
	    lodash.unzip = zip;

	    // add functions to `lodash.prototype`
	    mixin(lodash);

	    /*--------------------------------------------------------------------------*/

	    // add functions that return unwrapped values when chaining
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.contains = contains;
	    lodash.escape = escape;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.indexOf = indexOf;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isNaN = isNaN;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isUndefined = isUndefined;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.mixin = mixin;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.result = result;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.template = template;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;

	    // add aliases
	    lodash.all = every;
	    lodash.any = some;
	    lodash.detect = find;
	    lodash.findWhere = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.include = contains;
	    lodash.inject = reduce;

	    mixin(function() {
	      var source = {}
	      forOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }(), false);

	    /*--------------------------------------------------------------------------*/

	    // add functions capable of returning wrapped and unwrapped values when chaining
	    lodash.first = first;
	    lodash.last = last;
	    lodash.sample = sample;

	    // add aliases
	    lodash.take = first;
	    lodash.head = first;

	    forOwn(lodash, function(func, methodName) {
	      var callbackable = methodName !== 'sample';
	      if (!lodash.prototype[methodName]) {
	        lodash.prototype[methodName]= function(n, guard) {
	          var chainAll = this.__chain__,
	              result = func(this.__wrapped__, n, guard);

	          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
	            ? result
	            : new lodashWrapper(result, chainAll);
	        };
	      }
	    });

	    /*--------------------------------------------------------------------------*/

	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = '2.4.1';

	    // add "Chaining" functions to the wrapper
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.value = wrapperValueOf;
	    lodash.prototype.valueOf = wrapperValueOf;

	    // add `Array` functions that return unwrapped values
	    forEach(['join', 'pop', 'shift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        var chainAll = this.__chain__,
	            result = func.apply(this.__wrapped__, arguments);

	        return chainAll
	          ? new lodashWrapper(result, chainAll)
	          : result;
	      };
	    });

	    // add `Array` functions that return the existing wrapped value
	    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        func.apply(this.__wrapped__, arguments);
	        return this;
	      };
	    });

	    // add `Array` functions that return new wrapped values
	    forEach(['concat', 'slice', 'splice'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
	      };
	    });

	    return lodash;
	  }

	  /*--------------------------------------------------------------------------*/

	  // expose Lo-Dash
	  var _ = runInContext();

	  // some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash is loaded with a RequireJS shim config.
	    // See http://requirejs.org/docs/api.html#config-shim
	    root._ = _;

	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // in Narwhal or Rhino -require
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    root._ = _;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Add shim config for configuring the dependencies and exports for
	 * older, traditional "browser globals" scripts that do not use define()
	 * to declare the dependencies and set a module value.
	 */
	(function(seajs, global) {

	  // seajs.config({
	  // alias: {
	  //   "jquery": {
	  //     src: "lib/jquery.js",
	  //     exports: "jQuery" or function
	  //   },
	  //   "jquery.easing": {
	  //     src: "lib/jquery.easing.js",
	  //     deps: ["jquery"]
	  //   }
	  // })

	  seajs.on("config", onConfig)
	  onConfig(seajs.config.data)

	  function onConfig(data) {
	    if (!data) return
	    var alias = data.alias

	    for (var id in alias) {
	      (function(item) {
	        if (typeof item === "string") return

	        // Set dependencies
	        item.src && item.deps && __webpack_require__(9)(item.src, item.deps)

	        // Define the proxy cmd module
	        __webpack_require__(9)(id, item.src ? [seajs.resolve(item.src)] : item.deps || [],
	            function() {
	              var exports = item.exports
	              return typeof exports === "function" ? exports() :
	                  typeof exports === "string" ? global[exports] :
	                      exports
	            })
	      })(alias[id])
	    }
	  }


	  !([], module.exports = {})

	})(seajs, typeof global === "undefined" ? this : global);


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Sea.js 2.0.1 | seajs.org/LICENSE.md
	 */
	(function(global, undefined) {

	// Avoid conflicting when `sea.js` is loaded multiple times
	var _seajs = global.seajs
	if (_seajs && _seajs.version) {
	  return
	}

	var seajs = global.seajs = {
	  // The current version of Sea.js being used
	  version: "2.0.1"
	}


	/**
	 * util-lang.js - The minimal language enhancement
	 */

	function isType(type) {
	  return function(obj) {
	    return Object.prototype.toString.call(obj) === "[object " + type + "]"
	  }
	}

	var isObject = isType("Object")
	var isString = isType("String")
	var isArray = Array.isArray || isType("Array")
	var isFunction = isType("Function")


	/**
	 * util-log.js - The tiny log function
	 */

	// The safe wrapper for `console.xxx` functions
	// log("message") ==> console.log("message")
	// log("message", "warn") ==> console.warn("message")
	var log = seajs.log = function(msg, type) {

	  global.console &&
	      // Do NOT print `log(msg)` in non-debug mode
	      (type || configData.debug) &&
	      // Set the default value of type
	      (console[type || (type = "log")]) &&
	      // Call native method of console
	      console[type](msg)
	}


	/**
	 * util-events.js - The minimal events support
	 */

	var eventsCache = seajs.events = {}

	// Bind event
	seajs.on = function(event, callback) {
	  if (!callback) return seajs

	  var list = eventsCache[event] || (eventsCache[event] = [])
	  list.push(callback)

	  return seajs
	}

	// Remove event. If `callback` is undefined, remove all callbacks for the
	// event. If `event` and `callback` are both undefined, remove all callbacks
	// for all events
	seajs.off = function(event, callback) {
	  // Remove *all* events
	  if (!(event || callback)) {
	    seajs.events = eventsCache = {}
	    return seajs
	  }

	  var list = eventsCache[event]
	  if (list) {
	    if (callback) {
	      for (var i = list.length - 1; i >= 0; i--) {
	        if (list[i] === callback) {
	          list.splice(i, 1)
	        }
	      }
	    }
	    else {
	      delete eventsCache[event]
	    }
	  }

	  return seajs
	}

	// Emit event, firing all bound callbacks. Callbacks are passed the same
	// arguments as `emit` is, apart from the event name
	var emit = seajs.emit = function(event, data) {
	  var list = eventsCache[event], fn

	  if (list) {
	    // Copy callback lists to prevent modification
	    list = list.slice()

	    // Execute event callbacks
	    while ((fn = list.shift())) {
	      fn(data)
	    }
	  }

	  return seajs
	}


	/**
	 * util-path.js - The utilities for operating path such as id, uri
	 */

	var DIRNAME_RE = /[^?#]*\//

	var DOT_RE = /\/\.\//g
	var MULTIPLE_SLASH_RE = /([^:\/])\/\/+/g
	var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//

	var URI_END_RE = /\?|\.(?:css|js)$|\/$/
	var HASH_END_RE = /#$/

	// Extract the directory portion of a path
	// dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
	// ref: http://jsperf.com/regex-vs-split/2
	function dirname(path) {
	  return path.match(DIRNAME_RE)[0]
	}

	// Canonicalize a path
	// realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
	function realpath(path) {
	  // /a/b/./c/./d ==> /a/b/c/d
	  path = path.replace(DOT_RE, "/")

	  // "file:///a//b/c"  ==> "file:///a/b/c"
	  // "http://a//b/c"   ==> "http://a/b/c"
	  // "https://a//b/c"  ==> "https://a/b/c"
	  // "/a/b//"          ==> "/a/b/"
	  path = path.replace(MULTIPLE_SLASH_RE, "$1\/")

	  // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
	  while (path.match(DOUBLE_DOT_RE)) {
	    path = path.replace(DOUBLE_DOT_RE, "/")
	  }

	  return path
	}

	// Normalize an uri
	// normalize("path/to/a") ==> "path/to/a.js"
	function normalize(uri) {
	  // Call realpath() before adding extension, so that most of uris will
	  // contains no `.` and will just return in realpath() call
	  uri = realpath(uri)

	  // Add the default `.js` extension except that the uri ends with `#`
	  if (HASH_END_RE.test(uri)) {
	    uri = uri.slice(0, -1)
	  }
	  else if (!URI_END_RE.test(uri)) {
	    uri += ".js"
	  }

	  // issue #256: fix `:80` bug in IE
	  return uri.replace(":80/", "/")
	}


	var PATHS_RE = /^([^/:]+)(\/.+)$/
	var VARS_RE = /{([^{]+)}/g

	function parseAlias(id) {
	  var alias = configData.alias
	  return alias && isString(alias[id]) ? alias[id] : id
	}

	function parsePaths(id) {
	  var paths = configData.paths
	  var m

	  if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
	    id = paths[m[1]] + m[2]
	  }

	  return id
	}

	function parseVars(id) {
	  var vars = configData.vars

	  if (vars && id.indexOf("{") > -1) {
	    id = id.replace(VARS_RE, function(m, key) {
	      return isString(vars[key]) ? vars[key] : m
	    })
	  }

	  return id
	}

	function parseMap(uri) {
	  var map = configData.map
	  var ret = uri

	  if (map) {
	    for (var i = 0; i < map.length; i++) {
	      var rule = map[i]

	      ret = isFunction(rule) ?
	          (rule(uri) || uri) :
	          uri.replace(rule[0], rule[1])

	      // Only apply the first matched rule
	      if (ret !== uri) break
	    }
	  }

	  return ret
	}


	var ABSOLUTE_RE = /^\/\/.|:\//
	var RELATIVE_RE = /^\./
	var ROOT_RE = /^\//

	function isAbsolute(id) {
	  return ABSOLUTE_RE.test(id)
	}

	function isRelative(id) {
	  return RELATIVE_RE.test(id)
	}

	function isRoot(id) {
	  return ROOT_RE.test(id)
	}


	var ROOT_DIR_RE = /^.*?\/\/.*?\//

	function addBase(id, refUri) {
	  var ret

	  if (isAbsolute(id)) {
	    ret = id
	  }
	  else if (isRelative(id)) {
	    ret = dirname(refUri || cwd) + id
	  }
	  else if (isRoot(id)) {
	    ret = (cwd.match(ROOT_DIR_RE) || ["/"])[0] + id.substring(1)
	  }
	  // top-level id
	  else {
	    ret = configData.base + id
	  }

	  return ret
	}

	function id2Uri(id, refUri) {
	  if (!id) return ""

	  id = parseAlias(id)
	  id = parsePaths(id)
	  id = parseVars(id)
	  id = addBase(id, refUri)
	  id = normalize(id)
	  id = parseMap(id)

	  return id
	}


	var doc = document
	var loc = location
	var cwd = dirname(loc.href)
	var scripts = doc.getElementsByTagName("script")

	// Recommend to add `seajs-node` id for the `sea.js` script element
	var loaderScript = doc.getElementById("seajsnode") ||
	    scripts[scripts.length - 1]

	// When `sea.js` is inline, set loaderDir to current working directory
	var loaderDir = dirname(getScriptAbsoluteSrc(loaderScript) || cwd)

	function getScriptAbsoluteSrc(node) {
	  return node.hasAttribute ? // non-IE6/7
	      node.src :
	    // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
	      node.getAttribute("src", 4)
	}

	// Get/set current working directory
	seajs.cwd = function(val) {
	  return val ? (cwd = realpath(val + "/")) : cwd
	}

	seajs.dir = loaderDir


	/**
	 * util-request.js - The utilities for requesting script and style files
	 * ref: tests/research/load-js-css/test.html
	 */

	var head = doc.getElementsByTagName("head")[0] || doc.documentElement
	var baseElement = head.getElementsByTagName("base")[0]

	var IS_CSS_RE = /\.css(?:\?|$)/i
	var READY_STATE_RE = /^(?:loaded|complete|undefined)$/

	var currentlyAddingScript
	var interactiveScript

	// `onload` event is supported in WebKit < 535.23 and Firefox < 9.0
	// ref:
	//  - https://bugs.webkit.org/show_activity.cgi?id=38995
	//  - https://bugzilla.mozilla.org/show_bug.cgi?id=185236
	//  - https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events
	var isOldWebKit = (navigator.userAgent
	    .replace(/.*AppleWebKit\/(\d+)\..*/, "$1")) * 1 < 536


	function request(url, callback, charset) {
	  var isCSS = IS_CSS_RE.test(url)
	  var node = doc.createElement(isCSS ? "link" : "script")

	  if (charset) {
	    var cs = isFunction(charset) ? charset(url) : charset
	    if (cs) {
	      node.charset = cs
	    }
	  }

	  addOnload(node, callback, isCSS)

	  if (isCSS) {
	    node.rel = "stylesheet"
	    node.href = url
	  }
	  else {
	    node.async = true
	    node.src = url
	  }

	  // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
	  // the end of the insert execution, so use `currentlyAddingScript` to
	  // hold current node, for deriving url in `define` call
	  currentlyAddingScript = node

	  // ref: #185 & http://dev.jquery.com/ticket/2709
	  baseElement ?
	      head.insertBefore(node, baseElement) :
	      head.appendChild(node)

	  currentlyAddingScript = undefined
	}

	function addOnload(node, callback, isCSS) {
	  var missingOnload = isCSS && (isOldWebKit || !("onload" in node))

	  // for Old WebKit and Old Firefox
	  if (missingOnload) {
	    setTimeout(function() {
	      pollCss(node, callback)
	    }, 1) // Begin after node insertion
	    return
	  }

	  node.onload = node.onerror = node.onreadystatechange = function() {
	    if (READY_STATE_RE.test(node.readyState)) {

	      // Ensure only run once and handle memory leak in IE
	      node.onload = node.onerror = node.onreadystatechange = null

	      // Remove the script to reduce memory leak
	      if (!isCSS && !configData.debug) {
	        head.removeChild(node)
	      }

	      // Dereference the node
	      node = undefined

	      callback()
	    }
	  }
	}

	function pollCss(node, callback) {
	  var sheet = node.sheet
	  var isLoaded

	  // for WebKit < 536
	  if (isOldWebKit) {
	    if (sheet) {
	      isLoaded = true
	    }
	  }
	  // for Firefox < 9.0
	  else if (sheet) {
	    try {
	      if (sheet.cssRules) {
	        isLoaded = true
	      }
	    } catch (ex) {
	      // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
	      // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
	      // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
	      if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
	        isLoaded = true
	      }
	    }
	  }

	  setTimeout(function() {
	    if (isLoaded) {
	      // Place callback here to give time for style rendering
	      callback()
	    }
	    else {
	      pollCss(node, callback)
	    }
	  }, 20)
	}

	function getCurrentScript() {
	  if (currentlyAddingScript) {
	    return currentlyAddingScript
	  }

	  // For IE6-9 browsers, the script onload event may not fire right
	  // after the the script is evaluated. Kris Zyp found that it
	  // could query the script nodes and the one that is in "interactive"
	  // mode indicates the current script
	  // ref: http://goo.gl/JHfFW
	  if (interactiveScript && interactiveScript.readyState === "interactive") {
	    return interactiveScript
	  }

	  var scripts = head.getElementsByTagName("script")

	  for (var i = scripts.length - 1; i >= 0; i--) {
	    var script = scripts[i]
	    if (script.readyState === "interactive") {
	      interactiveScript = script
	      return interactiveScript
	    }
	  }
	}


	/**
	 * util-deps.js - The parser for dependencies
	 * ref: tests/research/parse-dependencies/test.html
	 */

	var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
	var SLASH_RE = /\\\\/g

	function parseDependencies(code) {
	  var ret = []

	  code.replace(SLASH_RE, "")
	      .replace(REQUIRE_RE, function(m, m1, m2) {
	        if (m2) {
	          ret.push(m2)
	        }
	      })

	  return ret
	}


	/**
	 * module.js - The core of module loader
	 */

	var cachedModules = seajs.cache = {}
	var anonymousModuleData

	var fetchingList = {}
	var fetchedList = {}
	var callbackList = {}
	var waitingsList = {}

	// 1 - The module file is being fetched now
	// 2 - The module data has been saved to cachedModules
	// 3 - The module and all its dependencies are ready to execute
	// 4 - The module is being executed
	// 5 - The module is executed and `module.exports` is available
	var STATUS_FETCHING = 1
	var STATUS_SAVED = 2
	var STATUS_LOADED = 3
	var STATUS_EXECUTING = 4
	var STATUS_EXECUTED = 5


	function Module(uri) {
	  this.uri = uri
	  this.dependencies = []
	  this.exports = null
	  this.status = 0
	}

	function resolve(ids, refUri) {
	  if (isArray(ids)) {
	    var ret = []
	    for (var i = 0; i < ids.length; i++) {
	      ret[i] = resolve(ids[i], refUri)
	    }
	    return ret
	  }

	  // Emit `resolve` event for plugins such as plugin-text
	  var data = { id: ids, refUri: refUri }
	  emit("resolve", data)

	  return data.uri || id2Uri(data.id, refUri)
	}

	function use(uris, callback) {
	  isArray(uris) || (uris = [uris])

	  load(uris, function() {
	    var exports = []

	    for (var i = 0; i < uris.length; i++) {
	      exports[i] = getExports(cachedModules[uris[i]])
	    }

	    if (callback) {
	      callback.apply(global, exports)
	    }
	  })
	}

	function load(uris, callback) {
	  var unloadedUris = getUnloadedUris(uris)

	  if (unloadedUris.length === 0) {
	    callback()
	    return
	  }

	  // Emit `load` event for plugins such as plugin-combo
	  emit("load", unloadedUris)

	  var len = unloadedUris.length
	  var remain = len

	  for (var i = 0; i < len; i++) {
	    (function(uri) {
	      var mod = cachedModules[uri]

	      if (mod.dependencies.length) {
	        loadWaitings(function(circular) {
	          mod.status < STATUS_SAVED ? fetch(uri, cb) : cb()
	          function cb() {
	            done(circular)
	          }
	        })
	      }
	      else {
	        mod.status < STATUS_SAVED ?
	            fetch(uri, loadWaitings) : done()
	      }

	      function loadWaitings(cb) {
	        cb || (cb = done)

	        var waitings = getUnloadedUris(mod.dependencies)
	        if (waitings.length === 0) {
	          cb()
	        }
	        // Break circular waiting callbacks
	        else if (isCircularWaiting(mod)) {
	          printCircularLog(circularStack)
	          circularStack.length = 0
	          cb(true)
	        }
	        // Load all unloaded dependencies
	        else {
	          waitingsList[uri] = waitings
	          load(waitings, cb)
	        }
	      }

	      function done(circular) {
	        if (!circular && mod.status < STATUS_LOADED) {
	          mod.status = STATUS_LOADED
	        }

	        if (--remain === 0) {
	          callback()
	        }
	      }

	    })(unloadedUris[i])
	  }
	}

	function fetch(uri, callback) {
	  cachedModules[uri].status = STATUS_FETCHING

	  // Emit `fetch` event for plugins such as plugin-combo
	  var data = { uri: uri }
	  emit("fetch", data)
	  var requestUri = data.requestUri || uri

	  if (fetchedList[requestUri]) {
	    callback()
	    return
	  }

	  if (fetchingList[requestUri]) {
	    callbackList[requestUri].push(callback)
	    return
	  }

	  fetchingList[requestUri] = true
	  callbackList[requestUri] = [callback]

	  // Emit `request` event for plugins such as plugin-text
	  var charset = configData.charset
	  emit("request", data = {
	    uri: uri,
	    requestUri: requestUri,
	    callback: onRequested,
	    charset: charset
	  })

	  if (!data.requested) {
	    request(data.requestUri, onRequested, charset)
	  }

	  function onRequested() {
	    delete fetchingList[requestUri]
	    fetchedList[requestUri] = true

	    // Save meta data of anonymous module
	    if (anonymousModuleData) {
	      save(uri, anonymousModuleData)
	      anonymousModuleData = undefined
	    }

	    // Call callbacks
	    var fn, fns = callbackList[requestUri]
	    delete callbackList[requestUri]
	    while ((fn = fns.shift())) fn()
	  }
	}

	function define(id, deps, factory) {
	  // define(factory)
	  if (arguments.length === 1) {
	    factory = id
	    id = undefined
	  }

	  // Parse dependencies according to the module factory code
	  if (!isArray(deps) && isFunction(factory)) {
	    deps = parseDependencies(factory.toString())
	  }

	  var data = { id: id, uri: resolve(id), deps: deps, factory: factory }

	  // Try to derive uri in IE6-9 for anonymous modules
	  if (!data.uri && doc.attachEvent) {
	    var script = getCurrentScript()

	    if (script) {
	      data.uri = script.src
	    }
	    else {
	      log("Failed to derive: " + factory)

	      // NOTE: If the id-deriving methods above is failed, then falls back
	      // to use onload event to get the uri
	    }
	  }

	  // Emit `define` event, used in plugin-nocache, seajs node version etc
	  emit("define", data)

	  data.uri ? save(data.uri, data) :
	      // Save information for "saving" work in the script onload event
	      anonymousModuleData = data
	}

	function save(uri, meta) {
	  var mod = getModule(uri)

	  // Do NOT override already saved modules
	  if (mod.status < STATUS_SAVED) {
	    // Let the id of anonymous module equal to its uri
	    mod.id = meta.id || uri

	    mod.dependencies = resolve(meta.deps || [], uri)
	    mod.factory = meta.factory

	    if (mod.factory !== undefined) {
	      mod.status = STATUS_SAVED
	    }
	  }
	}

	function exec(mod) {
	  // Return `null` when `mod` is invalid
	  if (!mod) {
	    return null
	  }

	  // When module is executed, DO NOT execute it again. When module
	  // is being executed, just return `module.exports` too, for avoiding
	  // circularly calling
	  if (mod.status >= STATUS_EXECUTING) {
	    return mod.exports
	  }

	  mod.status = STATUS_EXECUTING


	  function resolveInThisContext(id) {
	    return resolve(id, mod.uri)
	  }

	  function require(id) {
	    return getExports(cachedModules[resolveInThisContext(id)])
	  }

	  require.resolve = resolveInThisContext

	  require.async = function(ids, callback) {
	    use(resolveInThisContext(ids), callback)
	    return require
	  }


	  var factory = mod.factory

	  var exports = isFunction(factory) ?
	      factory(require, mod.exports = {}, mod) :
	      factory

	  mod.exports = exports === undefined ? mod.exports : exports
	  mod.status = STATUS_EXECUTED

	  return mod.exports
	}

	Module.prototype.destroy = function() {
	  delete cachedModules[this.uri]
	  delete fetchedList[this.uri]
	}


	// Helpers

	function getModule(uri) {
	  return cachedModules[uri] ||
	      (cachedModules[uri] = new Module(uri))
	}

	function getUnloadedUris(uris) {
	  var ret = []

	  for (var i = 0; i < uris.length; i++) {
	    var uri = uris[i]
	    if (uri && getModule(uri).status < STATUS_LOADED) {
	      ret.push(uri)
	    }
	  }

	  return ret
	}

	function getExports(mod) {
	  var exports = exec(mod)
	  if (exports === null && (!mod || !IS_CSS_RE.test(mod.uri))) {
	    emit("error", mod)
	  }
	  return exports
	}

	var circularStack = []

	function isCircularWaiting(mod) {
	  var waitings = waitingsList[mod.uri] || []
	  if (waitings.length === 0) {
	    return false
	  }

	  circularStack.push(mod.uri)
	  if (isOverlap(waitings, circularStack)) {
	    cutWaitings(waitings)
	    return true
	  }

	  for (var i = 0; i < waitings.length; i++) {
	    if (isCircularWaiting(cachedModules[waitings[i]])) {
	      return true
	    }
	  }

	  circularStack.pop()
	  return false
	}

	function isOverlap(arrA, arrB) {
	  for (var i = 0; i < arrA.length; i++) {
	    for (var j = 0; j < arrB.length; j++) {
	      if (arrB[j] === arrA[i]) {
	        return true
	      }
	    }
	  }
	  return false
	}

	function cutWaitings(waitings) {
	  var uri = circularStack[0]

	  for (var i = waitings.length - 1; i >= 0; i--) {
	    if (waitings[i] === uri) {
	      waitings.splice(i, 1)
	      break
	    }
	  }
	}

	function printCircularLog(stack) {
	  stack.push(stack[0])
	  log("Circular dependencies: " + stack.join(" -> "))
	}

	function preload(callback) {
	  var preloadMods = configData.preload
	  var len = preloadMods.length

	  if (len) {
	    use(resolve(preloadMods), function() {
	      // Remove the loaded preload modules
	      preloadMods.splice(0, len)

	      // Allow preload modules to add new preload modules
	      preload(callback)
	    })
	  }
	  else {
	    callback()
	  }
	}


	// Public API

	seajs.use = function(ids, callback) {
	  // Load preload modules before all other modules
	  preload(function() {
	    use(resolve(ids), callback)
	  })
	  return seajs
	}

	Module.load = use
	seajs.resolve = id2Uri
	global.define = define

	seajs.require = function(id) {
	  return (cachedModules[id2Uri(id)] || {}).exports
	}


	/**
	 * config.js - The configuration for the loader
	 */

	var configData = config.data = {
	  // The root path to use for id2uri parsing
	  base: (function() {
	    var ret = loaderDir

	    // If loaderUri is `http://test.com/libs/seajs/[seajs/1.2.3/]sea.js`, the
	    // baseUri should be `http://test.com/libs/`
	    var m = ret.match(/^(.+?\/)(?:seajs\/)+(?:\d[^/]+\/)?$/)
	    if (m) {
	      ret = m[1]
	    }

	    return ret
	  })(),

	  // The charset for requesting files
	  charset: "utf-8",

	  // Modules that are needed to load before all other modules
	  preload: []

	  // debug - Debug mode. The default value is false
	  // alias - An object containing shorthands of module id
	  // paths - An object containing path shorthands in module id
	  // vars - The {xxx} variables in module id
	  // map - An array containing rules to map module uri
	  // plugins - An array containing needed plugins
	}

	function config(data) {
	  for (var key in data) {
	    var curr = data[key]

	    // Convert plugins to preload config
	    if (curr && key === "plugins") {
	      key = "preload"
	      curr = plugin2preload(curr)
	    }

	    var prev = configData[key]

	    // Merge object config such as alias, vars
	    if (prev && isObject(prev)) {
	      for (var k in curr) {
	        prev[k] = curr[k]
	      }
	    }
	    else {
	      // Concat array config such as map, preload
	      if (isArray(prev)) {
	        curr = prev.concat(curr)
	      }
	      // Make sure that `configData.base` is an absolute directory
	      else if (key === "base") {
	        curr = normalize(addBase(curr + "/"))
	      }

	      // Set config
	      configData[key] = curr
	    }
	  }

	  emit("config", data)
	  return seajs
	}

	seajs.config = config

	function plugin2preload(arr) {
	  var ret = [], name

	  while ((name = arr.shift())) {
	    ret.push(loaderDir + "plugin-" + name)
	  }
	  return ret
	}


	/**
	 * bootstrap.js - Initialize the plugins and load the entry module
	 */

	config({
	  // Get initial plugins
	  plugins: (function() {
	    var ret

	    // Convert `seajs-xxx` to `seajs-xxx=1`
	    // NOTE: use `seajs-xxx=1` flag in url or cookie to enable `plugin-xxx`
	    var str = loc.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2")

	    // Add cookie string
	    str += " " + doc.cookie

	    // Exclude seajs-xxx=0
	    str.replace(/seajs-(\w+)=1/g, function(m, name) {
	      (ret || (ret = [])).push(name)
	    })

	    return ret
	  })()
	})

	var dataConfig = loaderScript.getAttribute("data-config")
	var dataMain = loaderScript.getAttribute("data-main")

	// Add data-config to preload modules
	if (dataConfig) {
	  configData.preload.push(dataConfig)
	}

	if (dataMain) {
	  seajs.use(dataMain)
	}

	// Enable to load `sea.js` self asynchronously
	if (_seajs && _seajs.args) {
	  var methods = ["define", "config", "use"]
	  var args = _seajs.args
	  for (var g = 0; g < args.length; g += 2) {
	    seajs[methods[args[g]]].apply(seajs, args[g + 1])
	  }
	}

	/*
	 ;(function(m, o, d, u, l, a, r) {
	 if(m[o]) return
	 function f(n) { return function() { r.push(n, arguments); return a } }
	 m[o] = a = { args: (r = []), config: f(1), use: f(2) }
	 m.define = f(0)
	 u = d.createElement("script")
	 u.id = o + "node"
	 u.async = true
	 u.src = "path/to/sea.js"
	 l = d.getElementsByTagName("head")[0]
	 l.appendChild(u)
	 })(window, "seajs", document);
	 */

	})(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2011-2013 original author or authors */

	/**
	 * A lightweight CommonJS Promises/A and when() implementation
	 * when is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author Brian Cavalier
	 * @author John Hann
	 * @version 2.6.0
	 */
	(function(define, global) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    // Public API

	    when.promise   = promise;    // Create a pending promise
	    when.resolve   = resolve;    // Create a resolved promise
	    when.reject    = reject;     // Create a rejected promise
	    when.defer     = defer;      // Create a {promise, resolver} pair

	    when.join      = join;       // Join 2 or more promises

	    when.all       = all;        // Resolve a list of promises
	    when.map       = map;        // Array.map() for promises
	    when.reduce    = reduce;     // Array.reduce() for promises
	    when.settle    = settle;     // Settle a list of promises

	    when.any       = any;        // One-winner race
	    when.some      = some;       // Multi-winner race

	    when.isPromise = isPromiseLike;  // DEPRECATED: use isPromiseLike
	    when.isPromiseLike = isPromiseLike; // Is something promise-like, aka thenable

	    /**
	     * Register an observer for a promise or immediate value.
	     *
	     * @param {*} promiseOrValue
	     * @param {function?} [onFulfilled] callback to be called when promiseOrValue is
	     *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	     *   will be invoked immediately.
	     * @param {function?} [onRejected] callback to be called when promiseOrValue is
	     *   rejected.
	     * @param {function?} [onProgress] callback to be called when progress updates
	     *   are issued for promiseOrValue.
	     * @returns {Promise} a new {@link Promise} that will complete with the return
	     *   value of callback or errback or the completion value of promiseOrValue if
	     *   callback and/or errback is not supplied.
	     */
	    function when(promiseOrValue, onFulfilled, onRejected, onProgress) {
	        // Get a trusted promise for the input promiseOrValue, and then
	        // register promise handlers
	        return cast(promiseOrValue).then(onFulfilled, onRejected, onProgress);
	    }

	    function cast(x) {
	        return x instanceof Promise ? x : resolve(x);
	    }

	    /**
	     * Trusted Promise constructor.  A Promise created from this constructor is
	     * a trusted when.js promise.  Any other duck-typed promise is considered
	     * untrusted.
	     * @constructor
	     * @param {function} sendMessage function to deliver messages to the promise's handler
	     * @param {function?} inspect function that reports the promise's state
	     * @name Promise
	     */
	    function Promise(sendMessage, inspect) {
	        this._message = sendMessage;
	        this.inspect = inspect;
	    }

	    Promise.prototype = {
	        /**
	         * Register handlers for this promise.
	         * @param [onFulfilled] {Function} fulfillment handler
	         * @param [onRejected] {Function} rejection handler
	         * @param [onProgress] {Function} progress handler
	         * @return {Promise} new Promise
	         */
	        then: function(onFulfilled, onRejected, onProgress) {
	            /*jshint unused:false*/
	            var args, sendMessage;

	            args = arguments;
	            sendMessage = this._message;

	            return _promise(function(resolve, reject, notify) {
	                sendMessage('when', args, resolve, notify);
	            }, this._status && this._status.observed());
	        },

	        /**
	         * Register a rejection handler.  Shortcut for .then(undefined, onRejected)
	         * @param {function?} onRejected
	         * @return {Promise}
	         */
	        otherwise: function(onRejected) {
	            return this.then(undef, onRejected);
	        },

	        /**
	         * Ensures that onFulfilledOrRejected will be called regardless of whether
	         * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
	         * receive the promises' value or reason.  Any returned value will be disregarded.
	         * onFulfilledOrRejected may throw or return a rejected promise to signal
	         * an additional error.
	         * @param {function} onFulfilledOrRejected handler to be called regardless of
	         *  fulfillment or rejection
	         * @returns {Promise}
	         */
	        ensure: function(onFulfilledOrRejected) {
	            return typeof onFulfilledOrRejected === 'function'
	                ? this.then(injectHandler, injectHandler)['yield'](this)
	                : this;

	            function injectHandler() {
	                return resolve(onFulfilledOrRejected());
	            }
	        },

	        /**
	         * Terminate a promise chain by handling the ultimate fulfillment value or
	         * rejection reason, and assuming responsibility for all errors.  if an
	         * error propagates out of handleResult or handleFatalError, it will be
	         * rethrown to the host, resulting in a loud stack track on most platforms
	         * and a crash on some.
	         * @param {function?} handleResult
	         * @param {function?} handleError
	         * @returns {undefined}
	         */
	        done: function(handleResult, handleError) {
	            this.then(handleResult, handleError).otherwise(crash);
	        },

	        /**
	         * Shortcut for .then(function() { return value; })
	         * @param  {*} value
	         * @return {Promise} a promise that:
	         *  - is fulfilled if value is not a promise, or
	         *  - if value is a promise, will fulfill with its value, or reject
	         *    with its reason.
	         */
	        'yield': function(value) {
	            return this.then(function() {
	                return value;
	            });
	        },

	        /**
	         * Runs a side effect when this promise fulfills, without changing the
	         * fulfillment value.
	         * @param {function} onFulfilledSideEffect
	         * @returns {Promise}
	         */
	        tap: function(onFulfilledSideEffect) {
	            return this.then(onFulfilledSideEffect)['yield'](this);
	        },

	        /**
	         * Assumes that this promise will fulfill with an array, and arranges
	         * for the onFulfilled to be called with the array as its argument list
	         * i.e. onFulfilled.apply(undefined, array).
	         * @param {function} onFulfilled function to receive spread arguments
	         * @return {Promise}
	         */
	        spread: function(onFulfilled) {
	            return this.then(function(array) {
	                // array may contain promises, so resolve its contents.
	                return all(array, function(array) {
	                    return onFulfilled.apply(undef, array);
	                });
	            });
	        },

	        /**
	         * Shortcut for .then(onFulfilledOrRejected, onFulfilledOrRejected)
	         * @deprecated
	         */
	        always: function(onFulfilledOrRejected, onProgress) {
	            return this.then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress);
	        }
	    };

	    /**
	     * Returns a resolved promise. The returned promise will be
	     *  - fulfilled with promiseOrValue if it is a value, or
	     *  - if promiseOrValue is a promise
	     *    - fulfilled with promiseOrValue's value after it is fulfilled
	     *    - rejected with promiseOrValue's reason after it is rejected
	     * @param  {*} value
	     * @return {Promise}
	     */
	    function resolve(value) {
	        return promise(function(resolve) {
	            resolve(value);
	        });
	    }

	    /**
	     * Returns a rejected promise for the supplied promiseOrValue.  The returned
	     * promise will be rejected with:
	     * - promiseOrValue, if it is a value, or
	     * - if promiseOrValue is a promise
	     *   - promiseOrValue's value after it is fulfilled
	     *   - promiseOrValue's reason after it is rejected
	     * @param {*} promiseOrValue the rejected value of the returned {@link Promise}
	     * @return {Promise} rejected {@link Promise}
	     */
	    function reject(promiseOrValue) {
	        return when(promiseOrValue, rejected);
	    }

	    /**
	     * Creates a {promise, resolver} pair, either or both of which
	     * may be given out safely to consumers.
	     * The resolver has resolve, reject, and progress.  The promise
	     * has then plus extended promise API.
	     *
	     * @return {{
	     * promise: Promise,
	     * resolve: function:Promise,
	     * reject: function:Promise,
	     * notify: function:Promise
	     * resolver: {
	     *  resolve: function:Promise,
	     *  reject: function:Promise,
	     *  notify: function:Promise
	     * }}}
	     */
	    function defer() {
	        var deferred, pending, resolved;

	        // Optimize object shape
	        deferred = {
	            promise: undef, resolve: undef, reject: undef, notify: undef,
	            resolver: { resolve: undef, reject: undef, notify: undef }
	        };

	        deferred.promise = pending = promise(makeDeferred);

	        return deferred;

	        function makeDeferred(resolvePending, rejectPending, notifyPending) {
	            deferred.resolve = deferred.resolver.resolve = function(value) {
	                if(resolved) {
	                    return resolve(value);
	                }
	                resolved = true;
	                resolvePending(value);
	                return pending;
	            };

	            deferred.reject  = deferred.resolver.reject  = function(reason) {
	                if(resolved) {
	                    return resolve(rejected(reason));
	                }
	                resolved = true;
	                rejectPending(reason);
	                return pending;
	            };

	            deferred.notify  = deferred.resolver.notify  = function(update) {
	                notifyPending(update);
	                return update;
	            };
	        }
	    }

	    /**
	     * Creates a new promise whose fate is determined by resolver.
	     * @param {function} resolver function(resolve, reject, notify)
	     * @returns {Promise} promise whose fate is determine by resolver
	     */
	    function promise(resolver) {
	        return _promise(resolver, monitorApi.PromiseStatus && monitorApi.PromiseStatus());
	    }

	    /**
	     * Creates a new promise, linked to parent, whose fate is determined
	     * by resolver.
	     * @param {function} resolver function(resolve, reject, notify)
	     * @param {Promise?} status promise from which the new promise is begotten
	     * @returns {Promise} promise whose fate is determine by resolver
	     * @private
	     */
	    function _promise(resolver, status) {
	        var self, value, consumers = [];

	        self = new Promise(_message, inspect);
	        self._status = status;

	        // Call the provider resolver to seal the promise's fate
	        try {
	            resolver(promiseResolve, promiseReject, promiseNotify);
	        } catch(e) {
	            promiseReject(e);
	        }

	        // Return the promise
	        return self;

	        /**
	         * Private message delivery. Queues and delivers messages to
	         * the promise's ultimate fulfillment value or rejection reason.
	         * @private
	         * @param {String} type
	         * @param {Array} args
	         * @param {Function} resolve
	         * @param {Function} notify
	         */
	        function _message(type, args, resolve, notify) {
	            consumers ? consumers.push(deliver) : enqueue(function() { deliver(value); });

	            function deliver(p) {
	                p._message(type, args, resolve, notify);
	            }
	        }

	        /**
	         * Returns a snapshot of the promise's state at the instant inspect()
	         * is called. The returned object is not live and will not update as
	         * the promise's state changes.
	         * @returns {{ state:String, value?:*, reason?:* }} status snapshot
	         *  of the promise.
	         */
	        function inspect() {
	            return value ? value.inspect() : toPendingState();
	        }

	        /**
	         * Transition from pre-resolution state to post-resolution state, notifying
	         * all listeners of the ultimate fulfillment or rejection
	         * @param {*|Promise} val resolution value
	         */
	        function promiseResolve(val) {
	            if(!consumers) {
	                return;
	            }

	            var queue = consumers;
	            consumers = undef;

	            enqueue(function () {
	                value = coerce(self, val);
	                if(status) {
	                    updateStatus(value, status);
	                }
	                runHandlers(queue, value);
	            });

	        }

	        /**
	         * Reject this promise with the supplied reason, which will be used verbatim.
	         * @param {*} reason reason for the rejection
	         */
	        function promiseReject(reason) {
	            promiseResolve(rejected(reason));
	        }

	        /**
	         * Issue a progress event, notifying all progress listeners
	         * @param {*} update progress event payload to pass to all listeners
	         */
	        function promiseNotify(update) {
	            if(consumers) {
	                var queue = consumers;
	                enqueue(function () {
	                    runHandlers(queue, progressed(update));
	                });
	            }
	        }
	    }

	    /**
	     * Run a queue of functions as quickly as possible, passing
	     * value to each.
	     */
	    function runHandlers(queue, value) {
	        for (var i = 0; i < queue.length; i++) {
	            queue[i](value);
	        }
	    }

	    /**
	     * Creates a fulfilled, local promise as a proxy for a value
	     * NOTE: must never be exposed
	     * @param {*} value fulfillment value
	     * @returns {Promise}
	     */
	    function fulfilled(value) {
	        return near(
	            new NearFulfilledProxy(value),
	            function() { return toFulfilledState(value); }
	        );
	    }

	    /**
	     * Creates a rejected, local promise with the supplied reason
	     * NOTE: must never be exposed
	     * @param {*} reason rejection reason
	     * @returns {Promise}
	     */
	    function rejected(reason) {
	        return near(
	            new NearRejectedProxy(reason),
	            function() { return toRejectedState(reason); }
	        );
	    }

	    /**
	     * Creates a near promise using the provided proxy
	     * NOTE: must never be exposed
	     * @param {object} proxy proxy for the promise's ultimate value or reason
	     * @param {function} inspect function that returns a snapshot of the
	     *  returned near promise's state
	     * @returns {Promise}
	     */
	    function near(proxy, inspect) {
	        return new Promise(function (type, args, resolve) {
	            try {
	                resolve(proxy[type].apply(proxy, args));
	            } catch(e) {
	                resolve(rejected(e));
	            }
	        }, inspect);
	    }

	    /**
	     * Create a progress promise with the supplied update.
	     * @private
	     * @param {*} update
	     * @return {Promise} progress promise
	     */
	    function progressed(update) {
	        return new Promise(function (type, args, _, notify) {
	            var onProgress = args[2];
	            try {
	                notify(typeof onProgress === 'function' ? onProgress(update) : update);
	            } catch(e) {
	                notify(e);
	            }
	        });
	    }

	    /**
	     * Coerces x to a trusted Promise
	     * @param {*} x thing to coerce
	     * @returns {*} Guaranteed to return a trusted Promise.  If x
	     *   is trusted, returns x, otherwise, returns a new, trusted, already-resolved
	     *   Promise whose resolution value is:
	     *   * the resolution value of x if it's a foreign promise, or
	     *   * x if it's a value
	     */
	    function coerce(self, x) {
	        if (x === self) {
	            return rejected(new TypeError());
	        }

	        if (x instanceof Promise) {
	            return x;
	        }

	        try {
	            var untrustedThen = x === Object(x) && x.then;

	            return typeof untrustedThen === 'function'
	                ? assimilate(untrustedThen, x)
	                : fulfilled(x);
	        } catch(e) {
	            return rejected(e);
	        }
	    }

	    /**
	     * Safely assimilates a foreign thenable by wrapping it in a trusted promise
	     * @param {function} untrustedThen x's then() method
	     * @param {object|function} x thenable
	     * @returns {Promise}
	     */
	    function assimilate(untrustedThen, x) {
	        return promise(function (resolve, reject) {
	            fcall(untrustedThen, x, resolve, reject);
	        });
	    }

	    /**
	     * Proxy for a near, fulfilled value
	     * @param {*} value
	     * @constructor
	     */
	    function NearFulfilledProxy(value) {
	        this.value = value;
	    }

	    NearFulfilledProxy.prototype.when = function(onResult) {
	        return typeof onResult === 'function' ? onResult(this.value) : this.value;
	    };

	    /**
	     * Proxy for a near rejection
	     * @param {*} reason
	     * @constructor
	     */
	    function NearRejectedProxy(reason) {
	        this.reason = reason;
	    }

	    NearRejectedProxy.prototype.when = function(_, onError) {
	        if(typeof onError === 'function') {
	            return onError(this.reason);
	        } else {
	            throw this.reason;
	        }
	    };

	    function updateStatus(value, status) {
	        value.then(statusFulfilled, statusRejected);

	        function statusFulfilled() { status.fulfilled(); }
	        function statusRejected(r) { status.rejected(r); }
	    }

	    /**
	     * Determines if x is promise-like, i.e. a thenable object
	     * NOTE: Will return true for *any thenable object*, and isn't truly
	     * safe, since it may attempt to access the `then` property of x (i.e.
	     *  clever/malicious getters may do weird things)
	     * @param {*} x anything
	     * @returns {boolean} true if x is promise-like
	     */
	    function isPromiseLike(x) {
	        return x && typeof x.then === 'function';
	    }

	    /**
	     * Initiates a competitive race, returning a promise that will resolve when
	     * howMany of the supplied promisesOrValues have resolved, or will reject when
	     * it becomes impossible for howMany to resolve, for example, when
	     * (promisesOrValues.length - howMany) + 1 input promises reject.
	     *
	     * @param {Array} promisesOrValues array of anything, may contain a mix
	     *      of promises and values
	     * @param howMany {number} number of promisesOrValues to resolve
	     * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	     * @returns {Promise} promise that will resolve to an array of howMany values that
	     *  resolved first, or will reject with an array of
	     *  (promisesOrValues.length - howMany) + 1 rejection reasons.
	     */
	    function some(promisesOrValues, howMany, onFulfilled, onRejected, onProgress) {

	        return when(promisesOrValues, function(promisesOrValues) {

	            return promise(resolveSome).then(onFulfilled, onRejected, onProgress);

	            function resolveSome(resolve, reject, notify) {
	                var toResolve, toReject, values, reasons, fulfillOne, rejectOne, len, i;

	                len = promisesOrValues.length >>> 0;

	                toResolve = Math.max(0, Math.min(howMany, len));
	                values = [];

	                toReject = (len - toResolve) + 1;
	                reasons = [];

	                // No items in the input, resolve immediately
	                if (!toResolve) {
	                    resolve(values);

	                } else {
	                    rejectOne = function(reason) {
	                        reasons.push(reason);
	                        if(!--toReject) {
	                            fulfillOne = rejectOne = identity;
	                            reject(reasons);
	                        }
	                    };

	                    fulfillOne = function(val) {
	                        // This orders the values based on promise resolution order
	                        values.push(val);
	                        if (!--toResolve) {
	                            fulfillOne = rejectOne = identity;
	                            resolve(values);
	                        }
	                    };

	                    for(i = 0; i < len; ++i) {
	                        if(i in promisesOrValues) {
	                            when(promisesOrValues[i], fulfiller, rejecter, notify);
	                        }
	                    }
	                }

	                function rejecter(reason) {
	                    rejectOne(reason);
	                }

	                function fulfiller(val) {
	                    fulfillOne(val);
	                }
	            }
	        });
	    }

	    /**
	     * Initiates a competitive race, returning a promise that will resolve when
	     * any one of the supplied promisesOrValues has resolved or will reject when
	     * *all* promisesOrValues have rejected.
	     *
	     * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	     *      of {@link Promise}s and values
	     * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	     * @returns {Promise} promise that will resolve to the value that resolved first, or
	     * will reject with an array of all rejected inputs.
	     */
	    function any(promisesOrValues, onFulfilled, onRejected, onProgress) {

	        function unwrapSingleResult(val) {
	            return onFulfilled ? onFulfilled(val[0]) : val[0];
	        }

	        return some(promisesOrValues, 1, unwrapSingleResult, onRejected, onProgress);
	    }

	    /**
	     * Return a promise that will resolve only once all the supplied promisesOrValues
	     * have resolved. The resolution value of the returned promise will be an array
	     * containing the resolution values of each of the promisesOrValues.
	     * @memberOf when
	     *
	     * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	     *      of {@link Promise}s and values
	     * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	     * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	     * @returns {Promise}
	     */
	    function all(promisesOrValues, onFulfilled, onRejected, onProgress) {
	        return _map(promisesOrValues, identity).then(onFulfilled, onRejected, onProgress);
	    }

	    /**
	     * Joins multiple promises into a single returned promise.
	     * @return {Promise} a promise that will fulfill when *all* the input promises
	     * have fulfilled, or will reject when *any one* of the input promises rejects.
	     */
	    function join(/* ...promises */) {
	        return _map(arguments, identity);
	    }

	    /**
	     * Settles all input promises such that they are guaranteed not to
	     * be pending once the returned promise fulfills. The returned promise
	     * will always fulfill, except in the case where `array` is a promise
	     * that rejects.
	     * @param {Array|Promise} array or promise for array of promises to settle
	     * @returns {Promise} promise that always fulfills with an array of
	     *  outcome snapshots for each input promise.
	     */
	    function settle(array) {
	        return _map(array, toFulfilledState, toRejectedState);
	    }

	    /**
	     * Promise-aware array map function, similar to `Array.prototype.map()`,
	     * but input array may contain promises or values.
	     * @param {Array|Promise} array array of anything, may contain promises and values
	     * @param {function} mapFunc map function which may return a promise or value
	     * @returns {Promise} promise that will fulfill with an array of mapped values
	     *  or reject if any input promise rejects.
	     */
	    function map(array, mapFunc) {
	        return _map(array, mapFunc);
	    }

	    /**
	     * Internal map that allows a fallback to handle rejections
	     * @param {Array|Promise} array array of anything, may contain promises and values
	     * @param {function} mapFunc map function which may return a promise or value
	     * @param {function?} fallback function to handle rejected promises
	     * @returns {Promise} promise that will fulfill with an array of mapped values
	     *  or reject if any input promise rejects.
	     */
	    function _map(array, mapFunc, fallback) {
	        return when(array, function(array) {

	            return _promise(resolveMap);

	            function resolveMap(resolve, reject, notify) {
	                var results, len, toResolve, i;

	                // Since we know the resulting length, we can preallocate the results
	                // array to avoid array expansions.
	                toResolve = len = array.length >>> 0;
	                results = [];

	                if(!toResolve) {
	                    resolve(results);
	                    return;
	                }

	                // Since mapFunc may be async, get all invocations of it into flight
	                for(i = 0; i < len; i++) {
	                    if(i in array) {
	                        resolveOne(array[i], i);
	                    } else {
	                        --toResolve;
	                    }
	                }

	                function resolveOne(item, i) {
	                    when(item, mapFunc, fallback).then(function(mapped) {
	                        results[i] = mapped;

	                        if(!--toResolve) {
	                            resolve(results);
	                        }
	                    }, reject, notify);
	                }
	            }
	        });
	    }

	    /**
	     * Traditional reduce function, similar to `Array.prototype.reduce()`, but
	     * input may contain promises and/or values, and reduceFunc
	     * may return either a value or a promise, *and* initialValue may
	     * be a promise for the starting value.
	     *
	     * @param {Array|Promise} promise array or promise for an array of anything,
	     *      may contain a mix of promises and values.
	     * @param {function} reduceFunc reduce function reduce(currentValue, nextValue, index, total),
	     *      where total is the total number of items being reduced, and will be the same
	     *      in each call to reduceFunc.
	     * @returns {Promise} that will resolve to the final reduced value
	     */
	    function reduce(promise, reduceFunc /*, initialValue */) {
	        var args = fcall(slice, arguments, 1);

	        return when(promise, function(array) {
	            var total;

	            total = array.length;

	            // Wrap the supplied reduceFunc with one that handles promises and then
	            // delegates to the supplied.
	            args[0] = function (current, val, i) {
	                return when(current, function (c) {
	                    return when(val, function (value) {
	                        return reduceFunc(c, value, i, total);
	                    });
	                });
	            };

	            return reduceArray.apply(array, args);
	        });
	    }

	    // Snapshot states

	    /**
	     * Creates a fulfilled state snapshot
	     * @private
	     * @param {*} x any value
	     * @returns {{state:'fulfilled',value:*}}
	     */
	    function toFulfilledState(x) {
	        return { state: 'fulfilled', value: x };
	    }

	    /**
	     * Creates a rejected state snapshot
	     * @private
	     * @param {*} x any reason
	     * @returns {{state:'rejected',reason:*}}
	     */
	    function toRejectedState(x) {
	        return { state: 'rejected', reason: x };
	    }

	    /**
	     * Creates a pending state snapshot
	     * @private
	     * @returns {{state:'pending'}}
	     */
	    function toPendingState() {
	        return { state: 'pending' };
	    }

	    //
	    // Internals, utilities, etc.
	    //

	    var reduceArray, slice, fcall, nextTick, handlerQueue,
	        setTimeout, funcProto, call, arrayProto, monitorApi,
	        cjsRequire, MutationObserver, undef;

	    cjsRequire = require;

	    //
	    // Shared handler queue processing
	    //
	    // Credit to Twisol (https://github.com/Twisol) for suggesting
	    // this type of extensible queue + trampoline approach for
	    // next-tick conflation.

	    handlerQueue = [];

	    /**
	     * Enqueue a task. If the queue is not currently scheduled to be
	     * drained, schedule it.
	     * @param {function} task
	     */
	    function enqueue(task) {
	        if(handlerQueue.push(task) === 1) {
	            nextTick(drainQueue);
	        }
	    }

	    /**
	     * Drain the handler queue entirely, being careful to allow the
	     * queue to be extended while it is being processed, and to continue
	     * processing until it is truly empty.
	     */
	    function drainQueue() {
	        runHandlers(handlerQueue);
	        handlerQueue = [];
	    }

	    // capture setTimeout to avoid being caught by fake timers
	    // used in time based tests
	    setTimeout = global.setTimeout;

	    // Allow attaching the monitor to when() if env has no console
	    monitorApi = typeof console !== 'undefined' ? console : when;

	    // Sniff "best" async scheduling option
	    // Prefer process.nextTick or MutationObserver, then check for
	    // vertx and finally fall back to setTimeout
	    /*global process*/
	    if (typeof process === 'object' && process.nextTick) {
	        nextTick = process.nextTick;
	    } else if(MutationObserver = global.MutationObserver || global.WebKitMutationObserver) {
	        nextTick = (function(document, MutationObserver, drainQueue) {
	            var el = document.createElement('div');
	            new MutationObserver(drainQueue).observe(el, { attributes: true });

	            return function() {
	                el.setAttribute('x', 'x');
	            };
	        }(document, MutationObserver, drainQueue));
	    } else {
	        try {
	            // vert.x 1.x || 2.x
	            nextTick = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).runOnLoop || __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).runOnContext;
	        } catch(ignore) {
	            nextTick = function(t) { setTimeout(t, 0); };
	        }
	    }

	    //
	    // Capture/polyfill function and array utils
	    //

	    // Safe function calls
	    funcProto = Function.prototype;
	    call = funcProto.call;
	    fcall = funcProto.bind
	        ? call.bind(call)
	        : function(f, context) {
	            return f.apply(context, slice.call(arguments, 2));
	        };

	    // Safe array ops
	    arrayProto = [];
	    slice = arrayProto.slice;

	    // ES5 reduce implementation if native not available
	    // See: http://es5.github.com/#x15.4.4.21 as there are many
	    // specifics and edge cases.  ES5 dictates that reduce.length === 1
	    // This implementation deviates from ES5 spec in the following ways:
	    // 1. It does not check if reduceFunc is a Callable
	    reduceArray = arrayProto.reduce ||
	        function(reduceFunc /*, initialValue */) {
	            /*jshint maxcomplexity: 7*/
	            var arr, args, reduced, len, i;

	            i = 0;
	            arr = Object(this);
	            len = arr.length >>> 0;
	            args = arguments;

	            // If no initialValue, use first item of array (we know length !== 0 here)
	            // and adjust i to start at second item
	            if(args.length <= 1) {
	                // Skip to the first real element in the array
	                for(;;) {
	                    if(i in arr) {
	                        reduced = arr[i++];
	                        break;
	                    }

	                    // If we reached the end of the array without finding any real
	                    // elements, it's a TypeError
	                    if(++i >= len) {
	                        throw new TypeError();
	                    }
	                }
	            } else {
	                // If initialValue provided, use it
	                reduced = args[1];
	            }

	            // Do the actual reduce
	            for(;i < len; ++i) {
	                if(i in arr) {
	                    reduced = reduceFunc(reduced, arr[i], i, arr);
	                }
	            }

	            return reduced;
	        };

	    function identity(x) {
	        return x;
	    }

	    function crash(fatalError) {
	        if(typeof monitorApi.reportUnhandled === 'function') {
	            monitorApi.reportUnhandled();
	        } else {
	            enqueue(function() {
	                throw fatalError;
	            });
	        }

	        throw fatalError;
	    }

	    return when;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(9), this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 13 */
/***/ function(module, exports) {

	consoel.log(test)

/***/ }
/******/ ]);