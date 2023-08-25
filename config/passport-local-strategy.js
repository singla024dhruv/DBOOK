const passport=require('passport');

const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');



//authentication using passport and find the user and establish the identity


// passport.use(new localStrategy({
//     usernameField: 'email'
// },
// function(email,password,done)
// {
//     //find the user and establish the identity
//     User.findOne({email: email},function(err,user){
//         if(err)
//         {
//             console.log('error in finding user --> Passport');
//             return done(err);
//         }
//         if(!user||user.password!=password)
//         {
//             console.log('invalid username/password');
//             return done(null,false);
//         }
//         else{
//             return done(null,user);
//         }
//     })
// }
// ));
passport.use(new localStrategy({
    usernameField: 'email'
},
async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            console.log('invalid username/password');
            return done(null, false);
        } else {
            return done(null, user);
        }
    } catch (err) {
        console.log('error in finding user --> Passport');
        return done(err);
    }
}
));

//serialising the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);

});

//deserializing the user from the key in the cookies
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
//         if(err)
//         {
//             console.log('error in finding user');
//             return done(err);
//         }
//         return done(null,user);
//     });
// });
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log('error in finding user');
      return done(err);
    }
  });

passport.checkAuthentication=async function(req,res,next){
    try{
        const check=await req.isAuthenticated();
        if(check)
        {
            return next();
        }
        else{
            return res.redirect('/users/sign-in');
        }

    }
    catch(err)
    {
        console.log('error is coming in authentication process');
    }

}
passport.setAuthenticatedUser = async function(req,res,next){
    try{
        const check= await req.isAuthenticated();
        if(check)
        {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the local for the use

            res.locals.user=req.user;
        }
        next();
    }
    catch(err)
    {
        console.log(err);
    }
}
    
module.exports = passport;
