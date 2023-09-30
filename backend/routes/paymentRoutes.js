const express =  require ("express");
const router = express.Router();
const { getPaymentToken, brainTreePaymentController } = require('../controllers/PaymentController');
const { isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin } = require("../middleware/AuthMiddleware");




// SIGN UP | GET
router.route("/braintree/token").get(getPaymentToken);

//LOG IN || POST
router.route("/braintree/payment").post(brainTreePaymentController);
// isLoggedInAndCanAccess

module.exports = router;