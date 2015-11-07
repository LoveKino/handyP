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

var _spawn = require("./spawn");

var _spawn2 = _interopRequireDefault(_spawn);

var _exec = require("./exec");

var _exec2 = _interopRequireDefault(_exec);

var _exist = require("./exist");

var _exist2 = _interopRequireDefault(_exist);

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _deletep = require("./deletep");

var _deletep2 = _interopRequireDefault(_deletep);

var _copyp = require("./copyp");

var _copyp2 = _interopRequireDefault(_copyp);

var handy = {
    fs: _fsp2["default"],
    mkdirp: (0, _toPromise2["default"])(_mkdirp2["default"]),
    toPromise: _toPromise2["default"],
    spawn: _spawn2["default"],
    exec: _exec2["default"],
    exist: _exist2["default"],
    request: _request2["default"],
    deletep: _deletep2["default"],
    copyp: _copyp2["default"]
};

exports["default"] = handy;
module.exports = exports["default"];