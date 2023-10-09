const express=require('express');  //if forget search express routing on google 
const router=express.Router();

const postsApi=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);

module.exports=router;
