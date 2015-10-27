import fs from "fs";
import toPromise from "./toPromise";

let fsp = {};

let fsSet = ["rename", "chown", "link", "unlink", "rmdir",
    "mkdir", "readdir", "close", "open",
    "write", "read", "readFile", "writeFile", "appendFile", "access"
];

for (let i = 0; i < fsSet.length; i++) {
    let name = fsSet[i];
    let fsFun = fs[name];
    fsp[name] = toPromise(fsFun, fs);
}

export default fsp;