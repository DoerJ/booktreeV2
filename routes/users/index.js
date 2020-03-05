const express = require('express');
const router = express.Router();
const path = require('path');

var signUpFirebaseAccountRoute = require('./signup-fb-account');
router.post('/signup', signUpFirebaseAccountRoute);

var logInFirebaseAccountRoute = require('./login-fb-account');
router.post('/login', logInFirebaseAccountRoute);

module.exports = router;
