'use strict';

const express = require('express');
const app = express();

const port = process.env.port || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

module.exports.app = app;
module.exports.express = express;
