const categories = require('../model/categories');

module.exports = {
  async all(req, res, next) {
    try {
      const [allCategories] = await categories.get(req.pool);
      const mainCategories = allCategories.filter(({ sub }) => !sub);

      const response = mainCategories.map(({ id, name, title }) => {
        const subCategories = allCategories
          .filter(({ categoryId, sub }) => sub && id === categoryId)
          .map(({ id, name, title }) => ({ id, name, title }));
        return {
          id,
          name,
          title,
          subCategories,
        };
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};
