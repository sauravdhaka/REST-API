const express = require('express');
const { createUser, loginUser } = require('../Controllers/User');

const router = express.Router();

router.post('/create-user',createUser)
    .post('/login-user',loginUser)

exports.router = router;