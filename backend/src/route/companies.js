const express = require('express');
const router = express.Router();

router.get('/companies');
router.get('/companies/:companyId');
router.post('/companies');
router.put('/companies/:companyId');
router.delete('/companies/:companyId');

module.exports = router;