const express=require('express');
const router=express.Router();
const passport=require('passport');
const usercontroller=require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication, usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);
// router.get('/profile',passport.checkAuthentication,usercontroller.profile);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);
router.post('/create', usercontroller.createid);
router.get('/all_users', usercontroller.allusers);


// const {signUp, signIn} = require('../controllers/users_controller');
// router.get('/sign-up', signUp);
// router.get('/sign-in', signIn);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},

),usercontroller.createSession);
router.get('/sign-out',usercontroller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usercontroller.createSession);

module.exports=router;

