const express = require('express');
const { 
  showUser, 
  createUser, 
  updateUser 
} = require('../controllers/userController.js');

const router = express.Router();

router.get('/:id', showUser);
router.post('/', createUser);
router.post('/:id', updateUser);
// router.post('/:id/xp', updateUserXP);
// router.post('/:id/streak', updateUserStreak);

module.exports = router;