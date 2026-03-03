// const { generateOpenAIQuiz } = require("../services/openaiService");
const quizService = require('../services/quizService');

async function showQuizzes(req, res) {
  const userId = req.params.id;

  try {
    const result = await quizService.show(userId);

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      data: result,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

async function saveQuiz(req, res) {
  const userId = req.params.id;
  const { title, difficulty } = req.body;

  if (!title || !difficulty) {
    return res.status(422).json({
      message: 'All fields are required',
    });
  }

  try {
    const result = await quizService.create(title, difficulty, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Unable to save to the database',
      });
    }

    const userQuizzes = await quizService.show(userId);

    res.status(201).json({
      data: userQuizzes,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

// export the controller functions so they can be used in the routes
module.exports = {
  showQuizzes,
  saveQuiz,
};
