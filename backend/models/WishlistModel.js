const mongoose = require('mongoose');

const wishlistDataSchema = new mongoose.Schema({
      
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    wishlist: [
        {
          product: {type: mongoose.Schema.Types.ObjectId,  ref: "Product",},
          name: {type: String},
          price: {type: Number},
          amount: {type: Number},
          color: {type: String},
          image: {type: String},
          discount: {type: Number},
          stock: {type: Number},
          rating: {type: Number},
          addedAt: {type: Date}
        }
    ],
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toDateString()
    }
});




module.exports = mongoose.model("Wishlist", wishlistDataSchema);