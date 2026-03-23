const express = require('express');
const router = express.Router();
const { validateUsername } = require('../middlewares/users');
const { getAllusers, createUser, getUser, updateUser, deleteUser } = require('../services/users');


router.post('/', validateUsername, createUser);

router.get('/:id', getUser);

router.get('/', getAllusers);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

module.exports = router;