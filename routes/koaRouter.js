const koaRouter = require("koa-router");
const router = koaRouter();
const mysql = require("mysql-pro");

const client = new mysql({
    mysql: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "user_table"
    }
});
router.get("/a", async (cxt) => {
    const {id} = cxt.query;
    // await client.query("insert into user_table (username,password) values ('张三', 'kjsdfnasdfkas')");
    // const data = await client.query("select * from user_table");
    client.startTransaction(); // 开启一个事务
    const data = await client.executeTransaction("select * from user_table where ID = ?", [id]);
    client.stopTransaction(); // 结束一个事务
    cxt.response.body = data;
});


module.exports = router;