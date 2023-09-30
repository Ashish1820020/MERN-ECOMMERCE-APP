const mongoose = require('mongoose');

const cartDataSchema = new mongoose.Schema({
      
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
          product: {type: mongoose.Schema.Types.ObjectId,  ref: "Product",},
          name: {type: String},
          price: {type: Number, default: 0},
          amount: {type: Number, default: 0},
          color: {type: String, default: "#FFFFFF"},
          image: {type: String},
          discount: {type: Number},
          stock: {type: Number},
          rating: {type: Number},
          addedAt: {type: Date, default: Date.now()}
        }
        // {}
    ],
    cartTotal: {type: Number},
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toDateString()
    }
});

module.exports = mongoose.model("CartData", cartDataSchema);