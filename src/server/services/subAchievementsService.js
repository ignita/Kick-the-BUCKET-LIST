import subAchievementsModel from '../models/subAchievementsModel.js';
import STATUS_CODE from '../constants/statusCode.js';
import ApplicationError from '../common/applicationError.js';

export default {
  async getById(id) {
    const subAchievement = await subAchievementsModel.getById(id);
    if (!subAchievement.length) {
      throw new ApplicationError(STATUS_CODE.NOT_FOUND, '항목을 찾을 수 없습니다.');
    }
    return subAchievement;
  },

  async create(data) {
    const { insertId } = await subAchievementsModel.create(data);

    const subAchievement = await subAchievementsModel.getById(insertId);
    return subAchievement;
  },

  async update(id, data) {
    await subAchievementsModel.update(id, data);
    const achievement = await subAchievementsModel.getById(id);
    return achievement;
  },

  async delete(id) {
    await subAchievementsModel.delete(id);
  },
};
