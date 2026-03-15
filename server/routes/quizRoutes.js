const express = require("express");
const {
  saveQuiz,
  showQuizzes,
  createQuiz,
} = require("../controllers/quizController.js");

const router = express.Router();

router.post("/generate", createQuiz);
router.post("/:id", saveQuiz);
router.get("/:id", showQuizzes);

module.exports = router;
