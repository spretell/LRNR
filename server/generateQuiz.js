const express = require("express");
const { generateQuizFromGemini } = require("./services/geminiService.js");

const router = express.Router();

router.post("/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty, questions, style } = req.body;

    const quiz = await generateQuizFromGemini({
      topic,
      difficulty,
      questions,
      style,
    });

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Quiz generation failed" });
  }
});

export default router;
