const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const roomModel = require('./../models/room.model');
const roomHelp = require('./../helper/room.help');
const authenticate = require('./../middleware/authenticate');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files/images/room');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
})

var upload = multer({
    storage: storage
});

function imagefilter(req) {
    var state = false;
    for (i = 0; i < 3; i++) {
        if (req[i]) {
            if (req[i].mimetype.split('/')[0] !== 'image') {
                state = true;
            }
        }
    }
    return state;
}

function imageDelete(req) {
    console.log('req on imageDelete>>', req);
    for (i = 0; i < 3; i++) {
        if (req[i]) {
            if (req[i].filename) {
                fs.unlink('./files/images/room/' + req[i].filename, (err, done) => { })
            } else {
                fs.unlink('./files/images/room/' + req[i], (err, done) => { })
            }
        }
    }
}

router.route('/')
    .get((req, res, next) => {
        roomModel.find({})
            .exec((err, rooms) => {
                if (err) {
                    return next(err);
                }
                res.json(rooms);
            })
    })
    .post(authenticate, (req, res, next) => {
        var newRoom = new roomModel({});
        newRoom = roomHelp(req.body, newRoom);
        newRoom.user = req.loggedInUser._id;
        newRoom.save((err, done) => {
            if (err) {
                return next(err);
            }
            res.json(done);
        })
    })

router.route('/search')
    .get((req, res, next) => {
        var condition = {};
        var searchCondition = roomHelp(condition, req.query);
        roomModel.find(searchCondition)
            .exec((err, done) => {
                if (err) {
                    return next(err);
                }
                res.json(done);
            })
    })
    .post((req, res, next) => {
        var condition = {};
        var searchCondition = roomHelp(condition, req.body);
        roomModel.find(searchCondition)
            .exec((err, done) => {
                if (err) {
                    return next(err);
                }
                res.json(done);
            })
    })

router.route('/:id')
    .get((req, res, next) => {
        roomModel.findById(req.params.id)
            .exec((err, room) => {
                if (err) {
                    return next(err);
                }
                res.json(room);
            })
    })
    .delete(authenticate, (req, res, next) => {
        roomModel.findByIdAndDelete(req.params.id)
            .exec((err, removed) => {
                if (err) {
                    return next(err);
                }
                res.json(removed);
            })
    })
    .put(authenticate, upload.array('img', 3), (req, res, next) => {
        roomModel.findById(req.params.id)
            .exec((err, room) => {
                if (err) {
                    return next(err);
                }
                if (room) {
                    var oldImage = [];
                    var image = [];
                    // console.log(req.files);
                    if (req.files) {
                        var fileError = imagefilter(req.files)
                        if (fileError) {
                            imageDelete(req.files);
                            return next({
                                message: 'Invalid File Format'
                            })
                        }
                        for (i = 0; i < 3; i++) {
                            if (req.files) {
                                if (room.image[i])
                                    oldImage[i] = room.image[i];
                            }
                            if (req.files[i])
                                image[i] = req.files[i].filename;
                        }
                    }
                    req.body.image = image;
                    room = roomHelp(req.body, room);
                    room.user = req.loggedInUser._id;
                    room.save((err, updated) => {
                        if (err) {
                            return next(err);
                        }
                        imageDelete(oldImage)
                        res.json(updated);

                    })
                }
            })
    })



module.exports = router;