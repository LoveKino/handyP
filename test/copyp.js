import handyp from "../index.js";
import path from "path";
import assert from "assert";

describe("base", () => {
    it("copyp", async () => {
        try{
          await handyp.deletep(path.join(__dirname, "../ignore/copyp"));
          await handyp.mkdirp(path.join(__dirname, "../ignore/copyp/srcDir/f1"));
          await handyp.mkdirp(path.join(__dirname, "../ignore/copyp/srcDir/f2"));
          await handyp.fs.writeFile(
            path.join(__dirname, "../ignore/copyp/srcDir/f2/f3.js"),
            "123",
            "utf-8"
          );
          await handyp.fs.writeFile(
            path.join(__dirname, "../ignore/copyp/src.js"),
            "123",
            "utf-8"
          );
          await handyp.copyp(
            path.join(__dirname, "../ignore/copyp/src.js"),
            path.join(__dirname, "../ignore/copyp/tar.js")
          );
          await handyp.copyp(
            path.join(__dirname, "../ignore/copyp/srcDir"),
            path.join(__dirname, "../ignore/copyp/tarDir")
          );
        }
        catch(err){
          console.log(err);
        }
    });
});
