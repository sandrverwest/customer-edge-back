const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coverage = new Schema({
    coverageName: String,
    producerID: String,
    carrierID: String,
    notes: String,
    expiration: Date,
}, { timestamps: true, versionKey: false });


const Coverage = mongoose.model('Coverage', coverage);

module.exports = Coverage