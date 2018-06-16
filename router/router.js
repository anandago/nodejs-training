'use strict';

const path = require('path');
const app = require('../server').app;

// Importing all the assignments.
const assignment1 = require('../src/assignment-1/assignment1.js');
const assignment2 = require('../src/assignment-2/assignment2.js');
const assignment3 = require('../src/assignment-3/assignment3.js');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Assignment 1.
app.get('/quote', assignment1.quoteHandler);
app.get('/get-new-quote', assignment1.getNewQuoteHandler);

// Assignment 2.
app.get('/city', assignment2.mainCityHandler);
app.get('/city/:cityName', assignment2.cityHandler);

// Assignment 3.
app.get('/hbs/city', assignment3.mainCityHandler);
app.get('/hbs/city/:cityName', assignment3.cityHandler);
