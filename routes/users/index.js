const express = require('express');
const router = express.Router();
const path = require('path');

const signUpFirebaseAccountRoute = require('./fbsignup');
router.post('/signup', signUpFirebaseAccountRoute);

const logInFirebaseAccountRoute = require('./fblogin');
router.post('/login', logInFirebaseAccountRoute);

const logOutFirebaseAccountRoute = require('./fblogout');
router.post('/logout', logOutFirebaseAccountRoute);

const getMeInfoRoute = require('./getmeinfo');
router.get('/get-meinfo', getMeInfoRoute);

module.exports = router;
