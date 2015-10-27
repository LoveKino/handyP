import mkdirp from "mkdirp";
import toPromise from "./toPromise";
import fsp from "./fsp";

var handy = {
    fs: fsp,
    mkdirp: toPromise(mkdirp),
    toPromise
};

export default handy;