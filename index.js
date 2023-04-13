require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const mongostring = process.env.ATLA_URI;
const app = express();

app.use(express.json());

mongoose.connect(mongostring);

const database = mongoose.connection;

database.on('error', (err) => console.log(err));

database.on('connected', () => console.log('Database connected'));
// Find all the information about each products
app.get('/api/project', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db.db('mongo').collection('project').find({}).toArray();
  res.send(data);
});
// Find the product price which are between 400 to 800
app.get('/api/project/gtlt', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({
      $and: [{ product_price: { $gt: 400 } }, { product_price: { $lt: 800 } }],
    })
    .toArray();
  res.send(data);
});
// Find the product price which are not between 400 to 600
app.get('/api/project/ngtlt', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({
      $or: [{ product_price: { $lt: 400 } }, { product_price: { $gt: 600 } }],
    })
    .toArray();
  res.send(data);
});
// List the four product which are grater than 500 in price
app.get('/api/project/gt500', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({ product_price: { $gt: 500 } })
    .toArray();
  res.send(data);
});
// Find the product name and product material of each products
app.get('/api/project/pnpmep', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find(
      {},
      {
        product_name: 1,
        product_material: 1,
        _id: 0,
        id: 0,
        product_price: 0,
        product_color: 0,
      }
    )
    .toArray();
  res.send(data);
});

// Find the product with a row id of 10
app.get('/api/project/rid', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({ id: '10' }, { product_name: 1 })
    .toArray();
  res.send(data);
});
// Find only the product name and product material
app.get('/api/project/pnpm', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find(
      { product_name: 'Intelligent Fresh Chips' },
      {
        product_name: 1,
      }
    )
    .toArray();
  res.send(data);
});

// Find all products which contain the value of soft in product material
app.get('/api/project/soft', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({ product_material: 'Soft' })
    .toArray();
  res.send(data);
});

// Find products which contain product color indigo and product price 492.00
app.get('/api/project/pcpp', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({ product_color: 'indigo' }, { product_price: 492 })
    .toArray();
  res.send(data);
});

// Delete the products which product price value are same
app.get('/api/project/dpps', async (req, res) => {
  db = await new mongodb.MongoClient(mongostring).connect();
  let data = await db
    .db('mongo')
    .collection('project')
    .find({ $or: [{ product_color: 'indigo' }, { product_price: 492 }] })
    .toArray();
  res.send(data);
});

app.get('/', async (req, res) => {
  res.send('connected');
});

app.listen(5000, (req, res) => {
  console.log('server started at localhost:5000');
});

// const getDocument = async () => {
//   try {
//     const result = await project
//       .find({
//         product_price: { $gt: ['500'] },
//       })
//       .select({ name: 1 });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// getDocument();
