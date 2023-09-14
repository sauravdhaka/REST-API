const express = require('express');
const { createUser, loginUser, updateUser, deleteUser, forgotPassword } = require('../Controllers/User');
const loginrequared = require('../middleware/loginrequared');

const router = express.Router();

router.post('/create-user',createUser)
    .post('/login-user',loginUser)
    .put('/update-user',loginrequared,updateUser)
    .delete('/delete-user',loginrequared,deleteUser)
    .put('/forget-password',forgotPassword)

exports.router = router;