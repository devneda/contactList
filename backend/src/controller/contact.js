const { findContacts, findContact, registerContact, modifyContact, findContactByName, removeContact } = require("../service/contacts");

const getContacts = (async (req, res) => {
    const contactsList = await findContacts();
    res.status(200).json(contactsList);
});

const getContactById = (async (req, res) => {
    const id = req.params.id;
    console.log('El id que me pasar por parametro: ', id);
    const contact = await findContact(id);

    if(contact === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Contact not found'
        });

        return;
    }

    res.status(200).json(contact);
});

const getContactByName = (async (req, res) => {
    const contact = await findContactByName(req.params.name);

    if(contact === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Contact not found'
        });

        return;
    }

    res.status(200).json(contact);
});

const postContact = (async (req, res) => {
    const { name, lastname, phone, email, birthday, companyId} = req.body;
    if ( !name || !lastname || !phone || !email || !birthday || !companyId ) {
            return res.status(400).json({status: 'bad-request', message: 'Faltan campos obligatorios'});
    }
    if (!/^\d+$/.test(phone)) {
        return res.status(400).json({ status: 'bad-request', message: 'El campo phone debe contener solo números' });
    }
    const result = await registerContact(name, lastname, phone, email, birthday, companyId);
    res.status(201).json({
            id: result.id,
            name: req.body.name,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            birthday: req.body.birthday,
            companyId: req.body.companyId
        });
});

const putContact = (async (req, res) => {
    const { name, lastname, phone, email, birthday, companyId } = req.body;
    const id = req.params.id;
    if (!name && !lastname && !phone && !email && !birthday && !companyId) {
        return res.status(400).json({ message: 'Datos vacíos'})
    }
    await modifyContact(id, name, lastname, phone, email, birthday, companyId);
    res.status(204).json({});
});

const deleteContact = (async (req, res) => {
    //TODO Validaciones y comprobaciones
    await removeContact(req.params.id);

    res.status(204).json({});
});

module.exports = {
    getContactById,
    getContacts,
    getContactByName,
    postContact,
    putContact,
    deleteContact
}