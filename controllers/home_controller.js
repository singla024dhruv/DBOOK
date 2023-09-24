const Post =require('../models/post');
const User =require('../models/user');
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
  const posts = await Post.find({}).populate('user').populate({
    path: 'comments',populate: {
      path: 'user'
    }
  }
  ).exec();
  const users= await User.find({});
  res.render('home', {
    title: "DBOOK| Home",
    posts: posts,
    all_users:users
  });
  

}
//module.exports.actionname= function(req,res){

