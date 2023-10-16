const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},

categoryImg: {
    type: String
},

createdAt: {
    type: Date,
    default: new Date(Date.now()).toDateString()
}
});

module.exports = mongoose.model("Categoie", categorySchema)