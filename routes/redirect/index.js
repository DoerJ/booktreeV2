const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/main', function(req, res) {
    console.log('SESSION KEY: ' + req.session.key);
    if(req.session.key) console.log('Redirect...');
})

module.exports = router;
