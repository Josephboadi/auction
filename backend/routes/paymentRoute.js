const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const {
  isAuthenticatedSeller,
  isAuthenticatedUser,
} = require("../middleware/auth");

router
  .route("/payment/process")
  .post(isAuthenticatedSeller || isAuthenticatedUser, processPayment);

router
  .route("/stripeapikey")
  .get(isAuthenticatedSeller || isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
