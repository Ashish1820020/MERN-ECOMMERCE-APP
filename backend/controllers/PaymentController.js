const OrderData = require("../models/orderModel");
const cartData = require("../models/cartModel");
const braintree = require("braintree");
const { ObjectId } = require("mongodb");
const catchAsyncError = require('../middleware/catchAsyncError');

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MerchantID,
    publicKey: process.env.BRAINTREE_PublicKey,
    privateKey: process.env.BRAINTREE_PrivateKey,
});



const getPaymentToken = catchAsyncError(async (req, res, next) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
    } catch (error) {
      return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});

// Create new Order
const brainTreePaymentController = catchAsyncError(async (req, res, next) => {
    try {
        const { nonce, cartProducts, deliveryAddress } = req.body;
        // console.log(req.body);
        let total = 0;
        const cartProduct = cartProducts.map((elem) => {
          total += elem.price * elem.amount;
          return {
            productId: elem._id, name: elem.name, color: elem.color, count: elem.amount,
            image: elem.image, price: elem.price, stock: elem.stock, discount: elem.discount
          }
        });

        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            }
          },
          async function(error, result) {
            if (result) {
              const order = new OrderData({ orderedItems: cartProduct, payment: result, totalPrice: total,
                                            buyer: new ObjectId(req.body.id), address: deliveryAddress});
              await order.save();
              cartData.findOneAndDelete({user: new ObjectId(req.body.id)});
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        return next(new ErrorHandler("Internal Error Occurred", 500));
      }
});


module.exports = { getPaymentToken, brainTreePaymentController};