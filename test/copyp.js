import handyp from "../index.js";
import path from "path";
import assert from "assert";

let preprare = async () => {
    await handyp.deletep(path.join(__dirname, "../ignore/copyp"));
    await handyp.mkdirp(path.join(__dirname, "../ignore/copyp/srcDir/f1"));
    await handyp.mkdirp(path.join(__dirname, "../ignore/copyp/srcDir/f2"));
    await handyp.fs.writeFile(
      path.join(__dirname, "../ignore/copyp/srcDir/f2/f3.js"),
      "123",
      "utf-8"
    );
    await handyp.fs.writeFile(
      path.join(__dirname, "../ignore/copyp/srcDir/f1/f4.js"),
      "456",
      "utf-8"
    );
    await handyp.fs.writeFile(
      path.join(__dirname, "../ignore/copyp/src.js"),
      "123",
      "utf-8"
    );
}

describe("copyp", () => {
    it("copy file", async () => {
        await preprare();
        await handyp.copyp(
            path.join(__dirname, "../ignore/copyp/src.js"),
            path.join(__dirname, "../ignore/copyp/tar.js")
        );
        let res =await handyp.fs.stat(path.join(__dirname, "../ignore/copyp/tar.js"));
        assert.equal(res.isFile(), true);
        let cnt = await handyp.fs.readFile(
            path.join(__dirname, "../ignore/copyp/tar.js"),
            "utf-8"
        );
        assert.equal(cnt, "123");
    });
    it("copy dir", async () => {
        try{
          await preprare();
          await handyp.copyp(
              path.join(__dirname, "../ignore/copyp/srcDir"),
              path.join(__dirname, "../ignore/copyp/tarDir")
          );
          assert.equal(await handyp.exist(
            path.join(__dirname, "../ignore/copyp/tarDir")
          ), true);
          assert.equal(await handyp.exist(
            path.join(__dirname, "../ignore/copyp/tarDir/f1")
          ), true);
          assert.equal(await handyp.exist(
            path.join(__dirname, "../ignore/copyp/tarDir/f2")
          ), true);
          assert.equal(await handyp.exist(
            path.join(__dirname, "../ignore/copyp/tarDir/f2/f3.js")
          ), true);
        }
        catch(err){
            console.log(err);
        }
    });

    it("stop path", async () => {
        try{
          await preprare();
          await handyp.copyp(
              path.join(__dirname, "../ignore/copyp/srcDir"),
              path.join(__dirname, "../ignore/copyp/tarDir"),
              {
                 handler: (info) => {
                   if(info.srcPath === path.join(__dirname, "../ignore/copyp/srcDir/f2/f3.js")) {
                      info.tarPath = null;
                   }
                   return info;
                 }
              }
          );
          let res = await handyp.exist(path.join(__dirname, "../ignore/copyp/tarDir/f2/f3.js"));
          assert.equal(res, false);
        }
        catch(err){
            console.log(err);
        }
    });

    it("stop dir path", async () => {
        try{
          await preprare();
          await handyp.copyp(
              path.join(__dirname, "../ignore/copyp/srcDir"),
              path.join(__dirname, "../ignore/copyp/tarDir"),
              {
                 handler: (info) => {
                   if(info.srcPath === path.join(__dirname, "../ignore/copyp/srcDir/f2")) {
                      info.tarPath = null;
                   }
                   return info;
                 }
              }
          );
          let res = await handyp.exist(path.join(__dirname, "../ignore/copyp/tarDir/f2"));
          assert.equal(res, false);
        }
        catch(err){
            console.log(err);
        }
    });

    it("modify content", async () => {
        try{
          await preprare();
          await handyp.copyp(
              path.join(__dirname, "../ignore/copyp/srcDir"),
              path.join(__dirname, "../ignore/copyp/tarDir"),
              {
                 handler: (info) => {
                   if(info.srcPath === path.join(__dirname, "../ignore/copyp/srcDir/f2/f3.js")) {
                      info.source = "my private";
                   }
                   return info;
                 }
              }
          );
          let cnt = await handyp.fs.readFile(path.join(__dirname, "../ignore/copyp/tarDir/f2/f3.js"), "utf-8");
          assert.equal(cnt, "my private");
        }
        catch(err){
            console.log(err);
        }
    });
});
