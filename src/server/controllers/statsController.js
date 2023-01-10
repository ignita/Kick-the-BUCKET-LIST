import statsService from '../services/statsService.js';
import STATUS_CODE from '../constants/statusCode.js';

export default {
  async getTrending(req, res, next) {
    try {
      const data = await statsService.getTrending();
      res.status(STATUS_CODE.OK).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
