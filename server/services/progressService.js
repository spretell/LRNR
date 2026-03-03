const connection = require('../db.js');

async function updateXP(amount, userId) {
  const conn = connection.promise();

  const [result] = await conn.query(
    `UPDATE users
    SET experience_points = experience_points + ?
    WHERE id = ?;`,
    [amount, userId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await conn.query(
    `SELECT *
     FROM users
     WHERE id = ?`,
    [userId]
  );

  const user = rows[0];

  const progression = calculateLevelProgress(
    user.level,
    user.experience_points
  );

  if (
    progression.level !== user.level ||
    progression.experience_points !== user.experience_points
  ) {
    await conn.query(
      `UPDATE users
      SET level = ?, experience_points = ?
      WHERE id = ?`,
      [progression.level, progression.experience_points, userId]
    );

    user.level = progression.level;
    user.experience_points = progression.experience_points;
  }

  return user;
}

async function updateStreak(userId) {
  const conn = connection.promise();

  const [result] = await conn.query(
    `UPDATE users
    SET streak = streak + 1,
      last_streak_update = CURDATE()
    WHERE id = (?)
      AND (last_streak_update IS NULL OR last_streak_update < CURDATE());`,
    [userId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await conn.query(
    `SELECT *
     FROM users
     WHERE id = ?`,
    [userId]
  );

  return rows[0];
}

function getXPRequiredForLevel(level) {
  return level * 100;
}

function calculateLevelProgress(level, experiencePoints) {
  let newLevel = level;
  let remainingXP = experiencePoints;

  while (remainingXP >= getXPRequiredForLevel(newLevel)) {
    remainingXP -= getXPRequiredForLevel(newLevel);
    newLevel += 1;
  }

  return {
    level: newLevel,
    experience_points: remainingXP,
  };
}

module.exports = {
  updateXP,
  getXPRequiredForLevel,
  updateStreak,
}