const User =require('../models/user.js');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const resetpass=require('../models/resetpassword.js');
module.exports.formpage=async function(req,res){
    return res.render('resetpass',{
        title:'resetpassword'
    });
}
module.exports.setaccesstoken=async function(req,res){
    let user=await User.findOne({email:req.body.email});
    if(user)
    {
        const resetPass=await resetpass.create({
            accessToken: crypto.randomBytes(20).toString('hex')
        });
         resetPass.populate('user','name email password');
         const accessToken=resetPass.accessToken;
         console.log('access token is',accessToken);

         return res.render('resetpass',{
            title:'reset_password',
            accessToken:accessToken,
            resetPass:resetPass
         })

        //return res.render()
    }
    else{
        req.flash('error','user does not exist');
        return res.redirect('back');
    }
}
