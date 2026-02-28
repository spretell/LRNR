const connection = require('../db.js');
const bcrypt = require('bcryptjs');
const { param } = require('../routes/userRoutes.js');

async function show(userId) {
  const [result] = await connection.promise().query(
    `SELECT *
    FROM users
    WHERE id = (?);`,
    [userId]
  );

  return result;
}

async function create(username, firstName, lastName, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await connection.promise().query(
    `INSERT INTO users (username, first_name, last_name, password, email)
    VALUES (?, ?, ?, ?, ?);`,
    [username, firstName, lastName, hashedPassword, email]
  );

  return result;
}

async function update(column, value, userId) {
  const [result] = await connection.promise().query(
    `UPDATE users
    SET ${column} = (?)
    WHERE id = (?);`,
    [value, userId]
  );

  return result;
}

async function updateStreak(userId) {
  const [result] = await connection.promise().query(
    `UPDATE users
    SET streak = streak + 1,
      last_streak_update = CURDATE()
    WHERE id = (?)
      AND (last_streak_update IS NULL OR last_streak_update < CURDATE());`,
    [userId]
  );

  return result;
}

module.exports = {
  show,
  create,
  update,
  updateStreak,
};