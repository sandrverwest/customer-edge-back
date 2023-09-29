const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const producerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coiRequests: {
        type: String,
        required: true
    },
    agents: {
        type: [{
            name: String,
            email: String
        }]
    }
},{ timestamps: true, versionKey: false });

const Producer = mongoose.model('Producer', producerSchema);

module.exports = Producer