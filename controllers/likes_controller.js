// const Like=require('../models/like');
// const Comment =require('../models/comment');
// const Post=require('../models/post');
// //const { name } = require('ejs');


// module.exports.toggleLike =async function(req,res){
//     try{
//         //likes/togle/?id=abcdef&type=Post
//         let likeable;
//         let deleted = false;
//         if(req.query.type=='Post')
//         {
//             likeable=await Post.findById(req.query.id).populate('likes');

//         }else{
//             likeable=await Comment.findById(req.query.id).populate('likes');
//         }
//         //check if like already exist
//         let existinglike=await Like.findOne({
//             likeable: req.query.id,
//             onModel: req.query.type,
//             user: req.user.id
//         });
//         //if a like already exist then delete it else make a new like
//         if(existinglike)
//         {
//             likeable.likes.pull(existinglike._id);
//             likeable.save();
//            await Like.findOneAndDelete({
//             likeable: req.query.id,
//             onModel: req.query.type,
//             user: req.user.id
//            })
//             deleted = true;
//         }
//         else{
//             let newlike=await Like.create({
//                 user:req.user._id,
//                 likeable:req.query.id,
//                 onModel:req.query.type
//             });
//             likeable.likes.push(newlike._id);
//             likeable.save();
//         }
//         res.redirect('back');
//           return res.status(200).json({
//             data:{
//                 deleted:deleted
//             },
//             message:'request successful!',
            
//         });
        
        
//     }
//     catch(err)
//     {
//         console.log(err);
//         return res.json(500,{
//             message: 'internal server error'
//         })
//     }
// }
const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type === "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user.id,
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      await likeable.save();
      await Like.findOneAndDelete({
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user.id,
      });
      deleted = true;
      // Handle successful like deletion (e.g., return JSON response)
      return res.status(200).json({
        data: {
          deleted: deleted,
        },
        message: "Like deleted successfully",
      });
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike._id);
      await likeable.save();
      // Handle successful like creation (e.g., return JSON response)
      return res.status(200).json({
        data: {
          like: newLike,
        },
        message: "Like created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};