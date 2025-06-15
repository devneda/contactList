const express = require('express');
const { getCompanies, getCompanyById, getCompanyByName, postCompany, putCompany, deleteCompany  } = require('../controller/company');
const router = express.Router();

router.get('/companies', getCompanies);
router.get('/companies/:companyId', getCompanyById);
router.get('/companies', getCompanyByName)
router.post('/companies', postCompany);
router.put('/companies/:companyId', putCompany);
router.delete('/companies/:companyId', deleteCompany);

module.exports = router;