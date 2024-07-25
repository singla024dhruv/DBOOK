const mongoose=require('mongoose');


const forgotPassWordSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    is_valid:{
        type:Boolean,
        default:true,
    }

},{
    timestamps:true
});
const ForgotPswd=mongoose.model('ForgotPswd',forgotPassWordSchema);
module.exports=ForgotPswd;