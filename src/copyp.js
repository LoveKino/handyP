import exist from "./exist";
import fsp from "./fsp";
import path from "path";
import mkdirp from "mkdirp";
import deletep from "./deletep";

/**
 * opts
 * 		override: default is false
 */

let copyp = async (src, target, opts = {}) => {
    if (! await exist(src)) {
        throw new TypeError("Source dir is not exist. source " + src);
    }
    if (await exist(target)) {
        if (!opts.override) {
            throw new Error("override exists target" + target);
        } else {
            await deletep(target);
        }
    }
    opts.handler = normalHandler;
    await copy (src, target, opts);
}

let copy = async (src, target, opts) => {
    let srcStats = await fsp.stat(src);
    if (srcStats.isFile()) {
        await copyFile (src, target, opts);
    } else if(srcStats.isDirectory()) {
        await copyDir (src, target, opts);
    }
}

let copyFile = async (src, tar, opts) => {
    let cnt = await fsp.readFile(src, "utf-8");
    await mkdirp(path.dirname(tar));
    await fsp.writeFile(tar, cnt, "utf-8");
}

let copyDir = async (src, tar, opts) => {
    await mkdirp(tar);
    let paths = await fsp.readdir(src);
    await concur(src, tar, paths);
}

let concur = (src, tar, paths) => new Promise((resolve, reject) => {
    if(!paths.length) {
        resolve();
    }
    let counter = 0;
    for (let i = 0; i < paths.length; i++) {
      let file = paths[i];
      let _src = path.join(src, file),
          _dst = path.join(tar, file);
      copy (_src, _dst).then(() => {
          counter++;
          if (counter === paths.length) {
              resolve();
          }
      }).catch(reject);
    }
});

/**
 * info
 * 		type,
 * 		srcPath,
 * 		tarPath,
 * 		source
 */
let normalHandler = info => info;

export default copyp;
