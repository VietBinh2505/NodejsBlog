import express from "express";
const router = express.Router();
import {render} from "../../controller/index.Controller";

router.get("/", render.homeItem);
module.exports = router;
