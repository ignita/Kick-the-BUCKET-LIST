import statsModel from '../models/statsModel.js';

export default {
  async getTrending() {
    const [trending] = await statsModel.getTrending();
    return trending;
  },
};
