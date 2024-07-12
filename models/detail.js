const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        b_group: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    }
);

const Detail = mongoose.model('detail', detailSchema);

module.exports = Detail;