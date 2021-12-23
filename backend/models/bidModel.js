const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({
  timeOfBid: {
    type: Date,
    default: new Date(),
    required: [true, "Please Enter product Description"],
  },
  bidAmount: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  bidType: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
