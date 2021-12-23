const express = require("express");
const {
  registerSeller,
  loginSeller,
  logout,
  forgotPassword,
  resetPassword,
  getSellerDetails,
  updatePassword,
  updateSellerProfile,
  getAllSeller,
  getSingleSeller,
  updateSellerRole,
  deleteSeller,
} = require("../controllers/sellerController");
const { isAuthenticatedSeller, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/registerSeller").post(registerSeller);

router.route("/login-seller").post(loginSeller);

router.route("/password/forgot-seller").post(forgotPassword);

router.route("/password/reset-seller/:token").put(resetPassword);

router.route("/logout-seller").get(logout);

router.route("/me-seller").get(isAuthenticatedSeller, getSellerDetails);

router
  .route("/password/update-seller")
  .put(isAuthenticatedSeller, updatePassword);

router
  .route("/me/update-seller")
  .put(isAuthenticatedSeller, updateSellerProfile);

router
  .route("/admin/sellers")
  .get(isAuthenticatedSeller, authorizeRoles("admin"), getAllSeller);

router
  .route("/admin/seller/:id")
  .get(isAuthenticatedSeller, authorizeRoles("admin"), getSingleSeller)
  .put(isAuthenticatedSeller, authorizeRoles("admin"), updateSellerRole)
  .delete(isAuthenticatedSeller, authorizeRoles("admin"), deleteSeller);

module.exports = router;
