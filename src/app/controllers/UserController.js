"use strict";

const Yup = require("yup");

const UserModel = require("../models/UserModel");

class UserController {
  async index(req, res) {
    const listUser = await UserModel.find();

    if (!listUser) {
      return res.status(400).json({ message: "Users not found" });
    }

    res.status(200).send(listUser);
  }

  async show(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const userFound = await UserModel.findById(req.params.id);
      return res.status(200).send(userFound);
    }

    res.status(400).json({ error: "Id is required" });
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userFound = await UserModel.findOneAndUpdate(req.params.id, {
      $set: req.body
    });

    res.status(202).json(userFound);
  }

  async delete(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      await UserModel.findByIdAndRemove(req.params.id);
      res.status(204);
    }

    res.status(400).json({ error: "Required id" });
  }
}

module.exports = new UserController();
