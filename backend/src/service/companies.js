const knex = require('knex');

// Conexion con la BBDD
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './database/contacList.db'
    },
    useNullAsDefault: true
});

const findCompanies = (async () => {
    const result = await db('companies').select('*');

    return result;
});

const findCompany = (async (id) => {
    const result = await db('companies').select('*').where({id: id}).first();

    return result;
});
const findCompanyByName = (async (name) => {
    const result = await db('companies').select('*').where({companyName: name}).first();

    return result;
});

const registerCompany = (async (name, address, phone, email) => {
    let companyId;

    const returning = await db('companies').insert({
            name: name,
            address: address,
            phone: phone,
            email: email
        }).then(async (ids) => {
            companyId = ids[0];
        });

    const result = {
        id: companyId, 
        name: name,
        address: address,
        phone: phone, 
        email: email
    }
    return result;
});

const modifyCompany = (async (id, name, address, phone, email) => {
    const result = await db('companies').where({id: id}).update({
        name: name,
        address: address,
        phone: phone,
        email: email
    });

    return result;
});

const removeCompany = (async (id) => {
    const result = await db('companies').where({id: id}).del();
    return result;
});

module.exports = {
    findCompanies,
    findCompany,
    findCompanyByName,
    registerCompany,
    modifyCompany,
    removeCompany
};
