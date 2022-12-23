module.exports = {
  async get(pool) {
    return await pool.execute(`SELECT id
                                    , sub_category_id
                                    , id as achievements_id
                                    , title
                                    , description
                                    , completed
                                    , completed_date
                                    , review
                                    , images
                                    , is_failure
                                 FROM achievements
                                UNION
                               SELECT id
                                    , NULL as sub_category_id
                                    , achievements_id
                                    , title
                                    , description
                                    , completed
                                    , completed_date
                                    , review
                                    , NULL as images
                                    , is_failure
                                 FROM sub_achievements
                                ORDER BY achievements_id;`);
  },
  async getById(pool, id) {
    return await pool.execute(
      `SELECT id
            , sub_category_id
            , title
            , description
            , completed
            , completed_date
            , review
            , images
            , is_failure
         FROM achievements
        WHERE id = ?`,
      [id],
    );
  },

  async create(pool, data) {
    const { sub_category_id, title, description, completed, completed_date, review, images, is_failure } = data;
    return await pool.execute(
      `INSERT INTO achievements 
      (
        sub_category_id
      , title
      , description
      , completed
      , completed_date
      , review
      , images 
      , is_failure
      ) VALUES 
      (
        ?, ?, ?, ?, ?, ?, ?, ?);`,
      [sub_category_id, title, description, completed, completed_date, review, images, is_failure],
    );
  },

  async update(pool, id, data) {
    const { sub_category_id, title, description, completed, completed_date, review, images, is_failure } = data;
    return await pool.execute(
      `UPDATE achievements 
          SET sub_category_id = ?
            , title = ?
            , description = ?
            , completed = ?
            , completed_date = ?
            , review = ?
            , images = ?
            , is_failure = ?
        WHERE id = ${id}`,
      [sub_category_id, title, description, completed, completed_date, review, images, is_failure],
    );
  },

  async delete(pool, id) {
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      await conn.execute(`DELETE FROM sub_achievements WHERE achievements_id = ?`, [id]);
      const result = await conn.execute(`DELETE FROM achievements WHERE id = ?`, [id]);

      await conn.commit();
      return result;
    } catch (err) {
      console.log(err);
      await conn.rollback();
    } finally {
      if (conn) {
        conn.release();
      }
    }
  },
};
