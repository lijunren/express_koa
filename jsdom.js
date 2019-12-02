const JSDOM = require("jsdom").JSDOM;
const fs = require("fs");
const pathlib = require("path");

fs.readFile(pathlib.resolve("temp/tmal_shouji.html"), (err, data) => {
    if (err) {
        console.log("读取失败");
        return;
    }
    const $ = html2$(data.toString());
    
    const texaArea = html2$($("textarea.f1")[0].value);
    // console.log(texaArea("li"));
    const res = Array.from(texaArea("li")).map((li) => {
        const oA = li.getElementsByClassName("mod-g-photo")[0];
        const tit = li.getElementsByClassName("mod-g-tit")[0];
        return {
            url: "https:" + oA.href,
            imgUrl:"https:" +  oA.children[0].getAttribute("data-lazyload-src"),
            name: tit.children[0].text,
            // detail: "https:" + tit.children[0].href,
            desc: li.getElementsByClassName("mod-g-desc")[0].innerHTML,
            price: li.getElementsByClassName("mod-g-nprice")[0].innerHTML.match(/\d+(\.\d+)?/g)[0],
            // saled: li.getElementsByClassName("mod-g-sales")[0].innerHTML,
        }
    });
    console.log(res);
});
function html2$(html) {
    const document = new JSDOM(html).window.document;
    return document.querySelectorAll.bind(document);
}
