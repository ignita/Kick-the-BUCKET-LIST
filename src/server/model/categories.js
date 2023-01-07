module.exports = {
  async get(pool) {
    return await pool.execute(`SELECT id
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
  },
  async getSubById(pool, id) {
    return await pool.execute(`SELECT id, name, title FROM sub_category WHERE category_id = ?`, [id]);
  },
};
