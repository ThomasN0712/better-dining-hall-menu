"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/_components/Carousel3D.tsx":
/*!****************************************!*\
  !*** ./app/_components/Carousel3D.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_spring_3d_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring-3d-carousel */ \"(app-pages-browser)/./node_modules/react-spring-3d-carousel/dist/bundle.js\");\n/* harmony import */ var react_spring_3d_carousel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spring_3d_carousel__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _HoverCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HoverCard */ \"(app-pages-browser)/./app/_components/HoverCard.tsx\");\n/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-spring */ \"(app-pages-browser)/./node_modules/react-spring/dist/react-spring.modern.mjs\");\n/* harmony import */ var _app_lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/_lib/constants */ \"(app-pages-browser)/./app/_lib/constants.ts\");\n// Carousel3D.tsx\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst Carousel3D = ()=>{\n    _s();\n    const [goToSlide, setGoToSlide] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);\n    const [offsetRadius, setOffsetRadius] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(2);\n    const [showArrows, setShowArrows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const cards = _app_lib_constants__WEBPACK_IMPORTED_MODULE_5__.locationData.map((location, index)=>({\n            key: location.location,\n            content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_HoverCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                location: location.location,\n                mealTypes: location.mealTypes,\n                onClick: ()=>setGoToSlide(index)\n            }, void 0, false, {\n                fileName: \"/home/thomas-nguyen/Documents/GitHub/better-dining-hall-menu/app/_components/Carousel3D.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, undefined)\n        }));\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setOffsetRadius(2);\n        setShowArrows(true);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                width: \"400px\",\n                height: \"500px\",\n                margin: \"20px\"\n            },\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_spring_3d_carousel__WEBPACK_IMPORTED_MODULE_2___default()), {\n                slides: cards,\n                goToSlide: goToSlide,\n                offsetRadius: offsetRadius,\n                showNavigation: showArrows,\n                animationConfig: react_spring__WEBPACK_IMPORTED_MODULE_4__.config.gentle\n            }, void 0, false, {\n                fileName: \"/home/thomas-nguyen/Documents/GitHub/better-dining-hall-menu/app/_components/Carousel3D.tsx\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/home/thomas-nguyen/Documents/GitHub/better-dining-hall-menu/app/_components/Carousel3D.tsx\",\n            lineNumber: 32,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/thomas-nguyen/Documents/GitHub/better-dining-hall-menu/app/_components/Carousel3D.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Carousel3D, \"DEw2sMs8gblPv4hymirrvOgJyuY=\");\n_c = Carousel3D;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Carousel3D);\nvar _c;\n$RefreshReg$(_c, \"Carousel3D\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9fY29tcG9uZW50cy9DYXJvdXNlbDNELnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxpQkFBaUI7OztBQUVrQztBQUNIO0FBQ1o7QUFDRTtBQUNjO0FBRXBELE1BQU1PLGFBQXVCOztJQUMzQixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR1IsK0NBQVFBLENBQXFCUztJQUMvRCxNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHWCwrQ0FBUUEsQ0FBQztJQUNqRCxNQUFNLENBQUNZLFlBQVlDLGNBQWMsR0FBR2IsK0NBQVFBLENBQUM7SUFFN0MsTUFBTWMsUUFBUVQsZ0VBQWdCLENBQUMsQ0FBQ1csVUFBVUMsUUFBVztZQUNuREMsS0FBS0YsU0FBU0EsUUFBUTtZQUN0QkcsdUJBQ0UsOERBQUNoQixrREFBU0E7Z0JBQ1JhLFVBQVVBLFNBQVNBLFFBQVE7Z0JBQzNCSSxXQUFXSixTQUFTSSxTQUFTO2dCQUM3QkMsU0FBUyxJQUFNYixhQUFhUzs7Ozs7O1FBR2xDO0lBRUFoQixnREFBU0EsQ0FBQztRQUNSVSxnQkFBZ0I7UUFDaEJFLGNBQWM7SUFDaEIsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNTO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNEO1lBQUlFLE9BQU87Z0JBQUVDLE9BQU87Z0JBQVNDLFFBQVE7Z0JBQVNDLFFBQVE7WUFBTztzQkFDNUQsNEVBQUN6QixpRUFBUUE7Z0JBQ1AwQixRQUFRZDtnQkFDUlAsV0FBV0E7Z0JBQ1hHLGNBQWNBO2dCQUNkbUIsZ0JBQWdCakI7Z0JBQ2hCa0IsaUJBQWlCMUIsZ0RBQU1BLENBQUMyQixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O0FBS3hDO0dBbENNekI7S0FBQUE7QUFvQ04sK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL19jb21wb25lbnRzL0Nhcm91c2VsM0QudHN4PzNhZTIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ2Fyb3VzZWwzRC50c3hcblwidXNlIGNsaWVudFwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDYXJvdXNlbCBmcm9tIFwicmVhY3Qtc3ByaW5nLTNkLWNhcm91c2VsXCI7XG5pbXBvcnQgSG92ZXJDYXJkIGZyb20gXCIuL0hvdmVyQ2FyZFwiO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcInJlYWN0LXNwcmluZ1wiO1xuaW1wb3J0IHsgbG9jYXRpb25EYXRhIH0gZnJvbSBcIkAvYXBwL19saWIvY29uc3RhbnRzXCI7XG5cbmNvbnN0IENhcm91c2VsM0Q6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbZ29Ub1NsaWRlLCBzZXRHb1RvU2xpZGVdID0gdXNlU3RhdGU8bnVtYmVyIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICBjb25zdCBbb2Zmc2V0UmFkaXVzLCBzZXRPZmZzZXRSYWRpdXNdID0gdXNlU3RhdGUoMik7XG4gIGNvbnN0IFtzaG93QXJyb3dzLCBzZXRTaG93QXJyb3dzXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGNhcmRzID0gbG9jYXRpb25EYXRhLm1hcCgobG9jYXRpb24sIGluZGV4KSA9PiAoe1xuICAgIGtleTogbG9jYXRpb24ubG9jYXRpb24sXG4gICAgY29udGVudDogKFxuICAgICAgPEhvdmVyQ2FyZFxuICAgICAgICBsb2NhdGlvbj17bG9jYXRpb24ubG9jYXRpb259XG4gICAgICAgIG1lYWxUeXBlcz17bG9jYXRpb24ubWVhbFR5cGVzfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRHb1RvU2xpZGUoaW5kZXgpfVxuICAgICAgLz5cbiAgICApLFxuICB9KSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRPZmZzZXRSYWRpdXMoMik7XG4gICAgc2V0U2hvd0Fycm93cyh0cnVlKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogXCI0MDBweFwiLCBoZWlnaHQ6IFwiNTAwcHhcIiwgbWFyZ2luOiBcIjIwcHhcIiB9fT5cbiAgICAgICAgPENhcm91c2VsXG4gICAgICAgICAgc2xpZGVzPXtjYXJkc31cbiAgICAgICAgICBnb1RvU2xpZGU9e2dvVG9TbGlkZX1cbiAgICAgICAgICBvZmZzZXRSYWRpdXM9e29mZnNldFJhZGl1c31cbiAgICAgICAgICBzaG93TmF2aWdhdGlvbj17c2hvd0Fycm93c31cbiAgICAgICAgICBhbmltYXRpb25Db25maWc9e2NvbmZpZy5nZW50bGV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsM0Q7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkNhcm91c2VsIiwiSG92ZXJDYXJkIiwiY29uZmlnIiwibG9jYXRpb25EYXRhIiwiQ2Fyb3VzZWwzRCIsImdvVG9TbGlkZSIsInNldEdvVG9TbGlkZSIsInVuZGVmaW5lZCIsIm9mZnNldFJhZGl1cyIsInNldE9mZnNldFJhZGl1cyIsInNob3dBcnJvd3MiLCJzZXRTaG93QXJyb3dzIiwiY2FyZHMiLCJtYXAiLCJsb2NhdGlvbiIsImluZGV4Iiwia2V5IiwiY29udGVudCIsIm1lYWxUeXBlcyIsIm9uQ2xpY2siLCJkaXYiLCJjbGFzc05hbWUiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luIiwic2xpZGVzIiwic2hvd05hdmlnYXRpb24iLCJhbmltYXRpb25Db25maWciLCJnZW50bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/_components/Carousel3D.tsx\n"));

/***/ })

});