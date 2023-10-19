const mongoose=require('mongoose');


const reset_password=new mongoose.Schema({
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
const resetpass=mongoose.model('Resetpass',reset_password);
module.exports=resetpass;