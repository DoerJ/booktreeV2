const express = require('express');
const app = express();
const path = require('path');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

// Change to 'client/build' upon deployment
app.use(express.static(path.join(__dirname, 'client')));
app.set('trust proxy');

app.use(session({
    secret: 'SECRET_SESSION_MESSAGE',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client
    }),
    saveUninitialized: false,
    resave: false
}));

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

const userRoutes = require('./routes/users/');
app.use('/api/user', userRoutes);

const uploadRoutes = require('./routes/upload/');
app.use('/api/upload', uploadRoutes);

const bookRoutes = require('./routes/books/');
app.use('/api/book', bookRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}...`);
});
