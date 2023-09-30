const express =  require ("express");
const router = express.Router();
const {createCategory, getCategories, getOtherFilters} = require('../controllers/CategoryController')



//LOG IN || POST
router.route("/createcategory").post(createCategory);

// SIGN UP |POST
router.route("/categories").get(getCategories);

// SIGN UP |POST
router.route("/companyandcolor").get(getOtherFilters);


module.exports = router;