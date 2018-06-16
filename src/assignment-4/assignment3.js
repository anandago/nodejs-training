'use strict';

const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');

const {app} = require('../../server');

module.exports.mainCityHandler = (req, res) => {
  // Placing it inside so that I can use different engine per assignment.
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '/views'));

  app.engine('handlebars', exphbs({
    defaultLayout: 'city',
    layoutsDir: path.join(__dirname, '/views'),
    partialsDir: path.join(__dirname, '/views/partials'),
  }));

  res.render('city', {
    headline: 'We believe that every city have something to say...',
    title: 'Every city have something to say...',
  });
};

module.exports.cityHandler = (req, res) => {
  var cityName = req.params.cityName;
  var title, heading;

  var imageDir = path.resolve(__dirname, '../../public/images', cityName);
  var fileNames = fs.readdirSync(imageDir);


  if (cityName === 'berlin'){
    title = 'Berlin';
    heading = 'Berlin: Where love is in the air';
  } else if (cityName === 'paris') {
    title = 'Paris';
    heading = 'Paris: Good talkers are only found in Paris';
  } else if (cityName === 'madrid') {
    title = 'Madrid';
    heading = 'Madrid: Buzz, Beautiful architecture and Football';
  } else if (cityName === 'london') {
    title = 'London';
    heading = 'London: Sparkling, Still, Food, Gorgeous';
  } else if (cityName === 'newyork') {
    title = 'New York';
    heading = 'New York: Come to New York to become someone new';
  }

  res.render('city', {
    title: title,
    headline: heading,
    city: cityName,
    imageFileName: fileNames,
  });
};
