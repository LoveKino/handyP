/**
 * wrap node http.request method
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var request = function request() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                var body = chunks.join('');
                resolve(body);
            });
        });
        req.on('error', function (e) {
            reject(e);
        });
        // write data to request body
        req.write(options.body);
        req.end();
    });
};

exports['default'] = request;
module.exports = exports['default'];