const express = require("express");
const { saveQuiz, showQuizzes, createQuiz } = require("../controllers/quizController.js");

const router = express.Router();

router.get('/:id', showQuizzes);
router.post('/:id', saveQuiz);
router.post("/generate", createQuiz);

module.exports = router;
