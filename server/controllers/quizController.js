const quizService = require('../services/quizService');
const { buildQuizPrompt } = require("../utils/promptBuilder.js");
const { generateQuiz } = require("../services/aiService.js");

async function showQuizzes(req, res) {
  const userId = req.user.userId;
  try {
    console.log('user ID: ', userId);
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
  const userId = req.user.userId;
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

async function createQuiz(req, res) {
  try {
    const { topic, difficulty, questionCount, type } = req.body;
    console.log("REQUEST BODY:", req.body);

    const prompt = buildQuizPrompt({ topic, difficulty, questionCount, type });
    console.log("PROMPT SENT TO AI:", prompt);

    const aiText = await generateQuiz(prompt);
    console.log("RAW AI RESPONSE:", aiText);

    let quiz;
    try {
      const cleaned = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      quiz = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON PARSE ERROR:", parseErr.message);
      return res.status(500).json({
        error: "Invalid JSON returned from AI",
        raw: aiText,
      });
    }

    res.json({ quiz });
  } catch (error) {
    console.error("CREATE QUIZ ERROR:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  showQuizzes,
  saveQuiz,
  createQuiz,
};
