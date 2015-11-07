"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _exist = require("./exist");

var _exist2 = _interopRequireDefault(_exist);

var _fsp = require("./fsp");

var _fsp2 = _interopRequireDefault(_fsp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _deletep = require("./deletep");

var _deletep2 = _interopRequireDefault(_deletep);

/**
 * opts
 * 		override: default is false
 */

var copyp = function copyp(src, target) {
    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    return regeneratorRuntime.async(function copyp$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap((0, _exist2["default"])(src));

            case 2:
                if (context$1$0.sent) {
                    context$1$0.next = 4;
                    break;
                }

                throw new TypeError("Source dir is not exist. source " + src);

            case 4:
                context$1$0.next = 6;
                return regeneratorRuntime.awrap((0, _exist2["default"])(target));

            case 6:
                if (!context$1$0.sent) {
                    context$1$0.next = 13;
                    break;
                }

                if (opts.override) {
                    context$1$0.next = 11;
                    break;
                }

                throw new Error("override exists target" + target);

            case 11:
                context$1$0.next = 13;
                return regeneratorRuntime.awrap((0, _deletep2["default"])(target));

            case 13:
                opts.handler = normalHandler;
                context$1$0.next = 16;
                return regeneratorRuntime.awrap(copy(src, target, opts));

            case 16:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this);
};

var copy = function copy(src, target, opts) {
    var srcStats;
    return regeneratorRuntime.async(function copy$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_fsp2["default"].stat(src));

            case 2:
                srcStats = context$1$0.sent;

                if (!srcStats.isFile()) {
                    context$1$0.next = 8;
                    break;
                }

                context$1$0.next = 6;
                return regeneratorRuntime.awrap(copyFile(src, target, opts));

            case 6:
                context$1$0.next = 11;
                break;

            case 8:
                if (!srcStats.isDirectory()) {
                    context$1$0.next = 11;
                    break;
                }

                context$1$0.next = 11;
                return regeneratorRuntime.awrap(copyDir(src, target, opts));

            case 11:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this);
};

var copyFile = function copyFile(src, tar, opts) {
    var cnt;
    return regeneratorRuntime.async(function copyFile$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_fsp2["default"].readFile(src, "utf-8"));

            case 2:
                cnt = context$1$0.sent;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap((0, _mkdirp2["default"])(_path2["default"].dirname(tar)));

            case 5:
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(_fsp2["default"].writeFile(tar, cnt, "utf-8"));

            case 7:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this);
};

var copyDir = function copyDir(src, tar, opts) {
    var paths;
    return regeneratorRuntime.async(function copyDir$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap((0, _mkdirp2["default"])(tar));

            case 2:
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(_fsp2["default"].readdir(src));

            case 4:
                paths = context$1$0.sent;
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(concur(src, tar, paths));

            case 7:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this);
};

var concur = function concur(src, tar, paths) {
    return new Promise(function (resolve, reject) {
        if (!paths.length) {
            resolve();
        }
        var counter = 0;
        for (var i = 0; i < paths.length; i++) {
            var file = paths[i];
            var _src = _path2["default"].join(src, file),
                _dst = _path2["default"].join(tar, file);
            copy(_src, _dst).then(function () {
                counter++;
                if (counter === paths.length) {
                    resolve();
                }
            })["catch"](reject);
        }
    });
};

/**
 * info
 * 		type,
 * 		srcPath,
 * 		tarPath,
 * 		source
 */
var normalHandler = function normalHandler(info) {
    return info;
};

exports["default"] = copyp;
module.exports = exports["default"];