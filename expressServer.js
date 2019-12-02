const express = require("express");
const pathLib = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const articleRouter = require("./routes/article");
const pug = require("pug");
const ejs = require("ejs");

const server  = express();
server.listen(8089, ()=> {
    console.log("启动……");
});
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser("oHdk937Kdjadsoejfkk284Pui", {})); // 实现防篡改
server.use(cookieSession({
    keys: ["ojadskfsdafsa", "oeudsofwie830sk", "9Kkdsoa0-33"],
    // secret: "eeeeeeee",
}));
server.use("/article",articleRouter);
server.get("/a", (req, res) => {
    // console.log("cookie", req.signedCookies);
    // console.log("session", req.session);
    res.cookie("jack", 30, {
        signed: true, // 需要加签名
    }); // 发送cookie
    if (!req.session["count"]) {
        req.session["count"] = 1;
    } else {
        req.session["count"]++;
    }
    res.send(`欢迎您第${req.session["count"]}次来访`);
    // res.sendFile(pathLib.resolve("./www/1.txt"));
});
server.get("/pug", (req,res) => {
    const file = pug.renderFile(pathLib.resolve("./template/pug/1.pug"),{
        title: "pug测试页",
        arr: [1,2,3]
    });
    res.send(file);
});
server.get("/ejs", (req, res) => {
    const lis = ["eee", "ooo", "pppp"];
    ejs.renderFile("./www/index.html", {
        name: "loe koa",
        lis
    }).then((data) => {
        res.send(data);
    }, (err) => {
        console.log(err);
    });
});

server.use(express.static(`www/`));