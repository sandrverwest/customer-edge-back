const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelSchema = new Schema({
    level: {
        type: String,
        required: true
    },
    driverEligibility: {
        type: [String],
        required: true
    },
    unacceptableDrivingRecords: {
        type: [String],
        required: true
    },
    requiredQuote: {
        type: Boolean,
        required: true
    },
    documentsForQuote: {
        type: [String],
        required: true
    },
    clearance: {
        type: String,
        required: true
    }
},{ timestamps: true, versionKey: false });

const Level = mongoose.model('level', levelSchema);

module.exports = Level