const express = require('express');
const createSession = require('../controllers/sessionController.js');

const router = express.Router();

router.post('/', createSession);

module.exports = router;