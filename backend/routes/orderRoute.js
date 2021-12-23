const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const {
  isAuthenticatedUser,
  isAuthenticatedSeller,
  authorizeRoles,
} = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router
  .route("/order/:id")
  .get(isAuthenticatedUser || isAuthenticatedSeller, getSingleOrder);

router
  .route("/orders/me")
  .get(isAuthenticatedUser || isAuthenticatedSeller, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedSeller, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedSeller, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedSeller, authorizeRoles("admin"), deleteOrder);

module.exports = router;
