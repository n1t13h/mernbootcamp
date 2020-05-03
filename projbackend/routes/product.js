// IMPORTS
const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  photo,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { check, validationResult } = require("express-validator");

// PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

// ACTUAL ROUTES

// ROUTES - POST
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAdmin,
  isAuthenticated,
  createProduct
);

// ROUTES - GET
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);
// ROUTES - PUT
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
// ROUTES - DELETE
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// EXPORTS
module.exports = router;
