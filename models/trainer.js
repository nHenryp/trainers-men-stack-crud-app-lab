const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
    name: String,
    color: String,
    type: String,
    material: String,
    size: Number,
    year: Number
})


const Trainer = mongoose.model('Trainer', trainerSchema)


module.exports =  Trainer