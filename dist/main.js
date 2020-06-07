/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);




var mainWindow;
var userLoggedIn = false;

function createWindow() {
  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({
    width: 450,
    height: 650,
    center: true,
    title: "favlinkz",
    resizable: userLoggedIn ? true : false,
    titleBarStyle: "hiddenInset",
    show: false,
    backgroundColor: "#5856d7",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true
    }
  });

  if (true) {
    mainWindow.loadURL("http://localhost:4000");
  } else {}

  mainWindow.on("ready-to-show", function () {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.on("new-window", function (evt, url, frameName, disposition, options, additionalFeatures) {
    if (options.width == 800 && options.height == 600) {
      var {
        width,
        height
      } = electron__WEBPACK_IMPORTED_MODULE_0__["screen"].getPrimaryDisplay().workAreaSize;
      options.width = width * 1 | 0;
      options.height = height * 1 | 0;
      options.backgroundColor = "#fff";
    }
  });
} // User has logged in


electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on("user-logged-in", e => {
  e.preventDefault();
  var bounds = electron__WEBPACK_IMPORTED_MODULE_0__["screen"].getPrimaryDisplay().bounds;
  var x = Math.ceil(bounds.x + (bounds.width - 1200) / 2);
  var y = Math.ceil(bounds.y + (bounds.height - 1000) / 2);
  mainWindow.setBounds({
    x: x,
    y: y,
    width: 1200,
    height: 1000
  });
  mainWindow.center();
  mainWindow.setResizable(true);
  userLoggedIn = true;
}); // User has logged out

electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on("user-logged-out", e => {
  mainWindow.setSize(450, 650);
  mainWindow.center();
  mainWindow.setResizable(false);
  userLoggedIn = false;
});
electron__WEBPACK_IMPORTED_MODULE_0__["app"].on("ready", createWindow);
electron__WEBPACK_IMPORTED_MODULE_0__["app"].allowRendererProcessReuse = true;
electron__WEBPACK_IMPORTED_MODULE_0__["app"].userAgentFallback = electron__WEBPACK_IMPORTED_MODULE_0__["app"].userAgentFallback.replace("Electron/" + process.versions.electron, "");
electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on("print-to-pdf", (event, link) => {
  var pdfPath = path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, "../test.pdf");
  var win = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({
    show: false
  });
  win.loadURL(link);
  win.webContents.on("did-finish-load", () => {
    win.webContents.printToPDF({}).then(data => {
      fs__WEBPACK_IMPORTED_MODULE_3___default.a.writeFile(pdfPath, data, error => {
        if (error) throw error;
        console.log("Write PDF successfully.");
        win.close();
      });
    });
  });
});

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map