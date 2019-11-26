"use strict";
const productModel = require("../models/ProductModel");

class ProductController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    const listProducts = await productModel.find();

    return res.status(200).send(listProducts);
  }

  async show(req, res) {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.json({ message: "product not exists" });
    }

    res.status(200).json(product);
  }

  async store(req, res) {
    const product = await productModel.create(req.body);

    res.status(201).json(product);
  }

  async update(req, res) {
    const checkProduct = await productModel.findById(req.params.id);

    if (!checkProduct) {
      return res.json({ error: "Product not exists" });
    }

    await productModel.update(req.params._id, {
      $set: req.body
    });

    const product = await productModel.findById(req.params.id);

    res.status(202).json(product);
  }

  async delete(req, res) {
    const checkProduct = await productModel.findById(req.params.id);

    if (!checkProduct) {
      return res.json({ error: "product not exists" });
    }

    await productModel.remove({ _id: req.params.id });

    res.status(204).json({ message: "deleted" });
  }
}

module.exports = new ProductController();
