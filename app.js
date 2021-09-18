const express = require('express');
const myRouter = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', myRouter);

module.exports = app

