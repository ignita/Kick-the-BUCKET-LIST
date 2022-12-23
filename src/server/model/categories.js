module.exports = {
  async get(pool) {
    return await pool.execute(`SELECT id
                                    , name
                                    , id as category_id
                                    , false as is_sub
                                 FROM category
                                UNION 
                               SELECT id,name, category_id, true as is_sub
                                 FROM sub_category
                                ORDER BY category_id, id`);
  },
  async getSubById(pool, id) {
    return await pool.execute(`SELECT id, name FROM sub_category WHERE category_id = ?`, [id]);
  },
};
