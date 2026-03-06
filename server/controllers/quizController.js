// starter code for quizController.js

// this file contains the logic for handling quiz-related requests

// import the OpenAI service function to generate quizzes
const { generateOpenAIQuiz } = require("../services/geminiService");

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

// export the controller functions so they can be used in the routes
module.exports = { createQuiz };
