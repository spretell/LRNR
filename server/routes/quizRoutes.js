// starter code for quizRoutes.js

// this file defines routes related to quizzes

// import express and create a router
const express = require("express");
const router = express.Router();

// import controller functions
const { createQuiz } = require("../controllers/quizController");

// POST /api/quiz → create a new quiz
router.post("/", createQuiz);

// export the router so it can be used in index.js
module.exports = router;
