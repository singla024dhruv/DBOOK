const User =require('../models/user.js');
module.exports.profile=function(req,res)
{
    //return res.end('<h1> users profile</h1>');
    return res.render('users_profile',{
        title: "user_profile",
    });
}
//render the signup page
module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',{
        title: "DBOOK | Sign Up"
    });
}
//render the sign in page
module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',{
        title: "DBOOK | Sign In"
    });
}
//get the sign up data
// module.exports.createid=function(req,res){
//     if(req.body.password!=req.body.confirm_password){
//         return res.redirect('back');
//     }
    //find one is no longer accepting call back so converting to async and await function



    // User.findOne({
    //     email: req.body.email},
    //     function(err,user){
    //         if(err)
    //         {
    //             console.log('error in findind user in signing up');
    //             return;
    //         }
    //         if(!user)
    //         {
    //             User.create(req.body,function(err,user)
    //             {
    //                 if(err)
    //                 {
    //                     console.log('error in creating user while signing up');
    //                     return;
    //                 }
    //                 console.log('user created');
    //                 console.log(req.body);
    //                 return res.redirect('/users/sign-in');
    //             });
    //         }
    //         else{
    //             return res.redirect('/user/sign-in');
    //         }
    //     }
    // );

    
    //to do later
    module.exports.createid = async function(req, res) {
        if (req.body.password != req.body.confirm_password) {
          return res.redirect('back');
        }
        try {
          const user = await User.findOne({ email: req.body.email });
          if (!user) {
            await User.create(req.body);
            console.log('user created');
            console.log(req.body);
            return res.redirect('/users/sign-in');
          } else {
           // window.alert('user email already registerd');
            return res.redirect('back');
          }
        } catch (err) {
          console.log('error in finding user in signing up');
          return;
        }
      };

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    //to do later
}
