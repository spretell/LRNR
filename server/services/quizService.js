const connection = require('../db.js');

async function show(userId) {
  console.log('here <><>', userId);
  const [result] = await connection.promise().query(
    `SELECT *
    FROM platinum_quizzes
    WHERE user_id = ?`,
    [userId]
  );
  console.log('result', result)
  return result;
};

async function create(title, difficulty, userId) {
  let [result] = await connection.promise().query(
    `INSERT INTO platinum_quizzes (quiz_name, quiz_level, user_id)
    VALUES (?, ?, ?)`,
    [title, difficulty, userId]
  );

  return result;
};

module.exports = {
  show,
  create,
};