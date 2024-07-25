const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
require('dotenv').config();
const expresslayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');
const cors = require('cors');
const session=require('express-session');
const passport=require('passport');
const passportJwt=require('./config/passport-jwt-strategy');
const passporLocal = require('./config/passport-local-strategy');
const passportgoogle=require('./config/passport-fgoogle-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

const flash =require('connect-flash');

const customware=require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
//app.use(cors());
// require("socket.io")(chatServer, {
//   cors: {
//     origin: "*",
//   },
// });
chatServer.listen(5000, () => {
    console.log('server running at port 5000');
})
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads patha vailable to browser
app.use('/uploads',express.static(__dirname+'/uploads')); 

app.use(expresslayouts);

//extract styles and scripts from subpages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router


//set up the view engine
app.set('view engine','ejs');

app.set('views','./views');


app.use(session({
    name: 'DBOOK',
    //to do change the secret before deploment in production mode
    secret: 'kuchsecreth',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err)
        {
            console.log(err||' connect-mongodb setup ok');
        }
    //    store.on('error',function(error) {
    //         console.log(error);

    //     }
    )
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//const customware=require('./config/middleware');

app.use(flash());

app.use(customware.setflash);
app.use('/',require('./routes'));
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error in running the server:${err}`);
    }
    console.log(`server is running on port:${port}`);

});