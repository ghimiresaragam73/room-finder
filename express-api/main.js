const express = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/index');
require('./config/dbConnection');

const authenticate = require('./middleware/authenticate');
const authRoutes = require('./controllers/auth.routes');
const userRoutes = require('./controllers/user.routes');
const roomRoutes = require('./controllers/room.routes');


express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());
express.use(morgan('dev'));
express.use(cors());


express.use('/auth', authRoutes);
express.use('/user', authenticate, userRoutes);
express.use('/room', roomRoutes)

express.use((req, res, next) => {
    next({
        message: '404 Page Not Found'
    })
})

express.use((err, req, res, next) => {
    res.status(err.status || 400);
    res.json({
        message: err.message || err
    })
})

express.listen(config.port, (err, done) => {
    if (err) {
        console.log('Server Connection Failed');
    } else {
        console.log('Server Listening at ', config.port);
    }
})