const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/index');

const userModel = require('./../models/user.model');
const userExtraModel = require('./../models/user.extra.model');

const userHelp = require('./../helper/user.help');
const sender = require('./../config/nodemailer.config');
const validation = require('./../middleware/validation');

function prepareEmail(details) {
    return {
        from: 'Room Finder<noreply@abcd.com>',
        to: details.email,
        subject: 'Forgot Password✔',
        text: 'Forgot Password✔',
        html: `<p>Hi <strong>${details.name}</strong><p>
        <p>We noticed that you are having trouble logging into our system, please use the link below to reset the password.</p>
        <p><a href="${details.link}" target="_blank">Reset Password</a></p>
        <p>If you have not requested to reset your password, kindly ignore this message</p>`
    }
}

router.post('/register', validation, (req, res, next) => {
    var user = new userModel;
    /* confirm password and password match */
    // if (req.body.password !== req.body.confirmPassword) {
    //     return next({ message: 'your password does not match' })
    // }
    // /* number validation */
    // if (req.body.phone) {
    //     var numb = /^\(?9\)?(\d{9})$/;
    //     var isValidate = numb.test(req.body.phone);
    //     if (!isValidate) {
    //         return next({ message: 'Check Your Mobile Number Again' })
    //     }

    // }
    // /* username checked */
    // if (req.body.username) {
    //     userModel.findOne({
    //         username: req.body.username
    //     }).exec((err, done) => {
    //         if (err) {
    //             return next(err)
    //         } else {
    //             if (done)
    //                 return next({ message: 'Username is already used' })
    //         }
    //     })
    // }

    // /* email checked */
    // if (req.body.email) {
    //     userModel.findOne({
    //         email: req.body.email
    //     }).exec((err, done) => {
    //         if (err) {
    //             return next(err)
    //         } else {
    //             if (done)
    //                 return next({ message: 'Email address is already used' })
    //         }
    //     })
    // }
    // /* phone checked */
    // if (req.body.phone) {
    //     userModel.findOne({
    //         phone: req.body.phone
    //     }).exec((err, done) => {
    //         if (err) {
    //             return next(err)
    //         } else {
    //             if (done)
    //                 return next({ message: 'Mobile Number is already used' })
    //         }
    //     })
    // }

    user = userHelp(req.body, user);
    /* https://medium.com/@tariqul.islam.rony/sending-email-through-express-js-using-node-and-nodemailer-with-custom-functionality-a999bb7cd13c */
    user.save((err, user) => {
        if (err) {
            return next(err);
        }
        var userExtra = new userExtraModel;
        userExtra._id = user._id;
        userExtra.save((err, done) => {
            if (err) {
                return next(err);
            }
        })
        res.json(user);
    })
})

/* router .post(verify) */

/* router.post('/verify/email',(req,res,next)=>{
    if('email' in req.body){
        let {email} = req.body
        if(email.test()){

            var val = Math.floor(1000 + Math.random() * 9000);
            console.log(val);
            //email valid

            let message = "Your validation toke is "+ val;
            let subject = "Email Valdiation from ...";




        }else{
            res.status(400).json({message:"Please porvide valid mail",success:false})
        }
    }else{
        res.status(400).json({message:"Email is not provide",success:false})
    }
})

//emailed code verfiy
router.post('/') */


router.post('/login', (req, res, next) => {
    userModel.findOne({
        $or: [
            {
                username: req.body.username
            }, {
                email: req.body.username
            }, {
                phone: req.body.username
            }
        ]
    }).exec((err, user) => {
        if (user) {
            console.log('user>>', user);
            var isMatched = bcrypt.compareSync(req.body.password, user.password);
            if (isMatched) {
                var token = jwt.sign({ id: user._id }, config.jwtSecretKey);
                /* var val = Math.floor(1000 + Math.random() * 9000);
console.log(val); */
                res.json({
                    token: token,
                    user: user
                });
            } else {
                return next({
                    message: 'Password did not match'
                })
            }
        } else {
            return next({
                message: 'Username did not matched'
            })
        }
    })
})

router.post('/forgotPassword', (req, res, next) => {
    userModel.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            var resetLink = req.headers.origin + '/auth/reset-password/' + user._id;
            var id = user._id;
            var mailBody = prepareEmail({
                name: user.name,
                email: user.email,
                link: resetLink
            });
            userExtraModel.findById(user._id)
                .exec((err, extra) => {
                    if (err) {
                        return next(err);
                    } if (extra) {
                        extra.passwordResetExpiry = new Date().getTime() + 1000 * 60 * 60 * 24 * 1;
                    }
                    extra.save((err, saved) => {
                        if (err) {
                            return next(err);
                        }
                        console.log('saved', saved);
                    })
                    sender.sendMail(mailBody, (err, done) => {
                        if (err) {
                            return next(err);
                        } else {

                            res.json(done);
                        }
                    })
                })
        }
        else {
            return next({
                message: 'User not registered with provided email'
            })
        }
    })
})

router.post('/resetPassword/:id', (req, res, next) => {
    userModel.findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                return next(err);
            }
            userExtraModel.findById(req.params.id)
                .exec((err, extra) => {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        var resetTime = new Date(extra.passwordResetExpiry).getTime();
                        var now = Date.now();
                        if (resetTime > now) {
                            user.password = bcrypt.hashSync(req.body.password, config.saltRounds);
                            user.passwordResetExpiry = null;
                            user.save((err, done) => {
                                if (err) {
                                    return next(err);
                                }
                                res.json(done);
                            })
                        } else {
                            return next({
                                message: 'Password reset link expired.'
                            })
                        }
                    } else {
                        return next({
                            message: 'User not found'
                        })
                    }
                })

        })
})

module.exports = router;