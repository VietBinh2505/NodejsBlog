import express from "express";
var router = express.Router();

router.use("/", require("./home.Route"));


module.exports = router;
