"use strict";

const Yup = require("yup");
const md5 = require("md5");

const UserModel = require("../models/UserModel");

class UserController {
  async index(req, res) {
    const listUser = await UserModel.find({}, "name email image");

    if (!listUser) {
      return res.status(400).json({ message: "Users not found" });
    }

    res.status(200).send(listUser);
  }

  async authenticate(req, res) {
    const { email, password } = await req.body;
    const hashPassword = md5(password);

    const auth = UserModel.findOne(
      { email, password: hashPassword },
      "name email _id"
    );

    if (auth) {
    }
  }

  async show(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const { email, _id, image } = await UserModel.findById(req.params.id);
      return res.status(200).send({ email, _id, image });
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
      confirmPassword: Yup.string().required(),
      image: Yup.string(),
      active: Yup.boolean().required()
    });

    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords does not match" });
    }

    const checkUserExists = await UserModel.findOne({ email: req.body.email });

    if (checkUserExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    req.body.password = md5(req.body.password);
    const { name, email, _id } = await UserModel.create(req.body);

    res.status(201).json({ name, email, _id });
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
    const { name, email, image, password } = req.body;

    const emailExists = await UserModel.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userUpdate = await UserModel.update(
      { _id: req.params.id },
      {
        name,
        email,
        image,
        password
      }
    );

    res.status(202);
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
