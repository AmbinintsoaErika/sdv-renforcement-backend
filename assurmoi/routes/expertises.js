const express = require('express');
const router = express.Router();

const { getAllExpertises, getExpertise, createExpertise, updateExpertise, deleteExpertise } = require('../services/expertises');


router.post('/', createExpertise);

router.get('/:id', getExpertise);

router.get('/', getAllExpertises);

router.delete('/:id', deleteExpertise);

router.put('/:id', updateExpertise);

module.exports = router;