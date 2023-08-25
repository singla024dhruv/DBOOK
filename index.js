const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passporLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

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