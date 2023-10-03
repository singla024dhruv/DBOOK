const Post=require('../models/post.js');
const Comment=require('../models/comment.js');
module.exports.create= async function(req,res)
{
    try{
    const post =await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
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
    console.log('error in creating a post');
    return;
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
      await post.deleteOne({post:req.params.id});
      await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
          
          data:{
            post_id: req.params.id
          },
          message: "Post Deleted"
        });
      }
    
      req.flash('success','post is deleted');
      return res.redirect('back');
    } else {
      res.redirect('back');
    }
  }