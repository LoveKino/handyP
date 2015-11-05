"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var exist = function exist(filePath) {
  return new Promise(function (resolve, reject) {
    _fs2["default"].stat(filePath, function (err) {
      if (err && err.code === "ENOENT") {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports["default"] = exist;
module.exports = exports["default"];