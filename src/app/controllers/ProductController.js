"use strict";
const productModel = require("../models/ProductModel");
const Yup = require("yup");

class ProductController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    const listProducts = await productModel.find();

    if (!listProducts) {
      return res.status(400).json({ message: "Products not found" });
    }

    return res.status(200).send(listProducts);
  }

  async show(req, res) {
    const schema = Yup.string().required("Informe um id");

    if (await schema.isValid(req.params.id)) {
      const productFound = await productModel.findById(req.params.id);
      return res.status(200).json(productFound);
    }

    return res.status(400).json({ message: "product not exists" });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const product = await productModel.create(req.body);

    res.status(201).json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const checkProduct = await productModel.findById(req.params.id);

    if (!checkProduct) {
      return res.status(400).json({ error: "Product not exists" });
    }

    const product = await productModel.findOneAndUpdate(req.params._id, {
      $set: req.body
    });

    res.status(202).json(product);
  }

  async delete(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const deleted = await productModel.findByIdAndRemove(req.params.id);
      return res.status(204);
    }

    res.status(400).json({ error: "Report id" });

    // await productModel.remove({ _id: req.params.id });
  }
}

module.exports = new ProductController();
