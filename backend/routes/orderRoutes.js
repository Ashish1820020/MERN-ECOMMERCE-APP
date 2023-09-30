const express = require("express");
const router = express.Router();
const { getUserOrders, getAllOrders, getSingleOrder, updateSingleOrder } = require("../controllers/OrderController");
const {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin, requireSignIn} = require("../middleware/AuthMiddleware");

  

// GET USER ORDERS || GET
router.route("/user-orders").get(isLoggedIn, getUserOrders);

// GET ALL ORDERS || GET
router.route("/all-orders").get(isLoggedInAndAdmin, getAllOrders);

// GET USER DETAILS || GET
router.route("/singleorder/:id").get(getSingleOrder);

// GET USER DETAILS || PUT
router.route("/updateorder/:id").put(updateSingleOrder);

module.exports = router;