const Post =require('../../../models/post');
module.exports.index=async function(req,res){
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user').populate({
      path: 'comments',populate: {
        path: 'user'
      }
    }
    ).exec();
    return res.json(200,{
        message:"Lists of posts",
        posts:posts
    })
}