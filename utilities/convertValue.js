function currencyExchange(arrayOfCurrentPrices, exchanegrate) {
    const sumPLN = arrayOfCurrentPrices.reduce((a, b) => a + b);
    const sumUSD = Number(Math.fround(sumPLN / exchanegrate[0].price).toFixed(2));
    const sumUEUR = Number(Math.fround(sumPLN / exchanegrate[1].price).toFixed(2));
    const inventoryPrice = [{
        PLN: sumPLN
    }, {
        USD: sumUSD
    }, {
        EUR: sumUEUR
    }]
    return inventoryPrice;
}

module.exports = {
    currencyExchange
}