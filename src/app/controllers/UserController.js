"use strict";

const Yup = require("yup");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const variables = require("../../config/variables");

class UserController {
  async index(req, res) {
    const usersList = await UserModel.find({}, "name email");

    if (!usersList) {
      return res.status(400).json({ message: "Users not found" });
    }

    res.status(200).json(usersList);
  }

  async session(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: "Validation fails" });
    }

    const { email, password } = req.body;
    const hashPassword = md5(password);

    const user = await UserModel.findOne({ email, password: hashPassword });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (hashPassword !== user.password) {
      return res.status(401).json({ error: "Password does not match" });
    }

    return res.status(200).json({
      user,
      token: jwt.sign({ user }, variables.Security.secretKey)
    });
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
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
      image: Yup.string(),
      active: Yup.boolean()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const userExist = await UserModel.findOne({ _id: req.params.id });

    if (userExist) {
      const oldPassword = md5(req.body.oldPassword);
      if (userExist && oldPassword !== userExist.password) {
        return res.status(400).json({ message: "Password does not match." });
      }
    }

    req.body.password = md5(req.body.password);
    const { _id, name, email, active } = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(202).json({ _id, name, email, active });
  }

  async delete(req, res) {
    const schema = Yup.string().required();

    if (await schema.isValid(req.params.id)) {
      const userExist = await UserModel.findById({ _id: req.params.id });

      if (!userExist) {
        return res.status(400).json({ message: "User not find" });
      }

      await UserModel.deleteOne({
        _id: req.params.id
      });
      return res.status(204).json({});
    }

    res.status(400).json({ error: "Required id" });
  }
}

module.exports = new UserController();
