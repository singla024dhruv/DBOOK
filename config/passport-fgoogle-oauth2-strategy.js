const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    // clientID:"257323360028-ha64c6ginl0tavkunirgqgcm6ceg43b7.apps.googleusercontent.com",
    // clientSecret:"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",
    // callbackURL:"http://localhost:8000/users/auth/google/callback"
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},
    // function(accessToken,refreshToken,profile,none){
    //     //find the user 
    //     User.findOne({email:profile.emails[0].value}).exec(function(err,user)
    //     {
    //         if(err)
    //         {
    //             console.log('error in google strategy passport',err);
    //             return;
    //         }
    //         console.log(profile);
    //         if(user){
    //             //if found set this user as req.user
    //             return done(null,user);
    //         }
    //         else{
    //             //if not found create the user
    //             User.create({
    //                 name:profile.name,
    //                 email:profile.emails[0].value,
    //                 password:crypto.randomBytes(20).toString('hex')

    //             },function(err,user){
    //                 if(err){console.log('error in creating user google strategy-passport',err);return;}
    //                 //set the user as req.user
    //                 return done(null,user);
    //             });
    //         }


    //     });
    // }
    async function(accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ email: profile.emails[0].value }).exec();
            console.log(profile);
    
            if (user) {
                // If found, set this user as req.user
                return done(null, user);
            } else {
                // If not found, create the user
                const newUser = await User.create({
                    name: profile.name.givenName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
    
                return done(null, newUser);
            }
        } catch (err) {
            console.log('Error in Google strategy passport', err);
            return done(err, null);
        }
    }
));


module.exports=passport;