const statsService = require('../services/statsService');
const STATUS_CODE = require('../constants/statusCode');

module.exports = {
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
