const express = require('express');
const router = express.Router();
const path = require('path');

var signUpFirebaseAccountRoute = require('./signup-fb-account');
router.post('/signup', signUpFirebaseAccountRoute);

module.exports = router;
