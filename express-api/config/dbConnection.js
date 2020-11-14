const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/roomfinderdb';

mongoose.connect(dbUrl, (err, done) => {
    if (err) {
        console.log('Database Connection Failed');
    } else {
        console.log('Database Connection Successful');
    }
})