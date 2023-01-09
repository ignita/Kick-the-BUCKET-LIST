const pool = require('../config/db');

module.exports = {
  async get() {
    const [achievements] = await pool.execute(
      `SELECT id
            , sub_category_id as subCategoryId
            , null as achievementsId 
            , title
            , description
            , completed
            , DATE_FORMAT(completed_date, '%Y-%m-%d') AS completedDate
            , completed_year as completedYear
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
             , DATE_FORMAT(completed_date, '%Y-%m-%d') AS completedDate
             , completed_year as completedYear
             , review
             , NULL as images
             , is_failure as isFailure
          FROM sub_achievements
         ORDER BY IFNULL(achievementsId, id), id;`,
    );

    return achievements;
  },
  async getById(id) {
    const [achievement] = await pool.execute(
      `SELECT id
            , sub_category_id as subCategoryId
            , title
            , description
            , completed
            , completed_date as completedDate
            , completed_year as completedYear
            , review
            , images
            , is_failure as isFailure
         FROM achievements
        WHERE id = ?`,
      [id],
    );
    return achievement;
  },

  async create({
    subCategoryId,
    title,
    description,
    completed,
    completedDate,
    completedYear,
    review,
    images,
    isFailure,
  }) {
    const [newAchievement] = await pool.execute(
      `INSERT INTO achievements 
          (
            sub_category_id
          , title
          , description
          , completed
          , completed_date
          , completed_year
          , review
          , images 
          , is_failure
          ) VALUES 
          (
            ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [subCategoryId, title, description, completed, completedDate, completedYear, review, images, isFailure],
    );
    return newAchievement;
  },

  async update(
    id,
    { subCategoryId, title, description, completed, completedDate, completedYear, review, images, isFailure },
  ) {
    const [updatedAchievement] = await pool.execute(
      `UPDATE achievements 
          SET sub_category_id = ?
            , title = ?
            , description = ?
            , completed = ?
            , completed_date = ?
            , completed_year = ?
            , review = ?
            , images = ?
            , is_failure = ?
        WHERE id = ${id}`,
      [subCategoryId, title, description, completed, completedDate, completedYear, review, images, isFailure],
    );

    return updatedAchievement;
  },

  async delete(id) {
    let conn = null;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      await conn.execute(`DELETE FROM sub_achievements WHERE achievements_id = ?`, [id]);
      const [result] = await conn.execute(`DELETE FROM achievements WHERE id = ?`, [id]);
      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
    } finally {
      if (conn) {
        conn.release();
      }
    }
  },
};
