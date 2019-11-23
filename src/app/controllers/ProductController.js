"use strict";

class ProductController {
  // index:get show:get store:post update:put delete:delete

  async index(req, res) {
    res.status(200).send("Index produto");
  }

  async show(req, res) {
    res.status(200).send(`O id passado foi ${req.params.id}`);
  }

  async store(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

module.exports = new ProductController();
