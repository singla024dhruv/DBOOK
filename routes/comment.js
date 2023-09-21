const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const commentController=require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentController.create);

module.exports = router;