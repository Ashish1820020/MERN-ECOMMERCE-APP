const express = require("express");
const router = express.Router();
const {getProducts, getSearchBarResult, getSingleProduct, postProducts, updateProducts, deleteProduct} = require("../controllers/productController")
const {isLoggedIn, isLoggedInAndAdmin} = require("../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() +file.originalname)
    }
})


const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
        cb(null, true) 
    } else { 
        cb(null, false)
    }

}
const upload = multer({storage, fileFilter: imageFilter});

// GET PRODUCTS || GET
router.route("/productlist").get(getProducts);


// GET SINGLE PRODUCT || GET
router.route("/searchresult").get(getSearchBarResult);

// GET SINGLE PRODUCT || GET
router.route("/productlist/:productId").get(getSingleProduct);

// POST PRODUCT || POST
router.route("/addproduct").post(isLoggedInAndAdmin, upload.array('newProductImages', 4), postProducts);

// POST PRODUCT || PUT
router.route("/updateproduct").put(isLoggedInAndAdmin, upload.array('productImages', 4), updateProducts);

// POST PRODUCT || POST
router.route("/deleteproduct/:productId").delete(isLoggedInAndAdmin, deleteProduct);


module.exports = router;