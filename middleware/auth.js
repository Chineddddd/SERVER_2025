const jwt = require('jsonwebtoken')
exports.auth = (req,res,next)=>{
    try{
        const token = req.header("x-auth-token")
        if(!token){
            return res.status(401).json({
                massage:"No token, authorization denied"
            })
        }
        const verifyToken = jwt.verify(token,"kaika",(err,decode)=>{
            if(err){
                return res.status(401).json({
                    massage:"Token is not invalid"
                })
            }else{
                console.log(decode)
                req.user = decode
                // console.log("token",verifyToken)
                next();
            }
        })

    }catch(err){
        console.log("Something wrong in middleware")
        res.status(500).json({
            massage:"Server error"
        })
    }
}
