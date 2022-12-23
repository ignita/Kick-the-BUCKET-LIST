module.exports = {
  async getById(pool, id) {
    return await pool.execute(
      `SELECT id
            , achievements_id
            , title 
            , description
            , completed
            , completed_date
            , review
            , is_failure
         FROM sub_achievements
        WHERE id = ?;`,
      [id],
    );
  },

  async create(pool, data) {
    const { achievements_id, title, description, completed, completed_date, review, is_failure } = data;

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
      [achievements_id, title, description, completed, completed_date, review, is_failure],
    );
  },

  async update(pool, id, data) {
    const { title, description, completed, completed_date, review, is_failure } = data;
    return await pool.execute(
      `UPDATE sub_achievements 
          SET title = ?
            , description = ?
            , completed = ?
            , completed_date = ?
            , review = ?
            , is_failure = ?
        WHERE id = ${id}`,
      [title, description, completed, completed_date, review, is_failure],
    );
  },

  async delete(pool, id) {
    return await pool.execute(`DELETE FROM sub_achievements WHERE id = ?`, [id]);
  },
};
