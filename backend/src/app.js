const express = require('express');
const cors = require('cors');
const { config } = require('./config/configuration');


const contacts = require('./route/contacts');
const companies = require('./route/companies');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', contacts);
app.use('/api', companies);

app.listen(config.service.port, () => {
    console.log('El backend ha iniciado en el puerto ' + config.service.port + '.')
});

module.exports = { app }; 