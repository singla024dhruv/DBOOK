const express=require('express');  //if forget search express routing on google 
const router=express.Router();

const likesController = require('../controllers/likes_controller.js');
console.log('yes i am here');
router.post('/toggle',likesController.toggleLike)


module.exports = router;