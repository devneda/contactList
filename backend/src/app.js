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

// Operacion GET para obtener un contacto por su ID
app.get('/contacts/:contactId', async (req, res) => {
    const contact = await db('contacts').select('*').where({id: req.params.contactId}).first();
    res.status(200).json(contact);
});

// Operacion PUT para actualizar un contacto por su ID
app.put('/contacts/:contactId', async (req, res) =>{
    await db('contacts').where({id: req.params.contactId}).update({
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        birthday: req.body.birthday,
        favorite: req.body.favorite
    });
    res.status(201).json({});
});

// Operacion DEL para eliminar un cntacto por su ID
app.delete('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;
    await db('contacts').del().where({id: id});
    res.status(204).json({});
});

app.listen(port, () => {
    console.log('El backend ha iniciado en el puerto ' + port + '.')
});