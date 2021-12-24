const express = require("express");
const {
  createBid,
  updateBid,
  deleteBid,
  getBidDetails,
  getProductBids,
  getAllRawBids,
} = require("../controllers/bidController");
const {
  isAuthenticatedSeller,
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth");

const router = express.Router();

router.route("/allbids").get(getAllRawBids);

router.route("/bids").post(getProductBids);

router
  .route("/bid/new")
  .post(isAuthenticatedSeller || isAuthenticatedUser, createBid);

router
  .route("/admin/bid/:id")
  .put(isAuthenticatedSeller, authorizeRoles("admin"), updateBid)
  .delete(isAuthenticatedSeller, authorizeRoles("admin"), deleteBid);

router.route("/bid/:id").get(getBidDetails);

module.exports = router;
