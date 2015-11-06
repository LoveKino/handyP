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

var deletep = function deletep(pPath) {
    var has, stats, files;
    return regeneratorRuntime.async(function deletep$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap((0, _exist2["default"])(pPath));

            case 2:
                has = context$1$0.sent;

                if (has) {
                    context$1$0.next = 5;
                    break;
                }

                return context$1$0.abrupt("return");

            case 5:
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(_fsp2["default"].stat(pPath));

            case 7:
                stats = context$1$0.sent;

                if (!stats.isFile()) {
                    context$1$0.next = 13;
                    break;
                }

                context$1$0.next = 11;
                return regeneratorRuntime.awrap(_fsp2["default"].unlink(pPath));

            case 11:
                context$1$0.next = 21;
                break;

            case 13:
                if (!stats.isDirectory()) {
                    context$1$0.next = 21;
                    break;
                }

                context$1$0.next = 16;
                return regeneratorRuntime.awrap(_fsp2["default"].readdir(pPath));

            case 16:
                files = context$1$0.sent;
                context$1$0.next = 19;
                return regeneratorRuntime.awrap(concur(pPath, files));

            case 19:
                context$1$0.next = 21;
                return regeneratorRuntime.awrap(_fsp2["default"].rmdir(pPath));

            case 21:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this);
};

var concur = function concur(pPath, files) {
    return new Promise(function (resolve, reject) {
        var counter = 0;
        if (files.length === 0) {
            resolve();
        }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var nextPath = _path2["default"].join(pPath, file);
            deletep(nextPath).then(function () {
                counter++;
                if (counter === files.length) {
                    resolve();
                }
            })["catch"](reject);
        }
    });
};

exports["default"] = deletep;
module.exports = exports["default"];