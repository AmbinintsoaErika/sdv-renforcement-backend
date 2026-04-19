const express = require('express');
const router = express.Router();

const { getAllInterventions, getIntervention, createIntervention, updateIntervention, deleteIntervention } = require('../services/interventions');


router.post('/', createIntervention);

router.get('/:id', getIntervention);

router.get('/', getAllInterventions);

router.delete('/:id', deleteIntervention);

router.put('/:id', updateIntervention);

module.exports = router;