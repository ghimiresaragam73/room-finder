const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const roomModel = require('./../models/room.model');
const roomHelp = require('./../helper/roomHelp');
const { exit } = require('process');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files/images/room');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
        console.log('req.log>>>',file);
    }
})


var upload = multer({
    storage: storage
});

function imageFilter(req) {
    console.log('req', req);
    for (i = 0; i < 3; i++) {
        if (req[i].mimetype.split('/')[0] !== 'image')
            return true;
    }
}

function imageDelete(req) {
    fs.unlink('./files/images/room/' + req, (err, done) => {
        if (err) {
            console.log('Image removing failed', err);
        } else {
            console.log('Image Remving Success');
        }
    })
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
    .post(upload.array('img', 3), (req, res, next) => {
        var newRoom = new roomModel({});
        newRoom = roomHelp(req.body, newRoom);
        newRoom.user = req.loggedInUser._id;
        for (i = 0; i < 3; i++) {
            if (req.files[i])
                newRoom.image[i] = req.files[i].filename;
        }
        newRoom.save((err, room) => {
            if (err) {
                return next(err);
            }
            res.json(room);
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
    .delete((req, res, next) => {
        roomModel.findByIdAndDelete(req.params.id)
            .exec((err, removed) => {
                if (err) {
                    return next(err);
                }
                res.json(removed);
            })
    })
    .put(upload.array('img', 3), (req, res, next) => {
        console.log('Hahhahaha');
       var fileError = imageFilter(req.files)
        if (fileError) {
            for (i = 0; i < 3; i++) {
                if (req.files[i])
                    imageDelete(req.files[i].filename);
            }
            return next({
                message: "Invalid File Format"
            })
        }
        roomModel.findById(req.params.id)
            .exec((err, room) => {
                if (err) {
                    return next(err);
                }
                if (room) {
                    console.log('req.files>>>>', req.files);
                    var image = [];
                    var oldImage = [];
                    for (i = 0; i < 3; i++) {
                        if (req.files) {
                            if (req.files[i]) {
                                if (room.image[i]) {
                                    oldImage[i] = room.image[i];
                                }
                                image[i] = req.files[i].filename;
                            }
                        }
                    }
                    req.body.image = image;
                    room = roomHelp(req.body, room)
                    room.user = req.loggedInUser._id;
                    console.log('room.image>>>', room.image);
                    room.save((err, updated) => {
                        if (err) {
                            return next(err);
                        }
                        console.log('aayooo');
                        for (i = 0; i < 3; i++) {
                            if (oldImage[i])
                                imageDelete(oldImage[i]);
                        }
                        res.json(updated);
                    })
                }
            })
    })

module.exports = router;