const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    cid: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    ssn_ein: {
        type: String,
        required: true
    },
    businessName: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    status: {
        type: String,
        required: true,
        default: 'hiring'
    }
},{ timestamps: true, versionKey: false });

const Contractor = mongoose.model('contractor', contractorSchema);

module.exports = Contractor