const fs = require("fs");
const pathlib = require("path");
const spider = require("./libs/spider");

(async () => {
    const {body,headers} = await spider("https://shouji.tmall.com/?spm=a222t.7794920.a2226c3nav.2.1a8b39ed2a70xf&acm=lb-zebra-155904-807029.1003.4.767290&scm=1003.4.lb-zebra-155904-807029.OTHER_14592967254716_767290");
    fs.writeFile(pathlib.resolve("temp", "tmal_shouji.html"),body, err => {
        // console.log(headers);
        console.log(err);
    });
})();
