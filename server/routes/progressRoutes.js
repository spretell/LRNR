const express = require('express');
const auth = require("../middleware/auth.js");
const { 
  updateXP, 
  updateStreak 
} = require('../controllers/progressController.js');

const router = express.Router();

router.post('/xp', auth, updateXP);
router.post('/streak', auth, updateStreak);

module.exports = router;