import pool from '../config/db.js';

export default {
  async get() {
    const [categories] = await pool.execute(`SELECT id
                                                , name
                                                , title
                                                , id as categoryId
                                                , false as sub
                                            FROM category
                                           UNION 
                                          SELECT id
                                               , name
                                               , title
                                               , category_id as categoryId
                                               , true as sub
                                            FROM sub_category
                                           ORDER BY categoryId, id`);
    return categories;
  },
  async getSubById(id) {
    const [category] = await pool.execute(`SELECT id, name, title FROM sub_category WHERE category_id = ?`, [id]);
    return category;
  },
};
