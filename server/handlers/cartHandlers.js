const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//ADD ITEM TO CART COLLECTION

const addItemToCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  const { name, numInStock, _id, price, category, imageSrc, quantity } =
    request.body;

  if (
    !name ||
    !numInStock ||
    !_id ||
    !price ||
    !category ||
    !imageSrc ||
    !quantity
  ) {
    response
      .status(400)
      .json({ status: 400, message: "Missing item information" });
    return;
  }

  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");
    const cartCollection = db.collection("cart");

    const newItem = {
      name,
      numInStock,
      _id,
      price,
      category,
      imageSrc,
      quantity,
    };

    const result = await cartCollection.insertOne(newItem);

    if (result.insertedCount === 0) {
      response.status(500).json({ status: 500, message: "Failed to add item" });
      return;
    }
    response.status(201).json({
      status: 201,
      data: { item: newItem, _id: result, message: "Item added to cart" },
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//DELETED ITEM FROM CART COLLECTION

const deleteItemById = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  let { cartItemId } = request.params;

  cartItemId = Number(cartItemId);

  if (!cartItemId) {
    response.status(400).json({ status: 400, message: "Missing item id" });
    return;
  }

  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");
    const cartCollection = db.collection("cart");

    const result = await cartCollection.deleteOne({ _id: cartItemId });

    if (result.deletedCount === 0) {
      response.status(404).json({ status: 404, message: "Item not found" });
      return;
    }

    response
      .status(200)
      .json({ status: 200, message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//DELETED ENTIRE CART

const deleteCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");
    const cartCollection = db.collection("cart");

    const result = await cartCollection.deleteMany();

    if (result.deletedCount === 0) {
      response
        .status(404)
        .json({ status: 404, message: "Cart was not cleared" });
      return;
    }

    response
      .status(200)
      .json({ status: 200, message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//GET ENTIRE CART

const getCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const cartObj = db.collection("cart");

    const cartItems = await cartObj.find().toArray();

    response.status(200).json({ status: 200, data: cartItems });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

//UPDATE ENTIRE CART

const updateCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  const updatedCart = request.body.updatedCart;

  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const oldCart = db.collection("cart");

    const result = await oldCart.insertMany(updatedCart);

    if (result.modifiedCount === 0) {
      response
        .status(500)
        .json({ status: 500, message: "Failed to update cart" });
      return;
    }

    response.status(201).json({
      status: 201,
      message: "Cart updated",
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({ status: 400, message: "Error, bad request" });
  } finally {
    client.close();
  }
};

module.exports = {
  addItemToCart,
  deleteItemById,
  deleteCart,
  getCart,
  updateCart,
};
