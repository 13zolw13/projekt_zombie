const express = require("express");
const router = express.Router();
const {
    body
} = require('express-validator');

const {
    allZombies,
    createZombie,
    modifyZombie,
    deleteZombie,
    detailZobmie
} = require('../controllers/zombies');
const {
    inventoryZombie,
    addItem,
    deleteItem
} = require('../controllers/items');


router.route('/zombies').get(allZombies).post(body('name').isLength({
    min: 3,
    max: 20
}), createZombie);

router.route('/zombies/:id').get(body('name').isLength({
    min: 3,
    max: 20
}), detailZobmie).patch(modifyZombie).delete(deleteZombie);

router.route('/zombies/:id/items').get(inventoryZombie);

router.route('/zombies/:id/items/:itemId').patch(addItem).delete(deleteItem)

module.exports = router;