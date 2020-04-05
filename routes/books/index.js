const express = require('express');
const router = express.Router();
const path = require('path');

const getMeUploadsRoute = require('./meuploads');
router.get('/me-uploads', getMeUploadsRoute);

module.exports = router;
