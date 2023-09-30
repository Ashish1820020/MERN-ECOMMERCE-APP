const express =  require ("express");
const router = express.Router();
const { getCartAndWishlistData, updateProduct} = require('../controllers/CartAndWishlistController');
const {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin} = require("../middleware/AuthMiddleware");



//LOG IN || POST
// router.route("/addtocart/:id").patch(isLoggedIn, addToCart);

// //LOG IN || PATCH
// router.route("/removefromcart/:id").patch(isLoggedIn, removeFromCart);

//LOG IN || PATCH
router.route("/updateproduct").patch(isLoggedIn, updateProduct);

// SIGN UP | GET
router.route("/getcartandwishlist").get(isLoggedIn, getCartAndWishlistData);


module.exports = router;