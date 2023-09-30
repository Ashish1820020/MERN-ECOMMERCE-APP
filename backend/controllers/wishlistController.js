const UserData = require("../models/userdataModel");
const WishlistData = require("../models/WishlistModel");
const { ObjectId } = require("mongodb");
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require("../utile/ErrorHandler");


const getDiscountedPrice = (price, discount)=>{
    console.log(price, discount);
    console.log(price - Math.ceil(((price*discount)/100)));
    return (price - Math.ceil(((price*discount)/100)))
  }
  


// <----ADD wishlist TO CART---->

const addToWishlist = catchAsyncError(async (req, res, next) => {
    
    // try {
        
    //     const productDetails = req.body;
    //     const {id} = req.params;
        
    //     if(!productDetails){
    //         return res.status(401).json({
    //             msg: "productDetails is required!"
    //         })
    //     }

    //     let wishlist = [];
    //     let cartTotal = 0;
    //     let updatedData;

    //     // finding user details
    //     const userDetails = await UserData.findById({_id: id});

    //     // finding cart os the user
    //     const cartExists = await WishlistData.findOne({user: userDetails._id});


    //     // Not a new user
    //     if(cartExists){ 
    //         let repeatedProduct = cartExists.wishlist.find((currentElement) => {
    //             return currentElement.product.equals(productDetails.product) && currentElement.color === productDetails.color;
    //         });

    //         if(repeatedProduct){

    //             wishlist = cartExists.wishlist.map((currentElement) => {
    //                 if(repeatedProduct._id === currentElement._id){
    //                     const newCount = currentElement.count + productDetails.count;
    //                     const newElement = {
    //                         product: currentElement.product,
    //                         name: currentElement.name,
    //                         count: newCount,
    //                         color: currentElement.color,
    //                         price: currentElement.price,
    //                         image: currentElement.image,
    //                         discount: 9,
    //                         stock: 5,
    //                         addedAt: currentElement.addedAt,
    //                         _id: currentElement._id
    //                     }
    //                     return newElement
    //                 }
    //                 else{
    //                     return currentElement
    //                 }
    //             });
    //         } else{
    //             wishlist = [...cartExists.wishlist, {...productDetails, product: new ObjectId(productDetails.product)}];
    //         }
    //         cartTotal = cartExists.cartTotal + (getDiscountedPrice(productDetails.price, productDetails.discount) * productDetails.count);
    //         await WishlistData.findByIdAndUpdate(cartExists._id, {wishlist, cartTotal});
    //         updatedData  =  await WishlistData.findById(cartExists._id)
 
    //     }else{
    //         wishlist.push(productDetails); 
    //         cartTotal = getDiscountedPrice(productDetails.price, productDetails.discount) * productDetails.count;
    //         updatedData = new WishlistData({user: userDetails._id, wishlist, cartTotal});
    //         await updatedData.save();
    //     }
    //     res.status(200).json({msg: "New Product Added to the Cart Successfully" , wishlist: updatedData.wishlist, cartTotal: updatedData.cartTotal});

    // } catch (error) {
    //     return next(new ErrorHandler("Internal Error Occurred", 500));
    // }
});





// <----REMOVING ITEMS FROM CART---->

const removeFromWishlist = catchAsyncError(async (req, res, next) => {
    
    // try {
    //     const {productId, color} = req.body;
    //     const {id} = req.params;
    //     console.log(req.body);
    //     if(!id){
    //         return res.status(401).json({
    //             msg: "Id is required!"
    //         })
    //     }
    //     if(!productId){
    //         return res.status(401).json({
    //             msg: "productId is required!"
    //         })
    //     }

    //     let wishlist = [];
    //     let cartTotal = 0;
    //     let updatedData;
    //     const user = await UserData.findById({_id: id});


    //     const userCart = await WishlistData.findOne({user: user._id});
    //     cartTotal = userCart.cartTotal;


    //     wishlist = userCart.wishlist.filter((currentProductDetails) => {
    //         if(currentProductDetails.product.equals(productId) && currentProductDetails.color === color){
    //             cartTotal -= (getDiscountedPrice(currentProductDetails.price, currentProductDetails.discount) * currentProductDetails.count);  
    //         }
    //         else{
    //             return currentProductDetails;
    //         }
                
    //     });
    //     let a = await WishlistData.findByIdAndUpdate(userCart._id, {wishlist, cartTotal});
    //     updatedData  = await WishlistData.findById(userCart._id);

    //     res.status(200).json({msg: "Product Removed from the Cart Successfully" , wishlist: updatedData.wishlist, cartTotal: updatedData.cartTotal});

    // } catch (error) {
    //     console.log(error);
    //     return next(new ErrorHandler("Internal Error Occurred", 500));
    // }
});




// <----GET CART DATA BY USER ID---->

const getUserWishlistData = catchAsyncError(async (req, res, next) => {
    // WishlistData

    const userId = req.user._id.toString();

    try {


        const userWishlist = await WishlistData.findOne({user: userId});

        console.log(userWishlist);
        
        if(userWishlist){
            return res.status(200).json({success: true, msg: "Cart Data Sent Successfully" , wishlist: userWishlist.wishlist});
        }
        return res.status(200).json({success: true, msg: "Cart is Empty" , wishlist: []});
        
    } catch (error) {
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});




// <----UPDATE PRODUCT DATA IN CART---->

const updateWishlistData = catchAsyncError(async (req, res, next) => {

        const userId = req.user._id.toString();
        const wishlist = req.body;
        let updatedData;

        
        const userWishlist = await WishlistData.findOne({user: userId});
        
        if(userWishlist){
            await WishlistData.findByIdAndUpdate(userWishlist._id, {wishlist});
            updatedData = await WishlistData.findOne({user: userId});
            // console.log(updatedData);
            res.status(200).json({msg: "wishlist updated to the Wishlist Successfully", wishlist: updatedData.wishlist});
        }else{
            updatedData = new WishlistData({user: userId, wishlist});
            await updatedData.save();
            res.status(200).json({msg: "wishlist Created and Product added Successfully", wishlist: updatedData.wishlist});
        }
});




module.exports = { addToWishlist, getUserWishlistData, removeFromWishlist, updateWishlistData };
