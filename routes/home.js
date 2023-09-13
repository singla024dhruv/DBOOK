const express=require('express');  //if forget search express routing on google 
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log('router is loaded');
router.get('/',homeController.home);
router.get('/try',homeController.try);
module.exports = router;