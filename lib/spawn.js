"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _child_process = require("child_process");

var spawnp = function spawnp(command, args, options, on) {
    return new Promise(function (resolve, reject) {
        var child = (0, _child_process.spawn)(command, args, options);
        var infos = [];

        child.stdout.on('data', function (data) {
            on && on("stdout", data);
            infos.push({
                type: "stdout",
                data: data.toString()
            });
        });

        child.stderr.on('data', function (data) {
            on && on("stderr", data);
            infos.push({
                type: "stderr",
                data: data.toString()
            });
        });

        child.on('close', function (code) {
            resolve(infos);
        });
    });
};

exports["default"] = spawnp;
module.exports = exports["default"];