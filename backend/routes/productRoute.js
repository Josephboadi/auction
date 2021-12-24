const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getAllRawProducts,
  getAutoBidInfo,
  autoBidding,
  updateAutoBidInfo,
} = require("../controllers/productController");
const { isAuthenticatedSeller, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/allproducts").get(getAllRawProducts);
router.route("/autoInfo").get(getAutoBidInfo);
router.route("/auto/activate").post(autoBidding);
router.route("/auto/update").put(updateAutoBidInfo);

router
  .route("/admin/products")
  .get(isAuthenticatedSeller, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedSeller, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedSeller, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedSeller, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedSeller, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedSeller, deleteReview);

module.exports = router;
