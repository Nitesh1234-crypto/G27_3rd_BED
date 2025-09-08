module.exports.isLogin=function(req,res,next){
    let token= req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            message:"please provide token or login"
        })
    }
    let decode= jwt.verify(token,"lop");
    if(!decode){
        return res.json({
            success:false,
            message:"invalid token"
        })
    }
    req.userId= decode.userId
    next()
}