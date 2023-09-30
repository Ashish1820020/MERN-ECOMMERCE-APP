const OrderData = require("../models/orderModel");
const UserData = require("../models/userdataModel");
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require("../utile/ErrorHandler");
const Product = require("../models/productModel");


/// GET USER ORDERS ->  USER
const getUserOrders = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
      const userOrders = await OrderData.find({buyer: userId});
      
      res.status(201).json({ success: true, userOrders });

  } catch (error) {
      res.status(401).json({ success: false, msg: "Error Occurred", error });    
  }
});


// GET ALL ORDERS ->  ADMIN
const getAllOrders = catchAsyncError(async (req, res, next) => {
  try {
      const allOrders = await OrderData.find({});

      res.status(201).json({ success: true, allOrders });
      
  } catch (error) {
      // console.log(error);
      res.status(401).json({ success: false, msg: "Error Occurred", error });    
  }
});


// GET ORDER DATA -> ADMIN
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  try {
      const {id} = req.params;
      
      const singleOrderData = await OrderData.findById(id);
      res.status(201).json({ success: true, singleOrderData });

  } catch (error) {
      // console.log(error);
      res.status(401).json({ success: false, msg: "Error Occurred" });    
  }
})


// UPDATE ORDER STATUS ->  ADMIN
const updateSingleOrder = catchAsyncError(async (req, res, next) => {
  try {
      const {id} = req.params;
      const {status} = req.body;

      
      const order = await OrderData.findById(id);


      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }
      
      if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
      }
      
      // console.log(order);

      if (status === "Shipped") {
        order.orderedItems.forEach(async (o) => {
          await updateStock(o.productId, o.count);
        });
      }

      order.orderStatus = status;

      if (status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });

      res.status(201).json({ success: true, msg: "Order Status updated Successfully", order });

      // await OrderData.findByIdAndUpdate(id, {orderStatus: status});
      // const singleOrderData = await OrderData.findById(id);

      // if(status === "delivered"){
      //    const { orderedItems } = singleOrderData;

      //    orderedItems.forEach(async (element) => {
      //     const productId = element.productId.toString();
          
      //     const product = await Product.findByIdAndUpdate(productId);
      //     const newStock = product.stock - element.count;

      //     await Product.findByIdAndUpdate(productId, { stock: newStock });
      //    });
      // }

  } catch (error) {
      // console.log(error);
      res.status(401).json({ success: false, msg: "Error Occurred", error });    
  }
});

  async function updateStock(id, quantity) {
    // console.log(id, quantity);
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
  }



module.exports = { getUserOrders, getAllOrders, getSingleOrder, updateSingleOrder };