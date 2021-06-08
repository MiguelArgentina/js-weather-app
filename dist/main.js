/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__.default)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__.default)([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__.default)(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__.default)(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__.default)(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__.default)(element)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__.default)((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__.default)(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(elementOrVirtualElement);
  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__.default)(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__.default)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__.default)(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__.default)(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__.default)(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_2__.default)(element);

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_4__.default)(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__.default)(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__.default)(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__.default)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "write": () => (/* binding */ write),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
/* harmony export */   "afterRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
/* harmony export */   "afterWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
/* harmony export */   "auto": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
/* harmony export */   "basePlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
/* harmony export */   "beforeMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
/* harmony export */   "beforeRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
/* harmony export */   "beforeWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
/* harmony export */   "bottom": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
/* harmony export */   "clippingParents": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
/* harmony export */   "end": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
/* harmony export */   "left": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
/* harmony export */   "main": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
/* harmony export */   "modifierPhases": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
/* harmony export */   "placements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
/* harmony export */   "popper": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
/* harmony export */   "read": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
/* harmony export */   "reference": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
/* harmony export */   "right": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
/* harmony export */   "start": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
/* harmony export */   "top": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
/* harmony export */   "variationPlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
/* harmony export */   "viewport": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
/* harmony export */   "write": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "createPopperBase": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
/* harmony export */   "createPopper": () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__.default)(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.default)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");






 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr) || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__.default)(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__.default)(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__.default)(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

      var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(_min, tetherMin) : _min, _offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default, _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__.default, _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__.default, _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default, _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__.default, _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__.default)(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__.default)((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(referenceElement);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__.default)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}

/***/ }),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": () => (/* binding */ Alert),
/* harmony export */   "Button": () => (/* binding */ Button),
/* harmony export */   "Carousel": () => (/* binding */ Carousel),
/* harmony export */   "Collapse": () => (/* binding */ Collapse),
/* harmony export */   "Dropdown": () => (/* binding */ Dropdown),
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "Offcanvas": () => (/* binding */ Offcanvas),
/* harmony export */   "Popover": () => (/* binding */ Popover),
/* harmony export */   "ScrollSpy": () => (/* binding */ ScrollSpy),
/* harmony export */   "Tab": () => (/* binding */ Tab),
/* harmony export */   "Toast": () => (/* binding */ Toast),
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/*!
  * Bootstrap v5.0.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const NODE_TEXT = 3;
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },

  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },

  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },

  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },

  prev(element, selector) {
    let previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },

  next(element, selector) {
    let next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`;
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target');

  if (!selector || selector === '#') {
    let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273

    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
      return null;
    } // Just in case some CMS puts out a full URL with the anchor appended


    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
      hrefAttr = `#${hrefAttr.split('#')[1]}`;
    }

    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
  }

  return selector;
};

const getSelectorFromElement = element => {
  const selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

const getElementFromSelector = element => {
  const selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};

const isElement = obj => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (typeof obj.jquery !== 'undefined') {
    obj = obj[0];
  }

  return typeof obj.nodeType !== 'undefined';
};

const getElement = obj => {
  if (isElement(obj)) {
    // it's a jQuery object or a node element
    return obj.jquery ? obj[0] : obj;
  }

  if (typeof obj === 'string' && obj.length > 0) {
    return SelectorEngine.findOne(obj);
  }

  return null;
};

const emulateTransitionEnd = (element, duration) => {
  let called = false;
  const durationPadding = 5;
  const emulatedDuration = duration + durationPadding;

  function listener() {
    called = true;
    element.removeEventListener(TRANSITION_END, listener);
  }

  element.addEventListener(TRANSITION_END, listener);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(element);
    }
  }, emulatedDuration);
};

const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach(property => {
    const expectedTypes = configTypes[property];
    const value = config[property];
    const valueType = value && isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    }
  });
};

const isVisible = element => {
  if (!element) {
    return false;
  }

  if (element.style && element.parentNode && element.parentNode.style) {
    const elementStyle = getComputedStyle(element);
    const parentNodeStyle = getComputedStyle(element.parentNode);
    return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
  }

  return false;
};

const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

const noop = () => {};

const reflow = element => element.offsetHeight;

const getjQuery = () => {
  const {
    jQuery
  } = window;

  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return jQuery;
  }

  return null;
};

const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

const isRTL = () => document.documentElement.dir === 'rtl';

const defineJQueryPlugin = plugin => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    /* istanbul ignore if */

    if ($) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;

      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};

const execute = callback => {
  if (typeof callback === 'function') {
    callback();
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const elementMap = new Map();
var Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }

    instanceMap.set(key, instance);
  },

  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },

  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    const instanceMap = elementMap.get(element);
    instanceMap.delete(key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage

let uidEvent = 1;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const customEventsRegex = /^(mouseenter|mouseleave)/i;
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}

function getEvent(element) {
  const uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element;

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);

    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target;

          if (handler.oneOff) {
            // eslint-disable-next-line unicorn/consistent-destructuring
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    } // To please ESLint


    return null;
  };
}

function findHandler(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events);

  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]];

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }

  return null;
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === 'string';
  const originalHandler = delegation ? delegationFn : handler;
  let typeEvent = getTypeEvent(originalTypeEvent);
  const isNative = nativeEvents.has(typeEvent);

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does


  if (customEventsRegex.test(originalTypeEvent)) {
    const wrapFn = fn => {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };

    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
  const events = getEvent(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }

  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
  const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn.delegationSelector = delegation ? handler : null;
  fn.originalHandler = originalHandler;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, delegation);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach(handlerKey => {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}

const EventHandler = {
  on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },

  one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },

  off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getEvent(element);
    const isNamespace = originalTypeEvent.startsWith('.');

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return;
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }

    if (isNamespace) {
      Object.keys(events).forEach(elementEvent => {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }

    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(keyHandlers => {
      const handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },

  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    const isNative = nativeEvents.has(typeEvent);
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(key => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }

        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const VERSION = '5.0.1';

class BaseComponent {
  constructor(element) {
    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach(propertyName => {
      this[propertyName] = null;
    });
  }

  _queueCallback(callback, element, isAnimated = true) {
    if (!isAnimated) {
      execute(callback);
      return;
    }

    const transitionDuration = getTransitionDurationFromElement(element);
    EventHandler.one(element, 'transitionend', () => execute(callback));
    emulateTransitionEnd(element, transitionDuration);
  }
  /** Static */


  static getInstance(element) {
    return Data.get(element, this.DATA_KEY);
  }

  static get VERSION() {
    return VERSION;
  }

  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }

  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }

  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$c = 'alert';
const DATA_KEY$b = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$b}`;
const DATA_API_KEY$8 = '.data-api';
const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const EVENT_CLICK_DATA_API$7 = `click${EVENT_KEY$b}${DATA_API_KEY$8}`;
const CLASS_NAME_ALERT = 'alert';
const CLASS_NAME_FADE$6 = 'fade';
const CLASS_NAME_SHOW$9 = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$c;
  } // Public


  close(element) {
    const rootElement = element ? this._getRootElement(element) : this._element;

    const customEvent = this._triggerCloseEvent(rootElement);

    if (customEvent === null || customEvent.defaultPrevented) {
      return;
    }

    this._removeElement(rootElement);
  } // Private


  _getRootElement(element) {
    return getElementFromSelector(element) || element.closest(`.${CLASS_NAME_ALERT}`);
  }

  _triggerCloseEvent(element) {
    return EventHandler.trigger(element, EVENT_CLOSE);
  }

  _removeElement(element) {
    element.classList.remove(CLASS_NAME_SHOW$9);
    const isAnimated = element.classList.contains(CLASS_NAME_FADE$6);

    this._queueCallback(() => this._destroyElement(element), element, isAnimated);
  }

  _destroyElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    EventHandler.trigger(element, EVENT_CLOSED);
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$b);

      if (!data) {
        data = new Alert(this);
      }

      if (config === 'close') {
        data[config](this);
      }
    });
  }

  static handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault();
      }

      alertInstance.close(this);
    };
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$b = 'button';
const DATA_KEY$a = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$a}`;
const DATA_API_KEY$7 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$7}`;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$b;
  } // Public


  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$a);

      if (!data) {
        data = new Button(this);
      }

      if (config === 'toggle') {
        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  let data = Data.get(button, DATA_KEY$a);

  if (!data) {
    data = new Button(button);
  }

  data.toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },

  getDataAttributes(element) {
    if (!element) {
      return {};
    }

    const attributes = {};
    Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  },

  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$a = 'carousel';
const DATA_KEY$9 = 'bs.carousel';
const EVENT_KEY$9 = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const SWIPE_THRESHOLD = 40;
const Default$9 = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
const DefaultType$9 = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$9}`;
const EVENT_SLID = `slid${EVENT_KEY$9}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$9}`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$9}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$9}`;
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$9}`;
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$9}${DATA_API_KEY$6}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$9}${DATA_API_KEY$6}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SELECTOR_ACTIVE$1 = '.active';
const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_INDICATOR = '[data-bs-target]';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$9;
  }

  static get NAME() {
    return NAME$a;
  } // Public


  next() {
    if (!this._isSliding) {
      this._slide(ORDER_NEXT);
    }
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }

  prev() {
    if (!this._isSliding) {
      this._slide(ORDER_PREV);
    }
  }

  pause(event) {
    if (!event) {
      this._isPaused = true;
    }

    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval);
    this._interval = null;
  }

  cycle(event) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval();

      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  }

  to(index) {
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

    this._slide(order, this._items[index]);
  } // Private


  _getConfig(config) {
    config = { ...Default$9,
      ...config
    };
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }

  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    const direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0;

    if (!direction) {
      return;
    }

    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
      EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }

  _addTouchEventListeners() {
    const start = event => {
      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };

    const move = event => {
      // ensure swiping with one touch and not pinching
      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
    };

    const end = event => {
      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }

      this._handleSwipe();

      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling
        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      }
    };

    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
      EventHandler.on(itemImg, EVENT_DRAG_START, e => e.preventDefault());
    });

    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
    }
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    if (event.key === ARROW_LEFT_KEY) {
      event.preventDefault();

      this._slide(DIRECTION_RIGHT);
    } else if (event.key === ARROW_RIGHT_KEY) {
      event.preventDefault();

      this._slide(DIRECTION_LEFT);
    }
  }

  _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  }

  _getItemByOrder(order, activeElement) {
    const isNext = order === ORDER_NEXT;
    const isPrev = order === ORDER_PREV;

    const activeIndex = this._getItemIndex(activeElement);

    const lastItemIndex = this._items.length - 1;
    const isGoingToWrap = isPrev && activeIndex === 0 || isNext && activeIndex === lastItemIndex;

    if (isGoingToWrap && !this._config.wrap) {
      return activeElement;
    }

    const delta = isPrev ? -1 : 1;
    const itemIndex = (activeIndex + delta) % this._items.length;
    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
  }

  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget);

    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  }

  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
          indicators[i].setAttribute('aria-current', 'true');
          break;
        }
      }
    }
  }

  _updateInterval() {
    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    if (!element) {
      return;
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
      this._config.interval = elementInterval;
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval;
    }
  }

  _slide(directionOrOrder, element) {
    const order = this._directionToOrder(directionOrOrder);

    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeElementIndex = this._getItemIndex(activeElement);

    const nextElement = element || this._getItemByOrder(order, activeElement);

    const nextElementIndex = this._getItemIndex(nextElement);

    const isCycling = Boolean(this._interval);
    const isNext = order === ORDER_NEXT;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

    const eventDirectionName = this._orderToDirection(order);

    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
      this._isSliding = false;
      return;
    }

    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    this._activeElement = nextElement;

    const triggerSlidEvent = () => {
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    };

    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        setTimeout(triggerSlidEvent, 0);
      };

      this._queueCallback(completeCallBack, activeElement, true);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      this._isSliding = false;
      triggerSlidEvent();
    }

    if (isCycling) {
      this.cycle();
    }
  }

  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction;
    }

    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }

  _orderToDirection(order) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
      return order;
    }

    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  } // Static


  static carouselInterface(element, config) {
    let data = Data.get(element, DATA_KEY$9);
    let _config = { ...Default$9,
      ...Manipulator.getDataAttributes(element)
    };

    if (typeof config === 'object') {
      _config = { ..._config,
        ...config
      };
    }

    const action = typeof config === 'string' ? config : _config.slide;

    if (!data) {
      data = new Carousel(element, _config);
    }

    if (typeof config === 'number') {
      data.to(config);
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`);
      }

      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Carousel.carouselInterface(this, config);
    });
  }

  static dataApiClickHandler(event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    const config = { ...Manipulator.getDataAttributes(target),
      ...Manipulator.getDataAttributes(this)
    };
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
      config.interval = false;
    }

    Carousel.carouselInterface(target, config);

    if (slideIndex) {
      Data.get(target, DATA_KEY$9).to(slideIndex);
    }

    event.preventDefault();
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (let i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Data.get(carousels[i], DATA_KEY$9));
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Carousel to jQuery only if jQuery is present
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$9 = 'collapse';
const DATA_KEY$8 = 'bs.collapse';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const Default$8 = {
  toggle: true,
  parent: ''
};
const DefaultType$8 = {
  toggle: 'boolean',
  parent: '(string|element)'
};
const EVENT_SHOW$5 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$8}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$8}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$8}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_SHOW$8 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.show, .collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._isTransitioning = false;
    this._config = this._getConfig(config);
    this._triggerArray = SelectorEngine.find(`${SELECTOR_DATA_TOGGLE$4}[href="#${this._element.id}"],` + `${SELECTOR_DATA_TOGGLE$4}[data-bs-target="#${this._element.id}"]`);
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i];
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

      if (selector !== null && filterElement.length) {
        this._selector = selector;

        this._triggerArray.push(elem);
      }
    }

    this._parent = this._config.parent ? this._getParent() : null;

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray);
    }

    if (this._config.toggle) {
      this.toggle();
    }
  } // Getters


  static get Default() {
    return Default$8;
  }

  static get NAME() {
    return NAME$9;
  } // Public


  toggle() {
    if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      return;
    }

    let actives;
    let activesData;

    if (this._parent) {
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(elem => {
        if (typeof this._config.parent === 'string') {
          return elem.getAttribute('data-bs-parent') === this._config.parent;
        }

        return elem.classList.contains(CLASS_NAME_COLLAPSE);
      });

      if (actives.length === 0) {
        actives = null;
      }
    }

    const container = SelectorEngine.findOne(this._selector);

    if (actives) {
      const tempActiveData = actives.find(elem => container !== elem);
      activesData = tempActiveData ? Data.get(tempActiveData, DATA_KEY$8) : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    if (actives) {
      actives.forEach(elemActive => {
        if (container !== elemActive) {
          Collapse.collapseInterface(elemActive, 'hide');
        }

        if (!activesData) {
          Data.set(elemActive, DATA_KEY$8, null);
        }
      });
    }

    const dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    if (this._triggerArray.length) {
      this._triggerArray.forEach(element => {
        element.classList.remove(CLASS_NAME_COLLAPSED);
        element.setAttribute('aria-expanded', true);
      });
    }

    this.setTransitioning(true);

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

      this._element.style[dimension] = '';
      this.setTransitioning(false);
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };

    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;

    this._queueCallback(complete, this._element, true);

    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }

  hide() {
    if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      return;
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    const dimension = this._getDimension();

    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

    const triggerArrayLength = this._triggerArray.length;

    if (triggerArrayLength > 0) {
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);

        if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
          trigger.classList.add(CLASS_NAME_COLLAPSED);
          trigger.setAttribute('aria-expanded', false);
        }
      }
    }

    this.setTransitioning(true);

    const complete = () => {
      this.setTransitioning(false);

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };

    this._element.style[dimension] = '';

    this._queueCallback(complete, this._element, true);
  }

  setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  } // Private


  _getConfig(config) {
    config = { ...Default$8,
      ...config
    };
    config.toggle = Boolean(config.toggle); // Coerce string values

    typeCheckConfig(NAME$9, config, DefaultType$8);
    return config;
  }

  _getDimension() {
    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
  }

  _getParent() {
    let {
      parent
    } = this._config;
    parent = getElement(parent);
    const selector = `${SELECTOR_DATA_TOGGLE$4}[data-bs-parent="${parent}"]`;
    SelectorEngine.find(selector, parent).forEach(element => {
      const selected = getElementFromSelector(element);

      this._addAriaAndCollapsedClass(selected, [element]);
    });
    return parent;
  }

  _addAriaAndCollapsedClass(element, triggerArray) {
    if (!element || !triggerArray.length) {
      return;
    }

    const isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
    triggerArray.forEach(elem => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }

      elem.setAttribute('aria-expanded', isOpen);
    });
  } // Static


  static collapseInterface(element, config) {
    let data = Data.get(element, DATA_KEY$8);
    const _config = { ...Default$8,
      ...Manipulator.getDataAttributes(element),
      ...(typeof config === 'object' && config ? config : {})
    };

    if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }

    if (!data) {
      data = new Collapse(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Collapse.collapseInterface(this, config);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  const triggerData = Manipulator.getDataAttributes(this);
  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(element => {
    const data = Data.get(element, DATA_KEY$8);
    let config;

    if (data) {
      // update parent attribute
      if (data._parent === null && typeof triggerData.parent === 'string') {
        data._config.parent = triggerData.parent;
        data._parent = data._getParent();
      }

      config = 'toggle';
    } else {
      config = triggerData;
    }

    Collapse.collapseInterface(element, config);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$8 = 'dropdown';
const DATA_KEY$7 = 'bs.dropdown';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const SPACE_KEY = 'Space';
const TAB_KEY = 'Tab';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
const EVENT_HIDE$4 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$7}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$7}`;
const EVENT_CLICK = `click${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$7}${DATA_API_KEY$4}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_NAVBAR = 'navbar';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const Default$7 = {
  offset: [0, 2],
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  autoClose: true
};
const DefaultType$7 = {
  offset: '(array|string|function)',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  autoClose: '(boolean|string)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$7;
  }

  static get DefaultType() {
    return DefaultType$7;
  }

  static get NAME() {
    return NAME$8;
  } // Public


  toggle() {
    if (isDisabled(this._element)) {
      return;
    }

    const isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

    if (isActive) {
      this.hide();
      return;
    }

    this.show();
  }

  show() {
    if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
      return;
    }

    const parent = Dropdown.getParentFromElement(this._element);
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

    if (showEvent.defaultPrevented) {
      return;
    } // Totally disable Popper for Dropdowns in Navbar


    if (this._inNavbar) {
      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
    } else {
      if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
      this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(referenceElement, this._menu, popperConfig);

      if (isDisplayStatic) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static');
      }
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
    }

    this._element.focus();

    this._element.setAttribute('aria-expanded', true);

    this._menu.classList.toggle(CLASS_NAME_SHOW$7);

    this._element.classList.toggle(CLASS_NAME_SHOW$7);

    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  }

  hide() {
    if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element
    };

    this._completeHide(relatedTarget);
  }

  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }

    super.dispose();
  }

  update() {
    this._inNavbar = this._detectNavbar();

    if (this._popper) {
      this._popper.update();
    }
  } // Private


  _addEventListeners() {
    EventHandler.on(this._element, EVENT_CLICK, event => {
      event.preventDefault();
      this.toggle();
    });
  }

  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

    if (hideEvent.defaultPrevented) {
      return;
    } // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support


    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
    }

    if (this._popper) {
      this._popper.destroy();
    }

    this._menu.classList.remove(CLASS_NAME_SHOW$7);

    this._element.classList.remove(CLASS_NAME_SHOW$7);

    this._element.setAttribute('aria-expanded', 'false');

    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  }

  _getConfig(config) {
    config = { ...this.constructor.Default,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$8.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }

    return config;
  }

  _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }

  _getPlacement() {
    const parentDropdown = this._element.parentNode;

    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    } // We need to trim the value because custom properties can also include spaces


    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }

    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }

  _detectNavbar() {
    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  }

  _getOffset() {
    const {
      offset
    } = this._config;

    if (typeof offset === 'string') {
      return offset.split(',').map(val => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    }; // Disable Popper if we have a static display

    if (this._config.display === 'static') {
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }

    return { ...defaultBsPopperConfig,
      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
    };
  }

  _selectMenuItem(event) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

    if (!items.length) {
      return;
    }

    let index = items.indexOf(event.target); // Up

    if (event.key === ARROW_UP_KEY && index > 0) {
      index--;
    } // Down


    if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
      index++;
    } // index is -1 if the first keydown is an ArrowUp


    index = index === -1 ? 0 : index;
    items[index].focus();
  } // Static


  static dropdownInterface(element, config) {
    let data = Data.get(element, DATA_KEY$7);

    const _config = typeof config === 'object' ? config : null;

    if (!data) {
      data = new Dropdown(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Dropdown.dropdownInterface(this, config);
    });
  }

  static clearMenus(event) {
    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
      return;
    }

    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

    for (let i = 0, len = toggles.length; i < len; i++) {
      const context = Data.get(toggles[i], DATA_KEY$7);

      if (!context || context._config.autoClose === false) {
        continue;
      }

      if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
        continue;
      }

      const relatedTarget = {
        relatedTarget: context._element
      };

      if (event) {
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
      }

      context._completeHide(relatedTarget);
    }
  }

  static getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  }

  static dataApiKeydownHandler(event) {
    // If not input/textarea:
    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
    // If input/textarea:
    //  - If space key => not a dropdown command
    //  - If key is other than escape
    //    - If key is not up or down => not a dropdown command
    //    - If trigger inside the menu => not a dropdown command
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }

    const isActive = this.classList.contains(CLASS_NAME_SHOW$7);

    if (!isActive && event.key === ESCAPE_KEY$2) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isDisabled(this)) {
      return;
    }

    const getToggleButton = () => this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];

    if (event.key === ESCAPE_KEY$2) {
      getToggleButton().focus();
      Dropdown.clearMenus();
      return;
    }

    if (!isActive && (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY)) {
      getToggleButton().click();
      return;
    }

    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
      return;
    }

    Dropdown.getInstance(getToggleButton())._selectMenuItem(event);
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.dropdownInterface(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Dropdown to jQuery only if jQuery is present
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';

const getWidth = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

const hide = (width = getWidth()) => {
  _disableOverFlow(); // give padding to element to balances the hidden scrollbar width


  _setElementAttributes('body', 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements, to keep shown fullwidth


  _setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

  _setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
};

const _disableOverFlow = () => {
  const actualValue = document.body.style.overflow;

  if (actualValue) {
    Manipulator.setDataAttribute(document.body, 'overflow', actualValue);
  }

  document.body.style.overflow = 'hidden';
};

const _setElementAttributes = (selector, styleProp, callback) => {
  const scrollbarWidth = getWidth();
  SelectorEngine.find(selector).forEach(element => {
    if (element !== document.body && window.innerWidth > element.clientWidth + scrollbarWidth) {
      return;
    }

    const actualValue = element.style[styleProp];
    const calculatedValue = window.getComputedStyle(element)[styleProp];
    Manipulator.setDataAttribute(element, styleProp, actualValue);
    element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
  });
};

const reset = () => {
  _resetElementAttributes('body', 'overflow');

  _resetElementAttributes('body', 'paddingRight');

  _resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

  _resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
};

const _resetElementAttributes = (selector, styleProp) => {
  SelectorEngine.find(selector).forEach(element => {
    const value = Manipulator.getDataAttribute(element, styleProp);

    if (typeof value === 'undefined') {
      element.style.removeProperty(styleProp);
    } else {
      Manipulator.removeDataAttribute(element, styleProp);
      element.style[styleProp] = value;
    }
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
const Default$6 = {
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: document.body,
  // give the choice to place backdrop under different elements
  clickCallback: null
};
const DefaultType$6 = {
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: 'element',
  clickCallback: '(function|null)'
};
const NAME$7 = 'backdrop';
const CLASS_NAME_BACKDROP = 'modal-backdrop';
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$6 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$7}`;

class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._append();

    if (this._config.isAnimated) {
      reflow(this._getElement());
    }

    this._getElement().classList.add(CLASS_NAME_SHOW$6);

    this._emulateAnimation(() => {
      execute(callback);
    });
  }

  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW$6);

    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  } // Private


  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = CLASS_NAME_BACKDROP;

      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$5);
      }

      this._element = backdrop;
    }

    return this._element;
  }

  _getConfig(config) {
    config = { ...Default$6,
      ...(typeof config === 'object' ? config : {})
    };
    config.rootElement = config.rootElement || document.body;
    typeCheckConfig(NAME$7, config, DefaultType$6);
    return config;
  }

  _append() {
    if (this._isAppended) {
      return;
    }

    this._config.rootElement.appendChild(this._getElement());

    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }

  dispose() {
    if (!this._isAppended) {
      return;
    }

    EventHandler.off(this._element, EVENT_MOUSEDOWN);

    this._getElement().parentNode.removeChild(this._element);

    this._isAppended = false;
  }

  _emulateAnimation(callback) {
    if (!this._config.isAnimated) {
      execute(callback);
      return;
    }

    const backdropTransitionDuration = getTransitionDurationFromElement(this._getElement());
    EventHandler.one(this._getElement(), 'transitionend', () => execute(callback));
    emulateTransitionEnd(this._getElement(), backdropTransitionDuration);
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$6 = 'modal';
const DATA_KEY$6 = 'bs.modal';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
};
const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$6}`;
const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
const EVENT_CLICK_DISMISS$2 = `click.dismiss${EVENT_KEY$6}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._isShown = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
  } // Getters


  static get Default() {
    return Default$5;
  }

  static get NAME() {
    return NAME$6;
  } // Public


  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }

    if (this._isAnimated()) {
      this._isTransitioning = true;
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });

    if (this._isShown || showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;
    hide();
    document.body.classList.add(CLASS_NAME_OPEN);

    this._adjustDialog();

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, event => this.hide(event));
    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true;
        }
      });
    });

    this._showBackdrop(() => this._showElement(relatedTarget));
  }

  hide(event) {
    if (event) {
      event.preventDefault();
    }

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;

    const isAnimated = this._isAnimated();

    if (isAnimated) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.off(document, EVENT_FOCUSIN$2);

    this._element.classList.remove(CLASS_NAME_SHOW$5);

    EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

    this._queueCallback(() => this._hideModal(), this._element, isAnimated);
  }

  dispose() {
    [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

    this._backdrop.dispose();

    super.dispose();
    /**
     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `EVENT_CLICK_DATA_API` event that should remain
     */

    EventHandler.off(document, EVENT_FOCUSIN$2);
  }

  handleUpdate() {
    this._adjustDialog();
  } // Private


  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value
      isAnimated: this._isAnimated()
    });
  }

  _getConfig(config) {
    config = { ...Default$5,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    typeCheckConfig(NAME$6, config, DefaultType$5);
    return config;
  }

  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated();

    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element);
    }

    this._element.style.display = 'block';

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.scrollTop = 0;

    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    if (isAnimated) {
      reflow(this._element);
    }

    this._element.classList.add(CLASS_NAME_SHOW$5);

    if (this._config.focus) {
      this._enforceFocus();
    }

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.focus();
      }

      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };

    this._queueCallback(transitionComplete, this._dialog, isAnimated);
  }

  _enforceFocus() {
    EventHandler.off(document, EVENT_FOCUSIN$2); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN$2, event => {
      if (document !== event.target && this._element !== event.target && !this._element.contains(event.target)) {
        this._element.focus();
      }
    });
  }

  _setEscapeEvent() {
    if (this._isShown) {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
          event.preventDefault();
          this.hide();
        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
          this._triggerBackdropTransition();
        }
      });
    } else {
      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
    }
  }

  _setResizeEvent() {
    if (this._isShown) {
      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
    } else {
      EventHandler.off(window, EVENT_RESIZE);
    }
  }

  _hideModal() {
    this._element.style.display = 'none';

    this._element.setAttribute('aria-hidden', true);

    this._element.removeAttribute('aria-modal');

    this._element.removeAttribute('role');

    this._isTransitioning = false;

    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);

      this._resetAdjustments();

      reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    });
  }

  _showBackdrop(callback) {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, event => {
      if (this._ignoreBackdropClick) {
        this._ignoreBackdropClick = false;
        return;
      }

      if (event.target !== event.currentTarget) {
        return;
      }

      if (this._config.backdrop === true) {
        this.hide();
      } else if (this._config.backdrop === 'static') {
        this._triggerBackdropTransition();
      }
    });

    this._backdrop.show(callback);
  }

  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$4);
  }

  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }

    this._element.classList.add(CLASS_NAME_STATIC);

    const modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
    EventHandler.off(this._element, 'transitionend');
    EventHandler.one(this._element, 'transitionend', () => {
      this._element.classList.remove(CLASS_NAME_STATIC);

      if (!isModalOverflowing) {
        EventHandler.one(this._element, 'transitionend', () => {
          this._element.style.overflowY = '';
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);
      }
    });
    emulateTransitionEnd(this._element, modalTransitionDuration);

    this._element.focus();
  } // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // ----------------------------------------------------------------------


  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;

    if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
      this._element.style.paddingLeft = `${scrollbarWidth}px`;
    }

    if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
      this._element.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  } // Static


  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getInstance(this) || new Modal(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config](relatedTarget);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  const target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$3, showEvent => {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const data = Modal.getInstance(target) || new Modal(target);
  data.toggle(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Modal to jQuery only if jQuery is present
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$5 = 'offcanvas';
const DATA_KEY$5 = 'bs.offcanvas';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const DATA_API_KEY$2 = '.data-api';
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
const ESCAPE_KEY = 'Escape';
const Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$4 = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
};
const CLASS_NAME_SHOW$4 = 'show';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$5}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
const EVENT_CLICK_DISMISS$1 = `click.dismiss${EVENT_KEY$5}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
const SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();

    this._addEventListeners();
  } // Getters


  static get NAME() {
    return NAME$5;
  }

  static get Default() {
    return Default$4;
  } // Public


  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget) {
    if (this._isShown) {
      return;
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
      relatedTarget
    });

    if (showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;
    this._element.style.visibility = 'visible';

    this._backdrop.show();

    if (!this._config.scroll) {
      hide();

      this._enforceFocusOnElement(this._element);
    }

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.classList.add(CLASS_NAME_SHOW$4);

    const completeCallBack = () => {
      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
        relatedTarget
      });
    };

    this._queueCallback(completeCallBack, this._element, true);
  }

  hide() {
    if (!this._isShown) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

    if (hideEvent.defaultPrevented) {
      return;
    }

    EventHandler.off(document, EVENT_FOCUSIN$1);

    this._element.blur();

    this._isShown = false;

    this._element.classList.remove(CLASS_NAME_SHOW$4);

    this._backdrop.hide();

    const completeCallback = () => {
      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._element.style.visibility = 'hidden';

      if (!this._config.scroll) {
        reset();
      }

      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
    };

    this._queueCallback(completeCallback, this._element, true);
  }

  dispose() {
    this._backdrop.dispose();

    super.dispose();
    EventHandler.off(document, EVENT_FOCUSIN$1);
  } // Private


  _getConfig(config) {
    config = { ...Default$4,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$5, config, DefaultType$4);
    return config;
  }

  _initializeBackDrop() {
    return new Backdrop({
      isVisible: this._config.backdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: () => this.hide()
    });
  }

  _enforceFocusOnElement(element) {
    EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN$1, event => {
      if (document !== event.target && element !== event.target && !element.contains(event.target)) {
        element.focus();
      }
    });
    element.focus();
  }

  _addEventListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, () => this.hide());
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (this._config.keyboard && event.key === ESCAPE_KEY) {
        this.hide();
      }
    });
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Data.get(this, DATA_KEY$5) || new Offcanvas(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config](this);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  const target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  EventHandler.one(target, EVENT_HIDDEN$2, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus();
    }
  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }

  const data = Data.get(target, DATA_KEY$5) || new Offcanvas(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  SelectorEngine.find(OPEN_SELECTOR).forEach(el => (Data.get(el, DATA_KEY$5) || new Offcanvas(el)).show());
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const allowedAttribute = (attr, allowedAttributeList) => {
  const attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attrName)) {
    if (uriAttrs.has(attrName)) {
      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
    }

    return true;
  }

  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp); // Check if a regular expression validates the attribute.

  for (let i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attrName)) {
      return true;
    }
  }

  return false;
};

const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const allowlistKeys = Object.keys(allowList);
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

  for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i];
    const elName = el.nodeName.toLowerCase();

    if (!allowlistKeys.includes(elName)) {
      el.parentNode.removeChild(el);
      continue;
    }

    const attributeList = [].concat(...el.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
    attributeList.forEach(attr => {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  }

  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$4 = 'tooltip';
const DATA_KEY$4 = 'bs.tooltip';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const CLASS_PREFIX$1 = 'bs-tooltip';
const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
const DefaultType$3 = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(array|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacements: 'array',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object|function)'
};
const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
const Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: [0, 0],
  container: false,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  boundary: 'clippingParents',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
const Event$2 = {
  HIDE: `hide${EVENT_KEY$4}`,
  HIDDEN: `hidden${EVENT_KEY$4}`,
  SHOW: `show${EVENT_KEY$4}`,
  SHOWN: `shown${EVENT_KEY$4}`,
  INSERTED: `inserted${EVENT_KEY$4}`,
  CLICK: `click${EVENT_KEY$4}`,
  FOCUSIN: `focusin${EVENT_KEY$4}`,
  FOCUSOUT: `focusout${EVENT_KEY$4}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
};
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW$3 = 'show';
const HOVER_STATE_SHOW = 'show';
const HOVER_STATE_OUT = 'out';
const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }

    super(element); // private

    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = '';
    this._activeTrigger = {};
    this._popper = null; // Protected

    this._config = this._getConfig(config);
    this.tip = null;

    this._setListeners();
  } // Getters


  static get Default() {
    return Default$3;
  }

  static get NAME() {
    return NAME$4;
  }

  static get Event() {
    return Event$2;
  }

  static get DefaultType() {
    return DefaultType$3;
  } // Public


  enable() {
    this._isEnabled = true;
  }

  disable() {
    this._isEnabled = false;
  }

  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }

  toggle(event) {
    if (!this._isEnabled) {
      return;
    }

    if (event) {
      const context = this._initializeOnDelegatedTarget(event);

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
        this._leave(null, this);

        return;
      }

      this._enter(null, this);
    }
  }

  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this.tip && this.tip.parentNode) {
      this.tip.parentNode.removeChild(this.tip);
    }

    if (this._popper) {
      this._popper.destroy();
    }

    super.dispose();
  }

  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }

    if (!(this.isWithContent() && this._isEnabled)) {
      return;
    }

    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }

    const tip = this.getTipElement();
    const tipId = getUID(this.constructor.NAME);
    tip.setAttribute('id', tipId);

    this._element.setAttribute('aria-describedby', tipId);

    this.setContent();

    if (this._config.animation) {
      tip.classList.add(CLASS_NAME_FADE$3);
    }

    const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

    const attachment = this._getAttachment(placement);

    this._addAttachmentClass(attachment);

    const {
      container
    } = this._config;
    Data.set(tip, this.constructor.DATA_KEY, this);

    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.appendChild(tip);
      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
    }

    if (this._popper) {
      this._popper.update();
    } else {
      this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    tip.classList.add(CLASS_NAME_SHOW$3);
    const customClass = typeof this._config.customClass === 'function' ? this._config.customClass() : this._config.customClass;

    if (customClass) {
      tip.classList.add(...customClass.split(' '));
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(element => {
        EventHandler.on(element, 'mouseover', noop);
      });
    }

    const complete = () => {
      const prevHoverState = this._hoverState;
      this._hoverState = null;
      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

      if (prevHoverState === HOVER_STATE_OUT) {
        this._leave(null, this);
      }
    };

    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

    this._queueCallback(complete, this.tip, isAnimated);
  }

  hide() {
    if (!this._popper) {
      return;
    }

    const tip = this.getTipElement();

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }

      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      this._cleanTipClass();

      this._element.removeAttribute('aria-describedby');

      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support

    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$3);

    this._queueCallback(complete, this.tip, isAnimated);

    this._hoverState = '';
  }

  update() {
    if (this._popper !== null) {
      this._popper.update();
    }
  } // Protected


  isWithContent() {
    return Boolean(this.getTitle());
  }

  getTipElement() {
    if (this.tip) {
      return this.tip;
    }

    const element = document.createElement('div');
    element.innerHTML = this._config.template;
    this.tip = element.children[0];
    return this.tip;
  }

  setContent() {
    const tip = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
    tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
  }

  setElementContent(element, content) {
    if (element === null) {
      return;
    }

    if (isElement(content)) {
      content = getElement(content); // content is a DOM node or a jQuery

      if (this._config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = '';
          element.appendChild(content);
        }
      } else {
        element.textContent = content.textContent;
      }

      return;
    }

    if (this._config.html) {
      if (this._config.sanitize) {
        content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
      }

      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }

  getTitle() {
    let title = this._element.getAttribute('data-bs-original-title');

    if (!title) {
      title = typeof this._config.title === 'function' ? this._config.title.call(this._element) : this._config.title;
    }

    return title;
  }

  updateAttachment(attachment) {
    if (attachment === 'right') {
      return 'end';
    }

    if (attachment === 'left') {
      return 'start';
    }

    return attachment;
  } // Private


  _initializeOnDelegatedTarget(event, context) {
    const dataKey = this.constructor.DATA_KEY;
    context = context || Data.get(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
      Data.set(event.delegateTarget, dataKey, context);
    }

    return context;
  }

  _getOffset() {
    const {
      offset
    } = this._config;

    if (typeof offset === 'string') {
      return offset.split(',').map(val => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: 'onChange',
        enabled: true,
        phase: 'afterWrite',
        fn: data => this._handlePopperPlacementChange(data)
      }],
      onFirstUpdate: data => {
        if (data.options.placement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      }
    };
    return { ...defaultBsPopperConfig,
      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
    };
  }

  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX$1}-${this.updateAttachment(attachment)}`);
  }

  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  }

  _setListeners() {
    const triggers = this._config.trigger.split(' ');

    triggers.forEach(trigger => {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        EventHandler.on(this._element, eventIn, this._config.selector, event => this._enter(event));
        EventHandler.on(this._element, eventOut, this._config.selector, event => this._leave(event));
      }
    });

    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };

    EventHandler.on(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this._config.selector) {
      this._config = { ...this._config,
        trigger: 'manual',
        selector: ''
      };
    } else {
      this._fixTitle();
    }
  }

  _fixTitle() {
    const title = this._element.getAttribute('title');

    const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

    if (title || originalTitleType !== 'string') {
      this._element.setAttribute('data-bs-original-title', title || '');

      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('title', '');
    }
  }

  _enter(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);

    if (event) {
      context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    }

    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_SHOW;

    if (!context._config.delay || !context._config.delay.show) {
      context.show();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context._config.delay.show);
  }

  _leave(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);

    if (event) {
      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
    }

    if (context._isWithActiveTrigger()) {
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_OUT;

    if (!context._config.delay || !context._config.delay.hide) {
      context.hide();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context._config.delay.hide);
  }

  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }

    return false;
  }

  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    Object.keys(dataAttributes).forEach(dataAttr => {
      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
        delete dataAttributes[dataAttr];
      }
    });
    config = { ...this.constructor.Default,
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };
    config.container = config.container === false ? document.body : getElement(config.container);

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }

    return config;
  }

  _getDelegateConfig() {
    const config = {};

    if (this._config) {
      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      }
    }

    return config;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
    }
  }

  _handlePopperPlacementChange(popperData) {
    const {
      state
    } = popperData;

    if (!state) {
      return;
    }

    this.tip = state.elements.popper;

    this._cleanTipClass();

    this._addAttachmentClass(this._getAttachment(state.placement));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$4);

      const _config = typeof config === 'object' && config;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Tooltip(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */


defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$3 = 'popover';
const DATA_KEY$3 = 'bs.popover';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const CLASS_PREFIX = 'bs-popover';
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
const Default$2 = { ...Tooltip.Default,
  placement: 'right',
  offset: [0, 8],
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
};
const DefaultType$2 = { ...Tooltip.DefaultType,
  content: '(string|element|function)'
};
const Event$1 = {
  HIDE: `hide${EVENT_KEY$3}`,
  HIDDEN: `hidden${EVENT_KEY$3}`,
  SHOW: `show${EVENT_KEY$3}`,
  SHOWN: `shown${EVENT_KEY$3}`,
  INSERTED: `inserted${EVENT_KEY$3}`,
  CLICK: `click${EVENT_KEY$3}`,
  FOCUSIN: `focusin${EVENT_KEY$3}`,
  FOCUSOUT: `focusout${EVENT_KEY$3}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
};
const CLASS_NAME_FADE$2 = 'fade';
const CLASS_NAME_SHOW$2 = 'show';
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }

  static get NAME() {
    return NAME$3;
  }

  static get Event() {
    return Event$1;
  }

  static get DefaultType() {
    return DefaultType$2;
  } // Overrides


  isWithContent() {
    return this.getTitle() || this._getContent();
  }

  setContent() {
    const tip = this.getTipElement(); // we use append for html objects to maintain js events

    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

    let content = this._getContent();

    if (typeof content === 'function') {
      content = content.call(this._element);
    }

    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
  } // Private


  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${this.updateAttachment(attachment)}`);
  }

  _getContent() {
    return this._element.getAttribute('data-bs-content') || this._config.content;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$3);

      const _config = typeof config === 'object' ? config : null;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Popover(this, _config);
        Data.set(this, DATA_KEY$3, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */


defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY$1 = '.data-api';
const Default$1 = {
  offset: 10,
  method: 'auto',
  target: ''
};
const DefaultType$1 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_DROPDOWN$1 = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const METHOD_OFFSET = 'offset';
const METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
    this._config = this._getConfig(config);
    this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS}, ${this._config.target} ${SELECTOR_LIST_ITEMS}, ${this._config.target} .${CLASS_NAME_DROPDOWN_ITEM}`;
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
    this.refresh();

    this._process();
  } // Getters


  static get Default() {
    return Default$1;
  }

  static get NAME() {
    return NAME$2;
  } // Public


  refresh() {
    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    const targets = SelectorEngine.find(this._selector);
    targets.map(element => {
      const targetSelector = getSelectorFromElement(element);
      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

      if (target) {
        const targetBCR = target.getBoundingClientRect();

        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }

      return null;
    }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
      this._offsets.push(item[0]);

      this._targets.push(item[1]);
    });
  }

  dispose() {
    EventHandler.off(this._scrollElement, EVENT_KEY$2);
    super.dispose();
  } // Private


  _getConfig(config) {
    config = { ...Default$1,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };

    if (typeof config.target !== 'string' && isElement(config.target)) {
      let {
        id
      } = config.target;

      if (!id) {
        id = getUID(NAME$2);
        config.target.id = id;
      }

      config.target = `#${id}`;
    }

    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }

  _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }

  _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }

  _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }

  _process() {
    const scrollTop = this._getScrollTop() + this._config.offset;

    const scrollHeight = this._getScrollHeight();

    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];

      if (this._activeTarget !== target) {
        this._activate(target);
      }

      return;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;

      this._clear();

      return;
    }

    for (let i = this._offsets.length; i--;) {
      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  }

  _activate(target) {
    this._activeTarget = target;

    this._clear();

    const queries = this._selector.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);

    const link = SelectorEngine.findOne(queries.join(','));

    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
      link.classList.add(CLASS_NAME_ACTIVE$1);
    } else {
      // Set triggered link as active
      link.classList.add(CLASS_NAME_ACTIVE$1);
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
        });
      });
    }

    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }

  _clear() {
    SelectorEngine.find(this._selector).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getInstance(this) || new ScrollSpy(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ScrollSpy to jQuery only if jQuery is present
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const DATA_API_KEY = '.data-api';
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ACTIVE_UL = ':scope > li > .active';
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tab extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$1;
  } // Public


  show() {
    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
      return;
    }

    let previous;
    const target = getElementFromSelector(this._element);

    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

    if (listElement) {
      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }

    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
      relatedTarget: this._element
    }) : null;
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
      relatedTarget: previous
    });

    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }

    this._activate(this._element, listElement);

    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
        relatedTarget: this._element
      });
      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
        relatedTarget: previous
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  } // Private


  _activate(element, container, callback) {
    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

    const complete = () => this._transitionComplete(element, active, callback);

    if (active && isTransitioning) {
      active.classList.remove(CLASS_NAME_SHOW$1);

      this._queueCallback(complete, element, true);
    } else {
      complete();
    }
  }

  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);
      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    element.classList.add(CLASS_NAME_ACTIVE);

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    reflow(element);

    if (element.classList.contains(CLASS_NAME_FADE$1)) {
      element.classList.add(CLASS_NAME_SHOW$1);
    }

    let parent = element.parentNode;

    if (parent && parent.nodeName === 'LI') {
      parent = parent.parentNode;
    }

    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);

      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Data.get(this, DATA_KEY$1) || new Tab(this);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  const data = Data.get(this, DATA_KEY$1) || new Tab(this);
  data.show();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.1): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide';
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;

    this._setListeners();
  } // Getters


  static get DefaultType() {
    return DefaultType;
  }

  static get Default() {
    return Default;
  }

  static get NAME() {
    return NAME;
  } // Public


  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);

      this._element.classList.add(CLASS_NAME_SHOW);

      EventHandler.trigger(this._element, EVENT_SHOWN);

      this._maybeScheduleHide();
    };

    this._element.classList.remove(CLASS_NAME_HIDE);

    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOWING);

    this._queueCallback(complete, this._element, this._config.animation);
  }

  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);

      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };

    this._element.classList.remove(CLASS_NAME_SHOW);

    this._queueCallback(complete, this._element, this._config.animation);
  }

  dispose() {
    this._clearTimeout();

    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    super.dispose();
  } // Private


  _getConfig(config) {
    config = { ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };
    typeCheckConfig(NAME, config, this.constructor.DefaultType);
    return config;
  }

  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }

    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }

    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }

  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        this._hasMouseInteraction = isInteracting;
        break;

      case 'focusin':
      case 'focusout':
        this._hasKeyboardInteraction = isInteracting;
        break;
    }

    if (isInteracting) {
      this._clearTimeout();

      return;
    }

    const nextElement = event.relatedTarget;

    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }

    this._maybeScheduleHide();
  }

  _setListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
  }

  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY);

      const _config = typeof config === 'object' && config;

      if (!data) {
        data = new Toast(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */


defineJQueryPlugin(Toast);


//# sourceMappingURL=bootstrap.esm.js.map


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_images_bg_main_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/images/bg-main.jpg */ "./src/assets/images/bg-main.jpg");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_assets_images_bg_main_jpg__WEBPACK_IMPORTED_MODULE_3__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*!\n * Bootstrap v5.0.1 (https://getbootstrap.com/)\n * Copyright 2011-2021 The Bootstrap Authors\n * Copyright 2011-2021 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */\n:root {\n  --bs-blue: #0d6efd;\n  --bs-indigo: #6610f2;\n  --bs-purple: #6f42c1;\n  --bs-pink: #d63384;\n  --bs-red: #dc3545;\n  --bs-orange: #fd7e14;\n  --bs-yellow: #ffc107;\n  --bs-green: #198754;\n  --bs-teal: #20c997;\n  --bs-cyan: #0dcaf0;\n  --bs-white: #fff;\n  --bs-gray: #6c757d;\n  --bs-gray-dark: #343a40;\n  --bs-primary: #0d6efd;\n  --bs-secondary: #6c757d;\n  --bs-success: #198754;\n  --bs-info: #0dcaf0;\n  --bs-warning: #ffc107;\n  --bs-danger: #dc3545;\n  --bs-light: #f8f9fa;\n  --bs-dark: #212529;\n  --bs-font-sans-serif: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0)); }\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\n@media (prefers-reduced-motion: no-preference) {\n  :root {\n    scroll-behavior: smooth; } }\n\nbody {\n  margin: 0;\n  font-family: var(--bs-font-sans-serif);\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  background-color: #fff;\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n\nhr {\n  margin: 1rem 0;\n  color: inherit;\n  background-color: currentColor;\n  border: 0;\n  opacity: 0.25; }\n\nhr:not([size]) {\n  height: 1px; }\n\nh1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2; }\n\nh1, .h1 {\n  font-size: calc(1.375rem + 1.5vw); }\n  @media (min-width: 1200px) {\n    h1, .h1 {\n      font-size: 2.5rem; } }\n\nh2, .h2 {\n  font-size: calc(1.325rem + 0.9vw); }\n  @media (min-width: 1200px) {\n    h2, .h2 {\n      font-size: 2rem; } }\n\nh3, .h3 {\n  font-size: calc(1.3rem + 0.6vw); }\n  @media (min-width: 1200px) {\n    h3, .h3 {\n      font-size: 1.75rem; } }\n\nh4, .h4 {\n  font-size: calc(1.275rem + 0.3vw); }\n  @media (min-width: 1200px) {\n    h4, .h4 {\n      font-size: 1.5rem; } }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-bs-original-title] {\n  text-decoration: underline dotted;\n  cursor: help;\n  text-decoration-skip-ink: none; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul {\n  padding-left: 2rem; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: 700; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\nsmall, .small {\n  font-size: 0.875em; }\n\nmark, .mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 0.75em;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -.25em; }\n\nsup {\n  top: -.5em; }\n\na {\n  color: #0d6efd;\n  text-decoration: underline; }\n  a:hover {\n    color: #0a58ca; }\n\na:not([href]):not([class]), a:not([href]):not([class]):hover {\n  color: inherit;\n  text-decoration: none; }\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: var(--bs-font-monospace);\n  font-size: 1em;\n  direction: ltr /* rtl:ignore */;\n  unicode-bidi: bidi-override; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n  font-size: 0.875em; }\n  pre code {\n    font-size: inherit;\n    color: inherit;\n    word-break: normal; }\n\ncode {\n  font-size: 0.875em;\n  color: #d63384;\n  word-wrap: break-word; }\n  a > code {\n    color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 0.875em;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 1em;\n    font-weight: 700; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg,\nsvg {\n  vertical-align: middle; }\n\ntable {\n  caption-side: bottom;\n  border-collapse: collapse; }\n\ncaption {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  color: #6c757d;\n  text-align: left; }\n\nth {\n  text-align: inherit;\n  text-align: -webkit-match-parent; }\n\nthead,\ntbody,\ntfoot,\ntr,\ntd,\nth {\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0; }\n\nlabel {\n  display: inline-block; }\n\nbutton {\n  border-radius: 0; }\n\nbutton:focus:not(:focus-visible) {\n  outline: 0; }\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\nbutton,\nselect {\n  text-transform: none; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\nselect {\n  word-wrap: normal; }\n  select:disabled {\n    opacity: 1; }\n\n[list]::-webkit-calendar-picker-indicator {\n  display: none; }\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n  button:not(:disabled),\n  [type=\"button\"]:not(:disabled),\n  [type=\"reset\"]:not(:disabled),\n  [type=\"submit\"]:not(:disabled) {\n    cursor: pointer; }\n\n::-moz-focus-inner {\n  padding: 0;\n  border-style: none; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  float: left;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 0.5rem;\n  font-size: calc(1.275rem + 0.3vw);\n  line-height: inherit; }\n  @media (min-width: 1200px) {\n    legend {\n      font-size: 1.5rem; } }\n  legend + * {\n    clear: left; }\n\n::-webkit-datetime-edit-fields-wrapper,\n::-webkit-datetime-edit-text,\n::-webkit-datetime-edit-minute,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-year-field {\n  padding: 0; }\n\n::-webkit-inner-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  outline-offset: -2px;\n  -webkit-appearance: textfield; }\n\n/* rtl:raw:\n[type=\"tel\"],\n[type=\"url\"],\n[type=\"email\"],\n[type=\"number\"] {\n  direction: ltr;\n}\n*/\n::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-color-swatch-wrapper {\n  padding: 0; }\n\n::file-selector-button {\n  font: inherit; }\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button; }\n\noutput {\n  display: inline-block; }\n\niframe {\n  border: 0; }\n\nsummary {\n  display: list-item;\n  cursor: pointer; }\n\nprogress {\n  vertical-align: baseline; }\n\n[hidden] {\n  display: none !important; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: calc(1.625rem + 4.5vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-1 {\n      font-size: 5rem; } }\n\n.display-2 {\n  font-size: calc(1.575rem + 3.9vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-2 {\n      font-size: 4.5rem; } }\n\n.display-3 {\n  font-size: calc(1.525rem + 3.3vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-3 {\n      font-size: 4rem; } }\n\n.display-4 {\n  font-size: calc(1.475rem + 2.7vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-4 {\n      font-size: 3.5rem; } }\n\n.display-5 {\n  font-size: calc(1.425rem + 2.1vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-5 {\n      font-size: 3rem; } }\n\n.display-6 {\n  font-size: calc(1.375rem + 1.5vw);\n  font-weight: 300;\n  line-height: 1.2; }\n  @media (min-width: 1200px) {\n    .display-6 {\n      font-size: 2.5rem; } }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 0.5rem; }\n\n.initialism {\n  font-size: 0.875em;\n  text-transform: uppercase; }\n\n.blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem; }\n  .blockquote > :last-child {\n    margin-bottom: 0; }\n\n.blockquote-footer {\n  margin-top: -1rem;\n  margin-bottom: 1rem;\n  font-size: 0.875em;\n  color: #6c757d; }\n  .blockquote-footer::before {\n    content: \"\\2014\\00A0\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 0.875em;\n  color: #6c757d; }\n\n.container,\n.container-fluid,\n.container-sm,\n.container-md,\n.container-lg,\n.container-xl,\n.container-xxl {\n  width: 100%;\n  padding-right: var(--bs-gutter-x, 0.75rem);\n  padding-left: var(--bs-gutter-x, 0.75rem);\n  margin-right: auto;\n  margin-left: auto; }\n\n@media (min-width: 576px) {\n  .container, .container-sm {\n    max-width: 540px; } }\n\n@media (min-width: 768px) {\n  .container, .container-sm, .container-md {\n    max-width: 720px; } }\n\n@media (min-width: 992px) {\n  .container, .container-sm, .container-md, .container-lg {\n    max-width: 960px; } }\n\n@media (min-width: 1200px) {\n  .container, .container-sm, .container-md, .container-lg, .container-xl {\n    max-width: 1140px; } }\n\n@media (min-width: 1400px) {\n  .container, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl {\n    max-width: 1320px; } }\n\n.row {\n  --bs-gutter-x: 1.5rem;\n  --bs-gutter-y: 0;\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: calc(var(--bs-gutter-y) * -1);\n  margin-right: calc(var(--bs-gutter-x) / -2);\n  margin-left: calc(var(--bs-gutter-x) / -2); }\n  .row > * {\n    flex-shrink: 0;\n    width: 100%;\n    max-width: 100%;\n    padding-right: calc(var(--bs-gutter-x) / 2);\n    padding-left: calc(var(--bs-gutter-x) / 2);\n    margin-top: var(--bs-gutter-y); }\n\n.col {\n  flex: 1 0 0%; }\n\n.row-cols-auto > * {\n  flex: 0 0 auto;\n  width: auto; }\n\n.row-cols-1 > * {\n  flex: 0 0 auto;\n  width: 100%; }\n\n.row-cols-2 > * {\n  flex: 0 0 auto;\n  width: 50%; }\n\n.row-cols-3 > * {\n  flex: 0 0 auto;\n  width: 33.33333%; }\n\n.row-cols-4 > * {\n  flex: 0 0 auto;\n  width: 25%; }\n\n.row-cols-5 > * {\n  flex: 0 0 auto;\n  width: 20%; }\n\n.row-cols-6 > * {\n  flex: 0 0 auto;\n  width: 16.66667%; }\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  flex: 0 0 auto;\n  width: 8.33333%; }\n\n.col-2 {\n  flex: 0 0 auto;\n  width: 16.66667%; }\n\n.col-3 {\n  flex: 0 0 auto;\n  width: 25%; }\n\n.col-4 {\n  flex: 0 0 auto;\n  width: 33.33333%; }\n\n.col-5 {\n  flex: 0 0 auto;\n  width: 41.66667%; }\n\n.col-6 {\n  flex: 0 0 auto;\n  width: 50%; }\n\n.col-7 {\n  flex: 0 0 auto;\n  width: 58.33333%; }\n\n.col-8 {\n  flex: 0 0 auto;\n  width: 66.66667%; }\n\n.col-9 {\n  flex: 0 0 auto;\n  width: 75%; }\n\n.col-10 {\n  flex: 0 0 auto;\n  width: 83.33333%; }\n\n.col-11 {\n  flex: 0 0 auto;\n  width: 91.66667%; }\n\n.col-12 {\n  flex: 0 0 auto;\n  width: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n.g-0,\n.gx-0 {\n  --bs-gutter-x: 0; }\n\n.g-0,\n.gy-0 {\n  --bs-gutter-y: 0; }\n\n.g-1,\n.gx-1 {\n  --bs-gutter-x: 0.25rem; }\n\n.g-1,\n.gy-1 {\n  --bs-gutter-y: 0.25rem; }\n\n.g-2,\n.gx-2 {\n  --bs-gutter-x: 0.5rem; }\n\n.g-2,\n.gy-2 {\n  --bs-gutter-y: 0.5rem; }\n\n.g-3,\n.gx-3 {\n  --bs-gutter-x: 1rem; }\n\n.g-3,\n.gy-3 {\n  --bs-gutter-y: 1rem; }\n\n.g-4,\n.gx-4 {\n  --bs-gutter-x: 1.5rem; }\n\n.g-4,\n.gy-4 {\n  --bs-gutter-y: 1.5rem; }\n\n.g-5,\n.gx-5 {\n  --bs-gutter-x: 3rem; }\n\n.g-5,\n.gy-5 {\n  --bs-gutter-y: 3rem; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex: 1 0 0%; }\n  .row-cols-sm-auto > * {\n    flex: 0 0 auto;\n    width: auto; }\n  .row-cols-sm-1 > * {\n    flex: 0 0 auto;\n    width: 100%; }\n  .row-cols-sm-2 > * {\n    flex: 0 0 auto;\n    width: 50%; }\n  .row-cols-sm-3 > * {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .row-cols-sm-4 > * {\n    flex: 0 0 auto;\n    width: 25%; }\n  .row-cols-sm-5 > * {\n    flex: 0 0 auto;\n    width: 20%; }\n  .row-cols-sm-6 > * {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    flex: 0 0 auto;\n    width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 auto;\n    width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 auto;\n    width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 auto;\n    width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 auto;\n    width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 auto;\n    width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 auto;\n    width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 auto;\n    width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 auto;\n    width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 auto;\n    width: 100%; }\n  .offset-sm-0 {\n    margin-left: 0; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; }\n  .g-sm-0,\n  .gx-sm-0 {\n    --bs-gutter-x: 0; }\n  .g-sm-0,\n  .gy-sm-0 {\n    --bs-gutter-y: 0; }\n  .g-sm-1,\n  .gx-sm-1 {\n    --bs-gutter-x: 0.25rem; }\n  .g-sm-1,\n  .gy-sm-1 {\n    --bs-gutter-y: 0.25rem; }\n  .g-sm-2,\n  .gx-sm-2 {\n    --bs-gutter-x: 0.5rem; }\n  .g-sm-2,\n  .gy-sm-2 {\n    --bs-gutter-y: 0.5rem; }\n  .g-sm-3,\n  .gx-sm-3 {\n    --bs-gutter-x: 1rem; }\n  .g-sm-3,\n  .gy-sm-3 {\n    --bs-gutter-y: 1rem; }\n  .g-sm-4,\n  .gx-sm-4 {\n    --bs-gutter-x: 1.5rem; }\n  .g-sm-4,\n  .gy-sm-4 {\n    --bs-gutter-y: 1.5rem; }\n  .g-sm-5,\n  .gx-sm-5 {\n    --bs-gutter-x: 3rem; }\n  .g-sm-5,\n  .gy-sm-5 {\n    --bs-gutter-y: 3rem; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex: 1 0 0%; }\n  .row-cols-md-auto > * {\n    flex: 0 0 auto;\n    width: auto; }\n  .row-cols-md-1 > * {\n    flex: 0 0 auto;\n    width: 100%; }\n  .row-cols-md-2 > * {\n    flex: 0 0 auto;\n    width: 50%; }\n  .row-cols-md-3 > * {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .row-cols-md-4 > * {\n    flex: 0 0 auto;\n    width: 25%; }\n  .row-cols-md-5 > * {\n    flex: 0 0 auto;\n    width: 20%; }\n  .row-cols-md-6 > * {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    flex: 0 0 auto;\n    width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 auto;\n    width: 25%; }\n  .col-md-4 {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 auto;\n    width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 auto;\n    width: 50%; }\n  .col-md-7 {\n    flex: 0 0 auto;\n    width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 auto;\n    width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 auto;\n    width: 75%; }\n  .col-md-10 {\n    flex: 0 0 auto;\n    width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 auto;\n    width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 auto;\n    width: 100%; }\n  .offset-md-0 {\n    margin-left: 0; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; }\n  .g-md-0,\n  .gx-md-0 {\n    --bs-gutter-x: 0; }\n  .g-md-0,\n  .gy-md-0 {\n    --bs-gutter-y: 0; }\n  .g-md-1,\n  .gx-md-1 {\n    --bs-gutter-x: 0.25rem; }\n  .g-md-1,\n  .gy-md-1 {\n    --bs-gutter-y: 0.25rem; }\n  .g-md-2,\n  .gx-md-2 {\n    --bs-gutter-x: 0.5rem; }\n  .g-md-2,\n  .gy-md-2 {\n    --bs-gutter-y: 0.5rem; }\n  .g-md-3,\n  .gx-md-3 {\n    --bs-gutter-x: 1rem; }\n  .g-md-3,\n  .gy-md-3 {\n    --bs-gutter-y: 1rem; }\n  .g-md-4,\n  .gx-md-4 {\n    --bs-gutter-x: 1.5rem; }\n  .g-md-4,\n  .gy-md-4 {\n    --bs-gutter-y: 1.5rem; }\n  .g-md-5,\n  .gx-md-5 {\n    --bs-gutter-x: 3rem; }\n  .g-md-5,\n  .gy-md-5 {\n    --bs-gutter-y: 3rem; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex: 1 0 0%; }\n  .row-cols-lg-auto > * {\n    flex: 0 0 auto;\n    width: auto; }\n  .row-cols-lg-1 > * {\n    flex: 0 0 auto;\n    width: 100%; }\n  .row-cols-lg-2 > * {\n    flex: 0 0 auto;\n    width: 50%; }\n  .row-cols-lg-3 > * {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .row-cols-lg-4 > * {\n    flex: 0 0 auto;\n    width: 25%; }\n  .row-cols-lg-5 > * {\n    flex: 0 0 auto;\n    width: 20%; }\n  .row-cols-lg-6 > * {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    flex: 0 0 auto;\n    width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 auto;\n    width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 auto;\n    width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 auto;\n    width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 auto;\n    width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 auto;\n    width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 auto;\n    width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 auto;\n    width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 auto;\n    width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 auto;\n    width: 100%; }\n  .offset-lg-0 {\n    margin-left: 0; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; }\n  .g-lg-0,\n  .gx-lg-0 {\n    --bs-gutter-x: 0; }\n  .g-lg-0,\n  .gy-lg-0 {\n    --bs-gutter-y: 0; }\n  .g-lg-1,\n  .gx-lg-1 {\n    --bs-gutter-x: 0.25rem; }\n  .g-lg-1,\n  .gy-lg-1 {\n    --bs-gutter-y: 0.25rem; }\n  .g-lg-2,\n  .gx-lg-2 {\n    --bs-gutter-x: 0.5rem; }\n  .g-lg-2,\n  .gy-lg-2 {\n    --bs-gutter-y: 0.5rem; }\n  .g-lg-3,\n  .gx-lg-3 {\n    --bs-gutter-x: 1rem; }\n  .g-lg-3,\n  .gy-lg-3 {\n    --bs-gutter-y: 1rem; }\n  .g-lg-4,\n  .gx-lg-4 {\n    --bs-gutter-x: 1.5rem; }\n  .g-lg-4,\n  .gy-lg-4 {\n    --bs-gutter-y: 1.5rem; }\n  .g-lg-5,\n  .gx-lg-5 {\n    --bs-gutter-x: 3rem; }\n  .g-lg-5,\n  .gy-lg-5 {\n    --bs-gutter-y: 3rem; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex: 1 0 0%; }\n  .row-cols-xl-auto > * {\n    flex: 0 0 auto;\n    width: auto; }\n  .row-cols-xl-1 > * {\n    flex: 0 0 auto;\n    width: 100%; }\n  .row-cols-xl-2 > * {\n    flex: 0 0 auto;\n    width: 50%; }\n  .row-cols-xl-3 > * {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .row-cols-xl-4 > * {\n    flex: 0 0 auto;\n    width: 25%; }\n  .row-cols-xl-5 > * {\n    flex: 0 0 auto;\n    width: 20%; }\n  .row-cols-xl-6 > * {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    flex: 0 0 auto;\n    width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 auto;\n    width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 auto;\n    width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 auto;\n    width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 auto;\n    width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 auto;\n    width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 auto;\n    width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 auto;\n    width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 auto;\n    width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 auto;\n    width: 100%; }\n  .offset-xl-0 {\n    margin-left: 0; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; }\n  .g-xl-0,\n  .gx-xl-0 {\n    --bs-gutter-x: 0; }\n  .g-xl-0,\n  .gy-xl-0 {\n    --bs-gutter-y: 0; }\n  .g-xl-1,\n  .gx-xl-1 {\n    --bs-gutter-x: 0.25rem; }\n  .g-xl-1,\n  .gy-xl-1 {\n    --bs-gutter-y: 0.25rem; }\n  .g-xl-2,\n  .gx-xl-2 {\n    --bs-gutter-x: 0.5rem; }\n  .g-xl-2,\n  .gy-xl-2 {\n    --bs-gutter-y: 0.5rem; }\n  .g-xl-3,\n  .gx-xl-3 {\n    --bs-gutter-x: 1rem; }\n  .g-xl-3,\n  .gy-xl-3 {\n    --bs-gutter-y: 1rem; }\n  .g-xl-4,\n  .gx-xl-4 {\n    --bs-gutter-x: 1.5rem; }\n  .g-xl-4,\n  .gy-xl-4 {\n    --bs-gutter-y: 1.5rem; }\n  .g-xl-5,\n  .gx-xl-5 {\n    --bs-gutter-x: 3rem; }\n  .g-xl-5,\n  .gy-xl-5 {\n    --bs-gutter-y: 3rem; } }\n\n@media (min-width: 1400px) {\n  .col-xxl {\n    flex: 1 0 0%; }\n  .row-cols-xxl-auto > * {\n    flex: 0 0 auto;\n    width: auto; }\n  .row-cols-xxl-1 > * {\n    flex: 0 0 auto;\n    width: 100%; }\n  .row-cols-xxl-2 > * {\n    flex: 0 0 auto;\n    width: 50%; }\n  .row-cols-xxl-3 > * {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .row-cols-xxl-4 > * {\n    flex: 0 0 auto;\n    width: 25%; }\n  .row-cols-xxl-5 > * {\n    flex: 0 0 auto;\n    width: 20%; }\n  .row-cols-xxl-6 > * {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-xxl-auto {\n    flex: 0 0 auto;\n    width: auto; }\n  .col-xxl-1 {\n    flex: 0 0 auto;\n    width: 8.33333%; }\n  .col-xxl-2 {\n    flex: 0 0 auto;\n    width: 16.66667%; }\n  .col-xxl-3 {\n    flex: 0 0 auto;\n    width: 25%; }\n  .col-xxl-4 {\n    flex: 0 0 auto;\n    width: 33.33333%; }\n  .col-xxl-5 {\n    flex: 0 0 auto;\n    width: 41.66667%; }\n  .col-xxl-6 {\n    flex: 0 0 auto;\n    width: 50%; }\n  .col-xxl-7 {\n    flex: 0 0 auto;\n    width: 58.33333%; }\n  .col-xxl-8 {\n    flex: 0 0 auto;\n    width: 66.66667%; }\n  .col-xxl-9 {\n    flex: 0 0 auto;\n    width: 75%; }\n  .col-xxl-10 {\n    flex: 0 0 auto;\n    width: 83.33333%; }\n  .col-xxl-11 {\n    flex: 0 0 auto;\n    width: 91.66667%; }\n  .col-xxl-12 {\n    flex: 0 0 auto;\n    width: 100%; }\n  .offset-xxl-0 {\n    margin-left: 0; }\n  .offset-xxl-1 {\n    margin-left: 8.33333%; }\n  .offset-xxl-2 {\n    margin-left: 16.66667%; }\n  .offset-xxl-3 {\n    margin-left: 25%; }\n  .offset-xxl-4 {\n    margin-left: 33.33333%; }\n  .offset-xxl-5 {\n    margin-left: 41.66667%; }\n  .offset-xxl-6 {\n    margin-left: 50%; }\n  .offset-xxl-7 {\n    margin-left: 58.33333%; }\n  .offset-xxl-8 {\n    margin-left: 66.66667%; }\n  .offset-xxl-9 {\n    margin-left: 75%; }\n  .offset-xxl-10 {\n    margin-left: 83.33333%; }\n  .offset-xxl-11 {\n    margin-left: 91.66667%; }\n  .g-xxl-0,\n  .gx-xxl-0 {\n    --bs-gutter-x: 0; }\n  .g-xxl-0,\n  .gy-xxl-0 {\n    --bs-gutter-y: 0; }\n  .g-xxl-1,\n  .gx-xxl-1 {\n    --bs-gutter-x: 0.25rem; }\n  .g-xxl-1,\n  .gy-xxl-1 {\n    --bs-gutter-y: 0.25rem; }\n  .g-xxl-2,\n  .gx-xxl-2 {\n    --bs-gutter-x: 0.5rem; }\n  .g-xxl-2,\n  .gy-xxl-2 {\n    --bs-gutter-y: 0.5rem; }\n  .g-xxl-3,\n  .gx-xxl-3 {\n    --bs-gutter-x: 1rem; }\n  .g-xxl-3,\n  .gy-xxl-3 {\n    --bs-gutter-y: 1rem; }\n  .g-xxl-4,\n  .gx-xxl-4 {\n    --bs-gutter-x: 1.5rem; }\n  .g-xxl-4,\n  .gy-xxl-4 {\n    --bs-gutter-y: 1.5rem; }\n  .g-xxl-5,\n  .gx-xxl-5 {\n    --bs-gutter-x: 3rem; }\n  .g-xxl-5,\n  .gy-xxl-5 {\n    --bs-gutter-y: 3rem; } }\n\n.table {\n  --bs-table-bg: transparent;\n  --bs-table-accent-bg: transparent;\n  --bs-table-striped-color: #212529;\n  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);\n  --bs-table-active-color: #212529;\n  --bs-table-active-bg: rgba(0, 0, 0, 0.1);\n  --bs-table-hover-color: #212529;\n  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #212529;\n  vertical-align: top;\n  border-color: #dee2e6; }\n  .table > :not(caption) > * > * {\n    padding: 0.5rem 0.5rem;\n    background-color: var(--bs-table-bg);\n    border-bottom-width: 1px;\n    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg); }\n  .table > tbody {\n    vertical-align: inherit; }\n  .table > thead {\n    vertical-align: bottom; }\n  .table > :not(:last-child) > :last-child > * {\n    border-bottom-color: currentColor; }\n\n.caption-top {\n  caption-side: top; }\n\n.table-sm > :not(caption) > * > * {\n  padding: 0.25rem 0.25rem; }\n\n.table-bordered > :not(caption) > * {\n  border-width: 1px 0; }\n  .table-bordered > :not(caption) > * > * {\n    border-width: 0 1px; }\n\n.table-borderless > :not(caption) > * > * {\n  border-bottom-width: 0; }\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  --bs-table-accent-bg: var(--bs-table-striped-bg);\n  color: var(--bs-table-striped-color); }\n\n.table-active {\n  --bs-table-accent-bg: var(--bs-table-active-bg);\n  color: var(--bs-table-active-color); }\n\n.table-hover > tbody > tr:hover {\n  --bs-table-accent-bg: var(--bs-table-hover-bg);\n  color: var(--bs-table-hover-color); }\n\n.table-primary {\n  --bs-table-bg: #cfe2ff;\n  --bs-table-striped-bg: #c5d7f2;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #bacbe6;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #bfd1ec;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #bacbe6; }\n\n.table-secondary {\n  --bs-table-bg: #e2e3e5;\n  --bs-table-striped-bg: #d7d8da;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #cbccce;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #d1d2d4;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #cbccce; }\n\n.table-success {\n  --bs-table-bg: #d1e7dd;\n  --bs-table-striped-bg: #c7dbd2;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #bcd0c7;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #c1d6cc;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #bcd0c7; }\n\n.table-info {\n  --bs-table-bg: #cff4fc;\n  --bs-table-striped-bg: #c5e8ef;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #badce3;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #bfe2e9;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #badce3; }\n\n.table-warning {\n  --bs-table-bg: #fff3cd;\n  --bs-table-striped-bg: #f2e7c3;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #e6dbb9;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #ece1be;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #e6dbb9; }\n\n.table-danger {\n  --bs-table-bg: #f8d7da;\n  --bs-table-striped-bg: #eccccf;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #dfc2c4;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #e5c7ca;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #dfc2c4; }\n\n.table-light {\n  --bs-table-bg: #f8f9fa;\n  --bs-table-striped-bg: #ecedee;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #dfe0e1;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #e5e6e7;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #dfe0e1; }\n\n.table-dark {\n  --bs-table-bg: #212529;\n  --bs-table-striped-bg: #2c3034;\n  --bs-table-striped-color: #fff;\n  --bs-table-active-bg: #373b3e;\n  --bs-table-active-color: #fff;\n  --bs-table-hover-bg: #323539;\n  --bs-table-hover-color: #fff;\n  color: #fff;\n  border-color: #373b3e; }\n\n.table-responsive {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch; }\n\n@media (max-width: 575.98px) {\n  .table-responsive-sm {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; } }\n\n@media (max-width: 767.98px) {\n  .table-responsive-md {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; } }\n\n@media (max-width: 991.98px) {\n  .table-responsive-lg {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; } }\n\n@media (max-width: 1199.98px) {\n  .table-responsive-xl {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; } }\n\n@media (max-width: 1399.98px) {\n  .table-responsive-xxl {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; } }\n\n.form-label {\n  margin-bottom: 0.5rem; }\n\n.col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5; }\n\n.col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem; }\n\n.form-text {\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #6c757d; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  appearance: none;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .form-control {\n      transition: none; } }\n  .form-control[type=\"file\"] {\n    overflow: hidden; }\n    .form-control[type=\"file\"]:not(:disabled):not([readonly]) {\n      cursor: pointer; }\n  .form-control:focus {\n    color: #212529;\n    background-color: #fff;\n    border-color: #86b7fe;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n  .form-control::-webkit-date-and-time-value {\n    height: 1.5em; }\n  .form-control::placeholder {\n    color: #6c757d;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #e9ecef;\n    opacity: 1; }\n  .form-control::file-selector-button {\n    padding: 0.375rem 0.75rem;\n    margin: -0.375rem -0.75rem;\n    margin-inline-end: 0.75rem;\n    color: #212529;\n    background-color: #e9ecef;\n    pointer-events: none;\n    border-color: inherit;\n    border-style: solid;\n    border-width: 0;\n    border-inline-end-width: 1px;\n    border-radius: 0;\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-control::file-selector-button {\n        transition: none; } }\n  .form-control:hover:not(:disabled):not([readonly])::file-selector-button {\n    background-color: #dde0e3; }\n  .form-control::-webkit-file-upload-button {\n    padding: 0.375rem 0.75rem;\n    margin: -0.375rem -0.75rem;\n    margin-inline-end: 0.75rem;\n    color: #212529;\n    background-color: #e9ecef;\n    pointer-events: none;\n    border-color: inherit;\n    border-style: solid;\n    border-width: 0;\n    border-inline-end-width: 1px;\n    border-radius: 0;\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-control::-webkit-file-upload-button {\n        transition: none; } }\n  .form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {\n    background-color: #dde0e3; }\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0;\n  margin-bottom: 0;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm {\n  min-height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n  .form-control-sm::file-selector-button {\n    padding: 0.25rem 0.5rem;\n    margin: -0.25rem -0.5rem;\n    margin-inline-end: 0.5rem; }\n  .form-control-sm::-webkit-file-upload-button {\n    padding: 0.25rem 0.5rem;\n    margin: -0.25rem -0.5rem;\n    margin-inline-end: 0.5rem; }\n\n.form-control-lg {\n  min-height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n  .form-control-lg::file-selector-button {\n    padding: 0.5rem 1rem;\n    margin: -0.5rem -1rem;\n    margin-inline-end: 1rem; }\n  .form-control-lg::-webkit-file-upload-button {\n    padding: 0.5rem 1rem;\n    margin: -0.5rem -1rem;\n    margin-inline-end: 1rem; }\n\ntextarea.form-control {\n  min-height: calc(1.5em + 0.75rem + 2px); }\n\ntextarea.form-control-sm {\n  min-height: calc(1.5em + 0.5rem + 2px); }\n\ntextarea.form-control-lg {\n  min-height: calc(1.5em + 1rem + 2px); }\n\n.form-control-color {\n  max-width: 3rem;\n  height: auto;\n  padding: 0.375rem; }\n  .form-control-color:not(:disabled):not([readonly]) {\n    cursor: pointer; }\n  .form-control-color::-moz-color-swatch {\n    height: 1.5em;\n    border-radius: 0.25rem; }\n  .form-control-color::-webkit-color-swatch {\n    height: 1.5em;\n    border-radius: 0.25rem; }\n\n.form-select {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 2.25rem 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  background-color: #fff;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right 0.75rem center;\n  background-size: 16px 12px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  appearance: none; }\n  .form-select:focus {\n    border-color: #86b7fe;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n  .form-select[multiple], .form-select[size]:not([size=\"1\"]) {\n    padding-right: 0.75rem;\n    background-image: none; }\n  .form-select:disabled {\n    background-color: #e9ecef; }\n  .form-select:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 #212529; }\n\n.form-select-sm {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem; }\n\n.form-select-lg {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem; }\n\n.form-check {\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5em;\n  margin-bottom: 0.125rem; }\n  .form-check .form-check-input {\n    float: left;\n    margin-left: -1.5em; }\n\n.form-check-input {\n  width: 1em;\n  height: 1em;\n  margin-top: 0.25em;\n  vertical-align: top;\n  background-color: #fff;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  border: 1px solid rgba(0, 0, 0, 0.25);\n  appearance: none;\n  color-adjust: exact; }\n  .form-check-input[type=\"checkbox\"] {\n    border-radius: 0.25em; }\n  .form-check-input[type=\"radio\"] {\n    border-radius: 50%; }\n  .form-check-input:active {\n    filter: brightness(90%); }\n  .form-check-input:focus {\n    border-color: #86b7fe;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n  .form-check-input:checked {\n    background-color: #0d6efd;\n    border-color: #0d6efd; }\n    .form-check-input:checked[type=\"checkbox\"] {\n      background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\"); }\n    .form-check-input:checked[type=\"radio\"] {\n      background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e\"); }\n  .form-check-input[type=\"checkbox\"]:indeterminate {\n    background-color: #0d6efd;\n    border-color: #0d6efd;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e\"); }\n  .form-check-input:disabled {\n    pointer-events: none;\n    filter: none;\n    opacity: 0.5; }\n  .form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {\n    opacity: 0.5; }\n\n.form-switch {\n  padding-left: 2.5em; }\n  .form-switch .form-check-input {\n    width: 2em;\n    margin-left: -2.5em;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e\");\n    background-position: left center;\n    border-radius: 2em;\n    transition: background-position 0.15s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-switch .form-check-input {\n        transition: none; } }\n    .form-switch .form-check-input:focus {\n      background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e\"); }\n    .form-switch .form-check-input:checked {\n      background-position: right center;\n      background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\"); }\n\n.form-check-inline {\n  display: inline-block;\n  margin-right: 1rem; }\n\n.btn-check {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n  .btn-check[disabled] + .btn, .btn-check:disabled + .btn {\n    pointer-events: none;\n    filter: none;\n    opacity: 0.65; }\n\n.form-range {\n  width: 100%;\n  height: 1.5rem;\n  padding: 0;\n  background-color: transparent;\n  appearance: none; }\n  .form-range:focus {\n    outline: 0; }\n    .form-range:focus::-webkit-slider-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n    .form-range:focus::-moz-range-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n  .form-range::-moz-focus-outer {\n    border: 0; }\n  .form-range::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: -0.25rem;\n    background-color: #0d6efd;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-range::-webkit-slider-thumb {\n        transition: none; } }\n    .form-range::-webkit-slider-thumb:active {\n      background-color: #b6d4fe; }\n  .form-range::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .form-range::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    background-color: #0d6efd;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-range::-moz-range-thumb {\n        transition: none; } }\n    .form-range::-moz-range-thumb:active {\n      background-color: #b6d4fe; }\n  .form-range::-moz-range-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .form-range:disabled {\n    pointer-events: none; }\n    .form-range:disabled::-webkit-slider-thumb {\n      background-color: #adb5bd; }\n    .form-range:disabled::-moz-range-thumb {\n      background-color: #adb5bd; }\n\n.form-floating {\n  position: relative; }\n  .form-floating > .form-control,\n  .form-floating > .form-select {\n    height: calc(3.5rem + 2px);\n    padding: 1rem 0.75rem; }\n  .form-floating > label {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    padding: 1rem 0.75rem;\n    pointer-events: none;\n    border: 1px solid transparent;\n    transform-origin: 0 0;\n    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .form-floating > label {\n        transition: none; } }\n  .form-floating > .form-control::placeholder {\n    color: transparent; }\n  .form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown) {\n    padding-top: 1.625rem;\n    padding-bottom: 0.625rem; }\n  .form-floating > .form-control:-webkit-autofill {\n    padding-top: 1.625rem;\n    padding-bottom: 0.625rem; }\n  .form-floating > .form-select {\n    padding-top: 1.625rem;\n    padding-bottom: 0.625rem; }\n  .form-floating > .form-control:focus ~ label,\n  .form-floating > .form-control:not(:placeholder-shown) ~ label,\n  .form-floating > .form-select ~ label {\n    opacity: 0.65;\n    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem); }\n  .form-floating > .form-control:-webkit-autofill ~ label {\n    opacity: 0.65;\n    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem); }\n\n.input-group {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  width: 100%; }\n  .input-group > .form-control,\n  .input-group > .form-select {\n    position: relative;\n    flex: 1 1 auto;\n    width: 1%;\n    min-width: 0; }\n  .input-group > .form-control:focus,\n  .input-group > .form-select:focus {\n    z-index: 3; }\n  .input-group .btn {\n    position: relative;\n    z-index: 2; }\n    .input-group .btn:focus {\n      z-index: 3; }\n\n.input-group-text {\n  display: flex;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n\n.input-group-lg > .form-control,\n.input-group-lg > .form-select,\n.input-group-lg > .input-group-text,\n.input-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.input-group-sm > .form-control,\n.input-group-sm > .form-select,\n.input-group-sm > .input-group-text,\n.input-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.input-group-lg > .form-select,\n.input-group-sm > .form-select {\n  padding-right: 3rem; }\n\n.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu),\n.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.input-group.has-validation > :nth-last-child(n + 3):not(.dropdown-toggle):not(.dropdown-menu),\n.input-group.has-validation > .dropdown-toggle:nth-last-child(n + 4) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {\n  margin-left: -1px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #198754; }\n\n.valid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  color: #fff;\n  background-color: rgba(25, 135, 84, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated :valid ~ .valid-feedback,\n.was-validated :valid ~ .valid-tooltip,\n.is-valid ~ .valid-feedback,\n.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .form-control:valid, .form-control.is-valid {\n  border-color: #198754;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-control:valid:focus, .form-control.is-valid:focus {\n    border-color: #198754;\n    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25); }\n\n.was-validated textarea.form-control:valid, textarea.form-control.is-valid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.was-validated .form-select:valid, .form-select.is-valid {\n  border-color: #198754; }\n  .was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size=\"1\"], .form-select.is-valid:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size=\"1\"] {\n    padding-right: 4.125rem;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\"), url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n    background-position: right 0.75rem center, center right 2.25rem;\n    background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-select:valid:focus, .form-select.is-valid:focus {\n    border-color: #198754;\n    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25); }\n\n.was-validated .form-check-input:valid, .form-check-input.is-valid {\n  border-color: #198754; }\n  .was-validated .form-check-input:valid:checked, .form-check-input.is-valid:checked {\n    background-color: #198754; }\n  .was-validated .form-check-input:valid:focus, .form-check-input.is-valid:focus {\n    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25); }\n  .was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {\n    color: #198754; }\n\n.form-check-inline .form-check-input ~ .valid-feedback {\n  margin-left: .5em; }\n\n.was-validated .input-group .form-control:valid, .input-group .form-control.is-valid, .was-validated\n.input-group .form-select:valid,\n.input-group .form-select.is-valid {\n  z-index: 1; }\n  .was-validated .input-group .form-control:valid:focus, .input-group .form-control.is-valid:focus, .was-validated\n  .input-group .form-select:valid:focus,\n  .input-group .form-select.is-valid:focus {\n    z-index: 3; }\n\n.invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #dc3545; }\n\n.invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated :invalid ~ .invalid-feedback,\n.was-validated :invalid ~ .invalid-tooltip,\n.is-invalid ~ .invalid-feedback,\n.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .form-control:invalid, .form-control.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25); }\n\n.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.was-validated .form-select:invalid, .form-select.is-invalid {\n  border-color: #dc3545; }\n  .was-validated .form-select:invalid:not([multiple]):not([size]), .was-validated .form-select:invalid:not([multiple])[size=\"1\"], .form-select.is-invalid:not([multiple]):not([size]), .form-select.is-invalid:not([multiple])[size=\"1\"] {\n    padding-right: 4.125rem;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\"), url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n    background-position: right 0.75rem center, center right 2.25rem;\n    background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-select:invalid:focus, .form-select.is-invalid:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25); }\n\n.was-validated .form-check-input:invalid, .form-check-input.is-invalid {\n  border-color: #dc3545; }\n  .was-validated .form-check-input:invalid:checked, .form-check-input.is-invalid:checked {\n    background-color: #dc3545; }\n  .was-validated .form-check-input:invalid:focus, .form-check-input.is-invalid:focus {\n    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25); }\n  .was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {\n    color: #dc3545; }\n\n.form-check-inline .form-check-input ~ .invalid-feedback {\n  margin-left: .5em; }\n\n.was-validated .input-group .form-control:invalid, .input-group .form-control.is-invalid, .was-validated\n.input-group .form-select:invalid,\n.input-group .form-select.is-invalid {\n  z-index: 2; }\n  .was-validated .input-group .form-control:invalid:focus, .input-group .form-control.is-invalid:focus, .was-validated\n  .input-group .form-select:invalid:focus,\n  .input-group .form-select.is-invalid:focus {\n    z-index: 3; }\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: center;\n  text-decoration: none;\n  vertical-align: middle;\n  cursor: pointer;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .btn {\n      transition: none; } }\n  .btn:hover {\n    color: #212529; }\n  .btn-check:focus + .btn, .btn:focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n  .btn:disabled, .btn.disabled,\n  fieldset:disabled .btn {\n    pointer-events: none;\n    opacity: 0.65; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #0b5ed7;\n    border-color: #0a58ca; }\n  .btn-check:focus + .btn-primary, .btn-primary:focus {\n    color: #fff;\n    background-color: #0b5ed7;\n    border-color: #0a58ca;\n    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5); }\n  .btn-check:checked + .btn-primary,\n  .btn-check:active + .btn-primary, .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0a58ca;\n    border-color: #0a53be; }\n    .btn-check:checked + .btn-primary:focus,\n    .btn-check:active + .btn-primary:focus, .btn-primary:active:focus, .btn-primary.active:focus,\n    .show > .btn-primary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5); }\n  .btn-primary:disabled, .btn-primary.disabled {\n    color: #fff;\n    background-color: #0d6efd;\n    border-color: #0d6efd; }\n\n.btn-secondary {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d; }\n  .btn-secondary:hover {\n    color: #fff;\n    background-color: #5c636a;\n    border-color: #565e64; }\n  .btn-check:focus + .btn-secondary, .btn-secondary:focus {\n    color: #fff;\n    background-color: #5c636a;\n    border-color: #565e64;\n    box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5); }\n  .btn-check:checked + .btn-secondary,\n  .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #565e64;\n    border-color: #51585e; }\n    .btn-check:checked + .btn-secondary:focus,\n    .btn-check:active + .btn-secondary:focus, .btn-secondary:active:focus, .btn-secondary.active:focus,\n    .show > .btn-secondary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5); }\n  .btn-secondary:disabled, .btn-secondary.disabled {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n\n.btn-success {\n  color: #fff;\n  background-color: #198754;\n  border-color: #198754; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #157347;\n    border-color: #146c43; }\n  .btn-check:focus + .btn-success, .btn-success:focus {\n    color: #fff;\n    background-color: #157347;\n    border-color: #146c43;\n    box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5); }\n  .btn-check:checked + .btn-success,\n  .btn-check:active + .btn-success, .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #146c43;\n    border-color: #13653f; }\n    .btn-check:checked + .btn-success:focus,\n    .btn-check:active + .btn-success:focus, .btn-success:active:focus, .btn-success.active:focus,\n    .show > .btn-success.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5); }\n  .btn-success:disabled, .btn-success.disabled {\n    color: #fff;\n    background-color: #198754;\n    border-color: #198754; }\n\n.btn-info {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0; }\n  .btn-info:hover {\n    color: #000;\n    background-color: #31d2f2;\n    border-color: #25cff2; }\n  .btn-check:focus + .btn-info, .btn-info:focus {\n    color: #000;\n    background-color: #31d2f2;\n    border-color: #25cff2;\n    box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5); }\n  .btn-check:checked + .btn-info,\n  .btn-check:active + .btn-info, .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #000;\n    background-color: #3dd5f3;\n    border-color: #25cff2; }\n    .btn-check:checked + .btn-info:focus,\n    .btn-check:active + .btn-info:focus, .btn-info:active:focus, .btn-info.active:focus,\n    .show > .btn-info.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5); }\n  .btn-info:disabled, .btn-info.disabled {\n    color: #000;\n    background-color: #0dcaf0;\n    border-color: #0dcaf0; }\n\n.btn-warning {\n  color: #000;\n  background-color: #ffc107;\n  border-color: #ffc107; }\n  .btn-warning:hover {\n    color: #000;\n    background-color: #ffca2c;\n    border-color: #ffc720; }\n  .btn-check:focus + .btn-warning, .btn-warning:focus {\n    color: #000;\n    background-color: #ffca2c;\n    border-color: #ffc720;\n    box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5); }\n  .btn-check:checked + .btn-warning,\n  .btn-check:active + .btn-warning, .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #000;\n    background-color: #ffcd39;\n    border-color: #ffc720; }\n    .btn-check:checked + .btn-warning:focus,\n    .btn-check:active + .btn-warning:focus, .btn-warning:active:focus, .btn-warning.active:focus,\n    .show > .btn-warning.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5); }\n  .btn-warning:disabled, .btn-warning.disabled {\n    color: #000;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #bb2d3b;\n    border-color: #b02a37; }\n  .btn-check:focus + .btn-danger, .btn-danger:focus {\n    color: #fff;\n    background-color: #bb2d3b;\n    border-color: #b02a37;\n    box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5); }\n  .btn-check:checked + .btn-danger,\n  .btn-check:active + .btn-danger, .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #b02a37;\n    border-color: #a52834; }\n    .btn-check:checked + .btn-danger:focus,\n    .btn-check:active + .btn-danger:focus, .btn-danger:active:focus, .btn-danger.active:focus,\n    .show > .btn-danger.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5); }\n  .btn-danger:disabled, .btn-danger.disabled {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n\n.btn-light {\n  color: #000;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .btn-light:hover {\n    color: #000;\n    background-color: #f9fafb;\n    border-color: #f9fafb; }\n  .btn-check:focus + .btn-light, .btn-light:focus {\n    color: #000;\n    background-color: #f9fafb;\n    border-color: #f9fafb;\n    box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5); }\n  .btn-check:checked + .btn-light,\n  .btn-check:active + .btn-light, .btn-light:active, .btn-light.active,\n  .show > .btn-light.dropdown-toggle {\n    color: #000;\n    background-color: #f9fafb;\n    border-color: #f9fafb; }\n    .btn-check:checked + .btn-light:focus,\n    .btn-check:active + .btn-light:focus, .btn-light:active:focus, .btn-light.active:focus,\n    .show > .btn-light.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5); }\n  .btn-light:disabled, .btn-light.disabled {\n    color: #000;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n\n.btn-dark {\n  color: #fff;\n  background-color: #212529;\n  border-color: #212529; }\n  .btn-dark:hover {\n    color: #fff;\n    background-color: #1c1f23;\n    border-color: #1a1e21; }\n  .btn-check:focus + .btn-dark, .btn-dark:focus {\n    color: #fff;\n    background-color: #1c1f23;\n    border-color: #1a1e21;\n    box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5); }\n  .btn-check:checked + .btn-dark,\n  .btn-check:active + .btn-dark, .btn-dark:active, .btn-dark.active,\n  .show > .btn-dark.dropdown-toggle {\n    color: #fff;\n    background-color: #1a1e21;\n    border-color: #191c1f; }\n    .btn-check:checked + .btn-dark:focus,\n    .btn-check:active + .btn-dark:focus, .btn-dark:active:focus, .btn-dark.active:focus,\n    .show > .btn-dark.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5); }\n  .btn-dark:disabled, .btn-dark.disabled {\n    color: #fff;\n    background-color: #212529;\n    border-color: #212529; }\n\n.btn-outline-primary {\n  color: #0d6efd;\n  border-color: #0d6efd; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0d6efd;\n    border-color: #0d6efd; }\n  .btn-check:focus + .btn-outline-primary, .btn-outline-primary:focus {\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5); }\n  .btn-check:checked + .btn-outline-primary,\n  .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show {\n    color: #fff;\n    background-color: #0d6efd;\n    border-color: #0d6efd; }\n    .btn-check:checked + .btn-outline-primary:focus,\n    .btn-check:active + .btn-outline-primary:focus, .btn-outline-primary:active:focus, .btn-outline-primary.active:focus, .btn-outline-primary.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5); }\n  .btn-outline-primary:disabled, .btn-outline-primary.disabled {\n    color: #0d6efd;\n    background-color: transparent; }\n\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .btn-check:focus + .btn-outline-secondary, .btn-outline-secondary:focus {\n    box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5); }\n  .btn-check:checked + .btn-outline-secondary,\n  .btn-check:active + .btn-outline-secondary, .btn-outline-secondary:active, .btn-outline-secondary.active, .btn-outline-secondary.dropdown-toggle.show {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n    .btn-check:checked + .btn-outline-secondary:focus,\n    .btn-check:active + .btn-outline-secondary:focus, .btn-outline-secondary:active:focus, .btn-outline-secondary.active:focus, .btn-outline-secondary.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5); }\n  .btn-outline-secondary:disabled, .btn-outline-secondary.disabled {\n    color: #6c757d;\n    background-color: transparent; }\n\n.btn-outline-success {\n  color: #198754;\n  border-color: #198754; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #198754;\n    border-color: #198754; }\n  .btn-check:focus + .btn-outline-success, .btn-outline-success:focus {\n    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5); }\n  .btn-check:checked + .btn-outline-success,\n  .btn-check:active + .btn-outline-success, .btn-outline-success:active, .btn-outline-success.active, .btn-outline-success.dropdown-toggle.show {\n    color: #fff;\n    background-color: #198754;\n    border-color: #198754; }\n    .btn-check:checked + .btn-outline-success:focus,\n    .btn-check:active + .btn-outline-success:focus, .btn-outline-success:active:focus, .btn-outline-success.active:focus, .btn-outline-success.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5); }\n  .btn-outline-success:disabled, .btn-outline-success.disabled {\n    color: #198754;\n    background-color: transparent; }\n\n.btn-outline-info {\n  color: #0dcaf0;\n  border-color: #0dcaf0; }\n  .btn-outline-info:hover {\n    color: #000;\n    background-color: #0dcaf0;\n    border-color: #0dcaf0; }\n  .btn-check:focus + .btn-outline-info, .btn-outline-info:focus {\n    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5); }\n  .btn-check:checked + .btn-outline-info,\n  .btn-check:active + .btn-outline-info, .btn-outline-info:active, .btn-outline-info.active, .btn-outline-info.dropdown-toggle.show {\n    color: #000;\n    background-color: #0dcaf0;\n    border-color: #0dcaf0; }\n    .btn-check:checked + .btn-outline-info:focus,\n    .btn-check:active + .btn-outline-info:focus, .btn-outline-info:active:focus, .btn-outline-info.active:focus, .btn-outline-info.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5); }\n  .btn-outline-info:disabled, .btn-outline-info.disabled {\n    color: #0dcaf0;\n    background-color: transparent; }\n\n.btn-outline-warning {\n  color: #ffc107;\n  border-color: #ffc107; }\n  .btn-outline-warning:hover {\n    color: #000;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .btn-check:focus + .btn-outline-warning, .btn-outline-warning:focus {\n    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5); }\n  .btn-check:checked + .btn-outline-warning,\n  .btn-check:active + .btn-outline-warning, .btn-outline-warning:active, .btn-outline-warning.active, .btn-outline-warning.dropdown-toggle.show {\n    color: #000;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n    .btn-check:checked + .btn-outline-warning:focus,\n    .btn-check:active + .btn-outline-warning:focus, .btn-outline-warning:active:focus, .btn-outline-warning.active:focus, .btn-outline-warning.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5); }\n  .btn-outline-warning:disabled, .btn-outline-warning.disabled {\n    color: #ffc107;\n    background-color: transparent; }\n\n.btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .btn-check:focus + .btn-outline-danger, .btn-outline-danger:focus {\n    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5); }\n  .btn-check:checked + .btn-outline-danger,\n  .btn-check:active + .btn-outline-danger, .btn-outline-danger:active, .btn-outline-danger.active, .btn-outline-danger.dropdown-toggle.show {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n    .btn-check:checked + .btn-outline-danger:focus,\n    .btn-check:active + .btn-outline-danger:focus, .btn-outline-danger:active:focus, .btn-outline-danger.active:focus, .btn-outline-danger.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5); }\n  .btn-outline-danger:disabled, .btn-outline-danger.disabled {\n    color: #dc3545;\n    background-color: transparent; }\n\n.btn-outline-light {\n  color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .btn-outline-light:hover {\n    color: #000;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .btn-check:focus + .btn-outline-light, .btn-outline-light:focus {\n    box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5); }\n  .btn-check:checked + .btn-outline-light,\n  .btn-check:active + .btn-outline-light, .btn-outline-light:active, .btn-outline-light.active, .btn-outline-light.dropdown-toggle.show {\n    color: #000;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n    .btn-check:checked + .btn-outline-light:focus,\n    .btn-check:active + .btn-outline-light:focus, .btn-outline-light:active:focus, .btn-outline-light.active:focus, .btn-outline-light.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5); }\n  .btn-outline-light:disabled, .btn-outline-light.disabled {\n    color: #f8f9fa;\n    background-color: transparent; }\n\n.btn-outline-dark {\n  color: #212529;\n  border-color: #212529; }\n  .btn-outline-dark:hover {\n    color: #fff;\n    background-color: #212529;\n    border-color: #212529; }\n  .btn-check:focus + .btn-outline-dark, .btn-outline-dark:focus {\n    box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5); }\n  .btn-check:checked + .btn-outline-dark,\n  .btn-check:active + .btn-outline-dark, .btn-outline-dark:active, .btn-outline-dark.active, .btn-outline-dark.dropdown-toggle.show {\n    color: #fff;\n    background-color: #212529;\n    border-color: #212529; }\n    .btn-check:checked + .btn-outline-dark:focus,\n    .btn-check:active + .btn-outline-dark:focus, .btn-outline-dark:active:focus, .btn-outline-dark.active:focus, .btn-outline-dark.dropdown-toggle.show:focus {\n      box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5); }\n  .btn-outline-dark:disabled, .btn-outline-dark.disabled {\n    color: #212529;\n    background-color: transparent; }\n\n.btn-link {\n  font-weight: 400;\n  color: #0d6efd;\n  text-decoration: underline; }\n  .btn-link:hover {\n    color: #0a58ca; }\n  .btn-link:disabled, .btn-link.disabled {\n    color: #6c757d; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.fade {\n  transition: opacity 0.15s linear; }\n  @media (prefers-reduced-motion: reduce) {\n    .fade {\n      transition: none; } }\n  .fade:not(.show) {\n    opacity: 0; }\n\n.collapse:not(.show) {\n  display: none; }\n\n.collapsing {\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .collapsing {\n      transition: none; } }\n\n.dropup,\n.dropend,\n.dropdown,\n.dropstart {\n  position: relative; }\n\n.dropdown-toggle {\n  white-space: nowrap; }\n  .dropdown-toggle::after {\n    display: inline-block;\n    margin-left: 0.255em;\n    vertical-align: 0.255em;\n    content: \"\";\n    border-top: 0.3em solid;\n    border-right: 0.3em solid transparent;\n    border-bottom: 0;\n    border-left: 0.3em solid transparent; }\n  .dropdown-toggle:empty::after {\n    margin-left: 0; }\n\n.dropdown-menu {\n  position: absolute;\n  z-index: 1000;\n  display: none;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .dropdown-menu[data-bs-popper] {\n    top: 100%;\n    left: 0;\n    margin-top: 0.125rem; }\n\n.dropdown-menu-start {\n  --bs-position: start; }\n  .dropdown-menu-start[data-bs-popper] {\n    right: auto /* rtl:ignore */;\n    left: 0 /* rtl:ignore */; }\n\n.dropdown-menu-end {\n  --bs-position: end; }\n  .dropdown-menu-end[data-bs-popper] {\n    right: 0 /* rtl:ignore */;\n    left: auto /* rtl:ignore */; }\n\n@media (min-width: 576px) {\n  .dropdown-menu-sm-start {\n    --bs-position: start; }\n    .dropdown-menu-sm-start[data-bs-popper] {\n      right: auto /* rtl:ignore */;\n      left: 0 /* rtl:ignore */; }\n  .dropdown-menu-sm-end {\n    --bs-position: end; }\n    .dropdown-menu-sm-end[data-bs-popper] {\n      right: 0 /* rtl:ignore */;\n      left: auto /* rtl:ignore */; } }\n\n@media (min-width: 768px) {\n  .dropdown-menu-md-start {\n    --bs-position: start; }\n    .dropdown-menu-md-start[data-bs-popper] {\n      right: auto /* rtl:ignore */;\n      left: 0 /* rtl:ignore */; }\n  .dropdown-menu-md-end {\n    --bs-position: end; }\n    .dropdown-menu-md-end[data-bs-popper] {\n      right: 0 /* rtl:ignore */;\n      left: auto /* rtl:ignore */; } }\n\n@media (min-width: 992px) {\n  .dropdown-menu-lg-start {\n    --bs-position: start; }\n    .dropdown-menu-lg-start[data-bs-popper] {\n      right: auto /* rtl:ignore */;\n      left: 0 /* rtl:ignore */; }\n  .dropdown-menu-lg-end {\n    --bs-position: end; }\n    .dropdown-menu-lg-end[data-bs-popper] {\n      right: 0 /* rtl:ignore */;\n      left: auto /* rtl:ignore */; } }\n\n@media (min-width: 1200px) {\n  .dropdown-menu-xl-start {\n    --bs-position: start; }\n    .dropdown-menu-xl-start[data-bs-popper] {\n      right: auto /* rtl:ignore */;\n      left: 0 /* rtl:ignore */; }\n  .dropdown-menu-xl-end {\n    --bs-position: end; }\n    .dropdown-menu-xl-end[data-bs-popper] {\n      right: 0 /* rtl:ignore */;\n      left: auto /* rtl:ignore */; } }\n\n@media (min-width: 1400px) {\n  .dropdown-menu-xxl-start {\n    --bs-position: start; }\n    .dropdown-menu-xxl-start[data-bs-popper] {\n      right: auto /* rtl:ignore */;\n      left: 0 /* rtl:ignore */; }\n  .dropdown-menu-xxl-end {\n    --bs-position: end; }\n    .dropdown-menu-xxl-end[data-bs-popper] {\n      right: 0 /* rtl:ignore */;\n      left: auto /* rtl:ignore */; } }\n\n.dropup .dropdown-menu[data-bs-popper] {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem; }\n\n.dropup .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent; }\n\n.dropup .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropend .dropdown-menu[data-bs-popper] {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem; }\n\n.dropend .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid; }\n\n.dropend .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropend .dropdown-toggle::after {\n  vertical-align: 0; }\n\n.dropstart .dropdown-menu[data-bs-popper] {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem; }\n\n.dropstart .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\"; }\n\n.dropstart .dropdown-toggle::after {\n  display: none; }\n\n.dropstart .dropdown-toggle::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent; }\n\n.dropstart .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropstart .dropdown-toggle::before {\n  vertical-align: 0; }\n\n.dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.15); }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  text-decoration: none;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0; }\n  .dropdown-item:hover, .dropdown-item:focus {\n    color: #1e2125;\n    background-color: #e9ecef; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0d6efd; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #adb5bd;\n    pointer-events: none;\n    background-color: transparent; }\n\n.dropdown-menu.show {\n  display: block; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap; }\n\n.dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1rem;\n  color: #212529; }\n\n.dropdown-menu-dark {\n  color: #dee2e6;\n  background-color: #343a40;\n  border-color: rgba(0, 0, 0, 0.15); }\n  .dropdown-menu-dark .dropdown-item {\n    color: #dee2e6; }\n    .dropdown-menu-dark .dropdown-item:hover, .dropdown-menu-dark .dropdown-item:focus {\n      color: #fff;\n      background-color: rgba(255, 255, 255, 0.15); }\n    .dropdown-menu-dark .dropdown-item.active, .dropdown-menu-dark .dropdown-item:active {\n      color: #fff;\n      background-color: #0d6efd; }\n    .dropdown-menu-dark .dropdown-item.disabled, .dropdown-menu-dark .dropdown-item:disabled {\n      color: #adb5bd; }\n  .dropdown-menu-dark .dropdown-divider {\n    border-color: rgba(0, 0, 0, 0.15); }\n  .dropdown-menu-dark .dropdown-item-text {\n    color: #dee2e6; }\n  .dropdown-menu-dark .dropdown-header {\n    color: #adb5bd; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    flex: 1 1 auto; }\n  .btn-group > .btn-check:checked + .btn,\n  .btn-group > .btn-check:focus + .btn,\n  .btn-group > .btn:hover,\n  .btn-group > .btn:focus,\n  .btn-group > .btn:active,\n  .btn-group > .btn.active,\n  .btn-group-vertical > .btn-check:checked + .btn,\n  .btn-group-vertical > .btn-check:focus + .btn,\n  .btn-group-vertical > .btn:hover,\n  .btn-group-vertical > .btn:focus,\n  .btn-group-vertical > .btn:active,\n  .btn-group-vertical > .btn.active {\n    z-index: 1; }\n\n.btn-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) {\n  margin-left: -1px; }\n\n.btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.btn-group > .btn:nth-child(n + 3),\n.btn-group > :not(.btn-check) + .btn,\n.btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem; }\n  .dropdown-toggle-split::after,\n  .dropup .dropdown-toggle-split::after,\n  .dropend .dropdown-toggle-split::after {\n    margin-left: 0; }\n  .dropstart .dropdown-toggle-split::before {\n    margin-right: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n\n.btn-group-vertical {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .btn-group-vertical > .btn,\n  .btn-group-vertical > .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn:not(:first-child),\n  .btn-group-vertical > .btn-group:not(:first-child) {\n    margin-top: -1px; }\n  .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n  .btn-group-vertical > .btn-group:not(:last-child) > .btn {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .btn-group-vertical > .btn ~ .btn,\n  .btn-group-vertical > .btn-group:not(:first-child) > .btn {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5rem 1rem;\n  color: #0d6efd;\n  text-decoration: none;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .nav-link {\n      transition: none; } }\n  .nav-link:hover, .nav-link:focus {\n    color: #0a58ca; }\n  .nav-link.disabled {\n    color: #6c757d;\n    pointer-events: none;\n    cursor: default; }\n\n.nav-tabs {\n  border-bottom: 1px solid #dee2e6; }\n  .nav-tabs .nav-link {\n    margin-bottom: -1px;\n    background: none;\n    border: 1px solid transparent;\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n    .nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {\n      border-color: #e9ecef #e9ecef #dee2e6;\n      isolation: isolate; }\n    .nav-tabs .nav-link.disabled {\n      color: #6c757d;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #495057;\n    background-color: #fff;\n    border-color: #dee2e6 #dee2e6 #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.nav-pills .nav-link {\n  background: none;\n  border: 0;\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #0d6efd; }\n\n.nav-fill > .nav-link,\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified > .nav-link,\n.nav-justified .nav-item {\n  flex-basis: 0;\n  flex-grow: 1;\n  text-align: center; }\n\n.nav-fill .nav-item .nav-link,\n.nav-justified .nav-item .nav-link {\n  width: 100%; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem; }\n  .navbar > .container,\n  .navbar > .container-fluid, .navbar > .container-sm, .navbar > .container-md, .navbar > .container-lg, .navbar > .container-xl, .navbar > .container-xxl {\n    display: flex;\n    flex-wrap: inherit;\n    align-items: center;\n    justify-content: space-between; }\n\n.navbar-brand {\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  text-decoration: none;\n  white-space: nowrap; }\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-nav .dropdown-menu {\n    position: static; }\n\n.navbar-text {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem; }\n\n.navbar-collapse {\n  flex-basis: 100%;\n  flex-grow: 1;\n  align-items: center; }\n\n.navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  transition: box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .navbar-toggler {\n      transition: none; } }\n  .navbar-toggler:hover {\n    text-decoration: none; }\n  .navbar-toggler:focus {\n    text-decoration: none;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100%; }\n\n.navbar-nav-scroll {\n  max-height: var(--bs-scroll-height, 75vh);\n  overflow-y: auto; }\n\n@media (min-width: 576px) {\n  .navbar-expand-sm {\n    flex-wrap: nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-sm .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-sm .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-sm .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-sm .navbar-nav-scroll {\n      overflow: visible; }\n    .navbar-expand-sm .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-sm .navbar-toggler {\n      display: none; } }\n\n@media (min-width: 768px) {\n  .navbar-expand-md {\n    flex-wrap: nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-md .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-md .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-md .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-md .navbar-nav-scroll {\n      overflow: visible; }\n    .navbar-expand-md .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-md .navbar-toggler {\n      display: none; } }\n\n@media (min-width: 992px) {\n  .navbar-expand-lg {\n    flex-wrap: nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-lg .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-lg .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-lg .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-lg .navbar-nav-scroll {\n      overflow: visible; }\n    .navbar-expand-lg .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-lg .navbar-toggler {\n      display: none; } }\n\n@media (min-width: 1200px) {\n  .navbar-expand-xl {\n    flex-wrap: nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-xl .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-xl .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-xl .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-xl .navbar-nav-scroll {\n      overflow: visible; }\n    .navbar-expand-xl .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-xl .navbar-toggler {\n      display: none; } }\n\n@media (min-width: 1400px) {\n  .navbar-expand-xxl {\n    flex-wrap: nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-xxl .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-xxl .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-xxl .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-xxl .navbar-nav-scroll {\n      overflow: visible; }\n    .navbar-expand-xxl .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-xxl .navbar-toggler {\n      display: none; } }\n\n.navbar-expand {\n  flex-wrap: nowrap;\n  justify-content: flex-start; }\n  .navbar-expand .navbar-nav {\n    flex-direction: row; }\n    .navbar-expand .navbar-nav .dropdown-menu {\n      position: absolute; }\n    .navbar-expand .navbar-nav .nav-link {\n      padding-right: 0.5rem;\n      padding-left: 0.5rem; }\n  .navbar-expand .navbar-nav-scroll {\n    overflow: visible; }\n  .navbar-expand .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto; }\n  .navbar-expand .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.55); }\n  .navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .show > .nav-link,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.55);\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.55); }\n  .navbar-light .navbar-text a,\n  .navbar-light .navbar-text a:hover,\n  .navbar-light .navbar-text a:focus {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-dark .navbar-brand {\n  color: #fff; }\n  .navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {\n    color: #fff; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.55); }\n  .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-dark .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-dark .navbar-nav .show > .nav-link,\n.navbar-dark .navbar-nav .nav-link.active {\n  color: #fff; }\n\n.navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.55);\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.55); }\n  .navbar-dark .navbar-text a,\n  .navbar-dark .navbar-text a:hover,\n  .navbar-dark .navbar-text a:focus {\n    color: #fff; }\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n  .card > hr {\n    margin-right: 0;\n    margin-left: 0; }\n  .card > .list-group {\n    border-top: inherit;\n    border-bottom: inherit; }\n    .card > .list-group:first-child {\n      border-top-width: 0;\n      border-top-left-radius: calc(0.25rem - 1px);\n      border-top-right-radius: calc(0.25rem - 1px); }\n    .card > .list-group:last-child {\n      border-bottom-width: 0;\n      border-bottom-right-radius: calc(0.25rem - 1px);\n      border-bottom-left-radius: calc(0.25rem - 1px); }\n  .card > .card-header + .list-group,\n  .card > .list-group + .card-footer {\n    border-top: 0; }\n\n.card-body {\n  flex: 1 1 auto;\n  padding: 1rem 1rem; }\n\n.card-title {\n  margin-bottom: 0.5rem; }\n\n.card-subtitle {\n  margin-top: -0.25rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1rem; }\n\n.card-header {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.5rem 1rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.5rem;\n  margin-bottom: -0.5rem;\n  margin-left: -0.5rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.5rem;\n  margin-left: -0.5rem; }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1rem;\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img,\n.card-img-top,\n.card-img-bottom {\n  width: 100%; }\n\n.card-img,\n.card-img-top {\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px); }\n\n.card-img,\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n.card-group > .card {\n  margin-bottom: 0.75rem; }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap; }\n    .card-group > .card {\n      flex: 1 0 0%;\n      margin-bottom: 0; }\n      .card-group > .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group > .card:not(:last-child) {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0; }\n        .card-group > .card:not(:last-child) .card-img-top,\n        .card-group > .card:not(:last-child) .card-header {\n          border-top-right-radius: 0; }\n        .card-group > .card:not(:last-child) .card-img-bottom,\n        .card-group > .card:not(:last-child) .card-footer {\n          border-bottom-right-radius: 0; }\n      .card-group > .card:not(:first-child) {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0; }\n        .card-group > .card:not(:first-child) .card-img-top,\n        .card-group > .card:not(:first-child) .card-header {\n          border-top-left-radius: 0; }\n        .card-group > .card:not(:first-child) .card-img-bottom,\n        .card-group > .card:not(:first-child) .card-footer {\n          border-bottom-left-radius: 0; } }\n\n.accordion-button {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 1rem 1.25rem;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  background-color: #fff;\n  border: 0;\n  border-radius: 0;\n  overflow-anchor: none;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .accordion-button {\n      transition: none; } }\n  .accordion-button:not(.collapsed) {\n    color: #0c63e4;\n    background-color: #e7f1ff;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125); }\n    .accordion-button:not(.collapsed)::after {\n      background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\");\n      transform: rotate(-180deg); }\n  .accordion-button::after {\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    margin-left: auto;\n    content: \"\";\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\");\n    background-repeat: no-repeat;\n    background-size: 1.25rem;\n    transition: transform 0.2s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .accordion-button::after {\n        transition: none; } }\n  .accordion-button:hover {\n    z-index: 2; }\n  .accordion-button:focus {\n    z-index: 3;\n    border-color: #86b7fe;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n\n.accordion-header {\n  margin-bottom: 0; }\n\n.accordion-item {\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .accordion-item:first-of-type {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n    .accordion-item:first-of-type .accordion-button {\n      border-top-left-radius: calc(0.25rem - 1px);\n      border-top-right-radius: calc(0.25rem - 1px); }\n  .accordion-item:not(:first-of-type) {\n    border-top: 0; }\n  .accordion-item:last-of-type {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n    .accordion-item:last-of-type .accordion-button.collapsed {\n      border-bottom-right-radius: calc(0.25rem - 1px);\n      border-bottom-left-radius: calc(0.25rem - 1px); }\n    .accordion-item:last-of-type .accordion-collapse {\n      border-bottom-right-radius: 0.25rem;\n      border-bottom-left-radius: 0.25rem; }\n\n.accordion-body {\n  padding: 1rem 1.25rem; }\n\n.accordion-flush .accordion-collapse {\n  border-width: 0; }\n\n.accordion-flush .accordion-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n  .accordion-flush .accordion-item:first-child {\n    border-top: 0; }\n  .accordion-flush .accordion-item:last-child {\n    border-bottom: 0; }\n  .accordion-flush .accordion-item .accordion-button {\n    border-radius: 0; }\n\n.breadcrumb {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0 0;\n  margin-bottom: 1rem;\n  list-style: none; }\n\n.breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    float: left;\n    padding-right: 0.5rem;\n    color: #6c757d;\n    content: var(--bs-breadcrumb-divider, \"/\") /* rtl: var(--bs-breadcrumb-divider, \"/\") */; }\n\n.breadcrumb-item.active {\n  color: #6c757d; }\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none; }\n\n.page-link {\n  position: relative;\n  display: block;\n  color: #0d6efd;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .page-link {\n      transition: none; } }\n  .page-link:hover {\n    z-index: 2;\n    color: #0a58ca;\n    background-color: #e9ecef;\n    border-color: #dee2e6; }\n  .page-link:focus {\n    z-index: 3;\n    color: #0a58ca;\n    background-color: #e9ecef;\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }\n\n.page-item:not(:first-child) .page-link {\n  margin-left: -1px; }\n\n.page-item.active .page-link {\n  z-index: 3;\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd; }\n\n.page-item.disabled .page-link {\n  color: #6c757d;\n  pointer-events: none;\n  background-color: #fff;\n  border-color: #dee2e6; }\n\n.page-link {\n  padding: 0.375rem 0.75rem; }\n\n.page-item:first-child .page-link {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.35em 0.65em;\n  font-size: 0.75em;\n  font-weight: 700;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\n.alert {\n  position: relative;\n  padding: 1rem 1rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: 700; }\n\n.alert-dismissible {\n  padding-right: 3rem; }\n  .alert-dismissible .btn-close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 2;\n    padding: 1.25rem 1rem; }\n\n.alert-primary {\n  color: #084298;\n  background-color: #cfe2ff;\n  border-color: #b6d4fe; }\n  .alert-primary .alert-link {\n    color: #06357a; }\n\n.alert-secondary {\n  color: #41464b;\n  background-color: #e2e3e5;\n  border-color: #d3d6d8; }\n  .alert-secondary .alert-link {\n    color: #34383c; }\n\n.alert-success {\n  color: #0f5132;\n  background-color: #d1e7dd;\n  border-color: #badbcc; }\n  .alert-success .alert-link {\n    color: #0c4128; }\n\n.alert-info {\n  color: #055160;\n  background-color: #cff4fc;\n  border-color: #b6effb; }\n  .alert-info .alert-link {\n    color: #04414d; }\n\n.alert-warning {\n  color: #664d03;\n  background-color: #fff3cd;\n  border-color: #ffecb5; }\n  .alert-warning .alert-link {\n    color: #523e02; }\n\n.alert-danger {\n  color: #842029;\n  background-color: #f8d7da;\n  border-color: #f5c2c7; }\n  .alert-danger .alert-link {\n    color: #6a1a21; }\n\n.alert-light {\n  color: #636464;\n  background-color: #fefefe;\n  border-color: #fdfdfe; }\n  .alert-light .alert-link {\n    color: #4f5050; }\n\n.alert-dark {\n  color: #141619;\n  background-color: #d3d3d4;\n  border-color: #bcbebf; }\n  .alert-dark .alert-link {\n    color: #101214; }\n\n@keyframes progress-bar-stripes {\n  0% {\n    background-position-x: 1rem; } }\n\n.progress {\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #0d6efd;\n  transition: width 0.6s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .progress-bar {\n      transition: none; } }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  animation: 1s linear infinite progress-bar-stripes; }\n  @media (prefers-reduced-motion: reduce) {\n    .progress-bar-animated {\n      animation: none; } }\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  border-radius: 0.25rem; }\n\n.list-group-numbered {\n  list-style-type: none;\n  counter-reset: section; }\n  .list-group-numbered > li::before {\n    content: counters(section, \".\") \". \";\n    counter-increment: section; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit; }\n  .list-group-item-action:hover, .list-group-item-action:focus {\n    z-index: 1;\n    color: #495057;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .list-group-item-action:active {\n    color: #212529;\n    background-color: #e9ecef; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.5rem 1rem;\n  color: #212529;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-left-radius: inherit;\n    border-top-right-radius: inherit; }\n  .list-group-item:last-child {\n    border-bottom-right-radius: inherit;\n    border-bottom-left-radius: inherit; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #6c757d;\n    pointer-events: none;\n    background-color: #fff; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0d6efd;\n    border-color: #0d6efd; }\n  .list-group-item + .list-group-item {\n    border-top-width: 0; }\n    .list-group-item + .list-group-item.active {\n      margin-top: -1px;\n      border-top-width: 1px; }\n\n.list-group-horizontal {\n  flex-direction: row; }\n  .list-group-horizontal > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0; }\n  .list-group-horizontal > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0; }\n  .list-group-horizontal > .list-group-item.active {\n    margin-top: 0; }\n  .list-group-horizontal > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0; }\n    .list-group-horizontal > .list-group-item + .list-group-item.active {\n      margin-left: -1px;\n      border-left-width: 1px; }\n\n@media (min-width: 576px) {\n  .list-group-horizontal-sm {\n    flex-direction: row; }\n    .list-group-horizontal-sm > .list-group-item:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal-sm > .list-group-item:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .list-group-horizontal-sm > .list-group-item.active {\n      margin-top: 0; }\n    .list-group-horizontal-sm > .list-group-item + .list-group-item {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .list-group-horizontal-sm > .list-group-item + .list-group-item.active {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 768px) {\n  .list-group-horizontal-md {\n    flex-direction: row; }\n    .list-group-horizontal-md > .list-group-item:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal-md > .list-group-item:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .list-group-horizontal-md > .list-group-item.active {\n      margin-top: 0; }\n    .list-group-horizontal-md > .list-group-item + .list-group-item {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .list-group-horizontal-md > .list-group-item + .list-group-item.active {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 992px) {\n  .list-group-horizontal-lg {\n    flex-direction: row; }\n    .list-group-horizontal-lg > .list-group-item:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal-lg > .list-group-item:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .list-group-horizontal-lg > .list-group-item.active {\n      margin-top: 0; }\n    .list-group-horizontal-lg > .list-group-item + .list-group-item {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .list-group-horizontal-lg > .list-group-item + .list-group-item.active {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 1200px) {\n  .list-group-horizontal-xl {\n    flex-direction: row; }\n    .list-group-horizontal-xl > .list-group-item:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal-xl > .list-group-item:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .list-group-horizontal-xl > .list-group-item.active {\n      margin-top: 0; }\n    .list-group-horizontal-xl > .list-group-item + .list-group-item {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .list-group-horizontal-xl > .list-group-item + .list-group-item.active {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n@media (min-width: 1400px) {\n  .list-group-horizontal-xxl {\n    flex-direction: row; }\n    .list-group-horizontal-xxl > .list-group-item:first-child {\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal-xxl > .list-group-item:last-child {\n      border-top-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n    .list-group-horizontal-xxl > .list-group-item.active {\n      margin-top: 0; }\n    .list-group-horizontal-xxl > .list-group-item + .list-group-item {\n      border-top-width: 1px;\n      border-left-width: 0; }\n      .list-group-horizontal-xxl > .list-group-item + .list-group-item.active {\n        margin-left: -1px;\n        border-left-width: 1px; } }\n\n.list-group-flush {\n  border-radius: 0; }\n  .list-group-flush > .list-group-item {\n    border-width: 0 0 1px; }\n    .list-group-flush > .list-group-item:last-child {\n      border-bottom-width: 0; }\n\n.list-group-item-primary {\n  color: #084298;\n  background-color: #cfe2ff; }\n  .list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {\n    color: #084298;\n    background-color: #bacbe6; }\n  .list-group-item-primary.list-group-item-action.active {\n    color: #fff;\n    background-color: #084298;\n    border-color: #084298; }\n\n.list-group-item-secondary {\n  color: #41464b;\n  background-color: #e2e3e5; }\n  .list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {\n    color: #41464b;\n    background-color: #cbccce; }\n  .list-group-item-secondary.list-group-item-action.active {\n    color: #fff;\n    background-color: #41464b;\n    border-color: #41464b; }\n\n.list-group-item-success {\n  color: #0f5132;\n  background-color: #d1e7dd; }\n  .list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {\n    color: #0f5132;\n    background-color: #bcd0c7; }\n  .list-group-item-success.list-group-item-action.active {\n    color: #fff;\n    background-color: #0f5132;\n    border-color: #0f5132; }\n\n.list-group-item-info {\n  color: #055160;\n  background-color: #cff4fc; }\n  .list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {\n    color: #055160;\n    background-color: #badce3; }\n  .list-group-item-info.list-group-item-action.active {\n    color: #fff;\n    background-color: #055160;\n    border-color: #055160; }\n\n.list-group-item-warning {\n  color: #664d03;\n  background-color: #fff3cd; }\n  .list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {\n    color: #664d03;\n    background-color: #e6dbb9; }\n  .list-group-item-warning.list-group-item-action.active {\n    color: #fff;\n    background-color: #664d03;\n    border-color: #664d03; }\n\n.list-group-item-danger {\n  color: #842029;\n  background-color: #f8d7da; }\n  .list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {\n    color: #842029;\n    background-color: #dfc2c4; }\n  .list-group-item-danger.list-group-item-action.active {\n    color: #fff;\n    background-color: #842029;\n    border-color: #842029; }\n\n.list-group-item-light {\n  color: #636464;\n  background-color: #fefefe; }\n  .list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {\n    color: #636464;\n    background-color: #e5e5e5; }\n  .list-group-item-light.list-group-item-action.active {\n    color: #fff;\n    background-color: #636464;\n    border-color: #636464; }\n\n.list-group-item-dark {\n  color: #141619;\n  background-color: #d3d3d4; }\n  .list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {\n    color: #141619;\n    background-color: #bebebf; }\n  .list-group-item-dark.list-group-item-action.active {\n    color: #fff;\n    background-color: #141619;\n    border-color: #141619; }\n\n.btn-close {\n  box-sizing: content-box;\n  width: 1em;\n  height: 1em;\n  padding: 0.25em 0.25em;\n  color: #000;\n  background: transparent url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\") center/1em auto no-repeat;\n  border: 0;\n  border-radius: 0.25rem;\n  opacity: 0.5; }\n  .btn-close:hover {\n    color: #000;\n    text-decoration: none;\n    opacity: 0.75; }\n  .btn-close:focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n    opacity: 1; }\n  .btn-close:disabled, .btn-close.disabled {\n    pointer-events: none;\n    user-select: none;\n    opacity: 0.25; }\n\n.btn-close-white {\n  filter: invert(1) grayscale(100%) brightness(200%); }\n\n.toast {\n  width: 350px;\n  max-width: 100%;\n  font-size: 0.875rem;\n  pointer-events: auto;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .toast:not(.showing):not(.show) {\n    opacity: 0; }\n  .toast.hide {\n    display: none; }\n\n.toast-container {\n  width: max-content;\n  max-width: 100%;\n  pointer-events: none; }\n  .toast-container > :not(:last-child) {\n    margin-bottom: 0.75rem; }\n\n.toast-header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0.75rem;\n  color: #6c757d;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px); }\n  .toast-header .btn-close {\n    margin-right: -0.375rem;\n    margin-left: 0.75rem; }\n\n.toast-body {\n  padding: 0.75rem;\n  word-wrap: break-word; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: 0; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none; }\n  .modal.fade .modal-dialog {\n    transition: transform 0.3s ease-out;\n    transform: translate(0, -50px); }\n    @media (prefers-reduced-motion: reduce) {\n      .modal.fade .modal-dialog {\n        transition: none; } }\n  .modal.show .modal-dialog {\n    transform: none; }\n  .modal.modal-static .modal-dialog {\n    transform: scale(1.02); }\n\n.modal-dialog-scrollable {\n  height: calc(100% - 1rem); }\n  .modal-dialog-scrollable .modal-content {\n    max-height: 100%;\n    overflow: hidden; }\n  .modal-dialog-scrollable .modal-body {\n    overflow-y: auto; }\n\n.modal-dialog-centered {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - 1rem); }\n\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .modal-header .btn-close {\n    padding: 0.5rem 0.5rem;\n    margin: -0.5rem -0.5rem -0.5rem auto; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem; }\n\n.modal-footer {\n  display: flex;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0.75rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: calc(0.3rem - 1px);\n  border-bottom-left-radius: calc(0.3rem - 1px); }\n  .modal-footer > * {\n    margin: 0.25rem; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto; }\n  .modal-dialog-scrollable {\n    height: calc(100% - 3.5rem); }\n  .modal-dialog-centered {\n    min-height: calc(100% - 3.5rem); }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg,\n  .modal-xl {\n    max-width: 800px; } }\n\n@media (min-width: 1200px) {\n  .modal-xl {\n    max-width: 1140px; } }\n\n.modal-fullscreen {\n  width: 100vw;\n  max-width: none;\n  height: 100%;\n  margin: 0; }\n  .modal-fullscreen .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0; }\n  .modal-fullscreen .modal-header {\n    border-radius: 0; }\n  .modal-fullscreen .modal-body {\n    overflow-y: auto; }\n  .modal-fullscreen .modal-footer {\n    border-radius: 0; }\n\n@media (max-width: 575.98px) {\n  .modal-fullscreen-sm-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0; }\n    .modal-fullscreen-sm-down .modal-content {\n      height: 100%;\n      border: 0;\n      border-radius: 0; }\n    .modal-fullscreen-sm-down .modal-header {\n      border-radius: 0; }\n    .modal-fullscreen-sm-down .modal-body {\n      overflow-y: auto; }\n    .modal-fullscreen-sm-down .modal-footer {\n      border-radius: 0; } }\n\n@media (max-width: 767.98px) {\n  .modal-fullscreen-md-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0; }\n    .modal-fullscreen-md-down .modal-content {\n      height: 100%;\n      border: 0;\n      border-radius: 0; }\n    .modal-fullscreen-md-down .modal-header {\n      border-radius: 0; }\n    .modal-fullscreen-md-down .modal-body {\n      overflow-y: auto; }\n    .modal-fullscreen-md-down .modal-footer {\n      border-radius: 0; } }\n\n@media (max-width: 991.98px) {\n  .modal-fullscreen-lg-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0; }\n    .modal-fullscreen-lg-down .modal-content {\n      height: 100%;\n      border: 0;\n      border-radius: 0; }\n    .modal-fullscreen-lg-down .modal-header {\n      border-radius: 0; }\n    .modal-fullscreen-lg-down .modal-body {\n      overflow-y: auto; }\n    .modal-fullscreen-lg-down .modal-footer {\n      border-radius: 0; } }\n\n@media (max-width: 1199.98px) {\n  .modal-fullscreen-xl-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0; }\n    .modal-fullscreen-xl-down .modal-content {\n      height: 100%;\n      border: 0;\n      border-radius: 0; }\n    .modal-fullscreen-xl-down .modal-header {\n      border-radius: 0; }\n    .modal-fullscreen-xl-down .modal-body {\n      overflow-y: auto; }\n    .modal-fullscreen-xl-down .modal-footer {\n      border-radius: 0; } }\n\n@media (max-width: 1399.98px) {\n  .modal-fullscreen-xxl-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0; }\n    .modal-fullscreen-xxl-down .modal-content {\n      height: 100%;\n      border: 0;\n      border-radius: 0; }\n    .modal-fullscreen-xxl-down .modal-header {\n      border-radius: 0; }\n    .modal-fullscreen-xxl-down .modal-body {\n      overflow-y: auto; }\n    .modal-fullscreen-xxl-down .modal-footer {\n      border-radius: 0; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1080;\n  display: block;\n  margin: 0;\n  font-family: var(--bs-font-sans-serif);\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip .tooltip-arrow {\n    position: absolute;\n    display: block;\n    width: 0.8rem;\n    height: 0.4rem; }\n    .tooltip .tooltip-arrow::before {\n      position: absolute;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-tooltip-top, .bs-tooltip-auto[data-popper-placement^=\"top\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-top .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=\"top\"] .tooltip-arrow {\n    bottom: 0; }\n    .bs-tooltip-top .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=\"top\"] .tooltip-arrow::before {\n      top: -1px;\n      border-width: 0.4rem 0.4rem 0;\n      border-top-color: #000; }\n\n.bs-tooltip-end, .bs-tooltip-auto[data-popper-placement^=\"right\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-end .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=\"right\"] .tooltip-arrow {\n    left: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-end .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=\"right\"] .tooltip-arrow::before {\n      right: -1px;\n      border-width: 0.4rem 0.4rem 0.4rem 0;\n      border-right-color: #000; }\n\n.bs-tooltip-bottom, .bs-tooltip-auto[data-popper-placement^=\"bottom\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-bottom .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=\"bottom\"] .tooltip-arrow {\n    top: 0; }\n    .bs-tooltip-bottom .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=\"bottom\"] .tooltip-arrow::before {\n      bottom: -1px;\n      border-width: 0 0.4rem 0.4rem;\n      border-bottom-color: #000; }\n\n.bs-tooltip-start, .bs-tooltip-auto[data-popper-placement^=\"left\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-start .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=\"left\"] .tooltip-arrow {\n    right: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-start .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=\"left\"] .tooltip-arrow::before {\n      left: -1px;\n      border-width: 0.4rem 0 0.4rem 0.4rem;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0 /* rtl:ignore */;\n  z-index: 1070;\n  display: block;\n  max-width: 276px;\n  font-family: var(--bs-font-sans-serif);\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover .popover-arrow {\n    position: absolute;\n    display: block;\n    width: 1rem;\n    height: 0.5rem; }\n    .popover .popover-arrow::before, .popover .popover-arrow::after {\n      position: absolute;\n      display: block;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-popover-top > .popover-arrow, .bs-popover-auto[data-popper-placement^=\"top\"] > .popover-arrow {\n  bottom: calc(-0.5rem - 1px); }\n  .bs-popover-top > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=\"top\"] > .popover-arrow::before {\n    bottom: 0;\n    border-width: 0.5rem 0.5rem 0;\n    border-top-color: rgba(0, 0, 0, 0.25); }\n  .bs-popover-top > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=\"top\"] > .popover-arrow::after {\n    bottom: 1px;\n    border-width: 0.5rem 0.5rem 0;\n    border-top-color: #fff; }\n\n.bs-popover-end > .popover-arrow, .bs-popover-auto[data-popper-placement^=\"right\"] > .popover-arrow {\n  left: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem; }\n  .bs-popover-end > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=\"right\"] > .popover-arrow::before {\n    left: 0;\n    border-width: 0.5rem 0.5rem 0.5rem 0;\n    border-right-color: rgba(0, 0, 0, 0.25); }\n  .bs-popover-end > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=\"right\"] > .popover-arrow::after {\n    left: 1px;\n    border-width: 0.5rem 0.5rem 0.5rem 0;\n    border-right-color: #fff; }\n\n.bs-popover-bottom > .popover-arrow, .bs-popover-auto[data-popper-placement^=\"bottom\"] > .popover-arrow {\n  top: calc(-0.5rem - 1px); }\n  .bs-popover-bottom > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=\"bottom\"] > .popover-arrow::before {\n    top: 0;\n    border-width: 0 0.5rem 0.5rem 0.5rem;\n    border-bottom-color: rgba(0, 0, 0, 0.25); }\n  .bs-popover-bottom > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=\"bottom\"] > .popover-arrow::after {\n    top: 1px;\n    border-width: 0 0.5rem 0.5rem 0.5rem;\n    border-bottom-color: #fff; }\n\n.bs-popover-bottom .popover-header::before, .bs-popover-auto[data-popper-placement^=\"bottom\"] .popover-header::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 1rem;\n  margin-left: -0.5rem;\n  content: \"\";\n  border-bottom: 1px solid #f0f0f0; }\n\n.bs-popover-start > .popover-arrow, .bs-popover-auto[data-popper-placement^=\"left\"] > .popover-arrow {\n  right: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem; }\n  .bs-popover-start > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=\"left\"] > .popover-arrow::before {\n    right: 0;\n    border-width: 0.5rem 0 0.5rem 0.5rem;\n    border-left-color: rgba(0, 0, 0, 0.25); }\n  .bs-popover-start > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=\"left\"] > .popover-arrow::after {\n    right: 1px;\n    border-width: 0.5rem 0 0.5rem 0.5rem;\n    border-left-color: #fff; }\n\n.popover-header {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f0f0f0;\n  border-bottom: 1px solid #d8d8d8;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .popover-header:empty {\n    display: none; }\n\n.popover-body {\n  padding: 1rem 1rem;\n  color: #212529; }\n\n.carousel {\n  position: relative; }\n\n.carousel.pointer-event {\n  touch-action: pan-y; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .carousel-inner::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  backface-visibility: hidden;\n  transition: transform 0.6s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-item {\n      transition: none; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block; }\n\n/* rtl:begin:ignore */\n.carousel-item-next:not(.carousel-item-start),\n.active.carousel-item-end {\n  transform: translateX(100%); }\n\n.carousel-item-prev:not(.carousel-item-end),\n.active.carousel-item-start {\n  transform: translateX(-100%); }\n\n/* rtl:end:ignore */\n.carousel-fade .carousel-item {\n  opacity: 0;\n  transition-property: opacity;\n  transform: none; }\n\n.carousel-fade .carousel-item.active,\n.carousel-fade .carousel-item-next.carousel-item-start,\n.carousel-fade .carousel-item-prev.carousel-item-end {\n  z-index: 1;\n  opacity: 1; }\n\n.carousel-fade .active.carousel-item-start,\n.carousel-fade .active.carousel-item-end {\n  z-index: 0;\n  opacity: 0;\n  transition: opacity 0s 0.6s; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-fade .active.carousel-item-start,\n    .carousel-fade .active.carousel-item-end {\n      transition: none; } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  padding: 0;\n  color: #fff;\n  text-align: center;\n  background: none;\n  border: 0;\n  opacity: 0.5;\n  transition: opacity 0.15s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-control-prev,\n    .carousel-control-next {\n      transition: none; } }\n  .carousel-control-prev:hover, .carousel-control-prev:focus,\n  .carousel-control-next:hover,\n  .carousel-control-next:focus {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: 0.9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100% 100%; }\n\n/* rtl:options: {\n  \"autoRename\": true,\n  \"stringMap\":[ {\n    \"name\"    : \"prev-next\",\n    \"search\"  : \"prev\",\n    \"replace\" : \"next\"\n  } ]\n} */\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n  display: flex;\n  justify-content: center;\n  padding: 0;\n  margin-right: 15%;\n  margin-bottom: 1rem;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators [data-bs-target] {\n    box-sizing: content-box;\n    flex: 0 1 auto;\n    width: 30px;\n    height: 3px;\n    padding: 0;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 0;\n    border-top: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    opacity: 0.5;\n    transition: opacity 0.6s ease; }\n    @media (prefers-reduced-motion: reduce) {\n      .carousel-indicators [data-bs-target] {\n        transition: none; } }\n  .carousel-indicators .active {\n    opacity: 1; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 1.25rem;\n  left: 15%;\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n  color: #fff;\n  text-align: center; }\n\n.carousel-dark .carousel-control-prev-icon,\n.carousel-dark .carousel-control-next-icon {\n  filter: invert(1) grayscale(100); }\n\n.carousel-dark .carousel-indicators [data-bs-target] {\n  background-color: #000; }\n\n.carousel-dark .carousel-caption {\n  color: #000; }\n\n@keyframes spinner-border {\n  to {\n    transform: rotate(360deg) /* rtl:ignore */; } }\n\n.spinner-border {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: -0.125em;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  animation: 0.75s linear infinite spinner-border; }\n\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em; }\n\n@keyframes spinner-grow {\n  0% {\n    transform: scale(0); }\n  50% {\n    opacity: 1;\n    transform: none; } }\n\n.spinner-grow {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: -0.125em;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  animation: 0.75s linear infinite spinner-grow; }\n\n.spinner-grow-sm {\n  width: 1rem;\n  height: 1rem; }\n\n@media (prefers-reduced-motion: reduce) {\n  .spinner-border,\n  .spinner-grow {\n    animation-duration: 1.5s; } }\n\n.offcanvas {\n  position: fixed;\n  bottom: 0;\n  z-index: 1050;\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  visibility: hidden;\n  background-color: #fff;\n  background-clip: padding-box;\n  outline: 0;\n  transition: transform 0.3s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .offcanvas {\n      transition: none; } }\n\n.offcanvas-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1rem; }\n  .offcanvas-header .btn-close {\n    padding: 0.5rem 0.5rem;\n    margin: -0.5rem -0.5rem -0.5rem auto; }\n\n.offcanvas-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.offcanvas-body {\n  flex-grow: 1;\n  padding: 1rem 1rem;\n  overflow-y: auto; }\n\n.offcanvas-start {\n  top: 0;\n  left: 0;\n  width: 400px;\n  border-right: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateX(-100%); }\n\n.offcanvas-end {\n  top: 0;\n  right: 0;\n  width: 400px;\n  border-left: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateX(100%); }\n\n.offcanvas-top {\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 30vh;\n  max-height: 100%;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateY(-100%); }\n\n.offcanvas-bottom {\n  right: 0;\n  left: 0;\n  height: 30vh;\n  max-height: 100%;\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateY(100%); }\n\n.offcanvas.show {\n  transform: none; }\n\n.clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n.link-primary {\n  color: #0d6efd; }\n  .link-primary:hover, .link-primary:focus {\n    color: #0a58ca; }\n\n.link-secondary {\n  color: #6c757d; }\n  .link-secondary:hover, .link-secondary:focus {\n    color: #565e64; }\n\n.link-success {\n  color: #198754; }\n  .link-success:hover, .link-success:focus {\n    color: #146c43; }\n\n.link-info {\n  color: #0dcaf0; }\n  .link-info:hover, .link-info:focus {\n    color: #3dd5f3; }\n\n.link-warning {\n  color: #ffc107; }\n  .link-warning:hover, .link-warning:focus {\n    color: #ffcd39; }\n\n.link-danger {\n  color: #dc3545; }\n  .link-danger:hover, .link-danger:focus {\n    color: #b02a37; }\n\n.link-light {\n  color: #f8f9fa; }\n  .link-light:hover, .link-light:focus {\n    color: #f9fafb; }\n\n.link-dark {\n  color: #212529; }\n  .link-dark:hover, .link-dark:focus {\n    color: #1a1e21; }\n\n.ratio {\n  position: relative;\n  width: 100%; }\n  .ratio::before {\n    display: block;\n    padding-top: var(--bs-aspect-ratio);\n    content: \"\"; }\n  .ratio > * {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n\n.ratio-1x1 {\n  --bs-aspect-ratio: 100%; }\n\n.ratio-4x3 {\n  --bs-aspect-ratio: calc(3 / 4 * 100%); }\n\n.ratio-16x9 {\n  --bs-aspect-ratio: calc(9 / 16 * 100%); }\n\n.ratio-21x9 {\n  --bs-aspect-ratio: calc(9 / 21 * 100%); }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1020; }\n\n@media (min-width: 576px) {\n  .sticky-sm-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n@media (min-width: 768px) {\n  .sticky-md-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n@media (min-width: 992px) {\n  .sticky-lg-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n@media (min-width: 1200px) {\n  .sticky-xl-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n@media (min-width: 1400px) {\n  .sticky-xxl-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n.visually-hidden,\n.visually-hidden-focusable:not(:focus):not(:focus-within) {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important; }\n\n.stretched-link::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  content: \"\"; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.float-start {\n  float: left !important; }\n\n.float-end {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n.overflow-auto {\n  overflow: auto !important; }\n\n.overflow-hidden {\n  overflow: hidden !important; }\n\n.overflow-visible {\n  overflow: visible !important; }\n\n.overflow-scroll {\n  overflow: scroll !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-grid {\n  display: grid !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-row {\n  display: table-row !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: flex !important; }\n\n.d-inline-flex {\n  display: inline-flex !important; }\n\n.d-none {\n  display: none !important; }\n\n.shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; }\n\n.shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important; }\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }\n\n.shadow-none {\n  box-shadow: none !important; }\n\n.position-static {\n  position: static !important; }\n\n.position-relative {\n  position: relative !important; }\n\n.position-absolute {\n  position: absolute !important; }\n\n.position-fixed {\n  position: fixed !important; }\n\n.position-sticky {\n  position: sticky !important; }\n\n.top-0 {\n  top: 0 !important; }\n\n.top-50 {\n  top: 50% !important; }\n\n.top-100 {\n  top: 100% !important; }\n\n.bottom-0 {\n  bottom: 0 !important; }\n\n.bottom-50 {\n  bottom: 50% !important; }\n\n.bottom-100 {\n  bottom: 100% !important; }\n\n.start-0 {\n  left: 0 !important; }\n\n.start-50 {\n  left: 50% !important; }\n\n.start-100 {\n  left: 100% !important; }\n\n.end-0 {\n  right: 0 !important; }\n\n.end-50 {\n  right: 50% !important; }\n\n.end-100 {\n  right: 100% !important; }\n\n.translate-middle {\n  transform: translate(-50%, -50%) !important; }\n\n.translate-middle-x {\n  transform: translateX(-50%) !important; }\n\n.translate-middle-y {\n  transform: translateY(-50%) !important; }\n\n.border {\n  border: 1px solid #dee2e6 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top {\n  border-top: 1px solid #dee2e6 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-end {\n  border-right: 1px solid #dee2e6 !important; }\n\n.border-end-0 {\n  border-right: 0 !important; }\n\n.border-bottom {\n  border-bottom: 1px solid #dee2e6 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-start {\n  border-left: 1px solid #dee2e6 !important; }\n\n.border-start-0 {\n  border-left: 0 !important; }\n\n.border-primary {\n  border-color: #0d6efd !important; }\n\n.border-secondary {\n  border-color: #6c757d !important; }\n\n.border-success {\n  border-color: #198754 !important; }\n\n.border-info {\n  border-color: #0dcaf0 !important; }\n\n.border-warning {\n  border-color: #ffc107 !important; }\n\n.border-danger {\n  border-color: #dc3545 !important; }\n\n.border-light {\n  border-color: #f8f9fa !important; }\n\n.border-dark {\n  border-color: #212529 !important; }\n\n.border-white {\n  border-color: #fff !important; }\n\n.border-1 {\n  border-width: 1px !important; }\n\n.border-2 {\n  border-width: 2px !important; }\n\n.border-3 {\n  border-width: 3px !important; }\n\n.border-4 {\n  border-width: 4px !important; }\n\n.border-5 {\n  border-width: 5px !important; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.w-auto {\n  width: auto !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.vw-100 {\n  width: 100vw !important; }\n\n.min-vw-100 {\n  min-width: 100vw !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.h-auto {\n  height: auto !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.vh-100 {\n  height: 100vh !important; }\n\n.min-vh-100 {\n  min-height: 100vh !important; }\n\n.flex-fill {\n  flex: 1 1 auto !important; }\n\n.flex-row {\n  flex-direction: row !important; }\n\n.flex-column {\n  flex-direction: column !important; }\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important; }\n\n.flex-grow-0 {\n  flex-grow: 0 !important; }\n\n.flex-grow-1 {\n  flex-grow: 1 !important; }\n\n.flex-shrink-0 {\n  flex-shrink: 0 !important; }\n\n.flex-shrink-1 {\n  flex-shrink: 1 !important; }\n\n.flex-wrap {\n  flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important; }\n\n.gap-0 {\n  gap: 0 !important; }\n\n.gap-1 {\n  gap: 0.25rem !important; }\n\n.gap-2 {\n  gap: 0.5rem !important; }\n\n.gap-3 {\n  gap: 1rem !important; }\n\n.gap-4 {\n  gap: 1.5rem !important; }\n\n.gap-5 {\n  gap: 3rem !important; }\n\n.justify-content-start {\n  justify-content: flex-start !important; }\n\n.justify-content-end {\n  justify-content: flex-end !important; }\n\n.justify-content-center {\n  justify-content: center !important; }\n\n.justify-content-between {\n  justify-content: space-between !important; }\n\n.justify-content-around {\n  justify-content: space-around !important; }\n\n.justify-content-evenly {\n  justify-content: space-evenly !important; }\n\n.align-items-start {\n  align-items: flex-start !important; }\n\n.align-items-end {\n  align-items: flex-end !important; }\n\n.align-items-center {\n  align-items: center !important; }\n\n.align-items-baseline {\n  align-items: baseline !important; }\n\n.align-items-stretch {\n  align-items: stretch !important; }\n\n.align-content-start {\n  align-content: flex-start !important; }\n\n.align-content-end {\n  align-content: flex-end !important; }\n\n.align-content-center {\n  align-content: center !important; }\n\n.align-content-between {\n  align-content: space-between !important; }\n\n.align-content-around {\n  align-content: space-around !important; }\n\n.align-content-stretch {\n  align-content: stretch !important; }\n\n.align-self-auto {\n  align-self: auto !important; }\n\n.align-self-start {\n  align-self: flex-start !important; }\n\n.align-self-end {\n  align-self: flex-end !important; }\n\n.align-self-center {\n  align-self: center !important; }\n\n.align-self-baseline {\n  align-self: baseline !important; }\n\n.align-self-stretch {\n  align-self: stretch !important; }\n\n.order-first {\n  order: -1 !important; }\n\n.order-0 {\n  order: 0 !important; }\n\n.order-1 {\n  order: 1 !important; }\n\n.order-2 {\n  order: 2 !important; }\n\n.order-3 {\n  order: 3 !important; }\n\n.order-4 {\n  order: 4 !important; }\n\n.order-5 {\n  order: 5 !important; }\n\n.order-last {\n  order: 6 !important; }\n\n.m-0 {\n  margin: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.me-0 {\n  margin-right: 0 !important; }\n\n.me-1 {\n  margin-right: 0.25rem !important; }\n\n.me-2 {\n  margin-right: 0.5rem !important; }\n\n.me-3 {\n  margin-right: 1rem !important; }\n\n.me-4 {\n  margin-right: 1.5rem !important; }\n\n.me-5 {\n  margin-right: 3rem !important; }\n\n.me-auto {\n  margin-right: auto !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ms-0 {\n  margin-left: 0 !important; }\n\n.ms-1 {\n  margin-left: 0.25rem !important; }\n\n.ms-2 {\n  margin-left: 0.5rem !important; }\n\n.ms-3 {\n  margin-left: 1rem !important; }\n\n.ms-4 {\n  margin-left: 1.5rem !important; }\n\n.ms-5 {\n  margin-left: 3rem !important; }\n\n.ms-auto {\n  margin-left: auto !important; }\n\n.p-0 {\n  padding: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pe-0 {\n  padding-right: 0 !important; }\n\n.pe-1 {\n  padding-right: 0.25rem !important; }\n\n.pe-2 {\n  padding-right: 0.5rem !important; }\n\n.pe-3 {\n  padding-right: 1rem !important; }\n\n.pe-4 {\n  padding-right: 1.5rem !important; }\n\n.pe-5 {\n  padding-right: 3rem !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.ps-0 {\n  padding-left: 0 !important; }\n\n.ps-1 {\n  padding-left: 0.25rem !important; }\n\n.ps-2 {\n  padding-left: 0.5rem !important; }\n\n.ps-3 {\n  padding-left: 1rem !important; }\n\n.ps-4 {\n  padding-left: 1.5rem !important; }\n\n.ps-5 {\n  padding-left: 3rem !important; }\n\n.font-monospace {\n  font-family: var(--bs-font-monospace) !important; }\n\n.fs-1 {\n  font-size: calc(1.375rem + 1.5vw) !important; }\n\n.fs-2 {\n  font-size: calc(1.325rem + 0.9vw) !important; }\n\n.fs-3 {\n  font-size: calc(1.3rem + 0.6vw) !important; }\n\n.fs-4 {\n  font-size: calc(1.275rem + 0.3vw) !important; }\n\n.fs-5 {\n  font-size: 1.25rem !important; }\n\n.fs-6 {\n  font-size: 1rem !important; }\n\n.fst-italic {\n  font-style: italic !important; }\n\n.fst-normal {\n  font-style: normal !important; }\n\n.fw-light {\n  font-weight: 300 !important; }\n\n.fw-lighter {\n  font-weight: lighter !important; }\n\n.fw-normal {\n  font-weight: 400 !important; }\n\n.fw-bold {\n  font-weight: 700 !important; }\n\n.fw-bolder {\n  font-weight: bolder !important; }\n\n.lh-1 {\n  line-height: 1 !important; }\n\n.lh-sm {\n  line-height: 1.25 !important; }\n\n.lh-base {\n  line-height: 1.5 !important; }\n\n.lh-lg {\n  line-height: 2 !important; }\n\n.text-start {\n  text-align: left !important; }\n\n.text-end {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n.text-decoration-none {\n  text-decoration: none !important; }\n\n.text-decoration-underline {\n  text-decoration: underline !important; }\n\n.text-decoration-line-through {\n  text-decoration: line-through !important; }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.text-wrap {\n  white-space: normal !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n/* rtl:begin:remove */\n.text-break {\n  word-wrap: break-word !important;\n  word-break: break-word !important; }\n\n/* rtl:end:remove */\n.text-primary {\n  color: #0d6efd !important; }\n\n.text-secondary {\n  color: #6c757d !important; }\n\n.text-success {\n  color: #198754 !important; }\n\n.text-info {\n  color: #0dcaf0 !important; }\n\n.text-warning {\n  color: #ffc107 !important; }\n\n.text-danger {\n  color: #dc3545 !important; }\n\n.text-light {\n  color: #f8f9fa !important; }\n\n.text-dark {\n  color: #212529 !important; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-body {\n  color: #212529 !important; }\n\n.text-muted {\n  color: #6c757d !important; }\n\n.text-black-50 {\n  color: rgba(0, 0, 0, 0.5) !important; }\n\n.text-white-50 {\n  color: rgba(255, 255, 255, 0.5) !important; }\n\n.text-reset {\n  color: inherit !important; }\n\n.bg-primary {\n  background-color: #0d6efd !important; }\n\n.bg-secondary {\n  background-color: #6c757d !important; }\n\n.bg-success {\n  background-color: #198754 !important; }\n\n.bg-info {\n  background-color: #0dcaf0 !important; }\n\n.bg-warning {\n  background-color: #ffc107 !important; }\n\n.bg-danger {\n  background-color: #dc3545 !important; }\n\n.bg-light {\n  background-color: #f8f9fa !important; }\n\n.bg-dark {\n  background-color: #212529 !important; }\n\n.bg-body {\n  background-color: #fff !important; }\n\n.bg-white {\n  background-color: #fff !important; }\n\n.bg-transparent {\n  background-color: transparent !important; }\n\n.bg-gradient {\n  background-image: var(--bs-gradient) !important; }\n\n.user-select-all {\n  user-select: all !important; }\n\n.user-select-auto {\n  user-select: auto !important; }\n\n.user-select-none {\n  user-select: none !important; }\n\n.pe-none {\n  pointer-events: none !important; }\n\n.pe-auto {\n  pointer-events: auto !important; }\n\n.rounded {\n  border-radius: 0.25rem !important; }\n\n.rounded-0 {\n  border-radius: 0 !important; }\n\n.rounded-1 {\n  border-radius: 0.2rem !important; }\n\n.rounded-2 {\n  border-radius: 0.25rem !important; }\n\n.rounded-3 {\n  border-radius: 0.3rem !important; }\n\n.rounded-circle {\n  border-radius: 50% !important; }\n\n.rounded-pill {\n  border-radius: 50rem !important; }\n\n.rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important; }\n\n.rounded-end {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.rounded-start {\n  border-bottom-left-radius: 0.25rem !important;\n  border-top-left-radius: 0.25rem !important; }\n\n.visible {\n  visibility: visible !important; }\n\n.invisible {\n  visibility: hidden !important; }\n\n@media (min-width: 576px) {\n  .float-sm-start {\n    float: left !important; }\n  .float-sm-end {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-grid {\n    display: grid !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-row {\n    display: table-row !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: inline-flex !important; }\n  .d-sm-none {\n    display: none !important; }\n  .flex-sm-fill {\n    flex: 1 1 auto !important; }\n  .flex-sm-row {\n    flex-direction: row !important; }\n  .flex-sm-column {\n    flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-sm-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-sm-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-sm-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-sm-shrink-1 {\n    flex-shrink: 1 !important; }\n  .flex-sm-wrap {\n    flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .gap-sm-0 {\n    gap: 0 !important; }\n  .gap-sm-1 {\n    gap: 0.25rem !important; }\n  .gap-sm-2 {\n    gap: 0.5rem !important; }\n  .gap-sm-3 {\n    gap: 1rem !important; }\n  .gap-sm-4 {\n    gap: 1.5rem !important; }\n  .gap-sm-5 {\n    gap: 3rem !important; }\n  .justify-content-sm-start {\n    justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    justify-content: center !important; }\n  .justify-content-sm-between {\n    justify-content: space-between !important; }\n  .justify-content-sm-around {\n    justify-content: space-around !important; }\n  .justify-content-sm-evenly {\n    justify-content: space-evenly !important; }\n  .align-items-sm-start {\n    align-items: flex-start !important; }\n  .align-items-sm-end {\n    align-items: flex-end !important; }\n  .align-items-sm-center {\n    align-items: center !important; }\n  .align-items-sm-baseline {\n    align-items: baseline !important; }\n  .align-items-sm-stretch {\n    align-items: stretch !important; }\n  .align-content-sm-start {\n    align-content: flex-start !important; }\n  .align-content-sm-end {\n    align-content: flex-end !important; }\n  .align-content-sm-center {\n    align-content: center !important; }\n  .align-content-sm-between {\n    align-content: space-between !important; }\n  .align-content-sm-around {\n    align-content: space-around !important; }\n  .align-content-sm-stretch {\n    align-content: stretch !important; }\n  .align-self-sm-auto {\n    align-self: auto !important; }\n  .align-self-sm-start {\n    align-self: flex-start !important; }\n  .align-self-sm-end {\n    align-self: flex-end !important; }\n  .align-self-sm-center {\n    align-self: center !important; }\n  .align-self-sm-baseline {\n    align-self: baseline !important; }\n  .align-self-sm-stretch {\n    align-self: stretch !important; }\n  .order-sm-first {\n    order: -1 !important; }\n  .order-sm-0 {\n    order: 0 !important; }\n  .order-sm-1 {\n    order: 1 !important; }\n  .order-sm-2 {\n    order: 2 !important; }\n  .order-sm-3 {\n    order: 3 !important; }\n  .order-sm-4 {\n    order: 4 !important; }\n  .order-sm-5 {\n    order: 5 !important; }\n  .order-sm-last {\n    order: 6 !important; }\n  .m-sm-0 {\n    margin: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .me-sm-0 {\n    margin-right: 0 !important; }\n  .me-sm-1 {\n    margin-right: 0.25rem !important; }\n  .me-sm-2 {\n    margin-right: 0.5rem !important; }\n  .me-sm-3 {\n    margin-right: 1rem !important; }\n  .me-sm-4 {\n    margin-right: 1.5rem !important; }\n  .me-sm-5 {\n    margin-right: 3rem !important; }\n  .me-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ms-sm-0 {\n    margin-left: 0 !important; }\n  .ms-sm-1 {\n    margin-left: 0.25rem !important; }\n  .ms-sm-2 {\n    margin-left: 0.5rem !important; }\n  .ms-sm-3 {\n    margin-left: 1rem !important; }\n  .ms-sm-4 {\n    margin-left: 1.5rem !important; }\n  .ms-sm-5 {\n    margin-left: 3rem !important; }\n  .ms-sm-auto {\n    margin-left: auto !important; }\n  .p-sm-0 {\n    padding: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pe-sm-0 {\n    padding-right: 0 !important; }\n  .pe-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pe-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pe-sm-3 {\n    padding-right: 1rem !important; }\n  .pe-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pe-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .ps-sm-0 {\n    padding-left: 0 !important; }\n  .ps-sm-1 {\n    padding-left: 0.25rem !important; }\n  .ps-sm-2 {\n    padding-left: 0.5rem !important; }\n  .ps-sm-3 {\n    padding-left: 1rem !important; }\n  .ps-sm-4 {\n    padding-left: 1.5rem !important; }\n  .ps-sm-5 {\n    padding-left: 3rem !important; }\n  .text-sm-start {\n    text-align: left !important; }\n  .text-sm-end {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .float-md-start {\n    float: left !important; }\n  .float-md-end {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-grid {\n    display: grid !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-row {\n    display: table-row !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: inline-flex !important; }\n  .d-md-none {\n    display: none !important; }\n  .flex-md-fill {\n    flex: 1 1 auto !important; }\n  .flex-md-row {\n    flex-direction: row !important; }\n  .flex-md-column {\n    flex-direction: column !important; }\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-md-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-md-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-md-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-md-shrink-1 {\n    flex-shrink: 1 !important; }\n  .flex-md-wrap {\n    flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .gap-md-0 {\n    gap: 0 !important; }\n  .gap-md-1 {\n    gap: 0.25rem !important; }\n  .gap-md-2 {\n    gap: 0.5rem !important; }\n  .gap-md-3 {\n    gap: 1rem !important; }\n  .gap-md-4 {\n    gap: 1.5rem !important; }\n  .gap-md-5 {\n    gap: 3rem !important; }\n  .justify-content-md-start {\n    justify-content: flex-start !important; }\n  .justify-content-md-end {\n    justify-content: flex-end !important; }\n  .justify-content-md-center {\n    justify-content: center !important; }\n  .justify-content-md-between {\n    justify-content: space-between !important; }\n  .justify-content-md-around {\n    justify-content: space-around !important; }\n  .justify-content-md-evenly {\n    justify-content: space-evenly !important; }\n  .align-items-md-start {\n    align-items: flex-start !important; }\n  .align-items-md-end {\n    align-items: flex-end !important; }\n  .align-items-md-center {\n    align-items: center !important; }\n  .align-items-md-baseline {\n    align-items: baseline !important; }\n  .align-items-md-stretch {\n    align-items: stretch !important; }\n  .align-content-md-start {\n    align-content: flex-start !important; }\n  .align-content-md-end {\n    align-content: flex-end !important; }\n  .align-content-md-center {\n    align-content: center !important; }\n  .align-content-md-between {\n    align-content: space-between !important; }\n  .align-content-md-around {\n    align-content: space-around !important; }\n  .align-content-md-stretch {\n    align-content: stretch !important; }\n  .align-self-md-auto {\n    align-self: auto !important; }\n  .align-self-md-start {\n    align-self: flex-start !important; }\n  .align-self-md-end {\n    align-self: flex-end !important; }\n  .align-self-md-center {\n    align-self: center !important; }\n  .align-self-md-baseline {\n    align-self: baseline !important; }\n  .align-self-md-stretch {\n    align-self: stretch !important; }\n  .order-md-first {\n    order: -1 !important; }\n  .order-md-0 {\n    order: 0 !important; }\n  .order-md-1 {\n    order: 1 !important; }\n  .order-md-2 {\n    order: 2 !important; }\n  .order-md-3 {\n    order: 3 !important; }\n  .order-md-4 {\n    order: 4 !important; }\n  .order-md-5 {\n    order: 5 !important; }\n  .order-md-last {\n    order: 6 !important; }\n  .m-md-0 {\n    margin: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .me-md-0 {\n    margin-right: 0 !important; }\n  .me-md-1 {\n    margin-right: 0.25rem !important; }\n  .me-md-2 {\n    margin-right: 0.5rem !important; }\n  .me-md-3 {\n    margin-right: 1rem !important; }\n  .me-md-4 {\n    margin-right: 1.5rem !important; }\n  .me-md-5 {\n    margin-right: 3rem !important; }\n  .me-md-auto {\n    margin-right: auto !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ms-md-0 {\n    margin-left: 0 !important; }\n  .ms-md-1 {\n    margin-left: 0.25rem !important; }\n  .ms-md-2 {\n    margin-left: 0.5rem !important; }\n  .ms-md-3 {\n    margin-left: 1rem !important; }\n  .ms-md-4 {\n    margin-left: 1.5rem !important; }\n  .ms-md-5 {\n    margin-left: 3rem !important; }\n  .ms-md-auto {\n    margin-left: auto !important; }\n  .p-md-0 {\n    padding: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pe-md-0 {\n    padding-right: 0 !important; }\n  .pe-md-1 {\n    padding-right: 0.25rem !important; }\n  .pe-md-2 {\n    padding-right: 0.5rem !important; }\n  .pe-md-3 {\n    padding-right: 1rem !important; }\n  .pe-md-4 {\n    padding-right: 1.5rem !important; }\n  .pe-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .ps-md-0 {\n    padding-left: 0 !important; }\n  .ps-md-1 {\n    padding-left: 0.25rem !important; }\n  .ps-md-2 {\n    padding-left: 0.5rem !important; }\n  .ps-md-3 {\n    padding-left: 1rem !important; }\n  .ps-md-4 {\n    padding-left: 1.5rem !important; }\n  .ps-md-5 {\n    padding-left: 3rem !important; }\n  .text-md-start {\n    text-align: left !important; }\n  .text-md-end {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-start {\n    float: left !important; }\n  .float-lg-end {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-grid {\n    display: grid !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-row {\n    display: table-row !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: inline-flex !important; }\n  .d-lg-none {\n    display: none !important; }\n  .flex-lg-fill {\n    flex: 1 1 auto !important; }\n  .flex-lg-row {\n    flex-direction: row !important; }\n  .flex-lg-column {\n    flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-lg-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-lg-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-lg-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-lg-shrink-1 {\n    flex-shrink: 1 !important; }\n  .flex-lg-wrap {\n    flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .gap-lg-0 {\n    gap: 0 !important; }\n  .gap-lg-1 {\n    gap: 0.25rem !important; }\n  .gap-lg-2 {\n    gap: 0.5rem !important; }\n  .gap-lg-3 {\n    gap: 1rem !important; }\n  .gap-lg-4 {\n    gap: 1.5rem !important; }\n  .gap-lg-5 {\n    gap: 3rem !important; }\n  .justify-content-lg-start {\n    justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    justify-content: center !important; }\n  .justify-content-lg-between {\n    justify-content: space-between !important; }\n  .justify-content-lg-around {\n    justify-content: space-around !important; }\n  .justify-content-lg-evenly {\n    justify-content: space-evenly !important; }\n  .align-items-lg-start {\n    align-items: flex-start !important; }\n  .align-items-lg-end {\n    align-items: flex-end !important; }\n  .align-items-lg-center {\n    align-items: center !important; }\n  .align-items-lg-baseline {\n    align-items: baseline !important; }\n  .align-items-lg-stretch {\n    align-items: stretch !important; }\n  .align-content-lg-start {\n    align-content: flex-start !important; }\n  .align-content-lg-end {\n    align-content: flex-end !important; }\n  .align-content-lg-center {\n    align-content: center !important; }\n  .align-content-lg-between {\n    align-content: space-between !important; }\n  .align-content-lg-around {\n    align-content: space-around !important; }\n  .align-content-lg-stretch {\n    align-content: stretch !important; }\n  .align-self-lg-auto {\n    align-self: auto !important; }\n  .align-self-lg-start {\n    align-self: flex-start !important; }\n  .align-self-lg-end {\n    align-self: flex-end !important; }\n  .align-self-lg-center {\n    align-self: center !important; }\n  .align-self-lg-baseline {\n    align-self: baseline !important; }\n  .align-self-lg-stretch {\n    align-self: stretch !important; }\n  .order-lg-first {\n    order: -1 !important; }\n  .order-lg-0 {\n    order: 0 !important; }\n  .order-lg-1 {\n    order: 1 !important; }\n  .order-lg-2 {\n    order: 2 !important; }\n  .order-lg-3 {\n    order: 3 !important; }\n  .order-lg-4 {\n    order: 4 !important; }\n  .order-lg-5 {\n    order: 5 !important; }\n  .order-lg-last {\n    order: 6 !important; }\n  .m-lg-0 {\n    margin: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .me-lg-0 {\n    margin-right: 0 !important; }\n  .me-lg-1 {\n    margin-right: 0.25rem !important; }\n  .me-lg-2 {\n    margin-right: 0.5rem !important; }\n  .me-lg-3 {\n    margin-right: 1rem !important; }\n  .me-lg-4 {\n    margin-right: 1.5rem !important; }\n  .me-lg-5 {\n    margin-right: 3rem !important; }\n  .me-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ms-lg-0 {\n    margin-left: 0 !important; }\n  .ms-lg-1 {\n    margin-left: 0.25rem !important; }\n  .ms-lg-2 {\n    margin-left: 0.5rem !important; }\n  .ms-lg-3 {\n    margin-left: 1rem !important; }\n  .ms-lg-4 {\n    margin-left: 1.5rem !important; }\n  .ms-lg-5 {\n    margin-left: 3rem !important; }\n  .ms-lg-auto {\n    margin-left: auto !important; }\n  .p-lg-0 {\n    padding: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pe-lg-0 {\n    padding-right: 0 !important; }\n  .pe-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pe-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pe-lg-3 {\n    padding-right: 1rem !important; }\n  .pe-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pe-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .ps-lg-0 {\n    padding-left: 0 !important; }\n  .ps-lg-1 {\n    padding-left: 0.25rem !important; }\n  .ps-lg-2 {\n    padding-left: 0.5rem !important; }\n  .ps-lg-3 {\n    padding-left: 1rem !important; }\n  .ps-lg-4 {\n    padding-left: 1.5rem !important; }\n  .ps-lg-5 {\n    padding-left: 3rem !important; }\n  .text-lg-start {\n    text-align: left !important; }\n  .text-lg-end {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-start {\n    float: left !important; }\n  .float-xl-end {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-grid {\n    display: grid !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-row {\n    display: table-row !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: inline-flex !important; }\n  .d-xl-none {\n    display: none !important; }\n  .flex-xl-fill {\n    flex: 1 1 auto !important; }\n  .flex-xl-row {\n    flex-direction: row !important; }\n  .flex-xl-column {\n    flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xl-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-xl-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-xl-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-xl-shrink-1 {\n    flex-shrink: 1 !important; }\n  .flex-xl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .gap-xl-0 {\n    gap: 0 !important; }\n  .gap-xl-1 {\n    gap: 0.25rem !important; }\n  .gap-xl-2 {\n    gap: 0.5rem !important; }\n  .gap-xl-3 {\n    gap: 1rem !important; }\n  .gap-xl-4 {\n    gap: 1.5rem !important; }\n  .gap-xl-5 {\n    gap: 3rem !important; }\n  .justify-content-xl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    justify-content: center !important; }\n  .justify-content-xl-between {\n    justify-content: space-between !important; }\n  .justify-content-xl-around {\n    justify-content: space-around !important; }\n  .justify-content-xl-evenly {\n    justify-content: space-evenly !important; }\n  .align-items-xl-start {\n    align-items: flex-start !important; }\n  .align-items-xl-end {\n    align-items: flex-end !important; }\n  .align-items-xl-center {\n    align-items: center !important; }\n  .align-items-xl-baseline {\n    align-items: baseline !important; }\n  .align-items-xl-stretch {\n    align-items: stretch !important; }\n  .align-content-xl-start {\n    align-content: flex-start !important; }\n  .align-content-xl-end {\n    align-content: flex-end !important; }\n  .align-content-xl-center {\n    align-content: center !important; }\n  .align-content-xl-between {\n    align-content: space-between !important; }\n  .align-content-xl-around {\n    align-content: space-around !important; }\n  .align-content-xl-stretch {\n    align-content: stretch !important; }\n  .align-self-xl-auto {\n    align-self: auto !important; }\n  .align-self-xl-start {\n    align-self: flex-start !important; }\n  .align-self-xl-end {\n    align-self: flex-end !important; }\n  .align-self-xl-center {\n    align-self: center !important; }\n  .align-self-xl-baseline {\n    align-self: baseline !important; }\n  .align-self-xl-stretch {\n    align-self: stretch !important; }\n  .order-xl-first {\n    order: -1 !important; }\n  .order-xl-0 {\n    order: 0 !important; }\n  .order-xl-1 {\n    order: 1 !important; }\n  .order-xl-2 {\n    order: 2 !important; }\n  .order-xl-3 {\n    order: 3 !important; }\n  .order-xl-4 {\n    order: 4 !important; }\n  .order-xl-5 {\n    order: 5 !important; }\n  .order-xl-last {\n    order: 6 !important; }\n  .m-xl-0 {\n    margin: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .me-xl-0 {\n    margin-right: 0 !important; }\n  .me-xl-1 {\n    margin-right: 0.25rem !important; }\n  .me-xl-2 {\n    margin-right: 0.5rem !important; }\n  .me-xl-3 {\n    margin-right: 1rem !important; }\n  .me-xl-4 {\n    margin-right: 1.5rem !important; }\n  .me-xl-5 {\n    margin-right: 3rem !important; }\n  .me-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ms-xl-0 {\n    margin-left: 0 !important; }\n  .ms-xl-1 {\n    margin-left: 0.25rem !important; }\n  .ms-xl-2 {\n    margin-left: 0.5rem !important; }\n  .ms-xl-3 {\n    margin-left: 1rem !important; }\n  .ms-xl-4 {\n    margin-left: 1.5rem !important; }\n  .ms-xl-5 {\n    margin-left: 3rem !important; }\n  .ms-xl-auto {\n    margin-left: auto !important; }\n  .p-xl-0 {\n    padding: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pe-xl-0 {\n    padding-right: 0 !important; }\n  .pe-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pe-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pe-xl-3 {\n    padding-right: 1rem !important; }\n  .pe-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pe-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .ps-xl-0 {\n    padding-left: 0 !important; }\n  .ps-xl-1 {\n    padding-left: 0.25rem !important; }\n  .ps-xl-2 {\n    padding-left: 0.5rem !important; }\n  .ps-xl-3 {\n    padding-left: 1rem !important; }\n  .ps-xl-4 {\n    padding-left: 1.5rem !important; }\n  .ps-xl-5 {\n    padding-left: 3rem !important; }\n  .text-xl-start {\n    text-align: left !important; }\n  .text-xl-end {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n@media (min-width: 1400px) {\n  .float-xxl-start {\n    float: left !important; }\n  .float-xxl-end {\n    float: right !important; }\n  .float-xxl-none {\n    float: none !important; }\n  .d-xxl-inline {\n    display: inline !important; }\n  .d-xxl-inline-block {\n    display: inline-block !important; }\n  .d-xxl-block {\n    display: block !important; }\n  .d-xxl-grid {\n    display: grid !important; }\n  .d-xxl-table {\n    display: table !important; }\n  .d-xxl-table-row {\n    display: table-row !important; }\n  .d-xxl-table-cell {\n    display: table-cell !important; }\n  .d-xxl-flex {\n    display: flex !important; }\n  .d-xxl-inline-flex {\n    display: inline-flex !important; }\n  .d-xxl-none {\n    display: none !important; }\n  .flex-xxl-fill {\n    flex: 1 1 auto !important; }\n  .flex-xxl-row {\n    flex-direction: row !important; }\n  .flex-xxl-column {\n    flex-direction: column !important; }\n  .flex-xxl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xxl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xxl-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-xxl-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-xxl-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-xxl-shrink-1 {\n    flex-shrink: 1 !important; }\n  .flex-xxl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xxl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xxl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .gap-xxl-0 {\n    gap: 0 !important; }\n  .gap-xxl-1 {\n    gap: 0.25rem !important; }\n  .gap-xxl-2 {\n    gap: 0.5rem !important; }\n  .gap-xxl-3 {\n    gap: 1rem !important; }\n  .gap-xxl-4 {\n    gap: 1.5rem !important; }\n  .gap-xxl-5 {\n    gap: 3rem !important; }\n  .justify-content-xxl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xxl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xxl-center {\n    justify-content: center !important; }\n  .justify-content-xxl-between {\n    justify-content: space-between !important; }\n  .justify-content-xxl-around {\n    justify-content: space-around !important; }\n  .justify-content-xxl-evenly {\n    justify-content: space-evenly !important; }\n  .align-items-xxl-start {\n    align-items: flex-start !important; }\n  .align-items-xxl-end {\n    align-items: flex-end !important; }\n  .align-items-xxl-center {\n    align-items: center !important; }\n  .align-items-xxl-baseline {\n    align-items: baseline !important; }\n  .align-items-xxl-stretch {\n    align-items: stretch !important; }\n  .align-content-xxl-start {\n    align-content: flex-start !important; }\n  .align-content-xxl-end {\n    align-content: flex-end !important; }\n  .align-content-xxl-center {\n    align-content: center !important; }\n  .align-content-xxl-between {\n    align-content: space-between !important; }\n  .align-content-xxl-around {\n    align-content: space-around !important; }\n  .align-content-xxl-stretch {\n    align-content: stretch !important; }\n  .align-self-xxl-auto {\n    align-self: auto !important; }\n  .align-self-xxl-start {\n    align-self: flex-start !important; }\n  .align-self-xxl-end {\n    align-self: flex-end !important; }\n  .align-self-xxl-center {\n    align-self: center !important; }\n  .align-self-xxl-baseline {\n    align-self: baseline !important; }\n  .align-self-xxl-stretch {\n    align-self: stretch !important; }\n  .order-xxl-first {\n    order: -1 !important; }\n  .order-xxl-0 {\n    order: 0 !important; }\n  .order-xxl-1 {\n    order: 1 !important; }\n  .order-xxl-2 {\n    order: 2 !important; }\n  .order-xxl-3 {\n    order: 3 !important; }\n  .order-xxl-4 {\n    order: 4 !important; }\n  .order-xxl-5 {\n    order: 5 !important; }\n  .order-xxl-last {\n    order: 6 !important; }\n  .m-xxl-0 {\n    margin: 0 !important; }\n  .m-xxl-1 {\n    margin: 0.25rem !important; }\n  .m-xxl-2 {\n    margin: 0.5rem !important; }\n  .m-xxl-3 {\n    margin: 1rem !important; }\n  .m-xxl-4 {\n    margin: 1.5rem !important; }\n  .m-xxl-5 {\n    margin: 3rem !important; }\n  .m-xxl-auto {\n    margin: auto !important; }\n  .mx-xxl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .mx-xxl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .mx-xxl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .mx-xxl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .mx-xxl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .mx-xxl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .mx-xxl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xxl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .my-xxl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .my-xxl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .my-xxl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .my-xxl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .my-xxl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .my-xxl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; }\n  .mt-xxl-0 {\n    margin-top: 0 !important; }\n  .mt-xxl-1 {\n    margin-top: 0.25rem !important; }\n  .mt-xxl-2 {\n    margin-top: 0.5rem !important; }\n  .mt-xxl-3 {\n    margin-top: 1rem !important; }\n  .mt-xxl-4 {\n    margin-top: 1.5rem !important; }\n  .mt-xxl-5 {\n    margin-top: 3rem !important; }\n  .mt-xxl-auto {\n    margin-top: auto !important; }\n  .me-xxl-0 {\n    margin-right: 0 !important; }\n  .me-xxl-1 {\n    margin-right: 0.25rem !important; }\n  .me-xxl-2 {\n    margin-right: 0.5rem !important; }\n  .me-xxl-3 {\n    margin-right: 1rem !important; }\n  .me-xxl-4 {\n    margin-right: 1.5rem !important; }\n  .me-xxl-5 {\n    margin-right: 3rem !important; }\n  .me-xxl-auto {\n    margin-right: auto !important; }\n  .mb-xxl-0 {\n    margin-bottom: 0 !important; }\n  .mb-xxl-1 {\n    margin-bottom: 0.25rem !important; }\n  .mb-xxl-2 {\n    margin-bottom: 0.5rem !important; }\n  .mb-xxl-3 {\n    margin-bottom: 1rem !important; }\n  .mb-xxl-4 {\n    margin-bottom: 1.5rem !important; }\n  .mb-xxl-5 {\n    margin-bottom: 3rem !important; }\n  .mb-xxl-auto {\n    margin-bottom: auto !important; }\n  .ms-xxl-0 {\n    margin-left: 0 !important; }\n  .ms-xxl-1 {\n    margin-left: 0.25rem !important; }\n  .ms-xxl-2 {\n    margin-left: 0.5rem !important; }\n  .ms-xxl-3 {\n    margin-left: 1rem !important; }\n  .ms-xxl-4 {\n    margin-left: 1.5rem !important; }\n  .ms-xxl-5 {\n    margin-left: 3rem !important; }\n  .ms-xxl-auto {\n    margin-left: auto !important; }\n  .p-xxl-0 {\n    padding: 0 !important; }\n  .p-xxl-1 {\n    padding: 0.25rem !important; }\n  .p-xxl-2 {\n    padding: 0.5rem !important; }\n  .p-xxl-3 {\n    padding: 1rem !important; }\n  .p-xxl-4 {\n    padding: 1.5rem !important; }\n  .p-xxl-5 {\n    padding: 3rem !important; }\n  .px-xxl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .px-xxl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .px-xxl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .px-xxl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .px-xxl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .px-xxl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xxl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .py-xxl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .py-xxl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .py-xxl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .py-xxl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .py-xxl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .pt-xxl-0 {\n    padding-top: 0 !important; }\n  .pt-xxl-1 {\n    padding-top: 0.25rem !important; }\n  .pt-xxl-2 {\n    padding-top: 0.5rem !important; }\n  .pt-xxl-3 {\n    padding-top: 1rem !important; }\n  .pt-xxl-4 {\n    padding-top: 1.5rem !important; }\n  .pt-xxl-5 {\n    padding-top: 3rem !important; }\n  .pe-xxl-0 {\n    padding-right: 0 !important; }\n  .pe-xxl-1 {\n    padding-right: 0.25rem !important; }\n  .pe-xxl-2 {\n    padding-right: 0.5rem !important; }\n  .pe-xxl-3 {\n    padding-right: 1rem !important; }\n  .pe-xxl-4 {\n    padding-right: 1.5rem !important; }\n  .pe-xxl-5 {\n    padding-right: 3rem !important; }\n  .pb-xxl-0 {\n    padding-bottom: 0 !important; }\n  .pb-xxl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pb-xxl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pb-xxl-3 {\n    padding-bottom: 1rem !important; }\n  .pb-xxl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pb-xxl-5 {\n    padding-bottom: 3rem !important; }\n  .ps-xxl-0 {\n    padding-left: 0 !important; }\n  .ps-xxl-1 {\n    padding-left: 0.25rem !important; }\n  .ps-xxl-2 {\n    padding-left: 0.5rem !important; }\n  .ps-xxl-3 {\n    padding-left: 1rem !important; }\n  .ps-xxl-4 {\n    padding-left: 1.5rem !important; }\n  .ps-xxl-5 {\n    padding-left: 3rem !important; }\n  .text-xxl-start {\n    text-align: left !important; }\n  .text-xxl-end {\n    text-align: right !important; }\n  .text-xxl-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .fs-1 {\n    font-size: 2.5rem !important; }\n  .fs-2 {\n    font-size: 2rem !important; }\n  .fs-3 {\n    font-size: 1.75rem !important; }\n  .fs-4 {\n    font-size: 1.5rem !important; } }\n\n@media print {\n  .d-print-inline {\n    display: inline !important; }\n  .d-print-inline-block {\n    display: inline-block !important; }\n  .d-print-block {\n    display: block !important; }\n  .d-print-grid {\n    display: grid !important; }\n  .d-print-table {\n    display: table !important; }\n  .d-print-table-row {\n    display: table-row !important; }\n  .d-print-table-cell {\n    display: table-cell !important; }\n  .d-print-flex {\n    display: flex !important; }\n  .d-print-inline-flex {\n    display: inline-flex !important; }\n  .d-print-none {\n    display: none !important; } }\n\nbody {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: repeat;\n  background-size: cover; }\n  body #searchCity {\n    height: 80%; }\n  body #mapid {\n    height: 40vh;\n    width: 80vw; }\n", "",{"version":3,"sources":["webpack://./node_modules/bootstrap/scss/bootstrap.scss","webpack://./src/style.scss","webpack://./node_modules/bootstrap/scss/_root.scss","webpack://./node_modules/bootstrap/scss/_reboot.scss","webpack://./node_modules/bootstrap/scss/_variables.scss","webpack://./node_modules/bootstrap/scss/vendor/_rfs.scss","webpack://./node_modules/bootstrap/scss/_functions.scss","webpack://./node_modules/bootstrap/scss/mixins/_border-radius.scss","webpack://./node_modules/bootstrap/scss/_type.scss","webpack://./node_modules/bootstrap/scss/mixins/_lists.scss","webpack://./node_modules/bootstrap/scss/_images.scss","webpack://./node_modules/bootstrap/scss/mixins/_image.scss","webpack://./node_modules/bootstrap/scss/_containers.scss","webpack://./node_modules/bootstrap/scss/mixins/_container.scss","webpack://./node_modules/bootstrap/scss/mixins/_breakpoints.scss","webpack://./node_modules/bootstrap/scss/_grid.scss","webpack://./node_modules/bootstrap/scss/mixins/_grid.scss","webpack://./node_modules/bootstrap/scss/_tables.scss","webpack://./node_modules/bootstrap/scss/mixins/_table-variants.scss","webpack://./node_modules/bootstrap/scss/forms/_labels.scss","webpack://./node_modules/bootstrap/scss/forms/_form-text.scss","webpack://./node_modules/bootstrap/scss/forms/_form-control.scss","webpack://./node_modules/bootstrap/scss/mixins/_transition.scss","webpack://./node_modules/bootstrap/scss/mixins/_gradients.scss","webpack://./node_modules/bootstrap/scss/forms/_form-select.scss","webpack://./node_modules/bootstrap/scss/forms/_form-check.scss","webpack://./node_modules/bootstrap/scss/forms/_form-range.scss","webpack://./node_modules/bootstrap/scss/forms/_floating-labels.scss","webpack://./node_modules/bootstrap/scss/forms/_input-group.scss","webpack://./node_modules/bootstrap/scss/mixins/_forms.scss","webpack://./node_modules/bootstrap/scss/_buttons.scss","webpack://./node_modules/bootstrap/scss/mixins/_buttons.scss","webpack://./node_modules/bootstrap/scss/_transitions.scss","webpack://./node_modules/bootstrap/scss/_dropdown.scss","webpack://./node_modules/bootstrap/scss/mixins/_caret.scss","webpack://./node_modules/bootstrap/scss/_button-group.scss","webpack://./node_modules/bootstrap/scss/_nav.scss","webpack://./node_modules/bootstrap/scss/_navbar.scss","webpack://./node_modules/bootstrap/scss/_card.scss","webpack://./node_modules/bootstrap/scss/_accordion.scss","webpack://./node_modules/bootstrap/scss/_breadcrumb.scss","webpack://./node_modules/bootstrap/scss/_pagination.scss","webpack://./node_modules/bootstrap/scss/mixins/_pagination.scss","webpack://./node_modules/bootstrap/scss/_badge.scss","webpack://./node_modules/bootstrap/scss/_alert.scss","webpack://./node_modules/bootstrap/scss/mixins/_alert.scss","webpack://./node_modules/bootstrap/scss/_progress.scss","webpack://./node_modules/bootstrap/scss/_list-group.scss","webpack://./node_modules/bootstrap/scss/mixins/_list-group.scss","webpack://./node_modules/bootstrap/scss/_close.scss","webpack://./node_modules/bootstrap/scss/_toasts.scss","webpack://./node_modules/bootstrap/scss/_modal.scss","webpack://./node_modules/bootstrap/scss/_tooltip.scss","webpack://./node_modules/bootstrap/scss/mixins/_reset-text.scss","webpack://./node_modules/bootstrap/scss/_popover.scss","webpack://./node_modules/bootstrap/scss/_carousel.scss","webpack://./node_modules/bootstrap/scss/mixins/_clearfix.scss","webpack://./node_modules/bootstrap/scss/_spinners.scss","webpack://./node_modules/bootstrap/scss/_offcanvas.scss","webpack://./node_modules/bootstrap/scss/helpers/_colored-links.scss","webpack://./node_modules/bootstrap/scss/helpers/_ratio.scss","webpack://./node_modules/bootstrap/scss/helpers/_position.scss","webpack://./node_modules/bootstrap/scss/helpers/_visually-hidden.scss","webpack://./node_modules/bootstrap/scss/mixins/_visually-hidden.scss","webpack://./node_modules/bootstrap/scss/helpers/_stretched-link.scss","webpack://./node_modules/bootstrap/scss/helpers/_text-truncation.scss","webpack://./node_modules/bootstrap/scss/mixins/_text-truncate.scss","webpack://./node_modules/bootstrap/scss/mixins/_utilities.scss","webpack://./node_modules/bootstrap/scss/utilities/_api.scss"],"names":[],"mappings":"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A;;Ae9ZjC;EACE,+Bb6J8D;Ea5J9D,kCb4J8D;EDoE1D,kBAvE+B,EAAA;;AcrJrC;EACE,gCbuJ8D;EatJ9D,mCbsJ8D;EDoE1D,mBAvE+B,EAAA;;AehLrC;EACE,mBhBipB4C;EC3ZxC,kBAvE+B;Ee3KnC,chBKgB,EAAA;;AiBVlB;EACE,cAAc;EACd,WAAW;EACX,yBjBkkBkC;EC9U9B,eAvE+B;EgB1KnC,gBjBua+B;EiBta/B,gBjB4a+B;EiB3a/B,cjBKgB;EiBJhB,sBjBLa;EiBMb,4BAA4B;EAC5B,yBjBHgB;EiBIhB,gBAAgB;EdGd,sBHkWgC;EkBrW9B,wElBqsB4F,EAAA;EkBjsB5F;IDhBN;MCiBQ,gBAAgB,EAAA,ED2FvB;EA5GD;IAqBI,gBAAgB,EAAA;IArBpB;MAwBM,eAAe,EAAA;EAxBrB;IA8BI,cjBjBc;IiBkBd,sBjB3BW;IiB4BX,qBfuHiC;IetHjC,UAAU;IAKR,kDjBJW,EAAA;EiBlCjB;IA+CI,aAAmE,EAAA;EA/CvE;IAoDI,cjB1Cc;IiB4Cd,UAAU,EAAA;EAtDd;IAgEI,yBjB1Dc;IiB6Dd,UAAU,EAAA;EAnEd;IAwEI,yBjB6fgC;IiB5fhC,0BjB4fgC;IiB3fhC,0BjB2fgC;IiB1fhC,cjB9Dc;ImBbhB,yBnBMgB;IiBuEd,oBAAoB;IACpB,qBAAqB;IACrB,mBAAmB;IACnB,eAAe;IACf,4BjBmR6B;IiBlR7B,gBAAgB;ICtEd,qIlBsnB6I,EAAA;IkBlnB7I;MDhBN;QCiBQ,gBAAgB,EAAA,EDmErB;EApFH;IAuFI,yBfqEiC,EAAA;Ee5JrC;IA2FI,yBjB0egC;IiBzehC,0BjByegC;IiBxehC,0BjBwegC;IiBvehC,cjBjFc;ImBbhB,yBnBMgB;IiB0Fd,oBAAoB;IACpB,qBAAqB;IACrB,mBAAmB;IACnB,eAAe;IACf,4BjBgQ6B;IiB/P7B,gBAAgB;ICzFd,qIlBsnB6I,EAAA;IkBlnB7I;MDhBN;QCiBQ,gBAAgB,EAAA,EDsFrB;EAvGH;IA0GI,yBfkDiC,EAAA;;AezCrC;EACE,cAAc;EACd,WAAW;EACX,mBAA2B;EAC3B,gBAAgB;EAChB,gBjB2T+B;EiB1T/B,cjB5GgB;EiB6GhB,6BAA6B;EAC7B,yBAAyB;EACzB,mBAAmC,EAAA;EATrC;IAaI,gBAAgB;IAChB,eAAe,EAAA;;AAWnB;EACE,sCfsC8D;EerC9D,uBjBmciC;EC1V7B,mBAvE+B;EEjKjC,qBHmW+B,EAAA;EiBtOnC;IAOI,uBjB8b+B;IiB7b/B,wBjB6b+B;IiB5b/B,yBjB4b+B,EAAA;EiBrcnC;IAaI,uBjBwb+B;IiBvb/B,wBjBub+B;IiBtb/B,yBjBsb+B,EAAA;;AiBlbnC;EACE,oCfmB8D;EelB9D,oBjBobgC;EC9V5B,kBAvE+B;EEjKjC,qBHoW+B,EAAA;EiBpNnC;IAOI,oBjB+a8B;IiB9a9B,qBjB8a8B;IiB7a9B,uBjB6a8B,EAAA;EiBtblC;IAaI,oBjBya8B;IiBxa9B,qBjBwa8B;IiBva9B,uBjBua8B,EAAA;;AiBhalC;EAEI,uCfJ4D,EAAA;;AeEhE;EAMI,sCfR4D,EAAA;;AeEhE;EAUI,oCfZ4D,EAAA;;AeiBhE;EACE,eAAe;EACf,YAAY;EACZ,iBjB6XmC,EAAA;EiBhYrC;IAMI,eAAe,EAAA;EANnB;IAUI,aAAmE;Id/LnE,sBHkWgC,EAAA;EiB7KpC;IAeI,aAAmE;IdpMnE,sBHkWgC,EAAA;;AoBhXpC;EACE,cAAc;EACd,WAAW;EACX,0CpBikBkC;EC9U9B,eAvE+B;EmBzKnC,gBpBsa+B;EoBra/B,gBpB2a+B;EoB1a/B,cpBIgB;EoBHhB,sBpBNa;EoBOb,iPlBqEgF;EkBpEhF,4BAA4B;EAC5B,yCpBixBqE;EoBhxBrE,0BpBixB2C;EoBhxB3C,yBpBPgB;EGOd,sBHkWgC;EoB/VlC,gBAAgB,EAAA;EAjBlB;IAoBI,qBlBkIiC;IkBjIjC,UAAU;IAKR,kDpBOW,EAAA;EoBjCjB;IAgCI,sBpBoiBgC;IoBniBhC,sBAAsB,EAAA;EAjC1B;IAsCI,yBpBjCc,EAAA;EoBLlB;IA4CI,kBAAkB;IAClB,0BpBjCc,EAAA;;AoBqClB;EACE,oBpB6hBkC;EoB5hBlC,uBpB4hBkC;EoB3hBlC,oBpB4hBiC;EC1V7B,mBAvE+B,EAAA;;AmBvHrC;EACE,mBpB0hBiC;EoBzhBjC,sBpByhBiC;EoBxhBjC,kBpByhBgC;EC9V5B,kBAvE+B,EAAA;;AoBhLrC;EACE,cAAc;EACd,kBrBotB2E;EqBntB3E,mBrBotBsE;EqBntBtE,uBrBotB+C,EAAA;EqBxtBjD;IAOI,WAAW;IACX,mBAA2C,EAAA;;AAI/C;EACE,UrBwsB2C;EqBvsB3C,WrBusB2C;EqBtsB3C,kBAA6D;EAC7D,mBAAmB;EACnB,sBrBba;EqBcb,4BAA4B;EAC5B,2BAA2B;EAC3B,wBAAwB;EACxB,qCrBPa;EqBQb,gBAAgB;EAChB,mBAAmB,EAAA;EAXrB;IlBGI,qBHktB2C,EAAA;EqBrtB/C;IAoBI,kBrBksByC,EAAA;EqBttB7C;IAwBI,uBrByrBqD,EAAA;EqBjtBzD;IA4BI,qBnB+GiC;ImB9GjC,UAAU;IACV,kDrBRa,EAAA;EqBtBjB;IAkCI,yBrBZa;IqBab,qBrBba,EAAA;IqBtBjB;MAyCQ,+OnB2B0E,EAAA;ImBpElF;MAiDQ,uJnBmB0E,EAAA;EmBpElF;IAuDI,yBrBjCa;IqBkCb,qBrBlCa;IqBuCX,yOnBO4E,EAAA;EmBpElF;IAkEI,oBAAoB;IACpB,YAAY;IACZ,YrBiqByC,EAAA;EqBruB7C;IA4EM,YrBypBuC,EAAA;;AqB3oB7C;EACE,mBrBopByD,EAAA;EqBrpB3D;IAII,UrBgpBiC;IqB/oBjC,mBAA4C;IAC5C,wKnB5B8E;ImB6B9E,gCAAgC;IlB9FhC,kBH2uBiC;IkB9uB/B,iDlBkvBgE,EAAA;IkB9uBhE;MGsFN;QHrFQ,gBAAgB,EAAA,EG6GrB;IAxBH;MAYM,0JnBlC4E,EAAA;ImBsBlF;MAgBM,iCrB+oBwC;MqB1oBtC,uJnB3C0E,EAAA;;AmBiDlF;EACE,qBAAqB;EACrB,kBrBknBoC,EAAA;;AqB/mBtC;EACE,kBAAkB;EAClB,sBAAsB;EACtB,oBAAoB,EAAA;EAHtB;IAQM,oBAAoB;IACpB,YAAY;IACZ,arBse2B,EAAA;;AsBpnBjC;EACE,WAAW;EACX,cpB4K2B;EoB3K3B,UAAU;EACV,6BAA6B;EAC7B,gBAAgB,EAAA;EALlB;IAQI,UAAU,EAAA;IARd;MAY8B,kEtBoBb,EAAA;IsBhCjB;MAa8B,kEtBmBb,EAAA;EsBhCjB;IAiBI,SAAS,EAAA;EAjBb;IAqBI,WtB0yB2C;IsBzyB3C,YtByyB2C;IsBxyB3C,oBAAqE;IHzBvE,yBnBkCe;IsBPb,StByyBwC;IGrzBxC,mBHszB2C;IkBzzBzC,4GlB+zBkI;IsB5yBpI,gBAAgB,EAAA;IJfd;MIdN;QJeQ,gBAAgB,EAAA,EImBrB;IAlCH;MHFE,yBjBuJmC,EAAA;EoBrJrC;IAqCI,WtBmxBkC;IsBlxBlC,ctBmxBmC;IsBlxBnC,kBAAkB;IAClB,etBkxBqC;IsBjxBrC,yBtBpCc;IsBqCd,yBAAyB;InB7BzB,mBH+yBkC,EAAA;EsB5zBtC;IAgDI,WtB+wB2C;IsB9wB3C,YtB8wB2C;ImBj0B7C,yBnBkCe;IsBmBb,StB+wBwC;IGrzBxC,mBHszB2C;IkBzzBzC,4GlB+zBkI;IsBlxBpI,gBAAgB,EAAA;IJzCd;MIdN;QJeQ,gBAAgB,EAAA,EI6CrB;IA5DH;MHFE,yBjBuJmC,EAAA;EoBrJrC;IA+DI,WtByvBkC;IsBxvBlC,ctByvBmC;IsBxvBnC,kBAAkB;IAClB,etBwvBqC;IsBvvBrC,yBtB9Dc;IsB+Dd,yBAAyB;InBvDzB,mBH+yBkC,EAAA;EsB5zBtC;IA0EI,oBAAoB,EAAA;IA1ExB;MA6EM,yBtBtEY,EAAA;IsBPlB;MAiFM,yBtB1EY,EAAA;;AuBblB;EACE,kBAAkB,EAAA;EADpB;;IAKI,0BrBkL4D;IqBjL5D,qBvBmkBgC,EAAA;EuBzkBpC;IAUI,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,YAAY;IACZ,qBvB2jBgC;IuB1jBhC,oBAAoB;IACpB,6BAA6C;IAC7C,qBAAqB;ILDnB,gElBg1B8E,EAAA;IkB50B9E;MKpBN;QLqBQ,gBAAgB,EAAA,EKFrB;EAnBH;IAwBM,kBAAkB,EAAA;EAxBxB;IA6BM,qBvB+zBoC;IuB9zBpC,wBvB+zBmC,EAAA;EuB71BzC;IAkCM,qBvB0zBoC;IuBzzBpC,wBvB0zBmC,EAAA;EuB71BzC;IAwCI,qBvBozBsC;IuBnzBtC,wBvBozBqC,EAAA;EuB71BzC;;;IAgDM,avB8yB+B;IuB7yB/B,8DvB8yB4E,EAAA;EuB/1BlF;IAuDM,avBuyB+B;IuBtyB/B,8DvBuyB4E,EAAA;;AwB31BlF;EACE,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,oBAAoB;EACpB,WAAW,EAAA;EALb;;IASI,kBAAkB;IAClB,cAAc;IACd,SAAS;IACT,YAAY,EAAA;EAZhB;;IAkBI,UAAU,EAAA;EAlBd;IAyBI,kBAAkB;IAClB,UAAU,EAAA;IA1Bd;MA6BM,UAAU,EAAA;;AAWhB;EACE,aAAa;EACb,mBAAmB;EACnB,yBxB0hBkC;EC9U9B,eAvE+B;EuBnInC,gBxBgY+B;EwB/X/B,gBxBqY+B;EwBpY/B,cxBlCgB;EwBmChB,kBAAkB;EAClB,mBAAmB;EACnB,yBxB5CgB;EwB6ChB,yBxB3CgB;EGOd,sBHkWgC,EAAA;;AwBpTpC;;;;EAIE,oBxBohBgC;EC9V5B,kBAvE+B;EEjKjC,qBHoW+B,EAAA;;AwB7SnC;;;;EAIE,uBxBugBiC;EC1V7B,mBAvE+B;EEjKjC,qBHmW+B,EAAA;;AwBnSnC;;EAEE,mBAAsE,EAAA;;AAWxE;;ErB7DI,0BqBiE8B;ErBhE9B,6BqBgE8B,EAAA;;AAJlC;;ErB7DI,0BqBwE8B;ErBvE9B,6BqBuE8B,EAAA;;AAXlC;EAqBI,iBxBmP6B;EGvT7B,yBqBqE8B;ErBpE9B,4BqBoE8B,EAAA;;AAF4B;EC1F1D,aAAa;EACb,WAAW;EACX,mBzB0nB0C;EC3ZxC,kBAvE+B;EwBrJjC,czBca,EAAA;;AwBuEyB;ECjFtC,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,aAAa;EACb,eAAe;EACf,uBzB+kC2C;EyB9kC3C,iBAAiB;ExBkNf,mBAvE+B;EwBxIjC,WzBpCW;EyBqCX,wCzBAa;EG1Bb,sBHkWgC,EAAA;;AyB/WhC;;;;EA8CE,cAAc,EAAA;;AA9ChB;EAoDE,qBzBbW;EyBgBT,oCvB0HwD;EuBzHxD,4PvBsB0E;EuBrB1E,4BAA4B;EAC5B,2DAA6D;EAC7D,gEvBsHwD,EAAA;EuBjL5D;IA+DI,qBzBxBS;IyByBT,iDzBzBS,EAAA;;AyBvCb;EAyEI,oCvBwGwD;EuBvGxD,kFvBuGwD,EAAA;;AuBjL5D;EAiFE,qBzB1CW,EAAA;EyBvCb;IAsFM,uBzB2sB2F;IyB1sB3F,6dvBTwE;IuBUxE,+DzB4rBoD;IyB3rBpD,2EvBwFsD,EAAA;EuBjL5D;IA8FI,qBzBvDS;IyBwDT,iDzBxDS,EAAA;;AyBvCb;EAsGE,qBzB/DW,EAAA;EyBvCb;IAyGI,yBzBlES,EAAA;EyBvCb;IA6GI,iDzBtES,EAAA;EyBvCb;IAiHI,czB1ES,EAAA;;AyB8Ef;EAEI,iBAAiB,EAAA;;AAvHnB;;;EA+HI,UAAU,EAAA;EA/Hd;;;IAoII,UAAU,EAAA;;ADtBuF;EC1FrG,aAAa;EACb,WAAW;EACX,mBzB0nB0C;EC3ZxC,kBAvE+B;EwBrJjC,czBWa,EAAA;;AwB0EkE;ECjF/E,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,aAAa;EACb,eAAe;EACf,uBzB+kC2C;EyB9kC3C,iBAAiB;ExBkNf,mBAvE+B;EwBxIjC,WzBpCW;EyBqCX,wCzBHa;EGvBb,sBHkWgC,EAAA;;AyB/WhC;;;;EA8CE,cAAc,EAAA;;AA9ChB;EAoDE,qBzBhBW;EyBmBT,oCvB0HwD;EuBzHxD,4UvBsB0E;EuBrB1E,4BAA4B;EAC5B,2DAA6D;EAC7D,gEvBsHwD,EAAA;EuBjL5D;IA+DI,qBzB3BS;IyB4BT,iDzB5BS,EAAA;;AyBpCb;EAyEI,oCvBwGwD;EuBvGxD,kFvBuGwD,EAAA;;AuBjL5D;EAiFE,qBzB7CW,EAAA;EyBpCb;IAsFM,uBzB2sB2F;IyB1sB3F,6iBvBTwE;IuBUxE,+DzB4rBoD;IyB3rBpD,2EvBwFsD,EAAA;EuBjL5D;IA8FI,qBzB1DS;IyB2DT,iDzB3DS,EAAA;;AyBpCb;EAsGE,qBzBlEW,EAAA;EyBpCb;IAyGI,yBzBrES,EAAA;EyBpCb;IA6GI,iDzBzES,EAAA;EyBpCb;IAiHI,czB7ES,EAAA;;AyBiFf;EAEI,iBAAiB,EAAA;;AAvHnB;;;EAiII,UAAU,EAAA;EAjId;;;IAoII,UAAU,EAAA;;ACtIlB;EACE,qBAAqB;EAErB,gB1B0a+B;E0Bza/B,gB1B+a+B;E0B9a/B,c1BQgB;E0BPhB,kBAAkB;EAClB,qBAAwD;EAExD,sBAAsB;EACtB,eAA2C;EAC3C,iBAAiB;EACjB,6BAA6B;EAC7B,6BAA2C;EC8G3C,yB3B0ckC;EC9U9B,eAvE+B;EEjKjC,sBHkWgC;EkBrW9B,qIlBsnB6I,EAAA;EkBlnB7I;IQhBN;MRiBQ,gBAAgB,EAAA,EQ6BvB;EA9CD;IAkBI,c1BLc,EAAA;E0BShB;IAEE,UAAU;IACV,kD1BSa,EAAA;E0BlCjB;;IA0CI,oBAAoB;IACpB,a1B2kB6B,EAAA;;A0B/jB/B;ECvCA,W3BZa;EmBJb,yBnBkCe;E2BhBf,qB3BgBe,EAAA;E2Bbf;IACE,W3BlBW;ImBJb,yBjB4JmC;IyBpIjC,qBzBoIiC,EAAA;EyBjInC;IAEE,W3BzBW;ImBJb,yBjB4JmC;IyB7HjC,qBzB6HiC;IyBxH/B,iDAAiE,EAAA;EAIrE;;;IAKE,W3BzCW;I2B0CX,yBzB8GiC;IyB3GjC,qBzB2GiC,EAAA;IyBpHnC;;;MAgBM,iDAAiE,EAAA;EAKvE;IAEE,W3B3DW;I2B4DX,yB3B9Ba;I2BiCb,qB3BjCa,EAAA;;A0BqBf;ECvCA,W3BZa;EmBJb,yBnBUgB;E2BQhB,qB3BRgB,EAAA;E2BWhB;IACE,W3BlBW;ImBJb,yBjB4JmC;IyBpIjC,qBzBoIiC,EAAA;EyBjInC;IAEE,W3BzBW;ImBJb,yBjB4JmC;IyB7HjC,qBzB6HiC;IyBxH/B,kDAAiE,EAAA;EAIrE;;;IAKE,W3BzCW;I2B0CX,yBzB8GiC;IyB3GjC,qBzB2GiC,EAAA;IyBpHnC;;;MAgBM,kDAAiE,EAAA;EAKvE;IAEE,W3B3DW;I2B4DX,yB3BtDc;I2ByDd,qB3BzDc,EAAA;;A0B6ChB;ECvCA,W3BZa;EmBJb,yBnByCe;E2BvBf,qB3BuBe,EAAA;E2BpBf;IACE,W3BlBW;ImBJb,yBjB4JmC;IyBpIjC,qBzBoIiC,EAAA;EyBjInC;IAEE,W3BzBW;ImBJb,yBjB4JmC;IyB7HjC,qBzB6HiC;IyBxH/B,iDAAiE,EAAA;EAIrE;;;IAKE,W3BzCW;I2B0CX,yBzB8GiC;IyB3GjC,qBzB2GiC,EAAA;IyBpHnC;;;MAgBM,iDAAiE,EAAA;EAKvE;IAEE,W3B3DW;I2B4DX,yB3BvBa;I2B0Bb,qB3B1Ba,EAAA;;A0Bcf;ECvCA,W3BFa;EmBdb,yBnB2Ce;E2BzBf,qB3ByBe,EAAA;E2BtBf;IACE,W3BRW;ImBdb,yBjBuJmC;IyB/HjC,qBzB+HiC,EAAA;EyB5HnC;IAEE,W3BfW;ImBdb,yBjBuJmC;IyBxHjC,qBzBwHiC;IyBnH/B,iDAAiE,EAAA;EAIrE;;;IAKE,W3B/BW;I2BgCX,yBzByGiC;IyBtGjC,qBzBsGiC,EAAA;IyB/GnC;;;MAgBM,iDAAiE,EAAA;EAKvE;IAEE,W3BjDW;I2BkDX,yB3BrBa;I2BwBb,qB3BxBa,EAAA;;A0BYf;ECvCA,W3BFa;EmBdb,yBnBwCe;E2BtBf,qB3BsBe,EAAA;E2BnBf;IACE,W3BRW;ImBdb,yBjBuJmC;IyB/HjC,qBzB+HiC,EAAA;EyB5HnC;IAEE,W3BfW;ImBdb,yBjBuJmC;IyBxHjC,qBzBwHiC;IyBnH/B,gDAAiE,EAAA;EAIrE;;;IAKE,W3B/BW;I2BgCX,yBzByGiC;IyBtGjC,qBzBsGiC,EAAA;IyB/GnC;;;MAgBM,gDAAiE,EAAA;EAKvE;IAEE,W3BjDW;I2BkDX,yB3BxBa;I2B2Bb,qB3B3Ba,EAAA;;A0Bef;ECvCA,W3BZa;EmBJb,yBnBsCe;E2BpBf,qB3BoBe,EAAA;E2BjBf;IACE,W3BlBW;ImBJb,yBjB4JmC;IyBpIjC,qBzBoIiC,EAAA;EyBjInC;IAEE,W3BzBW;ImBJb,yBjB4JmC;IyB7HjC,qBzB6HiC;IyBxH/B,gDAAiE,EAAA;EAIrE;;;IAKE,W3BzCW;I2B0CX,yBzB8GiC;IyB3GjC,qBzB2GiC,EAAA;IyBpHnC;;;MAgBM,gDAAiE,EAAA;EAKvE;IAEE,W3B3DW;I2B4DX,yB3B1Ba;I2B6Bb,qB3B7Ba,EAAA;;A0BiBf;ECvCA,W3BFa;EmBdb,yBnBKgB;E2BahB,qB3BbgB,EAAA;E2BgBhB;IACE,W3BRW;ImBdb,yBjBuJmC;IyB/HjC,qBzB+HiC,EAAA;EyB5HnC;IAEE,W3BfW;ImBdb,yBjBuJmC;IyBxHjC,qBzBwHiC;IyBnH/B,kDAAiE,EAAA;EAIrE;;;IAKE,W3B/BW;I2BgCX,yBzByGiC;IyBtGjC,qBzBsGiC,EAAA;IyB/GnC;;;MAgBM,kDAAiE,EAAA;EAKvE;IAEE,W3BjDW;I2BkDX,yB3B3Dc;I2B8Dd,qB3B9Dc,EAAA;;A0BkDhB;ECvCA,W3BZa;EmBJb,yBnBagB;E2BKhB,qB3BLgB,EAAA;E2BQhB;IACE,W3BlBW;ImBJb,yBjB4JmC;IyBpIjC,qBzBoIiC,EAAA;EyBjInC;IAEE,W3BzBW;ImBJb,yBjB4JmC;IyB7HjC,qBzB6HiC;IyBxH/B,+CAAiE,EAAA;EAIrE;;;IAKE,W3BzCW;I2B0CX,yBzB8GiC;IyB3GjC,qBzB2GiC,EAAA;IyBpHnC;;;MAgBM,+CAAiE,EAAA;EAKvE;IAEE,W3B3DW;I2B4DX,yB3BnDc;I2BsDd,qB3BtDc,EAAA;;A0BgDhB;ECmBA,c3B9Ce;E2B+Cf,qB3B/Ce,EAAA;E2BiDf;IACE,W3BhFW;I2BiFX,yB3BnDa;I2BoDb,qB3BpDa,EAAA;E2BuDf;IAEE,iD3BzDa,EAAA;E2B4Df;;IAKE,W3B/FW;I2BgGX,yB3BlEa;I2BmEb,qB3BnEa,EAAA;I2B4Df;;MAcM,iD3B1ES,EAAA;E2B+Ef;IAEE,c3BjFa;I2BkFb,6BAA6B,EAAA;;ADvD/B;ECmBA,c3BtEgB;E2BuEhB,qB3BvEgB,EAAA;E2ByEhB;IACE,W3BhFW;I2BiFX,yB3B3Ec;I2B4Ed,qB3B5Ec,EAAA;E2B+EhB;IAEE,kD3BjFc,EAAA;E2BoFhB;;IAKE,W3B/FW;I2BgGX,yB3B1Fc;I2B2Fd,qB3B3Fc,EAAA;I2BoFhB;;MAcM,kD3BlGU,EAAA;E2BuGhB;IAEE,c3BzGc;I2B0Gd,6BAA6B,EAAA;;ADvD/B;ECmBA,c3BvCe;E2BwCf,qB3BxCe,EAAA;E2B0Cf;IACE,W3BhFW;I2BiFX,yB3B5Ca;I2B6Cb,qB3B7Ca,EAAA;E2BgDf;IAEE,gD3BlDa,EAAA;E2BqDf;;IAKE,W3B/FW;I2BgGX,yB3B3Da;I2B4Db,qB3B5Da,EAAA;I2BqDf;;MAcM,gD3BnES,EAAA;E2BwEf;IAEE,c3B1Ea;I2B2Eb,6BAA6B,EAAA;;ADvD/B;ECmBA,c3BrCe;E2BsCf,qB3BtCe,EAAA;E2BwCf;IACE,W3BtEW;I2BuEX,yB3B1Ca;I2B2Cb,qB3B3Ca,EAAA;E2B8Cf;IAEE,iD3BhDa,EAAA;E2BmDf;;IAKE,W3BrFW;I2BsFX,yB3BzDa;I2B0Db,qB3B1Da,EAAA;I2BmDf;;MAcM,iD3BjES,EAAA;E2BsEf;IAEE,c3BxEa;I2ByEb,6BAA6B,EAAA;;ADvD/B;ECmBA,c3BxCe;E2ByCf,qB3BzCe,EAAA;E2B2Cf;IACE,W3BtEW;I2BuEX,yB3B7Ca;I2B8Cb,qB3B9Ca,EAAA;E2BiDf;IAEE,gD3BnDa,EAAA;E2BsDf;;IAKE,W3BrFW;I2BsFX,yB3B5Da;I2B6Db,qB3B7Da,EAAA;I2BsDf;;MAcM,gD3BpES,EAAA;E2ByEf;IAEE,c3B3Ea;I2B4Eb,6BAA6B,EAAA;;ADvD/B;ECmBA,c3B1Ce;E2B2Cf,qB3B3Ce,EAAA;E2B6Cf;IACE,W3BhFW;I2BiFX,yB3B/Ca;I2BgDb,qB3BhDa,EAAA;E2BmDf;IAEE,gD3BrDa,EAAA;E2BwDf;;IAKE,W3B/FW;I2BgGX,yB3B9Da;I2B+Db,qB3B/Da,EAAA;I2BwDf;;MAcM,gD3BtES,EAAA;E2B2Ef;IAEE,c3B7Ea;I2B8Eb,6BAA6B,EAAA;;ADvD/B;ECmBA,c3B3EgB;E2B4EhB,qB3B5EgB,EAAA;E2B8EhB;IACE,W3BtEW;I2BuEX,yB3BhFc;I2BiFd,qB3BjFc,EAAA;E2BoFhB;IAEE,kD3BtFc,EAAA;E2ByFhB;;IAKE,W3BrFW;I2BsFX,yB3B/Fc;I2BgGd,qB3BhGc,EAAA;I2ByFhB;;MAcM,kD3BvGU,EAAA;E2B4GhB;IAEE,c3B9Gc;I2B+Gd,6BAA6B,EAAA;;ADvD/B;ECmBA,c3BnEgB;E2BoEhB,qB3BpEgB,EAAA;E2BsEhB;IACE,W3BhFW;I2BiFX,yB3BxEc;I2ByEd,qB3BzEc,EAAA;E2B4EhB;IAEE,+C3B9Ec,EAAA;E2BiFhB;;IAKE,W3B/FW;I2BgGX,yB3BvFc;I2BwFd,qB3BxFc,EAAA;I2BiFhB;;MAcM,+C3B/FU,EAAA;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CjBI,mCH2UgC;IG1UhC,kCH0UgC,EAAA;ImC1TpC;MhCjBI,+CDiK4D;MChK5D,8CDgK4D,EAAA;IiChJhE;MhCjBI,mCH2UgC;MG1UhC,kCH0UgC,EAAA;;AmC1RpC;EACE,qBnCi/B+C,EAAA;;AmCz+BjD;EAEI,eAAe,EAAA;;AAFnB;EAMI,eAAe;EACf,cAAc;EhCxFd,gBgCyFwB,EAAA;EAR5B;IAUoB,aAAa,EAAA;EAVjC;IAWmB,gBAAgB,EAAA;EAXnC;IhCjFI,gBgC+F0B,EAAA;;AClH9B;EACE,aAAa;EACb,eAAe;EACf,YpCw0CmC;EoCv0CnC,mBpCy0CsC;EoCv0CtC,gBAAgB,EAAA;;AAKlB;EAGI,oBpC8zCqC,EAAA;EoCj0CzC;IAMM,WAAW;IACX,qBpC0zCmC;IoCzzCnC,cpCLY;IoCMZ,uFAAyO,EAAA;;AAT/O;EAcI,cpCXc,EAAA;;AqCdlB;EACE,aAAa;EhCGb,eAAe;EACf,gBAAgB,EAAA;;AgCAlB;EACE,kBAAkB;EAClB,cAAc;EACd,crC8Be;EqC7Bf,qBAAwD;EACxD,sBrCFa;EqCGb,yBrCAgB;EkBKZ,qIlB6hCoJ,EAAA;EkBzhCpJ;ImBfN;MnBgBQ,gBAAgB,EAAA,EmBQvB;EAxBD;IAUI,UAAU;IACV,cnCgJiC;ImC9IjC,yBrCRc;IqCSd,qBrCRc,EAAA;EqCNlB;IAkBI,UAAU;IACV,cnCwIiC;ImCvIjC,yBrCfc;IqCgBd,UrCqgCiC;IqCpgCjC,kDrCWa,EAAA;;AqCPjB;EAEI,iBrCuU6B,EAAA;;AqCzUjC;EAMI,UAAU;EACV,WrC9BW;EmBJb,yBnBkCe;EqCEb,qBrCFa,EAAA;;AqCPjB;EAaI,crC9Bc;EqC+Bd,oBAAoB;EACpB,sBrCtCW;EqCuCX,qBrCpCc,EAAA;;AqCNlB;ECAI,yBtC0gCsC,EAAA;;AsCtgCxC;EnCwCE,+BHoUgC;EGnUhC,kCHmUgC,EAAA;;AsC5WlC;EnC0BE,gCHkVgC;EGjVhC,mCHiVgC,EAAA;;AsCjXlC;EACE,uBtC8gCsC;ECxxBpC,kBAvE+B,EAAA;;AqCxK7B;EnCqCJ,8BHsU+B;EGrU/B,iCHqU+B,EAAA;;AsCrW3B;EnCiBJ,+BHoV+B;EGnV/B,kCHmV+B,EAAA;;AsCnXjC;EACE,uBtC4gCqC;ECtxBnC,mBAvE+B,EAAA;;AqCxK7B;EnCqCJ,8BHqU+B;EGpU/B,iCHoU+B,EAAA;;AsCpW3B;EnCiBJ,+BHmV+B;EGlV/B,kCHkV+B,EAAA;;AuCjXnC;EACE,qBAAqB;EACrB,sBvC4rCuC;ECx8BnC,iBAvE+B;EsC3KnC,gBvCya+B;EuCxa/B,cAAc;EACd,WvCHa;EuCIb,kBAAkB;EAClB,mBAAmB;EACnB,wBAAwB;EpCKtB,sBHkWgC,EAAA;EuChXpC;IAeI,aAAa,EAAA;;AAKjB;EACE,kBAAkB;EAClB,SAAS,EAAA;;ACvBX;EACE,kBAAkB;EAClB,kBxCmPW;EwClPX,mBxCmvCkC;EwClvClC,6BAA6C;ErCW3C,sBHkWgC,EAAA;;AwCxWpC;EAEE,cAAc,EAAA;;AAIhB;EACE,gBxC8Z+B,EAAA;;AwCtZjC;EACE,mBxCouCkD,EAAA;EwCruCpD;IAKI,kBAAkB;IAClB,MAAM;IACN,QAAQ;IACR,UxCkQuC;IwCjQvC,qBxCoNS,EAAA;;AwCrMX;EClDA,cvC8JmC;EiB5JnC,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cvC8JmC;EiB5JnC,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cvC8JmC;EiB5JnC,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cDgDuF;ErB9CvF,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cDgDuF;ErB9CvF,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cvC8JmC;EiB5JnC,yBjBuJmC;EuCvJnC,qBvCuJmC,EAAA;EuCrJnC;IACE,cvCyJiC,EAAA;;AsC5GnC;EClDA,cDgDuF;ErB9CvF,yBjBuJmC;EuCvJnC,qBvCu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gC;MGvThC,0BwCmDsC,EAAA;IANtC;MxC7CA,gCHuTgC;MG3ShC,4BwC4C2C,EAAA;IAX3C;MAeM,aAAa,EAAA;IAfnB;MAmBM,qB3C0OuB;M2CzOvB,oBAAoB,EAAA;MApB1B;QAuBQ,iB3CsOqB;Q2CrOrB,sB3CqOqB,EAAA,E2CpOtB;;AAaX;ExC9HI,gBwC+HsB,EAAA;EAD1B;IAII,qB3CmN6B,EAAA;I2CvNjC;MAOM,sBAAsB,EAAA;;ACpJ1B;EACE,c1C2JiC;E0C1JjC,yB1CqJiC,EAAA;E0CvJnC;IAOM,c1CqJ6B;I0CpJ7B,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yB1C+I6B;I0C9I7B,qB1C8I6B,EAAA;;A0C5JnC;EACE,c1C2JiC;E0C1JjC,yB1CqJiC,EAAA;E0CvJnC;IAOM,c1CqJ6B;I0CpJ7B,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yB1C+I6B;I0C9I7B,qB1C8I6B,EAAA;;A0C5JnC;EACE,c1C2JiC;E0C1JjC,yB1CqJiC,EAAA;E0CvJnC;IAOM,c1CqJ6B;I0CpJ7B,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yB1C+I6B;I0C9I7B,qB1C8I6B,EAAA;;A0C5JnC;EACE,cDmKiH;EClKjH,yB1CqJiC,EAAA;E0CvJnC;IAOM,cD6J6G;IC5J7G,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yBDuJ6G;ICtJ7G,qBDsJ6G,EAAA;;ACpKnH;EACE,cDmKiH;EClKjH,yB1CqJiC,EAAA;E0CvJnC;IAOM,cD6J6G;IC5J7G,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yBDuJ6G;ICtJ7G,qBDsJ6G,EAAA;;ACpKnH;EACE,c1C2JiC;E0C1JjC,yB1CqJiC,EAAA;E0CvJnC;IAOM,c1CqJ6B;I0CpJ7B,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;I4CSP,yB1C+I6B;I0C9I7B,qB1C8I6B,EAAA;;A0C5JnC;EACE,cDmKiH;EClKjH,yB1CqJiC,EAAA;E0CvJnC;IAOM,cD6J6G;IC5J7G,yB1CoJ6B,EAAA;E0C5JnC;IAYM,W5CRO;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","sourcesContent":["/*!\n * Bootstrap v5.0.1 (https://getbootstrap.com/)\n * Copyright 2011-2021 The Bootstrap Authors\n * Copyright 2011-2021 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */\n\n// scss-docs-start import-stack\n// Configuration\n@import \"functions\";\n@import \"variables\";\n@import \"mixins\";\n@import \"utilities\";\n\n// Layout & components\n@import \"root\";\n@import \"reboot\";\n@import \"type\";\n@import \"images\";\n@import \"containers\";\n@import \"grid\";\n@import \"tables\";\n@import \"forms\";\n@import \"buttons\";\n@import \"transitions\";\n@import \"dropdown\";\n@import \"button-group\";\n@import \"nav\";\n@import \"navbar\";\n@import \"card\";\n@import \"accordion\";\n@import \"breadcrumb\";\n@import \"pagination\";\n@import \"badge\";\n@import \"alert\";\n@import \"progress\";\n@import \"list-group\";\n@import \"close\";\n@import \"toasts\";\n@import \"modal\";\n@import \"tooltip\";\n@import \"popover\";\n@import \"carousel\";\n@import \"spinners\";\n@import \"offcanvas\";\n\n// Helpers\n@import \"helpers\";\n\n// Utilities\n@import \"utilities/api\";\n// scss-docs-end import-stack\n","@import 'bootstrap/scss/bootstrap';\n\nbody {\n  background-image: url(\"./assets/images/bg-main.jpg\");\n  background-repeat: repeat;\n  background-size: cover;\n\n  #searchCity {\n    height: 80%;  \n  }\n\n  #mapid {\n   height: 40vh;\n   width: 80vw;\n  }\n}",":root {\n  // Custom variable values only support SassScript inside `#{}`.\n  @each $color, $value in $colors {\n    --#{$variable-prefix}#{$color}: #{$value};\n  }\n\n  @each $color, $value in $theme-colors {\n    --#{$variable-prefix}#{$color}: #{$value};\n  }\n\n  // Use `inspect` for lists so that quoted items keep the quotes.\n  // See https://github.com/sass/sass/issues/2383#issuecomment-336349172\n  --#{$variable-prefix}font-sans-serif: #{inspect($font-family-sans-serif)};\n  --#{$variable-prefix}font-monospace: #{inspect($font-family-monospace)};\n  --#{$variable-prefix}gradient: #{$gradient};\n}\n","// stylelint-disable declaration-no-important, selector-no-qualifying-type, property-no-vendor-prefix\n\n\n// Reboot\n//\n// Normalization of HTML elements, manually forked from Normalize.css to remove\n// styles targeting irrelevant browsers while applying new styles.\n//\n// Normalize is licensed MIT. https://github.com/necolas/normalize.css\n\n\n// Document\n//\n// Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n\n// Root\n//\n// Ability to the value of the root font sizes, affecting the value of `rem`.\n// null by default, thus nothing is generated.\n\n:root {\n  font-size: $font-size-root;\n\n  @if $enable-smooth-scroll {\n    @media (prefers-reduced-motion: no-preference) {\n      scroll-behavior: smooth;\n    }\n  }\n}\n\n\n// Body\n//\n// 1. Remove the margin in all browsers.\n// 2. As a best practice, apply a default `background-color`.\n// 3. Prevent adjustments of font size after orientation changes in iOS.\n// 4. Change the default tap highlight to be completely transparent in iOS.\n\nbody {\n  margin: 0; // 1\n  font-family: $font-family-base;\n  @include font-size($font-size-base);\n  font-weight: $font-weight-base;\n  line-height: $line-height-base;\n  color: $body-color;\n  text-align: $body-text-align;\n  background-color: $body-bg; // 2\n  -webkit-text-size-adjust: 100%; // 3\n  -webkit-tap-highlight-color: rgba($black, 0); // 4\n}\n\n\n// Content grouping\n//\n// 1. Reset Firefox's gray color\n// 2. Set correct height and prevent the `size` attribute to make the `hr` look like an input field\n\nhr {\n  margin: $hr-margin-y 0;\n  color: $hr-color; // 1\n  background-color: currentColor;\n  border: 0;\n  opacity: $hr-opacity;\n}\n\nhr:not([size]) {\n  height: $hr-height; // 2\n}\n\n\n// Typography\n//\n// 1. Remove top margins from headings\n//    By default, `<h1>`-`<h6>` all receive top and bottom margins. We nuke the top\n//    margin for easier control within type scales as it avoids margin collapsing.\n\n%heading {\n  margin-top: 0; // 1\n  margin-bottom: $headings-margin-bottom;\n  font-family: $headings-font-family;\n  font-style: $headings-font-style;\n  font-weight: $headings-font-weight;\n  line-height: $headings-line-height;\n  color: $headings-color;\n}\n\nh1 {\n  @extend %heading;\n  @include font-size($h1-font-size);\n}\n\nh2 {\n  @extend %heading;\n  @include font-size($h2-font-size);\n}\n\nh3 {\n  @extend %heading;\n  @include font-size($h3-font-size);\n}\n\nh4 {\n  @extend %heading;\n  @include font-size($h4-font-size);\n}\n\nh5 {\n  @extend %heading;\n  @include font-size($h5-font-size);\n}\n\nh6 {\n  @extend %heading;\n  @include font-size($h6-font-size);\n}\n\n\n// Reset margins on paragraphs\n//\n// Similarly, the top margin on `<p>`s get reset. However, we also reset the\n// bottom margin to use `rem` units instead of `em`.\n\np {\n  margin-top: 0;\n  margin-bottom: $paragraph-margin-bottom;\n}\n\n\n// Abbreviations\n//\n// 1. Duplicate behavior to the data-bs-* attribute for our tooltip plugin\n// 2. Add the correct text decoration in Chrome, Edge, Opera, and Safari.\n// 3. Add explicit cursor to indicate changed behavior.\n// 4. Prevent the text-decoration to be skipped.\n\nabbr[title],\nabbr[data-bs-original-title] { // 1\n  text-decoration: underline dotted; // 2\n  cursor: help; // 3\n  text-decoration-skip-ink: none; // 4\n}\n\n\n// Address\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\n\n// Lists\n\nol,\nul {\n  padding-left: 2rem;\n}\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0;\n}\n\ndt {\n  font-weight: $dt-font-weight;\n}\n\n// 1. Undo browser default\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; // 1\n}\n\n\n// Blockquote\n\nblockquote {\n  margin: 0 0 1rem;\n}\n\n\n// Strong\n//\n// Add the correct font weight in Chrome, Edge, and Safari\n\nb,\nstrong {\n  font-weight: $font-weight-bolder;\n}\n\n\n// Small\n//\n// Add the correct font size in all browsers\n\nsmall {\n  @include font-size($small-font-size);\n}\n\n\n// Mark\n\nmark {\n  padding: $mark-padding;\n  background-color: $mark-bg;\n}\n\n\n// Sub and Sup\n//\n// Prevent `sub` and `sup` elements from affecting the line height in\n// all browsers.\n\nsub,\nsup {\n  position: relative;\n  @include font-size($sub-sup-font-size);\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsub { bottom: -.25em; }\nsup { top: -.5em; }\n\n\n// Links\n\na {\n  color: $link-color;\n  text-decoration: $link-decoration;\n\n  &:hover {\n    color: $link-hover-color;\n    text-decoration: $link-hover-decoration;\n  }\n}\n\n// And undo these styles for placeholder links/named anchors (without href).\n// It would be more straightforward to just use a[href] in previous block, but that\n// causes specificity issues in many other styles that are too complex to fix.\n// See https://github.com/twbs/bootstrap/issues/19402\n\na:not([href]):not([class]) {\n  &,\n  &:hover {\n    color: inherit;\n    text-decoration: none;\n  }\n}\n\n\n// Code\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: $font-family-code;\n  @include font-size(1em); // Correct the odd `em` font sizing in all browsers.\n  direction: ltr #{\"/* rtl:ignore */\"};\n  unicode-bidi: bidi-override;\n}\n\n// 1. Remove browser default top margin\n// 2. Reset browser default of `1em` to use `rem`s\n// 3. Don't allow content to break outside\n\npre {\n  display: block;\n  margin-top: 0; // 1\n  margin-bottom: 1rem; // 2\n  overflow: auto; // 3\n  @include font-size($code-font-size);\n  color: $pre-color;\n\n  // Account for some code outputs that place code tags in pre tags\n  code {\n    @include font-size(inherit);\n    color: inherit;\n    word-break: normal;\n  }\n}\n\ncode {\n  @include font-size($code-font-size);\n  color: $code-color;\n  word-wrap: break-word;\n\n  // Streamline the style when inside anchors to avoid broken underline and more\n  a > & {\n    color: inherit;\n  }\n}\n\nkbd {\n  padding: $kbd-padding-y $kbd-padding-x;\n  @include font-size($kbd-font-size);\n  color: $kbd-color;\n  background-color: $kbd-bg;\n  @include border-radius($border-radius-sm);\n\n  kbd {\n    padding: 0;\n    @include font-size(1em);\n    font-weight: $nested-kbd-font-weight;\n  }\n}\n\n\n// Figures\n//\n// Apply a consistent margin strategy (matches our type styles).\n\nfigure {\n  margin: 0 0 1rem;\n}\n\n\n// Images and content\n\nimg,\nsvg {\n  vertical-align: middle;\n}\n\n\n// Tables\n//\n// Prevent double borders\n\ntable {\n  caption-side: bottom;\n  border-collapse: collapse;\n}\n\ncaption {\n  padding-top: $table-cell-padding-y;\n  padding-bottom: $table-cell-padding-y;\n  color: $table-caption-color;\n  text-align: left;\n}\n\n// 1. Removes font-weight bold by inheriting\n// 2. Matches default `<td>` alignment by inheriting `text-align`.\n// 3. Fix alignment for Safari\n\nth {\n  font-weight: $table-th-font-weight; // 1\n  text-align: inherit; // 2\n  text-align: -webkit-match-parent; // 3\n}\n\nthead,\ntbody,\ntfoot,\ntr,\ntd,\nth {\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0;\n}\n\n\n// Forms\n//\n// 1. Allow labels to use `margin` for spacing.\n\nlabel {\n  display: inline-block; // 1\n}\n\n// Remove the default `border-radius` that macOS Chrome adds.\n// See https://github.com/twbs/bootstrap/issues/24093\n\nbutton {\n  // stylelint-disable-next-line property-disallowed-list\n  border-radius: 0;\n}\n\n// Explicitly remove focus outline in Chromium when it shouldn't be\n// visible (e.g. as result of mouse click or touch tap). It already\n// should be doing this automatically, but seems to currently be\n// confused and applies its very visible two-tone outline anyway.\n\nbutton:focus:not(:focus-visible) {\n  outline: 0;\n}\n\n// 1. Remove the margin in Firefox and Safari\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0; // 1\n  font-family: inherit;\n  @include font-size(inherit);\n  line-height: inherit;\n}\n\n// Remove the inheritance of text transform in Firefox\nbutton,\nselect {\n  text-transform: none;\n}\n// Set the cursor for non-`<button>` buttons\n//\n// Details at https://github.com/twbs/bootstrap/pull/30562\n[role=\"button\"] {\n  cursor: pointer;\n}\n\nselect {\n  // Remove the inheritance of word-wrap in Safari.\n  // See https://github.com/twbs/bootstrap/issues/24990\n  word-wrap: normal;\n\n  // Undo the opacity change from Chrome\n  &:disabled {\n    opacity: 1;\n  }\n}\n\n// Remove the dropdown arrow in Chrome from inputs built with datalists.\n// See https://stackoverflow.com/a/54997118\n\n[list]::-webkit-calendar-picker-indicator {\n  display: none;\n}\n\n// 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n//    controls in Android 4.\n// 2. Correct the inability to style clickable types in iOS and Safari.\n// 3. Opinionated: add \"hand\" cursor to non-disabled button elements.\n\nbutton,\n[type=\"button\"], // 1\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; // 2\n\n  @if $enable-button-pointers {\n    &:not(:disabled) {\n      cursor: pointer; // 3\n    }\n  }\n}\n\n// Remove inner border and padding from Firefox, but don't restore the outline like Normalize.\n\n::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\n// 1. Textareas should really only resize vertically so they don't break their (horizontal) containers.\n\ntextarea {\n  resize: vertical; // 1\n}\n\n// 1. Browsers set a default `min-width: min-content;` on fieldsets,\n//    unlike e.g. `<div>`s, which have `min-width: 0;` by default.\n//    So we reset that to ensure fieldsets behave more like a standard block element.\n//    See https://github.com/twbs/bootstrap/issues/12359\n//    and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements\n// 2. Reset the default outline behavior of fieldsets so they don't affect page layout.\n\nfieldset {\n  min-width: 0; // 1\n  padding: 0; // 2\n  margin: 0; // 2\n  border: 0; // 2\n}\n\n// 1. By using `float: left`, the legend will behave like a block element.\n//    This way the border of a fieldset wraps around the legend if present.\n// 2. Fix wrapping bug.\n//    See https://github.com/twbs/bootstrap/issues/29712\n\nlegend {\n  float: left; // 1\n  width: 100%;\n  padding: 0;\n  margin-bottom: $legend-margin-bottom;\n  @include font-size($legend-font-size);\n  font-weight: $legend-font-weight;\n  line-height: inherit;\n\n  + * {\n    clear: left; // 2\n  }\n}\n\n// Fix height of inputs with a type of datetime-local, date, month, week, or time\n// See https://github.com/twbs/bootstrap/issues/18842\n\n::-webkit-datetime-edit-fields-wrapper,\n::-webkit-datetime-edit-text,\n::-webkit-datetime-edit-minute,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-year-field {\n  padding: 0;\n}\n\n::-webkit-inner-spin-button {\n  height: auto;\n}\n\n// 1. Correct the outline style in Safari.\n// 2. This overrides the extra rounded corners on search inputs in iOS so that our\n//    `.form-control` class can properly style them. Note that this cannot simply\n//    be added to `.form-control` as it's not specific enough. For details, see\n//    https://github.com/twbs/bootstrap/issues/11586.\n\n[type=\"search\"] {\n  outline-offset: -2px; // 1\n  -webkit-appearance: textfield; // 2\n}\n\n// 1. A few input types should stay LTR\n// See https://rtlstyling.com/posts/rtl-styling#form-inputs\n// 2. RTL only output\n// See https://rtlcss.com/learn/usage-guide/control-directives/#raw\n\n/* rtl:raw:\n[type=\"tel\"],\n[type=\"url\"],\n[type=\"email\"],\n[type=\"number\"] {\n  direction: ltr;\n}\n*/\n\n// Remove the inner padding in Chrome and Safari on macOS.\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n// Remove padding around color pickers in webkit browsers\n\n::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n\n\n// Inherit font family and line height for file input buttons\n\n::file-selector-button {\n  font: inherit;\n}\n\n// 1. Change font properties to `inherit`\n// 2. Correct the inability to style clickable types in iOS and Safari.\n\n::-webkit-file-upload-button {\n  font: inherit; // 1\n  -webkit-appearance: button; // 2\n}\n\n// Correct element displays\n\noutput {\n  display: inline-block;\n}\n\n// Remove border from iframe\n\niframe {\n  border: 0;\n}\n\n// Summary\n//\n// 1. Add the correct display in all browsers\n\nsummary {\n  display: list-item; // 1\n  cursor: pointer;\n}\n\n\n// Progress\n//\n// Add the correct vertical alignment in Chrome, Firefox, and Opera.\n\nprogress {\n  vertical-align: baseline;\n}\n\n\n// Hidden attribute\n//\n// Always hide an element with the `hidden` HTML attribute.\n\n[hidden] {\n  display: none !important;\n}\n","// Variables\n//\n// Variables should follow the `$component-state-property-size` formula for\n// consistent naming. Ex: $nav-link-disabled-color and $modal-content-box-shadow-xs.\n\n// Color system\n\n// scss-docs-start gray-color-variables\n$white:    #fff !default;\n$gray-100: #f8f9fa !default;\n$gray-200: #e9ecef !default;\n$gray-300: #dee2e6 !default;\n$gray-400: #ced4da !default;\n$gray-500: #adb5bd !default;\n$gray-600: #6c757d !default;\n$gray-700: #495057 !default;\n$gray-800: #343a40 !default;\n$gray-900: #212529 !default;\n$black:    #000 !default;\n// scss-docs-end gray-color-variables\n\n// fusv-disable\n// scss-docs-start gray-colors-map\n$grays: (\n  \"100\": $gray-100,\n  \"200\": $gray-200,\n  \"300\": $gray-300,\n  \"400\": $gray-400,\n  \"500\": $gray-500,\n  \"600\": $gray-600,\n  \"700\": $gray-700,\n  \"800\": $gray-800,\n  \"900\": $gray-900\n) !default;\n// scss-docs-end gray-colors-map\n// fusv-enable\n\n// scss-docs-start color-variables\n$blue:    #0d6efd !default;\n$indigo:  #6610f2 !default;\n$purple:  #6f42c1 !default;\n$pink:    #d63384 !default;\n$red:     #dc3545 !default;\n$orange:  #fd7e14 !default;\n$yellow:  #ffc107 !default;\n$green:   #198754 !default;\n$teal:    #20c997 !default;\n$cyan:    #0dcaf0 !default;\n// scss-docs-end color-variables\n\n// scss-docs-start colors-map\n$colors: (\n  \"blue\":       $blue,\n  \"indigo\":     $indigo,\n  \"purple\":     $purple,\n  \"pink\":       $pink,\n  \"red\":        $red,\n  \"orange\":     $orange,\n  \"yellow\":     $yellow,\n  \"green\":      $green,\n  \"teal\":       $teal,\n  \"cyan\":       $cyan,\n  \"white\":      $white,\n  \"gray\":       $gray-600,\n  \"gray-dark\":  $gray-800\n) !default;\n// scss-docs-end colors-map\n\n// scss-docs-start theme-color-variables\n$primary:       $blue !default;\n$secondary:     $gray-600 !default;\n$success:       $green !default;\n$info:          $cyan !default;\n$warning:       $yellow !default;\n$danger:        $red !default;\n$light:         $gray-100 !default;\n$dark:          $gray-900 !default;\n// scss-docs-end theme-color-variables\n\n// scss-docs-start theme-colors-map\n$theme-colors: (\n  \"primary\":    $primary,\n  \"secondary\":  $secondary,\n  \"success\":    $success,\n  \"info\":       $info,\n  \"warning\":    $warning,\n  \"danger\":     $danger,\n  \"light\":      $light,\n  \"dark\":       $dark\n) !default;\n// scss-docs-end theme-colors-map\n\n// The contrast ratio to reach against white, to determine if color changes from \"light\" to \"dark\". Acceptable values for WCAG 2.0 are 3, 4.5 and 7.\n// See https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast\n$min-contrast-ratio:   4.5 !default;\n\n// Customize the light and dark text colors for use in our color contrast function.\n$color-contrast-dark:      $black !default;\n$color-contrast-light:     $white !default;\n\n// fusv-disable\n$blue-100: tint-color($blue, 80%) !default;\n$blue-200: tint-color($blue, 60%) !default;\n$blue-300: tint-color($blue, 40%) !default;\n$blue-400: tint-color($blue, 20%) !default;\n$blue-500: $blue !default;\n$blue-600: shade-color($blue, 20%) !default;\n$blue-700: shade-color($blue, 40%) !default;\n$blue-800: shade-color($blue, 60%) !default;\n$blue-900: shade-color($blue, 80%) !default;\n\n$indigo-100: tint-color($indigo, 80%) !default;\n$indigo-200: tint-color($indigo, 60%) !default;\n$indigo-300: tint-color($indigo, 40%) !default;\n$indigo-400: tint-color($indigo, 20%) !default;\n$indigo-500: $indigo !default;\n$indigo-600: shade-color($indigo, 20%) !default;\n$indigo-700: shade-color($indigo, 40%) !default;\n$indigo-800: shade-color($indigo, 60%) !default;\n$indigo-900: shade-color($indigo, 80%) !default;\n\n$purple-100: tint-color($purple, 80%) !default;\n$purple-200: tint-color($purple, 60%) !default;\n$purple-300: tint-color($purple, 40%) !default;\n$purple-400: tint-color($purple, 20%) !default;\n$purple-500: $purple !default;\n$purple-600: shade-color($purple, 20%) !default;\n$purple-700: shade-color($purple, 40%) !default;\n$purple-800: shade-color($purple, 60%) !default;\n$purple-900: shade-color($purple, 80%) !default;\n\n$pink-100: tint-color($pink, 80%) !default;\n$pink-200: tint-color($pink, 60%) !default;\n$pink-300: tint-color($pink, 40%) !default;\n$pink-400: tint-color($pink, 20%) !default;\n$pink-500: $pink !default;\n$pink-600: shade-color($pink, 20%) !default;\n$pink-700: shade-color($pink, 40%) !default;\n$pink-800: shade-color($pink, 60%) !default;\n$pink-900: shade-color($pink, 80%) !default;\n\n$red-100: tint-color($red, 80%) !default;\n$red-200: tint-color($red, 60%) !default;\n$red-300: tint-color($red, 40%) !default;\n$red-400: tint-color($red, 20%) !default;\n$red-500: $red !default;\n$red-600: shade-color($red, 20%) !default;\n$red-700: shade-color($red, 40%) !default;\n$red-800: shade-color($red, 60%) !default;\n$red-900: shade-color($red, 80%) !default;\n\n$orange-100: tint-color($orange, 80%) !default;\n$orange-200: tint-color($orange, 60%) !default;\n$orange-300: tint-color($orange, 40%) !default;\n$orange-400: tint-color($orange, 20%) !default;\n$orange-500: $orange !default;\n$orange-600: shade-color($orange, 20%) !default;\n$orange-700: shade-color($orange, 40%) !default;\n$orange-800: shade-color($orange, 60%) !default;\n$orange-900: shade-color($orange, 80%) !default;\n\n$yellow-100: tint-color($yellow, 80%) !default;\n$yellow-200: tint-color($yellow, 60%) !default;\n$yellow-300: tint-color($yellow, 40%) !default;\n$yellow-400: tint-color($yellow, 20%) !default;\n$yellow-500: $yellow !default;\n$yellow-600: shade-color($yellow, 20%) !default;\n$yellow-700: shade-color($yellow, 40%) !default;\n$yellow-800: shade-color($yellow, 60%) !default;\n$yellow-900: shade-color($yellow, 80%) !default;\n\n$green-100: tint-color($green, 80%) !default;\n$green-200: tint-color($green, 60%) !default;\n$green-300: tint-color($green, 40%) !default;\n$green-400: tint-color($green, 20%) !default;\n$green-500: $green !default;\n$green-600: shade-color($green, 20%) !default;\n$green-700: shade-color($green, 40%) !default;\n$green-800: shade-color($green, 60%) !default;\n$green-900: shade-color($green, 80%) !default;\n\n$teal-100: tint-color($teal, 80%) !default;\n$teal-200: tint-color($teal, 60%) !default;\n$teal-300: tint-color($teal, 40%) !default;\n$teal-400: tint-color($teal, 20%) !default;\n$teal-500: $teal !default;\n$teal-600: shade-color($teal, 20%) !default;\n$teal-700: shade-color($teal, 40%) !default;\n$teal-800: shade-color($teal, 60%) !default;\n$teal-900: shade-color($teal, 80%) !default;\n\n$cyan-100: tint-color($cyan, 80%) !default;\n$cyan-200: tint-color($cyan, 60%) !default;\n$cyan-300: tint-color($cyan, 40%) !default;\n$cyan-400: tint-color($cyan, 20%) !default;\n$cyan-500: $cyan !default;\n$cyan-600: shade-color($cyan, 20%) !default;\n$cyan-700: shade-color($cyan, 40%) !default;\n$cyan-800: shade-color($cyan, 60%) !default;\n$cyan-900: shade-color($cyan, 80%) !default;\n// fusv-enable\n\n// Characters which are escaped by the escape-svg function\n$escaped-characters: (\n  (\"<\", \"%3c\"),\n  (\">\", \"%3e\"),\n  (\"#\", \"%23\"),\n  (\"(\", \"%28\"),\n  (\")\", \"%29\"),\n) !default;\n\n// Options\n//\n// Quickly modify global styling by enabling or disabling optional features.\n\n$enable-caret:                true !default;\n$enable-rounded:              true !default;\n$enable-shadows:              false !default;\n$enable-gradients:            false !default;\n$enable-transitions:          true !default;\n$enable-reduced-motion:       true !default;\n$enable-smooth-scroll:        true !default;\n$enable-grid-classes:         true !default;\n$enable-button-pointers:      true !default;\n$enable-rfs:                  true !default;\n$enable-validation-icons:     true !default;\n$enable-negative-margins:     false !default;\n$enable-deprecation-messages: true !default;\n$enable-important-utilities:  true !default;\n\n// Prefix for :root CSS variables\n\n$variable-prefix:             bs- !default;\n\n// Gradient\n//\n// The gradient which is added to components if `$enable-gradients` is `true`\n// This gradient is also added to elements with `.bg-gradient`\n// scss-docs-start variable-gradient\n$gradient: linear-gradient(180deg, rgba($white, .15), rgba($white, 0)) !default;\n// scss-docs-end variable-gradient\n\n// Spacing\n//\n// Control the default styling of most Bootstrap elements by modifying these\n// variables. Mostly focused on spacing.\n// You can add more entries to the $spacers map, should you need more variation.\n\n// scss-docs-start spacer-variables-maps\n$spacer: 1rem !default;\n$spacers: (\n  0: 0,\n  1: $spacer / 4,\n  2: $spacer / 2,\n  3: $spacer,\n  4: $spacer * 1.5,\n  5: $spacer * 3,\n) !default;\n\n$negative-spacers: if($enable-negative-margins, negativify-map($spacers), null) !default;\n// scss-docs-end spacer-variables-maps\n\n// Position\n//\n// Define the edge positioning anchors of the position utilities.\n\n// scss-docs-start position-map\n$position-values: (\n  0: 0,\n  50: 50%,\n  100: 100%\n) !default;\n// scss-docs-end position-map\n\n// Body\n//\n// Settings for the `<body>` element.\n\n$body-bg:                   $white !default;\n$body-color:                $gray-900 !default;\n$body-text-align:           null !default;\n\n\n// Links\n//\n// Style anchor elements.\n\n$link-color:                              $primary !default;\n$link-decoration:                         underline !default;\n$link-shade-percentage:                   20% !default;\n$link-hover-color:                        shift-color($link-color, $link-shade-percentage) !default;\n$link-hover-decoration:                   null !default;\n\n$stretched-link-pseudo-element:           after !default;\n$stretched-link-z-index:                  1 !default;\n\n// Paragraphs\n//\n// Style p element.\n\n$paragraph-margin-bottom:   1rem !default;\n\n\n// Grid breakpoints\n//\n// Define the minimum dimensions at which your layout will change,\n// adapting to different screen sizes, for use in media queries.\n\n// scss-docs-start grid-breakpoints\n$grid-breakpoints: (\n  xs: 0,\n  sm: 576px,\n  md: 768px,\n  lg: 992px,\n  xl: 1200px,\n  xxl: 1400px\n) !default;\n// scss-docs-end grid-breakpoints\n\n@include _assert-ascending($grid-breakpoints, \"$grid-breakpoints\");\n@include _assert-starts-at-zero($grid-breakpoints, \"$grid-breakpoints\");\n\n\n// Grid containers\n//\n// Define the maximum width of `.container` for different screen sizes.\n\n// scss-docs-start container-max-widths\n$container-max-widths: (\n  sm: 540px,\n  md: 720px,\n  lg: 960px,\n  xl: 1140px,\n  xxl: 1320px\n) !default;\n// scss-docs-end container-max-widths\n\n@include _assert-ascending($container-max-widths, \"$container-max-widths\");\n\n\n// Grid columns\n//\n// Set the number of columns and specify the width of the gutters.\n\n$grid-columns:                12 !default;\n$grid-gutter-width:           1.5rem !default;\n$grid-row-columns:            6 !default;\n\n$gutters: $spacers !default;\n\n// Container padding\n\n$container-padding-x: $grid-gutter-width / 2 !default;\n\n\n// Components\n//\n// Define common padding and border radius sizes and more.\n\n// scss-docs-start border-variables\n$border-width:                1px !default;\n$border-widths: (\n  1: 1px,\n  2: 2px,\n  3: 3px,\n  4: 4px,\n  5: 5px\n) !default;\n\n$border-color:                $gray-300 !default;\n// scss-docs-end border-variables\n\n// scss-docs-start border-radius-variables\n$border-radius:               .25rem !default;\n$border-radius-sm:            .2rem !default;\n$border-radius-lg:            .3rem !default;\n$border-radius-pill:          50rem !default;\n// scss-docs-end border-radius-variables\n\n// scss-docs-start box-shadow-variables\n$box-shadow:                  0 .5rem 1rem rgba($black, .15) !default;\n$box-shadow-sm:               0 .125rem .25rem rgba($black, .075) !default;\n$box-shadow-lg:               0 1rem 3rem rgba($black, .175) !default;\n$box-shadow-inset:            inset 0 1px 2px rgba($black, .075) !default;\n// scss-docs-end box-shadow-variables\n\n$component-active-color:      $white !default;\n$component-active-bg:         $primary !default;\n\n// scss-docs-start caret-variables\n$caret-width:                 .3em !default;\n$caret-vertical-align:        $caret-width * .85 !default;\n$caret-spacing:               $caret-width * .85 !default;\n// scss-docs-end caret-variables\n\n$transition-base:             all .2s ease-in-out !default;\n$transition-fade:             opacity .15s linear !default;\n// scss-docs-start collapse-transition\n$transition-collapse:         height .35s ease !default;\n// scss-docs-end collapse-transition\n\n// stylelint-disable function-disallowed-list\n// scss-docs-start aspect-ratios\n$aspect-ratios: (\n  \"1x1\": 100%,\n  \"4x3\": calc(3 / 4 * 100%),\n  \"16x9\": calc(9 / 16 * 100%),\n  \"21x9\": calc(9 / 21 * 100%)\n) !default;\n// scss-docs-end aspect-ratios\n// stylelint-enable function-disallowed-list\n\n// Typography\n//\n// Font, line-height, and color for body text, headings, and more.\n\n// scss-docs-start font-variables\n// stylelint-disable value-keyword-case\n$font-family-sans-serif:      system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\" !default;\n$font-family-monospace:       SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !default;\n// stylelint-enable value-keyword-case\n$font-family-base:            var(--#{$variable-prefix}font-sans-serif) !default;\n$font-family-code:            var(--#{$variable-prefix}font-monospace) !default;\n\n// $font-size-root effects the value of `rem`, which is used for as well font sizes, paddings and margins\n// $font-size-base effects the font size of the body text\n$font-size-root:              null !default;\n$font-size-base:              1rem !default; // Assumes the browser default, typically `16px`\n$font-size-sm:                $font-size-base * .875 !default;\n$font-size-lg:                $font-size-base * 1.25 !default;\n\n$font-weight-lighter:         lighter !default;\n$font-weight-light:           300 !default;\n$font-weight-normal:          400 !default;\n$font-weight-bold:            700 !default;\n$font-weight-bolder:          bolder !default;\n\n$font-weight-base:            $font-weight-normal !default;\n\n$line-height-base:            1.5 !default;\n$line-height-sm:              1.25 !default;\n$line-height-lg:              2 !default;\n\n$h1-font-size:                $font-size-base * 2.5 !default;\n$h2-font-size:                $font-size-base * 2 !default;\n$h3-font-size:                $font-size-base * 1.75 !default;\n$h4-font-size:                $font-size-base * 1.5 !default;\n$h5-font-size:                $font-size-base * 1.25 !default;\n$h6-font-size:                $font-size-base !default;\n// scss-docs-end font-variables\n\n// scss-docs-start font-sizes\n$font-sizes: (\n  1: $h1-font-size,\n  2: $h2-font-size,\n  3: $h3-font-size,\n  4: $h4-font-size,\n  5: $h5-font-size,\n  6: $h6-font-size\n) !default;\n// scss-docs-end font-sizes\n\n// scss-docs-start headings-variables\n$headings-margin-bottom:      $spacer / 2 !default;\n$headings-font-family:        null !default;\n$headings-font-style:         null !default;\n$headings-font-weight:        500 !default;\n$headings-line-height:        1.2 !default;\n$headings-color:              null !default;\n// scss-docs-end headings-variables\n\n// scss-docs-start display-headings\n$display-font-sizes: (\n  1: 5rem,\n  2: 4.5rem,\n  3: 4rem,\n  4: 3.5rem,\n  5: 3rem,\n  6: 2.5rem\n) !default;\n\n$display-font-weight: 300 !default;\n$display-line-height: $headings-line-height !default;\n// scss-docs-end display-headings\n\n// scss-docs-start type-variables\n$lead-font-size:              $font-size-base * 1.25 !default;\n$lead-font-weight:            300 !default;\n\n$small-font-size:             .875em !default;\n\n$sub-sup-font-size:           .75em !default;\n\n$text-muted:                  $gray-600 !default;\n\n$initialism-font-size:        $small-font-size !default;\n\n$blockquote-margin-y:         $spacer !default;\n$blockquote-font-size:        $font-size-base * 1.25 !default;\n$blockquote-footer-color:     $gray-600 !default;\n$blockquote-footer-font-size: $small-font-size !default;\n\n$hr-margin-y:                 $spacer !default;\n$hr-color:                    inherit !default;\n$hr-height:                   $border-width !default;\n$hr-opacity:                  .25 !default;\n\n$legend-margin-bottom:        .5rem !default;\n$legend-font-size:            1.5rem !default;\n$legend-font-weight:          null !default;\n\n$mark-padding:                .2em !default;\n\n$dt-font-weight:              $font-weight-bold !default;\n\n$nested-kbd-font-weight:      $font-weight-bold !default;\n\n$list-inline-padding:         .5rem !default;\n\n$mark-bg:                     #fcf8e3 !default;\n// scss-docs-end type-variables\n\n\n// Tables\n//\n// Customizes the `.table` component with basic values, each used across all table variations.\n\n// scss-docs-start table-variables\n$table-cell-padding-y:        .5rem !default;\n$table-cell-padding-x:        .5rem !default;\n$table-cell-padding-y-sm:     .25rem !default;\n$table-cell-padding-x-sm:     .25rem !default;\n\n$table-cell-vertical-align:   top !default;\n\n$table-color:                 $body-color !default;\n$table-bg:                    transparent !default;\n\n$table-th-font-weight:        null !default;\n\n$table-striped-color:         $table-color !default;\n$table-striped-bg-factor:     .05 !default;\n$table-striped-bg:            rgba($black, $table-striped-bg-factor) !default;\n\n$table-active-color:          $table-color !default;\n$table-active-bg-factor:      .1 !default;\n$table-active-bg:             rgba($black, $table-active-bg-factor) !default;\n\n$table-hover-color:           $table-color !default;\n$table-hover-bg-factor:       .075 !default;\n$table-hover-bg:              rgba($black, $table-hover-bg-factor) !default;\n\n$table-border-factor:         .1 !default;\n$table-border-width:          $border-width !default;\n$table-border-color:          $border-color !default;\n\n$table-striped-order:         odd !default;\n\n$table-group-separator-color: currentColor !default;\n\n$table-caption-color:         $text-muted !default;\n\n$table-bg-scale:              -80% !default;\n// scss-docs-end table-variables\n\n// scss-docs-start table-loop\n$table-variants: (\n  \"primary\":    shift-color($primary, $table-bg-scale),\n  \"secondary\":  shift-color($secondary, $table-bg-scale),\n  \"success\":    shift-color($success, $table-bg-scale),\n  \"info\":       shift-color($info, $table-bg-scale),\n  \"warning\":    shift-color($warning, $table-bg-scale),\n  \"danger\":     shift-color($danger, $table-bg-scale),\n  \"light\":      $light,\n  \"dark\":       $dark,\n) !default;\n// scss-docs-end table-loop\n\n\n// Buttons + Forms\n//\n// Shared variables that are reassigned to `$input-` and `$btn-` specific variables.\n\n// scss-docs-start input-btn-variables\n$input-btn-padding-y:         .375rem !default;\n$input-btn-padding-x:         .75rem !default;\n$input-btn-font-family:       null !default;\n$input-btn-font-size:         $font-size-base !default;\n$input-btn-line-height:       $line-height-base !default;\n\n$input-btn-focus-width:         .25rem !default;\n$input-btn-focus-color-opacity: .25 !default;\n$input-btn-focus-color:         rgba($component-active-bg, $input-btn-focus-color-opacity) !default;\n$input-btn-focus-blur:          0 !default;\n$input-btn-focus-box-shadow:    0 0 $input-btn-focus-blur $input-btn-focus-width $input-btn-focus-color !default;\n\n$input-btn-padding-y-sm:      .25rem !default;\n$input-btn-padding-x-sm:      .5rem !default;\n$input-btn-font-size-sm:      $font-size-sm !default;\n\n$input-btn-padding-y-lg:      .5rem !default;\n$input-btn-padding-x-lg:      1rem !default;\n$input-btn-font-size-lg:      $font-size-lg !default;\n\n$input-btn-border-width:      $border-width !default;\n// scss-docs-end input-btn-variables\n\n\n// Buttons\n//\n// For each of Bootstrap's buttons, define text, background, and border color.\n\n// scss-docs-start btn-variables\n$btn-padding-y:               $input-btn-padding-y !default;\n$btn-padding-x:               $input-btn-padding-x !default;\n$btn-font-family:             $input-btn-font-family !default;\n$btn-font-size:               $input-btn-font-size !default;\n$btn-line-height:             $input-btn-line-height !default;\n$btn-white-space:             null !default; // Set to `nowrap` to prevent text wrapping\n\n$btn-padding-y-sm:            $input-btn-padding-y-sm !default;\n$btn-padding-x-sm:            $input-btn-padding-x-sm !default;\n$btn-font-size-sm:            $input-btn-font-size-sm !default;\n\n$btn-padding-y-lg:            $input-btn-padding-y-lg !default;\n$btn-padding-x-lg:            $input-btn-padding-x-lg !default;\n$btn-font-size-lg:            $input-btn-font-size-lg !default;\n\n$btn-border-width:            $input-btn-border-width !default;\n\n$btn-font-weight:             $font-weight-normal !default;\n$btn-box-shadow:              inset 0 1px 0 rgba($white, .15), 0 1px 1px rgba($black, .075) !default;\n$btn-focus-width:             $input-btn-focus-width !default;\n$btn-focus-box-shadow:        $input-btn-focus-box-shadow !default;\n$btn-disabled-opacity:        .65 !default;\n$btn-active-box-shadow:       inset 0 3px 5px rgba($black, .125) !default;\n\n$btn-link-color:              $link-color !default;\n$btn-link-hover-color:        $link-hover-color !default;\n$btn-link-disabled-color:     $gray-600 !default;\n\n// Allows for customizing button radius independently from global border radius\n$btn-border-radius:           $border-radius !default;\n$btn-border-radius-sm:        $border-radius-sm !default;\n$btn-border-radius-lg:        $border-radius-lg !default;\n\n$btn-transition:              color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;\n\n$btn-hover-bg-shade-amount:       15% !default;\n$btn-hover-bg-tint-amount:        15% !default;\n$btn-hover-border-shade-amount:   20% !default;\n$btn-hover-border-tint-amount:    10% !default;\n$btn-active-bg-shade-amount:      20% !default;\n$btn-active-bg-tint-amount:       20% !default;\n$btn-active-border-shade-amount:  25% !default;\n$btn-active-border-tint-amount:   10% !default;\n// scss-docs-end btn-variables\n\n\n// Forms\n\n// scss-docs-start form-text-variables\n$form-text-margin-top:                  .25rem !default;\n$form-text-font-size:                   $small-font-size !default;\n$form-text-font-style:                  null !default;\n$form-text-font-weight:                 null !default;\n$form-text-color:                       $text-muted !default;\n// scss-docs-end form-text-variables\n\n// scss-docs-start form-label-variables\n$form-label-margin-bottom:              .5rem !default;\n$form-label-font-size:                  null !default;\n$form-label-font-style:                 null !default;\n$form-label-font-weight:                null !default;\n$form-label-color:                      null !default;\n// scss-docs-end form-label-variables\n\n// scss-docs-start form-input-variables\n$input-padding-y:                       $input-btn-padding-y !default;\n$input-padding-x:                       $input-btn-padding-x !default;\n$input-font-family:                     $input-btn-font-family !default;\n$input-font-size:                       $input-btn-font-size !default;\n$input-font-weight:                     $font-weight-base !default;\n$input-line-height:                     $input-btn-line-height !default;\n\n$input-padding-y-sm:                    $input-btn-padding-y-sm !default;\n$input-padding-x-sm:                    $input-btn-padding-x-sm !default;\n$input-font-size-sm:                    $input-btn-font-size-sm !default;\n\n$input-padding-y-lg:                    $input-btn-padding-y-lg !default;\n$input-padding-x-lg:                    $input-btn-padding-x-lg !default;\n$input-font-size-lg:                    $input-btn-font-size-lg !default;\n\n$input-bg:                              $white !default;\n$input-disabled-bg:                     $gray-200 !default;\n$input-disabled-border-color:           null !default;\n\n$input-color:                           $body-color !default;\n$input-border-color:                    $gray-400 !default;\n$input-border-width:                    $input-btn-border-width !default;\n$input-box-shadow:                      $box-shadow-inset !default;\n\n$input-border-radius:                   $border-radius !default;\n$input-border-radius-sm:                $border-radius-sm !default;\n$input-border-radius-lg:                $border-radius-lg !default;\n\n$input-focus-bg:                        $input-bg !default;\n$input-focus-border-color:              tint-color($component-active-bg, 50%) !default;\n$input-focus-color:                     $input-color !default;\n$input-focus-width:                     $input-btn-focus-width !default;\n$input-focus-box-shadow:                $input-btn-focus-box-shadow !default;\n\n$input-placeholder-color:               $gray-600 !default;\n$input-plaintext-color:                 $body-color !default;\n\n$input-height-border:                   $input-border-width * 2 !default;\n\n$input-height-inner:                    add($input-line-height * 1em, $input-padding-y * 2) !default;\n$input-height-inner-half:               add($input-line-height * .5em, $input-padding-y) !default;\n$input-height-inner-quarter:            add($input-line-height * .25em, $input-padding-y / 2) !default;\n\n$input-height:                          add($input-line-height * 1em, add($input-padding-y * 2, $input-height-border, false)) !default;\n$input-height-sm:                       add($input-line-height * 1em, add($input-padding-y-sm * 2, $input-height-border, false)) !default;\n$input-height-lg:                       add($input-line-height * 1em, add($input-padding-y-lg * 2, $input-height-border, false)) !default;\n\n$input-transition:                      border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;\n// scss-docs-end form-input-variables\n\n// scss-docs-start form-check-variables\n$form-check-input-width:                  1em !default;\n$form-check-min-height:                   $font-size-base * $line-height-base !default;\n$form-check-padding-start:                $form-check-input-width + .5em !default;\n$form-check-margin-bottom:                .125rem !default;\n$form-check-label-color:                  null !default;\n$form-check-label-cursor:                 null !default;\n$form-check-transition:                   null !default;\n\n$form-check-input-active-filter:          brightness(90%) !default;\n\n$form-check-input-bg:                     $input-bg !default;\n$form-check-input-border:                 1px solid rgba($black, .25) !default;\n$form-check-input-border-radius:          .25em !default;\n$form-check-radio-border-radius:          50% !default;\n$form-check-input-focus-border:           $input-focus-border-color !default;\n$form-check-input-focus-box-shadow:       $input-btn-focus-box-shadow !default;\n\n$form-check-input-checked-color:          $component-active-color !default;\n$form-check-input-checked-bg-color:       $component-active-bg !default;\n$form-check-input-checked-border-color:   $form-check-input-checked-bg-color !default;\n$form-check-input-checked-bg-image:       url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-checked-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/></svg>\") !default;\n$form-check-radio-checked-bg-image:       url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#{$form-check-input-checked-color}'/></svg>\") !default;\n\n$form-check-input-indeterminate-color:          $component-active-color !default;\n$form-check-input-indeterminate-bg-color:       $component-active-bg !default;\n$form-check-input-indeterminate-border-color:   $form-check-input-indeterminate-bg-color !default;\n$form-check-input-indeterminate-bg-image:       url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#{$form-check-input-indeterminate-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/></svg>\") !default;\n\n$form-check-input-disabled-opacity:        .5 !default;\n$form-check-label-disabled-opacity:        $form-check-input-disabled-opacity !default;\n$form-check-btn-check-disabled-opacity:    $btn-disabled-opacity !default;\n\n$form-check-inline-margin-end:    1rem !default;\n// scss-docs-end form-check-variables\n\n// scss-docs-start form-switch-variables\n$form-switch-color:               rgba(0, 0, 0, .25) !default;\n$form-switch-width:               2em !default;\n$form-switch-padding-start:       $form-switch-width + .5em !default;\n$form-switch-bg-image:            url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-color}'/></svg>\") !default;\n$form-switch-border-radius:       $form-switch-width !default;\n$form-switch-transition:          background-position .15s ease-in-out !default;\n\n$form-switch-focus-color:         $input-focus-border-color !default;\n$form-switch-focus-bg-image:      url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-focus-color}'/></svg>\") !default;\n\n$form-switch-checked-color:       $component-active-color !default;\n$form-switch-checked-bg-image:    url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#{$form-switch-checked-color}'/></svg>\") !default;\n$form-switch-checked-bg-position: right center !default;\n// scss-docs-end form-switch-variables\n\n// scss-docs-start input-group-variables\n$input-group-addon-padding-y:           $input-padding-y !default;\n$input-group-addon-padding-x:           $input-padding-x !default;\n$input-group-addon-font-weight:         $input-font-weight !default;\n$input-group-addon-color:               $input-color !default;\n$input-group-addon-bg:                  $gray-200 !default;\n$input-group-addon-border-color:        $input-border-color !default;\n// scss-docs-end input-group-variables\n\n// scss-docs-start form-select-variables\n$form-select-padding-y:             $input-padding-y !default;\n$form-select-padding-x:             $input-padding-x !default;\n$form-select-font-family:           $input-font-family !default;\n$form-select-font-size:             $input-font-size !default;\n$form-select-indicator-padding:     $form-select-padding-x * 3 !default; // Extra padding for background-image\n$form-select-font-weight:           $input-font-weight !default;\n$form-select-line-height:           $input-line-height !default;\n$form-select-color:                 $input-color !default;\n$form-select-bg:                    $input-bg !default;\n$form-select-disabled-color:        null !default;\n$form-select-disabled-bg:           $gray-200 !default;\n$form-select-disabled-border-color: $input-disabled-border-color !default;\n$form-select-bg-position:           right $form-select-padding-x center !default;\n$form-select-bg-size:               16px 12px !default; // In pixels because image dimensions\n$form-select-indicator-color:       $gray-800 !default;\n$form-select-indicator:             url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='#{$form-select-indicator-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>\") !default;\n\n$form-select-feedback-icon-padding-end: $form-select-padding-x * 2.5 + $form-select-indicator-padding !default;\n$form-select-feedback-icon-position:    center right $form-select-indicator-padding !default;\n$form-select-feedback-icon-size:        $input-height-inner-half $input-height-inner-half !default;\n\n$form-select-border-width:        $input-border-width !default;\n$form-select-border-color:        $input-border-color !default;\n$form-select-border-radius:       $border-radius !default;\n$form-select-box-shadow:          $box-shadow-inset !default;\n\n$form-select-focus-border-color:  $input-focus-border-color !default;\n$form-select-focus-width:         $input-focus-width !default;\n$form-select-focus-box-shadow:    0 0 0 $form-select-focus-width $input-btn-focus-color !default;\n\n$form-select-padding-y-sm:        $input-padding-y-sm !default;\n$form-select-padding-x-sm:        $input-padding-x-sm !default;\n$form-select-font-size-sm:        $input-font-size-sm !default;\n\n$form-select-padding-y-lg:        $input-padding-y-lg !default;\n$form-select-padding-x-lg:        $input-padding-x-lg !default;\n$form-select-font-size-lg:        $input-font-size-lg !default;\n// scss-docs-end form-select-variables\n\n// scss-docs-start form-range-variables\n$form-range-track-width:          100% !default;\n$form-range-track-height:         .5rem !default;\n$form-range-track-cursor:         pointer !default;\n$form-range-track-bg:             $gray-300 !default;\n$form-range-track-border-radius:  1rem !default;\n$form-range-track-box-shadow:     $box-shadow-inset !default;\n\n$form-range-thumb-width:                   1rem !default;\n$form-range-thumb-height:                  $form-range-thumb-width !default;\n$form-range-thumb-bg:                      $component-active-bg !default;\n$form-range-thumb-border:                  0 !default;\n$form-range-thumb-border-radius:           1rem !default;\n$form-range-thumb-box-shadow:              0 .1rem .25rem rgba($black, .1) !default;\n$form-range-thumb-focus-box-shadow:        0 0 0 1px $body-bg, $input-focus-box-shadow !default;\n$form-range-thumb-focus-box-shadow-width:  $input-focus-width !default; // For focus box shadow issue in Edge\n$form-range-thumb-active-bg:               tint-color($component-active-bg, 70%) !default;\n$form-range-thumb-disabled-bg:             $gray-500 !default;\n$form-range-thumb-transition:              background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;\n// scss-docs-end form-range-variables\n\n// scss-docs-start form-file-variables\n$form-file-button-color:          $input-color !default;\n$form-file-button-bg:             $input-group-addon-bg !default;\n$form-file-button-hover-bg:       shade-color($form-file-button-bg, 5%) !default;\n// scss-docs-end form-file-variables\n\n// scss-docs-start form-floating-variables\n$form-floating-height:            add(3.5rem, $input-height-border) !default;\n$form-floating-padding-x:         $input-padding-x !default;\n$form-floating-padding-y:         1rem !default;\n$form-floating-input-padding-t:   1.625rem !default;\n$form-floating-input-padding-b:   .625rem !default;\n$form-floating-label-opacity:     .65 !default;\n$form-floating-label-transform:   scale(.85) translateY(-.5rem) translateX(.15rem) !default;\n$form-floating-transition:        opacity .1s ease-in-out, transform .1s ease-in-out !default;\n// scss-docs-end form-floating-variables\n\n// Form validation\n\n// scss-docs-start form-feedback-variables\n$form-feedback-margin-top:          $form-text-margin-top !default;\n$form-feedback-font-size:           $form-text-font-size !default;\n$form-feedback-font-style:          $form-text-font-style !default;\n$form-feedback-valid-color:         $success !default;\n$form-feedback-invalid-color:       $danger !default;\n\n$form-feedback-icon-valid-color:    $form-feedback-valid-color !default;\n$form-feedback-icon-valid:          url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#{$form-feedback-icon-valid-color}' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>\") !default;\n$form-feedback-icon-invalid-color:  $form-feedback-invalid-color !default;\n$form-feedback-icon-invalid:        url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='#{$form-feedback-icon-invalid-color}'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='#{$form-feedback-icon-invalid-color}' stroke='none'/></svg>\") !default;\n// scss-docs-end form-feedback-variables\n\n// scss-docs-start form-validation-states\n$form-validation-states: (\n  \"valid\": (\n    \"color\": $form-feedback-valid-color,\n    \"icon\": $form-feedback-icon-valid\n  ),\n  \"invalid\": (\n    \"color\": $form-feedback-invalid-color,\n    \"icon\": $form-feedback-icon-invalid\n  )\n) !default;\n// scss-docs-end form-validation-states\n\n// Z-index master list\n//\n// Warning: Avoid customizing these values. They're used for a bird's eye view\n// of components dependent on the z-axis and are designed to all work together.\n\n// scss-docs-start zindex-stack\n$zindex-dropdown:                   1000 !default;\n$zindex-sticky:                     1020 !default;\n$zindex-fixed:                      1030 !default;\n$zindex-modal-backdrop:             1040 !default;\n$zindex-offcanvas:                  1050 !default;\n$zindex-modal:                      1060 !default;\n$zindex-popover:                    1070 !default;\n$zindex-tooltip:                    1080 !default;\n// scss-docs-end zindex-stack\n\n\n// Navs\n\n// scss-docs-start nav-variables\n$nav-link-padding-y:                .5rem !default;\n$nav-link-padding-x:                1rem !default;\n$nav-link-font-size:                null !default;\n$nav-link-font-weight:              null !default;\n$nav-link-color:                    $link-color !default;\n$nav-link-hover-color:              $link-hover-color !default;\n$nav-link-transition:               color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out !default;\n$nav-link-disabled-color:           $gray-600 !default;\n\n$nav-tabs-border-color:             $gray-300 !default;\n$nav-tabs-border-width:             $border-width !default;\n$nav-tabs-border-radius:            $border-radius !default;\n$nav-tabs-link-hover-border-color:  $gray-200 $gray-200 $nav-tabs-border-color !default;\n$nav-tabs-link-active-color:        $gray-700 !default;\n$nav-tabs-link-active-bg:           $body-bg !default;\n$nav-tabs-link-active-border-color: $gray-300 $gray-300 $nav-tabs-link-active-bg !default;\n\n$nav-pills-border-radius:           $border-radius !default;\n$nav-pills-link-active-color:       $component-active-color !default;\n$nav-pills-link-active-bg:          $component-active-bg !default;\n// scss-docs-end nav-variables\n\n\n// Navbar\n\n// scss-docs-start navbar-variables\n$navbar-padding-y:                  $spacer / 2 !default;\n$navbar-padding-x:                  null !default;\n\n$navbar-nav-link-padding-x:         .5rem !default;\n\n$navbar-brand-font-size:            $font-size-lg !default;\n// Compute the navbar-brand padding-y so the navbar-brand will have the same height as navbar-text and nav-link\n$nav-link-height:                   $font-size-base * $line-height-base + $nav-link-padding-y * 2 !default;\n$navbar-brand-height:               $navbar-brand-font-size * $line-height-base !default;\n$navbar-brand-padding-y:            ($nav-link-height - $navbar-brand-height) / 2 !default;\n$navbar-brand-margin-end:           1rem !default;\n\n$navbar-toggler-padding-y:          .25rem !default;\n$navbar-toggler-padding-x:          .75rem !default;\n$navbar-toggler-font-size:          $font-size-lg !default;\n$navbar-toggler-border-radius:      $btn-border-radius !default;\n$navbar-toggler-focus-width:        $btn-focus-width !default;\n$navbar-toggler-transition:         box-shadow .15s ease-in-out !default;\n// scss-docs-end navbar-variables\n\n// scss-docs-start navbar-theme-variables\n$navbar-dark-color:                 rgba($white, .55) !default;\n$navbar-dark-hover-color:           rgba($white, .75) !default;\n$navbar-dark-active-color:          $white !default;\n$navbar-dark-disabled-color:        rgba($white, .25) !default;\n$navbar-dark-toggler-icon-bg:       url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-dark-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>\") !default;\n$navbar-dark-toggler-border-color:  rgba($white, .1) !default;\n\n$navbar-light-color:                rgba($black, .55) !default;\n$navbar-light-hover-color:          rgba($black, .7) !default;\n$navbar-light-active-color:         rgba($black, .9) !default;\n$navbar-light-disabled-color:       rgba($black, .3) !default;\n$navbar-light-toggler-icon-bg:      url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='#{$navbar-light-color}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>\") !default;\n$navbar-light-toggler-border-color: rgba($black, .1) !default;\n\n$navbar-light-brand-color:                $navbar-light-active-color !default;\n$navbar-light-brand-hover-color:          $navbar-light-active-color !default;\n$navbar-dark-brand-color:                 $navbar-dark-active-color !default;\n$navbar-dark-brand-hover-color:           $navbar-dark-active-color !default;\n// scss-docs-end navbar-theme-variables\n\n\n// Dropdowns\n//\n// Dropdown menu container and contents.\n\n// scss-docs-start dropdown-variables\n$dropdown-min-width:                10rem !default;\n$dropdown-padding-x:                0 !default;\n$dropdown-padding-y:                .5rem !default;\n$dropdown-spacer:                   .125rem !default;\n$dropdown-font-size:                $font-size-base !default;\n$dropdown-color:                    $body-color !default;\n$dropdown-bg:                       $white !default;\n$dropdown-border-color:             rgba($black, .15) !default;\n$dropdown-border-radius:            $border-radius !default;\n$dropdown-border-width:             $border-width !default;\n$dropdown-inner-border-radius:      subtract($dropdown-border-radius, $dropdown-border-width) !default;\n$dropdown-divider-bg:               $dropdown-border-color !default;\n$dropdown-divider-margin-y:         $spacer / 2 !default;\n$dropdown-box-shadow:               $box-shadow !default;\n\n$dropdown-link-color:               $gray-900 !default;\n$dropdown-link-hover-color:         shade-color($gray-900, 10%) !default;\n$dropdown-link-hover-bg:            $gray-200 !default;\n\n$dropdown-link-active-color:        $component-active-color !default;\n$dropdown-link-active-bg:           $component-active-bg !default;\n\n$dropdown-link-disabled-color:      $gray-500 !default;\n\n$dropdown-item-padding-y:           $spacer / 4 !default;\n$dropdown-item-padding-x:           $spacer !default;\n\n$dropdown-header-color:             $gray-600 !default;\n$dropdown-header-padding:           $dropdown-padding-y $dropdown-item-padding-x !default;\n// scss-docs-end dropdown-variables\n\n// scss-docs-start dropdown-dark-variables\n$dropdown-dark-color:               $gray-300 !default;\n$dropdown-dark-bg:                  $gray-800 !default;\n$dropdown-dark-border-color:        $dropdown-border-color !default;\n$dropdown-dark-divider-bg:          $dropdown-divider-bg !default;\n$dropdown-dark-box-shadow:          null !default;\n$dropdown-dark-link-color:          $dropdown-dark-color !default;\n$dropdown-dark-link-hover-color:    $white !default;\n$dropdown-dark-link-hover-bg:       rgba($white, .15) !default;\n$dropdown-dark-link-active-color:   $dropdown-link-active-color !default;\n$dropdown-dark-link-active-bg:      $dropdown-link-active-bg !default;\n$dropdown-dark-link-disabled-color: $gray-500 !default;\n$dropdown-dark-header-color:        $gray-500 !default;\n// scss-docs-end dropdown-dark-variables\n\n\n// Pagination\n\n// scss-docs-start pagination-variables\n$pagination-padding-y:              .375rem !default;\n$pagination-padding-x:              .75rem !default;\n$pagination-padding-y-sm:           .25rem !default;\n$pagination-padding-x-sm:           .5rem !default;\n$pagination-padding-y-lg:           .75rem !default;\n$pagination-padding-x-lg:           1.5rem !default;\n\n$pagination-color:                  $link-color !default;\n$pagination-bg:                     $white !default;\n$pagination-border-width:           $border-width !default;\n$pagination-border-radius:          $border-radius !default;\n$pagination-margin-start:           -$pagination-border-width !default;\n$pagination-border-color:           $gray-300 !default;\n\n$pagination-focus-color:            $link-hover-color !default;\n$pagination-focus-bg:               $gray-200 !default;\n$pagination-focus-box-shadow:       $input-btn-focus-box-shadow !default;\n$pagination-focus-outline:          0 !default;\n\n$pagination-hover-color:            $link-hover-color !default;\n$pagination-hover-bg:               $gray-200 !default;\n$pagination-hover-border-color:     $gray-300 !default;\n\n$pagination-active-color:           $component-active-color !default;\n$pagination-active-bg:              $component-active-bg !default;\n$pagination-active-border-color:    $pagination-active-bg !default;\n\n$pagination-disabled-color:         $gray-600 !default;\n$pagination-disabled-bg:            $white !default;\n$pagination-disabled-border-color:  $gray-300 !default;\n\n$pagination-transition:              color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;\n\n$pagination-border-radius-sm:       $border-radius-sm !default;\n$pagination-border-radius-lg:       $border-radius-lg !default;\n// scss-docs-end pagination-variables\n\n\n// Cards\n\n// scss-docs-start card-variables\n$card-spacer-y:                     $spacer !default;\n$card-spacer-x:                     $spacer !default;\n$card-title-spacer-y:               $spacer / 2 !default;\n$card-border-width:                 $border-width !default;\n$card-border-radius:                $border-radius !default;\n$card-border-color:                 rgba($black, .125) !default;\n$card-inner-border-radius:          subtract($card-border-radius, $card-border-width) !default;\n$card-cap-padding-y:                $card-spacer-y / 2 !default;\n$card-cap-padding-x:                $card-spacer-x !default;\n$card-cap-bg:                       rgba($black, .03) !default;\n$card-cap-color:                    null !default;\n$card-height:                       null !default;\n$card-color:                        null !default;\n$card-bg:                           $white !default;\n$card-img-overlay-padding:          $spacer !default;\n$card-group-margin:                 $grid-gutter-width / 2 !default;\n// scss-docs-end card-variables\n\n// Accordion\n\n// scss-docs-start accordion-variables\n$accordion-padding-y:                     1rem !default;\n$accordion-padding-x:                     1.25rem !default;\n$accordion-color:                         $body-color !default;\n$accordion-bg:                            $body-bg !default;\n$accordion-border-width:                  $border-width !default;\n$accordion-border-color:                  rgba($black, .125) !default;\n$accordion-border-radius:                 $border-radius !default;\n$accordion-inner-border-radius:           subtract($accordion-border-radius, $accordion-border-width) !default;\n\n$accordion-body-padding-y:                $accordion-padding-y !default;\n$accordion-body-padding-x:                $accordion-padding-x !default;\n\n$accordion-button-padding-y:              $accordion-padding-y !default;\n$accordion-button-padding-x:              $accordion-padding-x !default;\n$accordion-button-color:                  $accordion-color !default;\n$accordion-button-bg:                     $accordion-bg !default;\n$accordion-transition:                    $btn-transition, border-radius .15s ease !default;\n$accordion-button-active-bg:              tint-color($component-active-bg, 90%) !default;\n$accordion-button-active-color:           shade-color($primary, 10%) !default;\n\n$accordion-button-focus-border-color:     $input-focus-border-color !default;\n$accordion-button-focus-box-shadow:       $btn-focus-box-shadow !default;\n\n$accordion-icon-width:                    1.25rem !default;\n$accordion-icon-color:                    $accordion-color !default;\n$accordion-icon-active-color:             $accordion-button-active-color !default;\n$accordion-icon-transition:               transform .2s ease-in-out !default;\n$accordion-icon-transform:                rotate(-180deg) !default;\n\n$accordion-button-icon:         url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$accordion-icon-color}'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>\") !default;\n$accordion-button-active-icon:  url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$accordion-icon-active-color}'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>\") !default;\n// scss-docs-end accordion-variables\n\n// Tooltips\n\n// scss-docs-start tooltip-variables\n$tooltip-font-size:                 $font-size-sm !default;\n$tooltip-max-width:                 200px !default;\n$tooltip-color:                     $white !default;\n$tooltip-bg:                        $black !default;\n$tooltip-border-radius:             $border-radius !default;\n$tooltip-opacity:                   .9 !default;\n$tooltip-padding-y:                 $spacer / 4 !default;\n$tooltip-padding-x:                 $spacer / 2 !default;\n$tooltip-margin:                    0 !default;\n\n$tooltip-arrow-width:               .8rem !default;\n$tooltip-arrow-height:              .4rem !default;\n$tooltip-arrow-color:               $tooltip-bg !default;\n// scss-docs-end tooltip-variables\n\n// Form tooltips must come after regular tooltips\n// scss-docs-start tooltip-feedback-variables\n$form-feedback-tooltip-padding-y:     $tooltip-padding-y !default;\n$form-feedback-tooltip-padding-x:     $tooltip-padding-x !default;\n$form-feedback-tooltip-font-size:     $tooltip-font-size !default;\n$form-feedback-tooltip-line-height:   null !default;\n$form-feedback-tooltip-opacity:       $tooltip-opacity !default;\n$form-feedback-tooltip-border-radius: $tooltip-border-radius !default;\n// scss-docs-start tooltip-feedback-variables\n\n\n// Popovers\n\n// scss-docs-start popover-variables\n$popover-font-size:                 $font-size-sm !default;\n$popover-bg:                        $white !default;\n$popover-max-width:                 276px !default;\n$popover-border-width:              $border-width !default;\n$popover-border-color:              rgba($black, .2) !default;\n$popover-border-radius:             $border-radius-lg !default;\n$popover-inner-border-radius:       subtract($popover-border-radius, $popover-border-width) !default;\n$popover-box-shadow:                $box-shadow !default;\n\n$popover-header-bg:                 shade-color($popover-bg, 6%) !default;\n$popover-header-color:              $headings-color !default;\n$popover-header-padding-y:          .5rem !default;\n$popover-header-padding-x:          $spacer !default;\n\n$popover-body-color:                $body-color !default;\n$popover-body-padding-y:            $spacer !default;\n$popover-body-padding-x:            $spacer !default;\n\n$popover-arrow-width:               1rem !default;\n$popover-arrow-height:              .5rem !default;\n$popover-arrow-color:               $popover-bg !default;\n\n$popover-arrow-outer-color:         fade-in($popover-border-color, .05) !default;\n// scss-docs-end popover-variables\n\n\n// Toasts\n\n// scss-docs-start toast-variables\n$toast-max-width:                   350px !default;\n$toast-padding-x:                   .75rem !default;\n$toast-padding-y:                   .5rem !default;\n$toast-font-size:                   .875rem !default;\n$toast-color:                       null !default;\n$toast-background-color:            rgba($white, .85) !default;\n$toast-border-width:                1px !default;\n$toast-border-color:                rgba(0, 0, 0, .1) !default;\n$toast-border-radius:               $border-radius !default;\n$toast-box-shadow:                  $box-shadow !default;\n$toast-spacing:                     $container-padding-x !default;\n\n$toast-header-color:                $gray-600 !default;\n$toast-header-background-color:     rgba($white, .85) !default;\n$toast-header-border-color:         rgba(0, 0, 0, .05) !default;\n// scss-docs-end toast-variables\n\n\n// Badges\n\n// scss-docs-start badge-variables\n$badge-font-size:                   .75em !default;\n$badge-font-weight:                 $font-weight-bold !default;\n$badge-color:                       $white !default;\n$badge-padding-y:                   .35em !default;\n$badge-padding-x:                   .65em !default;\n$badge-border-radius:               $border-radius !default;\n// scss-docs-end badge-variables\n\n\n// Modals\n\n// scss-docs-start modal-variables\n$modal-inner-padding:               $spacer !default;\n\n$modal-footer-margin-between:       .5rem !default;\n\n$modal-dialog-margin:               .5rem !default;\n$modal-dialog-margin-y-sm-up:       1.75rem !default;\n\n$modal-title-line-height:           $line-height-base !default;\n\n$modal-content-color:               null !default;\n$modal-content-bg:                  $white !default;\n$modal-content-border-color:        rgba($black, .2) !default;\n$modal-content-border-width:        $border-width !default;\n$modal-content-border-radius:       $border-radius-lg !default;\n$modal-content-inner-border-radius: subtract($modal-content-border-radius, $modal-content-border-width) !default;\n$modal-content-box-shadow-xs:       $box-shadow-sm !default;\n$modal-content-box-shadow-sm-up:    $box-shadow !default;\n\n$modal-backdrop-bg:                 $black !default;\n$modal-backdrop-opacity:            .5 !default;\n$modal-header-border-color:         $border-color !default;\n$modal-footer-border-color:         $modal-header-border-color !default;\n$modal-header-border-width:         $modal-content-border-width !default;\n$modal-footer-border-width:         $modal-header-border-width !default;\n$modal-header-padding-y:            $modal-inner-padding !default;\n$modal-header-padding-x:            $modal-inner-padding !default;\n$modal-header-padding:              $modal-header-padding-y $modal-header-padding-x !default; // Keep this for backwards compatibility\n\n$modal-sm:                          300px !default;\n$modal-md:                          500px !default;\n$modal-lg:                          800px !default;\n$modal-xl:                          1140px !default;\n\n$modal-fade-transform:              translate(0, -50px) !default;\n$modal-show-transform:              none !default;\n$modal-transition:                  transform .3s ease-out !default;\n$modal-scale-transform:             scale(1.02) !default;\n// scss-docs-end modal-variables\n\n\n// Alerts\n//\n// Define alert colors, border radius, and padding.\n\n// scss-docs-start alert-variables\n$alert-padding-y:               $spacer !default;\n$alert-padding-x:               $spacer !default;\n$alert-margin-bottom:           1rem !default;\n$alert-border-radius:           $border-radius !default;\n$alert-link-font-weight:        $font-weight-bold !default;\n$alert-border-width:            $border-width !default;\n$alert-bg-scale:                -80% !default;\n$alert-border-scale:            -70% !default;\n$alert-color-scale:             40% !default;\n$alert-dismissible-padding-r:   $alert-padding-x * 3 !default; // 3x covers width of x plus default padding on either side\n// scss-docs-end alert-variables\n\n\n// Progress bars\n\n// scss-docs-start progress-variables\n$progress-height:                   1rem !default;\n$progress-font-size:                $font-size-base * .75 !default;\n$progress-bg:                       $gray-200 !default;\n$progress-border-radius:            $border-radius !default;\n$progress-box-shadow:               $box-shadow-inset !default;\n$progress-bar-color:                $white !default;\n$progress-bar-bg:                   $primary !default;\n$progress-bar-animation-timing:     1s linear infinite !default;\n$progress-bar-transition:           width .6s ease !default;\n// scss-docs-end progress-variables\n\n\n// List group\n\n// scss-docs-start list-group-variables\n$list-group-color:                  $gray-900 !default;\n$list-group-bg:                     $white !default;\n$list-group-border-color:           rgba($black, .125) !default;\n$list-group-border-width:           $border-width !default;\n$list-group-border-radius:          $border-radius !default;\n\n$list-group-item-padding-y:         $spacer / 2 !default;\n$list-group-item-padding-x:         $spacer !default;\n$list-group-item-bg-scale:          -80% !default;\n$list-group-item-color-scale:       40% !default;\n\n$list-group-hover-bg:               $gray-100 !default;\n$list-group-active-color:           $component-active-color !default;\n$list-group-active-bg:              $component-active-bg !default;\n$list-group-active-border-color:    $list-group-active-bg !default;\n\n$list-group-disabled-color:         $gray-600 !default;\n$list-group-disabled-bg:            $list-group-bg !default;\n\n$list-group-action-color:           $gray-700 !default;\n$list-group-action-hover-color:     $list-group-action-color !default;\n\n$list-group-action-active-color:    $body-color !default;\n$list-group-action-active-bg:       $gray-200 !default;\n// scss-docs-end list-group-variables\n\n\n// Image thumbnails\n\n// scss-docs-start thumbnail-variables\n$thumbnail-padding:                 .25rem !default;\n$thumbnail-bg:                      $body-bg !default;\n$thumbnail-border-width:            $border-width !default;\n$thumbnail-border-color:            $gray-300 !default;\n$thumbnail-border-radius:           $border-radius !default;\n$thumbnail-box-shadow:              $box-shadow-sm !default;\n// scss-docs-end thumbnail-variables\n\n\n// Figures\n\n// scss-docs-start figure-variables\n$figure-caption-font-size:          $small-font-size !default;\n$figure-caption-color:              $gray-600 !default;\n// scss-docs-end figure-variables\n\n\n// Breadcrumbs\n\n// scss-docs-start breadcrumb-variables\n$breadcrumb-font-size:              null !default;\n$breadcrumb-padding-y:              0 !default;\n$breadcrumb-padding-x:              0 !default;\n$breadcrumb-item-padding-x:         .5rem !default;\n$breadcrumb-margin-bottom:          1rem !default;\n$breadcrumb-bg:                     null !default;\n$breadcrumb-divider-color:          $gray-600 !default;\n$breadcrumb-active-color:           $gray-600 !default;\n$breadcrumb-divider:                quote(\"/\") !default;\n$breadcrumb-divider-flipped:        $breadcrumb-divider !default;\n$breadcrumb-border-radius:          null !default;\n// scss-docs-end breadcrumb-variables\n\n// Carousel\n\n// scss-docs-start carousel-variables\n$carousel-control-color:             $white !default;\n$carousel-control-width:             15% !default;\n$carousel-control-opacity:           .5 !default;\n$carousel-control-hover-opacity:     .9 !default;\n$carousel-control-transition:        opacity .15s ease !default;\n\n$carousel-indicator-width:           30px !default;\n$carousel-indicator-height:          3px !default;\n$carousel-indicator-hit-area-height: 10px !default;\n$carousel-indicator-spacer:          3px !default;\n$carousel-indicator-opacity:         .5 !default;\n$carousel-indicator-active-bg:       $white !default;\n$carousel-indicator-active-opacity:  1 !default;\n$carousel-indicator-transition:      opacity .6s ease !default;\n\n$carousel-caption-width:             70% !default;\n$carousel-caption-color:             $white !default;\n$carousel-caption-padding-y:         1.25rem !default;\n$carousel-caption-spacer:            1.25rem !default;\n\n$carousel-control-icon-width:        2rem !default;\n\n$carousel-control-prev-icon-bg:      url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$carousel-control-color}'><path d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/></svg>\") !default;\n$carousel-control-next-icon-bg:      url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$carousel-control-color}'><path d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/></svg>\") !default;\n\n$carousel-transition-duration:       .6s !default;\n$carousel-transition:                transform $carousel-transition-duration ease-in-out !default; // Define transform transition first if using multiple transitions (e.g., `transform 2s ease, opacity .5s ease-out`)\n\n$carousel-dark-indicator-active-bg:  $black !default;\n$carousel-dark-caption-color:        $black !default;\n$carousel-dark-control-icon-filter:  invert(1) grayscale(100) !default;\n// scss-docs-end carousel-variables\n\n\n// Spinners\n\n// scss-docs-start spinner-variables\n$spinner-width:           2rem !default;\n$spinner-height:          $spinner-width !default;\n$spinner-vertical-align:  -.125em !default;\n$spinner-border-width:    .25em !default;\n$spinner-animation-speed: .75s !default;\n\n$spinner-width-sm:        1rem !default;\n$spinner-height-sm:       $spinner-width-sm !default;\n$spinner-border-width-sm: .2em !default;\n// scss-docs-end spinner-variables\n\n\n// Close\n\n// scss-docs-start close-variables\n$btn-close-width:            1em !default;\n$btn-close-height:           $btn-close-width !default;\n$btn-close-padding-x:        .25em !default;\n$btn-close-padding-y:        $btn-close-padding-x !default;\n$btn-close-color:            $black !default;\n$btn-close-bg:               url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$btn-close-color}'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg>\") !default;\n$btn-close-focus-shadow:     $input-btn-focus-box-shadow !default;\n$btn-close-opacity:          .5 !default;\n$btn-close-hover-opacity:    .75 !default;\n$btn-close-focus-opacity:    1 !default;\n$btn-close-disabled-opacity: .25 !default;\n$btn-close-white-filter:     invert(1) grayscale(100%) brightness(200%) !default;\n// scss-docs-end close-variables\n\n\n// Offcanvas\n\n// scss-docs-start offcanvas-variables\n$offcanvas-padding-y:               $modal-inner-padding !default;\n$offcanvas-padding-x:               $modal-inner-padding !default;\n$offcanvas-horizontal-width:        400px !default;\n$offcanvas-vertical-height:         30vh !default;\n$offcanvas-transition-duration:     .3s !default;\n$offcanvas-border-color:            $modal-content-border-color !default;\n$offcanvas-border-width:            $modal-content-border-width !default;\n$offcanvas-title-line-height:       $modal-title-line-height !default;\n$offcanvas-bg-color:                $modal-content-bg !default;\n$offcanvas-color:                   $modal-content-color !default;\n$offcanvas-box-shadow:              $modal-content-box-shadow-xs !default;\n// scss-docs-end offcanvas-variables\n\n// Code\n\n$code-font-size:                    $small-font-size !default;\n$code-color:                        $pink !default;\n\n$kbd-padding-y:                     .2rem !default;\n$kbd-padding-x:                     .4rem !default;\n$kbd-font-size:                     $code-font-size !default;\n$kbd-color:                         $white !default;\n$kbd-bg:                            $gray-900 !default;\n\n$pre-color:                         null !default;\n","// stylelint-disable property-blacklist, scss/dollar-variable-default\n\n// SCSS RFS mixin\n//\n// Automated responsive values for font sizes, paddings, margins and much more\n//\n// Licensed under MIT (https://github.com/twbs/rfs/blob/master/LICENSE)\n\n// Configuration\n\n// Base value\n$rfs-base-value: 1.25rem !default;\n$rfs-unit: rem !default;\n\n@if $rfs-unit != rem and $rfs-unit != px {\n  @error \"`#{$rfs-unit}` is not a valid unit for $rfs-unit. Use `px` or `rem`.\";\n}\n\n// Breakpoint at where values start decreasing if screen width is smaller\n$rfs-breakpoint: 1200px !default;\n$rfs-breakpoint-unit: px !default;\n\n@if $rfs-breakpoint-unit != px and $rfs-breakpoint-unit != em and $rfs-breakpoint-unit != rem {\n  @error \"`#{$rfs-breakpoint-unit}` is not a valid unit for $rfs-breakpoint-unit. Use `px`, `em` or `rem`.\";\n}\n\n// Resize values based on screen height and width\n$rfs-two-dimensional: false !default;\n\n// Factor of decrease\n$rfs-factor: 10 !default;\n\n@if type-of($rfs-factor) != number or $rfs-factor <= 1 {\n  @error \"`#{$rfs-factor}` is not a valid  $rfs-factor, it must be greater than 1.\";\n}\n\n// Mode. Possibilities: \"min-media-query\", \"max-media-query\"\n$rfs-mode: min-media-query !default;\n\n// Generate enable or disable classes. Possibilities: false, \"enable\" or \"disable\"\n$rfs-class: false !default;\n\n// 1 rem = $rfs-rem-value px\n$rfs-rem-value: 16 !default;\n\n// Safari iframe resize bug: https://github.com/twbs/rfs/issues/14\n$rfs-safari-iframe-resize-bug-fix: false !default;\n\n// Disable RFS by setting $enable-rfs to false\n$enable-rfs: true !default;\n\n// Cache $rfs-base-value unit\n$rfs-base-value-unit: unit($rfs-base-value);\n\n// Remove px-unit from $rfs-base-value for calculations\n@if $rfs-base-value-unit == px {\n  $rfs-base-value: $rfs-base-value / ($rfs-base-value * 0 + 1);\n}\n@else if $rfs-base-value-unit == rem {\n  $rfs-base-value: $rfs-base-value / ($rfs-base-value * 0 + 1 / $rfs-rem-value);\n}\n\n// Cache $rfs-breakpoint unit to prevent multiple calls\n$rfs-breakpoint-unit-cache: unit($rfs-breakpoint);\n\n// Remove unit from $rfs-breakpoint for calculations\n@if $rfs-breakpoint-unit-cache == px {\n  $rfs-breakpoint: $rfs-breakpoint / ($rfs-breakpoint * 0 + 1);\n}\n@else if $rfs-breakpoint-unit-cache == rem or $rfs-breakpoint-unit-cache == \"em\" {\n  $rfs-breakpoint: $rfs-breakpoint / ($rfs-breakpoint * 0 + 1 / $rfs-rem-value);\n}\n\n// Calculate the media query value\n$rfs-mq-value: if($rfs-breakpoint-unit == px, #{$rfs-breakpoint}px, #{$rfs-breakpoint / $rfs-rem-value}#{$rfs-breakpoint-unit});\n$rfs-mq-property-width: if($rfs-mode == max-media-query, max-width, min-width);\n$rfs-mq-property-height: if($rfs-mode == max-media-query, max-height, min-height);\n\n// Internal mixin used to determine which media query needs to be used\n@mixin _rfs-media-query {\n  @if $rfs-two-dimensional {\n    @if $rfs-mode == max-media-query {\n      @media (#{$rfs-mq-property-width}: #{$rfs-mq-value}), (#{$rfs-mq-property-height}: #{$rfs-mq-value}) {\n        @content;\n      }\n    }\n    @else {\n      @media (#{$rfs-mq-property-width}: #{$rfs-mq-value}) and (#{$rfs-mq-property-height}: #{$rfs-mq-value}) {\n        @content;\n      }\n    }\n  }\n  @else {\n    @media (#{$rfs-mq-property-width}: #{$rfs-mq-value}) {\n      @content;\n    }\n  }\n}\n\n// Internal mixin that adds disable classes to the selector if needed.\n@mixin _rfs-rule {\n  @if $rfs-class == disable and $rfs-mode == max-media-query {\n    // Adding an extra class increases specificity, which prevents the media query to override the property\n    &,\n    .disable-rfs &,\n    &.disable-rfs {\n      @content;\n    }\n  }\n  @else if $rfs-class == enable and $rfs-mode == min-media-query {\n    .enable-rfs &,\n    &.enable-rfs {\n      @content;\n    }\n  }\n  @else {\n    @content;\n  }\n}\n\n// Internal mixin that adds enable classes to the selector if needed.\n@mixin _rfs-media-query-rule {\n\n  @if $rfs-class == enable {\n    @if $rfs-mode == min-media-query {\n      @content;\n    }\n\n    @include _rfs-media-query {\n      .enable-rfs &,\n      &.enable-rfs {\n        @content;\n      }\n    }\n  }\n  @else {\n    @if $rfs-class == disable and $rfs-mode == min-media-query {\n      .disable-rfs &,\n      &.disable-rfs {\n        @content;\n      }\n    }\n    @include _rfs-media-query {\n      @content;\n    }\n  }\n}\n\n// Helper function to get the formatted non-responsive value\n@function rfs-value($values) {\n  // Convert to list\n  $values: if(type-of($values) != list, ($values,), $values);\n\n  $val: '';\n\n  // Loop over each value and calculate value\n  @each $value in $values {\n    @if $value == 0 {\n      $val: $val + ' 0';\n    }\n    @else {\n      // Cache $value unit\n      $unit: if(type-of($value) == \"number\", unit($value), false);\n\n      @if $unit == px {\n        // Convert to rem if needed\n        $val: $val + ' ' + if($rfs-unit == rem, #{$value / ($value * 0 + $rfs-rem-value)}rem, $value);\n      }\n      @else if $unit == rem {\n        // Convert to px if needed\n        $val: $val + ' ' + if($rfs-unit == px, #{$value / ($value * 0 + 1) * $rfs-rem-value}px, $value);\n      }\n      @else {\n        // If $value isn't a number (like inherit) or $value has a unit (not px or rem, like 1.5em) or $ is 0, just print the value\n        $val: $val + ' ' + $value;\n      }\n    }\n  }\n\n  // Remove first space\n  @return unquote(str-slice($val, 2));\n}\n\n// Helper function to get the responsive value calculated by RFS\n@function rfs-fluid-value($values) {\n  // Convert to list\n  $values: if(type-of($values) != list, ($values,), $values);\n\n  $val: '';\n\n  // Loop over each value and calculate value\n  @each $value in $values {\n    @if $value == 0 {\n      $val: $val + ' 0';\n    }\n\n    @else {\n      // Cache $value unit\n      $unit: if(type-of($value) == \"number\", unit($value), false);\n\n      // If $value isn't a number (like inherit) or $value has a unit (not px or rem, like 1.5em) or $ is 0, just print the value\n      @if not $unit or $unit != px and $unit != rem {\n        $val: $val + ' ' + $value;\n      }\n\n      @else {\n        // Remove unit from $value for calculations\n        $value: $value / ($value * 0 + if($unit == px, 1, 1 / $rfs-rem-value));\n\n        // Only add the media query if the value is greater than the minimum value\n        @if abs($value) <= $rfs-base-value or not $enable-rfs {\n          $val: $val + ' ' +  if($rfs-unit == rem, #{$value / $rfs-rem-value}rem, #{$value}px);\n        }\n        @else {\n          // Calculate the minimum value\n          $value-min: $rfs-base-value + (abs($value) - $rfs-base-value) / $rfs-factor;\n\n          // Calculate difference between $value and the minimum value\n          $value-diff: abs($value) - $value-min;\n\n          // Base value formatting\n          $min-width: if($rfs-unit == rem, #{$value-min / $rfs-rem-value}rem, #{$value-min}px);\n\n          // Use negative value if needed\n          $min-width: if($value < 0, -$min-width, $min-width);\n\n          // Use `vmin` if two-dimensional is enabled\n          $variable-unit: if($rfs-two-dimensional, vmin, vw);\n\n          // Calculate the variable width between 0 and $rfs-breakpoint\n          $variable-width: #{$value-diff * 100 / $rfs-breakpoint}#{$variable-unit};\n\n          // Return the calculated value\n          $val: $val + ' calc(' + $min-width + if($value < 0, ' - ', ' + ') + $variable-width + ')';\n        }\n      }\n    }\n  }\n\n  // Remove first space\n  @return unquote(str-slice($val, 2));\n}\n\n// RFS mixin\n@mixin rfs($values, $property: font-size) {\n  @if $values != null {\n    $val: rfs-value($values);\n    $fluidVal: rfs-fluid-value($values);\n\n    // Do not print the media query if responsive & non-responsive values are the same\n    @if $val == $fluidVal {\n      #{$property}: $val;\n    }\n    @else {\n      @include _rfs-rule {\n        #{$property}: if($rfs-mode == max-media-query, $val, $fluidVal);\n\n        // Include safari iframe resize fix if needed\n        min-width: if($rfs-safari-iframe-resize-bug-fix, (0 * 1vw), null);\n      }\n\n      @include _rfs-media-query-rule {\n        #{$property}: if($rfs-mode == max-media-query, $fluidVal, $val);\n      }\n    }\n  }\n}\n\n// Shorthand helper mixins\n@mixin font-size($value) {\n  @include rfs($value);\n}\n\n@mixin padding($value) {\n  @include rfs($value, padding);\n}\n\n@mixin padding-top($value) {\n  @include rfs($value, padding-top);\n}\n\n@mixin padding-right($value) {\n  @include rfs($value, padding-right);\n}\n\n@mixin padding-bottom($value) {\n  @include rfs($value, padding-bottom);\n}\n\n@mixin padding-left($value) {\n  @include rfs($value, padding-left);\n}\n\n@mixin margin($value) {\n  @include rfs($value, margin);\n}\n\n@mixin margin-top($value) {\n  @include rfs($value, margin-top);\n}\n\n@mixin margin-right($value) {\n  @include rfs($value, margin-right);\n}\n\n@mixin margin-bottom($value) {\n  @include rfs($value, margin-bottom);\n}\n\n@mixin margin-left($value) {\n  @include rfs($value, margin-left);\n}\n","// Bootstrap functions\n//\n// Utility mixins and functions for evaluating source code across our variables, maps, and mixins.\n\n// Ascending\n// Used to evaluate Sass maps like our grid breakpoints.\n@mixin _assert-ascending($map, $map-name) {\n  $prev-key: null;\n  $prev-num: null;\n  @each $key, $num in $map {\n    @if $prev-num == null or unit($num) == \"%\" or unit($prev-num) == \"%\" {\n      // Do nothing\n    } @else if not comparable($prev-num, $num) {\n      @warn \"Potentially invalid value for #{$map-name}: This map must be in ascending order, but key '#{$key}' has value #{$num} whose unit makes it incomparable to #{$prev-num}, the value of the previous key '#{$prev-key}' !\";\n    } @else if $prev-num >= $num {\n      @warn \"Invalid value for #{$map-name}: This map must be in ascending order, but key '#{$key}' has value #{$num} which isn't greater than #{$prev-num}, the value of the previous key '#{$prev-key}' !\";\n    }\n    $prev-key: $key;\n    $prev-num: $num;\n  }\n}\n\n// Starts at zero\n// Used to ensure the min-width of the lowest breakpoint starts at 0.\n@mixin _assert-starts-at-zero($map, $map-name: \"$grid-breakpoints\") {\n  @if length($map) > 0 {\n    $values: map-values($map);\n    $first-value: nth($values, 1);\n    @if $first-value != 0 {\n      @warn \"First breakpoint in #{$map-name} must start at 0, but starts at #{$first-value}.\";\n    }\n  }\n}\n\n// Internal Bootstrap function to turn maps into its negative variant.\n// It prefixes the keys with `n` and makes the value negative.\n@function negativify-map($map) {\n  $result: ();\n  @each $key, $value in $map {\n    @if $key != 0 {\n      $result: map-merge($result, (\"n\" + $key: (-$value)));\n    }\n  }\n  @return $result;\n}\n\n// Get multiple keys from a sass map\n@function map-get-multiple($map, $values) {\n  $result: ();\n  @each $key, $value in $map {\n    @if (index($values, $key) != null) {\n      $result: map-merge($result, ($key: $value));\n    }\n  }\n  @return $result;\n}\n\n// Replace `$search` with `$replace` in `$string`\n// Used on our SVG icon backgrounds for custom forms.\n//\n// @author Hugo Giraudel\n// @param {String} $string - Initial string\n// @param {String} $search - Substring to replace\n// @param {String} $replace ('') - New value\n// @return {String} - Updated string\n@function str-replace($string, $search, $replace: \"\") {\n  $index: str-index($string, $search);\n\n  @if $index {\n    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);\n  }\n\n  @return $string;\n}\n\n// See https://codepen.io/kevinweber/pen/dXWoRw\n//\n// Requires the use of quotes around data URIs.\n\n@function escape-svg($string) {\n  @if str-index($string, \"data:image/svg+xml\") {\n    @each $char, $encoded in $escaped-characters {\n      // Do not escape the url brackets\n      @if str-index($string, \"url(\") == 1 {\n        $string: url(\"#{str-replace(str-slice($string, 6, -3), $char, $encoded)}\");\n      } @else {\n        $string: str-replace($string, $char, $encoded);\n      }\n    }\n  }\n\n  @return $string;\n}\n\n// Color contrast\n// See https://github.com/twbs/bootstrap/pull/30168\n\n// A list of pre-calculated numbers of pow(($value / 255 + .055) / 1.055, 2.4). (from 0 to 255)\n// stylelint-disable-next-line scss/dollar-variable-default, scss/dollar-variable-pattern\n$_luminance-list: .0008 .001 .0011 .0013 .0015 .0017 .002 .0022 .0025 .0027 .003 .0033 .0037 .004 .0044 .0048 .0052 .0056 .006 .0065 .007 .0075 .008 .0086 .0091 .0097 .0103 .011 .0116 .0123 .013 .0137 .0144 .0152 .016 .0168 .0176 .0185 .0194 .0203 .0212 .0222 .0232 .0242 .0252 .0262 .0273 .0284 .0296 .0307 .0319 .0331 .0343 .0356 .0369 .0382 .0395 .0409 .0423 .0437 .0452 .0467 .0482 .0497 .0513 .0529 .0545 .0561 .0578 .0595 .0612 .063 .0648 .0666 .0685 .0704 .0723 .0742 .0762 .0782 .0802 .0823 .0844 .0865 .0887 .0908 .0931 .0953 .0976 .0999 .1022 .1046 .107 .1095 .1119 .1144 .117 .1195 .1221 .1248 .1274 .1301 .1329 .1356 .1384 .1413 .1441 .147 .15 .1529 .1559 .159 .162 .1651 .1683 .1714 .1746 .1779 .1812 .1845 .1878 .1912 .1946 .1981 .2016 .2051 .2086 .2122 .2159 .2195 .2232 .227 .2307 .2346 .2384 .2423 .2462 .2502 .2542 .2582 .2623 .2664 .2705 .2747 .2789 .2831 .2874 .2918 .2961 .3005 .305 .3095 .314 .3185 .3231 .3278 .3325 .3372 .3419 .3467 .3515 .3564 .3613 .3663 .3712 .3763 .3813 .3864 .3916 .3968 .402 .4072 .4125 .4179 .4233 .4287 .4342 .4397 .4452 .4508 .4564 .4621 .4678 .4735 .4793 .4851 .491 .4969 .5029 .5089 .5149 .521 .5271 .5333 .5395 .5457 .552 .5583 .5647 .5711 .5776 .5841 .5906 .5972 .6038 .6105 .6172 .624 .6308 .6376 .6445 .6514 .6584 .6654 .6724 .6795 .6867 .6939 .7011 .7084 .7157 .7231 .7305 .7379 .7454 .7529 .7605 .7682 .7758 .7835 .7913 .7991 .807 .8148 .8228 .8308 .8388 .8469 .855 .8632 .8714 .8796 .8879 .8963 .9047 .9131 .9216 .9301 .9387 .9473 .956 .9647 .9734 .9823 .9911 1;\n\n@function color-contrast($background, $color-contrast-dark: $color-contrast-dark, $color-contrast-light: $color-contrast-light, $min-contrast-ratio: $min-contrast-ratio) {\n  $foregrounds: $color-contrast-light, $color-contrast-dark, $white, $black;\n  $max-ratio: 0;\n  $max-ratio-color: null;\n\n  @each $color in $foregrounds {\n    $contrast-ratio: contrast-ratio($background, $color);\n    @if $contrast-ratio > $min-contrast-ratio {\n      @return $color;\n    } @else if $contrast-ratio > $max-ratio {\n      $max-ratio: $contrast-ratio;\n      $max-ratio-color: $color;\n    }\n  }\n\n  @warn \"Found no color leading to #{$min-contrast-ratio}:1 contrast ratio against #{$background}...\";\n\n  @return $max-ratio-color;\n}\n\n@function contrast-ratio($background, $foreground: $color-contrast-light) {\n  $l1: luminance($background);\n  $l2: luminance(opaque($background, $foreground));\n\n  @return if($l1 > $l2, ($l1 + .05) / ($l2 + .05), ($l2 + .05) / ($l1 + .05));\n}\n\n// Return WCAG2.0 relative luminance\n// See https://www.w3.org/WAI/GL/wiki/Relative_luminance\n// See https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests\n@function luminance($color) {\n  $rgb: (\n    \"r\": red($color),\n    \"g\": green($color),\n    \"b\": blue($color)\n  );\n\n  @each $name, $value in $rgb {\n    $value: if($value / 255 < .03928, $value / 255 / 12.92, nth($_luminance-list, $value + 1));\n    $rgb: map-merge($rgb, ($name: $value));\n  }\n\n  @return (map-get($rgb, \"r\") * .2126) + (map-get($rgb, \"g\") * .7152) + (map-get($rgb, \"b\") * .0722);\n}\n\n// Return opaque color\n// opaque(#fff, rgba(0, 0, 0, .5)) => #808080\n@function opaque($background, $foreground) {\n  @return mix(rgba($foreground, 1), $background, opacity($foreground) * 100);\n}\n\n// scss-docs-start color-functions\n// Tint a color: mix a color with white\n@function tint-color($color, $weight) {\n  @return mix(white, $color, $weight);\n}\n\n// Shade a color: mix a color with black\n@function shade-color($color, $weight) {\n  @return mix(black, $color, $weight);\n}\n\n// Shade the color if the weight is positive, else tint it\n@function shift-color($color, $weight) {\n  @return if($weight > 0, shade-color($color, $weight), tint-color($color, -$weight));\n}\n// scss-docs-end color-functions\n\n// Return valid calc\n@function add($value1, $value2, $return-calc: true) {\n  @if $value1 == null {\n    @return $value2;\n  }\n\n  @if $value2 == null {\n    @return $value1;\n  }\n\n  @if type-of($value1) == number and type-of($value2) == number and comparable($value1, $value2) {\n    @return $value1 + $value2;\n  }\n\n  @return if($return-calc == true, calc(#{$value1} + #{$value2}), $value1 + unquote(\" + \") + $value2);\n}\n\n@function subtract($value1, $value2, $return-calc: true) {\n  @if $value1 == null and $value2 == null {\n    @return null;\n  }\n\n  @if $value1 == null {\n    @return -$value2;\n  }\n\n  @if $value2 == null {\n    @return $value1;\n  }\n\n  @if type-of($value1) == number and type-of($value2) == number and comparable($value1, $value2) {\n    @return $value1 - $value2;\n  }\n\n  @return if($return-calc == true, calc(#{$value1} - #{$value2}), $value1 + unquote(\" - \") + $value2);\n}\n","// stylelint-disable property-disallowed-list\n// Single side border-radius\n\n// Helper function to replace negative values with 0\n@function valid-radius($radius) {\n  $return: ();\n  @each $value in $radius {\n    @if type-of($value) == number {\n      $return: append($return, max($value, 0));\n    } @else {\n      $return: append($return, $value);\n    }\n  }\n  @return $return;\n}\n\n// scss-docs-start border-radius-mixins\n@mixin border-radius($radius: $border-radius, $fallback-border-radius: false) {\n  @if $enable-rounded {\n    border-radius: valid-radius($radius);\n  }\n  @else if $fallback-border-radius != false {\n    border-radius: $fallback-border-radius;\n  }\n}\n\n@mixin border-top-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-top-left-radius: valid-radius($radius);\n    border-top-right-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-end-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-top-right-radius: valid-radius($radius);\n    border-bottom-right-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-bottom-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-bottom-right-radius: valid-radius($radius);\n    border-bottom-left-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-start-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-top-left-radius: valid-radius($radius);\n    border-bottom-left-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-top-start-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-top-left-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-top-end-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-top-right-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-bottom-end-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-bottom-right-radius: valid-radius($radius);\n  }\n}\n\n@mixin border-bottom-start-radius($radius: $border-radius) {\n  @if $enable-rounded {\n    border-bottom-left-radius: valid-radius($radius);\n  }\n}\n// scss-docs-end border-radius-mixins\n","//\n// Headings\n//\n.h1 {\n  @extend h1;\n}\n\n.h2 {\n  @extend h2;\n}\n\n.h3 {\n  @extend h3;\n}\n\n.h4 {\n  @extend h4;\n}\n\n.h5 {\n  @extend h5;\n}\n\n.h6 {\n  @extend h6;\n}\n\n\n.lead {\n  @include font-size($lead-font-size);\n  font-weight: $lead-font-weight;\n}\n\n// Type display classes\n@each $display, $font-size in $display-font-sizes {\n  .display-#{$display} {\n    @include font-size($font-size);\n    font-weight: $display-font-weight;\n    line-height: $display-line-height;\n  }\n}\n\n//\n// Emphasis\n//\n.small {\n  @extend small;\n}\n\n.mark {\n  @extend mark;\n}\n\n//\n// Lists\n//\n\n.list-unstyled {\n  @include list-unstyled();\n}\n\n// Inline turns list items into inline-block\n.list-inline {\n  @include list-unstyled();\n}\n.list-inline-item {\n  display: inline-block;\n\n  &:not(:last-child) {\n    margin-right: $list-inline-padding;\n  }\n}\n\n\n//\n// Misc\n//\n\n// Builds on `abbr`\n.initialism {\n  @include font-size($initialism-font-size);\n  text-transform: uppercase;\n}\n\n// Blockquotes\n.blockquote {\n  margin-bottom: $blockquote-margin-y;\n  @include font-size($blockquote-font-size);\n\n  > :last-child {\n    margin-bottom: 0;\n  }\n}\n\n.blockquote-footer {\n  margin-top: -$blockquote-margin-y;\n  margin-bottom: $blockquote-margin-y;\n  @include font-size($blockquote-footer-font-size);\n  color: $blockquote-footer-color;\n\n  &::before {\n    content: \"\\2014\\00A0\"; // em dash, nbsp\n  }\n}\n","// Lists\n\n// Unstyled keeps list items block level, just removes default browser padding and list-style\n@mixin list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n","// Responsive images (ensure images don't scale beyond their parents)\n//\n// This is purposefully opt-in via an explicit class rather than being the default for all `<img>`s.\n// We previously tried the \"images are responsive by default\" approach in Bootstrap v2,\n// and abandoned it in Bootstrap v3 because it breaks lots of third-party widgets (including Google Maps)\n// which weren't expecting the images within themselves to be involuntarily resized.\n// See also https://github.com/twbs/bootstrap/issues/18178\n.img-fluid {\n  @include img-fluid();\n}\n\n\n// Image thumbnails\n.img-thumbnail {\n  padding: $thumbnail-padding;\n  background-color: $thumbnail-bg;\n  border: $thumbnail-border-width solid $thumbnail-border-color;\n  @include border-radius($thumbnail-border-radius);\n  @include box-shadow($thumbnail-box-shadow);\n\n  // Keep them at most 100% wide\n  @include img-fluid();\n}\n\n//\n// Figures\n//\n\n.figure {\n  // Ensures the caption's text aligns with the image.\n  display: inline-block;\n}\n\n.figure-img {\n  margin-bottom: $spacer / 2;\n  line-height: 1;\n}\n\n.figure-caption {\n  @include font-size($figure-caption-font-size);\n  color: $figure-caption-color;\n}\n","// Image Mixins\n// - Responsive image\n// - Retina image\n\n\n// Responsive image\n//\n// Keep images from scaling beyond the width of their parents.\n\n@mixin img-fluid {\n  // Part 1: Set a maximum relative to the parent\n  max-width: 100%;\n  // Part 2: Override the height to auto, otherwise images will be stretched\n  // when setting a width and height attribute on the img element.\n  height: auto;\n}\n","// Container widths\n//\n// Set the container width, and override it for fixed navbars in media queries.\n\n@if $enable-grid-classes {\n  // Single container class with breakpoint max-widths\n  .container,\n  // 100% wide container at all breakpoints\n  .container-fluid {\n    @include make-container();\n  }\n\n  // Responsive containers that are 100% wide until a breakpoint\n  @each $breakpoint, $container-max-width in $container-max-widths {\n    .container-#{$breakpoint} {\n      @extend .container-fluid;\n    }\n\n    @include media-breakpoint-up($breakpoint, $grid-breakpoints) {\n      %responsive-container-#{$breakpoint} {\n        max-width: $container-max-width;\n      }\n\n      // Extend each breakpoint which is smaller or equal to the current breakpoint\n      $extend-breakpoint: true;\n\n      @each $name, $width in $grid-breakpoints {\n        @if ($extend-breakpoint) {\n          .container#{breakpoint-infix($name, $grid-breakpoints)} {\n            @extend %responsive-container-#{$breakpoint};\n          }\n\n          // Once the current breakpoint is reached, stop extending\n          @if ($breakpoint == $name) {\n            $extend-breakpoint: false;\n          }\n        }\n      }\n    }\n  }\n}\n","// Container mixins\n\n@mixin make-container($gutter: $container-padding-x) {\n  width: 100%;\n  padding-right: var(--#{$variable-prefix}gutter-x, #{$gutter});\n  padding-left: var(--#{$variable-prefix}gutter-x, #{$gutter});\n  margin-right: auto;\n  margin-left: auto;\n}\n","// Breakpoint viewport sizes and media queries.\n//\n// Breakpoints are defined as a map of (name: minimum width), order from small to large:\n//\n//    (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px)\n//\n// The map defined in the `$grid-breakpoints` global variable is used as the `$breakpoints` argument by default.\n\n// Name of the next breakpoint, or null for the last breakpoint.\n//\n//    >> breakpoint-next(sm)\n//    md\n//    >> breakpoint-next(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))\n//    md\n//    >> breakpoint-next(sm, $breakpoint-names: (xs sm md lg xl))\n//    md\n@function breakpoint-next($name, $breakpoints: $grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {\n  $n: index($breakpoint-names, $name);\n  @if not $n {\n    @error \"breakpoint `#{$name}` not found in `#{$breakpoints}`\";\n  }\n  @return if($n < length($breakpoint-names), nth($breakpoint-names, $n + 1), null);\n}\n\n// Minimum breakpoint width. Null for the smallest (first) breakpoint.\n//\n//    >> breakpoint-min(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))\n//    576px\n@function breakpoint-min($name, $breakpoints: $grid-breakpoints) {\n  $min: map-get($breakpoints, $name);\n  @return if($min != 0, $min, null);\n}\n\n// Maximum breakpoint width.\n// The maximum value is reduced by 0.02px to work around the limitations of\n// `min-` and `max-` prefixes and viewports with fractional widths.\n// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max\n// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.\n// See https://bugs.webkit.org/show_bug.cgi?id=178261\n//\n//    >> breakpoint-max(md, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))\n//    767.98px\n@function breakpoint-max($name, $breakpoints: $grid-breakpoints) {\n  $max: map-get($breakpoints, $name);\n  @return if($max and $max > 0, $max - .02, null);\n}\n\n// Returns a blank string if smallest breakpoint, otherwise returns the name with a dash in front.\n// Useful for making responsive utilities.\n//\n//    >> breakpoint-infix(xs, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))\n//    \"\"  (Returns a blank string)\n//    >> breakpoint-infix(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))\n//    \"-sm\"\n@function breakpoint-infix($name, $breakpoints: $grid-breakpoints) {\n  @return if(breakpoint-min($name, $breakpoints) == null, \"\", \"-#{$name}\");\n}\n\n// Media of at least the minimum breakpoint width. No query for the smallest breakpoint.\n// Makes the @content apply to the given breakpoint and wider.\n@mixin media-breakpoint-up($name, $breakpoints: $grid-breakpoints) {\n  $min: breakpoint-min($name, $breakpoints);\n  @if $min {\n    @media (min-width: $min) {\n      @content;\n    }\n  } @else {\n    @content;\n  }\n}\n\n// Media of at most the maximum breakpoint width. No query for the largest breakpoint.\n// Makes the @content apply to the given breakpoint and narrower.\n@mixin media-breakpoint-down($name, $breakpoints: $grid-breakpoints) {\n  $max: breakpoint-max($name, $breakpoints);\n  @if $max {\n    @media (max-width: $max) {\n      @content;\n    }\n  } @else {\n    @content;\n  }\n}\n\n// Media that spans multiple breakpoint widths.\n// Makes the @content apply between the min and max breakpoints\n@mixin media-breakpoint-between($lower, $upper, $breakpoints: $grid-breakpoints) {\n  $min: breakpoint-min($lower, $breakpoints);\n  $max: breakpoint-max($upper, $breakpoints);\n\n  @if $min != null and $max != null {\n    @media (min-width: $min) and (max-width: $max) {\n      @content;\n    }\n  } @else if $max == null {\n    @include media-breakpoint-up($lower, $breakpoints) {\n      @content;\n    }\n  } @else if $min == null {\n    @include media-breakpoint-down($upper, $breakpoints) {\n      @content;\n    }\n  }\n}\n\n// Media between the breakpoint's minimum and maximum widths.\n// No minimum for the smallest breakpoint, and no maximum for the largest one.\n// Makes the @content apply only to the given breakpoint, not viewports any wider or narrower.\n@mixin media-breakpoint-only($name, $breakpoints: $grid-breakpoints) {\n  $min:  breakpoint-min($name, $breakpoints);\n  $next: breakpoint-next($name, $breakpoints);\n  $max:  breakpoint-max($next);\n\n  @if $min != null and $max != null {\n    @media (min-width: $min) and (max-width: $max) {\n      @content;\n    }\n  } @else if $max == null {\n    @include media-breakpoint-up($name, $breakpoints) {\n      @content;\n    }\n  } @else if $min == null {\n    @include media-breakpoint-down($next, $breakpoints) {\n      @content;\n    }\n  }\n}\n","// Row\n//\n// Rows contain your columns.\n\n@if $enable-grid-classes {\n  .row {\n    @include make-row();\n\n    > * {\n      @include make-col-ready();\n    }\n  }\n}\n\n\n// Columns\n//\n// Common styles for small and large grid columns\n\n@if $enable-grid-classes {\n  @include make-grid-columns();\n}\n","/// Grid system\n//\n// Generate semantic grid columns with these mixins.\n\n@mixin make-row($gutter: $grid-gutter-width) {\n  --#{$variable-prefix}gutter-x: #{$gutter};\n  --#{$variable-prefix}gutter-y: 0;\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: calc(var(--#{$variable-prefix}gutter-y) * -1); // stylelint-disable-line function-disallowed-list\n  margin-right: calc(var(--#{$variable-prefix}gutter-x) / -2); // stylelint-disable-line function-disallowed-list\n  margin-left: calc(var(--#{$variable-prefix}gutter-x) / -2); // stylelint-disable-line function-disallowed-list\n}\n\n@mixin make-col-ready($gutter: $grid-gutter-width) {\n  // Add box sizing if only the grid is loaded\n  box-sizing: if(variable-exists(include-column-box-sizing) and $include-column-box-sizing, border-box, null);\n  // Prevent columns from becoming too narrow when at smaller grid tiers by\n  // always setting `width: 100%;`. This works because we set the width\n  // later on to override this initial width.\n  flex-shrink: 0;\n  width: 100%;\n  max-width: 100%; // Prevent `.col-auto`, `.col` (& responsive variants) from breaking out the grid\n  padding-right: calc(var(--#{$variable-prefix}gutter-x) / 2); // stylelint-disable-line function-disallowed-list\n  padding-left: calc(var(--#{$variable-prefix}gutter-x) / 2); // stylelint-disable-line function-disallowed-list\n  margin-top: var(--#{$variable-prefix}gutter-y);\n}\n\n@mixin make-col($size: false, $columns: $grid-columns) {\n  @if $size {\n    flex: 0 0 auto;\n    width: percentage($size / $columns);\n  } @else {\n    flex: 1 1 0;\n    max-width: 100%;\n  }\n}\n\n@mixin make-col-auto() {\n  flex: 0 0 auto;\n  width: auto;\n}\n\n@mixin make-col-offset($size, $columns: $grid-columns) {\n  $num: $size / $columns;\n  margin-left: if($num == 0, 0, percentage($num));\n}\n\n// Row columns\n//\n// Specify on a parent element(e.g., .row) to force immediate children into NN\n// numberof columns. Supports wrapping to new lines, but does not do a Masonry\n// style grid.\n@mixin row-cols($count) {\n  > * {\n    flex: 0 0 auto;\n    width: 100% / $count;\n  }\n}\n\n// Framework grid generation\n//\n// Used only by Bootstrap to generate the correct number of grid classes given\n// any value of `$grid-columns`.\n\n@mixin make-grid-columns($columns: $grid-columns, $gutter: $grid-gutter-width, $breakpoints: $grid-breakpoints) {\n  @each $breakpoint in map-keys($breakpoints) {\n    $infix: breakpoint-infix($breakpoint, $breakpoints);\n\n    @include media-breakpoint-up($breakpoint, $breakpoints) {\n      // Provide basic `.col-{bp}` classes for equal-width flexbox columns\n      .col#{$infix} {\n        flex: 1 0 0%; // Flexbugs #4: https://github.com/philipwalton/flexbugs#flexbug-4\n      }\n\n      .row-cols#{$infix}-auto > * {\n        @include make-col-auto();\n      }\n\n      @if $grid-row-columns > 0 {\n        @for $i from 1 through $grid-row-columns {\n          .row-cols#{$infix}-#{$i} {\n            @include row-cols($i);\n          }\n        }\n      }\n\n      .col#{$infix}-auto {\n        @include make-col-auto();\n      }\n\n      @if $columns > 0 {\n        @for $i from 1 through $columns {\n          .col#{$infix}-#{$i} {\n            @include make-col($i, $columns);\n          }\n        }\n\n        // `$columns - 1` because offsetting by the width of an entire row isn't possible\n        @for $i from 0 through ($columns - 1) {\n          @if not ($infix == \"\" and $i == 0) { // Avoid emitting useless .offset-0\n            .offset#{$infix}-#{$i} {\n              @include make-col-offset($i, $columns);\n            }\n          }\n        }\n      }\n\n      // Gutters\n      //\n      // Make use of `.g-*`, `.gx-*` or `.gy-*` utilities to change spacing between the columns.\n      @each $key, $value in $gutters {\n        .g#{$infix}-#{$key},\n        .gx#{$infix}-#{$key} {\n          --#{$variable-prefix}gutter-x: #{$value};\n        }\n\n        .g#{$infix}-#{$key},\n        .gy#{$infix}-#{$key} {\n          --#{$variable-prefix}gutter-y: #{$value};\n        }\n      }\n    }\n  }\n}\n","//\n// Basic Bootstrap table\n//\n\n.table {\n  --#{$variable-prefix}table-bg: #{$table-bg};\n  --#{$variable-prefix}table-accent-bg: #{$table-bg};\n  --#{$variable-prefix}table-striped-color: #{$table-striped-color};\n  --#{$variable-prefix}table-striped-bg: #{$table-striped-bg};\n  --#{$variable-prefix}table-active-color: #{$table-active-color};\n  --#{$variable-prefix}table-active-bg: #{$table-active-bg};\n  --#{$variable-prefix}table-hover-color: #{$table-hover-color};\n  --#{$variable-prefix}table-hover-bg: #{$table-hover-bg};\n\n  width: 100%;\n  margin-bottom: $spacer;\n  color: $table-color;\n  vertical-align: $table-cell-vertical-align;\n  border-color: $table-border-color;\n\n  // Target th & td\n  // We need the child combinator to prevent styles leaking to nested tables which doesn't have a `.table` class.\n  // We use the universal selectors here to simplify the selector (else we would need 6 different selectors).\n  // Another advantage is that this generates less code and makes the selector less specific making it easier to override.\n  // stylelint-disable-next-line selector-max-universal\n  > :not(caption) > * > * {\n    padding: $table-cell-padding-y $table-cell-padding-x;\n    background-color: var(--#{$variable-prefix}table-bg);\n    border-bottom-width: $table-border-width;\n    box-shadow: inset 0 0 0 9999px var(--#{$variable-prefix}table-accent-bg);\n  }\n\n  > tbody {\n    vertical-align: inherit;\n  }\n\n  > thead {\n    vertical-align: bottom;\n  }\n\n  // Highlight border color between thead, tbody and tfoot.\n  > :not(:last-child) > :last-child > * {\n    border-bottom-color: $table-group-separator-color;\n  }\n}\n\n\n//\n// Change placement of captions with a class\n//\n\n.caption-top {\n  caption-side: top;\n}\n\n\n//\n// Condensed table w/ half padding\n//\n\n.table-sm {\n  // stylelint-disable-next-line selector-max-universal\n  > :not(caption) > * > * {\n    padding: $table-cell-padding-y-sm $table-cell-padding-x-sm;\n  }\n}\n\n\n// Border versions\n//\n// Add or remove borders all around the table and between all the columns.\n//\n// When borders are added on all sides of the cells, the corners can render odd when\n// these borders do not have the same color or if they are semi-transparent.\n// Therefor we add top and border bottoms to the `tr`s and left and right borders\n// to the `td`s or `th`s\n\n.table-bordered {\n  > :not(caption) > * {\n    border-width: $table-border-width 0;\n\n    // stylelint-disable-next-line selector-max-universal\n    > * {\n      border-width: 0 $table-border-width;\n    }\n  }\n}\n\n.table-borderless {\n  // stylelint-disable-next-line selector-max-universal\n  > :not(caption) > * > * {\n    border-bottom-width: 0;\n  }\n}\n\n// Zebra-striping\n//\n// Default zebra-stripe styles (alternating gray and transparent backgrounds)\n\n.table-striped {\n  > tbody > tr:nth-of-type(#{$table-striped-order}) {\n    --#{$variable-prefix}table-accent-bg: var(--#{$variable-prefix}table-striped-bg);\n    color: var(--#{$variable-prefix}table-striped-color);\n  }\n}\n\n// Active table\n//\n// The `.table-active` class can be added to highlight rows or cells\n\n.table-active {\n  --#{$variable-prefix}table-accent-bg: var(--#{$variable-prefix}table-active-bg);\n  color: var(--#{$variable-prefix}table-active-color);\n}\n\n// Hover effect\n//\n// Placed here since it has to come after the potential zebra striping\n\n.table-hover {\n  > tbody > tr:hover {\n    --#{$variable-prefix}table-accent-bg: var(--#{$variable-prefix}table-hover-bg);\n    color: var(--#{$variable-prefix}table-hover-color);\n  }\n}\n\n\n// Table variants\n//\n// Table variants set the table cell backgrounds, border colors\n// and the colors of the striped, hovered & active tables\n\n@each $color, $value in $table-variants {\n  @include table-variant($color, $value);\n}\n\n// Responsive tables\n//\n// Generate series of `.table-responsive-*` classes for configuring the screen\n// size of where your table will overflow.\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n  @include media-breakpoint-down($breakpoint) {\n    .table-responsive#{$infix} {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n    }\n  }\n}\n","// scss-docs-start table-variant\n@mixin table-variant($state, $background) {\n  .table-#{$state} {\n    $color: color-contrast(opaque($body-bg, $background));\n    $hover-bg: mix($color, $background, percentage($table-hover-bg-factor));\n    $striped-bg: mix($color, $background, percentage($table-striped-bg-factor));\n    $active-bg: mix($color, $background, percentage($table-active-bg-factor));\n\n    --#{$variable-prefix}table-bg: #{$background};\n    --#{$variable-prefix}table-striped-bg: #{$striped-bg};\n    --#{$variable-prefix}table-striped-color: #{color-contrast($striped-bg)};\n    --#{$variable-prefix}table-active-bg: #{$active-bg};\n    --#{$variable-prefix}table-active-color: #{color-contrast($active-bg)};\n    --#{$variable-prefix}table-hover-bg: #{$hover-bg};\n    --#{$variable-prefix}table-hover-color: #{color-contrast($hover-bg)};\n\n    color: $color;\n    border-color: mix($color, $background, percentage($table-border-factor));\n  }\n}\n// scss-docs-end table-variant\n","//\n// Labels\n//\n\n.form-label {\n  margin-bottom: $form-label-margin-bottom;\n  @include font-size($form-label-font-size);\n  font-style: $form-label-font-style;\n  font-weight: $form-label-font-weight;\n  color: $form-label-color;\n}\n\n// For use with horizontal and inline forms, when you need the label (or legend)\n// text to align with the form controls.\n.col-form-label {\n  padding-top: add($input-padding-y, $input-border-width);\n  padding-bottom: add($input-padding-y, $input-border-width);\n  margin-bottom: 0; // Override the `<legend>` default\n  @include font-size(inherit); // Override the `<legend>` default\n  font-style: $form-label-font-style;\n  font-weight: $form-label-font-weight;\n  line-height: $input-line-height;\n  color: $form-label-color;\n}\n\n.col-form-label-lg {\n  padding-top: add($input-padding-y-lg, $input-border-width);\n  padding-bottom: add($input-padding-y-lg, $input-border-width);\n  @include font-size($input-font-size-lg);\n}\n\n.col-form-label-sm {\n  padding-top: add($input-padding-y-sm, $input-border-width);\n  padding-bottom: add($input-padding-y-sm, $input-border-width);\n  @include font-size($input-font-size-sm);\n}\n","//\n// Form text\n//\n\n.form-text {\n  margin-top: $form-text-margin-top;\n  @include font-size($form-text-font-size);\n  font-style: $form-text-font-style;\n  font-weight: $form-text-font-weight;\n  color: $form-text-color;\n}\n","//\n// General form controls (plus a few specific high-level interventions)\n//\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: $input-padding-y $input-padding-x;\n  font-family: $input-font-family;\n  @include font-size($input-font-size);\n  font-weight: $input-font-weight;\n  line-height: $input-line-height;\n  color: $input-color;\n  background-color: $input-bg;\n  background-clip: padding-box;\n  border: $input-border-width solid $input-border-color;\n  appearance: none; // Fix appearance for date inputs in Safari\n\n  // Note: This has no effect on <select>s in some browsers, due to the limited stylability of `<select>`s in CSS.\n  @include border-radius($input-border-radius, 0);\n\n  @include box-shadow($input-box-shadow);\n  @include transition($input-transition);\n\n  &[type=\"file\"] {\n    overflow: hidden; // prevent pseudo element button overlap\n\n    &:not(:disabled):not([readonly]) {\n      cursor: pointer;\n    }\n  }\n\n  // Customize the `:focus` state to imitate native WebKit styles.\n  &:focus {\n    color: $input-focus-color;\n    background-color: $input-focus-bg;\n    border-color: $input-focus-border-color;\n    outline: 0;\n    @if $enable-shadows {\n      @include box-shadow($input-box-shadow, $input-focus-box-shadow);\n    } @else {\n      // Avoid using mixin so we can pass custom focus shadow properly\n      box-shadow: $input-focus-box-shadow;\n    }\n  }\n\n  // Add some height to date inputs on iOS\n  // https://github.com/twbs/bootstrap/issues/23307\n  // TODO: we can remove this workaround once https://bugs.webkit.org/show_bug.cgi?id=198959 is resolved\n  &::-webkit-date-and-time-value {\n    // Multiply line-height by 1em if it has no unit\n    height: if(unit($input-line-height) == \"\", $input-line-height * 1em, $input-line-height);\n  }\n\n  // Placeholder\n  &::placeholder {\n    color: $input-placeholder-color;\n    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.\n    opacity: 1;\n  }\n\n  // Disabled and read-only inputs\n  //\n  // HTML5 says that controls under a fieldset > legend:first-child won't be\n  // disabled if the fieldset is disabled. Due to implementation difficulty, we\n  // don't honor that edge case; we style them as disabled anyway.\n  &:disabled,\n  &[readonly] {\n    background-color: $input-disabled-bg;\n    border-color: $input-disabled-border-color;\n    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.\n    opacity: 1;\n  }\n\n  // File input buttons theming\n  &::file-selector-button {\n    padding: $input-padding-y $input-padding-x;\n    margin: (-$input-padding-y) (-$input-padding-x);\n    margin-inline-end: $input-padding-x;\n    color: $form-file-button-color;\n    @include gradient-bg($form-file-button-bg);\n    pointer-events: none;\n    border-color: inherit;\n    border-style: solid;\n    border-width: 0;\n    border-inline-end-width: $input-border-width;\n    border-radius: 0; // stylelint-disable-line property-disallowed-list\n    @include transition($btn-transition);\n  }\n\n  &:hover:not(:disabled):not([readonly])::file-selector-button {\n    background-color: $form-file-button-hover-bg;\n  }\n\n  &::-webkit-file-upload-button {\n    padding: $input-padding-y $input-padding-x;\n    margin: (-$input-padding-y) (-$input-padding-x);\n    margin-inline-end: $input-padding-x;\n    color: $form-file-button-color;\n    @include gradient-bg($form-file-button-bg);\n    pointer-events: none;\n    border-color: inherit;\n    border-style: solid;\n    border-width: 0;\n    border-inline-end-width: $input-border-width;\n    border-radius: 0; // stylelint-disable-line property-disallowed-list\n    @include transition($btn-transition);\n  }\n\n  &:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {\n    background-color: $form-file-button-hover-bg;\n  }\n}\n\n// Readonly controls as plain text\n//\n// Apply class to a readonly input to make it appear like regular plain\n// text (without any border, background color, focus indicator)\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding: $input-padding-y 0;\n  margin-bottom: 0; // match inputs if this class comes on inputs with default margins\n  line-height: $input-line-height;\n  color: $input-plaintext-color;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: $input-border-width 0;\n\n  &.form-control-sm,\n  &.form-control-lg {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n// Form control sizing\n//\n// Build on `.form-control` with modifier classes to decrease or increase the\n// height and font-size of form controls.\n//\n// Repeated in `_input_group.scss` to avoid Sass extend issues.\n\n.form-control-sm {\n  min-height: $input-height-sm;\n  padding: $input-padding-y-sm $input-padding-x-sm;\n  @include font-size($input-font-size-sm);\n  @include border-radius($input-border-radius-sm);\n\n  &::file-selector-button {\n    padding: $input-padding-y-sm $input-padding-x-sm;\n    margin: (-$input-padding-y-sm) (-$input-padding-x-sm);\n    margin-inline-end: $input-padding-x-sm;\n  }\n\n  &::-webkit-file-upload-button {\n    padding: $input-padding-y-sm $input-padding-x-sm;\n    margin: (-$input-padding-y-sm) (-$input-padding-x-sm);\n    margin-inline-end: $input-padding-x-sm;\n  }\n}\n\n.form-control-lg {\n  min-height: $input-height-lg;\n  padding: $input-padding-y-lg $input-padding-x-lg;\n  @include font-size($input-font-size-lg);\n  @include border-radius($input-border-radius-lg);\n\n  &::file-selector-button {\n    padding: $input-padding-y-lg $input-padding-x-lg;\n    margin: (-$input-padding-y-lg) (-$input-padding-x-lg);\n    margin-inline-end: $input-padding-x-lg;\n  }\n\n  &::-webkit-file-upload-button {\n    padding: $input-padding-y-lg $input-padding-x-lg;\n    margin: (-$input-padding-y-lg) (-$input-padding-x-lg);\n    margin-inline-end: $input-padding-x-lg;\n  }\n}\n\n// Make sure textareas don't shrink too much when resized\n// https://github.com/twbs/bootstrap/pull/29124\n// stylelint-disable selector-no-qualifying-type\ntextarea {\n  &.form-control {\n    min-height: $input-height;\n  }\n\n  &.form-control-sm {\n    min-height: $input-height-sm;\n  }\n\n  &.form-control-lg {\n    min-height: $input-height-lg;\n  }\n}\n// stylelint-enable selector-no-qualifying-type\n\n.form-control-color {\n  max-width: 3rem;\n  height: auto; // Override fixed browser height\n  padding: $input-padding-y;\n\n  &:not(:disabled):not([readonly]) {\n    cursor: pointer;\n  }\n\n  &::-moz-color-swatch {\n    height: if(unit($input-line-height) == \"\", $input-line-height * 1em, $input-line-height);\n    @include border-radius($input-border-radius);\n  }\n\n  &::-webkit-color-swatch {\n    height: if(unit($input-line-height) == \"\", $input-line-height * 1em, $input-line-height);\n    @include border-radius($input-border-radius);\n  }\n}\n","// stylelint-disable property-disallowed-list\n@mixin transition($transition...) {\n  @if length($transition) == 0 {\n    $transition: $transition-base;\n  }\n\n  @if length($transition) > 1 {\n    @each $value in $transition {\n      @if $value == null or $value == none {\n        @warn \"The keyword 'none' or 'null' must be used as a single argument.\";\n      }\n    }\n  }\n\n  @if $enable-transitions {\n    @if nth($transition, 1) != null {\n      transition: $transition;\n    }\n\n    @if $enable-reduced-motion and nth($transition, 1) != null and nth($transition, 1) != none {\n      @media (prefers-reduced-motion: reduce) {\n        transition: none;\n      }\n    }\n  }\n}\n","// Gradients\n\n// scss-docs-start gradient-bg-mixin\n@mixin gradient-bg($color: null) {\n  background-color: $color;\n\n  @if $enable-gradients {\n    background-image: var(--#{$variable-prefix}gradient);\n  }\n}\n// scss-docs-end gradient-bg-mixin\n\n// scss-docs-start gradient-mixins\n// Horizontal gradient, from left to right\n//\n// Creates two color stops, start and end, by specifying a color and position for each color stop.\n@mixin gradient-x($start-color: $gray-700, $end-color: $gray-800, $start-percent: 0%, $end-percent: 100%) {\n  background-image: linear-gradient(to right, $start-color $start-percent, $end-color $end-percent);\n}\n\n// Vertical gradient, from top to bottom\n//\n// Creates two color stops, start and end, by specifying a color and position for each color stop.\n@mixin gradient-y($start-color: $gray-700, $end-color: $gray-800, $start-percent: null, $end-percent: null) {\n  background-image: linear-gradient(to bottom, $start-color $start-percent, $end-color $end-percent);\n}\n\n@mixin gradient-directional($start-color: $gray-700, $end-color: $gray-800, $deg: 45deg) {\n  background-image: linear-gradient($deg, $start-color, $end-color);\n}\n\n@mixin gradient-x-three-colors($start-color: $blue, $mid-color: $purple, $color-stop: 50%, $end-color: $red) {\n  background-image: linear-gradient(to right, $start-color, $mid-color $color-stop, $end-color);\n}\n\n@mixin gradient-y-three-colors($start-color: $blue, $mid-color: $purple, $color-stop: 50%, $end-color: $red) {\n  background-image: linear-gradient($start-color, $mid-color $color-stop, $end-color);\n}\n\n@mixin gradient-radial($inner-color: $gray-700, $outer-color: $gray-800) {\n  background-image: radial-gradient(circle, $inner-color, $outer-color);\n}\n\n@mixin gradient-striped($color: rgba($white, .15), $angle: 45deg) {\n  background-image: linear-gradient($angle, $color 25%, transparent 25%, transparent 50%, $color 50%, $color 75%, transparent 75%, transparent);\n}\n// scss-docs-end gradient-mixins\n","// Select\n//\n// Replaces the browser default select with a custom one, mostly pulled from\n// https://primer.github.io/.\n\n.form-select {\n  display: block;\n  width: 100%;\n  padding: $form-select-padding-y $form-select-indicator-padding $form-select-padding-y $form-select-padding-x;\n  font-family: $form-select-font-family;\n  @include font-size($form-select-font-size);\n  font-weight: $form-select-font-weight;\n  line-height: $form-select-line-height;\n  color: $form-select-color;\n  background-color: $form-select-bg;\n  background-image: escape-svg($form-select-indicator);\n  background-repeat: no-repeat;\n  background-position: $form-select-bg-position;\n  background-size: $form-select-bg-size;\n  border: $form-select-border-width solid $form-select-border-color;\n  @include border-radius($form-select-border-radius, 0);\n  @include box-shadow($form-select-box-shadow);\n  appearance: none;\n\n  &:focus {\n    border-color: $form-select-focus-border-color;\n    outline: 0;\n    @if $enable-shadows {\n      @include box-shadow($form-select-box-shadow, $form-select-focus-box-shadow);\n    } @else {\n      // Avoid using mixin so we can pass custom focus shadow properly\n      box-shadow: $form-select-focus-box-shadow;\n    }\n  }\n\n  &[multiple],\n  &[size]:not([size=\"1\"]) {\n    padding-right: $form-select-padding-x;\n    background-image: none;\n  }\n\n  &:disabled {\n    color: $form-select-disabled-color;\n    background-color: $form-select-disabled-bg;\n    border-color: $form-select-disabled-border-color;\n  }\n\n  // Remove outline from select box in FF\n  &:-moz-focusring {\n    color: transparent;\n    text-shadow: 0 0 0 $form-select-color;\n  }\n}\n\n.form-select-sm {\n  padding-top: $form-select-padding-y-sm;\n  padding-bottom: $form-select-padding-y-sm;\n  padding-left: $form-select-padding-x-sm;\n  @include font-size($form-select-font-size-sm);\n}\n\n.form-select-lg {\n  padding-top: $form-select-padding-y-lg;\n  padding-bottom: $form-select-padding-y-lg;\n  padding-left: $form-select-padding-x-lg;\n  @include font-size($form-select-font-size-lg);\n}\n","//\n// Check/radio\n//\n\n.form-check {\n  display: block;\n  min-height: $form-check-min-height;\n  padding-left: $form-check-padding-start;\n  margin-bottom: $form-check-margin-bottom;\n\n  .form-check-input {\n    float: left;\n    margin-left: $form-check-padding-start * -1;\n  }\n}\n\n.form-check-input {\n  width: $form-check-input-width;\n  height: $form-check-input-width;\n  margin-top: ($line-height-base - $form-check-input-width) / 2; // line-height minus check height\n  vertical-align: top;\n  background-color: $form-check-input-bg;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  border: $form-check-input-border;\n  appearance: none;\n  color-adjust: exact; // Keep themed appearance for print\n  @include transition($form-check-transition);\n\n  &[type=\"checkbox\"] {\n    @include border-radius($form-check-input-border-radius);\n  }\n\n  &[type=\"radio\"] {\n    // stylelint-disable-next-line property-disallowed-list\n    border-radius: $form-check-radio-border-radius;\n  }\n\n  &:active {\n    filter: $form-check-input-active-filter;\n  }\n\n  &:focus {\n    border-color: $form-check-input-focus-border;\n    outline: 0;\n    box-shadow: $form-check-input-focus-box-shadow;\n  }\n\n  &:checked {\n    background-color: $form-check-input-checked-bg-color;\n    border-color: $form-check-input-checked-border-color;\n\n    &[type=\"checkbox\"] {\n      @if $enable-gradients {\n        background-image: escape-svg($form-check-input-checked-bg-image), var(--#{$variable-prefix}gradient);\n      } @else {\n        background-image: escape-svg($form-check-input-checked-bg-image);\n      }\n    }\n\n    &[type=\"radio\"] {\n      @if $enable-gradients {\n        background-image: escape-svg($form-check-radio-checked-bg-image), var(--#{$variable-prefix}gradient);\n      } @else {\n        background-image: escape-svg($form-check-radio-checked-bg-image);\n      }\n    }\n  }\n\n  &[type=\"checkbox\"]:indeterminate {\n    background-color: $form-check-input-indeterminate-bg-color;\n    border-color: $form-check-input-indeterminate-border-color;\n\n    @if $enable-gradients {\n      background-image: escape-svg($form-check-input-indeterminate-bg-image), var(--#{$variable-prefix}gradient);\n    } @else {\n      background-image: escape-svg($form-check-input-indeterminate-bg-image);\n    }\n  }\n\n  &:disabled {\n    pointer-events: none;\n    filter: none;\n    opacity: $form-check-input-disabled-opacity;\n  }\n\n  // Use disabled attribute in addition of :disabled pseudo-class\n  // See: https://github.com/twbs/bootstrap/issues/28247\n  &[disabled],\n  &:disabled {\n    ~ .form-check-label {\n      opacity: $form-check-label-disabled-opacity;\n    }\n  }\n}\n\n.form-check-label {\n  color: $form-check-label-color;\n  cursor: $form-check-label-cursor;\n}\n\n//\n// Switch\n//\n\n.form-switch {\n  padding-left: $form-switch-padding-start;\n\n  .form-check-input {\n    width: $form-switch-width;\n    margin-left: $form-switch-padding-start * -1;\n    background-image: escape-svg($form-switch-bg-image);\n    background-position: left center;\n    @include border-radius($form-switch-border-radius);\n    @include transition($form-switch-transition);\n\n    &:focus {\n      background-image: escape-svg($form-switch-focus-bg-image);\n    }\n\n    &:checked {\n      background-position: $form-switch-checked-bg-position;\n\n      @if $enable-gradients {\n        background-image: escape-svg($form-switch-checked-bg-image), var(--#{$variable-prefix}gradient);\n      } @else {\n        background-image: escape-svg($form-switch-checked-bg-image);\n      }\n    }\n  }\n}\n\n.form-check-inline {\n  display: inline-block;\n  margin-right: $form-check-inline-margin-end;\n}\n\n.btn-check {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n\n  &[disabled],\n  &:disabled {\n    + .btn {\n      pointer-events: none;\n      filter: none;\n      opacity: $form-check-btn-check-disabled-opacity;\n    }\n  }\n}\n","// Range\n//\n// Style range inputs the same across browsers. Vendor-specific rules for pseudo\n// elements cannot be mixed. As such, there are no shared styles for focus or\n// active states on prefixed selectors.\n\n.form-range {\n  width: 100%;\n  height: add($form-range-thumb-height, $form-range-thumb-focus-box-shadow-width * 2);\n  padding: 0; // Need to reset padding\n  background-color: transparent;\n  appearance: none;\n\n  &:focus {\n    outline: 0;\n\n    // Pseudo-elements must be split across multiple rulesets to have an effect.\n    // No box-shadow() mixin for focus accessibility.\n    &::-webkit-slider-thumb { box-shadow: $form-range-thumb-focus-box-shadow; }\n    &::-moz-range-thumb     { box-shadow: $form-range-thumb-focus-box-shadow; }\n  }\n\n  &::-moz-focus-outer {\n    border: 0;\n  }\n\n  &::-webkit-slider-thumb {\n    width: $form-range-thumb-width;\n    height: $form-range-thumb-height;\n    margin-top: ($form-range-track-height - $form-range-thumb-height) / 2; // Webkit specific\n    @include gradient-bg($form-range-thumb-bg);\n    border: $form-range-thumb-border;\n    @include border-radius($form-range-thumb-border-radius);\n    @include box-shadow($form-range-thumb-box-shadow);\n    @include transition($form-range-thumb-transition);\n    appearance: none;\n\n    &:active {\n      @include gradient-bg($form-range-thumb-active-bg);\n    }\n  }\n\n  &::-webkit-slider-runnable-track {\n    width: $form-range-track-width;\n    height: $form-range-track-height;\n    color: transparent; // Why?\n    cursor: $form-range-track-cursor;\n    background-color: $form-range-track-bg;\n    border-color: transparent;\n    @include border-radius($form-range-track-border-radius);\n    @include box-shadow($form-range-track-box-shadow);\n  }\n\n  &::-moz-range-thumb {\n    width: $form-range-thumb-width;\n    height: $form-range-thumb-height;\n    @include gradient-bg($form-range-thumb-bg);\n    border: $form-range-thumb-border;\n    @include border-radius($form-range-thumb-border-radius);\n    @include box-shadow($form-range-thumb-box-shadow);\n    @include transition($form-range-thumb-transition);\n    appearance: none;\n\n    &:active {\n      @include gradient-bg($form-range-thumb-active-bg);\n    }\n  }\n\n  &::-moz-range-track {\n    width: $form-range-track-width;\n    height: $form-range-track-height;\n    color: transparent;\n    cursor: $form-range-track-cursor;\n    background-color: $form-range-track-bg;\n    border-color: transparent; // Firefox specific?\n    @include border-radius($form-range-track-border-radius);\n    @include box-shadow($form-range-track-box-shadow);\n  }\n\n  &:disabled {\n    pointer-events: none;\n\n    &::-webkit-slider-thumb {\n      background-color: $form-range-thumb-disabled-bg;\n    }\n\n    &::-moz-range-thumb {\n      background-color: $form-range-thumb-disabled-bg;\n    }\n  }\n}\n",".form-floating {\n  position: relative;\n\n  > .form-control,\n  > .form-select {\n    height: $form-floating-height;\n    padding: $form-floating-padding-y $form-floating-padding-x;\n  }\n\n  > label {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%; // allow textareas\n    padding: $form-floating-padding-y $form-floating-padding-x;\n    pointer-events: none;\n    border: $input-border-width solid transparent; // Required for aligning label's text with the input as it affects inner box model\n    transform-origin: 0 0;\n    @include transition($form-floating-transition);\n  }\n\n  // stylelint-disable no-duplicate-selectors\n  > .form-control {\n    &::placeholder {\n      color: transparent;\n    }\n\n    &:focus,\n    &:not(:placeholder-shown) {\n      padding-top: $form-floating-input-padding-t;\n      padding-bottom: $form-floating-input-padding-b;\n    }\n    // Duplicated because `:-webkit-autofill` invalidates other selectors when grouped\n    &:-webkit-autofill {\n      padding-top: $form-floating-input-padding-t;\n      padding-bottom: $form-floating-input-padding-b;\n    }\n  }\n\n  > .form-select {\n    padding-top: $form-floating-input-padding-t;\n    padding-bottom: $form-floating-input-padding-b;\n  }\n\n  > .form-control:focus,\n  > .form-control:not(:placeholder-shown),\n  > .form-select {\n    ~ label {\n      opacity: $form-floating-label-opacity;\n      transform: $form-floating-label-transform;\n    }\n  }\n  // Duplicated because `:-webkit-autofill` invalidates other selectors when grouped\n  > .form-control:-webkit-autofill {\n    ~ label {\n      opacity: $form-floating-label-opacity;\n      transform: $form-floating-label-transform;\n    }\n  }\n  // stylelint-enable no-duplicate-selectors\n}\n","//\n// Base styles\n//\n\n.input-group {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap; // For form validation feedback\n  align-items: stretch;\n  width: 100%;\n\n  > .form-control,\n  > .form-select {\n    position: relative; // For focus state's z-index\n    flex: 1 1 auto;\n    width: 1%;\n    min-width: 0; // https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size\n  }\n\n  // Bring the \"active\" form control to the top of surrounding elements\n  > .form-control:focus,\n  > .form-select:focus {\n    z-index: 3;\n  }\n\n  // Ensure buttons are always above inputs for more visually pleasing borders.\n  // This isn't needed for `.input-group-text` since it shares the same border-color\n  // as our inputs.\n  .btn {\n    position: relative;\n    z-index: 2;\n\n    &:focus {\n      z-index: 3;\n    }\n  }\n}\n\n\n// Textual addons\n//\n// Serves as a catch-all element for any text or radio/checkbox input you wish\n// to prepend or append to an input.\n\n.input-group-text {\n  display: flex;\n  align-items: center;\n  padding: $input-group-addon-padding-y $input-group-addon-padding-x;\n  @include font-size($input-font-size); // Match inputs\n  font-weight: $input-group-addon-font-weight;\n  line-height: $input-line-height;\n  color: $input-group-addon-color;\n  text-align: center;\n  white-space: nowrap;\n  background-color: $input-group-addon-bg;\n  border: $input-border-width solid $input-group-addon-border-color;\n  @include border-radius($input-border-radius);\n}\n\n\n// Sizing\n//\n// Remix the default form control sizing classes into new ones for easier\n// manipulation.\n\n.input-group-lg > .form-control,\n.input-group-lg > .form-select,\n.input-group-lg > .input-group-text,\n.input-group-lg > .btn {\n  padding: $input-padding-y-lg $input-padding-x-lg;\n  @include font-size($input-font-size-lg);\n  @include border-radius($input-border-radius-lg);\n}\n\n.input-group-sm > .form-control,\n.input-group-sm > .form-select,\n.input-group-sm > .input-group-text,\n.input-group-sm > .btn {\n  padding: $input-padding-y-sm $input-padding-x-sm;\n  @include font-size($input-font-size-sm);\n  @include border-radius($input-border-radius-sm);\n}\n\n.input-group-lg > .form-select,\n.input-group-sm > .form-select {\n  padding-right: $form-select-padding-x + $form-select-indicator-padding;\n}\n\n\n// Rounded corners\n//\n// These rulesets must come after the sizing ones to properly override sm and lg\n// border-radius values when extending. They're more specific than we'd like\n// with the `.input-group >` part, but without it, we cannot override the sizing.\n\n// stylelint-disable-next-line no-duplicate-selectors\n.input-group {\n  &:not(.has-validation) {\n    > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu),\n    > .dropdown-toggle:nth-last-child(n + 3) {\n      @include border-end-radius(0);\n    }\n  }\n\n  &.has-validation {\n    > :nth-last-child(n + 3):not(.dropdown-toggle):not(.dropdown-menu),\n    > .dropdown-toggle:nth-last-child(n + 4) {\n      @include border-end-radius(0);\n    }\n  }\n\n  $validation-messages: \"\";\n  @each $state in map-keys($form-validation-states) {\n    $validation-messages: $validation-messages + \":not(.\" + unquote($state) + \"-tooltip)\" + \":not(.\" + unquote($state) + \"-feedback)\";\n  }\n\n  > :not(:first-child):not(.dropdown-menu)#{$validation-messages} {\n    margin-left: -$input-border-width;\n    @include border-start-radius(0);\n  }\n}\n","// This mixin uses an `if()` technique to be compatible with Dart Sass\n// See https://github.com/sass/sass/issues/1873#issuecomment-152293725 for more details\n\n// scss-docs-start form-validation-mixins\n@mixin form-validation-state-selector($state) {\n  @if ($state == \"valid\" or $state == \"invalid\") {\n    .was-validated #{if(&, \"&\", \"\")}:#{$state},\n    #{if(&, \"&\", \"\")}.is-#{$state} {\n      @content;\n    }\n  } @else {\n    #{if(&, \"&\", \"\")}.is-#{$state} {\n      @content;\n    }\n  }\n}\n\n@mixin form-validation-state(\n  $state,\n  $color,\n  $icon,\n  $tooltip-color: color-contrast($color),\n  $tooltip-bg-color: rgba($color, $form-feedback-tooltip-opacity),\n  $focus-box-shadow: 0 0 $input-btn-focus-blur $input-focus-width rgba($color, $input-btn-focus-color-opacity)\n) {\n  .#{$state}-feedback {\n    display: none;\n    width: 100%;\n    margin-top: $form-feedback-margin-top;\n    @include font-size($form-feedback-font-size);\n    font-style: $form-feedback-font-style;\n    color: $color;\n  }\n\n  .#{$state}-tooltip {\n    position: absolute;\n    top: 100%;\n    z-index: 5;\n    display: none;\n    max-width: 100%; // Contain to parent when possible\n    padding: $form-feedback-tooltip-padding-y $form-feedback-tooltip-padding-x;\n    margin-top: .1rem;\n    @include font-size($form-feedback-tooltip-font-size);\n    line-height: $form-feedback-tooltip-line-height;\n    color: $tooltip-color;\n    background-color: $tooltip-bg-color;\n    @include border-radius($form-feedback-tooltip-border-radius);\n  }\n\n  @include form-validation-state-selector($state) {\n    ~ .#{$state}-feedback,\n    ~ .#{$state}-tooltip {\n      display: block;\n    }\n  }\n\n  .form-control {\n    @include form-validation-state-selector($state) {\n      border-color: $color;\n\n      @if $enable-validation-icons {\n        padding-right: $input-height-inner;\n        background-image: escape-svg($icon);\n        background-repeat: no-repeat;\n        background-position: right $input-height-inner-quarter center;\n        background-size: $input-height-inner-half $input-height-inner-half;\n      }\n\n      &:focus {\n        border-color: $color;\n        box-shadow: $focus-box-shadow;\n      }\n    }\n  }\n\n  // stylelint-disable-next-line selector-no-qualifying-type\n  textarea.form-control {\n    @include form-validation-state-selector($state) {\n      @if $enable-validation-icons {\n        padding-right: $input-height-inner;\n        background-position: top $input-height-inner-quarter right $input-height-inner-quarter;\n      }\n    }\n  }\n\n  .form-select {\n    @include form-validation-state-selector($state) {\n      border-color: $color;\n\n      @if $enable-validation-icons {\n        &:not([multiple]):not([size]),\n        &:not([multiple])[size=\"1\"] {\n          padding-right: $form-select-feedback-icon-padding-end;\n          background-image: escape-svg($form-select-indicator), escape-svg($icon);\n          background-position: $form-select-bg-position, $form-select-feedback-icon-position;\n          background-size: $form-select-bg-size, $form-select-feedback-icon-size;\n        }\n      }\n\n      &:focus {\n        border-color: $color;\n        box-shadow: $focus-box-shadow;\n      }\n    }\n  }\n\n  .form-check-input {\n    @include form-validation-state-selector($state) {\n      border-color: $color;\n\n      &:checked {\n        background-color: $color;\n      }\n\n      &:focus {\n        box-shadow: $focus-box-shadow;\n      }\n\n      ~ .form-check-label {\n        color: $color;\n      }\n    }\n  }\n  .form-check-inline .form-check-input {\n    ~ .#{$state}-feedback {\n      margin-left: .5em;\n    }\n  }\n\n  .input-group .form-control,\n  .input-group .form-select {\n    @include form-validation-state-selector($state) {\n      @if $state == \"valid\" {\n        z-index: 1;\n      } @else if $state == \"invalid\" {\n        z-index: 2;\n      }\n      &:focus {\n        z-index: 3;\n      }\n    }\n  }\n}\n// scss-docs-end form-validation-mixins\n","//\n// Base styles\n//\n\n.btn {\n  display: inline-block;\n  font-family: $btn-font-family;\n  font-weight: $btn-font-weight;\n  line-height: $btn-line-height;\n  color: $body-color;\n  text-align: center;\n  text-decoration: if($link-decoration == none, null, none);\n  white-space: $btn-white-space;\n  vertical-align: middle;\n  cursor: if($enable-button-pointers, pointer, null);\n  user-select: none;\n  background-color: transparent;\n  border: $btn-border-width solid transparent;\n  @include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $btn-border-radius);\n  @include transition($btn-transition);\n\n  &:hover {\n    color: $body-color;\n    text-decoration: if($link-hover-decoration == underline, none, null);\n  }\n\n  .btn-check:focus + &,\n  &:focus {\n    outline: 0;\n    box-shadow: $btn-focus-box-shadow;\n  }\n\n  .btn-check:checked + &,\n  .btn-check:active + &,\n  &:active,\n  &.active {\n    @include box-shadow($btn-active-box-shadow);\n\n    &:focus {\n      @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);\n    }\n  }\n\n  &:disabled,\n  &.disabled,\n  fieldset:disabled & {\n    pointer-events: none;\n    opacity: $btn-disabled-opacity;\n    @include box-shadow(none);\n  }\n}\n\n\n//\n// Alternate buttons\n//\n\n// scss-docs-start btn-variant-loops\n@each $color, $value in $theme-colors {\n  .btn-#{$color} {\n    @include button-variant($value, $value);\n  }\n}\n\n@each $color, $value in $theme-colors {\n  .btn-outline-#{$color} {\n    @include button-outline-variant($value);\n  }\n}\n// scss-docs-end btn-variant-loops\n\n\n//\n// Link buttons\n//\n\n// Make a button look and behave like a link\n.btn-link {\n  font-weight: $font-weight-normal;\n  color: $btn-link-color;\n  text-decoration: $link-decoration;\n\n  &:hover {\n    color: $btn-link-hover-color;\n    text-decoration: $link-hover-decoration;\n  }\n\n  &:focus {\n    text-decoration: $link-hover-decoration;\n  }\n\n  &:disabled,\n  &.disabled {\n    color: $btn-link-disabled-color;\n  }\n\n  // No need for an active state here\n}\n\n\n//\n// Button Sizes\n//\n\n.btn-lg {\n  @include button-size($btn-padding-y-lg, $btn-padding-x-lg, $btn-font-size-lg, $btn-border-radius-lg);\n}\n\n.btn-sm {\n  @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $btn-font-size-sm, $btn-border-radius-sm);\n}\n","// Button variants\n//\n// Easily pump out default styles, as well as :hover, :focus, :active,\n// and disabled options for all buttons\n\n// scss-docs-start btn-variant-mixin\n@mixin button-variant(\n  $background,\n  $border,\n  $color: color-contrast($background),\n  $hover-background: if($color == $color-contrast-light, shade-color($background, $btn-hover-bg-shade-amount), tint-color($background, $btn-hover-bg-tint-amount)),\n  $hover-border: if($color == $color-contrast-light, shade-color($border, $btn-hover-border-shade-amount), tint-color($border, $btn-hover-border-tint-amount)),\n  $hover-color: color-contrast($hover-background),\n  $active-background: if($color == $color-contrast-light, shade-color($background,$btn-active-bg-shade-amount), tint-color($background, $btn-active-bg-tint-amount)),\n  $active-border: if($color == $color-contrast-light, shade-color($border, $btn-active-border-shade-amount), tint-color($border, $btn-active-border-tint-amount)),\n  $active-color: color-contrast($active-background),\n  $disabled-background: $background,\n  $disabled-border: $border,\n  $disabled-color: color-contrast($disabled-background)\n) {\n  color: $color;\n  @include gradient-bg($background);\n  border-color: $border;\n  @include box-shadow($btn-box-shadow);\n\n  &:hover {\n    color: $hover-color;\n    @include gradient-bg($hover-background);\n    border-color: $hover-border;\n  }\n\n  .btn-check:focus + &,\n  &:focus {\n    color: $hover-color;\n    @include gradient-bg($hover-background);\n    border-color: $hover-border;\n    @if $enable-shadows {\n      @include box-shadow($btn-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));\n    } @else {\n      // Avoid using mixin so we can pass custom focus shadow properly\n      box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);\n    }\n  }\n\n  .btn-check:checked + &,\n  .btn-check:active + &,\n  &:active,\n  &.active,\n  .show > &.dropdown-toggle {\n    color: $active-color;\n    background-color: $active-background;\n    // Remove CSS gradients if they're enabled\n    background-image: if($enable-gradients, none, null);\n    border-color: $active-border;\n\n    &:focus {\n      @if $enable-shadows {\n        @include box-shadow($btn-active-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));\n      } @else {\n        // Avoid using mixin so we can pass custom focus shadow properly\n        box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);\n      }\n    }\n  }\n\n  &:disabled,\n  &.disabled {\n    color: $disabled-color;\n    background-color: $disabled-background;\n    // Remove CSS gradients if they're enabled\n    background-image: if($enable-gradients, none, null);\n    border-color: $disabled-border;\n  }\n}\n// scss-docs-end btn-variant-mixin\n\n// scss-docs-start btn-outline-variant-mixin\n@mixin button-outline-variant(\n  $color,\n  $color-hover: color-contrast($color),\n  $active-background: $color,\n  $active-border: $color,\n  $active-color: color-contrast($active-background)\n) {\n  color: $color;\n  border-color: $color;\n\n  &:hover {\n    color: $color-hover;\n    background-color: $active-background;\n    border-color: $active-border;\n  }\n\n  .btn-check:focus + &,\n  &:focus {\n    box-shadow: 0 0 0 $btn-focus-width rgba($color, .5);\n  }\n\n  .btn-check:checked + &,\n  .btn-check:active + &,\n  &:active,\n  &.active,\n  &.dropdown-toggle.show {\n    color: $active-color;\n    background-color: $active-background;\n    border-color: $active-border;\n\n    &:focus {\n      @if $enable-shadows {\n        @include box-shadow($btn-active-box-shadow, 0 0 0 $btn-focus-width rgba($color, .5));\n      } @else {\n        // Avoid using mixin so we can pass custom focus shadow properly\n        box-shadow: 0 0 0 $btn-focus-width rgba($color, .5);\n      }\n    }\n  }\n\n  &:disabled,\n  &.disabled {\n    color: $color;\n    background-color: transparent;\n  }\n}\n// scss-docs-end btn-outline-variant-mixin\n\n// scss-docs-start btn-size-mixin\n@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {\n  padding: $padding-y $padding-x;\n  @include font-size($font-size);\n  // Manually declare to provide an override to the browser default\n  @include border-radius($border-radius, 0);\n}\n// scss-docs-end btn-size-mixin\n",".fade {\n  @include transition($transition-fade);\n\n  &:not(.show) {\n    opacity: 0;\n  }\n}\n\n// scss-docs-start collapse-classes\n.collapse {\n  &:not(.show) {\n    display: none;\n  }\n}\n\n.collapsing {\n  height: 0;\n  overflow: hidden;\n  @include transition($transition-collapse);\n}\n// scss-docs-end collapse-classes\n","// The dropdown wrapper (`<div>`)\n.dropup,\n.dropend,\n.dropdown,\n.dropstart {\n  position: relative;\n}\n\n.dropdown-toggle {\n  white-space: nowrap;\n\n  // Generate the caret automatically\n  @include caret();\n}\n\n// The dropdown menu\n.dropdown-menu {\n  position: absolute;\n  z-index: $zindex-dropdown;\n  display: none; // none by default, but block on \"open\" of the menu\n  min-width: $dropdown-min-width;\n  padding: $dropdown-padding-y $dropdown-padding-x;\n  margin: 0; // Override default margin of ul\n  @include font-size($dropdown-font-size);\n  color: $dropdown-color;\n  text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)\n  list-style: none;\n  background-color: $dropdown-bg;\n  background-clip: padding-box;\n  border: $dropdown-border-width solid $dropdown-border-color;\n  @include border-radius($dropdown-border-radius);\n  @include box-shadow($dropdown-box-shadow);\n\n  &[data-bs-popper] {\n    top: 100%;\n    left: 0;\n    margin-top: $dropdown-spacer;\n  }\n}\n\n// scss-docs-start responsive-breakpoints\n// We deliberately hardcode the `bs-` prefix because we check\n// this custom property in JS to determine Popper's positioning\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .dropdown-menu#{$infix}-start {\n      --bs-position: start;\n\n      &[data-bs-popper] {\n        right: auto #{\"/* rtl:ignore */\"};\n        left: 0 #{\"/* rtl:ignore */\"};\n      }\n    }\n\n    .dropdown-menu#{$infix}-end {\n      --bs-position: end;\n\n      &[data-bs-popper] {\n        right: 0 #{\"/* rtl:ignore */\"};\n        left: auto #{\"/* rtl:ignore */\"};\n      }\n    }\n  }\n}\n// scss-docs-end responsive-breakpoints\n\n// Allow for dropdowns to go bottom up (aka, dropup-menu)\n// Just add .dropup after the standard .dropdown class and you're set.\n.dropup {\n  .dropdown-menu[data-bs-popper] {\n    top: auto;\n    bottom: 100%;\n    margin-top: 0;\n    margin-bottom: $dropdown-spacer;\n  }\n\n  .dropdown-toggle {\n    @include caret(up);\n  }\n}\n\n.dropend {\n  .dropdown-menu[data-bs-popper] {\n    top: 0;\n    right: auto;\n    left: 100%;\n    margin-top: 0;\n    margin-left: $dropdown-spacer;\n  }\n\n  .dropdown-toggle {\n    @include caret(end);\n    &::after {\n      vertical-align: 0;\n    }\n  }\n}\n\n.dropstart {\n  .dropdown-menu[data-bs-popper] {\n    top: 0;\n    right: 100%;\n    left: auto;\n    margin-top: 0;\n    margin-right: $dropdown-spacer;\n  }\n\n  .dropdown-toggle {\n    @include caret(start);\n    &::before {\n      vertical-align: 0;\n    }\n  }\n}\n\n\n// Dividers (basically an `<hr>`) within the dropdown\n.dropdown-divider {\n  height: 0;\n  margin: $dropdown-divider-margin-y 0;\n  overflow: hidden;\n  border-top: 1px solid $dropdown-divider-bg;\n}\n\n// Links, buttons, and more within the dropdown menu\n//\n// `<button>`-specific styles are denoted with `// For <button>s`\n.dropdown-item {\n  display: block;\n  width: 100%; // For `<button>`s\n  padding: $dropdown-item-padding-y $dropdown-item-padding-x;\n  clear: both;\n  font-weight: $font-weight-normal;\n  color: $dropdown-link-color;\n  text-align: inherit; // For `<button>`s\n  text-decoration: if($link-decoration == none, null, none);\n  white-space: nowrap; // prevent links from randomly breaking onto new lines\n  background-color: transparent; // For `<button>`s\n  border: 0; // For `<button>`s\n\n  // Prevent dropdown overflow if there's no padding\n  // See https://github.com/twbs/bootstrap/pull/27703\n  @if $dropdown-padding-y == 0 {\n    &:first-child {\n      @include border-top-radius($dropdown-inner-border-radius);\n    }\n\n    &:last-child {\n      @include border-bottom-radius($dropdown-inner-border-radius);\n    }\n  }\n\n  &:hover,\n  &:focus {\n    color: $dropdown-link-hover-color;\n    text-decoration: if($link-hover-decoration == underline, none, null);\n    @include gradient-bg($dropdown-link-hover-bg);\n  }\n\n  &.active,\n  &:active {\n    color: $dropdown-link-active-color;\n    text-decoration: none;\n    @include gradient-bg($dropdown-link-active-bg);\n  }\n\n  &.disabled,\n  &:disabled {\n    color: $dropdown-link-disabled-color;\n    pointer-events: none;\n    background-color: transparent;\n    // Remove CSS gradients if they're enabled\n    background-image: if($enable-gradients, none, null);\n  }\n}\n\n.dropdown-menu.show {\n  display: block;\n}\n\n// Dropdown section headers\n.dropdown-header {\n  display: block;\n  padding: $dropdown-header-padding;\n  margin-bottom: 0; // for use with heading elements\n  @include font-size($font-size-sm);\n  color: $dropdown-header-color;\n  white-space: nowrap; // as with > li > a\n}\n\n// Dropdown text\n.dropdown-item-text {\n  display: block;\n  padding: $dropdown-item-padding-y $dropdown-item-padding-x;\n  color: $dropdown-link-color;\n}\n\n// Dark dropdowns\n.dropdown-menu-dark {\n  color: $dropdown-dark-color;\n  background-color: $dropdown-dark-bg;\n  border-color: $dropdown-dark-border-color;\n  @include box-shadow($dropdown-dark-box-shadow);\n\n  .dropdown-item {\n    color: $dropdown-dark-link-color;\n\n    &:hover,\n    &:focus {\n      color: $dropdown-dark-link-hover-color;\n      @include gradient-bg($dropdown-dark-link-hover-bg);\n    }\n\n    &.active,\n    &:active {\n      color: $dropdown-dark-link-active-color;\n      @include gradient-bg($dropdown-dark-link-active-bg);\n    }\n\n    &.disabled,\n    &:disabled {\n      color: $dropdown-dark-link-disabled-color;\n    }\n  }\n\n  .dropdown-divider {\n    border-color: $dropdown-dark-divider-bg;\n  }\n\n  .dropdown-item-text {\n    color: $dropdown-dark-link-color;\n  }\n\n  .dropdown-header {\n    color: $dropdown-dark-header-color;\n  }\n}\n","// scss-docs-start caret-mixins\n@mixin caret-down {\n  border-top: $caret-width solid;\n  border-right: $caret-width solid transparent;\n  border-bottom: 0;\n  border-left: $caret-width solid transparent;\n}\n\n@mixin caret-up {\n  border-top: 0;\n  border-right: $caret-width solid transparent;\n  border-bottom: $caret-width solid;\n  border-left: $caret-width solid transparent;\n}\n\n@mixin caret-end {\n  border-top: $caret-width solid transparent;\n  border-right: 0;\n  border-bottom: $caret-width solid transparent;\n  border-left: $caret-width solid;\n}\n\n@mixin caret-start {\n  border-top: $caret-width solid transparent;\n  border-right: $caret-width solid;\n  border-bottom: $caret-width solid transparent;\n}\n\n@mixin caret($direction: down) {\n  @if $enable-caret {\n    &::after {\n      display: inline-block;\n      margin-left: $caret-spacing;\n      vertical-align: $caret-vertical-align;\n      content: \"\";\n      @if $direction == down {\n        @include caret-down();\n      } @else if $direction == up {\n        @include caret-up();\n      } @else if $direction == end {\n        @include caret-end();\n      }\n    }\n\n    @if $direction == start {\n      &::after {\n        display: none;\n      }\n\n      &::before {\n        display: inline-block;\n        margin-right: $caret-spacing;\n        vertical-align: $caret-vertical-align;\n        content: \"\";\n        @include caret-start();\n      }\n    }\n\n    &:empty::after {\n      margin-left: 0;\n    }\n  }\n}\n// scss-docs-end caret-mixins\n","// Make the div behave like a button\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; // match .btn alignment given font-size hack above\n\n  > .btn {\n    position: relative;\n    flex: 1 1 auto;\n  }\n\n  // Bring the hover, focused, and \"active\" buttons to the front to overlay\n  // the borders properly\n  > .btn-check:checked + .btn,\n  > .btn-check:focus + .btn,\n  > .btn:hover,\n  > .btn:focus,\n  > .btn:active,\n  > .btn.active {\n    z-index: 1;\n  }\n}\n\n// Optional: Group multiple button groups together for a toolbar\n.btn-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n\n  .input-group {\n    width: auto;\n  }\n}\n\n.btn-group {\n  // Prevent double borders when buttons are next to each other\n  > .btn:not(:first-child),\n  > .btn-group:not(:first-child) {\n    margin-left: -$btn-border-width;\n  }\n\n  // Reset rounded corners\n  > .btn:not(:last-child):not(.dropdown-toggle),\n  > .btn-group:not(:last-child) > .btn {\n    @include border-end-radius(0);\n  }\n\n  // The left radius should be 0 if the button is:\n  // - the \"third or more\" child\n  // - the second child and the previous element isn't `.btn-check` (making it the first child visually)\n  // - part of a btn-group which isn't the first child\n  > .btn:nth-child(n + 3),\n  > :not(.btn-check) + .btn,\n  > .btn-group:not(:first-child) > .btn {\n    @include border-start-radius(0);\n  }\n}\n\n// Sizing\n//\n// Remix the default button sizing classes into new ones for easier manipulation.\n\n.btn-group-sm > .btn { @extend .btn-sm; }\n.btn-group-lg > .btn { @extend .btn-lg; }\n\n\n//\n// Split button dropdowns\n//\n\n.dropdown-toggle-split {\n  padding-right: $btn-padding-x * .75;\n  padding-left: $btn-padding-x * .75;\n\n  &::after,\n  .dropup &::after,\n  .dropend &::after {\n    margin-left: 0;\n  }\n\n  .dropstart &::before {\n    margin-right: 0;\n  }\n}\n\n.btn-sm + .dropdown-toggle-split {\n  padding-right: $btn-padding-x-sm * .75;\n  padding-left: $btn-padding-x-sm * .75;\n}\n\n.btn-lg + .dropdown-toggle-split {\n  padding-right: $btn-padding-x-lg * .75;\n  padding-left: $btn-padding-x-lg * .75;\n}\n\n\n// The clickable button for toggling the menu\n// Set the same inset shadow as the :active state\n.btn-group.show .dropdown-toggle {\n  @include box-shadow($btn-active-box-shadow);\n\n  // Show no shadow for `.btn-link` since it has no other button styles.\n  &.btn-link {\n    @include box-shadow(none);\n  }\n}\n\n\n//\n// Vertical button groups\n//\n\n.btn-group-vertical {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n\n  > .btn,\n  > .btn-group {\n    width: 100%;\n  }\n\n  > .btn:not(:first-child),\n  > .btn-group:not(:first-child) {\n    margin-top: -$btn-border-width;\n  }\n\n  // Reset rounded corners\n  > .btn:not(:last-child):not(.dropdown-toggle),\n  > .btn-group:not(:last-child) > .btn {\n    @include border-bottom-radius(0);\n  }\n\n  > .btn ~ .btn,\n  > .btn-group:not(:first-child) > .btn {\n    @include border-top-radius(0);\n  }\n}\n","// Base class\n//\n// Kickstart any navigation component with a set of style resets. Works with\n// `<nav>`s, `<ul>`s or `<ol>`s.\n\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link {\n  display: block;\n  padding: $nav-link-padding-y $nav-link-padding-x;\n  @include font-size($nav-link-font-size);\n  font-weight: $nav-link-font-weight;\n  color: $nav-link-color;\n  text-decoration: if($link-decoration == none, null, none);\n  @include transition($nav-link-transition);\n\n  &:hover,\n  &:focus {\n    color: $nav-link-hover-color;\n    text-decoration: if($link-hover-decoration == underline, none, null);\n  }\n\n  // Disabled state lightens text\n  &.disabled {\n    color: $nav-link-disabled-color;\n    pointer-events: none;\n    cursor: default;\n  }\n}\n\n//\n// Tabs\n//\n\n.nav-tabs {\n  border-bottom: $nav-tabs-border-width solid $nav-tabs-border-color;\n\n  .nav-link {\n    margin-bottom: -$nav-tabs-border-width;\n    background: none;\n    border: $nav-tabs-border-width solid transparent;\n    @include border-top-radius($nav-tabs-border-radius);\n\n    &:hover,\n    &:focus {\n      border-color: $nav-tabs-link-hover-border-color;\n      // Prevents active .nav-link tab overlapping focus outline of previous/next .nav-link\n      isolation: isolate;\n    }\n\n    &.disabled {\n      color: $nav-link-disabled-color;\n      background-color: transparent;\n      border-color: transparent;\n    }\n  }\n\n  .nav-link.active,\n  .nav-item.show .nav-link {\n    color: $nav-tabs-link-active-color;\n    background-color: $nav-tabs-link-active-bg;\n    border-color: $nav-tabs-link-active-border-color;\n  }\n\n  .dropdown-menu {\n    // Make dropdown border overlap tab border\n    margin-top: -$nav-tabs-border-width;\n    // Remove the top rounded corners here since there is a hard edge above the menu\n    @include border-top-radius(0);\n  }\n}\n\n\n//\n// Pills\n//\n\n.nav-pills {\n  .nav-link {\n    background: none;\n    border: 0;\n    @include border-radius($nav-pills-border-radius);\n  }\n\n  .nav-link.active,\n  .show > .nav-link {\n    color: $nav-pills-link-active-color;\n    @include gradient-bg($nav-pills-link-active-bg);\n  }\n}\n\n\n//\n// Justified variants\n//\n\n.nav-fill {\n  > .nav-link,\n  .nav-item {\n    flex: 1 1 auto;\n    text-align: center;\n  }\n}\n\n.nav-justified {\n  > .nav-link,\n  .nav-item {\n    flex-basis: 0;\n    flex-grow: 1;\n    text-align: center;\n  }\n}\n\n.nav-fill,\n.nav-justified {\n  .nav-item .nav-link {\n    width: 100%; // Make sure button will grow\n  }\n}\n\n\n// Tabbable tabs\n//\n// Hide tabbable panes to start, show them when `.active`\n\n.tab-content {\n  > .tab-pane {\n    display: none;\n  }\n  > .active {\n    display: block;\n  }\n}\n","// Contents\n//\n// Navbar\n// Navbar brand\n// Navbar nav\n// Navbar text\n// Responsive navbar\n// Navbar position\n// Navbar themes\n\n\n// Navbar\n//\n// Provide a static navbar from which we expand to create full-width, fixed, and\n// other navbar variations.\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap; // allow us to do the line break for collapsing content\n  align-items: center;\n  justify-content: space-between; // space out brand from logo\n  padding-top: $navbar-padding-y;\n  padding-right: $navbar-padding-x; // default: null\n  padding-bottom: $navbar-padding-y;\n  padding-left: $navbar-padding-x; // default: null\n  @include gradient-bg();\n\n  // Because flex properties aren't inherited, we need to redeclare these first\n  // few properties so that content nested within behave properly.\n  // The `flex-wrap` property is inherited to simplify the expanded navbars\n  %container-flex-properties {\n    display: flex;\n    flex-wrap: inherit;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  > .container,\n  > .container-fluid {\n    @extend %container-flex-properties;\n  }\n\n  @each $breakpoint, $container-max-width in $container-max-widths {\n    > .container#{breakpoint-infix($breakpoint, $container-max-widths)} {\n      @extend %container-flex-properties;\n    }\n  }\n}\n\n\n// Navbar brand\n//\n// Used for brand, project, or site names.\n\n.navbar-brand {\n  padding-top: $navbar-brand-padding-y;\n  padding-bottom: $navbar-brand-padding-y;\n  margin-right: $navbar-brand-margin-end;\n  @include font-size($navbar-brand-font-size);\n  text-decoration: if($link-decoration == none, null, none);\n  white-space: nowrap;\n\n  &:hover,\n  &:focus {\n    text-decoration: if($link-hover-decoration == underline, none, null);\n  }\n}\n\n\n// Navbar nav\n//\n// Custom navbar navigation (doesn't require `.nav`, but does make use of `.nav-link`).\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column; // cannot use `inherit` to get the `.navbar`s value\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n\n  .nav-link {\n    padding-right: 0;\n    padding-left: 0;\n  }\n\n  .dropdown-menu {\n    position: static;\n  }\n}\n\n\n// Navbar text\n//\n//\n\n.navbar-text {\n  padding-top: $nav-link-padding-y;\n  padding-bottom: $nav-link-padding-y;\n}\n\n\n// Responsive navbar\n//\n// Custom styles for responsive collapsing and toggling of navbar contents.\n// Powered by the collapse Bootstrap JavaScript plugin.\n\n// When collapsed, prevent the toggleable navbar contents from appearing in\n// the default flexbox row orientation. Requires the use of `flex-wrap: wrap`\n// on the `.navbar` parent.\n.navbar-collapse {\n  flex-basis: 100%;\n  flex-grow: 1;\n  // For always expanded or extra full navbars, ensure content aligns itself\n  // properly vertically. Can be easily overridden with flex utilities.\n  align-items: center;\n}\n\n// Button for toggling the navbar when in its collapsed state\n.navbar-toggler {\n  padding: $navbar-toggler-padding-y $navbar-toggler-padding-x;\n  @include font-size($navbar-toggler-font-size);\n  line-height: 1;\n  background-color: transparent; // remove default button style\n  border: $border-width solid transparent; // remove default button style\n  @include border-radius($navbar-toggler-border-radius);\n  @include transition($navbar-toggler-transition);\n\n  &:hover {\n    text-decoration: none;\n  }\n\n  &:focus {\n    text-decoration: none;\n    outline: 0;\n    box-shadow: 0 0 0 $navbar-toggler-focus-width;\n  }\n}\n\n// Keep as a separate element so folks can easily override it with another icon\n// or image file as needed.\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100%;\n}\n\n.navbar-nav-scroll {\n  max-height: var(--#{$variable-prefix}scroll-height, 75vh);\n  overflow-y: auto;\n}\n\n// scss-docs-start navbar-expand-loop\n// Generate series of `.navbar-expand-*` responsive classes for configuring\n// where your navbar collapses.\n.navbar-expand {\n  @each $breakpoint in map-keys($grid-breakpoints) {\n    $next: breakpoint-next($breakpoint, $grid-breakpoints);\n    $infix: breakpoint-infix($next, $grid-breakpoints);\n\n    // stylelint-disable-next-line scss/selector-no-union-class-name\n    &#{$infix} {\n      @include media-breakpoint-up($next) {\n        flex-wrap: nowrap;\n        justify-content: flex-start;\n\n        .navbar-nav {\n          flex-direction: row;\n\n          .dropdown-menu {\n            position: absolute;\n          }\n\n          .nav-link {\n            padding-right: $navbar-nav-link-padding-x;\n            padding-left: $navbar-nav-link-padding-x;\n          }\n        }\n\n        .navbar-nav-scroll {\n          overflow: visible;\n        }\n\n        .navbar-collapse {\n          display: flex !important; // stylelint-disable-line declaration-no-important\n          flex-basis: auto;\n        }\n\n        .navbar-toggler {\n          display: none;\n        }\n      }\n    }\n  }\n}\n// scss-docs-end navbar-expand-loop\n\n\n// Navbar themes\n//\n// Styles for switching between navbars with light or dark background.\n\n// Dark links against a light background\n.navbar-light {\n  .navbar-brand {\n    color: $navbar-light-brand-color;\n\n    &:hover,\n    &:focus {\n      color: $navbar-light-brand-hover-color;\n    }\n  }\n\n  .navbar-nav {\n    .nav-link {\n      color: $navbar-light-color;\n\n      &:hover,\n      &:focus {\n        color: $navbar-light-hover-color;\n      }\n\n      &.disabled {\n        color: $navbar-light-disabled-color;\n      }\n    }\n\n    .show > .nav-link,\n    .nav-link.active {\n      color: $navbar-light-active-color;\n    }\n  }\n\n  .navbar-toggler {\n    color: $navbar-light-color;\n    border-color: $navbar-light-toggler-border-color;\n  }\n\n  .navbar-toggler-icon {\n    background-image: escape-svg($navbar-light-toggler-icon-bg);\n  }\n\n  .navbar-text {\n    color: $navbar-light-color;\n\n    a,\n    a:hover,\n    a:focus  {\n      color: $navbar-light-active-color;\n    }\n  }\n}\n\n// White links against a dark background\n.navbar-dark {\n  .navbar-brand {\n    color: $navbar-dark-brand-color;\n\n    &:hover,\n    &:focus {\n      color: $navbar-dark-brand-hover-color;\n    }\n  }\n\n  .navbar-nav {\n    .nav-link {\n      color: $navbar-dark-color;\n\n      &:hover,\n      &:focus {\n        color: $navbar-dark-hover-color;\n      }\n\n      &.disabled {\n        color: $navbar-dark-disabled-color;\n      }\n    }\n\n    .show > .nav-link,\n    .nav-link.active {\n      color: $navbar-dark-active-color;\n    }\n  }\n\n  .navbar-toggler {\n    color: $navbar-dark-color;\n    border-color: $navbar-dark-toggler-border-color;\n  }\n\n  .navbar-toggler-icon {\n    background-image: escape-svg($navbar-dark-toggler-icon-bg);\n  }\n\n  .navbar-text {\n    color: $navbar-dark-color;\n    a,\n    a:hover,\n    a:focus {\n      color: $navbar-dark-active-color;\n    }\n  }\n}\n","//\n// Base styles\n//\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0; // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106\n  height: $card-height;\n  word-wrap: break-word;\n  background-color: $card-bg;\n  background-clip: border-box;\n  border: $card-border-width solid $card-border-color;\n  @include border-radius($card-border-radius);\n\n  > hr {\n    margin-right: 0;\n    margin-left: 0;\n  }\n\n  > .list-group {\n    border-top: inherit;\n    border-bottom: inherit;\n\n    &:first-child {\n      border-top-width: 0;\n      @include border-top-radius($card-inner-border-radius);\n    }\n\n    &:last-child  {\n      border-bottom-width: 0;\n      @include border-bottom-radius($card-inner-border-radius);\n    }\n  }\n\n  // Due to specificity of the above selector (`.card > .list-group`), we must\n  // use a child selector here to prevent double borders.\n  > .card-header + .list-group,\n  > .list-group + .card-footer {\n    border-top: 0;\n  }\n}\n\n.card-body {\n  // Enable `flex-grow: 1` for decks and groups so that card blocks take up\n  // as much space as possible, ensuring footers are aligned to the bottom.\n  flex: 1 1 auto;\n  padding: $card-spacer-y $card-spacer-x;\n  color: $card-color;\n}\n\n.card-title {\n  margin-bottom: $card-title-spacer-y;\n}\n\n.card-subtitle {\n  margin-top: -$card-title-spacer-y / 2;\n  margin-bottom: 0;\n}\n\n.card-text:last-child {\n  margin-bottom: 0;\n}\n\n.card-link {\n  &:hover {\n    text-decoration: none;\n  }\n\n  + .card-link {\n    margin-left: $card-spacer-x;\n  }\n}\n\n//\n// Optional textual caps\n//\n\n.card-header {\n  padding: $card-cap-padding-y $card-cap-padding-x;\n  margin-bottom: 0; // Removes the default margin-bottom of <hN>\n  color: $card-cap-color;\n  background-color: $card-cap-bg;\n  border-bottom: $card-border-width solid $card-border-color;\n\n  &:first-child {\n    @include border-radius($card-inner-border-radius $card-inner-border-radius 0 0);\n  }\n}\n\n.card-footer {\n  padding: $card-cap-padding-y $card-cap-padding-x;\n  color: $card-cap-color;\n  background-color: $card-cap-bg;\n  border-top: $card-border-width solid $card-border-color;\n\n  &:last-child {\n    @include border-radius(0 0 $card-inner-border-radius $card-inner-border-radius);\n  }\n}\n\n\n//\n// Header navs\n//\n\n.card-header-tabs {\n  margin-right: -$card-cap-padding-x / 2;\n  margin-bottom: -$card-cap-padding-y;\n  margin-left: -$card-cap-padding-x / 2;\n  border-bottom: 0;\n\n  @if $nav-tabs-link-active-bg != $card-bg {\n    .nav-link.active {\n      background-color: $card-bg;\n      border-bottom-color: $card-bg;\n    }\n  }\n}\n\n.card-header-pills {\n  margin-right: -$card-cap-padding-x / 2;\n  margin-left: -$card-cap-padding-x / 2;\n}\n\n// Card image\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: $card-img-overlay-padding;\n  @include border-radius($card-inner-border-radius);\n}\n\n.card-img,\n.card-img-top,\n.card-img-bottom {\n  width: 100%; // Required because we use flexbox and this inherently applies align-self: stretch\n}\n\n.card-img,\n.card-img-top {\n  @include border-top-radius($card-inner-border-radius);\n}\n\n.card-img,\n.card-img-bottom {\n  @include border-bottom-radius($card-inner-border-radius);\n}\n\n\n//\n// Card groups\n//\n\n.card-group {\n  // The child selector allows nested `.card` within `.card-group`\n  // to display properly.\n  > .card {\n    margin-bottom: $card-group-margin;\n  }\n\n  @include media-breakpoint-up(sm) {\n    display: flex;\n    flex-flow: row wrap;\n    // The child selector allows nested `.card` within `.card-group`\n    // to display properly.\n    > .card {\n      // Flexbugs #4: https://github.com/philipwalton/flexbugs#flexbug-4\n      flex: 1 0 0%;\n      margin-bottom: 0;\n\n      + .card {\n        margin-left: 0;\n        border-left: 0;\n      }\n\n      // Handle rounded corners\n      @if $enable-rounded {\n        &:not(:last-child) {\n          @include border-end-radius(0);\n\n          .card-img-top,\n          .card-header {\n            // stylelint-disable-next-line property-disallowed-list\n            border-top-right-radius: 0;\n          }\n          .card-img-bottom,\n          .card-footer {\n            // stylelint-disable-next-line property-disallowed-list\n            border-bottom-right-radius: 0;\n          }\n        }\n\n        &:not(:first-child) {\n          @include border-start-radius(0);\n\n          .card-img-top,\n          .card-header {\n            // stylelint-disable-next-line property-disallowed-list\n            border-top-left-radius: 0;\n          }\n          .card-img-bottom,\n          .card-footer {\n            // stylelint-disable-next-line property-disallowed-list\n            border-bottom-left-radius: 0;\n          }\n        }\n      }\n    }\n  }\n}\n","//\n// Base styles\n//\n\n.accordion-button {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: $accordion-button-padding-y $accordion-button-padding-x;\n  @include font-size($font-size-base);\n  color: $accordion-button-color;\n  text-align: left; // Reset button style\n  background-color: $accordion-button-bg;\n  border: 0;\n  @include border-radius(0);\n  overflow-anchor: none;\n  @include transition($accordion-transition);\n\n  &:not(.collapsed) {\n    color: $accordion-button-active-color;\n    background-color: $accordion-button-active-bg;\n    box-shadow: inset 0 ($accordion-border-width * -1) 0 $accordion-border-color;\n\n    &::after {\n      background-image: escape-svg($accordion-button-active-icon);\n      transform: $accordion-icon-transform;\n    }\n  }\n\n  // Accordion icon\n  &::after {\n    flex-shrink: 0;\n    width: $accordion-icon-width;\n    height: $accordion-icon-width;\n    margin-left: auto;\n    content: \"\";\n    background-image: escape-svg($accordion-button-icon);\n    background-repeat: no-repeat;\n    background-size: $accordion-icon-width;\n    @include transition($accordion-icon-transition);\n  }\n\n  &:hover {\n    z-index: 2;\n  }\n\n  &:focus {\n    z-index: 3;\n    border-color: $accordion-button-focus-border-color;\n    outline: 0;\n    box-shadow: $accordion-button-focus-box-shadow;\n  }\n}\n\n.accordion-header {\n  margin-bottom: 0;\n}\n\n.accordion-item {\n  background-color: $accordion-bg;\n  border: $accordion-border-width solid $accordion-border-color;\n\n  &:first-of-type {\n    @include border-top-radius($accordion-border-radius);\n\n    .accordion-button {\n      @include border-top-radius($accordion-inner-border-radius);\n    }\n  }\n\n  &:not(:first-of-type) {\n    border-top: 0;\n  }\n\n  // Only set a border-radius on the last item if the accordion is collapsed\n  &:last-of-type {\n    @include border-bottom-radius($accordion-border-radius);\n\n    .accordion-button {\n      &.collapsed {\n        @include border-bottom-radius($accordion-inner-border-radius);\n      }\n    }\n\n    .accordion-collapse {\n      @include border-bottom-radius($accordion-border-radius);\n    }\n  }\n}\n\n.accordion-body {\n  padding: $accordion-body-padding-y $accordion-body-padding-x;\n}\n\n\n// Flush accordion items\n//\n// Remove borders and border-radius to keep accordion items edge-to-edge.\n\n.accordion-flush {\n  .accordion-collapse {\n    border-width: 0;\n  }\n\n  .accordion-item {\n    border-right: 0;\n    border-left: 0;\n    @include border-radius(0);\n\n    &:first-child { border-top: 0; }\n    &:last-child { border-bottom: 0; }\n\n    .accordion-button {\n      @include border-radius(0);\n    }\n  }\n}\n",".breadcrumb {\n  display: flex;\n  flex-wrap: wrap;\n  padding: $breadcrumb-padding-y $breadcrumb-padding-x;\n  margin-bottom: $breadcrumb-margin-bottom;\n  @include font-size($breadcrumb-font-size);\n  list-style: none;\n  background-color: $breadcrumb-bg;\n  @include border-radius($breadcrumb-border-radius);\n}\n\n.breadcrumb-item {\n  // The separator between breadcrumbs (by default, a forward-slash: \"/\")\n  + .breadcrumb-item {\n    padding-left: $breadcrumb-item-padding-x;\n\n    &::before {\n      float: left; // Suppress inline spacings and underlining of the separator\n      padding-right: $breadcrumb-item-padding-x;\n      color: $breadcrumb-divider-color;\n      content: var(--#{$variable-prefix}breadcrumb-divider, escape-svg($breadcrumb-divider)) #{\"/* rtl:\"} var(--#{$variable-prefix}breadcrumb-divider, escape-svg($breadcrumb-divider-flipped)) #{\"*/\"};\n    }\n  }\n\n  &.active {\n    color: $breadcrumb-active-color;\n  }\n}\n",".pagination {\n  display: flex;\n  @include list-unstyled();\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  color: $pagination-color;\n  text-decoration: if($link-decoration == none, null, none);\n  background-color: $pagination-bg;\n  border: $pagination-border-width solid $pagination-border-color;\n  @include transition($pagination-transition);\n\n  &:hover {\n    z-index: 2;\n    color: $pagination-hover-color;\n    text-decoration: if($link-hover-decoration == underline, none, null);\n    background-color: $pagination-hover-bg;\n    border-color: $pagination-hover-border-color;\n  }\n\n  &:focus {\n    z-index: 3;\n    color: $pagination-focus-color;\n    background-color: $pagination-focus-bg;\n    outline: $pagination-focus-outline;\n    box-shadow: $pagination-focus-box-shadow;\n  }\n}\n\n.page-item {\n  &:not(:first-child) .page-link {\n    margin-left: $pagination-margin-start;\n  }\n\n  &.active .page-link {\n    z-index: 3;\n    color: $pagination-active-color;\n    @include gradient-bg($pagination-active-bg);\n    border-color: $pagination-active-border-color;\n  }\n\n  &.disabled .page-link {\n    color: $pagination-disabled-color;\n    pointer-events: none;\n    background-color: $pagination-disabled-bg;\n    border-color: $pagination-disabled-border-color;\n  }\n}\n\n\n//\n// Sizing\n//\n@include pagination-size($pagination-padding-y, $pagination-padding-x, null, $pagination-border-radius);\n\n.pagination-lg {\n  @include pagination-size($pagination-padding-y-lg, $pagination-padding-x-lg, $font-size-lg, $pagination-border-radius-lg);\n}\n\n.pagination-sm {\n  @include pagination-size($pagination-padding-y-sm, $pagination-padding-x-sm, $font-size-sm, $pagination-border-radius-sm);\n}\n","// Pagination\n\n// scss-docs-start pagination-mixin\n@mixin pagination-size($padding-y, $padding-x, $font-size, $border-radius) {\n  .page-link {\n    padding: $padding-y $padding-x;\n    @include font-size($font-size);\n  }\n\n  .page-item {\n    @if $pagination-margin-start == (-$pagination-border-width) {\n      &:first-child {\n        .page-link {\n          @include border-start-radius($border-radius);\n        }\n      }\n\n      &:last-child {\n        .page-link {\n          @include border-end-radius($border-radius);\n        }\n      }\n    } @else {\n      //Add border-radius to all pageLinks in case they have left margin\n      .page-link {\n        @include border-radius($border-radius);\n      }\n    }\n  }\n}\n// scss-docs-end pagination-mixin\n","// Base class\n//\n// Requires one of the contextual, color modifier classes for `color` and\n// `background-color`.\n\n.badge {\n  display: inline-block;\n  padding: $badge-padding-y $badge-padding-x;\n  @include font-size($badge-font-size);\n  font-weight: $badge-font-weight;\n  line-height: 1;\n  color: $badge-color;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  @include border-radius($badge-border-radius);\n  @include gradient-bg();\n\n  // Empty badges collapse automatically\n  &:empty {\n    display: none;\n  }\n}\n\n// Quick fix for badges in buttons\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n","//\n// Base styles\n//\n\n.alert {\n  position: relative;\n  padding: $alert-padding-y $alert-padding-x;\n  margin-bottom: $alert-margin-bottom;\n  border: $alert-border-width solid transparent;\n  @include border-radius($alert-border-radius);\n}\n\n// Headings for larger alerts\n.alert-heading {\n  // Specified to prevent conflicts of changing $headings-color\n  color: inherit;\n}\n\n// Provide class for links that match alerts\n.alert-link {\n  font-weight: $alert-link-font-weight;\n}\n\n\n// Dismissible alerts\n//\n// Expand the right padding and account for the close button's positioning.\n\n.alert-dismissible {\n  padding-right: $alert-dismissible-padding-r;\n\n  // Adjust close link position\n  .btn-close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: $stretched-link-z-index + 1;\n    padding: $alert-padding-y * 1.25 $alert-padding-x;\n  }\n}\n\n\n// scss-docs-start alert-modifiers\n// Generate contextual modifier classes for colorizing the alert.\n\n@each $state, $value in $theme-colors {\n  $alert-background: shift-color($value, $alert-bg-scale);\n  $alert-border: shift-color($value, $alert-border-scale);\n  $alert-color: shift-color($value, $alert-color-scale);\n  @if (contrast-ratio($alert-background, $alert-color) < $min-contrast-ratio) {\n    $alert-color: mix($value, color-contrast($alert-background), abs($alert-color-scale));\n  }\n  .alert-#{$state} {\n    @include alert-variant($alert-background, $alert-border, $alert-color);\n  }\n}\n// scss-docs-end alert-modifiers\n","// scss-docs-start alert-variant-mixin\n@mixin alert-variant($background, $border, $color) {\n  color: $color;\n  @include gradient-bg($background);\n  border-color: $border;\n\n  .alert-link {\n    color: shade-color($color, 20%);\n  }\n}\n// scss-docs-end alert-variant-mixin\n","// Disable animation if transitions are disabled\n\n// scss-docs-start progress-keyframes\n@if $enable-transitions {\n  @keyframes progress-bar-stripes {\n    0% { background-position-x: $progress-height; }\n  }\n}\n// scss-docs-end progress-keyframes\n\n.progress {\n  display: flex;\n  height: $progress-height;\n  overflow: hidden; // force rounded corners by cropping it\n  @include font-size($progress-font-size);\n  background-color: $progress-bg;\n  @include border-radius($progress-border-radius);\n  @include box-shadow($progress-box-shadow);\n}\n\n.progress-bar {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  color: $progress-bar-color;\n  text-align: center;\n  white-space: nowrap;\n  background-color: $progress-bar-bg;\n  @include transition($progress-bar-transition);\n}\n\n.progress-bar-striped {\n  @include gradient-striped();\n  background-size: $progress-height $progress-height;\n}\n\n@if $enable-transitions {\n  .progress-bar-animated {\n    animation: $progress-bar-animation-timing progress-bar-stripes;\n\n    @if $enable-reduced-motion {\n      @media (prefers-reduced-motion: reduce) {\n        animation: none;\n      }\n    }\n  }\n}\n","// Base class\n//\n// Easily usable on <ul>, <ol>, or <div>.\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n\n  // No need to set list-style: none; since .list-group-item is block level\n  padding-left: 0; // reset padding because ul and ol\n  margin-bottom: 0;\n  @include border-radius($list-group-border-radius);\n}\n\n.list-group-numbered {\n  list-style-type: none;\n  counter-reset: section;\n\n  > li::before {\n    // Increments only this instance of the section counter\n    content: counters(section, \".\") \". \";\n    counter-increment: section;\n  }\n}\n\n\n// Interactive list items\n//\n// Use anchor or button elements instead of `li`s or `div`s to create interactive\n// list items. Includes an extra `.active` modifier class for selected items.\n\n.list-group-item-action {\n  width: 100%; // For `<button>`s (anchors become 100% by default though)\n  color: $list-group-action-color;\n  text-align: inherit; // For `<button>`s (anchors inherit)\n\n  // Hover state\n  &:hover,\n  &:focus {\n    z-index: 1; // Place hover/focus items above their siblings for proper border styling\n    color: $list-group-action-hover-color;\n    text-decoration: none;\n    background-color: $list-group-hover-bg;\n  }\n\n  &:active {\n    color: $list-group-action-active-color;\n    background-color: $list-group-action-active-bg;\n  }\n}\n\n\n// Individual list items\n//\n// Use on `li`s or `div`s within the `.list-group` parent.\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: $list-group-item-padding-y $list-group-item-padding-x;\n  color: $list-group-color;\n  text-decoration: if($link-decoration == none, null, none);\n  background-color: $list-group-bg;\n  border: $list-group-border-width solid $list-group-border-color;\n\n  &:first-child {\n    @include border-top-radius(inherit);\n  }\n\n  &:last-child {\n    @include border-bottom-radius(inherit);\n  }\n\n  &.disabled,\n  &:disabled {\n    color: $list-group-disabled-color;\n    pointer-events: none;\n    background-color: $list-group-disabled-bg;\n  }\n\n  // Include both here for `<a>`s and `<button>`s\n  &.active {\n    z-index: 2; // Place active items above their siblings for proper border styling\n    color: $list-group-active-color;\n    background-color: $list-group-active-bg;\n    border-color: $list-group-active-border-color;\n  }\n\n  & + & {\n    border-top-width: 0;\n\n    &.active {\n      margin-top: -$list-group-border-width;\n      border-top-width: $list-group-border-width;\n    }\n  }\n}\n\n\n// Horizontal\n//\n// Change the layout of list group items from vertical (default) to horizontal.\n\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .list-group-horizontal#{$infix} {\n      flex-direction: row;\n\n      > .list-group-item {\n        &:first-child {\n          @include border-bottom-start-radius($list-group-border-radius);\n          @include border-top-end-radius(0);\n        }\n\n        &:last-child {\n          @include border-top-end-radius($list-group-border-radius);\n          @include border-bottom-start-radius(0);\n        }\n\n        &.active {\n          margin-top: 0;\n        }\n\n        + .list-group-item {\n          border-top-width: $list-group-border-width;\n          border-left-width: 0;\n\n          &.active {\n            margin-left: -$list-group-border-width;\n            border-left-width: $list-group-border-width;\n          }\n        }\n      }\n    }\n  }\n}\n\n\n// Flush list items\n//\n// Remove borders and border-radius to keep list group items edge-to-edge. Most\n// useful within other components (e.g., cards).\n\n.list-group-flush {\n  @include border-radius(0);\n\n  > .list-group-item {\n    border-width: 0 0 $list-group-border-width;\n\n    &:last-child {\n      border-bottom-width: 0;\n    }\n  }\n}\n\n\n// scss-docs-start list-group-modifiers\n// List group contextual variants\n//\n// Add modifier classes to change text and background color on individual items.\n// Organizationally, this must come after the `:hover` states.\n\n@each $state, $value in $theme-colors {\n  $list-group-variant-bg: shift-color($value, $list-group-item-bg-scale);\n  $list-group-variant-color: shift-color($value, $list-group-item-color-scale);\n  @if (contrast-ratio($list-group-variant-bg, $list-group-variant-color) < $min-contrast-ratio) {\n    $list-group-variant-color: mix($value, color-contrast($list-group-variant-bg), abs($list-group-item-color-scale));\n  }\n\n  @include list-group-item-variant($state, $list-group-variant-bg, $list-group-variant-color);\n}\n// scss-docs-end list-group-modifiers\n","// List Groups\n\n// scss-docs-start list-group-mixin\n@mixin list-group-item-variant($state, $background, $color) {\n  .list-group-item-#{$state} {\n    color: $color;\n    background-color: $background;\n\n    &.list-group-item-action {\n      &:hover,\n      &:focus {\n        color: $color;\n        background-color: shade-color($background, 10%);\n      }\n\n      &.active {\n        color: $white;\n        background-color: $color;\n        border-color: $color;\n      }\n    }\n  }\n}\n// scss-docs-end list-group-mixin\n","// transparent background and border properties included for button version.\n// iOS requires the button element instead of an anchor tag.\n// If you want the anchor version, it requires `href=\"#\"`.\n// See https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile\n\n.btn-close {\n  box-sizing: content-box;\n  width: $btn-close-width;\n  height: $btn-close-height;\n  padding: $btn-close-padding-y $btn-close-padding-x;\n  color: $btn-close-color;\n  background: transparent escape-svg($btn-close-bg) center / $btn-close-width auto no-repeat; // include transparent for button elements\n  border: 0; // for button elements\n  @include border-radius();\n  opacity: $btn-close-opacity;\n\n  // Override <a>'s hover style\n  &:hover {\n    color: $btn-close-color;\n    text-decoration: none;\n    opacity: $btn-close-hover-opacity;\n  }\n\n  &:focus {\n    outline: 0;\n    box-shadow: $btn-close-focus-shadow;\n    opacity: $btn-close-focus-opacity;\n  }\n\n  &:disabled,\n  &.disabled {\n    pointer-events: none;\n    user-select: none;\n    opacity: $btn-close-disabled-opacity;\n  }\n}\n\n.btn-close-white {\n  filter: $btn-close-white-filter;\n}\n",".toast {\n  width: $toast-max-width;\n  max-width: 100%;\n  @include font-size($toast-font-size);\n  color: $toast-color;\n  pointer-events: auto;\n  background-color: $toast-background-color;\n  background-clip: padding-box;\n  border: $toast-border-width solid $toast-border-color;\n  box-shadow: $toast-box-shadow;\n  @include border-radius($toast-border-radius);\n\n  &:not(.showing):not(.show) {\n    opacity: 0;\n  }\n\n  &.hide {\n    display: none;\n  }\n}\n\n.toast-container {\n  width: max-content;\n  max-width: 100%;\n  pointer-events: none;\n\n  > :not(:last-child) {\n    margin-bottom: $toast-spacing;\n  }\n}\n\n.toast-header {\n  display: flex;\n  align-items: center;\n  padding: $toast-padding-y $toast-padding-x;\n  color: $toast-header-color;\n  background-color: $toast-header-background-color;\n  background-clip: padding-box;\n  border-bottom: $toast-border-width solid $toast-header-border-color;\n  @include border-top-radius(subtract($toast-border-radius, $toast-border-width));\n\n  .btn-close {\n    margin-right: $toast-padding-x / -2;\n    margin-left: $toast-padding-x;\n  }\n}\n\n.toast-body {\n  padding: $toast-padding-x; // apply to both vertical and horizontal\n  word-wrap: break-word;\n}\n","// .modal-open      - body class for killing the scroll\n// .modal           - container to scroll within\n// .modal-dialog    - positioning shell for the actual modal\n// .modal-content   - actual modal w/ bg and corners and stuff\n\n\n// Container that the modal scrolls within\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: $zindex-modal;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  // Prevent Chrome on Windows from adding a focus outline. For details, see\n  // https://github.com/twbs/bootstrap/pull/10951.\n  outline: 0;\n  // We deliberately don't use `-webkit-overflow-scrolling: touch;` due to a\n  // gnarly iOS Safari bug: https://bugs.webkit.org/show_bug.cgi?id=158342\n  // See also https://github.com/twbs/bootstrap/issues/17695\n}\n\n// Shell div to position the modal with bottom padding\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: $modal-dialog-margin;\n  // allow clicks to pass through for custom click handling to close modal\n  pointer-events: none;\n\n  // When fading in the modal, animate it to slide down\n  .modal.fade & {\n    @include transition($modal-transition);\n    transform: $modal-fade-transform;\n  }\n  .modal.show & {\n    transform: $modal-show-transform;\n  }\n\n  // When trying to close, animate focus to scale\n  .modal.modal-static & {\n    transform: $modal-scale-transform;\n  }\n}\n\n.modal-dialog-scrollable {\n  height: subtract(100%, $modal-dialog-margin * 2);\n\n  .modal-content {\n    max-height: 100%;\n    overflow: hidden;\n  }\n\n  .modal-body {\n    overflow-y: auto;\n  }\n}\n\n.modal-dialog-centered {\n  display: flex;\n  align-items: center;\n  min-height: subtract(100%, $modal-dialog-margin * 2);\n}\n\n// Actual modal\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%; // Ensure `.modal-content` extends the full width of the parent `.modal-dialog`\n  // counteract the pointer-events: none; in the .modal-dialog\n  color: $modal-content-color;\n  pointer-events: auto;\n  background-color: $modal-content-bg;\n  background-clip: padding-box;\n  border: $modal-content-border-width solid $modal-content-border-color;\n  @include border-radius($modal-content-border-radius);\n  @include box-shadow($modal-content-box-shadow-xs);\n  // Remove focus outline from opened modal\n  outline: 0;\n}\n\n// Modal background\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: $zindex-modal-backdrop;\n  width: 100vw;\n  height: 100vh;\n  background-color: $modal-backdrop-bg;\n\n  // Fade for backdrop\n  &.fade { opacity: 0; }\n  &.show { opacity: $modal-backdrop-opacity; }\n}\n\n// Modal header\n// Top section of the modal w/ title and dismiss\n.modal-header {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: space-between; // Put modal header elements (title and dismiss) on opposite ends\n  padding: $modal-header-padding;\n  border-bottom: $modal-header-border-width solid $modal-header-border-color;\n  @include border-top-radius($modal-content-inner-border-radius);\n\n  .btn-close {\n    padding: ($modal-header-padding-y / 2) ($modal-header-padding-x / 2);\n    margin: ($modal-header-padding-y / -2) ($modal-header-padding-x / -2) ($modal-header-padding-y / -2) auto;\n  }\n}\n\n// Title text within header\n.modal-title {\n  margin-bottom: 0;\n  line-height: $modal-title-line-height;\n}\n\n// Modal body\n// Where all modal content resides (sibling of .modal-header and .modal-footer)\n.modal-body {\n  position: relative;\n  // Enable `flex-grow: 1` so that the body take up as much space as possible\n  // when there should be a fixed height on `.modal-dialog`.\n  flex: 1 1 auto;\n  padding: $modal-inner-padding;\n}\n\n// Footer (for actions)\n.modal-footer {\n  display: flex;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n  align-items: center; // vertically center\n  justify-content: flex-end; // Right align buttons with flex property because text-align doesn't work on flex items\n  padding: $modal-inner-padding - $modal-footer-margin-between / 2;\n  border-top: $modal-footer-border-width solid $modal-footer-border-color;\n  @include border-bottom-radius($modal-content-inner-border-radius);\n\n  // Place margin between footer elements\n  // This solution is far from ideal because of the universal selector usage,\n  // but is needed to fix https://github.com/twbs/bootstrap/issues/24800\n  > * {\n    margin: $modal-footer-margin-between / 2;\n  }\n}\n\n// Scale up the modal\n@include media-breakpoint-up(sm) {\n  // Automatically set modal's width for larger viewports\n  .modal-dialog {\n    max-width: $modal-md;\n    margin: $modal-dialog-margin-y-sm-up auto;\n  }\n\n  .modal-dialog-scrollable {\n    height: subtract(100%, $modal-dialog-margin-y-sm-up * 2);\n  }\n\n  .modal-dialog-centered {\n    min-height: subtract(100%, $modal-dialog-margin-y-sm-up * 2);\n  }\n\n  .modal-content {\n    @include box-shadow($modal-content-box-shadow-sm-up);\n  }\n\n  .modal-sm { max-width: $modal-sm; }\n}\n\n@include media-breakpoint-up(lg) {\n  .modal-lg,\n  .modal-xl {\n    max-width: $modal-lg;\n  }\n}\n\n@include media-breakpoint-up(xl) {\n  .modal-xl { max-width: $modal-xl; }\n}\n\n// scss-docs-start modal-fullscreen-loop\n@each $breakpoint in map-keys($grid-breakpoints) {\n  $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n  $postfix: if($infix != \"\", $infix + \"-down\", \"\");\n\n  @include media-breakpoint-down($breakpoint) {\n    .modal-fullscreen#{$postfix} {\n      width: 100vw;\n      max-width: none;\n      height: 100%;\n      margin: 0;\n\n      .modal-content {\n        height: 100%;\n        border: 0;\n        @include border-radius(0);\n      }\n\n      .modal-header {\n        @include border-radius(0);\n      }\n\n      .modal-body {\n        overflow-y: auto;\n      }\n\n      .modal-footer {\n        @include border-radius(0);\n      }\n    }\n  }\n}\n// scss-docs-end modal-fullscreen-loop\n","// Base class\n.tooltip {\n  position: absolute;\n  z-index: $zindex-tooltip;\n  display: block;\n  margin: $tooltip-margin;\n  // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.\n  // So reset our font and text properties to avoid inheriting weird values.\n  @include reset-text();\n  @include font-size($tooltip-font-size);\n  // Allow breaking very long words so they don't overflow the tooltip's bounds\n  word-wrap: break-word;\n  opacity: 0;\n\n  &.show { opacity: $tooltip-opacity; }\n\n  .tooltip-arrow {\n    position: absolute;\n    display: block;\n    width: $tooltip-arrow-width;\n    height: $tooltip-arrow-height;\n\n    &::before {\n      position: absolute;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid;\n    }\n  }\n}\n\n.bs-tooltip-top {\n  padding: $tooltip-arrow-height 0;\n\n  .tooltip-arrow {\n    bottom: 0;\n\n    &::before {\n      top: -1px;\n      border-width: $tooltip-arrow-height ($tooltip-arrow-width / 2) 0;\n      border-top-color: $tooltip-arrow-color;\n    }\n  }\n}\n\n.bs-tooltip-end {\n  padding: 0 $tooltip-arrow-height;\n\n  .tooltip-arrow {\n    left: 0;\n    width: $tooltip-arrow-height;\n    height: $tooltip-arrow-width;\n\n    &::before {\n      right: -1px;\n      border-width: ($tooltip-arrow-width / 2) $tooltip-arrow-height ($tooltip-arrow-width / 2) 0;\n      border-right-color: $tooltip-arrow-color;\n    }\n  }\n}\n\n.bs-tooltip-bottom {\n  padding: $tooltip-arrow-height 0;\n\n  .tooltip-arrow {\n    top: 0;\n\n    &::before {\n      bottom: -1px;\n      border-width: 0 ($tooltip-arrow-width / 2) $tooltip-arrow-height;\n      border-bottom-color: $tooltip-arrow-color;\n    }\n  }\n}\n\n.bs-tooltip-start {\n  padding: 0 $tooltip-arrow-height;\n\n  .tooltip-arrow {\n    right: 0;\n    width: $tooltip-arrow-height;\n    height: $tooltip-arrow-width;\n\n    &::before {\n      left: -1px;\n      border-width: ($tooltip-arrow-width / 2) 0 ($tooltip-arrow-width / 2) $tooltip-arrow-height;\n      border-left-color: $tooltip-arrow-color;\n    }\n  }\n}\n\n.bs-tooltip-auto {\n  &[data-popper-placement^=\"top\"] {\n    @extend .bs-tooltip-top;\n  }\n  &[data-popper-placement^=\"right\"] {\n    @extend .bs-tooltip-end;\n  }\n  &[data-popper-placement^=\"bottom\"] {\n    @extend .bs-tooltip-bottom;\n  }\n  &[data-popper-placement^=\"left\"] {\n    @extend .bs-tooltip-start;\n  }\n}\n\n// Wrapper for the tooltip content\n.tooltip-inner {\n  max-width: $tooltip-max-width;\n  padding: $tooltip-padding-y $tooltip-padding-x;\n  color: $tooltip-color;\n  text-align: center;\n  background-color: $tooltip-bg;\n  @include border-radius($tooltip-border-radius);\n}\n","@mixin reset-text {\n  font-family: $font-family-base;\n  // We deliberately do NOT reset font-size or overflow-wrap / word-wrap.\n  font-style: normal;\n  font-weight: $font-weight-normal;\n  line-height: $line-height-base;\n  text-align: left; // Fallback for where `start` is not supported\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n}\n",".popover {\n  position: absolute;\n  top: 0;\n  left: 0 #{\"/* rtl:ignore */\"};\n  z-index: $zindex-popover;\n  display: block;\n  max-width: $popover-max-width;\n  // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.\n  // So reset our font and text properties to avoid inheriting weird values.\n  @include reset-text();\n  @include font-size($popover-font-size);\n  // Allow breaking very long words so they don't overflow the popover's bounds\n  word-wrap: break-word;\n  background-color: $popover-bg;\n  background-clip: padding-box;\n  border: $popover-border-width solid $popover-border-color;\n  @include border-radius($popover-border-radius);\n  @include box-shadow($popover-box-shadow);\n\n  .popover-arrow {\n    position: absolute;\n    display: block;\n    width: $popover-arrow-width;\n    height: $popover-arrow-height;\n\n    &::before,\n    &::after {\n      position: absolute;\n      display: block;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid;\n    }\n  }\n}\n\n.bs-popover-top {\n  > .popover-arrow {\n    bottom: subtract(-$popover-arrow-height, $popover-border-width);\n\n    &::before {\n      bottom: 0;\n      border-width: $popover-arrow-height ($popover-arrow-width / 2) 0;\n      border-top-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      bottom: $popover-border-width;\n      border-width: $popover-arrow-height ($popover-arrow-width / 2) 0;\n      border-top-color: $popover-arrow-color;\n    }\n  }\n}\n\n.bs-popover-end {\n  > .popover-arrow {\n    left: subtract(-$popover-arrow-height, $popover-border-width);\n    width: $popover-arrow-height;\n    height: $popover-arrow-width;\n\n    &::before {\n      left: 0;\n      border-width: ($popover-arrow-width / 2) $popover-arrow-height ($popover-arrow-width / 2) 0;\n      border-right-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      left: $popover-border-width;\n      border-width: ($popover-arrow-width / 2) $popover-arrow-height ($popover-arrow-width / 2) 0;\n      border-right-color: $popover-arrow-color;\n    }\n  }\n}\n\n.bs-popover-bottom {\n  > .popover-arrow {\n    top: subtract(-$popover-arrow-height, $popover-border-width);\n\n    &::before {\n      top: 0;\n      border-width: 0 ($popover-arrow-width / 2) $popover-arrow-height ($popover-arrow-width / 2);\n      border-bottom-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      top: $popover-border-width;\n      border-width: 0 ($popover-arrow-width / 2) $popover-arrow-height ($popover-arrow-width / 2);\n      border-bottom-color: $popover-arrow-color;\n    }\n  }\n\n  // This will remove the popover-header's border just below the arrow\n  .popover-header::before {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    display: block;\n    width: $popover-arrow-width;\n    margin-left: -$popover-arrow-width / 2;\n    content: \"\";\n    border-bottom: $popover-border-width solid $popover-header-bg;\n  }\n}\n\n.bs-popover-start {\n  > .popover-arrow {\n    right: subtract(-$popover-arrow-height, $popover-border-width);\n    width: $popover-arrow-height;\n    height: $popover-arrow-width;\n\n    &::before {\n      right: 0;\n      border-width: ($popover-arrow-width / 2) 0 ($popover-arrow-width / 2) $popover-arrow-height;\n      border-left-color: $popover-arrow-outer-color;\n    }\n\n    &::after {\n      right: $popover-border-width;\n      border-width: ($popover-arrow-width / 2) 0 ($popover-arrow-width / 2) $popover-arrow-height;\n      border-left-color: $popover-arrow-color;\n    }\n  }\n}\n\n.bs-popover-auto {\n  &[data-popper-placement^=\"top\"] {\n    @extend .bs-popover-top;\n  }\n  &[data-popper-placement^=\"right\"] {\n    @extend .bs-popover-end;\n  }\n  &[data-popper-placement^=\"bottom\"] {\n    @extend .bs-popover-bottom;\n  }\n  &[data-popper-placement^=\"left\"] {\n    @extend .bs-popover-start;\n  }\n}\n\n// Offset the popover to account for the popover arrow\n.popover-header {\n  padding: $popover-header-padding-y $popover-header-padding-x;\n  margin-bottom: 0; // Reset the default from Reboot\n  @include font-size($font-size-base);\n  color: $popover-header-color;\n  background-color: $popover-header-bg;\n  border-bottom: $popover-border-width solid shade-color($popover-header-bg, 10%);\n  @include border-top-radius($popover-inner-border-radius);\n\n  &:empty {\n    display: none;\n  }\n}\n\n.popover-body {\n  padding: $popover-body-padding-y $popover-body-padding-x;\n  color: $popover-body-color;\n}\n","// Notes on the classes:\n//\n// 1. .carousel.pointer-event should ideally be pan-y (to allow for users to scroll vertically)\n//    even when their scroll action started on a carousel, but for compatibility (with Firefox)\n//    we're preventing all actions instead\n// 2. The .carousel-item-start and .carousel-item-end is used to indicate where\n//    the active slide is heading.\n// 3. .active.carousel-item is the current slide.\n// 4. .active.carousel-item-start and .active.carousel-item-end is the current\n//    slide in its in-transition state. Only one of these occurs at a time.\n// 5. .carousel-item-next.carousel-item-start and .carousel-item-prev.carousel-item-end\n//    is the upcoming slide in transition.\n\n.carousel {\n  position: relative;\n}\n\n.carousel.pointer-event {\n  touch-action: pan-y;\n}\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  @include clearfix();\n}\n\n.carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  backface-visibility: hidden;\n  @include transition($carousel-transition);\n}\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block;\n}\n\n/* rtl:begin:ignore */\n.carousel-item-next:not(.carousel-item-start),\n.active.carousel-item-end {\n  transform: translateX(100%);\n}\n\n.carousel-item-prev:not(.carousel-item-end),\n.active.carousel-item-start {\n  transform: translateX(-100%);\n}\n\n/* rtl:end:ignore */\n\n\n//\n// Alternate transitions\n//\n\n.carousel-fade {\n  .carousel-item {\n    opacity: 0;\n    transition-property: opacity;\n    transform: none;\n  }\n\n  .carousel-item.active,\n  .carousel-item-next.carousel-item-start,\n  .carousel-item-prev.carousel-item-end {\n    z-index: 1;\n    opacity: 1;\n  }\n\n  .active.carousel-item-start,\n  .active.carousel-item-end {\n    z-index: 0;\n    opacity: 0;\n    @include transition(opacity 0s $carousel-transition-duration);\n  }\n}\n\n\n//\n// Left/right controls for nav\n//\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  // Use flex for alignment (1-3)\n  display: flex; // 1. allow flex styles\n  align-items: center; // 2. vertically center contents\n  justify-content: center; // 3. horizontally center contents\n  width: $carousel-control-width;\n  padding: 0;\n  color: $carousel-control-color;\n  text-align: center;\n  background: none;\n  border: 0;\n  opacity: $carousel-control-opacity;\n  @include transition($carousel-control-transition);\n\n  // Hover/focus state\n  &:hover,\n  &:focus {\n    color: $carousel-control-color;\n    text-decoration: none;\n    outline: 0;\n    opacity: $carousel-control-hover-opacity;\n  }\n}\n.carousel-control-prev {\n  left: 0;\n  background-image: if($enable-gradients, linear-gradient(90deg, rgba($black, .25), rgba($black, .001)), null);\n}\n.carousel-control-next {\n  right: 0;\n  background-image: if($enable-gradients, linear-gradient(270deg, rgba($black, .25), rgba($black, .001)), null);\n}\n\n// Icons for within\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: $carousel-control-icon-width;\n  height: $carousel-control-icon-width;\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100% 100%;\n}\n\n/* rtl:options: {\n  \"autoRename\": true,\n  \"stringMap\":[ {\n    \"name\"    : \"prev-next\",\n    \"search\"  : \"prev\",\n    \"replace\" : \"next\"\n  } ]\n} */\n.carousel-control-prev-icon {\n  background-image: escape-svg($carousel-control-prev-icon-bg);\n}\n.carousel-control-next-icon {\n  background-image: escape-svg($carousel-control-next-icon-bg);\n}\n\n// Optional indicator pips/controls\n//\n// Add a container (such as a list) with the following class and add an item (ideally a focusable control,\n// like a button) with data-bs-target for each slide your carousel holds.\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n  display: flex;\n  justify-content: center;\n  padding: 0;\n  // Use the .carousel-control's width as margin so we don't overlay those\n  margin-right: $carousel-control-width;\n  margin-bottom: 1rem;\n  margin-left: $carousel-control-width;\n  list-style: none;\n\n  [data-bs-target] {\n    box-sizing: content-box;\n    flex: 0 1 auto;\n    width: $carousel-indicator-width;\n    height: $carousel-indicator-height;\n    padding: 0;\n    margin-right: $carousel-indicator-spacer;\n    margin-left: $carousel-indicator-spacer;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: $carousel-indicator-active-bg;\n    background-clip: padding-box;\n    border: 0;\n    // Use transparent borders to increase the hit area by 10px on top and bottom.\n    border-top: $carousel-indicator-hit-area-height solid transparent;\n    border-bottom: $carousel-indicator-hit-area-height solid transparent;\n    opacity: $carousel-indicator-opacity;\n    @include transition($carousel-indicator-transition);\n  }\n\n  .active {\n    opacity: $carousel-indicator-active-opacity;\n  }\n}\n\n\n// Optional captions\n//\n//\n\n.carousel-caption {\n  position: absolute;\n  right: (100% - $carousel-caption-width) / 2;\n  bottom: $carousel-caption-spacer;\n  left: (100% - $carousel-caption-width) / 2;\n  padding-top: $carousel-caption-padding-y;\n  padding-bottom: $carousel-caption-padding-y;\n  color: $carousel-caption-color;\n  text-align: center;\n}\n\n// Dark mode carousel\n\n.carousel-dark {\n  .carousel-control-prev-icon,\n  .carousel-control-next-icon {\n    filter: $carousel-dark-control-icon-filter;\n  }\n\n  .carousel-indicators [data-bs-target] {\n    background-color: $carousel-dark-indicator-active-bg;\n  }\n\n  .carousel-caption {\n    color: $carousel-dark-caption-color;\n  }\n}\n","// scss-docs-start clearfix\n@mixin clearfix() {\n  &::after {\n    display: block;\n    clear: both;\n    content: \"\";\n  }\n}\n// scss-docs-end clearfix\n","//\n// Rotating border\n//\n\n// scss-docs-start spinner-border-keyframes\n@keyframes spinner-border {\n  to { transform: rotate(360deg) #{\"/* rtl:ignore */\"}; }\n}\n// scss-docs-end spinner-border-keyframes\n\n.spinner-border {\n  display: inline-block;\n  width: $spinner-width;\n  height: $spinner-height;\n  vertical-align: $spinner-vertical-align;\n  border: $spinner-border-width solid currentColor;\n  border-right-color: transparent;\n  // stylelint-disable-next-line property-disallowed-list\n  border-radius: 50%;\n  animation: $spinner-animation-speed linear infinite spinner-border;\n}\n\n.spinner-border-sm {\n  width: $spinner-width-sm;\n  height: $spinner-height-sm;\n  border-width: $spinner-border-width-sm;\n}\n\n//\n// Growing circle\n//\n\n// scss-docs-start spinner-grow-keyframes\n@keyframes spinner-grow {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n    transform: none;\n  }\n}\n// scss-docs-end spinner-grow-keyframes\n\n.spinner-grow {\n  display: inline-block;\n  width: $spinner-width;\n  height: $spinner-height;\n  vertical-align: $spinner-vertical-align;\n  background-color: currentColor;\n  // stylelint-disable-next-line property-disallowed-list\n  border-radius: 50%;\n  opacity: 0;\n  animation: $spinner-animation-speed linear infinite spinner-grow;\n}\n\n.spinner-grow-sm {\n  width: $spinner-width-sm;\n  height: $spinner-height-sm;\n}\n\n@if $enable-reduced-motion {\n  @media (prefers-reduced-motion: reduce) {\n    .spinner-border,\n    .spinner-grow {\n      animation-duration: $spinner-animation-speed * 2;\n    }\n  }\n}\n",".offcanvas {\n  position: fixed;\n  bottom: 0;\n  z-index: $zindex-offcanvas;\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  color: $offcanvas-color;\n  visibility: hidden;\n  background-color: $offcanvas-bg-color;\n  background-clip: padding-box;\n  outline: 0;\n  @include box-shadow($offcanvas-box-shadow);\n  @include transition(transform $offcanvas-transition-duration ease-in-out);\n}\n\n.offcanvas-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $offcanvas-padding-y $offcanvas-padding-x;\n\n  .btn-close {\n    padding: ($offcanvas-padding-y / 2) ($offcanvas-padding-x / 2);\n    margin: ($offcanvas-padding-y / -2) ($offcanvas-padding-x / -2) ($offcanvas-padding-y / -2) auto;\n  }\n}\n\n.offcanvas-title {\n  margin-bottom: 0;\n  line-height: $offcanvas-title-line-height;\n}\n\n.offcanvas-body {\n  flex-grow: 1;\n  padding: $offcanvas-padding-y $offcanvas-padding-x;\n  overflow-y: auto;\n}\n\n.offcanvas-start {\n  top: 0;\n  left: 0;\n  width: $offcanvas-horizontal-width;\n  border-right: $offcanvas-border-width solid $offcanvas-border-color;\n  transform: translateX(-100%);\n}\n\n.offcanvas-end {\n  top: 0;\n  right: 0;\n  width: $offcanvas-horizontal-width;\n  border-left: $offcanvas-border-width solid $offcanvas-border-color;\n  transform: translateX(100%);\n}\n\n.offcanvas-top {\n  top: 0;\n  right: 0;\n  left: 0;\n  height: $offcanvas-vertical-height;\n  max-height: 100%;\n  border-bottom: $offcanvas-border-width solid $offcanvas-border-color;\n  transform: translateY(-100%);\n}\n\n.offcanvas-bottom {\n  right: 0;\n  left: 0;\n  height: $offcanvas-vertical-height;\n  max-height: 100%;\n  border-top: $offcanvas-border-width solid $offcanvas-border-color;\n  transform: translateY(100%);\n}\n\n.offcanvas.show {\n  transform: none;\n}\n","@each $color, $value in $theme-colors {\n  .link-#{$color} {\n    color: $value;\n\n    @if $link-shade-percentage != 0 {\n      &:hover,\n      &:focus {\n        color: if(color-contrast($value) == $color-contrast-light, shade-color($value, $link-shade-percentage), tint-color($value, $link-shade-percentage));\n      }\n    }\n  }\n}\n","// Credit: Nicolas Gallagher and SUIT CSS.\n\n.ratio {\n  position: relative;\n  width: 100%;\n\n  &::before {\n    display: block;\n    padding-top: var(--#{$variable-prefix}aspect-ratio);\n    content: \"\";\n  }\n\n  > * {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n}\n\n@each $key, $ratio in $aspect-ratios {\n  .ratio-#{$key} {\n    --#{$variable-prefix}aspect-ratio: #{$ratio};\n  }\n}\n","// Shorthand\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: $zindex-fixed;\n}\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: $zindex-fixed;\n}\n\n// Responsive sticky top\n@each $breakpoint in map-keys($grid-breakpoints) {\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    .sticky#{$infix}-top {\n      position: sticky;\n      top: 0;\n      z-index: $zindex-sticky;\n    }\n  }\n}\n","//\n// Visually hidden\n//\n\n.visually-hidden,\n.visually-hidden-focusable:not(:focus):not(:focus-within) {\n  @include visually-hidden();\n}\n","// stylelint-disable declaration-no-important\n\n// Hide content visually while keeping it accessible to assistive technologies\n//\n// See: https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/\n// See: https://hugogiraudel.com/2016/10/13/css-hide-and-seek/\n\n@mixin visually-hidden() {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important; // Fix for https://github.com/twbs/bootstrap/issues/25686\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n\n// Use to only display content when it's focused, or one of its child elements is focused\n// (i.e. when focus is within the element/container that the class was applied to)\n//\n// Useful for \"Skip to main content\" links; see https://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1\n\n@mixin visually-hidden-focusable() {\n  &:not(:focus):not(:focus-within) {\n    @include visually-hidden();\n  }\n}\n","//\n// Stretched link\n//\n\n.stretched-link {\n  &::#{$stretched-link-pseudo-element} {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: $stretched-link-z-index;\n    content: \"\";\n  }\n}\n","//\n// Text truncation\n//\n\n.text-truncate {\n  @include text-truncate();\n}\n","// Text truncate\n// Requires inline-block or block for proper styling\n\n@mixin text-truncate() {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n","// Utility generator\n// Used to generate utilities & print utilities\n@mixin generate-utility($utility, $infix, $is-rfs-media-query: false) {\n  $values: map-get($utility, values);\n\n  // If the values are a list or string, convert it into a map\n  @if type-of($values) == \"string\" or type-of(nth($values, 1)) != \"list\" {\n    $values: zip($values, $values);\n  }\n\n  @each $key, $value in $values {\n    $properties: map-get($utility, property);\n\n    // Multiple properties are possible, for example with vertical or horizontal margins or paddings\n    @if type-of($properties) == \"string\" {\n      $properties: append((), $properties);\n    }\n\n    // Use custom class if present\n    $property-class: if(map-has-key($utility, class), map-get($utility, class), nth($properties, 1));\n    $property-class: if($property-class == null, \"\", $property-class);\n\n    // State params to generate pseudo-classes\n    $state: if(map-has-key($utility, state), map-get($utility, state), ());\n\n    $infix: if($property-class == \"\" and str-slice($infix, 1, 1) == \"-\", str-slice($infix, 2), $infix);\n\n    // Don't prefix if value key is null (eg. with shadow class)\n    $property-class-modifier: if($key, if($property-class == \"\" and $infix == \"\", \"\", \"-\") + $key, \"\");\n\n    @if map-get($utility, rfs) {\n      // Inside the media query\n      @if $is-rfs-media-query {\n        $val: rfs-value($value);\n\n        // Do not render anything if fluid and non fluid values are the same\n        $value: if($val == rfs-fluid-value($value), null, $val);\n      }\n      @else {\n        $value: rfs-fluid-value($value);\n      }\n    }\n\n    $is-rtl: map-get($utility, rtl);\n\n    @if $value != null {\n      @if $is-rtl == false {\n        /* rtl:begin:remove */\n      }\n      .#{$property-class + $infix + $property-class-modifier} {\n        @each $property in $properties {\n          #{$property}: $value if($enable-important-utilities, !important, null);\n        }\n      }\n\n      @each $pseudo in $state {\n        .#{$property-class + $infix + $property-class-modifier}-#{$pseudo}:#{$pseudo} {\n          @each $property in $properties {\n            #{$property}: $value if($enable-important-utilities, !important, null);\n          }\n        }\n      }\n      @if $is-rtl == false {\n        /* rtl:end:remove */\n      }\n    }\n  }\n}\n","// Loop over each breakpoint\n@each $breakpoint in map-keys($grid-breakpoints) {\n\n  // Generate media query if needed\n  @include media-breakpoint-up($breakpoint) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    // Loop over each utility property\n    @each $key, $utility in $utilities {\n      // The utility can be disabled with `false`, thus check if the utility is a map first\n      // Only proceed if responsive media queries are enabled or if it's the base media query\n      @if type-of($utility) == \"map\" and (map-get($utility, responsive) or $infix == \"\") {\n        @include generate-utility($utility, $infix);\n      }\n    }\n  }\n}\n\n// RFS rescaling\n@media (min-width: $rfs-mq-value) {\n  @each $breakpoint in map-keys($grid-breakpoints) {\n    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);\n\n    @if (map-get($grid-breakpoints, $breakpoint) < $rfs-breakpoint) {\n      // Loop over each utility property\n      @each $key, $utility in $utilities {\n        // The utility can be disabled with `false`, thus check if the utility is a map first\n        // Only proceed if responsive media queries are enabled or if it's the base media query\n        @if type-of($utility) == \"map\" and map-get($utility, rfs) and (map-get($utility, responsive) or $infix == \"\") {\n          @include generate-utility($utility, $infix, true);\n        }\n      }\n    }\n  }\n}\n\n\n// Print utilities\n@media print {\n  @each $key, $utility in $utilities {\n    // The utility can be disabled with `false`, thus check if the utility is a map first\n    // Then check if the utility needs print styles\n    @if type-of($utility) == \"map\" and map-get($utility, print) == true {\n      @include generate-utility($utility, \"-print\");\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/assets/images/bg-main.jpg":
/*!***************************************!*\
  !*** ./src/assets/images/bg-main.jpg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "da6ecc6ccf334008ad15.jpg";

/***/ }),

/***/ "./src/mapboxApiKey.js":
/*!*****************************!*\
  !*** ./src/mapboxApiKey.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getMapboxApiKeyKey = '';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMapboxApiKeyKey);

/***/ }),

/***/ "./src/openweatherApiKey.js":
/*!**********************************!*\
  !*** ./src/openweatherApiKey.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getOpenweatherApiKeyKey = '';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getOpenweatherApiKeyKey);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _openweatherApiKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./openweatherApiKey */ "./src/openweatherApiKey.js");
/* harmony import */ var _mapboxApiKey__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapboxApiKey */ "./src/mapboxApiKey.js");





const openweatherApiKey = _openweatherApiKey__WEBPACK_IMPORTED_MODULE_2__.default;


const createRow = (lists) => {
  const list = document.getElementById('list');
  list.textContent = null;
  lists.forEach((l) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${l.cityName}, ${l.countryName}`));
    const idNode = document.createElement('span');
    idNode.innerText = l.id;
    idNode.classList.add('d-none');
    li.appendChild(idNode);
    li.addEventListener('click', (e) => citySelected(e));
    list.appendChild(li);
  });
};

function fetchHandler(response) {
  if (response.ok) {
    return response.json().then((json) => Promise.resolve({
      json,
      response,
    }))
      .catch(() => Promise.resolve({
        response,
      }));
  }
  return response.json().catch(() => {
    throw new Error(response.statusText);
  });
}

const getWeatherForecast = (citySearchBox) => {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  url += citySearchBox;
  url += '&appid=';
  url += _openweatherApiKey__WEBPACK_IMPORTED_MODULE_2__.default;
  return fetch(url);
};

const getFiveDaysWeatherForecast = (citySearchBox) => {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  url += citySearchBox;
  url += '&appid=';
  url += _openweatherApiKey__WEBPACK_IMPORTED_MODULE_2__.default;
  return fetch(url);
};

function getOneDayForecaste(forecast) {
  const tempC = Math.round(parseFloat(forecast.main.temp)-273.15);
  const tempF = Math.round(((parseFloat(forecast.main.temp)-273.15)*1.8)+32); 
  const feelsC = Math.round(parseFloat(forecast.main.feels_like)-273.15);
  const feelsF = Math.round(((parseFloat(forecast.main.feels_like)-273.15)*1.8)+32); 

  document.getElementById('description').innerText = forecast.weather[0].description;
  document.getElementById('temp').innerText = `${tempC}&deg;`;
  document.getElementById('location').innerText = forecast.name;
}

const searchCity = document.getElementById('searchCity');
let currentForecast = '';
let fiveDaysForecast = '';

const createMap = (lat = -31.4135, lon = -64.1811) => {
  document.getElementById('weathermap').innerHTML = "<div id='mapid'></div>";
  const mymap = L.map('mapid').setView([lat, lon], 11);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: _mapboxApiKey__WEBPACK_IMPORTED_MODULE_3__.default,
  }).addTo(mymap);
};

searchCity.addEventListener('click', (e) => {
  e.preventDefault();
  const citySearchBox = document.getElementById('citySearchBox').value;
  if (citySearchBox.length > 2) {
    getWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        if (res.cod) {
          console.log('There was a problem: ', res.message)
        } else {
          currentForecast = res.json;
          console.log(currentForecast);
          getOneDayForecaste(currentForecast);
          createMap(currentForecast.coord.lat, currentForecast.coord.lon)
          // createRow(result);
        }
      });
    getFiveDaysWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        if (res.cod) {
          console.log('There was a problem: ', res.message)
        } else {
          fiveDaysForecast = res.json;
          console.log(fiveDaysForecast);
          // createRow(result);
        }
      });
  } else {
    createRow(['Please enter more than 3 characters']);
  }
});

window.onload = () => {
};

})();

/******/ })()
;
//# sourceMappingURL=main.js.map