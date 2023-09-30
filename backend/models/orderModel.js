const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderedItems: [{
            productId: {type: mongoose.Schema.ObjectId, ref: "Product"},
            name: {type: String},
            image: {type: String},
            count: {type: Number},
            price: {type: Number},
            color: {type: String, default: "FFFFFF"},
            status: {type: String, default: "Processing"}
    }],
    address: {type: Object},
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing", "Dispatched", "Cancelled", "Delivered"],
    },
    paymentInfo: {
        id: {type: String},
        status: {type: String},
        COD: {type: Boolean,  default: false}
    },
    totalPrice: {
        type: Number, 
        default: 0
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toDateString(),
    },
});

module.exports = mongoose.model("Order", orderSchema);