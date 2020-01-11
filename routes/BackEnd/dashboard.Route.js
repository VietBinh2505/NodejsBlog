import express from "express";
const router = express.Router();

import {render} from "./../../controller/index.Controller";
//admin/dashboard/...
router.get("/", render.dashboardItem);
module.exports = router;
