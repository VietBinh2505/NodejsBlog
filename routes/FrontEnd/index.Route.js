import express from "express";
import homeRouter from "./home.Route";
const router = express.Router();

router.use("/", homeRouter);

module.exports = router;