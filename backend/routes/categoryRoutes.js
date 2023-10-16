const express =  require ("express");
const router = express.Router();
const {createCategory, getCategories, getOtherFilters} = require('../controllers/CategoryController');
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage});


//LOG IN || POST
router.route("/createcategory").post(upload.single('categoryImg'), createCategory);

// SIGN UP |POST
router.route("/categories").get(getCategories);

// SIGN UP |POST
router.route("/companyandcolor").get(getOtherFilters);


module.exports = router;