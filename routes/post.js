const express=require('express');  //if forget search express routing on google 
const router=express.Router();

const postController=require('../controllers/post_controller');

router.post('/create',postController.create);

module.exports = router;