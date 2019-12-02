const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("文章首页");
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    res.send(`${id}文章详情`);
})

module.exports=router;