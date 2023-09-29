const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const address = new Schema({
    addressLine: String,
    city: String,
    state: String,
    zip: String
});

const carrierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    usdot: {
        type: Number,
        required: true
    },
    mc: {
        type: Number,
        required: true
    },
    photo: String,
    level: String,
    phone: String,
    fax: String,
    address: address,
    division: [String],
    operations: [String],
    insuranceRates: {
        basePackage: Number,
        pdRate: Number,
        teamDriverPremium: Number
    }
},
{ timestamps: true, versionKey: false });


const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier