const express = require('express');
const { showUser, createUser } = require('../controllers/userController.js');

const router = express.Router();

router.get('/:id', showUser);
router.post('/', createUser);

module.exports = router;