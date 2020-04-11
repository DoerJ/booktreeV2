const express = require('express');
const router = express.Router();
const path = require('path');

const getMeUploadsRoute = require('./meuploads');
router.get('/me-uploads', getMeUploadsRoute);

const deleteMeUploadsRoute = require('./deletemeuploads');
router.post('/delete-uploads', deleteMeUploadsRoute);

module.exports = router;
