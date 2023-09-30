
// GENERATING JWT TOKEN FOR THE USER LOGIN
const sendToken = (user, statusCode, res) => {
    // token creation
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;