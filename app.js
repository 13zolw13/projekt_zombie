require('dotenv').config();
const express = require('express');
const app = express();


const connectDB = require('./db/connect');
app.use(express.static('./public'));
app.use(express.json());

const CurrentPrice = require('./model/currentPrice');

const zombieRoutes = require('./routes/main');
const {
    getExchangeRates,
    getPrice
} = require('./events')
const {
    scheduleJobs
} = require('./schedule/schedule')
require('express-async-errors')

const port = process.env.PORT || 3000;

app.use('/api/v1/', zombieRoutes);



app.all('*', async (req, res, next) => {
    throw new Error('Page not found');
});




const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI)
        // connect DB



        app.listen(port,
            console.log(`Listening on port ${port}`));


        const currentPrices = await CurrentPrice.find({});
        if (currentPrices[0]) {
            let timestamp = currentPrices[0].UpdatedTimestamp;
            const today1 = new Date(Date.now());

            const today = today1.getDate();

            const date = new Date(timestamp);
            const updateDate = date.getDate();

            if (updateDate !== today) {
                getPrice();
            }
        }


        if (!currentPrices[0]) {
            getPrice();
        }
    } catch (error) {
        console.log(error)
    }
}

start();
scheduleJobs()
module.exports = app;