import connectMongo from "connect-mongo";
import session from "express-session";
import systemConfig from "./system.Config";
let MongoStore = connectMongo(session);
let sessionStore = new MongoStore({
   url: `${systemConfig.DB_Connection}://${systemConfig.DB_Host}:${systemConfig.DB_Post}/${systemConfig.DB_Name}`,
   autoReconnect: true,
});

let ConfigSession = (app) => {
   app.set('trust proxy', 1) // trust first proxy
   app.use(session({
      secret: 'khoabimat', // khóa bí mật
      store: sessionStore,
      resave: true, // lưu vào database
      saveUninitialized: true,
      cookie: { maxAge: 86400000 } // thời gian sống của cookie (1 ngày)
   }));
};

module.exports = ConfigSession;
