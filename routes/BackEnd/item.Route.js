import express from "express";
const router = express.Router();
import {render} from "./../../controller/index.Controller";
// admin/...
router.get("/", render.listItem);
router.get("/:(list)?", render.listItem);
router.get("/add",render.addItem);
module.exports = router;
