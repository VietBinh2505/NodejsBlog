import createError from "http-errors";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import indexBERouter from "./routes/BackEnd/index.Route";
import indexFERouter from "./routes/FrontEnd/index.Route";
import expressLayouts from "express-ejs-layouts";
import systemConfig from "./config/system.config";
import connectDB from "./config/connectDB";
var app = express();

// view engine setup
connectDB();
bodyParser.json();
bodyParser.urlencoded({ extended: false });
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "backend");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.locals.prefixadmin = systemConfig.prefixadmin;
app.use(`/${systemConfig.prefixadmin}`, indexBERouter); //admin
app.use("/", indexFERouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('pages/error', {
		titlepage: "Page not found"
	});
});

module.exports = app;
