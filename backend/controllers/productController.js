const Product = require("../models/productModel");
const AutoBid = require("../models/autoBidModel");
const Seller = require("../models/sellerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.body.id;

  await Seller.findById(req.body.id).then(async (seller) => {
    const product = await Product.create(req.body);
    seller.products.push(product);
    seller.save();
    res.status(201).json({
      success: true,
      product,
    });
  });
});

// Get All Product Raw
exports.getAllRawProducts = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.find()
    .populate("user")
    .populate("bids")
    .populate({
      path: "bids",
      model: "Bid",
      populate: [{ path: "user", model: "User" }],
    });

  res.status(200).json({
    success: true,
    products,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.find()
    .populate("user")
    .populate("bids")
    .populate({
      path: "bids",
      model: "Bid",
      populate: [{ path: "user", model: "User" }],
    });

  res.status(200).json({
    success: true,
    products,
  });
  // await Seller.findById(req.body.id).then(async (seller) => {
  //   const products = await Product.find({ _id: { $in: seller.products } });

  //   res.status(200).json({
  //     success: true,
  //     products,
  //   });
  // });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("bids")
    .populate("user");

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// activate autoBidding
exports.autoBidding = catchAsyncErrors(async (req, res, next) => {
  req.body.user;
  req.body.autoBidAmount = 1000000;
  // req.body.id

  const autoBid = await AutoBid.create(req.body);
  await Product.findById(req.body.id).then((fetchedProduct) => {
    fetchedProduct.autoBid = true;

    fetchedProduct.save();
  });

  res.status(200).json({
    message: "Auto Bid Activated",
    data: autoBid,
  });
});

// Get autobid info
exports.updateAutoBidInfo = catchAsyncErrors(async (req, res, next) => {
  const autoBid = await AutoBid.findById(req.body.id)
    .populate("user")
    .then((fetchedAutobid) => {
      fetchedAutobid.autoBidAmount = req.body.autoBidAmount;

      fetchedAutobid.save();
    });

  res.status(200).json({
    success: true,
    autoBid,
  });
});

// update autobid info
exports.getAutoBidInfo = catchAsyncErrors(async (req, res, next) => {
  let autobidinfo = await AutoBid.find().populate("user");

  res.status(200).json({
    success: true,
    autobidinfo,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
