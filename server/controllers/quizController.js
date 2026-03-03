// starter code for quizController.js

// this file contains the logic for handling quiz-related requests

// import the OpenAI service function to generate quizzes
const { generateOpenAIQuiz } = require("../services/openaiService");
const quizService = require('../services/quizService');

// controller function for creating a quiz
async function createQuiz(req, res) {
  // extract data sent from the frontend
  const { topic, difficulty, numQuestions, style } = req.body;

  try {
    // call the OpenAI service function to generate a quiz based on the provided parameters (mock for now)
    const quiz = await generateOpenAIQuiz(
      topic,
      difficulty,
      numQuestions,
      style,
    );

    // send quiz back to frontend
    res.json(quiz);
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz." });
  }
}

async function showQuizzes(req, res) {
  const userId = req.params.id;

  try {
    const result = await quizService.show(userId);

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

  try {
    const result = await quizService.create(title, difficulty, userId);

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
  createQuiz,
  showQuizzes,
  saveQuiz,
};
