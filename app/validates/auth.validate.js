const notify = require(__path_configs + "notify.Config");

const options = {
   nameLogin: { min: 1, max: 30 },
   password: { min: 1, max: 30 },
}

module.exports = {
   validator: (req) => {
      // NAME
      req.checkBody("username", notify.ERROR_LOGIN)
         .isLength({ min: options.nameLogin.min, max: options.nameLogin.max })
      // password
      req.checkBody("password", notify.ERROR_LOGIN)
         .isLength({ min: options.password.min, max: options.password.max });
   }
}