import express from "express";
var router 	= express.Router();
const { HomeCTL} = require(__path_ctl_Chat + "index.Controller.chat");
// /...
module.exports = (io) =>{
   router.get("/", HomeCTL.HomeChat);
   return router;
};
