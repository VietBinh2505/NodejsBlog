import mongoose from "mongoose";
import bluebird from "bluebird";
import systemConfig from "./system.config"
// connect to mongoodb
let connectDB = () => {
	mongoose.Promise = bluebird;
	let URI = `${systemConfig.DB_Connection}://${systemConfig.DB_Host}:${systemConfig.DB_Post}/${systemConfig.DB_Name}`;
	return mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
};

module.exports = connectDB; 