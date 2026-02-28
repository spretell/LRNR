const userService = require('../services/userService.js');

async function showUser(req, res) {
  const userId = req.params.id;

  try {
    const result = await userService.show(userId);

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

async function createUser(req, res) {
  const { username, first_name, last_name, password, email } = req.body;

  if (!username || !first_name || !last_name || !password || !email) {
    return res.status(422).json({
      message: 'All fields are required',
    });
  }

  try {
    const result = await userService.create(
      username,
      first_name,
      last_name,
      password,
      email
    );

    res.status(201).json({
      message: 'User created successfully',
      userId: result.insertId,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Username or email already exists',
      });
    }

    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { column, value } = req.body;

  try {
    const result = await userService.update(column, value, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found or no update performed',
      });
    }

    const updatedUser = await userService.show(userId);

    res.status(200).json({
      message: 'Update Successful',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

// async function updateUserXP(req, res) {
//   const userId = req.params.id;
//   const { value } = req.body;

//   try {
//     const result = await userService.updateXP(value, userId);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: 'User not found or no update performed',
//       });
//     }

//     const updatedUser = await userService.show(userId);

//     res.status(200).json({
//       message: 'Update Successful',
//       data: updatedUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// }

// async function updateUserStreak(req, res) {
//   const userId = req.params.id;

//   try {
//     const result = await userService.updateStreak(userId);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: 'User not found or no update performed',
//       });
//     }

//     const updatedUser = await userService.show(userId);

//     res.status(200).json({
//       message: 'Streak Update Successful',
//       data: updatedUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// }

module.exports = {
  showUser,
  createUser,
  updateUser,
  // updateUserXP,
  // updateUserStreak,
}