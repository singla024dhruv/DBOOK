const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const postController=require('../controllers/post_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;