const express = require('express');
const router = express.Router();
const path = require('path');

const uploadBookRoute = require('./uploadbook');
router.post('/book', uploadBookRoute);

module.exports = router;
