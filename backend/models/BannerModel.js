const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  bannerImages: { data: Buffer, contentType: String },
  bannerHeader: {type: String},
  bannerText: {type: String}
});


module.exports = mongoose.model("Banner", BannerSchema);