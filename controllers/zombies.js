const Zombie = require('../model/zombie')
const {
    body,
    validationResult
} = require('express-validator');
require('express-async-errors');

const allZombies = async (req, res) => {

    const zombies = await Zombie.find({}).select(' -_id ');
    if (!zombies) throw new Error('This zombie dosen`t exist');
    res.status(200).json({
        zombies
    });
}
const createZombie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    } else {
        const {
            name
        } = req.body;
       
        
            const zombie = await Zombie.create({
                name: name
            });
            // const zombie = { name: 'Zombie1', creationDate: 'tomorow' };

       return     res.status(201).json({
                zombie,
                msg: 'Success, zombie created!'
            });
        }
    }


const modifyZombie = async (req, res) => {
    const {
        id: zombieId
    } = req.params;


    const {
        name: Newname
    } = req.body; // ToDo adding some other properties
    // ToDo adding timestamp change by

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    if (!zombie) throw new Error('This zombie dosen`t exist');
    const zombie = await Zombie.findOneAndUpdate({
        _id: zombieId
    }, req.body);
    await zombie.save();
    res.status(201).json({
        zombie
    })
}

const deleteZombie = async (req, res) => {
    const {
        id: zombieId
    } = req.params;
    // console.log(zombieId);
    const zombie = await Zombie.findOneAndDelete({
        id: zombieId
    });
    if (!zombie) throw new Error('This zombie dosen`t exist');

    res.status(200).json({zombie, msg:'Success, zombie deleted!'});
}

const detailZobmie = async (req, res) => {
    const {
        id: zombieId
    } = req.params;
    console.log(zombieId);

    const zombie = await Zombie.findById(zombieId).select(' name , createdAt');
    if (!zombie) throw new Error('This zombie dosen`t exist');
    res.status(200).json({
        zombie
    });
}


module.exports = {
    allZombies,
    createZombie,
    modifyZombie,
    deleteZombie,
    detailZobmie,
}