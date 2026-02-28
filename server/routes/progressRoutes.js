const express = require('express');
const { 
  updateXP, 
  updateStreak 
} = require('../controllers/progressController.js');

const router = express.Router();

router.post('/:id/xp', updateXP);
router.post('/:id/streak', updateStreak);

module.exports = router;