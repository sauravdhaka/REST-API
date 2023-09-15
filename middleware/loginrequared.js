const {User} = require('../models/User')
const jwt = require('jsonwebtoken')
const jwt_sceret ="lalala"

// this middleware help to get the cuurent loggedIn user so we can prform the updation and deletion task
// we can grep the cuurent user id

module.exports = (req,res ,next)=>{
    //we set Bearer token which we get when we looged in
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged In"})
    }
    const token = authorization.replace("Bearer ","")
    // verifing the token 
    jwt.verify(token,jwt_sceret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be Logged In"})
        }
        // grebing the user id from token
        const {_id} = payload
        // find that user with id and sending it as user
        User.findById(_id).then(userData =>{
            req.user = userData
            next()
        })
    })
    
}