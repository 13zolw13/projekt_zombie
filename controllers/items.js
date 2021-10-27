const Zombie = require('../model/zombie')
const exchangeRates = require('../model/exchangeRates');
const CurrentPrice = require('../model/currentPrice');
const {
    exchanegrate
} = require('../utilities/exchangerate');
const {
    currencyExchange
} = require('../utilities/convertValue');
const inventoryZombie = async (req, res) => {
    const {
        id: zombieId
    } = req.params;
    let arrayOfCurrentPrices = [];
    let inventoryPrice = 0;
    const zombie = await Zombie.findById(zombieId).select(" name , items ");
    console.log(zombie)
    const exchanegrate = await exchangeRates.find({});
if (!zombie) throw new Error('This zombie dosen`t exist');
    if (zombie.items.length > 0) {
        for (let item of zombie.items) {
            let price = await CurrentPrice.findOne({
                id: item.id
            }).select(' price ');

            arrayOfCurrentPrices.push(price.price)
        }


inventoryPrice = currencyExchange(arrayOfCurrentPrices, exchanegrate)
       
    }
    
    res.json({
        zombie,
        inventoryPrice
    })

}


const addItem = async (req, res) => {
    const {
        name: itemName
    } = req.body;
    const {
        id: zombieId,
        itemId
    } = req.params;

    // TODO  ADD VALIDATION ITEM FROM THE LIST;
    const zombie = await Zombie.findById(zombieId);
    if (zombie.items.length > 5) {
        throw Error('To many items in inventory');

    }
    zombie.items.push({
        id: itemId,
        name: itemName
    });
    zombie.save()
    console.log(zombie);
    res.json({
        zombie,
        inventory: zombie.items.length
    })

}

const deleteItem = async (req, res) => {
    let underScoreItemId;
    const {
        id: zombieId,
        itemId
    } = req.params;
    console.log(itemId)

    const zombie = await Zombie.findById(zombieId);
    if (!zombie) throw new Error('This zombie dosen`t exist');
    for (let item of zombie.items) {

        if (item.id == itemId) {
            underScoreItemId = item._id;

        }
    }


    const updatedZombie = await Zombie.findOneAndUpdate({
        _id: zombieId
    }, {
        $pull: {
            items: {
                _id: underScoreItemId
            }
        }
    });


    // console.log(zombie)

    res.json({
        zombie: updatedZombie
    });

}



module.exports = {
    inventoryZombie,
    addItem,
    deleteItem
}