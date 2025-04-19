const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    ssn_ein: {
        type: String,
        required: true
    },
    equipmentType: String,
    ownershipType: String,
    unitNumber: String,
    vin: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    value: Number,
    cl: {
        type: String,
        required: true,
        default: 'inactive'
    },
    pd: {
        type: String,
        required: true,
        default: 'inactive'
    },
    ntl: {
        type: String,
        required: true,
        default: 'inactive'
    },
    status: {
        type: String,
        required: true,
        default: 'hiring'
    }
},{ timestamps: true, versionKey: false });

const Equipment = mongoose.model('equipment', equipmentSchema);

module.exports = Equipment