const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, forgotPassword } = require('../Controllers/User');
const passport = require('passport');
const { isAuth } = require('../services/common');

const router = express.Router();

// routes for diffrent api's

router.post('/create-user',createUser)
    .post('/login-user', passport.authenticate("local"),loginUser) 
    .patch('/update-user/:id',isAuth(),updateUser) 
    .delete('/delete-user/:id',isAuth(),deleteUser)
    .put('/forget-password',forgotPassword)

exports.router = router;