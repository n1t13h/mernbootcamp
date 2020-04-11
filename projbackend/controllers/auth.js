const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")
exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "user signout",
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req,res) => {
  const { email , password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }
  User.findOne({email},(err,user)=>{
    if(err||!user){
      return res.status(400).json({
        error:"User Email does not exist"
      })
    }
    if(!user.authenticate(password)){
      return res.status(400).json({
        error:"Email and Password do not match"
      })
    }
    // Create token
    const token = jwt.sign({_id: user._id},process.env.SECRET)
    // put token in cookie

    res.cookie("token",token,{expire:new Date()+ 9999 });

    const { _id,name,email,role } = user;
    return res.json({token,user:{_id,name,email,role}})
  })

}

// PROTECTED ROUTES
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
})



// Custom middlewares
exports.isAuthenticated = (req,res,next)=>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker){
    return res.status(403).json({
      error:"ACCESS DENIED"
    })
  }
  next();
}

exports.isAdmin = (req,res,next)=>{
  if(req.profile.role === 0){
    return res.status(403).json({
      error:"You are not admin, Access denied"
    })
  }
  next();
}
