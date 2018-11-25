const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);

const shoppingItemSchema = mongoose.Schema({

    itemName: {
        type: String,
        required: true
    },

    itemQuantity: {
        type: Number,
        required: true
    },

    itemBought: {
        type: Boolean,
        required: true
    },

});

const Item = module.exports = mongoose.model('Item', shoppingItemSchema);
