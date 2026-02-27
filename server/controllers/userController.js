const userService = require('../services/userService.js');

async function createUser(req, res) {
  const { username, first_name, last_name, password, email } = req.body;

  try {
    await userService.create(
      username,
      first_name,
      last_name,
      password,
      email
    );
    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
}

module.exports = {
  createUser
}