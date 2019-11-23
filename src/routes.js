const { Router } = require("express");

const CategoryController = require("./app/controllers/CategoryController");
const ProductController = require("./app/controllers/ProductController");

const routes = new Router();

// Rotues category
routes.get("/api/category", CategoryController.index);
routes.get("/api/category/:id", CategoryController.show);
routes.post("/api/category", CategoryController.store);
routes.put("/api/category/:id", CategoryController.update);
routes.delete("/api/category/:id", CategoryController.delete);

// Routes product
routes.get("/api/product", ProductController.index);
routes.get("/api/product/:id", ProductController.show);
routes.post("/api/product", ProductController.store);
routes.put("/api/product/:id", ProductController.update);
routes.delete("/api/product/:id", ProductController.delete);

module.exports = routes;
