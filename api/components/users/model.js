const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: Date,
});

const model = mongoose.model('Users', mySchema);
module.exports = model;