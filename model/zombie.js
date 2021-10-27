const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    id: {
        type: Number,
        required: [true, 'name is required']
    }

})

const zombieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    items: [itemSchema]

})


module.exports = mongoose.model('Zombie', zombieSchema);

// TODO VALIDATION 
// zombieSchema.path('items').validate(function(){
//     if(items.length>5) {return false;}else
//     return true;