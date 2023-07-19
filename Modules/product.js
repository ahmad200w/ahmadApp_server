const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    dafault: "",
  },
  image: {
    type: String,
    dafault: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    dafault: "",
  },
  price: {
    type: Number,
    dafault: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required,
  },
  contInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    dafault: 0,
  },
  numReview: {
    type: Number,
    dafault: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

exports.product =mongoose.model('product',productSchema);