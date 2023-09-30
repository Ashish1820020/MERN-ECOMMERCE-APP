const express = require("express");
const router = express.Router();
const {logIn, signUp, testController, userAuth, adminAuth, forgotPassword, updateProfile, getAllUsers, deleteUser, addAddress, 
        resetPassword, logout} = require("../controllers/AuthController");
const {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin, requireSignIn} = require("../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage});
  



// SIGN UP || POST
router.route("/signup").post(upload.single('avatar'), signUp);

//LOG IN || POST
router.route("/login").post(logIn);


//LOG IN || POST
router.route("/logout").patch(isLoggedIn, logout);

// FORGOT PASSWORD || POST
router.route("/password/forgot").post(forgotPassword);

// RESET PASSWORD || PUT
router.route("/password/reset/:token").put(resetPassword);

// SIGN UP || POST
router.route("/updateprofile").patch(upload.single('avatar'), updateProfile);

// ADD NEW ADDRESS || POST
router.route("/addaddress").post(addAddress);

// GET ALL ADMIN || GET
router.route("/allusers").get(isLoggedInAndAdmin, getAllUsers);

// DELETE USERS ADMIN  || GET
router.route("/deleteuser/:id").delete(isLoggedInAndAdmin, deleteUser);


// USER DASHBOARD ROUTE WITH MIDDLEWARE || POST
router.route("/user-auth").get(isLoggedIn, userAuth);

// ADMIN DASHBOARD ROUTE WITH MIDDLEWARE || POST
router.route("/admin-auth").get(isLoggedInAndAdmin, adminAuth);

module.exports = router;