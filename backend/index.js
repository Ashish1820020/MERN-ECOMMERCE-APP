const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require("./middleware/errorMiddleware");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/.env" });
  }


// MIDDLEWARES
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));


// app.use(cors({origin: '*', credentials: true}));
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


app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});


app.use(errorMiddleware);



module.exports = app;