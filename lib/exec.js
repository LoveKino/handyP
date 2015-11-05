"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var execp = function execp(command, options) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(command, options, function (error, stdout, stderr) {
      if (error) {
        reject(error);
      } else {
        resolve(stdout, stderr);
      }
    });
  });
};

exports["default"] = execp;
module.exports = exports["default"];