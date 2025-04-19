const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coverageLineSchema = new Schema({
    coverageLineName: String,
    coverageLineCarrier: String,
    coverageLineExpirationDate: Date,
    coverageLinePolicyNumber: String,
});

const coverageSchema = new Schema({
    producerID: String,
    carrierID: String,
    coverageLines: [coverageLineSchema],
    isPrimary: Boolean,
    primaryPolicyType: String,
    notes: String
}, { timestamps: true, versionKey: false });

const Coverage = mongoose.model('Coverage', coverageSchema);

module.exports = Coverage;