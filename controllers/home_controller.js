module.exports.home=function(req,res)
{
    console.log(req.cookies);
    //send as a response
    res.cookie('user_id',25);
   // return res.end('<h1>Express is up for DBOOK</h1>');
   return res.render('home',{
    title: "Home"
   });
}
//module.exports.actionname= function(req,res){
module.exports.try=function(req,res)
{
    return res.end('<h1> another try</h1>');
}
