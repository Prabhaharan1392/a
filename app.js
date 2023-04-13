const express = require('express');
const mongoose = require('mongoose');

app.get('/', async (req, res) => {
  res.send('Welcome to mongodb API');
});

app.get('api/project', (req, res) => {
  database
    .collection('project')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});
