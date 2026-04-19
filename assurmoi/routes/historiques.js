const express = require('express');
const router = express.Router();

const { getAllHistoriques, getHistorique, createHistorique, updateHistorique, deleteHistorique } = require('../services/historiques');


router.post('/', createHistorique);

router.get('/:id', getHistorique);

router.get('/', getAllHistoriques);

router.delete('/:id', deleteHistorique);

router.put('/:id', updateHistorique);

module.exports = router;