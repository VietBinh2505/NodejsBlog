import express from "express";
import itemRouter from "./item.Route";
import dashboardRouter from "./dashboard.Route";
const router = express.Router();

router.use("/item", itemRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;