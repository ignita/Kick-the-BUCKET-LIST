const categories = require('../model/categories');

module.exports = {
  async all(req, res) {
    const [allCategories] = await categories.get(req.pool);
    const mainCategories = allCategories.filter(({is_sub}) => !is_sub);

    const response = mainCategories.map(({id, name}) => {
      const subCategories = allCategories
        .filter(({category_id, is_sub}) => is_sub && id === category_id)
        .map(({id, name}) => {
          return {id, name};
        });
      return {
        id,
        name,
        subCategories,
      };
    });

    res.status(200).send(response);
  },
};
