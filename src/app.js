const express = require('express');
const app = express();

app.use(express.json());
app.use('/notes', require('./routes/notes'));

module.exports = app;
