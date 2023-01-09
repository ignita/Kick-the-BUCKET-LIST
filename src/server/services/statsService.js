const statsModel = require('../models/statsModel');

module.exports = {
  async getTrending() {
    const [trending] = await statsModel.getTrending();
    return trending;
  },
};
