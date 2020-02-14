import passport from "passport";
import md5 from "md5";
const LocalStrategy 		= require("passport-local").Strategy;
const { userService } 	= require(__path_sv_BE + "index.Service");
const systemConfig 		= require(__path_configs + "system.Config");
const notify 				= require(__path_configs + "notify.Config");
const { ValidateAuth } 	= require(__path_validates + "index.Validate");
const {stringHelper} 	= require(__path_helpers + "index.helper");
const folderView 			= __path_views_blog + "pages/auth/";
const layout 				= __path_views_blog + "login";
const layoutBlog 				= __path_views_blog + "frontend.ejs";
const linkIndex 			= stringHelper.formatlink("/" + systemConfig.prefixBlog + "/");
const linkLogin 			= "/" + systemConfig.prefixBlog + "/auth/login";
const linknoPermission 	= "/" + systemConfig.prefixBlog + "/auth/noPermission";
const login = async (req, res) => {
	let item = { nameLogin: "", password: "" };
	let errors = null;
	try {
		return res.render(`${folderView}login.Auth.ejs`, {
			layout,
			errors,
			item,
		});
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};

const loginPost = async (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateAuth.validator(req);
	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	try {
		if (errors) {
			return res.render(`${folderView}login.Auth.ejs`, {
				layout,
				item,
				errors,
			});
		} else {
			passport.authenticate("local", {
				successRedirect: `${linkIndex}`,
				failureRedirect: `${linkLogin}`,
				failureFlash	: true,
			}
			)(req, res, next);
		}
	} catch (error) {
		console.log(error);
		console.log("error---listCateFE");
	}
};

passport.use(new LocalStrategy(
	async (username, password, done) => {
		try {
			let user = await userService.checkUserLogin(username);
			if (user === null || user.length == 0) {
				return done(null, false, {message: notify.ERROR_ACC_NULL});
			} else {
				if (password !== user.password) {
					return done(null, false, {message: notify.ERROR_LOGIN});
				} else {
					return done(null, user);
				}
			}
		} catch (error) {
			return done(error);
		}
	}
));
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
	let user = await userService.showInfoItemEdit(id);
	done(null, user);
});
const logout = (req, res) => {
	req.logout();
	req.flash("success", notify.LOGOUT_SUCCESS);
	res.redirect(linkLogin);
};

const checkLogin = (req, res, next) =>{ //kiểm tra xem đăng nhập hay chưa
	if (req.isAuthenticated()) {  //đăng nhập rồi
		if(req.user.username === "admin"){
			return next(); //cho tiếp
		}else{
			return res.redirect(linknoPermission);//chưa không phải admin thì chuyển về trang no...
		}
   }
	return res.redirect(linkLogin);//chưa đăng nhập thì chuyển về trang đăng nhập
};

const checkLogout = (req, res, next) => { //kiểm tra xem đăng xuất hay chưa
	if (!req.isAuthenticated()) {		//đăng xuất rồi
		return next();
	}
	return res.redirect(linkIndex); //chưa đăng xuất thì chuyển về trang quản ly
};
const getUserInfo = (req, res, next) => { //lấy thông tin người đăng nhập
	let userData = {};
	if (req.isAuthenticated()) {
		userData = req.user;
	}
	res.locals.userData = userData;
	return next();
};
const noPermission = (req, res) =>{
	return res.render(`${folderView}no-permission.Auth.ejs`, {
		layout: layoutBlog,
		top_post: false,
	});
};
export default {
	login,
	loginPost,
	logout,
	checkLogin,
	checkLogout,
	noPermission,
	getUserInfo,
};
