import pool from '../config/db.js';

export default {
  async getById(id) {
    const [subAchievement] = await pool.execute(
      `SELECT id
            , achievements_id as achievementsId
            , title 
            , description
            , completed
            , completed_date as completedDate
            , completed_year as completedYear
            , review
            , is_failure as isFailure
         FROM sub_achievements
        WHERE id = ?;`,
      [id],
    );
    return subAchievement;
  },

  async create({ achievementsId, title, description, completed, completedDate, completedYear, review, isFailure }) {
    const [newSubAchievement] = await pool.execute(
      `INSERT INTO sub_achievements 
      (
        achievements_id
      , title
      , description
      , completed
      , completed_date
      , completed_year
      , review
      , is_failure
      ) VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?);`,
      [achievementsId, title, description, completed, completedDate, completedYear, review, isFailure],
    );

    return newSubAchievement;
  },

  async update(id, { title, description, completed, completedDate, review, isFailure }) {
    const [updatedSubAchievement] = await pool.execute(
      `UPDATE sub_achievements 
          SET title = ?
            , description = ?
            , completed = ?
            , completed_date = ?
            , review = ?
            , is_failure = ?
        WHERE id = ${id}`,
      [title, description, completed, completedDate, review, isFailure],
    );

    return updatedSubAchievement;
  },

  async delete(id) {
    await pool.execute(`DELETE FROM sub_achievements WHERE id = ?`, [id]);
  },
};
