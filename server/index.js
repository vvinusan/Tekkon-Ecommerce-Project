"use strict";

const express = require("express");
const morgan = require("morgan");

// IMPORT HANDLERS

const { getAllCompanies, getCompany } = require("./handlers/companyHandlers");
const {
  getAllitems,
  getItemById,
  getItemByCategory,
  patchStock,
} = require("./handlers/itemsHandlers");
const {
  addItemToCart,
  deleteItemById,
  deleteCart,
  getCart,
  updateCart,
} = require("./handlers/cartHandlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //COMPANIES ENDPOINTS///////////////////////

  //get all companies
  .get("/companies", getAllCompanies)

  //get company by Id
  .get("/company/:companyId", getCompany)

  //ITEMS ENDPOINTS/////////////////////////

  //get all items
  .get("/items", getAllitems)

  //get item by Id
  .get("/item/:id", getItemById)

  //get item by category
  .get("/items/:category", getItemByCategory)

  //Updates item's stock in database
  .patch("/item/:itemId", patchStock)

  //CART ENDPOINTS ////////////////////////

  //Add item to cart
  .post("/addCart", addItemToCart)

  //Deleted specific item from cart
  .delete("/deleteCart/:cartItemId", deleteItemById)

  //Deleted entire cart
  .delete("/deleteCart", deleteCart)

  //Get entire cart
  .get("/cart", getCart)

  //Update entire Cart
  .post("/updateCart", updateCart)

  //Error message
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Error",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
