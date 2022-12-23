const subAchievements = require('../model/subAchievements');

module.exports = {
  async get(req, res) {
    const [achievements] = await subAchievements.getById(req.pool, req.params.id);
    res.send(achievements);
  },

  async store(req, res) {
    const [result] = await subAchievements.create(req.pool, req.body);
    res.send(result);
  },

  async update(req, res) {
    const [result] = await subAchievements.update(req.pool, req.params.id, req.body);
    res.send(result);
  },

  async delete(req, res) {
    const [result] = await subAchievements.delete(req.pool, req.params.id);
    res.send(result);
  },
};
