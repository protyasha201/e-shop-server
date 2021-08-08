const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;

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
  const adminsCollection = client.db("eShop").collection("admins");
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

  app.post("/addAdmin", (req, res) => {
    const admin = req.body;
    adminsCollection
      .insertOne(admin)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.delete("/deleteAdmin/:id", (req, res) => {
    adminsCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/deleteUser/:id", (req, res) => {
    usersCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/users", (req, res) => {
    usersCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/admins", (req, res) => {
    adminsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the home page");
  });
  // client.close();
});

app.listen(port);
