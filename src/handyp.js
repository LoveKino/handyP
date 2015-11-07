import mkdirp from "mkdirp";
import toPromise from "./toPromise";
import fsp from "./fsp";
import spawn from "./spawn";
import exec from "./exec";
import exist from "./exist";
import request from "./request";
import deletep from "./deletep";
import copyp from "./copyp";

var handy = {
    fs: fsp,
    mkdirp: toPromise(mkdirp),
    toPromise,
    spawn,
    exec,
    exist,
    request,
    deletep,
    copyp
};

export default handy;
