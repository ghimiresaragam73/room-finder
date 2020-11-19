const bcrypt = require('bcrypt');
const config = require('./../config/index');

module.exports = (req, user) => {
    if (req.name)
        user.name = req.name;
    if (req.username)
        user.username = req.username;
    if (req.password)
        user.password = bcrypt.hashSync(req.password, config.saltRounds);
    if (req.email)
        user.email = req.email;
    if (req.phone)
        user.phone = req.phone;
    if (req.dob)
        user.dob = req.dob;
    if (req.gender)
        user.gender = req.gender;
    if (req.role)
        user.role = req.role;
    return user;
}