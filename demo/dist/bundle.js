/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ app)
/* harmony export */ });
// import Button from "./button.js";

function app() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "\u6D4B\u8BD5react-mini"));
}

/***/ }),

/***/ "../react-mini/react-dom/index.js":
/*!****************************************!*\
  !*** ../react-mini/react-dom/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRoot": () => (/* binding */ createRoot)
/* harmony export */ });
/* harmony import */ var _react_reconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react-reconciler */ "../react-mini/react-reconciler/index.js");


function createRoot(container) {
  console.log(container);
  const root = (0,_react_reconciler__WEBPACK_IMPORTED_MODULE_0__.createContainer)(container);

  return new ReactDOMRoot(root);
}

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  console.log(children);
  const root = this._internalRoot;
  (0,_react_reconciler__WEBPACK_IMPORTED_MODULE_0__.updateContainer)(children, root);
};


/***/ }),

/***/ "../react-mini/react-reconciler/index.js":
/*!***********************************************!*\
  !*** ../react-mini/react-reconciler/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContainer": () => (/* binding */ createContainer),
/* harmony export */   "createFiberRoot": () => (/* binding */ createFiberRoot),
/* harmony export */   "updateContainer": () => (/* binding */ updateContainer)
/* harmony export */ });
function createContainer(containerInfo) {
  return createFiberRoot(containerInfo);
}

function createFiberRoot(containerInfo) {
  return new FiberRootNode(containerInfo);
}

function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

function updateContainer(element, container) {}


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_mini_react_dom_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../react-mini/react-dom/index.js */ "../react-mini/react-dom/index.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ "./src/app.js");


(0,_react_mini_react_dom_index_js__WEBPACK_IMPORTED_MODULE_0__.createRoot)(document.getElementById("app")).render( /*#__PURE__*/React.createElement(_app_js__WEBPACK_IMPORTED_MODULE_1__["default"], null));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRWUsU0FBU0EsR0FBR0EsQ0FBQSxFQUFHO0VBQzVCLG9CQUNFQyxLQUFBLENBQUFDLGFBQUEsMkJBQ0VELEtBQUEsQ0FBQUMsYUFBQSxhQUFJLHdCQUFnQixDQUVqQixDQUFDO0FBRVY7Ozs7Ozs7Ozs7Ozs7OztBQ1R1RTs7QUFFaEU7QUFDUDtBQUNBLGVBQWUsa0VBQWU7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsa0VBQWU7QUFDakI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPOzs7Ozs7O1VDWlA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOaUU7QUFDdEM7QUFFM0JDLDBFQUFVLENBQUNFLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUNDLE1BQU0sZUFBQ04sS0FBQSxDQUFBQyxhQUFBLENBQUNFLCtDQUFHLE1BQUUsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZW1vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9kZW1vLy4uL3JlYWN0LW1pbmkvcmVhY3QtZG9tL2luZGV4LmpzIiwid2VicGFjazovL2RlbW8vLi4vcmVhY3QtbWluaS9yZWFjdC1yZWNvbmNpbGVyL2luZGV4LmpzIiwid2VicGFjazovL2RlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kZW1vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBCdXR0b24gZnJvbSBcIi4vYnV0dG9uLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPua1i+ivlXJlYWN0LW1pbmk8L2gxPlxuICAgICAgey8qIDxCdXR0b24gLz4gKi99XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250YWluZXIsIHVwZGF0ZUNvbnRhaW5lciB9IGZyb20gXCIuLi9yZWFjdC1yZWNvbmNpbGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290KGNvbnRhaW5lcikge1xuICBjb25zb2xlLmxvZyhjb250YWluZXIpO1xuICBjb25zdCByb290ID0gY3JlYXRlQ29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgcmV0dXJuIG5ldyBSZWFjdERPTVJvb3Qocm9vdCk7XG59XG5cbmZ1bmN0aW9uIFJlYWN0RE9NUm9vdChpbnRlcm5hbFJvb3QpIHtcbiAgdGhpcy5faW50ZXJuYWxSb290ID0gaW50ZXJuYWxSb290O1xufVxuXG5SZWFjdERPTVJvb3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICBjb25zb2xlLmxvZyhjaGlsZHJlbik7XG4gIGNvbnN0IHJvb3QgPSB0aGlzLl9pbnRlcm5hbFJvb3Q7XG4gIHVwZGF0ZUNvbnRhaW5lcihjaGlsZHJlbiwgcm9vdCk7XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihjb250YWluZXJJbmZvKSB7XG4gIHJldHVybiBjcmVhdGVGaWJlclJvb3QoY29udGFpbmVySW5mbyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWJlclJvb3QoY29udGFpbmVySW5mbykge1xuICByZXR1cm4gbmV3IEZpYmVyUm9vdE5vZGUoY29udGFpbmVySW5mbyk7XG59XG5cbmZ1bmN0aW9uIEZpYmVyUm9vdE5vZGUoY29udGFpbmVySW5mbykge1xuICB0aGlzLmNvbnRhaW5lckluZm8gPSBjb250YWluZXJJbmZvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyKGVsZW1lbnQsIGNvbnRhaW5lcikge31cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCIuLi8uLi9yZWFjdC1taW5pL3JlYWN0LWRvbS9pbmRleC5qc1wiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHAuanNcIjtcblxuY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSkucmVuZGVyKDxBcHAgLz4pO1xuIl0sIm5hbWVzIjpbImFwcCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZVJvb3QiLCJBcHAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==