import { spawn }
from "child_process";

let spawnp = (command, args, options, on) => new Promise(
    (resolve, reject) => {
        let child = spawn(command, args, options);
        let infos = [];

        child.stdout.on('data', function(data) {
            on && on("stdout", data);
            infos.push({
                type: "stdout",
                data: data.toString()
            });
        });

        child.stderr.on('data', function(data) {
            on && on("stderr", data);
            infos.push({
                type: "stderr",
                data: data.toString()
            });
        });

        child.on('close', function(code) {
            resolve(infos, code);
        });

        child.on('error', function(err) {
            reject(err);
        });
    }
);

export default spawnp;
