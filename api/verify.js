const jwt = require('jsonwebtoken'); 
function verify(req,res,next){
    console.log('vf');
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,'secret_key',(err,user)=>{
            if(err)res.status(403).json("token is not valid");
            req.user = user;
            next(); 
        })
    }
    else{
       
        return res.status(401).json("you are not authenticated");

    }

}
module.exports = verify;