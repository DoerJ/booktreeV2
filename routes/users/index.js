const express = require('express');
const router = express.Router();
const path = require('path');

var signUpFirebaseAccountRoute = require('./signup-fb-account');
router.post('/signup', signUpFirebaseAccountRoute);

var logInFirebaseAccountRoute = require('./login-fb-account');
router.post('/login', logInFirebaseAccountRoute);

var logOutFirebaseAccountRoute = require('./logout-fb-account');
router.post('/logout', logOutFirebaseAccountRoute);

var uploadRoute = require('./upload');
router.post('/upload', uploadRoute);

module.exports = router;
