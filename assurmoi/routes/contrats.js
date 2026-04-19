const express = require('express');
const router = express.Router();

const { getAllContrats, getContrat, updateContrat, deleteContrat, createContrat } = require('../services/contrats');


router.post('/', createContrat);

router.get('/:id', getContrat);

router.get('/', getAllContrats);

router.delete('/:id', deleteContrat);

router.put('/:id', updateContrat);

module.exports = router;