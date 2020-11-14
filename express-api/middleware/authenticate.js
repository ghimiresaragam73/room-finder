const jwt = require('jsonwebtoken');
const config = require('./../config/index');
const userModel = require('./../models/user.model');

module.exports = (req, res, next) => {
    var token;
    if (req.headers['authorization'])
        token = req.headders['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.headers['token'])
        token = req.headers['token']
    if (token) {
        jwt.verify(token, config.jwtSecretKey, (err, done) => {
            if (err) {
                return next(err);
            }
            userModel.findById(done.id)
                .exec((err, user) => {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        req.loggedInUser = user;
                        return next();
                    } else {
                        return next({
                            message: 'User with token is removed from system'
                        })
                    }
                })
        })
    } else {
        return next({
            message: 'Token not provided'
        })
    }
}