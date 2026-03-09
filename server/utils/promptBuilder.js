// Functions Helper
function buildQuizPrompt(config) {
  return `
Generate ${config.questionCount} multiple choice quiz questions.

Topic: ${config.topic}
Difficulty: ${config.difficulty}
Style: ${config.type}

Rules:
- Each question must have exactly 4 choices.
- Only one correct answer.
- Answer must match one of the choices.
- Respond ONLY with valid JSON.
- Do NOT include markdown.
- Do NOT include explanations.

Return format:

[
 {
  "question": "string",
  "choices": ["A","B","C","D"],
  "answer": "string"
 }
]
`;
}

module.exports = { buildQuizPrompt };
