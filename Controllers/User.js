const {User} = require('../models/User')
const jwt = require('jsonwebtoken')
const jwt_sceret ="lalala"

exports.createUser = async (req,res)=>{
    try {
        const {username,password} = req.body
        const user = new User({username,password})
        const doc = await user.save()
        res.status(201).json({name:doc.username})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


exports.loginUser = async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            res.status(401).json('THis user is not exits')
        }
        else{
            if(user.password !== password){
                res.status(401).json('Invalid Password')
            }
            else{
                const token = jwt.sign({ _id: user.id }, jwt_sceret);
                res.status(200).json(token)
            }
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.updateUser = async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        const user = await User.findByIdAndRemove(req.user._id)
        res.status(200).json({user,message:'User successfully deleted'})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.forgotPassword = async (req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(user){
            user.password = req.body.password
            await user.save()
            res.status(200).json('Password successfully updated')
        }
        else{
            res.status(401).json('no such user exists')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}