const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'dbookdhruv15@gmail.com',
        pass:process.env.PASS
    }
});


// let renderTemplate=(data,relativePath)=> {
    // let mailHTML;
    
//     try{
//         console.log('inside render template');
//     ejs.renderFile(
//         path.join(__dirname,'../views/mailers',relativePath),
//         data,
//         function(err,template)
//         {
//             if(err)
//             {
//                 console.log('error in rendering template',err);
//                 return;
//             }
//             mailHTML=template;
//         }
         
//     )
//     return mailHTML;

// }
// catch(err){
//     console.log('error in rendering ejs file',err);
// }}
let renderTemplate = (data, relativePath) => {
    return new Promise((resolve, reject) => {
        try {
            ejs.renderFile(
                path.join(__dirname, '../views/mailers', relativePath),
                data,
                function (err, template) {
                    if (err) {
                        console.log('Error in rendering template', err);
                        reject(err);
                    } else {
                        resolve(template);
                    }
                }
            );
        } catch (err) {
            console.log('Error in rendering EJS file', err);
            reject(err);
        }
    });
};

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate, 
}