const achievements = require('../model/achievements');

module.exports = {
  async all(req, res, next) {
    try {
      const [allAchievements] = await achievements.get(req.pool);
      const mainAchievements = allAchievements.filter(({ achievementsId }) => !achievementsId);
      const response = mainAchievements.map(achievement => {
        const subAchievements = allAchievements.filter(({ achievementsId }) => achievementsId === achievement.id);
        return {
          ...achievement,
          subAchievements,
        };
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const [achievement] = await achievements.getById(req.pool, req.params.id);
      res.status(200).json(achievement);
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const [result] = await achievements.create(req.pool, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const [result] = await achievements.update(req.pool, req.params.id, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const [result] = await achievements.delete(req.pool, req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
