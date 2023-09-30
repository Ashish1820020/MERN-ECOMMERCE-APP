const express = require("express");
const router = express.Router();
const { getBanners, addBanners} = require("../controllers/BannerController");
const {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin} = require("../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/banners')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage});
  





// SIGN UP |POST
router.route("/addBanners").post(isLoggedIn, isLoggedInAndAdmin, upload.single('banner'), addBanners);

// TEST ROUTE WITH MIDDLEWARE || GET
router.route("/getBanners").get(getBanners);


module.exports = router;