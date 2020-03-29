const express = require('express');
const router = express.Router();
const path = require('path');

const signUpFirebaseAccountRoute = require('./signup-fb-account');
router.post('/signup', signUpFirebaseAccountRoute);

const logInFirebaseAccountRoute = require('./login-fb-account');
router.post('/login', logInFirebaseAccountRoute);

const logOutFirebaseAccountRoute = require('./logout-fb-account');
router.post('/logout', logOutFirebaseAccountRoute);

module.exports = router;
