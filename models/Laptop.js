const mongoose = require('mongoose')

const laptopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    },
    vid: {
        type: String,
        required: true
    },
    desc:  {
        type: String,
        required: true
    },
    specs: {
        type: {
            screenSize: String,
            ram: String,
            rom: String,
            network: String,
            camera: String,
            weight: String,
            battery: String,
            os: String,
            soc: String
        },
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    addedOn: {
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN') }
    }
})

module.exports = mongoose.models.Laptop || mongoose.model('Laptop', laptopSchema, 'Laptop')