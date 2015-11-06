import exist from "./exist";
import fsp from "./fsp";
import path from "path";

let deletep = async (pPath) => {
    let has = await exist(pPath);
    if(!has) return;
    let stats = await fsp.stat(pPath);
    if(stats.isFile()){
        await fsp.unlink(pPath);
    }
    else if(stats.isDirectory()){
        let files = await fsp.readdir(pPath);
        await concur(pPath, files);
        await fsp.rmdir(pPath);
    }
}

let concur = (pPath, files) => new Promise((resolve, reject) => {
  let counter = 0;
  if(files.length === 0) {
    resolve();
  }
  for(let i = 0;i < files.length;i++){
      let file = files[i];
      let nextPath = path.join(pPath, file);
      deletep(nextPath).then(() => {
        counter++;
        if(counter === files.length){
          resolve();
        }
      }).catch(reject);
  }
});

export default deletep;
