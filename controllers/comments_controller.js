const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create = async function(req, res) {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      console.log(comment);
     
      post.comments?.push(comment);
      post.save();
      res.redirect('/');
      
    }
    else
    {
        res.redirect('/');
    }
  };
// module.exports.create=async function(req,res){
  
//         const post=await Post.findById(req.body.post);
        // if(post)
        // {
        //     Comment.create({
        //         content: req.body.content,
        //         post: req.body.post,
        //         user: req.user._id
        //     },function(err,comment)
        //     {
        //         if(err)
        //         {
        //             console.log('error in comment controller');
        //             return;
        //         }
        //         post.comments.push(comment);
        //         post.save();
        //         res.redirect('/');
        //     }
        //     );
        // }
        // if (post) {
             
        //       const comment = await Comment.create({
        //         content: req.body.content,
        //         post: req.body.post,
        //         user: req.user._id
        //       });
        //       post.comments.push(comment);
        //        post.save();
        //        res.redirect('/');
        //     } 
          
        //     }
            


