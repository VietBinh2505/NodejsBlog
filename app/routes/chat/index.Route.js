import express from "express";
var router = express.Router();

const { AuthMDW} = require(__path_mdware + "index.middleware");
module.exports = (io) =>{
   router.use("/auth", require("./auth.Route")); 
   router.use("/", AuthMDW.checkLoginchat,AuthMDW.getUserInfo,require("./home.Route")(io));
   router.use("/room", require("./room.Route")); 
   router.use("/api/", require("./Api.Route")); 
   return router;
};

