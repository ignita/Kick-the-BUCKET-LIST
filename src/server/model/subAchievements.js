module.exports = {
  async getById(pool, id) {
    return await pool.execute(
      `SELECT id
            , achievements_id as achievementsId
            , title 
            , description
            , completed
            , completed_date as completedDate
            , review
            , is_failure as isFailure
         FROM sub_achievements
        WHERE id = ?;`,
      [id],
    );
  },

  async create(pool, data) {
    const { achievementsId, title, description, completed, completedDate, review, isFailure } = data;

    return await pool.execute(
      `INSERT INTO sub_achievements 
      (
        achievements_id
      , title
      , description
      , completed
      , completed_date
      , review
      , is_failure
      ) VALUES 
      (?, ?, ?, ?, ?, ?, ?);`,
      [achievementsId, title, description, completed, completedDate, review, isFailure],
    );
  },

  async update(pool, id, data) {
    const { title, description, completed, completedDate, review, isFailure } = data;
    return await pool.execute(
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
  },

  async delete(pool, id) {
    return await pool.execute(`DELETE FROM sub_achievements WHERE id = ?`, [id]);
  },
};
