const express = require('express');
const { getContactById, getContacts, getContactByName, postContact, putContact, deleteContact } = require('../controller/contact');
const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactById);
router.get('/contact/:name', getContactByName);
router.post('/contacts', postContact);
router.put('/contacts/:id', putContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;