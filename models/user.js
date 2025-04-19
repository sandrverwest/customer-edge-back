const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    photo: String,
    phone: String,
    extension: String,
    department: String,
    position: String,
    role: String,
    isDeactivated: {
        type: Boolean,
        required: true,
        default: false
    }
},{ timestamps: true, versionKey: false });


userSchema.methods.setPassword = function (password) {
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }
        console.log('Hashed password stored:', hash);
        this.hash = hash;
        this.save();
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User