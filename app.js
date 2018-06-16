'use strict';

const path = require('path');

const {app, express} = require('./server');

app.use(express.static(path.resolve(__dirname + '/public')));
