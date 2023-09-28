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
      req.flash('success','comment is posted');
      res.redirect('/');
      
    }
    else
    {
      req.flash('error','error in commenting try again');
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
      // module.exports.destroy =function(req,res)
      // {
      //   Comment.findById(req.params.id,function(err,comment){
      //     if(comment.user==req.user.id)
      //     {
      //       let postid=comment.post;
      //       comment.deleteOne({id:req.params.id});
      //       Post.findByIdAndUpdate(postid,{$pull : { comments:req.params.id}},function(err,post){
      //         return res.redirect('back');
      //       })

      //     }
      //     else
      //     {
      //       return res.redirect('back');
      //     }
      //       });
      //     }
      module.exports.destroy = async function(req, res) {
        const comment = await Comment.findById(req.params.id);
        let postid = comment.post;
        const post=await Post.findById(postid);
        if ((comment.user._id == req.user.id)||(post.user._id==req.user.id) ){
          // let postid = comment.post;
          await comment.deleteOne({comment:req.params.id});
          await Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });
          req.flash('success','comment is deleted');
          return res.redirect('back');
        } else {
          req.flash('error','cannot delete comment');
          return res.redirect('back');
        }
      }
      
      


