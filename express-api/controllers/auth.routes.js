const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/index');

const userModel = require('./../models/user.model');
const userHelp = require('./../helper/userHelp');

router.post('/register', (req, res, next) => {
    var user = new userModel;
    user = userHelp(req.body, user);
    user.save((err, user) => {
        if (err) {
            return next(err)
        }
        res.json(user);
    })
})

router.post('/login', (req, res, next) => {
    userModel.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                return next(err);
            }
            if (user) {
                var isMatched = bcrypt.compareSync(req.body.password, user.password);
                if (isMatched) {
                    var token = jwt.sign({ id: user._id }, config.jwtSecretKey);
                    res.json({
                        token: token,
                        user: user
                    });
                } else {
                    next({
                        message: 'Username/Password did not matched'
                    })
                }
            } else {
                next({
                    message: 'Username/Password did not matched'
                })
            }
        })
})

module.exports = router;