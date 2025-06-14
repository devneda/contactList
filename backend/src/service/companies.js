const knex = require('knex');

// Conexion con la BBDD
const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'user',
        password: 'password',
        database: 'contactsdb'
    },
    useNullAsDefault: true
});

const findCompanies = (async () => {
    const result = await db('company').select('*');

    return result;
});

const findCompany = (async (id) => {
    const result = await db('company').select('*').where({id: id}).first();

    return result;
});
const findCompanyByName = (async (name) => {
    const result = await db('company').select('*').where({companyName: name}).first();

    return result;    
});

const registerCompany = (async (companyName, cif, address, city, phone, email) => {
    let companyId;

    const returning = await db('company').insert({
            companyName: companyName,
            cif: cif,
            address: address,
            city: city,
            phone: phone,
            email: email
        }).then(async (ids) => {
            companyId = ids[0];
        });

    const result = {
        id: companyId, 
        companyName: companyName,
        cif: cif,
        address: address,
        city: city,
        phone: phone, 
        email: email
    }
    return result;
});

const modifyCompany = (async (id, companyName, cif, address, city, phone, email) => {
    const result = await db('company').where({id: id}).update({
        companyName: companyName,
        cif: cif,
        address: address,
        city: city,
        phone: phone,
        email: email
    });

    return result;
});

const removeCompany = (async (id) => {
    const result = await db('company').where({id: id}).del();
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
