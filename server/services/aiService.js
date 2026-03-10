// External Service (AI)
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateQuiz(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text; // raw AI text
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw new Error("AI generation failed");
  }
}

module.exports = {generateQuiz};
