const express = require('express');
const router = express.Router();

const { getAllFactures, getFacture, createFacture, updateFacture, deleteFacture } = require('../services/factures');


router.post('/', createFacture);

router.get('/:id', getFacture);

router.get('/', getAllFactures);

router.delete('/:id', deleteFacture);

router.put('/:id', updateFacture);

module.exports = router;