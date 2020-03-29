const express = require('express');
const router = express.Router();
const path = require('path');

const uploadBookRoute = require('./upload-book');
router.post('/book', uploadBookRoute);

module.exports = router;
