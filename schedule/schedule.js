const schedule = require('node-schedule');
const {
    getExchangeRates,
    getPrice
} = require('../events')

const rule = new schedule.RecurrenceRule();
rule.minute = 1;
rule.hour = 0;
rule.tz = 'Etc/UTC';

const scheduleJobs = async function () {

    const job = schedule.scheduleJob(rule, async function () {

        getPrice();
        // console.log('A new day has begun in the UTC timezone!');
    });


    const jobNBP = schedule.scheduleJob('46 7 * * 1-5', async function () {
        // console.log('The answer to life, the universe, and everything!');
        getExchangeRates();

    });
}


module.exports = {
    scheduleJobs
}