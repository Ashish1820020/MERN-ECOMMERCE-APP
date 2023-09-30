const mongoose = require('mongoose');// Create Token and saving in cookie
const JWT = require('jsonwebtoken');
const crypto = require("crypto");
const validator = require('validator');
const bcrypt = require("bcrypt");

const userDataSchema = new mongoose.Schema({
      
    name:{
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [4, "Name should be more then 4 characters"],
        maxLength: [30, "Name should be less then 30 characters"]
    },

    email: {
        type: String,
        required: true,
        unique: [true, "This email is already registered"],
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should be more then 6 characters"],
    },

    phoneNumber: {
        type: Number,
    },

    avatar: {
        type: String
    },
    
    address: [
        {
            name: {type: String},
            phoneNo: {type: Number},
            pinCode: {type: Number},
            locality: {type: String},
            address: {type: String},
            country: {type: String},
            state: {type: String},
            district: {type: String},
            landmark: {type: String},
            altNo: {type: Number},
        }
    ],

    cartItems: {type: Array, default: []},
    
    role: {
        type: Number,
        default: 0
    },

    gender:{
        type: String
    },
    
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toDateString(),
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userDataSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userDataSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_KEY, {expiresIn: "7d"});
};

// Compare Password

userDataSchema.methods.comparePassword = async function (password) {
    console.log(password);
    return await bcrypt.compare(password, this.password);
};






userDataSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };


module.exports = mongoose.model("UserData", userDataSchema);