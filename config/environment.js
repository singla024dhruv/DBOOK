const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "kuchsecreth",
  db: "Dbook_dev",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "dbookdhruv15@gmail.com",
            pass: process.env.PASS,
        },
    },
    google_client_ID: process.env.GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret :'Dbook'
  
};
const production = {
  name: "production",
  asset_path: process.env.Dbook_asset_path,
  session_cookie_key: "nmGn3HLwJSYp6cRkUL36VJGe54U1akPx",
  db: "Dbook_production",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dbookdhruv15@gmail.com",
      pass: process.env.PASS,
    },
  },
  google_client_ID: process.env.GOOGLE_CLIENT_ID,
  google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callbackURL: "http:/Dbook.com/users/auth/google/callback",
  jwt_secret: 'c98z93rm1l1VRmCZtgYGDboXf8DO6DZe',
};

module.exports =
  eval(process.env.DBOOK_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.DBOOK_ENVIRONMENT);