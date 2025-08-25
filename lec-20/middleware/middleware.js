function m1(req,res,next){
    console.log("running middleware 1...");
    req.user={
        id:1,
        username:"Nitesh"
    }
    next()
}
function m2(req,res,next){
    console.log("running middleware 2..")
    console.log(req.user);
    next()
}
function checkAdmin(req,res,next){
    console.log("running checkAdmin middleware")
    let {name} = req.query;
    if(name=="Nitesh"){
        req.isAdmin=true;
        return next()
    }
    // console.log("after next")
    res.json({
        success:false,
        message:"you are not an admin"
    })
}
function isLogin(req,res,next){
    console.log("running middleware isLogin");
    next()

}
module.exports.m1=m1;
module.exports.m2=m2;
module.exports.checkAdmin=checkAdmin
module.exports.isLogin=isLogin