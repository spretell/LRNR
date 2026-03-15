const express = require("express");
const auth = require("../middleware/auth.js");
const { saveQuiz, showQuizzes, createQuiz } = require("../controllers/quizController.js");

const router = express.Router();

router.get('/', auth, showQuizzes);
router.post('/', auth, saveQuiz);
router.post("/generate", createQuiz);

module.exports = router;
