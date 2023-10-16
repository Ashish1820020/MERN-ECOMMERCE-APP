const CategoryData = require("../models/categoryModel");
const ProductsData = require("../models/productModel");
const catchAsyncError = require('../middleware/catchAsyncError');
const cloudinary = require("../helper/CloudinaryConfig");


const getUniqueData = (allProducts, prop) => {
    
    let newVal = allProducts.map((currElem) => {
      return currElem[prop];
    });

    if (prop === "colors") {
      newVal = newVal.flat();
    }

    newVal = ['all', ...new Set(newVal)];
    return newVal;
}

const createCategory = catchAsyncError(async (req, res, next) => {

    try {
        const {name} = req.body;
        const categoryImg = req.file;
        const queryObj = {};


        // console.log(req.body);
        // console.log(req.file);

        if(!name){
            return res.status(401).json({
                msg: "Name is required!"
            })
        }
        queryObj.name = name;

        if (categoryImg) {
            const upload = await cloudinary.uploader.upload(categoryImg.path);
            console.log(upload);
            queryObj.categoryImg = upload.secure_url;
        }

        // console.log(queryObj);

        const exist = await CategoryData.findOne({name: queryObj.name});

        if(exist) return res.status(400).json({msg: "Already present category!"});

        const newCategory = new CategoryData (queryObj);
        await newCategory.save();
        
        res.status(200).json({msg: "Category successfully added", newCategory});

    } catch (error) {
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});




const getCategories = catchAsyncError(async (req, res, next) => {

    try {
        const categoryList = await CategoryData.find({});
        res.status(200).json({
            success: true,
            categoryList
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
});




const getOtherFilters = catchAsyncError(async(req, res, next) => {
    try {
        const data = await ProductsData.find({},{company: 1, colors: 1, _id: 0});
        let companies = new Set();
        let colors = new Set();

        data.forEach((elem) => {
            companies.add(elem.company);
            colors.add(...elem.colors)
        })

        companies = [...companies];
        colors = [...colors];
        
        res.status(200).json({"msg": "success", companies, colors});
    } catch (error) {
        return next(new ErrorHandler("Internal Error Occurred", 500));
    }
})

module.exports = {createCategory, getCategories, getOtherFilters}