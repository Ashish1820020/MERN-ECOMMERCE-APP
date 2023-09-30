const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
    },

    category: {
            type: mongoose.ObjectId,
            ref: "Categorie",
            required: [true, "Category is required"]
    },

    company: {
        type: String,
        required: [true, "Company name is required"],
    },
    
    price:{
        type: Number,
        required: [true, "Price is required"],
    },

    discountedPrice:{
        type: Number,
        required: true,
    },

    rating: {
        type: Number,
        default: 4,
    },

    warranty: {
        type: String,
        default: '1 year',
    },

    colors: {
        type: Array,
        default: [
            "#ffffff",
            "#000000",
        ],
        required: true
    },

    description: {
        type: String,
        required: [true, "Item Description is required"],
    },

    bulletHighlights: {
        type: Array,
        required: true,
    },

    createdAt:{
        type: Date,
        default: new Date(Date.now()).toDateString(),
    },

    discount: {
        type: Number,
        required: [true,  "Discount is required"]
    },

    images: {
        type: Array,
        default: []
    },
    
    stock: {
        type: Number,
        default: 5,
    },

    featured:{
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Product", productSchema)