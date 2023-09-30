require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require("./middleware/errorMiddleware");




// MIDDLEWARES
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(cookieParser());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));


// ACCESS CONTROL SETUPS
// app.use((req, res, next) => {
//     // Access-Control-Allow-Credentials : true
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     next();
// });





// IMPORTING ROUTES
const categoryRoutes = require("./routes/categoryRoutes");
const cartAndWishlistRoutes = require("./routes/cartAndWishlistRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

//  SETUP ROUTES   
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1/user", cartAndWishlistRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/orders", orderRoutes);








app.use(errorMiddleware);

module.exports = app;