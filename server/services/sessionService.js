const connection = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function create(username, password) {
  const [result] = await connection.promise().query(
    `SELECT *
    FROM users
    WHERE LOWER(username) = LOWER(?);`,
    [username]
  );

  const user = result[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {id: user.id},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      streak: user.streak,
      level: user.level,
      experience_points:user.experience_points
    }
  }
}

module.exports = {
  create
};