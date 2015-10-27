/**
 *  define convert protocol
 *  f(..., callback)
 *        callback
 *                  err ... 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var toPromise = function toPromise(f, context) {
    return function () {
        for (var _len = arguments.length, y = Array(_len), _key = 0; _key < _len; _key++) {
            y[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
            var callback = function callback(err) {
                if (err) {
                    return reject.apply(undefined, err);
                }

                for (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    res[_key2 - 1] = arguments[_key2];
                }

                resolve.apply(undefined, res);
            };
            y.push(callback);
            try {
                f.apply(context, y);
            } catch (err) {
                reject(err);
            }
        });
    };
};

exports["default"] = toPromise;
module.exports = exports["default"];