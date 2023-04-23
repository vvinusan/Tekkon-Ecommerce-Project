const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = require("./data/companies.json");

const items = require("./data/items.json");

console.log(companies);

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("BootcampGroupProject");

  await db.collection("companies").insertMany(companies);
  await db.collection("items").insertMany(items);

  client.close();
};

batchImport();
