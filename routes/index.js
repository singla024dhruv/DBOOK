const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log('router is loaded');
router.get('/',homeController.home);
//router.get('/try',homeController.try);

//for any futhur routes access from here



//router.use('/routername',require('./routes name))




router.use('/users',require('./users'));



module.exports = router;