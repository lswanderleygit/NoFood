"use strict";

class CategoryController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    res.status(200).send("Index");
  }

  async show(req, res) {
    res.status(200).send(`O id passado foi ${req.params.id}`);
  }

  async store(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

module.exports = new CategoryController();
