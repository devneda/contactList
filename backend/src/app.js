const express = require('express');
const cors = require('cors');

const port = 8080;

const contacts = require('./route/contacts');
const companies = require('./route/companies');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', contacts);
app.use('/', companies);

app.listen(port, () => {
    console.log('El backend ha iniciado en el puerto ' + port + '.')
});

module.exports = { app }; 