const connection = require('../db.js');
const bcrypt = require('bcryptjs');

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

module.exports = {
  show,
  create,
  update,
};