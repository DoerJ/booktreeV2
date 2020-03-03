const express = require('express');
const app = express();
const path = require('path');

// change to 'client/build' upon deployment
app.use(express.static(path.join(__dirname, '/client')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

var userRoutes = require('./routes/users/');

app.use('/api/user', userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}...`);
});
