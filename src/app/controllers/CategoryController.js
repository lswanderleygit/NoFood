"use strict";
const Yup = require("yup");

const categorysModel = require("../models/CategoryModel");

class CategoryController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    const listCategorys = await categorysModel.find();

    if (!listCategorys) {
      return res.status(400).json({ message: "Users not found" });
    }

    res.status(200).send(listCategorys);
  }

  async show(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const categoryFound = await categorysModel.findById(req.params.id);
      return res.status(200).send(categoryFound);
    }

    res.status(400).json({ error: "Id is required" });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const category = await categorysModel.create(req.body);

    res.status(201).send(category);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const categoryFound = await categorysModel.findOneAndUpdate(req.params.id, {
      $set: req.body
    });

    res.status(202).json(categoryFound);
  }

  async delete(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      await categorysModel.findByIdAndRemove(req.params.id);
      res.status(204);
    }

    res.status(400).json({ error: "Required id" });
  }
}

module.exports = new CategoryController();
