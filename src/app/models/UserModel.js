"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    active: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

UserModel.pre("save", next => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model("User", UserModel);
