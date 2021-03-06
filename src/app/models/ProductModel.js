"use strict";

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productModel = new schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    active: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

productModel.pre("save", next => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Product", productModel);
