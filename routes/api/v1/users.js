const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const userApi=require('../../../controllers/api/v1/users_api');
router.post('/create-session',userApi.createSession);
module.exports=router;