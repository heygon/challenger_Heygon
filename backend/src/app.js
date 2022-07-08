const express = require ('express');


const app = express();

app.use(express.json());
app.use('/', require('./router'));

module.exports = app ;