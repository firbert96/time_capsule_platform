const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
    try{
        const str =req.headers.authorization;
        const token=str.split("Bearer ")[1];
        const payload = jwt.verify(token,process.env.SECRET_KEY);
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