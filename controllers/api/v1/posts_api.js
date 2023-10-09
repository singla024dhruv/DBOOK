const Post =require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate({path: 'user',select:'-password'}).populate({
      path: 'comments',populate: {
        path: 'user',
        select:'-password'
      }
    }
    ).exec();
    return res.json(200,{
        message:"Lists of posts",
        posts:posts
    })
}
module.exports.destroy = async function(req, res) {
  try{
  let post = await Post.findById(req.params.id);
  //if (post.user == req.user.id) {
    await post.deleteOne({post:req.params.id});
    
    await Comment.deleteMany({ post: req.params.id });
    
   // }
   // req.flash('success','post is deleted');
    return res.json(200,{
      message:"post and associated comments deleted"
    });
    }
    catch(err){
      console.log('error',err);
      return res.json(500,{
        message:"Internal server error"
      });
 // } else {
   // res.redirect('back');
  //}
}
}
