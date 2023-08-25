const express=require('express');
const router=express.Router();
const passport=require('passport');
const usercontroller=require('../controllers/users_controller');
router.get('/profile', passport.checkAuthentication, usercontroller.profile);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);
router.post('/create',usercontroller.createid);


// const {signUp, signIn} = require('../controllers/users_controller');
// router.get('/sign-up', signUp);
// router.get('/sign-in', signIn);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: 'users/sign-in'},

),usercontroller.createSession);
router.get('/sign-out',usercontroller.destroySession);
module.exports=router;

