import { exec }
from "child_process";

let execp = (command, options) => new Promise(
    (resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
           if(error){
             reject(error);
           }else{
             resolve(stdout, stderr);
           }
        });
    }
);

export default execp;
