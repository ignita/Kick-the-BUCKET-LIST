const subAchievements = require('../model/subAchievements');

module.exports = {
  async get(req, res, next) {
    try {
      const [achievements] = await subAchievements.getById(req.pool, req.params.id);
      res.status(200).json(achievements);
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const [result] = await subAchievements.create(req.pool, req.body);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const [result] = await subAchievements.update(req.pool, req.params.id, req.body);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const [result] = await subAchievements.delete(req.pool, req.params.id);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
};
