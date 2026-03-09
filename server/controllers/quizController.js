// Handle requests
// server/controllers/quizController.js
const { buildQuizPrompt } = require("../utils/promptBuilder.js");
const { generateQuiz } = require("../services/aiService.js");

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

module.exports = { createQuiz };
