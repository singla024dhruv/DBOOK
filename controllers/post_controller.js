const Post=require('../models/post.js');
const Comment = require('../models/comment.js');
const Like = require('../models/like');
module.exports.create= async function(req,res)
{
    try{
    let post =await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    if(req.xhr){
      post = await post.populate('user', 'name');
      return res.status(200).json({
        data:{
          post:post
        },
        messsge: "Post created!"
      });
    }
    req.flash('success','Post is created!');
    return res.redirect('back');
}
catch(err)
{
    console.log('error in creating a post',err);
      return res.redirect('back');
}
}
// module.exports.destroy= function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         //.id means converting id into string
//         if(post.user==req.user.id)
//         {
//             post.remove();
//             Comment.deleteMany({post:req.params.id},function(err){
//                 return res.redirect('back');
//             });

//         }
//         else{
//             res.redirect('back');
//         }
//     })
// }
module.exports.destroy = async function(req, res) {
   const post = await Post.findById(req.params.id);
  if (post.user == req.user.id) {
    await Like.deleteMany({ likeable: post, onModel: 'Post'});
    await Like.deleteMany({ _id: { $in: post.comments } });
     await Comment.deleteMany({ post: req.params.id });
    await post.deleteOne({ post: req.params.id });
    //post.remove();
     // await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
          
          data:{
            post_id: req.params.id
          },
          message: "Post Deleted !"
        });
      }
      req.flash('success','post is deleted');
      return res.redirect('back');
  } else {
      req.flash('error','You can not delete this post !');
      return res.redirect('back');
    }
  }


