var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/signup', (req, res) => {
    res.json({
        statusCode: 200;
    });
})

module.exports = router;
