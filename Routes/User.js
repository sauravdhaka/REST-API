const express = require('express');
const { createUser } = require('../Controllers/User');

const router = express.Router();

router.post('/create-user',createUser)

exports.router = router;