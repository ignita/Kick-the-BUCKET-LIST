module.exports = {
  async get(pool) {
    return await pool.execute(`SELECT id
                                    , sub_category_id as subCategoryId
                                    , null as achievementsId 
                                    , title
                                    , description
                                    , completed
                                    , completed_date as completedDate
                                    , review
                                    , images
                                    , is_failure as isFailure
                                 FROM achievements
                                UNION
                               SELECT id
                                    , null as subCategoryId
                                    , achievements_id as achievementsId
                                    , title
                                    , description
                                    , completed
                                    , completed_date as completedDate
                                    , review
                                    , NULL as images
                                    , is_failure as isFailure
                                 FROM sub_achievements
                                ORDER BY IFNULL(achievementsId, id);`);
  },
  async getById(pool, id) {
    return await pool.execute(
      `SELECT id
            , sub_category_id as subCategoryId
            , title
            , description
            , completed
            , completed_date as completedDate
            , review
            , images
            , is_failure as isFailure
         FROM achievements
        WHERE id = ?`,
      [id],
    );
  },

  async create(pool, data) {
    const { subCategoryId, title, description, completed, completedDate, review, images, isFailure } = data;
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
      [subCategoryId, title, description, completed, completedDate, review, images, isFailure],
    );
  },

  async update(pool, id, data) {
    const { subCategoryId, title, description, completed, completedDate, review, images, isFailure } = data;
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
      [subCategoryId, title, description, completed, completedDate, review, images, isFailure],
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
