const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});

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
            pass: "gsup zbkw scex tpqo",
        },
    },
    // google_client_ID: process.env.GOOGLE_CLIENT_ID,
    // google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    // google_callbackURL: process.env.GOOGLE_CALLBACK_URL,
    GOOGLE_CLIENT_ID :"257323360028-ha64c6ginl0tavkunirgqgcm6ceg43b7.apps.googleusercontent.com",
GOOGLE_CLIENT_SECRET :"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",
GOOGLE_CALLBACK_URL :"http://localhost:8000/users/auth/google/callback",
  jwt_secret: 'Dbook',
  morgan: {
    mode: 'dev',
    options:{stream:accessLogStream}
    }
  
};
const production = {
  name: "production",
  asset_path: process.env.DBOOK_ASSET_PATH,
  session_cookie_key: process.env.DBOOK_SESSION_COOKIE,
  db: process.env.DBOOK_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dbookdhruv15@gmail.com",
      pass: process.env.DBOOK_DB,
    },
  },
  GOOGLE_CLIENT_ID: process.env.DBOOK_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.DBOOK_GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.DBOOK_GOOGLE_CLIENT_URL,
  jwt_secret: process.env.DBOOK_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.DBOOK_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.DBOOK_ENVIRONMENT);