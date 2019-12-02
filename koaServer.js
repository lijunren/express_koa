// 比较依赖router
const koa = require("koa");
const koaRouter = require("koa-router");
const static = require("koa-static-cache"); // 静态文件
const pathlib = require("path");
const betterBody = require("koa-better-body"); // body解析
const convert = require("koa-convert"); // 解决一些插件不支持新的版本koa
const session = require("koa-session");

const router1=require("./routes/koaRouter");
const server = new koa();
server.listen(8089);

server.keys=[
    "ksdfkjsadkjfsa7ldfsadlfj",
    "daskfsadofasdfm5sdfsadff",
    "q9089jksdlfskdf93msdm3fsd"
];
const mainRouter = koaRouter();
server.use(static(pathlib.resolve("www")));
server.use(convert(betterBody({
    uploadDir: pathlib.resolve("upload"), // 修改上线文件的路径
    keepExtensions: true // 保持原来的扩展名
})));
server.use(mainRouter.routes());
server.use(router1.routes());
server.use(session({}, server));

server.use(async (cxt) => {
    console.log(cxt.session);
    cxt.cookies.set("b", "kkk");
    if (!cxt.session["count"]) {
        cxt.session["count"] = 1;
    } else {
        cxt.session["count"]++;
    }
    cxt.response.body=`这是你第${cxt.session.count}次来访`;
});

mainRouter.get("/1", async (cxt, next) => {
    // cxt.req 原生的req
    // cxt.request  封装的req对象
    // res也类似
    cxt.response.status = 404; // 设置状态码
    // cxt.response.set("last-modified", new Date());
    // cxt.response.body={a: 12, b: 23}; // 返回数据
});