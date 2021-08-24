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
  const productsByCategoryCollection = client
    .db("eShop")
    .collection("productsWithCategory");
  const allProductsCollection = client.db("eShop").collection("allProducts");
  const offersCollection = client.db("eShop").collection("offers");
  const cartsCollection = client.db("eShop").collection("carts");

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

  app.post("/addProductWithCategory", (req, res) => {
    const product = req.body;
    productsByCategoryCollection
      .insertOne(product)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    allProductsCollection
      .insertOne(product)
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

  app.post("/addOffer", (req, res) => {
    const offers = req.body;
    offersCollection
      .insertOne(offers)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.post("/addToCart", (req, res) => {
    const cart = req.body;
    cartsCollection
      .insertOne(cart)
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

  app.delete("/removeFromCart/:id", (req, res) => {
    cartsCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/deleteOffer/:id", (req, res) => {
    offersCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/deleteProduct/:id", (req, res) => {
    allProductsCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.patch("/updateUser", (req, res) => {
    const user = {
      userName: req.body.userName,
      email: req.body.email,
      photoUrl: req.body.photoUrl,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      mobileNumber: req.body.mobileNumber,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      house: req.body.house,
    };
    const id = req.body._id;
    usersCollection
      .updateOne({ _id: ObjectID(id) }, { $set: user })
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.patch("/updateProductsByCategory", (req, res) => {
    const newProduct = req.body;
    const id = req.body._id;
    productsByCategoryCollection
      .updateOne(
        { category: req.body.category },
        { $push: { allProducts: newProduct } }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.patch("/deleteProductByCategory", (req, res) => {
    const product = req.body;
    const parentId = product.parentId;
    const childId = product.childId;
    productsByCategoryCollection
      .updateOne(
        { _id: ObjectID(parentId) },
        { $pull: { allProducts: { _id: childId } } }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    usersCollection.find({ _id: ObjectID(id) }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/offerDetails/:id", (req, res) => {
    const id = req.params.id;
    offersCollection.find({ _id: ObjectID(id) }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/cart", (req, res) => {
    cartsCollection
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.get("/offers", (req, res) => {
    offersCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/users", (req, res) => {
    usersCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/allProducts", (req, res) => {
    allProductsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/allProductsByCategory", (req, res) => {
    productsByCategoryCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/productDetails/:id", (req, res) => {
    const id = req.params.id;
    allProductsCollection
      .find({ _id: ObjectID(id) })
      .toArray((err, documents) => {
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
