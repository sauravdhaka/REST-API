const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
    username : {type:String,required:true,unique:true},
    password : {type:String,required:true}
})

exports.User = mongoose.model('User',UserSchema)
