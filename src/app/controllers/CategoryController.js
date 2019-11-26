"use strict";
const Yup = require("yup");

const categorysModel = require("../models/CategoryModel");

class CategoryController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    const listCategorys = await categorysModel.find();

    res.status(200).send(listCategorys);
  }

  async show(req, res) {
    const schema = Yup.string().required("Informe um id");

    if (await schema.isValid(req.params.id)) {
      const categoryFound = await categorysModel.findById(req.params.id);
      return res.status(200).send(categoryFound);
    }

    res.status(400).json({ error: "O id precisa ser informado" });
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

    const model = new categorysModel(req.body);

    const result = await model.save();

    res.status(201).send(result);
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

    await categorysModel.findByIdAndUpdate(req.params.id, { $set: req.body });

    let categoryFound = await categorysModel.findById(req.params.id);

    res.status(202).send(categoryFound);
  }

  async delete(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const deleted = await categorysModel.findByIdAndRemove(req.params.id);
      res.status(204).send(deleted);
    }

    res.status(400).json({ error: "Informe um id" });
  }
}

module.exports = new CategoryController();
