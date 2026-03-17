const progressService = require('../services/progressService.js');

async function updateXP(req, res) {
  const userId = req.user.userId;
  const { value } = req.body;

  try {
    const result = await progressService.updateXP(value, userId);

    if (!result) {
      return res.status(404).json({
        message: 'User not found or no update performed',
      });
    }

    res.status(200).json({
      message: 'Update Successful',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

async function updateStreak(req, res) {
  const userId = req.user.userId;

  try {
    const result = await progressService.updateStreak(userId);

    if (!result) {
      return res.status(404).json({
        message: 'User not found or no update performed',
      });
    }

    res.status(200).json({
      message: 'Streak Update Successful',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

module.exports = {
  updateXP,
  updateStreak,
}