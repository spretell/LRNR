const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateQuizFromGemini({ topic, difficulty, questions, style }) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Create a ${difficulty} level quiz about ${topic}.
Generate exactly ${questions} questions.
Style: ${style}.

Return ONLY valid JSON.

Format:
[
 {
   "question": "",
   "options": ["", "", "", ""],
   "correctAnswer": ""
 }
]
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  // Get text (await if text() returns Promise)
  let text =
    typeof response.text === "function" ? await response.text() : response;

  // Clean Markdown or code fences
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Parse JSON safely
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("Invalid quiz format returned by AI");
  }

  return parsed;
}

module.exports = { generateQuizFromGemini };
