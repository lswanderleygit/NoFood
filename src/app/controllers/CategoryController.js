"use strict";
const categorysModel = require("../models/CategoryModel");

class CategoryController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    const listCategorys = await categorysModel.find();

    res.status(200).send(listCategorys);
  }

  async show(req, res) {
    const categoryFound = await categorysModel.findById(req.params.id);

    res.status(200).send(categoryFound);
  }

  async store(req, res) {
    const model = new categorysModel(req.body);

    const result = await model.save();

    res.status(201).send(result);
  }

  async update(req, res) {
    await categorysModel.findByIdAndUpdate(req.params.id, { $set: req.body });

    let categoryFound = await categorysModel.findById(req.params.id);

    res.status(202).send(categoryFound);
  }

  async delete(req, res) {
    const deleted = await categorysModel.findByIdAndRemove(req.params.id);
    res.status(204).send(deleted);
  }
}

module.exports = new CategoryController();
