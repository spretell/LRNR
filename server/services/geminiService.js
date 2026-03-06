//starter code for openaiService.js

// this file will handle all communication with the OpenAI API ; keeping this logic separate makes the controller cleaner and allows future teams to modify AI behavior easily

async function generateOpenAIQuiz(topic, difficulty, numQuestions, style) {
  return {
    topic,
    difficulty,
    numQuestions,
    style,
    questions: [
      {
        id: 1,
        prompt: "Mock question placeholder 1",
        correctAnswer: "Mock correct answer 1",
        explanation: "Mock explanation 1",
      },
    ],
  };
}

module.exports = { generateOpenAIQuiz };
