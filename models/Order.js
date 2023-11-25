const mongoose = require('mongoose')

const orderListSchema = new mongoose.Schema({

    itemID: {
        type: String,
        required: false
    },
    itemQty: {
        type: Number,
        default: 1,
        required: false
    },

    itemColor: {
        type: String,
        required: false
    },


    itemImgUrl: {
        type: String,
        required: false
    },

    itemName: {
        type: String,
        required: false
    },


    itemPrice: {
        type: String,
        required: false
    },


    itemVariant: {
        type: String,
        required: false
    }

})

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    orderList: {
        type: [orderListSchema],
        required: false
    },
    orderTotal: {
        type: Number,
        required: true

    },
    orderItemsCount: {
        type: Number,
        required: true

    },
    deliveryAddress: {
        type: String,
        required: true

    },
    orderID: {
        type: String,
        required: true

    },
    orderStatus: {
        type: String,
        required: true

    },
    addedOn: {
        type: String,
        required: true,
        immutable: true,
        default: () => { return new Date(Date.now()).toLocaleString('en-IN',{ timeZone: 'Asia/Kolkata'}) }
    }
})

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema, 'Order')