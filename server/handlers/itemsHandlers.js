"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//GET ALL ITEMS

const getAllitems = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const itemsCollection = db.collection("items");

    const items = await itemsCollection.find().toArray();

    response.status(200).json({ status: 200, data: { items } });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//GET SPECIFIC ITEM BY ID

const getItemById = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const itemsCollection = db.collection("items");

    const itemId = parseInt(request.params.id);

    const item = await itemsCollection.findOne({ _id: itemId });

    if (!item) {
      response.status(404).json({ status: 404, message: "Item not found" });
      return;
    }
    response.status(200).json({ status: 200, data: { item } });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//GET ITEMS BY CATEGORY

const getItemByCategory = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const itemsCollection = db.collection("items");

    const category = request.params.category;

    const items = await itemsCollection.find({ category: category }).toArray();

    if (items.length === 0) {
      response
        .status(404)
        .json({ status: 404, message: "No items found in this category" });
      return;
    }
    response.status(200).json({ status: 200, data: { items } });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//MODIFY STOCK AMOUNT

const patchStock = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  let { newStock } = request.body;
  let { itemId } = request.params;

  itemId = Number(itemId);

  // Check if the stock goes negative
  if (newStock < 0) {
    newStock = 0;
  }

  try {
    await client.connect();
    const db = client.db("BootcampGroupProject");

    const selectedItem = await db.collection("items").findOne({ _id: itemId });

    if (!selectedItem) {
      response.status(404).json({ message: "Item not found" });
    } else {
      const query = { _id: itemId };
      const newValue = {
        $set: { numInStock: newStock },
      };
      const stockUpdate = await db
        .collection("items")
        .updateOne(query, newValue);

      return response.status(200).json({
        status: 200,
        message: "Stock updated",
        data: stockUpdate,
      });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getAllitems,
  getItemById,
  getItemByCategory,
  patchStock,
};
