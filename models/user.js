var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists, please sign in'],
        //lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 characters']
    },
    city: {
        type: String,
        required: false
    },
    tagline: {
        type: String,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User