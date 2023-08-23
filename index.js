const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');
app.use(express.static('./assets'));

app.use(expresslayouts);

//extract styles and scripts from subpages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index'));

//set up the view engine
app.set('view engine','ejs');

app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error in running the server:${err}`);
    }
    console.log(`server is running on port:${port}`);

});