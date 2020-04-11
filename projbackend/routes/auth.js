var express = require("express");
var router = express.Router();
const { signout, signup, signin,isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.get(
  "/signout",

  signout
);

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 Characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 Characters").isLength({
      min: 5,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password cannot be blank").isLength({
      min: 1,
    }),
  ],
  signin
);
// router.get("/test",isSignedIn,(req,res)=>{
//   res.send(req.auth)
// })
module.exports = router;
