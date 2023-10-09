const express=require('express');  //if forget search express routing on google 
const router=express.Router();

const postsApi=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',postsApi.destroy);

module.exports=router;
