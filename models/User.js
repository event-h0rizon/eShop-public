const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    deliveryAddress:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    accountCreatedOn:{
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN') }
    }

}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', userSchema, 'User')