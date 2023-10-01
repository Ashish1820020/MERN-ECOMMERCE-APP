const UserData = require("../models/userdataModel");
const fs = require("fs");
const path = require("path");
const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto");
const sendToken = require("../utile/jwtToken");
const sendEmail = require("../utile/sendEmail");
const ErrorHandler = require("../utile/ErrorHandler");
const { comparePassword } = require("../helper/AuthHelper");
const cloudinary = require("../helper/CloudinaryConfig");

// <----HANDLE SIGNUP---->
const signUp = catchAsyncError(async (req, res, next) => {
  // try {
  const { name, email, password } = req.body;
  const avatar = req.file;
  let queryObj = {};

  if (avatar) {
    queryObj.avatar = {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads/", req.file.filename)
      ),
      contentType: "image/png",
    };
  }
  queryObj.name = name;
  queryObj.email = email;
  queryObj.password = password;

  const user = new UserData(queryObj);
  await user.save();

  sendToken(user, 200, res);
});

// <----HANDLE LOGIN---->
const logIn = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Invalid email or password", 400));

    // user check
    let user = await UserData.findOne({ email: email }).select("+password");

    if (!user) return next(new ErrorHandler("Email is not Registered", 401));

    // check password matching
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch)
      return next(new ErrorHandler("Invalid Password!", 401));

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error!", 500));
  }
});

// <----LOGOUT---->

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: "Logged Out",
  });
});

// <----Forgot Password---->
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserData.findOne({ email: req.body.email });

  if (!user) {
    return next(new Error("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      msg: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Error(error.message, 500));
  }
});

// Reset Password
const resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserData.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({ msg: "password reset Successful" });
});

// <---- ADD NEW ADDRESS ---->
const addAddress = catchAsyncError(async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      pinCode,
      locality,
      address,
      district,
      state,
      landmark,
      altNo,
      id,
    } = req.body;

    let query = {
      name,
      phoneNo,
      pinCode,
      locality,
      address,
      district,
      state,
      landmark,
      altNo,
    };

    // is a user ?
    let user = await UserData.findById(id);
    if (user) {
      const addressArray = user.address;
      const newUserData = [...addressArray, query];

      await UserData.findByIdAndUpdate(user._id, { address: newUserData });
      user = await UserData.findById(id);
    }
    res.status(201).json({ success: true, userData: user });
  } catch (error) {
    res.status(401).json({ success: false, msg: "Internal server error" });
  }
});

// <---- PROFILE DATA ---->
const updateProfile = catchAsyncError(async (req, res) => {
  try {
    const { id, name, password, phoneNumber } = req.body;
    const avatar = req.file;
    let queryObj = {};

    if (!id) {
      return res.status(400).json({ msg: "Id is required" });
    }
    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }
    if (!phoneNumber) {
      return res.status(400).json({ msg: "Phone Number is required" });
    }

    if (avatar) {
      const upload = await cloudinary.uploader.upload(avatar.path);
      queryObj.avatar = upload.secure_url;
    }

    queryObj = { ...queryObj, name, phoneNumber };

    // password checking
    const user = await UserData.findById(id);
    const match = await comparePassword(user.password, password);

    if (!match)
      return res.status(401).json({ success: false, msg: "Wrong Password" });

    await UserData.findByIdAndUpdate(id, queryObj);
    const data = await UserData.findById(id);

    const userData = {
      _id: data._id,
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      role: data.role,
      address: data.address,
      secret: data.secretKey,
      avatar: data.avatar,
      createdAt: data.createdAt,
    };
    res
      .status(201)
      .json({
        success: true,
        msg: "User Data id Updated successfully",
        userData,
      });
  } catch (error) {
    res.status(401).json({ success: false, msg: "Error Occurred", error });
  }
});

// GET ALL USERS -> ADMIN
const getAllUsers = catchAsyncError(async (req, res) => {
  try {
    const allUserData = await UserData.find({});
    res.status(201).json({ success: true, allUserData });
  } catch (error) {
    // console.log(error);
    res.status(401).json({ success: false, msg: "Error Occurred", error });
  }
});

// GET ALL USERS -> ADMIN
const deleteUser = catchAsyncError(async (req, res) => {
  try {
    const { id } = req.params;

    // delete user
    await UserData.findByIdAndDelete(id);
    const updatedUsers = await UserData.find({});
    res.status(201).json({ success: true, updatedUsers });
  } catch (error) {
    // console.log(error);
    res.status(401).json({ success: false, msg: "Error Occurred", error });
  }
});

const testController = (req, res) => {
  res.status(200).json("protected route");
};

const userAuth = (req, res, next) => {
  // console.log("user");
  res.status(200).json({ ok: "true" });
};

const adminAuth = (req, res, next) => {
  // console.log("admin");
  res.status(200).json({ ok: "true" });
};

module.exports = {
  logIn,
  signUp,
  testController,
  userAuth,
  adminAuth,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAllUsers,
  deleteUser,
  addAddress,
  logout,
};
