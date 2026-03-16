const express = require("express");
const auth = require("../middleware/auth.js");
const { saveQuiz, showQuizzes, createQuiz } = require("../controllers/quizController.js");

const router = express.Router();

router.post("/generate", createQuiz);
router.post('/', auth, saveQuiz);
router.get('/', auth, showQuizzes);
// Check
router.post("/:id", saveQuiz);
router.get("/:id", showQuizzes);


module.exports = router;
