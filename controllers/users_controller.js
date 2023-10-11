const User =require('../models/user.js');
const fs=require('fs');
const path=require('path');

module.exports.profile= async function(req,res)
{
  const user= await User.findById(req.params.id);
    //return res.end('<h1> users profile</h1>');
    return res.render('users_profile',{
        title: "user_profile",
        profile_user: user
    });
}

module.exports.update=async function(req,res){
  if(req.user.id==req.params.id)
  {
    try{
    let user=await User.findById(req.params.id);
   
    User.uploadedAvatar(req,res,function(err){
      if(err)
      {
        console.log('error in multer',err);
      }
      user.name=req.body.name;
      user.email=req.body.email;
     
      if(req.file)
      {
        //this is saving the path of the uploaded file into the avatar field in the user
        if(user.avatar)
        {
            let currAvatarPath = path.join(__dirname, '..', user.avatar);
            if(fs.existsSync(currAvatarPath))
            {
                fs.unlinkSync(currAvatarPath);
            }
        }
        user.avatar=User.avatarPath+'/'+req.file.filename;
        // console.log(user.avatar);
        
      }
      user.save();
      //console.log(req.file);
      return res.redirect('back');
      //console.log(req.file);
    });





  }
    catch(err)
    {
      req.flash('error',err);
      return res.redirect('back');
    }

  }
  else
  {
    return res.status;
  }
}
//render the signup page
module.exports.signUp=async function(req,res)
{
  try{
    const check=req.isAuthenticated();
    if(check)
    {
      res.redirect('/users/profile');
    }
    else{
      return res.render('user_sign_up',{
        title: "DBOOK | Sign Up"
    });
    }

  }
  catch(err)
  {
    console.log('error in signing up');
  }
  // if(req.isAuthenticated())
  // {
  //   return res.redirect('/users/profile');
  // }
  //   return res.render('user_sign_up',{
  //       title: "DBOOK | Sign Up"
  //   });
}
//render the sign in page
module.exports.signIn=async function(req,res)
{
  try{
  const check=await req.isAuthenticated();
  if(check)
  {
    return res.redirect('/users/profile');
  }
  else{
    // return res.render('user_sign_in',{
    //   title: "DBOOK | Sign In"
    // return res.redirect('/users/sign-in');
    res.render('user_sign_in', {title: "DBOOK"});
  }
  }
  
  catch(err)
  {
    console.log('error in sigining in');
  }
  // if(req.isAuthenticated())
  // {
  //   return res.redirect('/users/profile');
  // }
  //   return res.render('user_sign_in',{
  //       title: "DBOOK | Sign In"
  //   });
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
            req.flash('success','account is created!');
            return res.redirect('/users/sign-in');
          } else {
           // window.alert('user email already registerd');
           req.flash('error','user already exist please sign in to continue');
            return res.redirect('back');
          }
        } catch (err) {
          console.log('error in finding user in signing up');
          return;
        }
      };

//sign in and create a session for the user
module.exports.createSession=function(req,res){
    
    req.flash('success','logged in successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
  // req.flash('success','you have logged out');

  req.logout(function(err){
    if(err)
    {
      return next(err);
    }
  req.flash('success','you have logged out');

    return res.redirect('/users/sign-in');
  });
  
}
