import statsModel from '../models/statsModel.js';

export default {
  async getTrending() {
    const [trending] = await statsModel.getTrending();
    return trending;
  },

  async getRatioByCategories() {
    const total = await statsModel.getRatioByCategories('total');
    const completed = await statsModel.getRatioByCategories(1);
    const incompleted = await statsModel.getRatioByCategories(0);

    return {
      total,
      completed,
      incompleted,
    };
  },

  async getCompletedByYears() {
    const today = new Date();
    const end = today.getFullYear();
    const start = end - 10;
    const completedByYears = await statsModel.getCompletedByYears(start, end);
    return completedByYears;
  },
};
