const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@eshopdatabase.61uhx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const usersCollection = client.db("eShop").collection("users");
  // perform actions on the collection object

  app.post("/createUser", (req, res) => {
    const user = req.body;
    usersCollection
      .insertOne(user)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.get("/users", (req, res) => {
    usersCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the home page");
  });
  // client.close();
});

app.listen(port);
