const Post =require('../models/post');
const User = require('../models/user');
const Friendship = require("../models/friendship");
// module.exports.home=function(req,res)
// {
    //console.log(req.cookies);
    //send as a response
    //res.cookie('user_id',25);
   // return res.end('<h1>Express is up for DBOOK</h1>');
//    Post.find({},function(err,posts){
    
//    return res.render('home',{
//     title: "DBOOK | Home",
//     posts:posts
//    });
// });
// }
 module.exports.home = async function(req, res) {
//     try{const posts = await Post.find({});
    
//     return res.render('home', {
//       title: "DBOOK | Home",
//       posts: posts
//     });
//   }
//   catch(err)
//   {
//     console.log('error in finding the post');
//   }
  // const post = await Post.
  // findOne({ title: 'Casino Royale' }).
  // populate('user').
  // exec();
  try{
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user').populate({
        path: 'comments', populate: {
          path: 'user'
        }
      }
      ).populate({
        path: 'comments',
        populate: {
          path: 'likes'
        },
      }).populate('likes');
    const users = await User.find({});
       let friendlist = await Friendship.find({
         from_user: req.user,
       }).populate({
         path: 'to_user',
         populate: {
           path: 'name',
         },
       });
  return res.render('home', {
    title: "DBOOK| Home",
    posts: posts,
    all_users: users,
    all_friends: friendlist
  });
  

}
catch(err){
  console.log('error',err);
  return;
}
 }
//module.exports.actionname= function(req,res){
