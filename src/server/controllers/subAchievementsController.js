const subAchievementsService = require('../services/subAchievementsService');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
  async get(req, res, next) {
    try {
      const data = await subAchievementsService.getById(req.params.id);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const data = await subAchievementsService.create(req.body);
      res.status(STATUS_CODE.CREATED).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await subAchievementsService.update(req.params.id, req.body);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const data = await subAchievementsService.delete(req.params.id);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
