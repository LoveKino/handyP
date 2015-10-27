"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _toPromise = require("./toPromise");

var _toPromise2 = _interopRequireDefault(_toPromise);

var _fsp = require("./fsp");

var _fsp2 = _interopRequireDefault(_fsp);

var handy = {
    fs: _fsp2["default"],
    mkdirp: (0, _toPromise2["default"])(_mkdirp2["default"]),
    toPromise: _toPromise2["default"]
};

exports["default"] = handy;
module.exports = exports["default"];