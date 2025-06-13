const { findCompanies, findCompany, findCompanyByName, registerCompany, modifyCompany, removeCompany } = require('../service/companyService');


const getCompanies = (async (req, res) => {
    const companies = await findCompanies();
    res.status(200).json(companies);
});

const getCompanyById = (async (req, res) => {
    const id = req.params.companyId;
    const company = await findCompany(id);

    if (company === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Company not found'
        });
        return;
    }

    res.status(200).json(company);
});

const getCompanyByName = (async (req, res) => {
    const name = req.params.name;
    const company = await findCompanyByName(name);

    if (company === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'Company not found'
        });
        return;
    }

    res.status(200).json(company);
});

const postCompany = (async (req, res) => {
    const { companyName, cif, address, city, phone, email, contactId } = req.body;
    if (!companyName || !cif ) {
        return res.status(400).json({ status: 'bad-request', message: 'Faltan campos obligatorios' });
    }
    if (!/^\d+$/.test(phone)) {
        return res.status(400).json({ status: 'bad-request', message: 'El campo phone debe contener solo números' });
    }
    const result = await registerCompany(companyName, cif, address, city, phone, email, contactId);
    res.status(201).json(result);
});
const putCompany = (async (req, res) => {
    const { companyName, cif, address, city, phone, email } = req.body;
    const id = req.params.companyId;
    if (!companyName && !cif && !address && !city && !phone && !email) {
        return res.status(400).json({ message: 'Datos vacíos' });
    }
    await modifyCompany(id, companyName, cif, address, city, phone, email);
    res.status(204).json({});
});