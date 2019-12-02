const { Router } = require("express");

const CategoryController = require("./app/controllers/CategoryController");
const ProductController = require("./app/controllers/ProductController");
const UserController = require("./app/controllers/UserController");

const auth = require("./middlewares/auth");

const routes = new Router();

// Rotues category
routes.post("/api/category", auth, CategoryController.store);
routes.get("/api/category", auth, CategoryController.index);
routes.get("/api/category/:id", auth, CategoryController.show);
routes.put("/api/category/:id", auth, CategoryController.update);
routes.delete("/api/category/:id", auth, CategoryController.delete);

// Routes product
routes.post("/api/product", auth, ProductController.store);
routes.get("/api/product", auth, ProductController.index);
routes.get("/api/product/:id", auth, ProductController.show);
routes.put("/api/product/:id", auth, ProductController.update);
routes.delete("/api/product/:id", auth, ProductController.delete);

// Routes User
routes.post("/api/user/register", UserController.store);
routes.post("/api/user/session", UserController.session);

routes.post("/api/user", auth, UserController.store);
routes.get("/api/user", auth, UserController.index);
routes.get("/api/user/:id", auth, UserController.show);
routes.put("/api/user/:id", auth, UserController.update);
routes.delete("/api/user/:id", auth, UserController.delete);

module.exports = routes;
