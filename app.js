import createError from "http-errors";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import validator from "express-validator";
import expressLayouts from "express-ejs-layouts";
import flash from "express-flash-notification";
import moment from "moment";
const pathConfig = require("./path");
// Define Path
global.__base             = __dirname + "/";
global.__path_app         = __base + pathConfig.folder_app + "/";
global.__path_services    = __path_app + pathConfig.folder_services + "/";
global.__path_sv_BE      = __path_services + pathConfig.folder_sv_BE + "/";
global.__path_sv_FE      = __path_services + pathConfig.folder_sv_FE + "/";
global.__path_configs     = __path_app + pathConfig.folder_configs + "/";
global.__path_helpers     = __path_app + pathConfig.folder_helpers + "/";
global.__path_routers     = __path_app + pathConfig.folder_routers + "/";
global.__path_schemas     = __path_app + pathConfig.folder_schemas + "/";


global.__path_validates   = __path_app + pathConfig.folder_validates + "/";
global.__path_uploads     = __base + pathConfig.folder_public + "/upload";
global.__path_views       = __path_app + pathConfig.folder_views + "/";

global.__path_ctl         = __path_app + pathConfig.folder_ctl + "/";
global.__path_ctl_BE      = __path_ctl + pathConfig.folder_ctl_BE + "/";
global.__path_ctl_FE      = __path_ctl + pathConfig.folder_ctl_FE + "/";

global.__path_views_admin = __path_views + pathConfig.folder_views_admin + "/";
global.__path_views_blog  = __path_views + pathConfig.folder_views_blog + "/";

const ConfigSession =	require(__path_configs + "session.Config");
const connectDB = require(__path_configs + "connectDB");
const systemConfig = require(__path_configs + "system.Config");

var app = express();
connectDB();
ConfigSession(app);
app.use(cookieParser());
app.use(flash(app, {
   viewName: __path_views_admin + 'elements/notify',
 }));
 
app.use(validator({
  customValidators: {
    isNotEqual: (value1, value2) => {
      return value1!==value2;
    }
  }
}));
bodyParser.json();
bodyParser.urlencoded({ extended: false });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", __path_views_admin + "backend");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Local variable
app.locals.systemConfig = systemConfig;
app.locals.moment = moment;
// Setup router
app.use(`/${systemConfig.prefixAdmin}`, require(__path_routers + "backend/index.Route"));
app.use(`/${systemConfig.prefixBlog}`, require(__path_routers + "frontend/index.Route"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__path_views_admin +  "pages/error", { pageTitle   : "Page Not Found " });
});

module.exports = app;

