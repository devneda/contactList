const express = require('express');
const { getCompanies, getCompanyById, getCompanyByName, postCompany, putCompany, deleteCompany  } = require('../controller/company');
const router = express.Router();

router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.get('/companies/search/:companyName', getCompanyByName)
router.post('/companies', postCompany);
router.put('/companies/:id', putCompany);
router.delete('/companies/:id', deleteCompany);

module.exports = router;