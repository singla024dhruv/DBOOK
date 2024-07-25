const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log('router is loaded');
router.get('/',homeController.home);
//router.get('/try',homeController.try);

//for any futhur routes access from here



//router.use('/routername',require('./routes name))




router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));

router.use('/api', require('./api/index'));
router.use("/likes", require("./likes"));
router.use("/friends", require("./friends"));

//router.use('/forgotPswd', require('./forgotPswd'));
router.use("/forgotPswd", require("./forgotPswd"));

module.exports = router;