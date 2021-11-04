const jwt = require('jsonwebtoken');

async function authenticate(req,res,next){
    try{
        let str =req.headers.authorization;
        let token=str.split("Bearer ")[1];
        let payload = jwt.verify(token,process.env.SECRET_KEY);
        req.headers.authorization=payload.id;
        next();
    }
    catch(err){
        return res.status(401).json({
            status:false,
            errors:'Invalid token'
        })
    }
}

module.exports=authenticate;