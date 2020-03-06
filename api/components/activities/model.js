const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    byIp: {
        type: String,
        required: true
    },
    datetime: Date,
});

const model = mongoose.model('Activities', mySchema);
module.exports = model;