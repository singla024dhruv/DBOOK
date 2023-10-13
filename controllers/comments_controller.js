const Comment=require('../models/comment');
const Post=require('../models/post');
const commentmailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');

 
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
      await comment.populate('user', 'name email');
      //commentmailer.newComment(comment);  
     let job=queue.create('emails',comment).save(function(err){
        if(err)
        {
          console.log('error in creating the queue');
          return;
        }
        console.log('job enqueue',job.id);
      })
      if (req.xhr){
        // Similar for comments to fetch the user's id!
        console.log('xhr is called in creating a comment');
        //  await comment.populate('user', 'name');

        return res.status(200).json({
            data: {
                comment: comment
            },
            message: "Post created!"
        });
    }
    console.log('xhr is not called in creating a comment');

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
        try{
        const comment = await Comment.findById(req.params.id);
        let postid = comment.post;
        const post=await Post.findById(postid);
        if ((comment.user == req.user.id)||(post.user._id==req.user.id) ){
          // let postid = comment.post;
          await comment.deleteOne({comment:req.params.id});
          await Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });
          if (req.xhr){
            console.log('xhr is called');
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
        console.log('xhr is not called in deleting comments');
          req.flash('success','comment is deleted');
          return res.redirect('back');
        } else {
          req.flash('error','cannot delete comment');
          return res.redirect('back');
        }
      }
      catch(err)
      {
        req.flash('error',err);
        console.log('erroe',err);
        return;
      }
    }
      


