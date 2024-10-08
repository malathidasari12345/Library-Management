const jwt = require("jsonwebtoken")

const sendcookie = (user,res,message,statuscode = 200)=>{

const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
 res.status(statuscode).cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
  }).json({
      success: true,
      message
  });
}
module.exports = sendcookie