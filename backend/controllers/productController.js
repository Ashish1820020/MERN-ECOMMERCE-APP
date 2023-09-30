const Product = require("../models/productModel");
const  ObjectId  = require("mongoose").Types.ObjectId;
const catchAsyncError = require('../middleware/catchAsyncError');
const cloudinary = require("../helper/CloudinaryConfig");



const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - Math.ceil(((price*discount)/100));
    return discountedPrice;
}


// <----GET ALL PRODUCTS---->
const getProducts = catchAsyncError(async(req, res, next) => {
  try {
    const {company, search, featured, type, sort, rating, color, price, category, gridView} = req.query;

    let categoryQuery = [];
    let companyQuery = [];
    let colorQuery = [];
    const queryObject = {};
    let sortingQuery;

    let limit = 8;
    if(gridView==="true")
    limit = 15;

    if(sort && type){
        sortingQuery =  {[type]: sort};
    }else{
        sortingQuery =  {rating: -1};
    }
    if(search){
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if(rating){
        queryObject.rating = {"$gte": rating};
    }
    if(featured){
        queryObject.featured = featured;
    }
    if(category){
        categoryQuery = category.split(",").map((currElem) => {
            return new ObjectId(currElem);
        });
        queryObject.category = categoryQuery
    }
    if(company){
        companyQuery = company.split(",");
        queryObject.company = companyQuery
    }
    if(color){
        colorQuery = color.split(",").map((currElem) => {
            return `#${currElem}`;
        });
        queryObject.colors = {"$in": colorQuery};
    }
    if(price){
        queryObject.price = {"$gte": 0, "$lte": price};
    }
    
    
    let apiData = Product.find(queryObject);
    let productList = await apiData.sort(sortingQuery);


    let page = req.query.page;
    if(page){
        
        page = parseInt(req.query.page)
      
        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit
    
        
        const results = {}
        results.totalProducts = productList.length;
        results.pageCount=Math.ceil(productList.length/limit);
      
        if (lastIndex < productList.length) {
          results.next = {
            page: page + 1,
          }
        }
        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
          }
        }
        results.result = productList.slice(startIndex, lastIndex);
        return res.status(200).json({"msg": "success", ...results});
        
    }
    
    res.status(200).json({"msg": "success", result: productList});
    
  } catch (error) {
    return next(new ErrorHandler("Internal Error Occurred", 500));
  }
});



// <----GET ALL PRODUCTS---->
const getSearchBarResult = catchAsyncError(async(req, res, next) => {
    try {
      const { search } = req.query;
      let queryObject = {};
      let apiData = [] ;

      if(search.length > 0){
          queryObject.name = { $regex: search, $options: 'i' };
          apiData = await Product.find(queryObject);
      }
      
      res.status(200).json({"msg": "success", result: apiData});
      
    } catch (error) {
      return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});


// <----GET SINGLE PRODUCT DATA---->
const getSingleProduct = catchAsyncError(async(req, res, next) => {
    const productId = req.params.productId;

    await Product.findById(productId)
    .then((product)=>{
        res.status(200).json({message: "Product fetched", product: product});
    })
    .catch((err) => {
        return next(new ErrorHandler("Internal Error Occurred", 500));
    });
});



// <----ADD NEW PRODUCT---->
const postProducts = catchAsyncError(async(req, res, next) => {
    const {name, category, company, price, colors, description, rating,
            warranty, bulletHighlights, discount, stock, featured} = req.body;
    const images = req.files;

   try {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    let newProductObject = { name, category, company, price, description, discountedPrice, discount };

    if(rating)
        newProductObject.rating = rating;

    if(warranty)
        newProductObject.warranty = warranty;
    
    if(stock)
        newProductObject.stock = stock;
    
    if(featured)
        newProductObject.featured = featured;



    if(colors){
        const colorsArray = colors.split(",").map((color) => {
            return color;
        });
        newProductObject.colors = colorsArray;
    }
    if(bulletHighlights){
        const bulletHighlightsArray = bulletHighlights.split(",").map((bullet) => {
            return bullet;
        });
        newProductObject.bulletHighlights = bulletHighlightsArray;
    }

    
    if(images.length > 0){
        const upload = [];

        for(let i=0; i<4; i++){
            const img = await cloudinary.uploader.upload(images[i].path);
            upload.push(img.secure_url);
        }
        newProductObject.images = upload;
    }
    
    const newProduct = await Product.create(newProductObject);
    res.status(201).json({ success: true, msg: "Data added to Database successfully", newProduct });

   } catch (error) {
    // console.log(error);
   }
});



// <----UPDATE EXISTING PRODUCTS---->
const updateProducts = catchAsyncError(async (req, res, next) => {
    const { id, name, category, company, price, colors, description, bulletHighlights,
        rating, warranty, discount, stock, featured } = req.body;
        const images = req.files;



    const discountedPrice = calculateDiscountedPrice(price, discount);
    let newProductObject = { name, category, company, price, description,
        rating, warranty, discount, stock, featured, discountedPrice };
        
    

    if(colors){
        const colorsArray = colors.split(",").map((color) => {
            return color;
        });
        newProductObject.colors = colorsArray;
    }
    if(bulletHighlights){
        const bulletHighlightsArray = bulletHighlights.split(",").map((bullet) => {
            return bullet;
        });
        newProductObject.bulletHighlights = bulletHighlightsArray;
    }
   
    if(images.length>0){
        const upload = [];
        for(let i=0; i<images.length; i++){
            const img = await cloudinary.uploader.upload(images[i].path);
            upload.push(img.secure_url);
        }
        newProductObject.images = upload;
    }


    try {
        await Product.findByIdAndUpdate(id, newProductObject);
        const data = await Product.find({});
        
        res.status(201).json({
            success: true,
            msg: "Data Updated to the Database successfully",
            data
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            msg: "Error Occurred",
            error
        });    
    }
});




// <----DELETE EXISTING PRODUCT---->
const deleteProduct = catchAsyncError(async (req, res, next) => {
    const id = req.params.productId;

    try {
        await Product.findByIdAndDelete(id)
        
        res.status(201).json({
            success: true,
            msg: "Data Deleted from the Database successfully"
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            msg: "Error Occurred",
            error
        });    
    }
});



module.exports = {getProducts, getSearchBarResult, getSingleProduct, postProducts, updateProducts, deleteProduct};
