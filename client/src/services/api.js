export async function generateQuiz(config) {
  const response = await fetch("http://localhost:5050/api/quiz/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  return response.json();
}
