const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address = new Schema({
    addressLine: String,
    city: String,
    state: String,
    zip: String
});

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ssn_ein: {
        type: String,
        required: true
    },
    license: {
        type: Boolean,
        required: true,
        default: true
    },
    phone: String,
    fax: String,
    address: address
},
{ timestamps: true, versionKey: false });


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer