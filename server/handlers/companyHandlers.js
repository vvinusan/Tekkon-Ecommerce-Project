const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Get all the companies

const getAllCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const companies = await db.collection("companies").find().toArray();

    if (companies.length === 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      return res.status(200).json({
        status: 200,
        data: companies,
        message: "List of all companies",
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

//Get a single company by id

const getCompany = async (req, res) => {
  const companyId = Number(req.params.companyId);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("BootcampGroupProject");

    const company = await db
      .collection("companies")
      .findOne({ _id: companyId });

    if (!company) {
      return res.status(404).json({ status: 404, message: "Id not found" });
    } else {
      return res.status(200).json({
        status: 200,
        data: company,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

module.exports = { getAllCompanies, getCompany };
