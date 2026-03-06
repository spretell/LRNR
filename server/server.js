// const dotenv = require("dotenv");
// dotenv.config();

const app = require("./index"); // importing configuration from Express app
// const { GoogleGenAI } = require("@google/genai");

// const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // AI route
// app.post("/quiz-generator", async (req, res) => {
//   try {
//     const { topic, difficulty, numQuestions, style } = req.body;

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `
//       Create a ${difficulty} level quiz about ${topic}.
//       Generate exactly ${numQuestions} multiple choice questions.
//       Style: ${style}.
      
//       Return ONLY valid JSON in this format:
//       [
//         {
//           "question": "",
//           "options": ["", "", "", ""],
//           "correctAnswer": ""
//         }
//       ]
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ quiz: text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to generate quiz" });
//   }
// });

// start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
