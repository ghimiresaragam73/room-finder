const router = require('express').Router();

const userModel = require('./../models/user.model');
const roomModel = require('./../models/room.model');

router.route('/')
    .get((req, res, next) => {
        roomModel.findById(req.loggedInUser.book)
            .exec((err, bookedRoom) => {
                if (err)
                    return next(err);
                res.send(bookedRoom);
            })
    })
    .delete((req, res, next) => {
        req.loggedInUser.book = null;
        req.loggedInUser.save((err, saved) => {
            if (err)
                return next(err);
            res.send(saved);
        })
    })

router.route('/:id')
    .put((req, res, next) => {
        roomModel.findById(req.params.id)
            .exec((err, done) => {
                if (err)
                    return next(err);
                if (req.loggedInUser.book)
                    return next({ message: 'Already Booked, You can Book Only One Room' });
                req.loggedInUser.book = req.params.id;
                req.loggedInUser.save((err, saved) => {
                    if (err)
                        return next(err);
                    res.send(saved);
                })
            })
    })

module.exports = router;