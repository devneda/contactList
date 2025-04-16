const express = require('express');
const cors = require('cors');
const knex = require('knex');
const port = 8080;
const fs = require('fs');
const multer = require('multer');

const IMAGES_PATH = './images';
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(IMAGES_PATH));

// Conexion con la BBDD
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/contacList.db'
    },
    useNullAsDefault: true
});

const multerStorage = multer.diskStorage({
    destination: IMAGES_PATH,
    filename: (req, file, cb) => {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1000);
        const extension = file.mimetype.slice(file.mimetype.indexOf('/') + 1);
        cb(null, file.fieldname + '-' + uniqueSufix + '-' + extension);
    }
});

const upload = multer({storage: multerStorage});

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

// Operacion para registrar un contacto y guardar una imagen por POST
app.post('/contacts', upload.single('image'), async (req, res) => {
    try {
        const { name, lastname, phone, email, birthday } = req.body;
        if ( !name || !lastname || !phone || !email || !birthday ) {
            return res.status(400).json({message: 'Faltan campos obligatorios'});
        }

        if (!req.file) {
            return res.status(400).json({message: 'No se ha proporcionado ninguna imagen'});
        }

        const filename = req.file.filename;

        if (!fs.existsSync(IMAGES_PATH)) {
            fs.mkdirSync(IMAGES_PATH);
        }

        await db('contacts').insert({
            name: req.body.name,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            birthday: req.body.birthday,
        });
        res.status(201).json({});
    } catch (error) {
        console.error('Error al guardar el contacto: ' + error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
});

app.listen(port, () => {
    console.log('El backend ha iniciado en el puerto ' + port + '.')
});