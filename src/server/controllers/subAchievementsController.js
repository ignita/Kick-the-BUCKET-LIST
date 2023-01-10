import subAchievementsService from '../services/subAchievementsService.js';
import STATUS_CODE from '../constants/statusCode.js';

export default {
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
