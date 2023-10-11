const express=require('express');  //if forget search express routing on google 
const router=express.Router();

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports=router;
