const mongoose = require('mongoose');

const exchangeRatesSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('ExchangeRates', exchangeRatesSchema);