const UserData = require("../models/userdataModel");
const CartData = require("../models/cartModel");
const WishlistData = require("../models/WishlistModel");
const { ObjectId } = require("mongodb");
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require("../utile/ErrorHandler");


const getDiscountedPrice = (price, discount)=>{
    console.log(price, discount);
    console.log(price - Math.ceil(((price*discount)/100)));
    return (price - Math.ceil(((price*discount)/100)))
  }
  


// // <----ADD PRODUCTS TO CART---->

// const addToCart = catchAsyncError(async (req, res, next) => {
    
//     try {
        
//         const productDetails = req.body;
//         const {id} = req.params;
        
//         if(!productDetails){
//             return res.status(401).json({
//                 msg: "productDetails is required!"
//             })
//         }

//         let products = [];
//         let cartTotal = 0;
//         let updatedData;

//         // finding user details
//         const userDetails = await UserData.findById({_id: id});

//         // finding cart os the user
//         const cartExists = await CartData.findOne({user: userDetails._id});


//         // Not a new user
//         if(cartExists){ 
//             let repeatedProduct = cartExists.products.find((currentElement) => {
//                 return currentElement.product.equals(productDetails.product) && currentElement.color === productDetails.color;
//             });

//             if(repeatedProduct){

//                 products = cartExists.products.map((currentElement) => {
//                     if(repeatedProduct._id === currentElement._id){
//                         const newCount = currentElement.count + productDetails.count;
//                         const newElement = {
//                             product: currentElement.product,
//                             name: currentElement.name,
//                             count: newCount,
//                             color: currentElement.color,
//                             price: currentElement.price,
//                             image: currentElement.image,
//                             discount: 9,
//                             stock: 5,
//                             addedAt: currentElement.addedAt,
//                             _id: currentElement._id
//                         }
//                         return newElement
//                     }
//                     else{
//                         return currentElement
//                     }
//                 });
//             } else{
//                 products = [...cartExists.products, {...productDetails, product: new ObjectId(productDetails.product)}];
//             }
//             cartTotal = cartExists.cartTotal + (getDiscountedPrice(productDetails.price, productDetails.discount) * productDetails.count);
//             await CartData.findByIdAndUpdate(cartExists._id, {products, cartTotal});
//             updatedData  =  await CartData.findById(cartExists._id)
 
//         }else{
//             products.push(productDetails); 
//             cartTotal = getDiscountedPrice(productDetails.price, productDetails.discount) * productDetails.count;
//             updatedData = new CartData({user: userDetails._id, products, cartTotal});
//             await updatedData.save();
//         }
//         res.status(200).json({msg: "New Product Added to the Cart Successfully" , products: updatedData.products, cartTotal: updatedData.cartTotal});

//     } catch (error) {
//         return next(new ErrorHandler("Internal Error Occurred", 500));
//     }
// });





// // <----REMOVING ITEMS FROM CART---->

// const removeFromCart = catchAsyncError(async (req, res, next) => {
    
//     try {
//         const {productId, color} = req.body;
//         const {id} = req.params;
//         console.log(req.body);
//         if(!id){
//             return res.status(401).json({
//                 msg: "Id is required!"
//             })
//         }
//         if(!productId){
//             return res.status(401).json({
//                 msg: "productId is required!"
//             })
//         }

//         let products = [];
//         let cartTotal = 0;
//         let updatedData;
//         const user = await UserData.findById({_id: id});


//         const userCart = await CartData.findOne({user: user._id});
//         cartTotal = userCart.cartTotal;


//         products = userCart.products.filter((currentProductDetails) => {
//             if(currentProductDetails.product.equals(productId) && currentProductDetails.color === color){
//                 cartTotal -= (getDiscountedPrice(currentProductDetails.price, currentProductDetails.discount) * currentProductDetails.count);  
//             }
//             else{
//                 return currentProductDetails;
//             }
                
//         });
//         let a = await CartData.findByIdAndUpdate(userCart._id, {products, cartTotal});
//         updatedData  = await CartData.findById(userCart._id);

//         res.status(200).json({msg: "Product Removed from the Cart Successfully" , products: updatedData.products, cartTotal: updatedData.cartTotal});

//     } catch (error) {
//         console.log(error);
//         return next(new ErrorHandler("Internal Error Occurred", 500));
//     }
// });




// <----GET CART DATA BY USER ID---->

const getCartAndWishlistData = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        let queryObj = {};

        const userCart = await CartData.findOne({user: userId});
        const userWishlist = await WishlistData.findOne({user: userId});

        console.log(userWishlist);
        
        if(userCart){
            queryObj.userCart = userCart.products;
            queryObj.cartTotal = userCart.cartTotal;
        }else{
            queryObj.userCart = [];
            queryObj.cartTotal = 0;
        }
        if(userWishlist){
            queryObj.userWishlist = userWishlist.wishlist;
        }else{
            queryObj.userWishlist = [];
        }
        return res.status(200).json({success: true, msg: "Got cart and Wishlist" , ...queryObj});
        
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});




// <----UPDATE PRODUCT DATA IN CART---->

const updateProduct = catchAsyncError(async (req, res, next) => {
    try{

        const userId = req.user._id;
        
        const {cartProducts, wishlistProducts} = req.body;
        let cartTotal = 0;
        let updatedCartData = [];
        let updatedWishlistData = [];
        
        if(cartProducts.length>0){
            updatedCartData = cartProducts.map((currentElement) => {
                cartTotal += (getDiscountedPrice(currentElement.price, currentElement.discount) * currentElement.amount);
                return {
                    product: new ObjectId(currentElement._id),
                    name: currentElement.name,
                    color: currentElement.color,
                    amount: currentElement.amount,
                    image: currentElement.image,
                    price: currentElement.price,
                    stock: currentElement.stock,
                    discount: currentElement.discount,
                    rating: currentElement.rating
                }
            });
        }
        
        if(wishlistProducts.length>0){
            updatedWishlistData = wishlistProducts.map((currentElement) => {
                return {
                    product: new ObjectId(currentElement._id),
                    name: currentElement.name,
                    color: currentElement.color,
                    amount: currentElement.amount,
                    image: currentElement.image,
                    price: currentElement.price,
                    stock: currentElement.stock,
                    discount: currentElement.discount,
                    rating: currentElement.rating
                }
            });
        }

        console.log('====================================');
        console.log(userId);
        console.log('====================================');
        
        
        const currentUserCart = await CartData.findOne({user: userId});
        const currentUserWishlist = await WishlistData.findOne({user: userId});


        // updating cart data to db
        if(currentUserCart){
            await CartData.findByIdAndUpdate(currentUserCart._id, {products: updatedCartData, cartTotal});
        }else{
            const updatedData = new CartData({user: userId, products: updatedCartData, cartTotal});
            await updatedData.save();
        }
        
        // updating wishlist data to db
        if(currentUserWishlist){
            await WishlistData.findByIdAndUpdate(currentUserWishlist._id, {wishlist: updatedWishlistData});
        }else{
            const updatedData = new WishlistData({user: userId, wishlist: updatedWishlistData});
            await updatedData.save();
        }
        res.status(200).json({success: true, msg: "Products updated to the Cart and wishlist Successfully"});
        
    }catch (error){
        console.log(error);
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});




module.exports = { getCartAndWishlistData, updateProduct};
