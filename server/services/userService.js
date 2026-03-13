const connection = require('../db.js');
const bcrypt = require('bcryptjs');

async function create(username, firstName, lastName, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await connection.promise().query(
    `INSERT INTO users (username, first_name, last_name, password, email)
    VALUES (?, ?, ?, ?, ?);`,
    [username, firstName, lastName, hashedPassword, email]
  );

  return result;
}

module.exports = {
  create,
};