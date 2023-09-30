const JWT = require('jsonwebtoken');
const ErrorHandler = require("../utile/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const UserData = require("../models/userdataModel");


//----CHECKING IF USER LOGGED IN---->
const isLoggedIn =  catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = JWT.verify(token, process.env.JWT_KEY);

  
  req.user = await UserData.findById(decodedData.id);

  next();
});



const isLoggedInAndCanAccess =  catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});



const isLoggedInAndAdmin = (req, res, next) => {

  isLoggedIn(req, res, () => {
    if (req.user.role==0) {
      next(new ErrorHandler( `Users are not allowed to access this resource`, 403));
    }
    next();
  })
}



module.exports = {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin};
















// // --------------------CHECKING IF THE USER IS LOGGED IN OR NOT-----------------------
// const isLoggedIn = async (req, res, next) => {
//   try {
//     console.log(req.headers);
//       const authHeader = req.headers.authorization;
//       if (authHeader) {
//           await JWT.verify(authHeader, process.env.JWT_KEY,(err, user) => {
              
//               if(err) return res.status(402).json({msg: "Token is not Valid!"});
              
//               req.user = user;
//               next();
//           });
//       }else{
//           res.status(401).json({msg: "You are not authenticated!"});
//       }
//   } catch (error) {
//       console.log(error);
//   }
// };


// const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_KEY
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };


// //----------------------------Checking if user can access this link or not------------------------
// const isLoggedInAndCanAccess =  (req, res, next) => {
//   isLoggedIn(req, res, () => {

//       if (req.user.id === req.params.id || req.user.role==1) {
//           next();
//       } else {
//           res.status(403).json("You are not allowed to do that!");
//       }
//   });
// }









// const isLoggedInAndAdmin = async (req, res, next) => {
//   try {
//      isLoggedIn(req, res,() => {
//       if (req.user.role==1) {
//         next();
//       } else {
//         res.status(403).json("You are not allowed to do that as you are not an admin!");
//       }
//     })
     
//   } catch (error) {
//       console.log(error);
//       res.status(501).json({
//           success: false,
//           msg: error
//       })
//   }
// }



// module.exports = {isLoggedIn, isLoggedInAndCanAccess, isLoggedInAndAdmin, requireSignIn};


