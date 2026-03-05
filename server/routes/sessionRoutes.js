const express = require('express');
const { createSession, logout } = require('../controllers/sessionController.js');

const router = express.Router();

router.post('/', createSession);
router.post('/logout', logout);

module.exports = router;