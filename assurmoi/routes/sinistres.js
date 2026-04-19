const express = require('express');
const router = express.Router();
const validateRole = require('../middlewares/role');

const { getAllSinistres, getSinistre, createSinistre, updateSinistre, deleteSinistre } = require('../services/sinistres');


router.post('/', validateRole(['SUPER_ADMIN', 'GESTIONNAIRE']), createSinistre);

router.get('/:id', getSinistre);

router.get('/', getAllSinistres);

router.delete('/:id', validateRole(['SUPER_ADMIN', 'GESTIONNAIRE']), deleteSinistre);

router.put('/:id', updateSinistre);

module.exports = router;