const express = require('express');
const router = express.Router();

const { getAllDossiers, getDossier, createDossier, updateDossier, deleteDossier } = require('../services/dossiers');


router.post('/', createDossier);

router.get('/:id', getDossier);

router.get('/', getAllDossiers);

router.delete('/:id', deleteDossier);

router.put('/:id', updateDossier);

module.exports = router;