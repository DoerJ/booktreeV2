const express = require('express');
const router = express.Router();
const path = require('path');

const getMeUploadsRoute = require('./meuploads');
router.get('/me-uploads', getMeUploadsRoute);

const deleteMeUploadsRoute = require('./deletemeuploads');
router.post('/delete-uploads', deleteMeUploadsRoute);

const getUploadsByDate = require('./dateuploads');
router.get('/date-uploads', getUploadsByDate);

module.exports = router;
