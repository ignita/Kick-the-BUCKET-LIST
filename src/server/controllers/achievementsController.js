import achievementsService from '../services/achievementsService.js';
import STATUS_CODE from '../constants/statusCode.js';

export default {
  async all(req, res, next) {
    try {
      const data = await achievementsService.get();
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const data = await achievementsService.getById(req.params.id);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    try {
      const data = await achievementsService.create(req.body);
      res.status(STATUS_CODE.CREATED).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = await achievementsService.update(req.params.id, req.body);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await achievementsService.delete(req.params.id);
      res.status(STATUS_CODE.OK).json({});
    } catch (err) {
      next(err);
    }
  },
};
