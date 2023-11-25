const mongoose = require('mongoose')

const cartListSchema = new mongoose.Schema({
    productIDfromDB: {
        type: String,
        required: false
    },
    qty: {
        type: Number,
        default: 1,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    }

})

const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    cart: {
        type: [cartListSchema],
        required: true
    },
    cartTotal: {
        type: Number,
        required: true

    },
    cartItemCount: {
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

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema, 'Cart')