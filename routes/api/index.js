const express=require('express');  //if forget search express routing on google 
const router=express.Router();

router.use('/v1',require('./v1/index'));

module.exports=router;