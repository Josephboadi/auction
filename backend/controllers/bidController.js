const Product = require("../models/productModel");
const Bid = require("../models/bidModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Bid -- Admin
exports.createBid = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.body.user;

  await Product.findById(req.body.product).then(async (product) => {
    if (req.body.bidAmount > product.currentBidPrice) {
      const bid = await Bid.create(req.body);
      product.bids.push(bid);
      product.currentBidPrice = req.body.bidAmount;
      product.save();
      res.status(201).json({
        success: true,
        bid,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Bid Amount shoud be higher than current Bid",
      });
    }
  });
});

// Get All Bids Raw
exports.getAllRawBids = catchAsyncErrors(async (req, res, next) => {
  let bids = await Bid.find()
    .populate("product")
    .populate("user")
    .populate({
      path: "product.user",
      model: "Seller",
    })
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    bids,
  });
});

// Get All Bid (Product)
exports.getProductBids = catchAsyncErrors(async (req, res, next) => {
  await Product.findById(req.body.id).then(async (product) => {
    const bids = await Bid.find({ _id: { $in: product.bids } })
      .populate("product")
      .populate("user")
      .populate({
        path: "product",
        model: "Product",
        populate: [{ path: "user", model: "Seller" }],
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      bids,
    });
  });
});

// Get Bid Details
exports.getBidDetails = catchAsyncErrors(async (req, res, next) => {
  const bid = await Bid.findById(req.body.id);

  if (!bid) {
    return next(new ErrorHander("Bid not found", 404));
  }

  res.status(200).json({
    success: true,
    bid,
  });
});

// Update Bid -- Admin

exports.updateBid = catchAsyncErrors(async (req, res, next) => {
  let bid = await Bid.findById(req.body.id);

  if (!bid) {
    return next(new ErrorHander("Bid not found", 404));
  }

  bid = await Bid.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    bid,
  });
});

// Delete Bid

exports.deleteBid = catchAsyncErrors(async (req, res, next) => {
  const bid = await Bid.findById(req.body.id);

  if (!bid) {
    return next(new ErrorHander("Bid not found", 404));
  }

  await bid.remove();

  res.status(200).json({
    success: true,
    message: "Bid Delete Successfully",
  });
});
