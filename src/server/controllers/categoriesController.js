import categoriesService from '../services/categoriesService.js';
import STATUS_CODE from '../constants/statusCode.js';

export default {
  async all(req, res, next) {
    try {
      const data = await categoriesService.get();
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  async getSubById(req, res, next) {
    try {
      const data = await categoriesService.getSubById(req.params.id);
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
