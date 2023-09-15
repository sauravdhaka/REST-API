const {User} = require('../models/User')
const jwt = require('jsonwebtoken')
const { sanitizeUser } = require('../services/common')
const jwt_sceret ="lalala"
// jwt_secret key for token creation



// create usser api function for creating new user { user can register with unique username and password}
exports.createUser = async (req,res)=>{
    try {
        const {username,password} = req.body
        // we can hashed the password also using bcrypt and save the hashed password for more secure.
        const user = new User({username,password})
        const doc = await user.save() // saving user to the mongoDB database
        req.login(sanitizeUser(doc),(err)=>{
            if(err){
                res.status(400).json(err)
            }else{
                const token = jwt.sign(sanitizeUser(doc),jwt_sceret)
                res.status(201).json({id:doc.id})
            }
        })
        // sending back username
    } catch (error) {
        console.log(error)
        res.status(400).json(error)// In case of any error sending error to response
    }
}



// Login api function for user {user can login with username and password}
exports.loginUser = async (req,res)=>{
    const user = req.user;
    res
      .cookie("jwt", user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(201)
      .json({ id: user.id});
  
}



// Update user api function where user can update username and passsword
// for updating the user must have logged In
exports.updateUser = async (req,res)=>{
    const {id} = req.params;
   
    try{
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json(err)
    }
}


// deleting user form database 
// for deleting user must have loggedIn
exports.deleteUser = async (req,res)=>{
    const userId = req.params.id
    try {
        const user = await User.findByIdAndRemove(userId)
        res.status(200).json({user,message:'User successfully deleted'})
    } catch (error) {
        res.status(400).json(error)
    }
}


// Forgot Password api  in case user forgot his/him password
// We canmake it more secure 
// We can use nodemailer for forgeting password we send a token in email for verification and handle the forget password request and then update the password
// here i try to make it simpler and easy to use
exports.forgotPassword = async (req,res)=>{
    try {
        // finding the user using the username
        const user = await User.findOne({username:req.body.username})
        if(user){
            // if user exists with same username then we update the password
            user.password = req.body.password
            await user.save()
            res.status(200).json('Password successfully updated')
        }
        else{
            // if not then sending this response
            res.status(401).json('no such user exists')
        }
    } catch (error) {
        res.status(401).json(error)//In case of any error
    }
}