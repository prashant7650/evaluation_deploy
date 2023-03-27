const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req,res,next)=> {

    const token = req.headers.authorization

    if(token){
        jwt.verify(token,"masai",(err,decoded)=> {
            if(decoded){
                req.body.userId = decoded.userId
                next()

            }else{
                res.status(400).send({"msg": "Login Please"})
            }
        });
    }else{
        res.status(400).send({"msg":" Login Please"})
    }
}
module.exports={
    authenticate
}