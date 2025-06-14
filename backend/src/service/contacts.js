const knex = require('knex');

// Conexion con la BBDD
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/contacList.db'
    },
    useNullAsDefault: true
});

const findContacts = (async () => {
    const result = await db('contacts').select('*');

    return result;
});

const findContact = (async (id) => {
    const result = await db('contacts').select('*').where({id: id}).first();

    return result;
});

const findContactByName = (async (name) => {
    const result = await db('contacts').select('*').where({name: name}).first();

    return result;
});

const contactExists = (async (name) => {
    const result = await db('contacts').select('*').where({name: name}).first();

    return result;
})

const registerContact = (async (name, lastname, phone, email, birthday, companyId) => {
    let contactId;

    const returning = await db('contacts').insert({
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            birthday: birthday,
            companyId: companyId
        }).then(async (ids) => {
            contactId = ids[0];
        });

        const result = {
            id: contactId, 
            name: name,
            lastname: lastname,
            phone: phone, 
            email: email,
            birthday: birthday,
            companyId: companyId
        }
        return result;
});

const modifyContact = (async (id, name, lastname, phone, email, birthday, companyId) => {
    await db('contacts').where({id}).update({
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            birthday: birthday,
            companyId: companyId
        });
});

const removeContact = (async (id) => {
    await db('contacts').del().where({id: id});
});

module.exports = {
    findContact,
    findContacts,
    findContactByName,
    registerContact,
    modifyContact,
    removeContact,
    contactExists
}