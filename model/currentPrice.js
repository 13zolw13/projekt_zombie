const mongoose = require('mongoose');

const currentPriceSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    UpdatedTimestamp: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model('CurrentPrice', currentPriceSchema);