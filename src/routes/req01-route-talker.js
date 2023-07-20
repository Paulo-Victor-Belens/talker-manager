const express = require('express');
const dataBase = require('../talker.json');

const app = express();
app.use(express.json());

app.get('/talker', (_request, response) => {
  console.log('Alguém fez uma requisição pra cá.');
  response.status(200).json(dataBase);
});

module.exports = app;