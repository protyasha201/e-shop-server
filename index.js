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
  const ordersCollection = client.db("eShop").collection("orders");
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

  app.post("/addOrder", (req, res) => {
    const orderDetails = req.body;
    ordersCollection
      .insertOne(orderDetails)
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

  app.patch("/updateProduct", (req, res) => {
    const product = {
      productName: req.body.productName,
      category: req.body.category,
      subCategory: req.body.subCategory,
      productPrice: req.body.productPrice,
      description: req.body.description,
      productImage: req.body.productImage,
      features: req.body.features,
    };
    const id = req.body._id;
    allProductsCollection
      .updateOne({ _id: ObjectID(id) }, { $set: product })
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.patch("/updateAdmin", (req, res) => {
    const admin = {
      adminEmail: req.body.adminEmail,
    };
    const id = req.body._id;
    adminsCollection
      .updateOne({ _id: ObjectID(id) }, { $set: admin })
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.patch("/updateProduct2", (req, res) => {
    const product = {
      productName: req.body.productName,
      category: req.body.category,
      subCategory: req.body.subCategory,
      productPrice: req.body.productPrice,
      description: req.body.description,
      productImage: req.body.productImage,
      features: req.body.features,
    };
    const parentId = req.body.parentId;
    const childId = req.body._id;
    productsByCategoryCollection
      .updateOne(
        { _id: ObjectID(parentId), "allProducts._id": childId },
        {
          $set: {
            "allProducts.$.productName": product.productName,
            "allProducts.$.category": product.category,
            "allProducts.$.subCategory": product.subCategory,
            "allProducts.$.productPrice": product.productPrice,
            "allProducts.$.description": product.description,
            "allProducts.$.productImage": product.productImage,
            "allProducts.$.features": product.features,
          },
        }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      })
      .then((err) => {
        console.log(err);
      });
  });

  app.patch("/updateStatus", (req, res) => {
    const status = req.body.status;
    const parentKey = req.body.key;
    const childKey = req.body.key2;

    ordersCollection
      .updateOne(
        { key: parentKey, "orderedProducts.key2": childKey },
        {
          $set: {
            "orderedProducts.$.status": status,
          },
        }
      )
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

  app.patch("/deleteOrder", (req, res) => {
    const product = req.body;
    const parentKey = product.key;
    const childKey = product.key2;
    ordersCollection
      .updateOne(
        { key: parentKey },
        { $pull: { orderedProducts: { key2: childKey } } }
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

  app.get("/orderDetails/:parentKey", (req, res) => {
    const parentKey = req.params.parentKey;
    ordersCollection
      .find({ key: parseInt(parentKey) })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.get("/adminDetails/:id", (req, res) => {
    const id = req.params.id;
    adminsCollection.find({ _id: ObjectID(id) }).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/categoryProducts/:id", (req, res) => {
    const id = req.params.id;
    productsByCategoryCollection
      .find({ _id: ObjectID(id) })
      .toArray((err, documents) => {
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

  app.get("/userOrders", (req, res) => {
    ordersCollection
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

  app.get("/orders", (req, res) => {
    ordersCollection.find({}).toArray((err, documents) => {
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
