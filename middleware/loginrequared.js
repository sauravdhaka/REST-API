const {User} = require('../models/User')
const jwt = require('jsonwebtoken')
const jwt_sceret ="lalala"

module.exports = (req,res ,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged In"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwt_sceret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be Logged In"})
        }
        const {_id} = payload
        User.findById(_id).then(userData =>{
            req.user = userData
            next()
        })
    })
    
}