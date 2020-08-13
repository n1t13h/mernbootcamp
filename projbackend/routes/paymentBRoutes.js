const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { getToken, processPayment } = require("../controllers/paymentB");
router.param("userId", getUserById);
router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment);

module.exports = router;
