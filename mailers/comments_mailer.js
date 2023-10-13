const nodemailer=require('../config/nodemailer');
//previous way
/*
newComment =function
module.exports=newcomment*/
//this is another way of exporting method

// exports.newComment= (comment) => {
//    // console.log('inside newcomment mailer',comment);
//    let htmlstring=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
//     nodemailer.transporter.sendMail({
//         from:'dbookdhruv15@gmail.com',
//         to: 'dhruvsingla024@gmail.com',
//         subject:'new comment published',
//         html:htmlstring
//     },(err,info)=>{
//         if(err){
//             console.log('error in sending mail',err);
//             return;
//         }
//         console.log('Message sent',info);
//         return;
//     });
// }

exports.newComment = (comment) => {
    // Render the template and send the email within the promise chain
    nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')
        .then(htmlstring => {
            nodemailer.transporter.sendMail({
                from: 'dbookdhruv15@gmail.com',
                to:comment.user.email,
                subject: 'New comment published',
                html: htmlstring
            }, (err, info) => {
                if (err) {
                    console.log('Error in sending mail', err);
                    return;
                }
                console.log('Message sent', info);
            });
        })
        .catch(error => {
            console.log('Error in rendering email template:', error);
        });
};
