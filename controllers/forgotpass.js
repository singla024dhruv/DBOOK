const User =require('../models/user.js');
const pass=require('../models/resetpassword.js');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
module.exports.forgot=async function(req,res){
    return res.render('usercheck',{
        title:'enter mail'
    });
}
module.exports.setaccesstoken=async function(req,res){
    const user= await User.findOne({email:req.body.email});
    if(user)
    {
       const resetpass= await pass.create({
            accessToken:crypto.randomBytes(20).toString('hex')
        });
        resetpass.populate('user').exec();
        const accessToken=resetpass.accessToken;
        return res.render('resetpassform',{
            title:resetpass,
            accessToken:accessToken
        })
    }
}