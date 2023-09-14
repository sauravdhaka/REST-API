const { use } = require('bcrypt/promises')
const {User} = require('../models/User')

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