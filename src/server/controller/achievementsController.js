const achievements = require('../model/achievements');

module.exports = {
  async all(req, res) {
    const [allAchievements] = await achievements.get(req.pool);
    res.send(allAchievements);
  },

  async get(req, res) {
    const [achievement] = await achievements.getById(req.pool, req.params.id);
    res.send(achievement);
  },

  async store(req, res) {
    const [result] = await achievements.create(req.pool, req.body);
    res.send(result);
  },

  async update(req, res) {
    const [result] = await achievements.update(req.pool, req.params.id, req.body);
    res.send(result);
  },

  async delete(req, res) {
    const [result] = await achievements.delete(req.pool, req.params.id);
    res.send(result);
  },
};
