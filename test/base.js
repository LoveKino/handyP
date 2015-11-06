import handyp from "../index.js";
import path from "path";
import assert from "assert";

describe("base", () => {
    it("readFile", async () => {
        await handyp.fs.readFile(path.join(__dirname, "../ignore/test2"), "utf-8").then(res => {
            assert.equal(res, "abc");
        });
    });

    it("writeFile", async () => {
        let p = path.join(__dirname, "../ignore/test");
        await handyp.fs.writeFile(p, "abc", "utf-8");
        await handyp.fs.readFile(p, "utf-8").then(res => {
            assert.equal(res, "abc");
        });
    });

    it("exec", async () => {
        await handyp.exec("pwd").then(res => {
            assert.equal(path.relative(res, __dirname), "../handyp/test");
        });
    });

    it("exist", async () => {
        let res = await handyp.exist("./djldjsoijoee/what");
        assert.equal(res, false);

        let res2 = await handyp.exist(path.join(__dirname, "../ignore/test"));
        assert.equal(res2, true);
    });

    it("deletep", async () => {
        try{
          await handyp.mkdirp(path.join(__dirname, "../ignore/deletep/fakeDir/f1"));
          await handyp.mkdirp(path.join(__dirname, "../ignore/deletep/fakeDir/f2"));
          await handyp.fs.writeFile(
            path.join(__dirname, "../ignore/deletep/fakeDir/f2/f3.js"),
            "123",
            "utf-8"
          );

          await handyp.deletep(path.join(__dirname, "../ignore/deletep/fakeDir/f2/f3.js"));
          await handyp.deletep(path.join(__dirname, "../ignore/deletep"));
        }
        catch(err){
          console.log(err);
        }
    });
});
