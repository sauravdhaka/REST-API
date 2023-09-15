const mongoose = require('mongoose')

const {Schema} = mongoose

// simple user Schema

const UserSchema = new Schema({
    username : {type:String,required:true,unique:true},
    password : {type:String,required:true}
})

exports.User = mongoose.model('User',UserSchema)
