const BannerData = require("../models/BannerModel")
const fs = require("fs");
const path = require("path");






// <---------UPDATE PROFILE DATA ------------->
const addBanners = async (req, res) => {
    
    try {

        const {bannerHeader, bannerText} = req.body;

        console.log( req.body);
        
        const newBanner = {
            data: fs.readFileSync(path.join(__dirname , "../uploads/banners/" , req.file.filename)),
            contentType: "image/png",
        }

        const bannersData = new BannerData({bannerImages: newBanner, bannerHeader, bannerText});
        await bannersData.save();
        
        
        // const newBanner = new BannerData(queryObj);
        // newBanner.save();
        res.status(201).json({
            success: true,
            msg: "new Banner is added",
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            msg: "Error Occurred",
            error
        });    
    }
}


const getBanners = async (req, res) => {
    try {
        const banners = await BannerData.find({});
        // console.log(banners);
        res.status(201).json({
            success: true,
            banners,
        });
    }  catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            msg: "Error Occurred",
            error
        });    
    }
}




module.exports = {addBanners, getBanners};