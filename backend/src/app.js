const express = require('express');
const cors = require('cors');
const knex = require('knex');
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors());

// Conexion con la BBDD
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/contacList.db'
    },
    useNullAsDefault: true
});

// Operacion GET para obtener TODOS los contactos
app.get('/contacts', async (req, res) => {
    const contacts = await db('contacts').select('*');
    res.status(200).json(contacts);
});

// TODO Realizar mas operaciones de tipo PUT POST y DELETE

app.listen(port, () => {
    console.log('El backend ha iniciado en el puerto ' + port + '.')
});