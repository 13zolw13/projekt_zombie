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

    });


    const jobNBP = schedule.scheduleJob('46 7 * * 1-5', async function () {

        getExchangeRates();

    });
}


module.exports = {
    scheduleJobs
}