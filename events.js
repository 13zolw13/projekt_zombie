const axios = require('axios');
const CurrentPrice = require('./model/currentPrice');
const ExchangeRates = require('./model/exchangeRates');

const getPrice = async function () {
    try {
        let response;

        response = await axios.get('https://zombie-items-api.herokuapp.com/api/items');
        const {
            items,
            timestamp
        } = response.data;
        CurrentPrice.deleteMany({}) //Nasty idea for now TODO two cases   if empty model create  if not update/replace 
        for (let i of items) {
            await CurrentPrice.create({
                id: i.id,
                name: i.name,
                price: i.price,
                UpdatedTimestamp: timestamp
            })
        }


    } catch (error) {
        console.error(error);
    }
}






const getExchangeRates = async function () {
    try {
        const response = await axios.get('http://api.nbp.pl/api/exchangerates/tables/C/today/?form=json');

        for (let rate of response.data[0].rates) {
            if (rate.code === 'USD') {
                console.log(rate);
                let ratesUSD = await ExchangeRates.findOne({
                    code: 'USD'
                })

                if (ratesUSD) {
                    ratesUSD.price = rate.ask;
                    await ratesUSD.save();
                } else

                {
                    await ExchangeRates.create({
                        code: rate.code,
                        price: rate.ask
                    });
                }
            }
            if (rate.code === 'EUR') {
                console.log(rate);
                let ratesEUR = await ExchangeRates.findOne({
                    code: 'EUR'
                })

                if (ratesEUR) {

                    ratesEUR.price = rate.ask
                    await ratesEUR.save()
                } else

                {
                    await ExchangeRates.create({
                        code: rate.code,
                        price: rate.ask
                    });
                }
            }
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getExchangeRates,
    getPrice
}