const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, forgotPassword } = require('../Controllers/User');
const loginrequared = require('../middleware/loginrequared');
const passport = require('passport')

const router = express.Router();

// routes for diffrent api's

router.post('/create-user',createUser)// user creating route
    .post('/login-user', passport.authenticate("local"),loginUser) // for login
    .put('/update-user',loginrequared,updateUser) // for updating the user and we added a middelware for geting user information according we can update user
    .delete('/delete-user',loginrequared,deleteUser)// for deleting the user and adding a middleware for same purpouse
    .put('/forget-password',forgotPassword)// forget password route

exports.router = router;