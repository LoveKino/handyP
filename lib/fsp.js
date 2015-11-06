"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _toPromise = require("./toPromise");

var _toPromise2 = _interopRequireDefault(_toPromise);

var fsp = {};

var fsSet = ["rename", "chown", "link", "unlink", "rmdir", "mkdir", "readdir", "close", "open", "write", "read", "readFile", "writeFile", "appendFile", "access", "stat", "lstat"];

for (var i = 0; i < fsSet.length; i++) {
    var _name = fsSet[i];
    var fsFun = _fs2["default"][_name];
    fsp[_name] = (0, _toPromise2["default"])(fsFun, _fs2["default"]);
}

exports["default"] = fsp;
module.exports = exports["default"];