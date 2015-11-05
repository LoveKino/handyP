import fs from "fs";

var exist = (filePath) => new Promise((resolve, reject) => {
  fs.stat(filePath, (err) => {
    if (err && err.code === "ENOENT") {
      resolve(false);
    } else {
      resolve(true);
    }
  });
});

export default exist;
