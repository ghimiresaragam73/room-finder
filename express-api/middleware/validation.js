const userModel = require('./../models/user.model');

module.exports = (req, res, next) => {
    /* confirm password and password match */
    if (req.body.password !== req.body.confirmPassword) {
        return next({ message: 'your password does not match' })
    }
    /* number validation */
    if (req.body.phone) {
        var numb = /^\(?9\)?(\d{9})$/;
        var isValidate = numb.test(req.body.phone);
        if (!isValidate) {
            return next({ message: 'Check Your Mobile Number Again' })
        }

    }

    /* email validation */
    if(req.body.email){
        var email =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        var isValidate = email.test(req.body.email);
        if(!isValidate)
        return next({message:'Wrong Email Address, Try Again'})
    }
    
    /* username checked */
    if (req.body.username) {
        userModel.findOne({
            username: req.body.username
        }).exec((err, done) => {
            if (err) {
                return next(err)
            } else {
                if (done)
                    return next({ message: 'Username is already used' })
            }
        })
    }

    /* email checked */
    if (req.body.email) {
        userModel.findOne({
            email: req.body.email
        }).exec((err, done) => {
            if (err) {
                return next(err)
            } else {
                if (done)
                    return next({ message: 'Email address is already used' })
            }
        })
    }
    /* phone checked */
    if (req.body.phone) {
        userModel.findOne({
            phone: req.body.phone
        }).exec((err, done) => {
            if (err) {
                return next(err)
            } else {
                if (done)
                    return next({ message: 'Mobile Number is already used' })
            }
        })
    }
    next();
}